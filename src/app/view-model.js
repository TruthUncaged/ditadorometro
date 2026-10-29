// Monta tudo o que a página precisa a partir do repositório. Os componentes
// não conhecem o banco nem os serviços: recebem este objeto (ou partes dele).
import { computeScore, itemWeights, itemPoints } from '../services/scoring.js'
import { levelFor } from '../services/levels.js'
import { coverageStats } from '../services/coverage.js'

export function buildSiteModel(db) {
  const { score, dimensions } = computeScore(db.items, db.model)
  // Cada ocorrência já chega aos componentes com seus pesos e pontos calculados.
  const items = db.items.map((n) => ({ ...n, weights: itemWeights(n, db.model), points: itemPoints(n, db.model) }))
  return {
    score,
    level: levelFor(score, db.levels),
    dimensions,
    items,
    updatedAt: db.updatedAt,
    model: db.model,
    rubric: db.rubric,
    levels: db.levels,
    notes: db.notes,
    history: db.history,
    coverage: coverageStats(db.items, db.model),
  }
}
