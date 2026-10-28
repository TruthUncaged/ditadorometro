// Dimensões avaliadas. As quatro primeiras são os indicadores de
// comportamento autoritário propostos por Levitsky e Ziblatt; as duas
// últimas medem o estado das instituições ("árbitros" e "grades de proteção").

export const INDICATORS = [
  {
    id: 'regras',
    name: 'Rejeição das regras do jogo',
    short: 'Regras',
    description: 'Rejeição ou compromisso fraco com as regras democráticas: tentativas de anular eleições, golpes, desrespeito à Constituição.',
  },
  {
    id: 'legitimidade',
    name: 'Negação da legitimidade dos oponentes',
    short: 'Legitimidade',
    description: 'Tratar adversários como criminosos, traidores ou ameaças existenciais, sem base legal.',
  },
  {
    id: 'violencia',
    name: 'Tolerância à violência',
    short: 'Violência',
    description: 'Encorajar, tolerar ou deixar de condenar violência política de aliados.',
  },
  {
    id: 'liberdades',
    name: 'Restrição de liberdades civis e de imprensa',
    short: 'Liberdades',
    description: 'Censura, bloqueio de plataformas e veículos, processos e medidas seletivas contra críticos, vigilância de opositores, restrição a protestos.',
  },
  {
    id: 'arbitros',
    name: 'Captura e abuso dos árbitros',
    short: 'Árbitros',
    description: 'De um lado, quem governa captura tribunais, Ministério Público, polícia e órgãos de controle (nomeações, empacotamento, expurgos, intimidação); de outro, os próprios árbitros agem sem freios (conflito de interesses, investigar e julgar, inquéritos sem objeto, sigilo).',
  },
  {
    id: 'reserva',
    name: 'Impunidade e quebra da reserva institucional',
    short: 'Impunidade',
    description: 'Casos graves que não são investigados, CPIs travadas, arquivamentos sem apuração, uso do cargo além do razoável.',
  },
]

// Peso aplicado à gravidade de cada ocorrência conforme a resposta das
// instituições. A linha de base (1,0) é um ato de Estado cumprido ou um caso
// em apuração; só há agravo quando há dever de apurar e inércia documentada,
// e só há desconto quando outra instituição reviu, reverteu ou puniu.
// Recalibrado em 28 de outubro de 2026 (amplitude de 3,75x para 2,2x): ver notes.js.
export const STATUS = {
  'sem-apuracao': { label: 'Sem apuração, apesar do dever de apurar', multiplier: 1.3 },
  arquivamento: { label: 'Arquivado ou anulado sem exame do mérito', multiplier: 1.3 },
  travada: { label: 'Apuração travada', multiplier: 1.2 },
  consumado: { label: 'Ato de Estado cumprido', multiplier: 1.0 },
  'em-curso': { label: 'Em apuração', multiplier: 1.0 },
  declaracao: { label: 'Declaração pública', multiplier: 0.8 },
  revisado: { label: 'Revisto por outra instituição ou limitado', multiplier: 0.9 },
  revertido: { label: 'Medida anulada ou desfeita', multiplier: 0.6 },
  responsabilizado: { label: 'Responsabilização efetivada', multiplier: 0.7 },
  contexto: { label: 'Contexto (não pontua)', multiplier: 0 },
}

// Pontos necessários para uma dimensão atingir 100%. O teto é por dimensão,
// proporcional à frequência natural das ocorrências de cada tipo: violência
// política e rupturas das regras são raras e graves; atos de tribunais e
// restrições a liberdades são frequentes. Com um teto único, as dimensões raras
// ficavam inertes. Toda mudança destes valores altera a leitura publicada de uma
// vez e deve vir com uma nota em src/data/notes.js e no README.
// Para simular: node scripts/saturacao.mjs 0.8 1 1.2 (fatores sobre os tetos atuais)
export const SATURATION = {
  regras: 20,
  legitimidade: 15,
  violencia: 12,
  liberdades: 30,
  arbitros: 30,
  reserva: 20,
}

// Uma ocorrência pontua integralmente na dimensão mais grave e pela metade na
// segunda; a partir da terceira não soma. Evita que um único ato visto por vários
// ângulos valha várias vezes mais que um ato de dimensão única.
export const SECOND_DIMENSION_WEIGHT = 0.5
export const MAX_DIMENSIONS_PER_ITEM = 2
