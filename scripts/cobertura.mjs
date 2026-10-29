// Estatística de cobertura do registro (ver src/services/coverage.js).
//
//   node scripts/cobertura.mjs [arquivo-de-saída] [dias]
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { openDatabase } from '../src/services/repository.node.js'
import { coverageStats } from '../src/services/coverage.js'

const OUT = process.argv[2] ?? '.agent/cobertura.md'
const DAYS = Number(process.argv[3] ?? 90)
const db = openDatabase()
const c = coverageStats(db.items, db.model, { days: DAYS })
const { powers, indicators } = db.model

const fmt = (x) => x.toFixed(1).replace('.', ',')
const rowsP = (stats) => Object.entries(stats).map(([p, s]) => `| ${powers[p]} | ${s.n} | ${fmt(s.pts)} |`).join('\n')
const rowsD = (stats) => Object.entries(stats).map(([id, s]) => `| ${indicators.find((i) => i.id === id).short} | ${s.n} | ${fmt(s.pts)} |`).join('\n')

const md = `## Cobertura do registro

Registro completo: ${c.total} ocorrências. Últimos ${c.days} dias (desde ${c.since}): ${c.recentTotal}.

### Por esfera (autor da conduta)

| Esfera | Últimos ${c.days} dias | Pontos |
| --- | --- | --- |
${rowsP(c.byPowerRecent)}

| Esfera | Registro completo | Pontos |
| --- | --- | --- |
${rowsP(c.byPower)}

### Por dimensão (registro completo)

| Dimensão | Ocorrências | Pontos |
| --- | --- | --- |
${rowsD(c.byDimension)}

### Por ano

${Object.entries(c.byYear).sort().map(([y, s]) => `- ${y}: ${s.n}`).join('\n')}

### Códigos nunca usados (${c.unusedCodes.length})

${c.unusedCodes.map((r) => `- ${r.code} (${r.type})`).join('\n') || '_Nenhum._'}

**Para o pesquisador:** dê prioridade às esferas com menos ocorrências e pontos nos últimos ${c.days} dias e aos
códigos nunca usados, desde que haja fato que os sustente. A estatística mostra o que o registro mede; não é meta.
`
mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, md)
console.log(`cobertura gravada em ${OUT}: ${c.recentTotal} ocorrências nos últimos ${c.days} dias, ${c.unusedCodes.length} códigos nunca usados`)
