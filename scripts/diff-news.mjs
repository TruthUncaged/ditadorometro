// Compara duas versões do registro e lista o que mudou, para os verificadores.
//
//   node scripts/diff-news.mjs <base.mjs> <candidato.js> [pasta-de-saída]
//
// Grava mudancas.json e mudancas.md na pasta de saída e imprime a quantidade.

import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { itemPoints } from '../src/lib/score.js'
import { loadNewsFile } from './lib/load-news.mjs'

const [basePath, candPath, out = '.agent'] = process.argv.slice(2)

// Nunca importa o arquivo: o candidato vem de um agente e pode conter código.
export function loadNews(path) {
  return loadNewsFile(path)
}

// Comparação estável, indiferente à ordem das chaves.
const canon = (v) =>
  Array.isArray(v) ? `[${v.map(canon).join(',')}]`
  : v && typeof v === 'object' ? `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${canon(v[k])}`).join(',')}}`
  : JSON.stringify(v)

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const base = loadNews(basePath).NEWS
  const cand = loadNews(candPath).NEWS
  const byId = (list) => new Map(list.map((n) => [n.id, n]))
  const B = byId(base)
  const C = byId(cand)

  const changes = []
  for (const n of cand) {
    const b = B.get(n.id)
    if (!b) changes.push({ id: n.id, tipo: 'nova', pontos: itemPoints(n), depois: n })
    else if (canon(b) !== canon(n)) {
      const campos = Object.keys({ ...b, ...n }).filter((k) => canon(b[k]) !== canon(n[k]))
      changes.push({ id: n.id, tipo: 'alterada', campos, pontos: itemPoints(n), antes: b, depois: n })
    }
  }
  for (const b of base) if (!C.has(b.id)) changes.push({ id: b.id, tipo: 'removida', pontos: 0, antes: b })

  writeFileSync(join(out, 'mudancas.json'), JSON.stringify(changes, null, 2))

  const md = changes.map((c) => {
    const head = `### \`${c.id}\` — ${c.tipo}${c.campos ? ` (campos: ${c.campos.join(', ')})` : ''}`
    const calc = c.tipo === 'removida' ? '' : `\nPontos calculados pelo script: **${c.pontos.toFixed(2)}**\n`
    const before = c.antes ? `\nAntes:\n\n\`\`\`json\n${JSON.stringify(c.antes, null, 2)}\n\`\`\`\n` : ''
    const after = c.depois ? `\nDepois:\n\n\`\`\`json\n${JSON.stringify(c.depois, null, 2)}\n\`\`\`\n` : ''
    return head + calc + before + after
  })
  writeFileSync(join(out, 'mudancas.md'), `# Mudanças propostas (${changes.length})\n\n${md.join('\n')}`)
  console.log(changes.length)
}
