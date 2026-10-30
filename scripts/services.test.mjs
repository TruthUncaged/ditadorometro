// Testes dos serviços (cálculo, validação, escala, cobertura, repositório) e da
// integridade do banco em db/. Rodar com: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { openDatabase, readRegisterFile, writeRegisterFile } from '../src/services/repository.node.js'
import { createRepository } from '../src/services/repository.js'
import { itemWeights, itemPoints, itemContributions, computeScore, saturationOf } from '../src/services/scoring.js'
import { validateRegister, validateItem, validateModel, normalizeItem, ITEM_FIELDS } from '../src/services/validation.js'
import { updatedAtToIso } from '../src/services/dates.js'
import { buildSiteModel } from '../src/app/view-model.js'
import { levelFor, bandOf } from '../src/services/levels.js'
import { coverageStats } from '../src/services/coverage.js'

const db = openDatabase()
const model = db.model
const item = (cases, status = 'em-curso') => ({ id: 'teste', cases, status })
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`)
const validItem = (over = {}) => ({
  id: 'caso-teste', sort: '2026-01-01', when: '1 jan. 2026', power: 'executivo', title: 't', summary: 's', response: 'r',
  institutions: ['X'], status: 'em-curso', cases: ['A1'], sources: [{ outlet: 'A', url: 'https://a/' }, { outlet: 'B', url: 'https://b/' }], ...over,
})

// ---------- banco ----------
test('o banco carrega e o registro e o modelo atuais são válidos', () => {
  assert.ok(db.items.length > 0)
  assert.deepEqual(validateModel(model), [])
  assert.deepEqual(validateRegister(db.register, model), [])
  assert.ok(db.levels.length === 7 && db.rubric.length > 0 && db.history.length > 0)
})

test('o registro está ordenado da mais recente para a mais antiga e com campos na ordem canônica', () => {
  for (let i = 1; i < db.items.length; i++) assert.ok(db.items[i - 1].sort >= db.items[i].sort, db.items[i].id)
  for (const n of db.items) assert.deepEqual(Object.keys(n), ITEM_FIELDS.filter((f) => f in n))
})

test('gravação do registro é estável (reler dá o mesmo conteúdo)', () => {
  const dir = mkdtempSync(join(tmpdir(), 'db-'))
  const p = join(dir, 'r.json')
  writeRegisterFile(p, db.register)
  assert.deepEqual(readRegisterFile(p), db.register)
})

test('JSON inválido ou sem lista é recusado sem executar nada', () => {
  const dir = mkdtempSync(join(tmpdir(), 'db-'))
  const bad = join(dir, 'bad.json'); writeFileSync(bad, '{ "items": [ ')
  assert.throws(() => readRegisterFile(bad), /JSON válido/)
  const code = join(dir, 'code.json'); writeFileSync(code, '{"updatedAt":"x","items":{"length":1}}')
  assert.throws(() => readRegisterFile(code), /lista/)
})

test('repositório exige todas as coleções', () => {
  assert.throws(() => createRepository({ ocorrencias: { items: [] } }), /coleção/)
  assert.ok(db.comparables.mapeamento.length === model.indicators.length)
  assert.ok(db.comparables.mapeamento.every((m) => model.indicators.some((i) => i.id === m.dimensao)))
})

// ---------- cálculo ----------
test('na mesma dimensão vale a maior gravidade', () => {
  assert.deepEqual(itemWeights(item(['E5', 'E2', 'D1']), model), { arbitros: 3, liberdades: 2 })
})

test('a dimensão mais grave vale inteira, a segunda a fração do modelo, a terceira nada', () => {
  const c = itemContributions(item(['D4', 'E2', 'F5']), model)
  assert.deepEqual(Object.keys(c).sort(), ['arbitros', 'liberdades'])
  near(c.arbitros, 3)
  near(c.liberdades, 3 * model.secondDimensionWeight)
  near(itemPoints(item(['D4', 'E2', 'F5']), model), 3 + 3 * model.secondDimensionWeight)
})

test('pontos = gravidade x multiplicador; contexto vale 0', () => {
  near(itemPoints(item(['E1'], 'sem-apuracao'), model), 2 * model.status['sem-apuracao'].multiplier)
  near(itemPoints(item(['A2'], 'responsabilizado'), model), 3 * model.status.responsabilizado.multiplier)
  assert.equal(itemPoints(item(['N1'], 'contexto'), model), 0)
})

test('código ou situação desconhecidos são erro, inclusive nomes herdados do protótipo', () => {
  assert.throws(() => itemWeights(item(['Z9']), model), /desconhecido/)
  assert.throws(() => itemWeights(item(['toString']), model), /desconhecido/)
  assert.throws(() => itemPoints(item(['A1'], 'valueOf'), model), /desconhecida/)
})

test('cada dimensão satura no próprio teto; registro vazio dá 0', () => {
  const cap = saturationOf('arbitros', model)
  const items = (k) => Array.from({ length: k }, (_, i) => ({ id: `t${i}`, cases: ['E1'], status: 'em-curso' }))
  const arb = (list) => computeScore(list, model).dimensions.find((d) => d.id === 'arbitros')
  assert.ok(arb(items(Math.ceil(cap / 2) - 1)).ratio < 1)
  assert.equal(arb(items(Math.ceil(cap / 2) + 5)).ratio, 1)
  assert.equal(computeScore([], model).score, 0)
})

test('escala: faixas iguais, sem furo', () => {
  assert.equal(bandOf(db.levels) * db.levels.length, 100)
  for (let s = 0; s <= 100; s++) assert.ok(levelFor(s, db.levels))
  assert.equal(levelFor(100, db.levels).id, 6)
  assert.equal(levelFor(0, db.levels).id, 0)
})

// ---------- validação ----------
test('validação aceita ocorrência válida e recusa cada defeito com mensagem própria', () => {
  assert.deepEqual(validateItem(validItem(), 0, model, new Set()), [])
  const err = (over) => validateItem(validItem(over), 0, model, new Set()).join(' | ')
  assert.match(err({ id: 'Com Espaço' }), /kebab-case/)
  assert.match(err({ sort: '01/01/2026' }), /AAAA-MM-DD/)
  assert.match(err({ power: 'toString' }), /"power" inválido/)
  assert.match(err({ status: 'valueOf' }), /"status" inválido/)
  assert.match(err({ cases: ['hasOwnProperty'] }), /código desconhecido/)
  assert.match(err({ cases: ['N1'] }), /só códigos de contexto/)
  assert.match(err({ cases: ['N1', 'A1'], status: 'contexto' }), /com código que pontua/)
  assert.match(err({ sources: [{ outlet: 'A', url: 'https://a/' }] }), /pelo menos 2 fontes/)
  assert.match(err({ sources: [{ outlet: 'A', url: 'javascript:alert(1)' }, { outlet: 'B', url: 'https://b/' }] }), /URL inválida/)
  assert.match(err({ sources: [{ outlet: 'A', url: 'https://a/' }, { outlet: 'B', url: 'https://a/' }] }), /URL repetida/)
  assert.match(err({ extra: 1 }), /campo desconhecido "extra"/)
  assert.match(err({ sources: [{ outlet: 'A', url: 'https://a/', data: 'x' }, { outlet: 'B', url: 'https://b/' }] }), /campo desconhecido "data"/)
})

test('validação do registro: forma, ids duplicados e campos desconhecidos no topo', () => {
  assert.match(validateRegister(null, model).join(), /não é um objeto/)
  assert.match(validateRegister({ updatedAt: '', items: [] }, model).join(), /updatedAt/)
  assert.match(validateRegister({ updatedAt: '1 de janeiro de 2026', items: [validItem(), validItem()] }, model).join(), /id duplicado/)
  assert.match(validateRegister({ updatedAt: '1 de janeiro de 2026', items: [], extra: 1 }, model).join(), /campo desconhecido no registro/)
})

test('normalizeItem descarta campos extras e fixa a ordem canônica', () => {
  const n = normalizeItem({ ...validItem(), zzz: 1 })
  assert.ok(!('zzz' in n))
  assert.deepEqual(Object.keys(n), ITEM_FIELDS)
})

// ---------- cobertura ----------
test('cobertura soma todas as ocorrências por esfera e lista códigos nunca usados', () => {
  const c = coverageStats(db.items, model, { days: 90 })
  assert.equal(Object.values(c.byPower).reduce((a, s) => a + s.n, 0), db.items.length)
  assert.ok(Array.isArray(c.unusedCodes))
})

test('validateModel pega dimensão inexistente, código repetido, gravidade e teto inválidos', () => {
  const bad = (rubric, extra = {}) => validateModel({ ...model, rubric, ...extra }).join(' | ')
  assert.match(bad([{ code: 'A1', dimension: 'inexistente', gravity: 2 }]), /dimensão inexistente/)
  assert.match(bad([{ code: 'A1', dimension: 'regras', gravity: 2 }, { code: 'A1', dimension: 'regras', gravity: 1 }]), /código repetido/)
  assert.match(bad([{ code: 'A1', dimension: 'regras', gravity: 5 }]), /gravidade inválida/)
  assert.match(bad([{ code: 'N1', dimension: null, gravity: 1 }]), /gravidade inválida/)
  assert.match(bad(model.rubric, { saturation: { ...model.saturation, regras: 0 } }), /teto ausente/)
})

test('updatedAt precisa estar por extenso em português', () => {
  assert.equal(updatedAtToIso('29 de outubro de 2026'), '2026-10-29')
  assert.equal(updatedAtToIso('1 de Março de 2026'), '2026-03-01')
  assert.equal(updatedAtToIso('2026-10-29'), null)
  assert.match(validateRegister({ updatedAt: '2026-10-29', items: [] }, model).join(), /por extenso/)
})

test('o modelo de visão entrega índice, estágio, itens com pontos e cobertura', () => {
  const site = buildSiteModel(db)
  assert.equal(site.score, computeScore(db.items, model).score)
  assert.ok(site.level && site.level.name)
  assert.ok(site.items.every((n) => typeof n.points === 'number' && n.weights))
  assert.ok(site.coverage.byPower)
})
