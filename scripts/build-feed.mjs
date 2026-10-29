// Gera dist/feed.xml (RSS 2.0) a partir do registro, depois do build.
//
//   SITE_URL=https://usuario.github.io/ditadorometro/ node scripts/build-feed.mjs
//
// O feed tem um item para o índice, que reaparece no leitor sempre que o índice
// muda (o guid é o próprio valor), e um item por ocorrência, que reaparece quando
// a situação dela muda (o guid é id + status).

import { mkdirSync, writeFileSync } from 'node:fs'
import { openDatabase } from '../src/services/repository.node.js'
import { computeScore, itemPoints } from '../src/services/scoring.js'
import { levelFor } from '../src/services/levels.js'
import { updatedAtToIso } from '../src/services/dates.js'

const db = openDatabase()
const NEWS = db.items
const UPDATED_AT = db.updatedAt
const POWERS = db.model.powers
const STATUS = db.model.status

const site = (process.env.SITE_URL || 'http://localhost:4173/').replace(/\/?$/, '/')
if (!process.env.SITE_URL) console.warn(`SITE_URL não definido; usando ${site}`)

// "29 de outubro de 2026" → Date (meio-dia UTC)
function parseUpdatedAt(text) {
  const iso = updatedAtToIso(text)
  if (!iso) throw new Error(`updatedAt em formato inesperado: "${text}"`)
  return new Date(`${iso}T12:00:00Z`)
}

// "2026-09-01" → Date (meio-dia em Brasília, para não trocar de dia em nenhum fuso)
const dayOf = (sort) => new Date(`${sort.slice(0, 10)}T12:00:00-03:00`)

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const fmt = (n) => n.toFixed(1).replace('.', ',')

const updated = parseUpdatedAt(UPDATED_AT)
const { score, dimensions } = computeScore(NEWS, db.model)
const level = levelFor(score, db.levels)

const indexItem = {
  title: `Índice em ${score}/100: ${level.name}`,
  link: `${site}#inicio`,
  // Sem a data: o item só reaparece no leitor quando o índice muda, não a cada atualização.
  guid: `indice-${score}`,
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
    `<p>Códigos: ${esc(n.cases.join(', '))} · ${fmt(itemPoints(n, db.model))} pontos</p>`,
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
