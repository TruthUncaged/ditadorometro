import { INDICATORS, STATUS, SATURATION, SECOND_DIMENSION_WEIGHT, MAX_DIMENSIONS_PER_ITEM } from '../data/indicators.js'
import { RUBRIC_BY_CODE } from '../data/rubric.js'

// Gravidade de uma ocorrência por dimensão, derivada dos códigos da tabela.
// Se dois códigos caem na mesma dimensão, vale o mais grave.
export function itemWeights(item) {
  const weights = {}
  for (const code of item.cases) {
    const r = Object.hasOwn(RUBRIC_BY_CODE, code) ? RUBRIC_BY_CODE[code] : undefined
    if (!r) throw new Error(`Código desconhecido "${code}" em ${item.id}`)
    if (!r.dimension) continue
    weights[r.dimension] = Math.max(weights[r.dimension] ?? 0, r.gravity)
  }
  return weights
}

function multiplier(item) {
  if (!Object.hasOwn(STATUS, item.status)) throw new Error(`Situação desconhecida "${item.status}" em ${item.id}`)
  return STATUS[item.status].multiplier
}

// Pontos que uma ocorrência soma em cada dimensão: a mais grave vale a gravidade
// x multiplicador; a segunda vale metade; a partir da terceira não soma.
export function itemContributions(item) {
  const m = multiplier(item)
  const ranked = Object.entries(itemWeights(item)).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  const out = {}
  ranked.slice(0, MAX_DIMENSIONS_PER_ITEM).forEach(([id, w], i) => {
    out[id] = w * m * (i === 0 ? 1 : SECOND_DIMENSION_WEIGHT)
  })
  return out
}

// Total de pontos de uma ocorrência (todas as dimensões).
export function itemPoints(item) {
  return Object.values(itemContributions(item)).reduce((sum, p) => sum + p, 0)
}

// Teto de uma dimensão: quantos pontos ela precisa para chegar a 100%.
export function saturationOf(id) {
  return typeof SATURATION === 'number' ? SATURATION : SATURATION[id]
}

// O índice geral (0–100) é a média das dimensões, cada uma limitada a 100%.
export function computeScore(news) {
  const totals = Object.fromEntries(INDICATORS.map((i) => [i.id, 0]))
  for (const item of news) {
    for (const [id, p] of Object.entries(itemContributions(item))) totals[id] += p
  }
  const dimensions = INDICATORS.map((i) => ({
    ...i,
    raw: totals[i.id],
    saturation: saturationOf(i.id),
    ratio: Math.min(1, totals[i.id] / saturationOf(i.id)),
  }))
  const score = Math.round((dimensions.reduce((s, d) => s + d.ratio, 0) / dimensions.length) * 100)
  return { score, dimensions }
}
