import { INDICATORS, STATUS, SATURATION } from '../data/indicators.js'
import { RUBRIC_BY_CODE } from '../data/rubric.js'

// Gravidade de uma ocorrência por dimensão, derivada dos códigos da tabela.
// Se dois códigos caem na mesma dimensão, vale o mais grave.
export function itemWeights(item) {
  const weights = {}
  for (const code of item.cases) {
    const r = RUBRIC_BY_CODE[code]
    if (!r) throw new Error(`Código desconhecido "${code}" em ${item.id}`)
    if (!r.dimension) continue
    weights[r.dimension] = Math.max(weights[r.dimension] ?? 0, r.gravity)
  }
  return weights
}

// Pontos que uma ocorrência soma: gravidade x multiplicador da situação.
export function itemPoints(item) {
  const m = STATUS[item.status].multiplier
  return Object.values(itemWeights(item)).reduce((sum, w) => sum + w * m, 0)
}

// O índice geral (0–100) é a média das dimensões, cada uma limitada a 100%.
export function computeScore(news) {
  const totals = Object.fromEntries(INDICATORS.map((i) => [i.id, 0]))
  for (const item of news) {
    const m = STATUS[item.status].multiplier
    for (const [id, w] of Object.entries(itemWeights(item))) totals[id] += w * m
  }
  const dimensions = INDICATORS.map((i) => ({
    ...i,
    raw: totals[i.id],
    ratio: Math.min(1, totals[i.id] / SATURATION),
  }))
  const score = Math.round((dimensions.reduce((s, d) => s + d.ratio, 0) / dimensions.length) * 100)
  return { score, dimensions }
}
