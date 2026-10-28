// Coleta notícias candidatas dos últimos dias no Google News (RSS) e grava
// uma lista em Markdown para o agente avaliar. Não decide nada: só reúne.
//
//   node scripts/collect-news.mjs [arquivo-de-saída] [dias]

import { writeFileSync } from 'node:fs'

const OUT = process.argv[2] ?? '.agent/candidatos.md'
const DAYS = Number(process.argv[3] ?? 7)
const PER_QUERY = 6

// Mesmos temas do roteiro do agente, com termos dos dois lados do debate.
const QUERIES = [
  'STF decisão monocrática',
  'STF inquérito de ofício',
  'STF sigilo investigação ministro',
  'remoção de conteúdo redes sociais decisão judicial',
  'bloqueio de perfis censura',
  'jornalista processo ameaça liberdade de imprensa',
  'PGR arquivamento',
  'PGR pede nulidade',
  'Polícia Federal operação ministro',
  'CPI instalação requerimento assinaturas',
  'CPMI relatório final',
  'conflito de interesses ministro STF',
  'TCU conselheiro investigação',
  'decreto presidencial Congresso derruba',
  'AGU desinformação notificação plataformas',
  'indicação STF PGR Senado sabatina',
  'ataque às urnas eleições 2026 TSE',
  'violência política eleições 2026',
  'Banco Master investigação',
  'oposição governo perseguição política',
]

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

async function search(q) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(`${q} when:${DAYS}d`)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, PER_QUERY).map(([, item]) => ({
    title: tag(item, 'title'),
    link: tag(item, 'link'),
    date: new Date(tag(item, 'pubDate')),
    source: tag(item, 'source'),
    sourceUrl: item.match(/<source url="([^"]+)"/)?.[1] ?? '',
  }))
}

const seen = new Set()
const sections = []
for (const q of QUERIES) {
  let items
  try {
    items = await search(q)
  } catch (e) {
    sections.push(`### ${q}\n\n_Falha na coleta: ${e.message}_\n`)
    continue
  }
  const fresh = items.filter((i) => {
    const key = i.title.toLowerCase().replace(/\s+-\s+[^-]+$/, '')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  if (!fresh.length) continue
  const lines = fresh.map((i) => {
    const d = isNaN(i.date) ? '' : i.date.toISOString().slice(0, 10)
    return `- ${d} · **${i.source || 'fonte não informada'}** — [${i.title}](${i.link})${i.sourceUrl ? ` (${new URL(i.sourceUrl).host})` : ''}`
  })
  sections.push(`### ${q}\n\n${lines.join('\n')}\n`)
}

const md = `## Notícias candidatas (últimos ${DAYS} dias)

Coletadas automaticamente no Google News. **São apenas pistas:** confirme cada fato na página original do
veículo e aplique as regras de fontes antes de incluir. Títulos podem estar truncados ou ser de opinião.

${sections.join('\n')}`

writeFileSync(OUT, md)
console.log(`${seen.size} candidatas gravadas em ${OUT}`)
