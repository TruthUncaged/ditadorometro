// Repositório para Node (scripts e automação): lê e grava os JSON em db/.
// JSON.parse não executa nada, então um registro escrito por um agente é só
// dados por construção; a validação de forma e de campos fica em validation.js.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { COLLECTIONS, createRepository } from './repository.js'

export const DB_DIR = fileURLToPath(new URL('../../db/', import.meta.url))
export const REGISTER_FILE = join(DB_DIR, 'ocorrencias.json')

export function readJson(path) {
  let text
  try {
    text = readFileSync(path, 'utf8')
  } catch (e) {
    throw new Error(`não foi possível ler ${path}: ${e.message}`)
  }
  try {
    return JSON.parse(text)
  } catch (e) {
    throw new Error(`${path} não é JSON válido: ${e.message}`)
  }
}

// Lê um registro de qualquer caminho (base, candidato) e garante a forma mínima.
export function readRegisterFile(path) {
  const data = readJson(path)
  if (!data || typeof data !== 'object' || Array.isArray(data) || !Array.isArray(data.items)) throw new Error(`${path}: registro sem lista "items"`)
  return data
}

// Grava o registro com formatação estável (2 espaços, newline final). A ordem
// canônica dos campos é responsabilidade de normalizeItem (validation.js).
export function writeRegisterFile(path, register) {
  writeFileSync(path, JSON.stringify(register, null, 2) + '\n')
}

export function openDatabase(dir = DB_DIR) {
  const docs = Object.fromEntries(COLLECTIONS.map((c) => [c, readJson(join(dir, `${c}.json`))]))
  const repo = createRepository(docs)
  return Object.freeze({ ...repo, dir, registerFile: join(dir, 'ocorrencias.json') })
}
