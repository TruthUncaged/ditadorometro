// Cálculo do índice. Funções puras: recebem ocorrências e o modelo, devolvem
// números. O mesmo código é usado pelo site, pelo validador, pelo feed, pela
// consolidação dos agentes e pelos testes.
import { hasOwn } from './model.js'

// Gravidade de uma ocorrência por dimensão: se dois códigos caem na mesma
// dimensão, vale o mais grave.
export function itemWeights(item, model) {
  const weights = {}
  for (const code of item.cases) {
    const r = hasOwn(model.rubricByCode, code) ? model.rubricByCode[code] : undefined
    if (!r) throw new Error(`Código desconhecido "${code}" em ${item.id}`)
    if (!r.dimension) continue
    weights[r.dimension] = Math.max(weights[r.dimension] ?? 0, r.gravity)
  }
  return weights
}

export function multiplierOf(item, model) {
  if (!hasOwn(model.status, item.status)) throw new Error(`Situação desconhecida "${item.status}" em ${item.id}`)
  return model.status[item.status].multiplier
}

// Pontos por dimensão: a mais grave vale a gravidade x multiplicador; a segunda
// vale uma fração; a partir da terceira não soma.
export function itemContributions(item, model) {
  const m = multiplierOf(item, model)
  const ranked = Object.entries(itemWeights(item, model)).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  const out = {}
  ranked.slice(0, model.maxDimensionsPerItem).forEach(([id, w], i) => {
    out[id] = w * m * (i === 0 ? 1 : model.secondDimensionWeight)
  })
  return out
}

export function itemPoints(item, model) {
  return Object.values(itemContributions(item, model)).reduce((sum, p) => sum + p, 0)
}

export function saturationOf(id, model) {
  return typeof model.saturation === 'number' ? model.saturation : model.saturation[id]
}

// Índice geral (0–100): média das dimensões, cada uma limitada a 100% do seu teto.
export function computeScore(items, model) {
  const totals = Object.fromEntries(model.indicators.map((i) => [i.id, 0]))
  for (const item of items) for (const [id, p] of Object.entries(itemContributions(item, model))) totals[id] += p
  const dimensions = model.indicators.map((i) => ({
    ...i,
    raw: totals[i.id],
    saturation: saturationOf(i.id, model),
    ratio: Math.min(1, totals[i.id] / saturationOf(i.id, model)),
  }))
  const score = Math.round((dimensions.reduce((s, d) => s + d.ratio, 0) / dimensions.length) * 100)
  return { score, dimensions }
}
