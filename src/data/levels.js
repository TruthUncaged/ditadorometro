// Escala do termômetro, da democracia plena (0) à ditadura (6).
// Cada faixa ocupa 1/7 da escala de 0 a 100.
// Os estágios seguem o roteiro descrito por Levitsky e Ziblatt em
// "Como as Democracias Morrem": enfraquecimento das grades de proteção,
// captura dos árbitros, afastamento dos adversários e mudança das regras.

export const LEVELS = [
  {
    id: 0,
    name: 'Democracia plena',
    summary:
      'Liberdade irrestrita de expressão e imprensa. Árbitros (tribunais, Ministério Público, polícia, órgãos de controle) independentes. Oposição tratada como adversária legítima, não como inimiga.',
    examples: [],
  },
  {
    id: 1,
    name: 'Grades de proteção desgastadas',
    summary:
      'As regras escritas seguem valendo, mas as não escritas — tolerância mútua e reserva institucional — enfraquecem. Polarização crescente; o adversário passa a ser visto como ameaça.',
    examples: ['Chile, anos 1960–1973', 'Estados Unidos, anos 2010 (caso analisado no livro)'],
  },
  {
    id: 2,
    name: 'Erosão das normas',
    summary:
      'Prerrogativas legais usadas até o limite (“jogo duro constitucional”). Investigações seletivas, sigilo excessivo, decisões monocráticas sem controle. Casos graves ficam sem apuração.',
    examples: ['Venezuela, 1999–2003', 'Equador, 2007–2010'],
  },
  {
    id: 3,
    name: 'Captura dos árbitros',
    summary:
      'Tribunais, procuradoria, polícia e órgãos de controle passam a proteger aliados e mirar adversários. Quem deveria fiscalizar o poder fica imune à fiscalização.',
    examples: ['Argentina, 1946–1947', 'Hungria, 2011–2013', 'Turquia, 2010'],
  },
  {
    id: 4,
    name: 'Adversários fora de campo',
    summary:
      'Perseguição a opositores, jornalistas, empresários e plataformas. Censura indireta, multas e processos usados para silenciar. A autocensura se espalha.',
    examples: ['Venezuela, 2007', 'Turquia, 2016–2017', 'Rússia, anos 2000'],
  },
  {
    id: 5,
    name: 'Regras reescritas',
    summary:
      'Constituição, sistema eleitoral e composição de cortes alterados para perpetuar o grupo no poder. Eleições continuam existindo, mas deixam de ser justas: autoritarismo competitivo.',
    examples: ['Venezuela, 2009–2017', 'Hungria, 2011–presente', 'Nicarágua, 2007–2021'],
  },
  {
    id: 6,
    name: 'Ditadura',
    summary:
      'Fechamento ou neutralização do Legislativo, suspensão de garantias individuais, censura prévia, presos políticos. Todos os direitos ficam sujeitos à vontade do Estado.',
    examples: ['Brasil, AI-5 (1968)', 'Peru, autogolpe (1992)', 'Alemanha, 1933', 'Chile, 1973'],
  },
]

export const BAND = 100 / LEVELS.length

export function levelFor(score) {
  return LEVELS[Math.min(LEVELS.length - 1, Math.floor(score / BAND))]
}
