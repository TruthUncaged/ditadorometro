// Valida o registro de ocorrências e imprime o índice calculado.
//
//   node scripts/validate.mjs           valida e mostra o resumo
//   node scripts/validate.mjs --score   imprime só o índice (para os workflows)
//
// Sai com código 1 se houver erro, o que bloqueia publicação e PR.

import { fileURLToPath } from 'node:url'
import { loadNewsFile } from './lib/load-news.mjs'
import { STATUS } from '../src/data/indicators.js'
import { RUBRIC_BY_CODE } from '../src/data/rubric.js'
import { LEVELS, levelFor } from '../src/data/levels.js'
import { computeScore } from '../src/lib/score.js'

// O registro é escrito por agentes expostos a conteúdo da web, então nunca é
// importado: scripts/lib/load-news.mjs analisa a sintaxe e só aceita dados.
const NEWS_FILE = fileURLToPath(new URL('../src/data/news.js', import.meta.url))
let data
try {
  data = loadNewsFile(NEWS_FILE)
} catch (e) {
  console.error(`✗ src/data/news.js recusado: ${e.message}`)
  process.exit(1)
}
const EXPORTS = ['NEWS', 'POWERS', 'UPDATED_AT']
const unknownExport = Object.keys(data).find((k) => !EXPORTS.includes(k))
if (unknownExport || !Array.isArray(data.NEWS)) {
  console.error(unknownExport ? `✗ export desconhecido em news.js: ${unknownExport}` : '✗ NEWS não é uma lista')
  process.exit(1)
}
const { NEWS, POWERS = {}, UPDATED_AT } = data

const errors = []
const ids = new Set()
const required = ['id', 'sort', 'when', 'power', 'title', 'summary', 'response', 'status']
// Campos aceitos numa ocorrência e numa fonte. Qualquer outro é erro: o consolidador
// (scripts/apply-verdicts.mjs) só grava estes, e um campo novo sumiria em silêncio.
const ITEM_FIELDS = [...required, 'institutions', 'cases', 'sources']
const SOURCE_FIELDS = ['outlet', 'url']

for (const [i, n] of NEWS.entries()) {
  const at = `ocorrência ${n.id ?? `#${i}`}`
  for (const f of required) if (typeof n[f] !== 'string' || !n[f].trim()) errors.push(`${at}: campo "${f}" vazio`)
  for (const f of Object.keys(n)) if (!ITEM_FIELDS.includes(f)) errors.push(`${at}: campo desconhecido "${f}"`)
  if (ids.has(n.id)) errors.push(`${at}: id duplicado`)
  ids.add(n.id)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(n.sort ?? '')) errors.push(`${at}: "sort" deve ser AAAA-MM-DD`)
  if (!Object.hasOwn(POWERS, n.power ?? '')) errors.push(`${at}: "power" inválido (${n.power})`)
  if (!Object.hasOwn(STATUS, n.status ?? '')) errors.push(`${at}: "status" inválido (${n.status})`)
  if (!Array.isArray(n.institutions) || !n.institutions.length) errors.push(`${at}: "institutions" vazio`)
  if (!Array.isArray(n.cases) || !n.cases.length) errors.push(`${at}: sem códigos em "cases"`)
  for (const c of n.cases ?? []) if (typeof c !== 'string' || !Object.hasOwn(RUBRIC_BY_CODE, c)) errors.push(`${at}: código desconhecido "${c}"`)

  const scoring = (n.cases ?? []).some((c) => Object.hasOwn(RUBRIC_BY_CODE, c) && RUBRIC_BY_CODE[c].gravity > 0)
  if (n.status === 'contexto' && scoring) errors.push(`${at}: status "contexto" com código que pontua`)
  if (n.status !== 'contexto' && !scoring) errors.push(`${at}: só códigos de contexto; use status "contexto"`)

  const sources = n.sources ?? []
  if (sources.length < 2) errors.push(`${at}: precisa de pelo menos 2 fontes`)
  const urls = new Set()
  for (const s of sources) {
    if (!s.outlet?.trim()) errors.push(`${at}: fonte sem nome do veículo`)
    for (const f of Object.keys(s)) if (!SOURCE_FIELDS.includes(f)) errors.push(`${at}: campo desconhecido "${f}" na fonte`)
    if (!/^https:\/\/[^\s]+$/.test(s.url ?? '')) errors.push(`${at}: URL inválida (${s.url})`)
    if (urls.has(s.url)) errors.push(`${at}: URL repetida (${s.url})`)
    urls.add(s.url)
  }
}
if (!UPDATED_AT?.trim()) errors.push('UPDATED_AT vazio')

// Só calcula com um registro válido: um campo inválido viraria NaN.
const { score, dimensions } = errors.length ? { score: NaN, dimensions: [] } : computeScore(NEWS)
if (!errors.length && !Number.isFinite(score)) errors.push(`índice não numérico (${score})`)

if (process.argv.includes('--score')) {
  console.log(errors.length ? 'erro' : score)
  process.exit(errors.length ? 1 : 0)
}

if (errors.length) {
  console.error(`✗ ${errors.length} erro(s) no registro:\n` + errors.map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}

const level = levelFor(score)
console.log(`✓ ${NEWS.length} ocorrências válidas (atualizado em ${UPDATED_AT})`)
console.log(`  Índice: ${score}/100 — estágio ${level.id} de ${LEVELS.length - 1}: ${level.name}`)
for (const d of dimensions) console.log(`  ${d.short.padEnd(13)} ${String(Math.round(d.ratio * 100)).padStart(3)}%  (${d.raw.toFixed(1)} pts)`)
