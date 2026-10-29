// Valida o banco (db/) e imprime o índice calculado.
//
//   node scripts/validate.mjs           valida e mostra o resumo
//   node scripts/validate.mjs --score   imprime só o índice (para os workflows)
//
// Sai com código 1 se houver erro, o que bloqueia publicação e PR.
import { openDatabase } from '../src/services/repository.node.js'
import { validateModel, validateRegister } from '../src/services/validation.js'
import { computeScore } from '../src/services/scoring.js'
import { levelFor } from '../src/services/levels.js'

const onlyScore = process.argv.includes('--score')
let db
try {
  db = openDatabase()
} catch (e) {
  console.error(`✗ banco inválido: ${e.message}`)
  process.exit(1)
}

const errors = [...validateModel(db.model), ...validateRegister(db.register, db.model)]
// Só calcula com um registro válido: um campo inválido viraria NaN.
const { score, dimensions } = errors.length ? { score: NaN, dimensions: [] } : computeScore(db.items, db.model)
if (!errors.length && !Number.isFinite(score)) errors.push(`índice não numérico (${score})`)

if (onlyScore) {
  console.log(errors.length ? 'erro' : score)
  process.exit(errors.length ? 1 : 0)
}
if (errors.length) {
  console.error(`✗ ${errors.length} erro(s) no registro:\n` + errors.map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}

const level = levelFor(score, db.levels)
console.log(`✓ ${db.items.length} ocorrências válidas (atualizado em ${db.updatedAt})`)
console.log(`  Índice: ${score}/100 — estágio ${level.id} de ${db.levels.length - 1}: ${level.name}`)
for (const d of dimensions) console.log(`  ${d.short.padEnd(13)} ${String(Math.round(d.ratio * 100)).padStart(3)}%  (${d.raw.toFixed(1)} pts)`)
