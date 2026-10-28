// Coleta notícias candidatas dos últimos dias e grava uma lista em Markdown
// para o agente avaliar. Não decide nada: só reúne, em três seções:
//   1. feeds oficiais (STF, Senado, Câmara, Agência Brasil, TCU, Defesa);
//   2. feeds de veículos, agrupados por linha editorial;
//   3. buscas no Google News, agrupadas por código da tabela, com o
//      vocabulário dos dois lados do debate.
//
//   node scripts/collect-news.mjs [arquivo-de-saída] [dias]

import { writeFileSync } from 'node:fs'

const OUT = process.argv[2] ?? '.agent/candidatos.md'
const DAYS = Number(process.argv[3] ?? 7)
const PER_QUERY = 15
const UA = 'Mozilla/5.0 (compatible; Ditadorometro-Coleta/2.0)'
const since = Date.now() - DAYS * 86400000

// Feeds oficiais e de veículos públicos (verificados em 28 out. 2026).
const OFFICIAL = {
  'STF': 'https://noticias.stf.jus.br/feed/?post_type=postsnoticias',
  'Agência Senado': 'https://www12.senado.leg.br/noticias/rss.xml',
  'Agência Câmara': 'https://www.camara.leg.br/noticias/rss/ultimas-noticias',
  'Agência Brasil · Política': 'https://agenciabrasil.ebc.com.br/rss/politica/feed.xml',
  'Agência Brasil · Justiça': 'https://agenciabrasil.ebc.com.br/rss/justica/feed.xml',
  'TCU': 'https://portal.tcu.gov.br/rss',
  'Ministério da Defesa': 'https://www.gov.br/defesa/pt-br/centrais-de-conteudo/noticias/RSS',
  'Planalto': 'https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/noticias/RSS',
}

// Veículos por grupo da regra 4 do prompt do pesquisador. O agente vê de que
// grupo vem cada pista e já sabe que par de fontes precisa montar.
const OUTLETS = {
  'Imprensa generalista': {
    'Folha · Poder': 'https://feeds.folha.uol.com.br/poder/rss091.xml',
    'Estadão · Política': 'https://www.estadao.com.br/arc/outboundfeeds/feeds/rss/sections/politica/',
    'g1 · Política': 'https://g1.globo.com/rss/g1/politica/',
    'O Globo · Política': 'https://oglobo.globo.com/rss/oglobo/politica/',
    'Valor · Política': 'https://valor.globo.com/rss/valor/politica/',
    'Veja · Política': 'https://veja.abril.com.br/politica/feed/',
    'Metrópoles · Política': 'https://www.metropoles.com/brasil/politica-brasil/feed',
    'Poder360': 'https://www.poder360.com.br/feed/',
    'Congresso em Foco': 'https://www.congressoemfoco.com.br/feed/',
    'Gazeta do Povo · República': 'https://www.gazetadopovo.com.br/feed/rss/republica.xml',
  },
  'Especializados': {
    'Conjur': 'https://www.conjur.com.br/rss.xml',
    'JOTA': 'https://www.jota.info/feed',
    'Agência Pública': 'https://apublica.org/feed/',
    'Aos Fatos': 'https://www.aosfatos.org/noticias/feed/',
  },
  'Linha editorial declarada à esquerda': {
    'CartaCapital': 'https://www.cartacapital.com.br/politica/feed/',
    'Brasil de Fato': 'https://www.brasildefato.com.br/feed',
    'Intercept Brasil': 'https://www.intercept.com.br/feed/',
  },
  'Linha editorial declarada à direita': {
    'Revista Oeste': 'https://revistaoeste.com/politica/feed/',
    'O Antagonista': 'https://oantagonista.com.br/feed/',
    'Crusoé': 'https://crusoe.com.br/feed/',
  },
  'Entidades (parte interessada em casos de imprensa)': {
    'Fenaj': 'https://fenaj.org.br/feed/',
    'ANJ': 'https://www.anj.org.br/feed/',
    'Artigo 19': 'https://artigo19.org/feed/',
  },
}

