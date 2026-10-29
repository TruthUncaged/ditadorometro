// Repositório: a única porta de entrada para os dados. Recebe os documentos do
// banco já lidos (JSON) e expõe coleções e o modelo de cálculo. Não faz IO:
// quem lê arquivos (Node) ou importa JSON (site) injeta os documentos aqui.
import { createModel } from './model.js'

export const COLLECTIONS = ['ocorrencias', 'tabela', 'metodo', 'estagios', 'notas', 'historia']

export function createRepository(docs) {
  for (const c of COLLECTIONS) if (!docs[c] || typeof docs[c] !== 'object') throw new Error(`coleção "${c}" ausente no banco`)
  const model = createModel(docs.metodo, docs.tabela)
  return Object.freeze({
    register: docs.ocorrencias,
    items: docs.ocorrencias.items,
    updatedAt: docs.ocorrencias.updatedAt,
    rubric: docs.tabela.codes,
    method: docs.metodo,
    levels: docs.estagios.levels,
    notes: docs.notas.notes,
    history: docs.historia.cases,
    model,
  })
}
