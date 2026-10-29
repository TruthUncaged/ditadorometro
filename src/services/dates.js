// Datas do registro. "updatedAt" é escrito por extenso em português e precisa
// virar ISO para o sitemap, o JSON-LD e o feed.
const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

// "29 de outubro de 2026" → "2026-10-29"; null se o formato for outro.
export function updatedAtToIso(text) {
  const m = /^(\d{1,2}) de (\S+) de (\d{4})$/.exec(String(text ?? '').trim())
  const month = m ? MONTHS.indexOf(m[2].toLowerCase()) : -1
  return month < 0 ? null : `${m[3]}-${String(month + 1).padStart(2, '0')}-${m[1].padStart(2, '0')}`
}
