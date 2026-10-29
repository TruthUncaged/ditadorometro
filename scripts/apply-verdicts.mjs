// Consolida os votos dos verificadores e reescreve db/ocorrencias.json só com as
// mudanças aprovadas.
//
//   node scripts/apply-verdicts.mjs <base.json> <candidato.json> <pasta-de-vereditos>
//
// Regra: uma mudança entra se receber pelo menos 2 aprovações de 3 verificadores,
// nenhum veto e se a maioria confirmar os pontos calculados pelo script.
// Mudanças recusadas voltam à versão anterior (ou são descartadas, se novas).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { openDatabase, readRegisterFile, writeRegisterFile } from '../src/services/repository.node.js'
import { itemPoints } from '../src/services/scoring.js'
import { normalizeItem, validateRegister } from '../src/services/validation.js'

const VERIFIERS = 3
const MIN_APPROVALS = 2
const [basePath, candPath, verdictDir] = process.argv.slice(2)

const db = openDatabase()
const base = readRegisterFile(basePath)
const cand = readRegisterFile(candPath)
// O candidato é validado antes de qualquer decisão: um campo extra não pode
// ser descartado em silêncio pela normalização.
const candErrors = validateRegister(cand, db.model)
if (candErrors.length) {
  console.error(`✗ candidato inválido:\n` + candErrors.map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}
const changes = JSON.parse(readFileSync(join(verdictDir, '..', 'mudancas.json'), 'utf8'))

const verdicts = []
for (const f of readdirSync(verdictDir).filter((f) => /^veredito-.+\.json$/.test(f))) {
  try {
    verdicts.push(JSON.parse(readFileSync(join(verdictDir, f), 'utf8')))
  } catch {
    console.warn(`Veredito ilegível ignorado: ${f}`)
  }
}
if (verdicts.length < VERIFIERS) console.warn(`Atenção: ${verdicts.length} de ${VERIFIERS} vereditos recebidos.`)

const candById = new Map(cand.items.map((n) => [n.id, n]))
const decisions = changes.map((c) => {
  const votes = verdicts.map((v) => {
    const item = v.itens?.find((i) => i.id === c.id)
    return { verificador: v.verificador ?? '?', voto: item?.voto ?? 'rejeitar', motivo: item?.motivo ?? 'sem voto', pontos: item?.pontos }
  })
  const approvals = votes.filter((v) => v.voto === 'aprovar').length
  const veto = votes.some((v) => v.voto === 'vetar')
  let pointsOk = true
  if (c.tipo !== 'removida') {
    const expected = itemPoints(candById.get(c.id), db.model)
    const agree = votes.filter((v) => typeof v.pontos === 'number' && Math.abs(v.pontos - expected) < 0.05).length
    pointsOk = agree >= MIN_APPROVALS
  }
  const accepted = !veto && approvals >= MIN_APPROVALS && pointsOk
  return { ...c, votes, approvals, veto, pointsOk, accepted }
})

const accepted = new Set(decisions.filter((d) => d.accepted).map((d) => d.id))
const changed = new Set(decisions.map((d) => d.id))
const baseById = new Map(base.items.map((n) => [n.id, n]))

const final = []
for (const n of cand.items) {
  if (!changed.has(n.id) || accepted.has(n.id)) final.push(n)
  else if (baseById.has(n.id)) final.push(baseById.get(n.id))
}
for (const d of decisions) if (d.tipo === 'removida' && !d.accepted) final.push(baseById.get(d.id))
final.sort((a, b) => b.sort.localeCompare(a.sort))

const register = { updatedAt: accepted.size ? cand.updatedAt : base.updatedAt, items: final.map(normalizeItem) }
const errors = validateRegister(register, db.model)
if (errors.length) {
  console.error(`✗ resultado da consolidação inválido:\n` + errors.map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}
writeRegisterFile(db.registerFile, register)

// ---------- Relatório ----------
const icon = { aprovar: 'aprova', rejeitar: 'rejeita', vetar: '**veta**' }
const rows = decisions.map((d) => {
  const v = d.votes.map((x) => `${x.verificador}: ${icon[x.voto] ?? x.voto}`).join('; ')
  const why = d.accepted ? 'aceita' : d.veto ? 'recusada (veto)' : d.approvals < MIN_APPROVALS ? 'recusada (aprovações insuficientes)' : 'recusada (pontos não confirmados)'
  return `| \`${d.id}\` | ${d.tipo} | ${v} | ${why} |`
})
const reasons = decisions
  .flatMap((d) => d.votes.filter((v) => v.voto !== 'aprovar').map((v) => `- \`${d.id}\` · ${v.verificador}: ${v.motivo}`))
  .join('\n')
const coverage = verdicts
  .filter((v) => v.cobertura && typeof v.cobertura === 'object')
  .map((v) => {
    const c = v.cobertura
    const esferas = Array.isArray(c.esferas_menos_cobertas) ? c.esferas_menos_cobertas.join(', ') : '—'
    const buscas = Array.isArray(c.buscas_feitas) ? c.buscas_feitas.length : 0
    const om = Array.isArray(c.omissoes) ? c.omissoes.length : 0
    return `- ${v.verificador ?? '?'}: esferas menos cobertas: ${esferas}; ${buscas} busca(s) própria(s); ${om} omissão(ões) apontada(s) (ver data/pendencias.md).`
  })
  .join('\n')

writeFileSync(
  '.agent/consolidacao.md',
  `## Verificação independente

${verdicts.length} de ${VERIFIERS} verificadores responderam. Regra: ${MIN_APPROVALS} aprovações, nenhum veto e pontos confirmados pela maioria.

**${accepted.size} de ${decisions.length} mudança(s) aceita(s).**

| Ocorrência | Tipo | Votos | Resultado |
| --- | --- | --- | --- |
${rows.join('\n')}
${reasons ? `\n### Objeções registradas\n\n${reasons}\n` : ''}${coverage ? `\n### Cobertura (o que pode ter ficado de fora)\n\n${coverage}\n` : ''}`,
)
console.log(`${accepted.size}/${decisions.length} mudanças aceitas`)
