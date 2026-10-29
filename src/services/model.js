// Modelo de cálculo: dimensões, situações, tabela de classificação e tetos.
// É um objeto puro montado a partir do banco (db/metodo.json e db/tabela.json),
// passado explicitamente a quem calcula, valida ou exibe. Nenhum serviço lê o
// banco por conta própria.

export function createModel(method, rubric) {
  const codes = rubric.codes ?? []
  const rubricByCode = Object.create(null)
  for (const r of codes) rubricByCode[r.code] = r
  return Object.freeze({
    indicators: method.indicators,
    powers: method.powers,
    status: method.status,
    saturation: method.saturation,
    secondDimensionWeight: method.secondDimensionWeight ?? 0.5,
    maxDimensionsPerItem: method.maxDimensionsPerItem ?? 2,
    rubric: codes,
    rubricByCode,
  })
}

export const hasOwn = (obj, key) => obj != null && Object.hasOwn(obj, key)
