// Carregador seguro do registro de ocorrências.
//
// src/data/news.js é escrito por agentes expostos a conteúdo da web, então
// nenhum script pode simplesmente importá-lo: um `import()` executa qualquer
// código de topo do módulo. Em vez disso, este carregador analisa a sintaxe
// do arquivo e só aceita uma lista fechada de construções, todas de dados:
//
//   export const NOME = <valor>
//   <valor> := string | número | true | false | null | [<valor>, ...] | { chave: <valor>, ... }
//
// Qualquer outra coisa (chamadas, await, import, template strings, funções,
// getters, spread, chaves computadas, regex...) é recusada com a linha do erro.
// Os valores são montados a partir da árvore sintática, sem avaliar o arquivo.

import { readFileSync } from 'node:fs'
import { parse } from 'acorn'

const fail = (node, msg) => {
  throw new Error(`news.js linha ${node.loc.start.line}: ${msg}`)
}

function value(node) {
  switch (node.type) {
    case 'Literal':
      if (node.regex || node.bigint !== undefined) fail(node, 'literal não permitido')
      if (!['string', 'number', 'boolean'].includes(typeof node.value) && node.value !== null) fail(node, 'literal não permitido')
      return node.value
    case 'ArrayExpression':
      return node.elements.map((el) => {
        if (!el) fail(node, 'buraco em array')
        if (el.type === 'SpreadElement') fail(el, 'spread não permitido')
        return value(el)
      })
    case 'ObjectExpression': {
      const out = {}
      for (const p of node.properties) {
        if (p.type !== 'Property') fail(p, 'spread não permitido em objeto')
        if (p.computed || p.method || p.shorthand || p.kind !== 'init') fail(p, 'propriedade não permitida')
        const key = p.key.type === 'Identifier' ? p.key.name : p.key.type === 'Literal' && typeof p.key.value === 'string' ? p.key.value : fail(p, 'chave não permitida')
        if (key === '__proto__') fail(p, 'chave não permitida')
        out[key] = value(p.value)
      }
      return out
    }
    default:
      fail(node, `construção não permitida (${node.type})`)
  }
}

// Lê e valida o arquivo; devolve { NEWS, POWERS, UPDATED_AT, ... } como dados puros.
export function loadNewsFile(path) {
  const source = readFileSync(path, 'utf8')
  let ast
  try {
    ast = parse(source, { ecmaVersion: 'latest', sourceType: 'module', locations: true })
  } catch (e) {
    throw new Error(`news.js não é JavaScript válido: ${e.message}`)
  }
  const exports = Object.create(null)
  for (const stmt of ast.body) {
    if (stmt.type !== 'ExportNamedDeclaration' || !stmt.declaration) fail(stmt, `só "export const" é permitido (${stmt.type})`)
    const decl = stmt.declaration
    if (decl.type !== 'VariableDeclaration' || decl.kind !== 'const') fail(decl, 'só "export const" é permitido')
    for (const d of decl.declarations) {
      if (d.id.type !== 'Identifier') fail(d, 'destructuring não permitido')
      if (!d.init) fail(d, 'constante sem valor')
      if (d.id.name in exports) fail(d, `"${d.id.name}" exportado duas vezes`)
      exports[d.id.name] = value(d.init)
    }
  }
  return { ...exports }
}
