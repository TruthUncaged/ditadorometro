// Gera dist/feed.xml (RSS 2.0) a partir do registro, depois do build.
//
//   SITE_URL=https://usuario.github.io/ditadorometro/ node scripts/build-feed.mjs
//
// O feed tem um item para o índice, que reaparece no leitor sempre que o índice
// muda, e um item por ocorrência, que reaparece quando a situação dela muda.

import { mkdirSync, writeFileSync } from 'node:fs'
import { NEWS, POWERS, UPDATED_AT } from '../src/data/news.js'
import { STATUS } from '../src/data/indicators.js'
import { levelFor } from '../src/data/levels.js'
import { computeScore, itemPoints } from '../src/lib/score.js'

const site = (process.env.SITE_URL || 'http://localhost:4173/').replace(/\/?$/, '/')
if (!process.env.SITE_URL) console.warn(`SITE_URL não definido; usando ${site}`)

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

// "28 de outubro de 2026" → Date
function parseUpdatedAt(text) {
  const m = /^(\d{1,2}) de (\S+) de (\d{4})$/.exec(text.trim())
  const month = m ? MONTHS.indexOf(m[2].toLowerCase()) : -1
  if (month < 0) throw new Error(`UPDATED_AT em formato inesperado: "${text}"`)
  return new Date(Date.UTC(+m[3], month, +m[1], 12))
}

// "2026-09-01" → Date (meio-dia em Brasília, para não trocar de dia em nenhum fuso)
const dayOf = (sort) => new Date(`${sort.slice(0, 10)}T12:00:00-03:00`)

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const fmt = (n) => n.toFixed(1).replace('.', ',')

const updated = parseUpdatedAt(UPDATED_AT)
const { score, dimensions } = computeScore(NEWS)
const level = levelFor(score)

const indexItem = {
  title: `Índice em ${score}/100: ${level.name}`,
  link: `${site}#inicio`,
  guid: `indice-${score}-${updated.toISOString().slice(0, 10)}`,
  date: updated,
  category: 'Índice',
  html: [
    `<p><strong>Estágio ${level.id} de 6: ${esc(level.name)}.</strong> ${esc(level.summary)}</p>`,
    '<ul>',
    ...dimensions.map((d) => `<li>${esc(d.name)}: ${Math.round(d.ratio * 100)}% (${fmt(d.raw)} pontos)</li>`),
    '</ul>',
    `<p>Registro atualizado em ${esc(UPDATED_AT)}, com ${NEWS.length} ocorrências.</p>`,
  ].join(''),
}

const newsItems = NEWS.map((n) => ({
  title: n.title,
  link: `${site}#ocorrencia-${n.id}`,
  guid: `${n.id}:${n.status}`,
  date: dayOf(n.sort),
  category: POWERS[n.power],
  html: [
    `<p><strong>${esc(STATUS[n.status].label)}</strong> · ${esc(n.institutions.join(', '))} · ${esc(n.when)}</p>`,
    `<p>${esc(n.summary)}</p>`,
    `<p><strong>Outro lado:</strong> ${esc(n.response)}</p>`,
    `<p>Códigos: ${esc(n.cases.join(', '))} · ${fmt(itemPoints(n))} pontos</p>`,
    '<p>Fontes:</p><ul>',
    ...n.sources.map((s) => `<li><a href="${esc(s.url)}">${esc(s.outlet)}</a></li>`),
    '</ul>',
  ].join(''),
}))

const item = (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${esc(i.link)}</link>
      <guid isPermaLink="false">${esc(i.guid)}</guid>
      <pubDate>${i.date.toUTCString()}</pubDate>
      <category>${esc(i.category)}</category>
      <description>${esc(i.html)}</description>
    </item>`

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ditadorômetro</title>
    <link>${esc(site)}</link>
    <atom:link href="${esc(site)}feed.xml" rel="self" type="application/rss+xml" />
    <description>Atualizações do índice e do registro de ocorrências do Ditadorômetro, medidor de sinais de erosão democrática no Brasil baseado em Como as Democracias Morrem (Levitsky e Ziblatt).</description>
    <language>pt-BR</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
    <ttl>720</ttl>
${[indexItem, ...newsItems].map(item).join('\n')}
  </channel>
</rss>
`

mkdirSync('dist', { recursive: true })
writeFileSync('dist/feed.xml', xml)
console.log(`dist/feed.xml: ${newsItems.length + 1} itens, índice ${score}`)