// Buscas agrupadas por código da tabela (src/data/rubric.js), com o vocabulário
// dos dois lados do debate. Consultas curtas: o operador when:Nd do Google News
// perde recall com frases longas.
const QUERIES = {
  'A1–A2 · legitimidade das eleições e do resultado': [
    'fraude eleitoral urnas', 'ataque às urnas desinformação TSE', 'não reconhece resultado eleição',
    'auditoria das urnas pedido', 'cassação da chapa anulação eleição', 'terceiro turno adiar eleição',
  ],
  'A3, A6 · golpe e Forças Armadas': [
    'Forças Armadas declaração política comandante', 'intervenção militar quartéis manifestação', 'Exército Marinha nota eleição',
  ],
  'A4 · descumprimento de decisão judicial ou da Constituição': [
    'governador descumpre decisão judicial', 'não cumpre decisão STF Congresso prefeito', 'desobediência ordem judicial autoridade',
  ],
  'A5, A7 · regras eleitorais, constitucionais, anistia': [
    'PEC regras eleitorais', 'minirreforma eleitoral Congresso', 'PEC mandato ministros STF', 'anistia 8 de janeiro votação',
    'indulto perdão presidencial aliado', 'distrital misto reeleição PEC',
  ],
  'B1 · rotulação de adversários': [
    'oposição inimigos fascistas discurso', 'comunistas golpistas traidores discurso', 'ameaça à democracia adversário presidente discurso',
  ],
  'B2 · prisão, cassação ou banimento por discurso': [
    'pede prisão de deputado fala', 'cassação de mandato por declaração', 'quebra de decoro representação discurso',
  ],
  'C1–C4 · violência política': [
    'violência política agressão candidato militante', 'ataque comitê partido depredação', 'ameaça de morte ministro deputado jornalista',
    'convocação ato invasão bloqueio rodovias', 'elogia ditadura militar homenagem torturador', 'defende intervenção militar tortura',
    'condena violência nota silêncio partido', 'milícia grupo armado político vínculo',
  ],
  'D1–D4 · remoção, bloqueio, busca e prisão por opinião': [
    'remoção de conteúdo redes sociais decisão judicial', 'bloqueio de perfis censura', 'derrubada de perfis desinformação decisão',
    'milícias digitais decisão perfis', 'suspensão rede social aplicativo Brasil', 'ordem apagar crítica projeto de lei',
    'retirar do ar manifesto decisão judicial', 'preso por postagem redes sociais', 'busca e apreensão por publicação',
    'prisão por críticas ataques às instituições',
  ],
  'D5–D6 · órgãos de “verdade” e regras com efeito inibidor': [
    'AGU desinformação notificação plataformas', 'Secom governo desinformação órgão checagem',
    'Ministério da Justiça plataformas notificação remoção', 'regulação redes sociais projeto responsabilidade',
  ],
  'D7 · regimes repressivos': [
    'Venezuela Maduro declaração democracia governo', 'Cuba Nicarágua regime declaração governo', 'elogio Trump Orbán Bukele medidas autoridade',
  ],
  'D8–D12 · imprensa, medidas seletivas, retaliação, protesto, vigilância': [
    'jornalista processo ameaça liberdade de imprensa', 'assédio judicial jornalista indenização', 'censura reportagem veículo decisão judicial',
    'medida cautelar líder oposição PF', 'passaporte retido político decisão', 'prisão preventiva opositor',
    'corte de verba publicidade oficial veículo crítico', 'servidor demitido crítica governo', 'proibição manifestação repressão ato',
    'Abin monitoramento jornalistas opositores', 'dossiê inteligência ativistas manifestantes',
  ],
  'E1–E5 · árbitros: conflito, acusatório, inquérito, foro, sigilo': [
    'conflito de interesses ministro STF', 'suspeição impedimento ministro relator', 'escritório familiar ministro contrato',
    'STF decisão monocrática', 'STF inquérito de ofício', 'PGR contra decisão ministro ilegal', 'STF sigilo investigação ministro',
    'relatoria prevenção sorteio competência STF',
  ],
  'E6–E10 · nomeações, composição, expurgos, vazamentos, ameaças a árbitros': [
    'indicação STF PGR Senado sabatina', 'indicação TCU STJ TSE ministro aliado', 'aposentadoria compulsória ministros composição corte',
    'delegado afastado superintendente PF troca', 'procurador removido juiz afastado CNJ CNMP', 'vazamento seletivo investigação sigilo imprensa',
    'pedido de impeachment ministro STF decisão', 'corte orçamento Judiciário retaliação',
  ],
  'F1–F8 · impunidade e jogo duro constitucional': [
    'CPI instalação requerimento assinaturas', 'CPMI relatório final', 'CPI encerrada sem relatório', 'PGR arquivamento', 'PGR pede nulidade',
    'anulação de provas prescrição trancamento autoridade', 'não se declara impedido vota próprio caso', 'Conselho de Ética arquiva representação',
    'decreto presidencial Congresso derruba', 'medida provisória reedição Congresso', 'obstrução pauta trancada pedido impeachment',
    'sigilo cem anos documentos governo', 'TCU requisição descumprida governo', 'PEC blindagem parlamentares foro',
  ],
  'Estados e municípios': [
    'governador Assembleia Legislativa cassação decisão', 'Tribunal de Justiça censura blog vereador prefeito',
  ],
  'Vocabulário cruzado': [
    'oposição governo perseguição política', 'ataque às instituições atos antidemocráticos', 'ditadura do judiciário', 'Estado democrático de direito defesa',
  ],
}

