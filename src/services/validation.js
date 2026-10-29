// Validação do registro de ocorrências. Pura: recebe o registro (objeto já
// lido do JSON) e o modelo, devolve a lista de erros. Vazia = válido.
import { hasOwn } from './model.js'
import { updatedAtToIso } from './dates.js'

export const REQUIRED_FIELDS = ['id', 'sort', 'when', 'power', 'title', 'summary', 'response', 'status']
// Campos aceitos numa ocorrência e numa fonte. Qualquer outro é erro: a
// consolidação só grava estes, e um campo novo sumiria em silêncio.
export const ITEM_FIELDS = ['id', 'sort', 'when', 'power', 'title', 'summary', 'response', 'institutions', 'status', 'cases', 'sources']
export const SOURCE_FIELDS = ['outlet', 'url']
export const REGISTER_FIELDS = ['updatedAt', 'items']
export const MIN_SOURCES = 2

export function validateRegisterShape(register) {
  const errors = []
  if (!register || typeof register !== 'object' || Array.isArray(register)) return ['o registro não é um objeto']
  for (const k of Object.keys(register)) if (!REGISTER_FIELDS.includes(k)) errors.push(`campo desconhecido no registro: "${k}"`)
  if (typeof register.updatedAt !== 'string' || !updatedAtToIso(register.updatedAt)) errors.push('"updatedAt" deve ser a data por extenso (ex.: "29 de outubro de 2026")')
  if (!Array.isArray(register.items)) errors.push('"items" não é uma lista')
  return errors
}

export function validateItem(n, index, model, seenIds) {
  const errors = []
  const at = `ocorrência ${typeof n?.id === 'string' ? n.id : `#${index}`}`
  if (!n || typeof n !== 'object' || Array.isArray(n)) return [`${at}: não é um objeto`]
  for (const f of REQUIRED_FIELDS) if (typeof n[f] !== 'string' || !n[f].trim()) errors.push(`${at}: campo "${f}" vazio`)
  for (const f of Object.keys(n)) if (!ITEM_FIELDS.includes(f)) errors.push(`${at}: campo desconhecido "${f}"`)
  if (seenIds.has(n.id)) errors.push(`${at}: id duplicado`)
  seenIds.add(n.id)
  if (typeof n.id === 'string' && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(n.id)) errors.push(`${at}: id deve ser kebab-case`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(n.sort ?? '')) errors.push(`${at}: "sort" deve ser AAAA-MM-DD`)
  if (!hasOwn(model.powers, n.power ?? '')) errors.push(`${at}: "power" inválido (${n.power})`)
  if (!hasOwn(model.status, n.status ?? '')) errors.push(`${at}: "status" inválido (${n.status})`)
  if (!Array.isArray(n.institutions) || !n.institutions.length || !n.institutions.every((s) => typeof s === 'string' && s.trim())) errors.push(`${at}: "institutions" vazio ou inválido`)
  if (!Array.isArray(n.cases) || !n.cases.length) errors.push(`${at}: sem códigos em "cases"`)
  for (const c of n.cases ?? []) if (typeof c !== 'string' || !hasOwn(model.rubricByCode, c)) errors.push(`${at}: código desconhecido "${c}"`)

  const scoring = (n.cases ?? []).some((c) => hasOwn(model.rubricByCode, c) && model.rubricByCode[c].gravity > 0)
  if (n.status === 'contexto' && scoring) errors.push(`${at}: status "contexto" com código que pontua`)
  if (n.status !== 'contexto' && (n.cases ?? []).length && !scoring) errors.push(`${at}: só códigos de contexto; use status "contexto"`)

  const sources = Array.isArray(n.sources) ? n.sources : []
  if (sources.length < MIN_SOURCES) errors.push(`${at}: precisa de pelo menos ${MIN_SOURCES} fontes`)
  const urls = new Set()
  for (const s of sources) {
    if (!s || typeof s !== 'object') { errors.push(`${at}: fonte inválida`); continue }
    if (typeof s.outlet !== 'string' || !s.outlet.trim()) errors.push(`${at}: fonte sem nome do veículo`)
    for (const f of Object.keys(s)) if (!SOURCE_FIELDS.includes(f)) errors.push(`${at}: campo desconhecido "${f}" na fonte`)
    if (!/^https:\/\/[^\s]+$/.test(s.url ?? '')) errors.push(`${at}: URL inválida (${s.url})`)
    if (urls.has(s.url)) errors.push(`${at}: URL repetida (${s.url})`)
    urls.add(s.url)
  }
  return errors
}

// Valida o próprio modelo (tabela, tetos, multiplicadores): um erro aqui
// alteraria o índice em silêncio.
export function validateModel(model) {
  const errors = []
  const dims = new Set(model.indicators.map((i) => i.id))
  const seen = new Set()
  for (const r of model.rubric) {
    if (seen.has(r.code)) errors.push(`tabela: código repetido "${r.code}"`)
    seen.add(r.code)
    if (r.dimension && !dims.has(r.dimension)) errors.push(`tabela: ${r.code} aponta para dimensão inexistente "${r.dimension}"`)
    if (r.dimension ? !(r.gravity >= 1 && r.gravity <= 3) : r.gravity !== 0) errors.push(`tabela: ${r.code} com gravidade inválida (${r.gravity})`)
  }
  const cap = (id) => (typeof model.saturation === 'number' ? model.saturation : model.saturation?.[id])
  for (const id of dims) if (!(cap(id) > 0)) errors.push(`metodo: teto ausente ou inválido para "${id}"`)
  for (const [id, s] of Object.entries(model.status)) if (!(s && s.multiplier >= 0 && s.multiplier <= 2 && typeof s.label === 'string')) errors.push(`metodo: situação inválida "${id}"`)
  if (!(model.secondDimensionWeight >= 0 && model.secondDimensionWeight <= 1)) errors.push('metodo: secondDimensionWeight fora de 0–1')
  if (!(Number.isInteger(model.maxDimensionsPerItem) && model.maxDimensionsPerItem >= 1)) errors.push('metodo: maxDimensionsPerItem inválido')
  return errors
}

export function validateRegister(register, model) {
  const errors = validateRegisterShape(register)
  if (errors.length) return errors
  const seen = new Set()
  register.items.forEach((n, i) => errors.push(...validateItem(n, i, model, seen)))
  return errors
}

// Devolve uma cópia da ocorrência só com os campos aceitos, na ordem canônica.
export function normalizeItem(n) {
  const out = {}
  for (const f of ITEM_FIELDS) if (f in n) out[f] = f === 'sources' ? n.sources.map((s) => ({ outlet: s.outlet, url: s.url })) : n[f]
  return out
}
