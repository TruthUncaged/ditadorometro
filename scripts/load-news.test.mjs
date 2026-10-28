// Testes do carregador seguro do registro: ele nunca executa o arquivo e só
// aceita dados literais. Os payloads abaixo são os que furavam a lista de
// regex usada antes. Rodar com: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { loadNewsFile } from './lib/load-news.mjs'

const dir = mkdtempSync(join(tmpdir(), 'news-test-'))
const proof = join(dir, 'prova.txt')
const write = (name, text) => {
  const p = join(dir, name)
  writeFileSync(p, text)
  return p
}
const VALID_TAIL = `
export const NEWS = [
  { id: 'a', sort: '2026-01-01', cases: ['A1'], status: 'em-curso', sources: [{ outlet: 'X', url: 'https://x/' }] },
]
export const UPDATED_AT = '1 de janeiro de 2026'
`

test('aceita o registro real do projeto', () => {
  const data = loadNewsFile(new URL('../src/data/news.js', import.meta.url))
  assert.ok(Array.isArray(data.NEWS) && data.NEWS.length > 0)
  assert.equal(typeof data.UPDATED_AT, 'string')
  assert.equal(typeof data.POWERS.executivo, 'string')
})

test('o trecho válido usado nos testes de recusa é aceito sozinho', () => {
  const data = loadNewsFile(write('tail.js', VALID_TAIL))
  assert.equal(data.NEWS.length, 1)
  assert.equal(data.UPDATED_AT, '1 de janeiro de 2026')
})

test('export com nome do protótipo não é confundido com duplicata', () => {
  const data = loadNewsFile(write('proto.js', `export const toString = 1\nexport const constructor = 2\n`))
  assert.deepEqual({ ...data }, { toString: 1, constructor: 2 })
  assert.throws(() => loadNewsFile(write('dup.js', `export const A = 1\nexport const A = 2\n`)), /duas vezes|already/)
})

test('aceita comentários, strings com aspas escapadas, números, booleanos e null', () => {
  const p = write('ok.js', `// comentário\n/* outro */\nexport const X = { a: 'it\\'s', b: "dupla", c: 1.5, d: true, e: null, 'f-g': [1, [2]] }\n`)
  assert.deepEqual(loadNewsFile(p), { X: { a: "it's", b: 'dupla', c: 1.5, d: true, e: null, 'f-g': [1, [2]] } })
})

const payloads = {
  'await import()': `const cp = await import('node:child_process')\ncp.execSync('touch ${proof}')\n`,
  'import estático': `import { writeFileSync } from 'node:fs'\nwriteFileSync('${proof}', '')\n`,
  'globalThis[...]': `globalThis['Func' + 'tion']('return process')().exit(0)\n`,
  'Reflect.apply': `Reflect.apply(console.log, null, ['x'])\n`,
  'constructor.constructor': `const f = ({}).constructor.constructor('return 1')\n`,
  'chamada em export': `export const Y = String(1)\n`,
  'template string': 'export const Y = `a`\n',
  'arrow function': `export const Y = { f: () => 1 }\n`,
  getter: `export const Y = { get a() { return 1 } }\n`,
  'método': `export const Y = { a() {} }\n`,
  'chave computada': `export const Y = { ['a' + 'b']: 1 }\n`,
  spread: `const Z = {}\nexport const Y = { ...Z }\n`,
  'identificador como valor': `export const Y = process\n`,
  'member expression': `export const Y = process.env\n`,
  'export let': `export let Y = 1\n`,
  'export default': `export default 1\n`,
  'export sem valor': `export const Y\n`,
  'expressão solta': `1 + 1\n`,
  regex: `export const Y = /a/\n`,
  bigint: `export const Y = 1n\n`,
  'unário': `export const Y = -1\n`,
  __proto__: `export const Y = { __proto__: { a: 1 } }\n`,
  'top-level await em export': `export const Y = await 1\n`,
  'sintaxe inválida': `export const Y = {\n`,
}

for (const [name, code] of Object.entries(payloads)) {
  test(`recusa sem executar: ${name}`, () => {
    const p = write(`${name.replace(/[^a-z]/gi, '_')}.js`, code + VALID_TAIL)
    assert.throws(() => loadNewsFile(p), /news\.js/)
    assert.ok(!existsSync(proof), 'o payload foi executado')
  })
}
