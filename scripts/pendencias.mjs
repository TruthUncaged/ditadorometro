// Monta data/pendencias.md a partir da fila do pesquisador (seção "Fila" do
// relatório) e das omissões apontadas pelos verificadores (campo "cobertura"
// dos vereditos). O pesquisador do dia seguinte lê esse arquivo no Passo 2.
//
//   node scripts/pendencias.mjs <relatorio.md> <pasta-de-vereditos> <saida.md>

import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'

const [relPath, verdictDir, outPath = 'data/pendencias.md'] = process.argv.slice(2)
const today = new Date().toISOString().slice(0, 10)

// Seção "Fila" do relatório: do título (heading ou item em negrito) até o próximo título do mesmo tipo.
function extractFila(md) {
  const lines = md.split('\n')
  const isHead = (l) => /^#{1,6}\s/.test(l) || /^\s*-\s+\*\*[^*]+\*\*/.test(l)
  const start = lines.findIndex((l) => isHead(l) && /fila/i.test(l))
  if (start < 0) return ''
  const out = [lines[start].replace(/^\s*-\s+\*\*([^*]+)\*\*:?\s*/, '').replace(/^#+\s*/, '')]
  for (const l of lines.slice(start + 1)) {
    if (isHead(l)) break
    out.push(l)
  }
  return out.join('\n').trim()
}

const fila = relPath && existsSync(relPath) ? extractFila(readFileSync(relPath, 'utf8')) : ''

const omissoes = []
if (verdictDir && existsSync(verdictDir) && statSync(verdictDir).isDirectory()) {
  for (const f of readdirSync(verdictDir).filter((f) => /^veredito-.+\.json$/.test(f))) {
    try {
      const v = JSON.parse(readFileSync(join(verdictDir, f), 'utf8'))
      for (const o of v.cobertura?.omissoes ?? []) {
        if (typeof o?.titulo !== 'string') continue
        const fontes = Array.isArray(o.fontes) ? o.fontes.filter((u) => typeof u === 'string' && /^https:\/\/\S+$/.test(u)) : []
        const codigos = Array.isArray(o.codigos_provaveis) ? o.codigos_provaveis.filter((c) => typeof c === 'string').join(', ') : ''
        omissoes.push(`- **${o.titulo.replace(/\s+/g, ' ').slice(0, 200)}** (${v.verificador ?? '?'}; códigos prováveis: ${codigos || '—'}; ${String(o.motivo ?? '').slice(0, 300)})${fontes.map((u) => `\n  - ${u}`).join('')}`)
      }
    } catch {
      // veredito ilegível: ignorado aqui, já contado na consolidação
    }
  }
}

const md = `# Pendências para a próxima atualização

Gerado automaticamente em ${today} pela consolidação (scripts/pendencias.mjs). O pesquisador lê este arquivo no
Passo 2 e avalia cada item pelas regras normais; nada aqui entra no registro sem fontes verificadas.

## Fila do pesquisador

${fila || '_Nenhuma candidata na fila._'}

## Omissões apontadas pelos verificadores

${omissoes.join('\n') || '_Nenhuma._'}
`
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, md)
console.log(`${outPath}: fila ${fila ? 'presente' : 'vazia'}, ${omissoes.length} omissão(ões)`)
