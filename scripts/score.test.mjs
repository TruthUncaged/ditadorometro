// Testes do cálculo do índice. Rodar com: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { itemWeights, itemPoints, itemContributions, computeScore, saturationOf } from '../src/lib/score.js'
import { INDICATORS, STATUS, SATURATION, SECOND_DIMENSION_WEIGHT, MAX_DIMENSIONS_PER_ITEM } from '../src/data/indicators.js'
import { RUBRIC } from '../src/data/rubric.js'
import { LEVELS, BAND, levelFor } from '../src/data/levels.js'
import { loadNewsFile } from './lib/load-news.mjs'

const { NEWS } = loadNewsFile(new URL('../src/data/news.js', import.meta.url))
const item = (cases, status = 'em-curso') => ({ id: 'teste', cases, status })
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`)

test('na mesma dimensão vale a maior gravidade', () => {
  // E2 (3) e E5 (1) são ambos de "arbitros"; D1 (2) é de "liberdades".
  assert.deepEqual(itemWeights(item(['E5', 'E2', 'D1'])), { arbitros: 3, liberdades: 2 })
})

test('códigos de contexto não pontuam', () => {
  assert.deepEqual(itemWeights(item(['N1', 'N2', 'N3', 'N4'], 'contexto')), {})
  assert.equal(itemPoints(item(['N1'], 'contexto')), 0)
})

test('a dimensão mais grave vale inteira, a segunda metade, a terceira nada', () => {
  // D4 (3, liberdades), E2 (3, arbitros), F5 (1, reserva): empate em 3 é desfeito por ordem alfabética.
  const c = itemContributions(item(['D4', 'E2', 'F5'], 'em-curso'))
  assert.deepEqual(Object.keys(c).sort(), ['arbitros', 'liberdades'])
  near(c.arbitros, 3)
  near(c.liberdades, 3 * SECOND_DIMENSION_WEIGHT)
  assert.equal(Object.keys(c).length, MAX_DIMENSIONS_PER_ITEM)
  near(itemPoints(item(['D4', 'E2', 'F5'], 'em-curso')), 3 + 1.5)
})

test('pontos = gravidade x multiplicador da situação', () => {
  near(itemPoints(item(['E1'], 'sem-apuracao')), 2 * STATUS['sem-apuracao'].multiplier)
  near(itemPoints(item(['A2'], 'responsabilizado')), 3 * STATUS.responsabilizado.multiplier)
  near(itemPoints(item(['B1'], 'declaracao')), 2 * STATUS.declaracao.multiplier)
  near(itemPoints(item(['A2', 'C3'], 'responsabilizado')), (3 + 1.5) * STATUS.responsabilizado.multiplier)
})

test('a responsabilização nunca faz uma conduta grave valer menos que uma leve consumada', () => {
  assert.ok(itemPoints(item(['A2'], 'responsabilizado')) >= itemPoints(item(['D6'], 'consumado')))
  assert.ok(itemPoints(item(['A2'], 'responsabilizado')) >= itemPoints(item(['E5'], 'consumado')))
})

test('código ou situação desconhecidos são erro, inclusive nomes herdados do protótipo', () => {
  assert.throws(() => itemWeights(item(['Z9'])), /desconhecido/)
  assert.throws(() => itemWeights(item(['toString'])), /desconhecido/)
  assert.throws(() => itemPoints(item(['A1'], 'valueOf')), /desconhecida/)
  assert.throws(() => computeScore([item(['A1'], 'constructor')]), /desconhecida/)
})

test('cada dimensão tem teto próprio e chega a 100% exatamente nele', () => {
  for (const i of INDICATORS) {
    assert.ok(saturationOf(i.id) > 0, `${i.id} sem teto`)
    assert.equal(saturationOf(i.id), SATURATION[i.id])
  }
  // Cada ocorrência E1 em-curso vale 2 pontos em "arbitros".
  const cap = saturationOf('arbitros')
  const n = Math.ceil(cap / 2)
  const items = (k) => Array.from({ length: k }, (_, i) => ({ id: `t${i}`, cases: ['E1'], status: 'em-curso' }))
  const arb = (list) => computeScore(list).dimensions.find((d) => d.id === 'arbitros')
  assert.ok(arb(items(n - 1)).ratio < 1, 'abaixo do teto ainda não é 100%')
  assert.ok(arb(items(n)).ratio === 1 || arb(items(n)).raw >= cap)
  assert.equal(arb(items(n + 5)).ratio, 1)
  assert.equal(arb(items(n + 5)).raw, (n + 5) * 2)
  const { score } = computeScore(items(n + 5))
  assert.equal(score, Math.round((1 / INDICATORS.length) * 100))
})

test('dimensões raras têm teto menor que as frequentes', () => {
  assert.ok(SATURATION.violencia < SATURATION.liberdades)
  assert.ok(SATURATION.regras < SATURATION.arbitros)
})

test('registro vazio dá índice 0 e democracia plena', () => {
  const { score, dimensions } = computeScore([])
  assert.equal(score, 0)
  assert.ok(dimensions.every((d) => d.raw === 0 && d.ratio === 0))
  assert.equal(levelFor(0).id, 0)
})

test('a escala cobre 0 a 100 em faixas iguais, sem furo', () => {
  assert.equal(BAND * LEVELS.length, 100)
  for (let s = 0; s <= 100; s++) assert.ok(levelFor(s), `sem estágio para ${s}`)
  assert.equal(levelFor(100).id, LEVELS.length - 1)
  assert.equal(levelFor(BAND - 0.01).id, 0)
  assert.equal(levelFor(BAND).id, 1)
})

test('tabela: todo código pontuável tem dimensão válida e gravidade de 1 a 3; códigos únicos', () => {
  const ids = new Set(INDICATORS.map((i) => i.id))
  const codes = new Set()
  for (const r of RUBRIC) {
    assert.ok(!codes.has(r.code), `código repetido ${r.code}`)
    codes.add(r.code)
    if (r.dimension === null) assert.equal(r.gravity, 0, `${r.code} de contexto deve valer 0`)
    else {
      assert.ok(ids.has(r.dimension), `${r.code}: dimensão ${r.dimension}`)
      assert.ok(r.gravity >= 1 && r.gravity <= 3, `${r.code}: gravidade ${r.gravity}`)
      assert.equal(r.code[0], { regras: 'A', legitimidade: 'B', violencia: 'C', liberdades: 'D', arbitros: 'E', reserva: 'F' }[r.dimension], `${r.code}: letra não bate com a dimensão`)
    }
  }
  assert.ok(Object.keys(STATUS).every((s) => typeof STATUS[s].multiplier === 'number'))
})

test('multiplicadores: linha de base 1,0; amplitude limitada', () => {
  assert.equal(STATUS.consumado.multiplier, 1)
  assert.equal(STATUS['em-curso'].multiplier, 1)
  const values = Object.values(STATUS).map((s) => s.multiplier).filter((m) => m > 0)
  assert.ok(Math.max(...values) / Math.min(...values) <= 2.5)
})

test('o registro atual produz um índice entre 0 e 100', () => {
  const { score } = computeScore(NEWS)
  assert.ok(score >= 0 && score <= 100)
})
