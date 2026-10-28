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
    description: 'Censura, bloqueio de plataformas e veículos, processos contra críticos, inquéritos sem objeto definido.',
  },
  {
    id: 'arbitros',
    name: 'Captura dos árbitros',
    short: 'Árbitros',
    description: 'Conflitos de interesse e alinhamento de tribunais, Ministério Público, polícia e órgãos de controle com quem deveriam fiscalizar.',
  },
  {
    id: 'reserva',
    name: 'Impunidade e quebra da reserva institucional',
    short: 'Impunidade',
    description: 'Casos graves que não são investigados, CPIs travadas, arquivamentos sem apuração, uso do cargo além do razoável.',
  },
]

// Peso aplicado à gravidade de cada ocorrência conforme a resposta das
// instituições. Quanto menos se apura, mais o caso pesa no termômetro.
export const STATUS = {
  'sem-apuracao': { label: 'Sem apuração formal conhecida', multiplier: 1.5 },
  arquivamento: { label: 'Arquivamento ou nulidade pedidos', multiplier: 1.4 },
  travada: { label: 'Apuração travada', multiplier: 1.3 },
  consumado: { label: 'Medida consumada, sem responsabilização', multiplier: 1.2 },
  'em-curso': { label: 'Em curso', multiplier: 1.0 },
  declaracao: { label: 'Declaração pública', multiplier: 1.0 },
  revisado: { label: 'Revisado por colegiado', multiplier: 0.8 },
  responsabilizado: { label: 'Responsabilização efetivada', multiplier: 0.4 },
  contexto: { label: 'Contexto (não pontua)', multiplier: 0 },
}

// Pontos necessários para uma dimensão atingir 100%.
export const SATURATION = 15
