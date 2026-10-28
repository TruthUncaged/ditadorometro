// Consolida os votos dos verificadores e reescreve src/data/news.js só com as
// mudanças aprovadas.
//
//   node scripts/apply-verdicts.mjs <base.mjs> <candidato.mjs> <pasta-de-vereditos>
//
// Regra: uma mudança entra se receber pelo menos 2 aprovações de 3 verificadores,
// nenhum veto e se a maioria confirmar os pontos calculados pelo script.
// Mudanças recusadas voltam à versão anterior (ou são descartadas, se novas).

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadNews } from './diff-news.mjs'
import { itemPoints } from '../src/lib/score.js'

const VERIFIERS = 3
const MIN_APPROVALS = 2
const [basePath, candPath, verdictDir] = process.argv.slice(2)

const base = loadNews(basePath)
const cand = loadNews(candPath)
const changes = JSON.parse(readFileSync('.agent/mudancas.json', 'utf8'))

const verdicts = []
for (const f of readdirSync(verdictDir).filter((f) => /^veredito-.+\.json$/.test(f))) {
  try {
    verdicts.push(JSON.parse(readFileSync(join(verdictDir, f), 'utf8')))
  } catch {
    console.warn(`Veredito ilegível ignorado: ${f}`)
  }
}
if (verdicts.length < VERIFIERS) console.warn(`Atenção: ${verdicts.length} de ${VERIFIERS} vereditos recebidos.`)

const candById = new Map(cand.NEWS.map((n) => [n.id, n]))
const decisions = changes.map((c) => {
  const votes = verdicts.map((v) => {
    const item = v.itens?.find((i) => i.id === c.id)
    return { verificador: v.verificador ?? '?', voto: item?.voto ?? 'rejeitar', motivo: item?.motivo ?? 'sem voto', pontos: item?.pontos }
  })
  const approvals = votes.filter((v) => v.voto === 'aprovar').length
  const veto = votes.some((v) => v.voto === 'vetar')

  let pointsOk = true
  if (c.tipo !== 'removida') {
    const expected = itemPoints(candById.get(c.id))
    const agree = votes.filter((v) => typeof v.pontos === 'number' && Math.abs(v.pontos - expected) < 0.05).length
    pointsOk = agree >= MIN_APPROVALS
  }
  const accepted = !veto && approvals >= MIN_APPROVALS && pointsOk
  return { ...c, votes, approvals, veto, pointsOk, accepted }
})

const accepted = new Set(decisions.filter((d) => d.accepted).map((d) => d.id))
const changed = new Set(decisions.map((d) => d.id))
const baseById = new Map(base.NEWS.map((n) => [n.id, n]))

const final = []
for (const n of cand.NEWS) {
  if (!changed.has(n.id) || accepted.has(n.id)) final.push(n)
  else if (baseById.has(n.id)) final.push(baseById.get(n.id))
}
for (const d of decisions) if (d.tipo === 'removida' && !d.accepted) final.push(baseById.get(d.id))
final.sort((a, b) => b.sort.localeCompare(a.sort))

const updatedAt = accepted.size ? cand.UPDATED_AT : base.UPDATED_AT

// ---------- Serialização no mesmo estilo do arquivo escrito à mão ----------
const ITEM_FIELDS = ['id', 'sort', 'when', 'power', 'title', 'summary', 'response', 'institutions', 'status', 'cases', 'sources']
const SOURCE_FIELDS = ['outlet', 'url']
for (const n of final) {
  const extra = [...Object.keys(n).filter((k) => !ITEM_FIELDS.includes(k)), ...n.sources.flatMap((s) => Object.keys(s).filter((k) => !SOURCE_FIELDS.includes(k)))]
  if (extra.length) throw new Error(`Ocorrência ${n.id} tem campos que o consolidador não grava: ${extra.join(', ')}`)
}
const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '\\r').replace(/\n/g, '\\n')}'`
const list = (a) => `[${a.map(q).join(', ')}]`
const item = (n) =>
  [
    '  {',
    `    id: ${q(n.id)},`,
    `    sort: ${q(n.sort)},`,
    `    when: ${q(n.when)},`,
    `    power: ${q(n.power)},`,
    `    title: ${q(n.title)},`,
    '    summary:',
    `      ${q(n.summary)},`,
    '    response:',
    `      ${q(n.response)},`,
    `    institutions: ${list(n.institutions)},`,
    `    status: ${q(n.status)},`,
    `    cases: ${list(n.cases)},`,
    '    sources: [',
    ...n.sources.map((s) => `      { outlet: ${q(s.outlet)}, url: ${q(s.url)} },`),
    '    ],',
    '  },',
  ].join('\n')

const baseText = readFileSync(basePath, 'utf8')
const header = baseText.slice(0, baseText.indexOf('export const NEWS = ['))
writeFileSync(
  'src/data/news.js',
  `${header}export const NEWS = [\n${final.map(item).join('\n')}\n]\n\nexport const UPDATED_AT = ${q(updatedAt)}\n`,
)

// ---------- Relatório ----------
const icon = { aprovar: 'aprova', rejeitar: 'rejeita', vetar: '**veta**' }
const rows = decisions.map((d) => {
  const v = d.votes.map((x) => `${x.verificador}: ${icon[x.voto] ?? x.voto}`).join('; ')
  const why = d.accepted ? 'aceita' : d.veto ? 'recusada (veto)' : d.approvals < MIN_APPROVALS ? 'recusada (aprovações insuficientes)' : 'recusada (pontos não confirmados)'
  return `| \`${d.id}\` | ${d.tipo} | ${v} | ${why} |`
})
const reasons = decisions
  .flatMap((d) => d.votes.filter((v) => v.voto !== 'aprovar').map((v) => `- \`${d.id}\` · ${v.verificador}: ${v.motivo}`))
  .join('\n')
const coverage = verdicts
  .filter((v) => v.cobertura && typeof v.cobertura === 'object')
  .map((v) => {
    const c = v.cobertura
    const esferas = Array.isArray(c.esferas_menos_cobertas) ? c.esferas_menos_cobertas.join(', ') : '—'
    const buscas = Array.isArray(c.buscas_feitas) ? c.buscas_feitas.length : 0
    const om = Array.isArray(c.omissoes) ? c.omissoes.length : 0
    return `- ${v.verificador ?? '?'}: esferas menos cobertas: ${esferas}; ${buscas} busca(s) própria(s); ${om} omissão(ões) apontada(s) (ver data/pendencias.md).`
  })
  .join('\n')

writeFileSync(
  '.agent/consolidacao.md',
  `## Verificação independente

${verdicts.length} de ${VERIFIERS} verificadores responderam. Regra: ${MIN_APPROVALS} aprovações, nenhum veto e pontos confirmados pela maioria.

**${accepted.size} de ${decisions.length} mudança(s) aceita(s).**

| Ocorrência | Tipo | Votos | Resultado |
| --- | --- | --- | --- |
${rows.join('\n')}
${reasons ? `\n### Objeções registradas\n\n${reasons}\n` : ''}${coverage ? `\n### Cobertura (o que pode ter ficado de fora)\n\n${coverage}\n` : ''}`,
)

console.log(`${accepted.size}/${decisions.length} mudanças aceitas`)
