// Estatística de cobertura: ocorrências e pontos por esfera, por dimensão e por
// ano, e códigos da tabela nunca usados. Mostra o que o índice mede; não é meta.
import { itemContributions } from './scoring.js'

export function coverageStats(items, model, { days = 90, now = new Date() } = {}) {
  const since = new Date(now.getTime() - days * 86400000).toISOString().slice(0, 10)
  const recent = items.filter((n) => n.sort >= since)
  const total = (n) => Object.values(itemContributions(n, model)).reduce((a, b) => a + b, 0)
  const byPower = (list) => {
    const out = Object.fromEntries(Object.keys(model.powers).map((p) => [p, { n: 0, pts: 0 }]))
    for (const n of list) { out[n.power].n++; out[n.power].pts += total(n) }
    return out
  }
  const byDimension = {}
  for (const i of model.indicators) byDimension[i.id] = { n: 0, pts: 0 }
  for (const n of items) for (const [id, p] of Object.entries(itemContributions(n, model))) { byDimension[id].n++; byDimension[id].pts += p }
  const byYear = {}
  for (const n of items) {
    const y = n.sort.slice(0, 4)
    byYear[y] = byYear[y] ?? { n: 0, pts: 0 }
    byYear[y].n++
    byYear[y].pts += total(n)
  }
  const used = new Set(items.flatMap((n) => n.cases))
  const unusedCodes = model.rubric.filter((r) => r.dimension && !used.has(r.code))
  return { days, since, total: items.length, recentTotal: recent.length, byPowerRecent: byPower(recent), byPower: byPower(items), byDimension, byYear, unusedCodes }
}
