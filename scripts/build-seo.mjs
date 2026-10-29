// Etapa de SEO do build, depois de `vite build` e do build SSR:
//
//   SITE_URL=https://usuario.github.io/ditadorometro/ node scripts/build-seo.mjs
//
// - pré-renderiza a página em dist/index.html (o cliente hidrata em seguida);
// - escreve título, descrição, canonical, Open Graph, Twitter e JSON-LD com o índice atual;
// - gera robots.txt, sitemap.xml, site.webmanifest, favicon e a imagem de compartilhamento.

import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import { openDatabase } from '../src/services/repository.node.js'
import { computeScore } from '../src/services/scoring.js'
import { levelFor } from '../src/services/levels.js'
import { updatedAtToIso } from '../src/services/dates.js'

const db = openDatabase()
const NEWS = db.items
const UPDATED_AT = db.updatedAt
const INDICATORS = db.model.indicators

const SSR_ENTRY = 'dist-ssr/entry-server.js'
const site = (process.env.SITE_URL || 'http://localhost:4173/').replace(/\/?$/, '/')
if (!process.env.SITE_URL) console.warn(`SITE_URL não definido; usando ${site}`)

const updatedIso = updatedAtToIso(UPDATED_AT)
if (!updatedIso) throw new Error(`updatedAt em formato inesperado: "${UPDATED_AT}"`)

const { score, dimensions } = computeScore(NEWS, db.model)
const level = levelFor(score, db.levels)
const LEVEL_COLORS = ['#2f6b55', '#556f36', '#776715', '#9a5416', '#a0401c', '#84241d', '#4f1313']
const color = LEVEL_COLORS[level.id]

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// ---------- Textos ----------
const title = `Ditadorômetro: quão perto o Brasil está de uma ditadura? (${score}/100)`
const description =
  `Índice ${score}/100, estágio “${level.name}”. Medidor com fontes da erosão democrática no Brasil, ` +
  `baseado em Como as Democracias Morrem. Atualizado em ${UPDATED_AT}.`
const imageAlt = `Termômetro do Ditadorômetro marcando ${score} de 100: ${level.name}, estágio ${level.id} de 6.`

