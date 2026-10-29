// Escala de estágios: faixas iguais de 0 a 100.
export function bandOf(levels) {
  return 100 / levels.length
}

export function levelFor(score, levels) {
  return levels[Math.min(levels.length - 1, Math.floor(score / bandOf(levels)))]
}
