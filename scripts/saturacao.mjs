// Simula o índice com outros valores de SATURATION, sem alterar nada.
//
//   node scripts/saturacao.mjs            # compara 15, 20, 25 e 30
//   node scripts/saturacao.mjs 18 22 40   # compara os valores informados

import { NEWS } from '../src/data/news.js'
import { INDICATORS, STATUS, SATURATION } from '../src/data/indicators.js'
import { levelFor } from '../src/data/levels.js'
import { itemWeights } from '../src/lib/score.js'

const values = process.argv.slice(2).map(Number).filter((n) => n > 0)
const candidates = values.length ? values : [15, 20, 25, 30]

const totals = Object.fromEntries(INDICATORS.map((i) => [i.id, 0]))
for (const item of NEWS) {
  const m = STATUS[item.status].multiplier
  for (const [id, w] of Object.entries(itemWeights(item))) totals[id] += w * m
}

const pad = (s, n) => String(s).padEnd(n)
console.log(`Pontos por dimensão: ${INDICATORS.map((i) => `${i.short} ${totals[i.id].toFixed(1)}`).join(' · ')}\n`)
console.log(`${pad('Saturação', 11)}${pad('Índice', 8)}${pad('Estágio', 32)}${INDICATORS.map((i) => pad(i.short, 13)).join('')}`)
for (const s of candidates) {
  const ratios = INDICATORS.map((i) => Math.min(1, totals[i.id] / s))
  const score = Math.round((ratios.reduce((a, b) => a + b, 0) / ratios.length) * 100)
  const level = levelFor(score)
  const mark = s === SATURATION ? ' (atual)' : ''
  console.log(
    `${pad(s + mark, 11)}${pad(score, 8)}${pad(`${level.id} · ${level.name}`, 32)}` +
      ratios.map((r) => pad(`${Math.round(r * 100)}%${r >= 1 ? ' teto' : ''}`, 13)).join(''),
  )
}
