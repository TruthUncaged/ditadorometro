// Valida o registro de ocorrências e imprime o índice calculado.
//
//   node scripts/validate.mjs           valida e mostra o resumo
//   node scripts/validate.mjs --score   imprime só o índice (para os workflows)
//
// Sai com código 1 se houver erro, o que bloqueia publicação e PR.

import { readFileSync } from 'node:fs'

// O registro é escrito por agentes expostos a conteúdo da web: antes de
// importá-lo, garante que ele contém só dados, sem código executável.
const NEWS_FILE = new URL('../src/data/news.js', import.meta.url)
const FORBIDDEN = [/^\s*import\s/m, /\brequire\s*\(/, /\bprocess\./, /\bfetch\s*\(/, /\beval\s*\(/, /\bFunction\s*\(/, /=>/, /\bfunction\b/, /`/]
const unsafe = FORBIDDEN.filter((re) => re.test(readFileSync(NEWS_FILE, 'utf8')))
if (unsafe.length) {
  console.error(`✗ src/data/news.js contém construções de código não permitidas: ${unsafe.join(', ')}`)
  process.exit(1)
}

const { NEWS, POWERS, UPDATED_AT } = await import('../src/data/news.js')
const { STATUS } = await import('../src/data/indicators.js')
const { RUBRIC_BY_CODE } = await import('../src/data/rubric.js')
const { LEVELS, levelFor } = await import('../src/data/levels.js')
const { computeScore } = await import('../src/lib/score.js')

const errors = []
const ids = new Set()
const required = ['id', 'sort', 'when', 'power', 'title', 'summary', 'response', 'status']

for (const [i, n] of NEWS.entries()) {
  const at = `ocorrência ${n.id ?? `#${i}`}`
  for (const f of required) if (typeof n[f] !== 'string' || !n[f].trim()) errors.push(`${at}: campo "${f}" vazio`)
  if (ids.has(n.id)) errors.push(`${at}: id duplicado`)
  ids.add(n.id)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(n.sort ?? '')) errors.push(`${at}: "sort" deve ser AAAA-MM-DD`)
  if (!POWERS[n.power]) errors.push(`${at}: "power" inválido (${n.power})`)
  if (!STATUS[n.status]) errors.push(`${at}: "status" inválido (${n.status})`)
  if (!Array.isArray(n.institutions) || !n.institutions.length) errors.push(`${at}: "institutions" vazio`)
  if (!Array.isArray(n.cases) || !n.cases.length) errors.push(`${at}: sem códigos em "cases"`)
  for (const c of n.cases ?? []) if (!RUBRIC_BY_CODE[c]) errors.push(`${at}: código desconhecido "${c}"`)

  const scoring = (n.cases ?? []).some((c) => RUBRIC_BY_CODE[c]?.gravity > 0)
  if (n.status === 'contexto' && scoring) errors.push(`${at}: status "contexto" com código que pontua`)
  if (n.status !== 'contexto' && !scoring) errors.push(`${at}: só códigos de contexto; use status "contexto"`)

  const sources = n.sources ?? []
  if (sources.length < 2) errors.push(`${at}: precisa de pelo menos 2 fontes`)
  const urls = new Set()
  for (const s of sources) {
    if (!s.outlet?.trim()) errors.push(`${at}: fonte sem nome do veículo`)
    if (!/^https:\/\/[^\s]+$/.test(s.url ?? '')) errors.push(`${at}: URL inválida (${s.url})`)
    if (urls.has(s.url)) errors.push(`${at}: URL repetida (${s.url})`)
    urls.add(s.url)
  }
}
if (!UPDATED_AT?.trim()) errors.push('UPDATED_AT vazio')

const { score, dimensions } = computeScore(NEWS)

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
