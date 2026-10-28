// Verifica se as fontes do registro ainda respondem e grava um relatório.
//
//   node scripts/check-links.mjs [arquivo-de-saída]

import { writeFileSync } from 'node:fs'
import { loadNewsFile } from './lib/load-news.mjs'

// Nunca importa o registro diretamente (ver scripts/lib/load-news.mjs).
const { NEWS } = loadNewsFile(new URL('../src/data/news.js', import.meta.url))

const OUT = process.argv[2] ?? '.agent/links.md'
const UA = 'Mozilla/5.0 (compatible; Ditadorometro-LinkCheck/1.0)'

async function check(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20000) })
    return { status: res.status, final: res.url !== url ? res.url : '' }
  } catch (e) {
    return { status: 0, error: e.cause?.code ?? e.name }
  }
}

const rows = []
let broken = 0
for (const n of NEWS) {
  for (const s of n.sources) {
    const r = await check(s.url)
    const ok = r.status >= 200 && r.status < 400
    if (!ok) broken++
    const state = ok ? 'ok' : r.status === 403 || r.status === 429 ? `${r.status} (pode ser bloqueio a robôs)` : r.status ? `**${r.status}**` : `**erro: ${r.error}**`
    rows.push(`| \`${n.id}\` | ${s.outlet} | ${state} | ${r.final ? `redireciona para ${r.final}` : ''} |`)
  }
}

const md = `## Verificação das fontes existentes

${broken ? `**${broken} fonte(s) com problema.** Substitua as quebradas por fontes equivalentes e verificadas.` : 'Todas as fontes responderam.'}

| Ocorrência | Veículo | Situação | Observação |
| --- | --- | --- | --- |
${rows.join('\n')}
`

writeFileSync(OUT, md)
console.log(`${rows.length} links verificados, ${broken} com problema → ${OUT}`)
