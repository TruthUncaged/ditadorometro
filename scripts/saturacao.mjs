// Simula o índice com outros tetos por dimensão, sem alterar nada.
//
//   node scripts/saturacao.mjs                 # fatores 0.6, 0.8, 1 e 1.2 sobre os tetos atuais
//   node scripts/saturacao.mjs 0.5 1 1.5       # fatores informados
//   node scripts/saturacao.mjs regras=10 violencia=8   # tetos específicos por dimensão

import { loadNewsFile } from './lib/load-news.mjs'
import { INDICATORS } from '../src/data/indicators.js'
import { levelFor } from '../src/data/levels.js'
import { itemContributions, saturationOf } from '../src/lib/score.js'

// Nunca importa o registro diretamente (ver scripts/lib/load-news.mjs).
const { NEWS } = loadNewsFile(new URL('../src/data/news.js', import.meta.url))

const totals = Object.fromEntries(INDICATORS.map((i) => [i.id, 0]))
for (const item of NEWS) for (const [id, p] of Object.entries(itemContributions(item))) totals[id] += p

const args = process.argv.slice(2)
const overrides = Object.fromEntries(args.filter((a) => a.includes('=')).map((a) => a.split('=')).map(([k, v]) => [k, Number(v)]))
const factors = args.filter((a) => !a.includes('=')).map(Number).filter((n) => n > 0)
const scenarios = Object.keys(overrides).length
  ? [{ label: 'informado', caps: Object.fromEntries(INDICATORS.map((i) => [i.id, overrides[i.id] ?? saturationOf(i.id)])) }]
  : (factors.length ? factors : [0.6, 0.8, 1, 1.2]).map((f) => ({ label: `x${f}${f === 1 ? ' (atual)' : ''}`, caps: Object.fromEntries(INDICATORS.map((i) => [i.id, saturationOf(i.id) * f])) }))

const pad = (s, n) => String(s).padEnd(n)
console.log(`Pontos por dimensão: ${INDICATORS.map((i) => `${i.short} ${totals[i.id].toFixed(1)} (teto ${saturationOf(i.id)})`).join(' · ')}\n`)
console.log(`${pad('Tetos', 12)}${pad('Índice', 8)}${pad('Estágio', 32)}${INDICATORS.map((i) => pad(i.short, 13)).join('')}`)
for (const sc of scenarios) {
  const ratios = INDICATORS.map((i) => Math.min(1, totals[i.id] / sc.caps[i.id]))
  const score = Math.round((ratios.reduce((a, b) => a + b, 0) / ratios.length) * 100)
  const level = levelFor(score)
  console.log(
    `${pad(sc.label, 12)}${pad(score, 8)}${pad(`${level.id} · ${level.name}`, 32)}` +
      ratios.map((r) => pad(`${Math.round(r * 100)}%${r >= 1 ? ' teto' : ''}`, 13)).join(''),
  )
}