const decode = (s) =>
  s
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()

const tag = (xml, name) => decode(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? '')

async function fetchXml(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

function parseItems(xml) {
  const items = [...xml.matchAll(/<(?:item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/(?:item|entry)>/g)].map(([, item]) => ({
    title: tag(item, 'title'),
    link: tag(item, 'link') || item.match(/<link[^>]*href="([^"]+)"/)?.[1] || '',
    date: new Date(tag(item, 'pubDate') || tag(item, 'dc:date') || tag(item, 'published') || tag(item, 'updated')),
    source: tag(item, 'source'),
    sourceUrl: item.match(/<source url="([^"]+)"/)?.[1] ?? '',
  }))
  return items.filter((i) => isNaN(i.date) || i.date.getTime() >= since)
}

async function search(q) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(`${q} when:${DAYS}d`)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`
  return parseItems(await fetchXml(url)).slice(0, PER_QUERY)
}

const seen = new Set()
const failed = []
const line = (i) => {
  const d = isNaN(i.date) ? '' : i.date.toISOString().slice(0, 10)
  const host = i.sourceUrl ? ` (${new URL(i.sourceUrl).host})` : ''
  return `- ${d} · **${i.source || 'fonte não informada'}** — [${i.title}](${i.link})${host}`
}
const dedupe = (items) =>
  items.filter((i) => {
    const key = i.title.toLowerCase().replace(/\s+-\s+[^-]+$/, '')
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })

async function feedSection(name, url) {
  try {
    const fresh = dedupe(parseItems(await fetchXml(url)).slice(0, PER_QUERY))
    return fresh.length ? `### ${name}\n\n${fresh.map((i) => line({ ...i, source: i.source || name })).join('\n')}\n` : ''
  } catch (e) {
    failed.push(`${name} (${e.message})`)
    return ''
  }
}

const official = []
for (const [name, url] of Object.entries(OFFICIAL)) official.push(await feedSection(name, url))

const outlets = []
for (const [group, feeds] of Object.entries(OUTLETS)) {
  const parts = []
  for (const [name, url] of Object.entries(feeds)) parts.push(await feedSection(name, url))
  const body = parts.filter(Boolean).join('\n')
  if (body) outlets.push(`## ${group}\n\n${body}`)
}

const searches = []
for (const [group, qs] of Object.entries(QUERIES)) {
  const parts = []
  for (const q of qs) {
    try {
      const fresh = dedupe(await search(q))
      if (fresh.length) parts.push(`### ${q}\n\n${fresh.map(line).join('\n')}\n`)
    } catch (e) {
      failed.push(`busca “${q}” (${e.message})`)
    }
  }
  if (parts.length) searches.push(`## ${group}\n\n${parts.join('\n')}`)
}

const md = `# Notícias candidatas (últimos ${DAYS} dias)

Coletadas automaticamente de feeds oficiais, feeds de veículos e buscas no Google News. **São apenas pistas:**
confirme cada fato na página original do veículo e aplique as regras de fontes antes de incluir. Títulos podem
estar truncados ou ser de opinião. Links do Google News redirecionam para o veículo.

${failed.length ? `**Fontes que falharam nesta coleta** (a ausência delas não significa ausência de fatos): ${failed.join('; ')}.\n\n` : ''}# 1. Fontes oficiais

${official.filter(Boolean).join('\n') || '_Nenhum item novo._'}

# 2. Veículos por linha editorial

${outlets.join('\n') || '_Nenhum item novo._'}

# 3. Buscas por código da tabela

${searches.join('\n') || '_Nenhum item novo._'}
`

writeFileSync(OUT, md)
console.log(`${seen.size} candidatas gravadas em ${OUT}${failed.length ? `; ${failed.length} fonte(s) falharam` : ''}`)
