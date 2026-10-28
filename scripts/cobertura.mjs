// Estatística de cobertura do registro: ocorrências e pontos por esfera e por
// dimensão nos últimos N dias, e códigos da tabela nunca usados. Serve para o
// pesquisador priorizar esferas sub-representadas e para o site e os
// verificadores enxergarem o que falta.
//
//   node scripts/cobertura.mjs [arquivo-de-saída] [dias]

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { loadNewsFile } from './lib/load-news.mjs'
import { INDICATORS } from '../src/data/indicators.js'
import { RUBRIC } from '../src/data/rubric.js'
import { itemContributions } from '../src/lib/score.js'

const OUT = process.argv[2] ?? '.agent/cobertura.md'
const DAYS = Number(process.argv[3] ?? 90)
const { NEWS, POWERS } = loadNewsFile(new URL('../src/data/news.js', import.meta.url))

const since = new Date(Date.now() - DAYS * 86400000).toISOString().slice(0, 10)
const recent = NEWS.filter((n) => n.sort >= since)

const byPower = (list) => {
  const out = Object.fromEntries(Object.keys(POWERS).map((p) => [p, { n: 0, pts: 0 }]))
  for (const n of list) {
    out[n.power].n++
    out[n.power].pts += Object.values(itemContributions(n)).reduce((a, b) => a + b, 0)
  }
  return out
}
const byDim = (list) => {
  const out = Object.fromEntries(INDICATORS.map((i) => [i.id, { n: 0, pts: 0 }]))
  for (const n of list) for (const [id, p] of Object.entries(itemContributions(n))) { out[id].n++; out[id].pts += p }
  return out
}
const used = new Set(NEWS.flatMap((n) => n.cases))
const unused = RUBRIC.filter((r) => r.dimension && !used.has(r.code)).map((r) => `${r.code} (${r.type})`)
const byYear = {}
for (const n of NEWS) byYear[n.sort.slice(0, 4)] = (byYear[n.sort.slice(0, 4)] ?? 0) + 1

const fmt = (x) => x.toFixed(1).replace('.', ',')
const rowsP = (stats) => Object.entries(stats).map(([p, s]) => `| ${POWERS[p]} | ${s.n} | ${fmt(s.pts)} |`).join('\n')
const rowsD = (stats) => Object.entries(stats).map(([id, s]) => `| ${INDICATORS.find((i) => i.id === id).short} | ${s.n} | ${fmt(s.pts)} |`).join('\n')

const md = `## Cobertura do registro

Registro completo: ${NEWS.length} ocorrências. Últimos ${DAYS} dias (desde ${since}): ${recent.length}.

### Por esfera (autor da conduta)

| Esfera | Últimos ${DAYS} dias | Pontos | 
| --- | --- | --- |
${rowsP(byPower(recent))}

| Esfera | Registro completo | Pontos |
| --- | --- | --- |
${rowsP(byPower(NEWS))}

### Por dimensão (registro completo)

| Dimensão | Ocorrências | Pontos |
| --- | --- | --- |
${rowsD(byDim(NEWS))}

### Por ano

${Object.entries(byYear).sort().map(([y, n]) => `- ${y}: ${n}`).join('\n')}

### Códigos nunca usados (${unused.length})

${unused.map((u) => `- ${u}`).join('\n') || '_Nenhum._'}

**Para o pesquisador:** dê prioridade às esferas com menos ocorrências e pontos nos últimos ${DAYS} dias e aos
códigos nunca usados, desde que haja fato que os sustente. A estatística mostra o que o registro mede; não é meta.
`
mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, md)
console.log(`cobertura gravada em ${OUT}: ${recent.length} ocorrências nos últimos ${DAYS} dias, ${unused.length} códigos nunca usados`)
