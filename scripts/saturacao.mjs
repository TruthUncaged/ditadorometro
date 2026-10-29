// Simula o índice com outros tetos por dimensão, sem alterar nada.
//
//   node scripts/saturacao.mjs                 # fatores 0.6, 0.8, 1 e 1.2 sobre os tetos atuais
//   node scripts/saturacao.mjs 0.5 1 1.5       # fatores informados
//   node scripts/saturacao.mjs regras=10 violencia=8   # tetos específicos por dimensão
import { openDatabase } from '../src/services/repository.node.js'
import { computeScore, saturationOf } from '../src/services/scoring.js'
import { levelFor } from '../src/services/levels.js'

const db = openDatabase()
const { indicators } = db.model
const totals = Object.fromEntries(computeScore(db.items, db.model).dimensions.map((d) => [d.id, d.raw]))

const args = process.argv.slice(2)
const overrides = Object.fromEntries(args.filter((a) => a.includes('=')).map((a) => a.split('=')).map(([k, v]) => [k, Number(v)]))
const factors = args.filter((a) => !a.includes('=')).map(Number).filter((n) => n > 0)
const cap = (id) => saturationOf(id, db.model)
const scenarios = Object.keys(overrides).length
  ? [{ label: 'informado', caps: Object.fromEntries(indicators.map((i) => [i.id, overrides[i.id] ?? cap(i.id)])) }]
  : (factors.length ? factors : [0.6, 0.8, 1, 1.2]).map((f) => ({ label: `x${f}${f === 1 ? ' (atual)' : ''}`, caps: Object.fromEntries(indicators.map((i) => [i.id, cap(i.id) * f])) }))

const pad = (s, n) => String(s).padEnd(n)
console.log(`Pontos por dimensão: ${indicators.map((i) => `${i.short} ${totals[i.id].toFixed(1)} (teto ${cap(i.id)})`).join(' · ')}\n`)
console.log(`${pad('Tetos', 12)}${pad('Índice', 8)}${pad('Estágio', 32)}${indicators.map((i) => pad(i.short, 13)).join('')}`)
for (const sc of scenarios) {
  const { score, dimensions } = computeScore(db.items, { ...db.model, saturation: sc.caps })
  const ratios = dimensions.map((d) => d.ratio)
  const level = levelFor(score, db.levels)
  console.log(`${pad(sc.label, 12)}${pad(score, 8)}${pad(`${level.id} · ${level.name}`, 32)}` + ratios.map((r) => pad(`${Math.round(r * 100)}%${r >= 1 ? ' teto' : ''}`, 13)).join(''))
}