// ---------- Imagens ----------
function thermometer({ x, y, h, w, fill }) {
  const bulb = w * 1.15
  const level = Math.max(0, Math.min(1, fill)) * (h - w)
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" fill="#e8e3d6" stroke="#1b1a17" stroke-width="${w / 8}"/>
    <rect x="${x + w / 4}" y="${y + h - w / 2 - level}" width="${w / 2}" height="${level + w / 2}" rx="${w / 4}" fill="${color}"/>
    <circle cx="${x + w / 2}" cy="${y + h + bulb * 0.55}" r="${bulb}" fill="${color}" stroke="#1b1a17" stroke-width="${w / 8}"/>`
}

const SERIF = "Georgia, 'Source Serif 4', 'DejaVu Serif', serif"
const SANS = "Arial, 'IBM Plex Sans', 'DejaVu Sans', sans-serif"
// O nome do estágio precisa caber em ~860 px mesmo com fontes mais largas (DejaVu no runner Linux).
const nameSize = Math.min(56, Math.floor(860 / (level.name.length * 0.62)))
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f3f0e8"/>
  <rect x="0" y="0" width="1200" height="12" fill="${color}"/>
  ${thermometer({ x: 120, y: 80, h: 330, w: 56, fill: score / 100 })}
  <text x="300" y="150" font-family="${SANS}" font-size="30" font-weight="700" letter-spacing="4" fill="#4a463f">DITADORÔMETRO · BRASIL</text>
  <text x="296" y="320" font-family="${SERIF}" font-size="170" font-weight="700" fill="#1b1a17">${score}<tspan font-size="64" fill="#6b665c">/100</tspan></text>
  <text x="300" y="400" font-family="${SERIF}" font-size="${nameSize}" font-weight="700" fill="${color}">${esc(level.name)}</text>
  <text x="300" y="450" font-family="${SANS}" font-size="28" fill="#4a463f">Estágio ${level.id} de 6 · ${NEWS.length} ocorrências com fontes</text>
  <text x="300" y="492" font-family="${SANS}" font-size="28" fill="#4a463f">Atualizado em ${esc(UPDATED_AT)}</text>
  <rect x="120" y="545" width="960" height="2" fill="#e8e3d6"/>
  <text x="120" y="592" font-family="${SANS}" font-size="24" fill="#6b665c">Baseado em Como as Democracias Morrem, de Steven Levitsky e Daniel Ziblatt</text>
</svg>`

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#f3f0e8"/>
  <rect x="24" y="6" width="16" height="38" rx="8" fill="#e8e3d6" stroke="#1b1a17" stroke-width="3"/>
  <rect x="28" y="18" width="8" height="30" rx="4" fill="${color}"/>
  <circle cx="32" cy="48" r="11" fill="${color}" stroke="#1b1a17" stroke-width="3"/>
</svg>`

const png = (svg, width) => new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: { loadSystemFonts: true } }).render().asPng()

writeFileSync('dist/og-image.png', png(ogSvg, 1200))
writeFileSync('dist/favicon.svg', iconSvg)
writeFileSync('dist/apple-touch-icon.png', png(iconSvg, 180))
writeFileSync('dist/icon-512.png', png(iconSvg, 512))

// ---------- Dados estruturados ----------
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site}#site`,
      url: site,
      name: 'Ditadorômetro',
      inLanguage: 'pt-BR',
      description: 'Medidor público, com fontes, de sinais de erosão democrática no Brasil.',
      publisher: { '@id': `${site}#projeto` },
    },
    {
      '@type': 'Organization',
      '@id': `${site}#projeto`,
      name: 'Ditadorômetro',
      url: site,
      logo: { '@type': 'ImageObject', url: `${site}icon-512.png`, width: 512, height: 512 },
    },
    {
      '@type': 'WebPage',
      '@id': `${site}#pagina`,
      url: site,
      name: title,
      description,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': `${site}#site` },
      dateModified: updatedIso,
      primaryImageOfPage: { '@type': 'ImageObject', url: `${site}og-image.png`, width: 1200, height: 630 },
      about: { '@id': `${site}#livro` },
      mainEntity: { '@id': `${site}#registro` },
    },
    {
      '@type': 'Book',
      '@id': `${site}#livro`,
      name: 'Como as Democracias Morrem',
      author: [
        { '@type': 'Person', name: 'Steven Levitsky' },
        { '@type': 'Person', name: 'Daniel Ziblatt' },
      ],
    },
    {
      '@type': 'Dataset',
      '@id': `${site}#registro`,
      name: 'Registro de ocorrências do Ditadorômetro',
      description:
        `Ocorrências classificadas por uma tabela pública de critérios, cada uma com pelo menos duas fontes e a ` +
        `posição dos citados. Índice atual: ${score}/100 (${level.name}).`,
      url: `${site}#registro`,
      inLanguage: 'pt-BR',
      dateModified: updatedIso,
      isAccessibleForFree: true,
      creator: { '@id': `${site}#projeto` },
      variableMeasured: INDICATORS.map((i) => i.name),
      distribution: [{ '@type': 'DataDownload', encodingFormat: 'application/rss+xml', contentUrl: `${site}feed.xml` }],
    },
  ],
}

// ---------- <head> ----------
const head = `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${esc(site)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="author" content="Ditadorômetro" />
    <link rel="icon" href="favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <link rel="manifest" href="site.webmanifest" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Ditadorômetro" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${esc(site)}" />
    <meta property="og:image" content="${esc(site)}og-image.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(imageAlt)}" />
    <meta property="og:updated_time" content="${updatedIso}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${esc(site)}og-image.png" />
    <meta name="twitter:image:alt" content="${esc(imageAlt)}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`

// ---------- Página pré-renderizada ----------
const { render } = await import(pathToFileURL(SSR_ENTRY).href)
let html = readFileSync('dist/index.html', 'utf8')
const replace = (from, to) => {
  if (!html.includes(from)) throw new Error(`Marcador não encontrado em dist/index.html: ${from}`)
  html = html.replace(from, to)
}
replace('<title>Ditadorômetro</title>', head.trim())
replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
writeFileSync('dist/index.html', html)

// ---------- Arquivos para buscadores ----------
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`)
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${esc(site)}</loc>
    <lastmod>${updatedIso}</lastmod>
    <image:image><image:loc>${esc(site)}og-image.png</image:loc></image:image>
  </url>
</urlset>
`,
)
writeFileSync(
  'dist/site.webmanifest',
  JSON.stringify(
    {
      name: 'Ditadorômetro',
      short_name: 'Ditadorômetro',
      description: 'Medidor público, com fontes, de sinais de erosão democrática no Brasil.',
      lang: 'pt-BR',
      start_url: './',
      display: 'browser',
      background_color: '#f3f0e8',
      theme_color: '#f3f0e8',
      icons: [
        { src: 'favicon.svg', type: 'image/svg+xml', sizes: 'any' },
        { src: 'apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
        { src: 'icon-512.png', type: 'image/png', sizes: '512x512' },
      ],
    },
    null,
    2,
  ),
)

if (existsSync('dist-ssr')) rmSync('dist-ssr', { recursive: true })
console.log(`SEO: página pré-renderizada, índice ${score} (${level.name}), ${dimensions.length} dimensões; site ${site}`)
