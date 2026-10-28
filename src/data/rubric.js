// Tabela de classificação de referência.
//
// Toda ocorrência do registro (src/data/news.js) deve ser enquadrada em um
// ou mais códigos desta tabela. A gravidade (0 a 3) vem daqui, não do caso;
// assim, situações equivalentes recebem sempre a mesma pontuação, seja qual
// for o partido, o Poder ou a pessoa envolvida.
//
// "book" resume o trecho de "Como as Democracias Morrem" que justifica o
// código. "example" é um exemplo genérico ou histórico, nunca o caso concreto.

export const RUBRIC = [
  // ---------- 1. Rejeição das regras do jogo ----------
  {
    code: 'A1',
    dimension: 'regras',
    gravity: 2,
    type: 'Autoridade questiona, sem provas, a legitimidade de eleições ou do sistema de votação',
    book: 'Primeiro indicador: “questionam a legitimidade das eleições?”',
    example: 'Campanha oficial contra o sistema de apuração sem evidência de fraude.',
  },
  {
    code: 'A2',
    dimension: 'regras',
    gravity: 3,
    type: 'Defender, planejar ou tentar anular, adiar ou não reconhecer resultado eleitoral',
    book: 'Primeiro indicador: disposição de violar a Constituição ou rejeitar o resultado das urnas.',
    example: 'Plano para impedir a posse de governo eleito.',
  },
  {
    code: 'A3',
    dimension: 'regras',
    gravity: 3,
    type: 'Tentativa de golpe ou uso das Forças Armadas para fins políticos',
    book: 'Primeiro indicador: apoio a medidas extraconstitucionais, como golpes militares.',
    example: 'Chile, 1973; Brasil, 1964.',
  },
  {
    code: 'A4',
    dimension: 'regras',
    gravity: 2,
    type: 'Descumprimento deliberado de decisão judicial ou da Constituição por autoridade',
    book: 'Primeiro indicador: rejeição, em palavras ou atos, das regras democráticas.',
    example: 'Governo que se recusa a cumprir ordem da corte constitucional.',
  },
  {
    code: 'A5',
    dimension: 'regras',
    gravity: 2,
    type: 'Mudança de regras eleitorais ou constitucionais para favorecer quem está no poder',
    book: 'Terceira estratégia: “mudar as regras do jogo”.',
    example: 'Reeleição ilimitada (Venezuela, 2009); redesenho de distritos (Hungria, 2011).',
  },

  // ---------- 2. Negação da legitimidade dos oponentes ----------
  {
    code: 'B1',
    dimension: 'legitimidade',
    gravity: 1,
    type: 'Autoridade rotula adversários como inimigos, traidores ou ameaça existencial',
    book: 'Segundo indicador: descrever rivais como subversivos ou ameaça à ordem.',
    example: 'Chefe de governo chama a oposição de “inimiga da pátria”.',
  },
  {
    code: 'B2',
    dimension: 'legitimidade',
    gravity: 2,
    type: 'Pedido de prisão, cassação ou banimento de adversário por discurso ou opinião',
    book: 'Segundo indicador: sugerir que rivais sejam presos ou proibidos de disputar.',
    example: 'Proposta de dissolver partido de oposição por suas posições.',
  },
  {
    code: 'B3',
    dimension: 'legitimidade',
    gravity: 3,
    type: 'Uso de órgão do Estado para monitorar, fichar ou rotular críticos',
    book: 'Segunda estratégia: usar o aparato estatal para “tirar jogadores de campo”.',
    example: 'Dossiês de inteligência sobre jornalistas e opositores.',
  },
  {
    code: 'B4',
    dimension: 'legitimidade',
    gravity: 2,
    type: 'Medida cautelar contra líder de oposição cujo momento coincide com o resultado eleitoral ou cujo fundamento é a fala de terceiros',
    book: 'Segunda estratégia: usar o aparato estatal para “tirar jogadores de campo”, aplicando a lei de forma seletiva contra rivais.',
    example: 'Restrição imposta a candidato derrotado na própria noite da apuração, com base em declaração de um parente.',
  },

  // ---------- 3. Tolerância à violência ----------
  {
    code: 'C1',
    dimension: 'violencia',
    gravity: 1,
    type: 'Deixar de condenar violência política de aliados',
    book: 'Terceiro indicador: “recusam-se a condenar a violência de seus apoiadores?”',
    example: 'Silêncio oficial diante de agressões cometidas por militantes.',
  },
  {
    code: 'C2',
    dimension: 'violencia',
    gravity: 2,
    type: 'Elogiar ou justificar violência política, tortura ou golpes',
    book: 'Terceiro indicador: elogiar atos de violência política, no passado ou no exterior.',
    example: 'Homenagem pública a torturador do regime militar.',
  },
  {
    code: 'C3',
    dimension: 'violencia',
    gravity: 3,
    type: 'Incitar, financiar ou organizar violência política ou depredação de instituições',
    book: 'Terceiro indicador: laços com grupos armados ou milícias; incentivo a ataques.',
    example: 'Invasão e depredação de sedes dos Poderes.',
  },

  // ---------- 4. Restrição de liberdades civis e de imprensa ----------
  {
    code: 'D1',
    dimension: 'liberdades',
    gravity: 2,
    type: 'Remoção de conteúdo ou perfis sem decisão pública fundamentada e sem contraditório',
    book: 'Quarto indicador: restringir liberdades civis de rivais e críticos, inclusive a mídia.',
    example: 'Ordens sigilosas de bloqueio de contas de críticos.',
  },
  {
    code: 'D2',
    dimension: 'liberdades',
    gravity: 2,
    type: 'Suspensão de plataforma, veículo ou canal de comunicação inteiro',
    book: 'Quarto indicador; segunda estratégia: neutralizar a mídia.',
    example: 'Não renovação de concessão da RCTV (Venezuela, 2007).',
  },
  {
    code: 'D3',
    dimension: 'liberdades',
    gravity: 2,
    type: 'Ordem para apagar opinião sobre projeto de lei ou debate político em curso',
    book: 'Quarto indicador: punir críticas ao governo ou a suas propostas.',
    example: 'Empresa obrigada a apagar mensagem contrária a projeto em votação.',
  },
  {
    code: 'D4',
    dimension: 'liberdades',
    gravity: 3,
    type: 'Busca e apreensão, bloqueio de bens ou prisão em razão de manifestação de opinião',
    book: 'Quarto indicador: ameaçar críticos com ações legais ou punitivas.',
    example: 'Operação policial baseada em mensagens privadas, depois arquivada por falta de justa causa.',
  },
  {
    code: 'D5',
    dimension: 'liberdades',
    gravity: 2,
    type: 'Órgão do Executivo encarregado de definir o que é verdade ou notificar plataformas',
    book: 'Quarto indicador; segunda estratégia: usar o Estado contra a mídia crítica.',
    example: 'Conselho de mídia controlado pelo governo (Hungria, 2010).',
  },
  {
    code: 'D6',
    dimension: 'liberdades',
    gravity: 1,
    type: 'Regra legal ou jurisprudencial que incentiva remoção preventiva de conteúdo (efeito inibidor)',
    book: 'Quarto indicador: leis que ampliam punição a críticas e restringem protestos.',
    example: 'Responsabilização ampla de plataformas sem ordem judicial prévia.',
  },
  {
    code: 'D7',
    dimension: 'liberdades',
    gravity: 1,
    type: 'Autoridade elogia ou relativiza regimes ou medidas repressivas',
    book: 'Quarto indicador: “elogiaram medidas repressivas tomadas por outros governos?”',
    example: 'Chefe de Estado que trata ditadura estrangeira como democracia.',
  },
  {
    code: 'D8',
    dimension: 'liberdades',
    gravity: 2,
    type: 'Processos, multas ou assédio judicial contra jornalistas e veículos',
    book: 'Segunda estratégia: processos por difamação e multas para silenciar a imprensa.',
    example: 'Turquia, multas bilionárias ao grupo Doğan (2009).',
  },

  // ---------- 5. Captura dos árbitros ----------
  {
    code: 'E1',
    dimension: 'arbitros',
    gravity: 2,
    type: 'Conflito de interesses de julgador, procurador ou fiscal (contratos, familiares, relações pessoais)',
    book: 'Primeira estratégia: árbitros comprometidos deixam de fiscalizar o poder.',
    example: 'Parente de juiz contratado por parte interessada em casos da corte.',
  },
  {
    code: 'E2',
    dimension: 'arbitros',
    gravity: 3,
    type: 'Quebra do sistema acusatório: quem investiga também julga, ou ignora o Ministério Público',
    book: 'Primeira estratégia: árbitros convertidos em instrumento de punição.',
    example: 'Magistrado que se declara vítima, conduz a investigação e decide o caso.',
  },
  {
    code: 'E3',
    dimension: 'arbitros',
    gravity: 2,
    type: 'Inquérito aberto de ofício, sem objeto definido ou prazo para terminar',
    book: 'Primeira estratégia: investigações seletivas como arma.',
    example: 'Investigação genérica que se expande para novos alvos por anos.',
  },
  {
    code: 'E4',
    dimension: 'arbitros',
    gravity: 2,
    type: 'Concentração de caso em foro ou relator sem caminho jurídico claro',
    book: 'Primeira estratégia: controlar quem decide antes de decidir.',
    example: 'Corte superior atrai processo de primeira instância sem justificativa explícita.',
  },
  {
    code: 'E5',
    dimension: 'arbitros',
    gravity: 1,
    type: 'Sigilo amplo e prolongado sobre caso de interesse público',
    book: 'Reserva institucional: transparência como freio ao uso abusivo do cargo.',
    example: 'Inquérito que tramita anos sem acesso das defesas aos autos.',
  },
  {
    code: 'E6',
    dimension: 'arbitros',
    gravity: 1,
    type: 'Nomeação de aliado pessoal ou político direto para corte, procuradoria ou órgão de controle',
    book: 'Primeira estratégia: preencher os árbitros com aliados.',
    example: 'Presidente indica seu advogado pessoal para a corte constitucional.',
  },
  {
    code: 'E7',
    dimension: 'arbitros',
    gravity: 3,
    type: 'Ampliação de cadeiras, mudança de aposentadoria ou de regras da corte para obter maioria',
    book: 'Primeira estratégia: “empacotamento” das cortes.',
    example: 'Venezuela, 2004 (de 20 para 32 juízes); Hungria, 2011.',
  },
  {
    code: 'E8',
    dimension: 'arbitros',
    gravity: 3,
    type: 'Afastamento ou expurgo de juízes, procuradores ou policiais por motivação política',
    book: 'Primeira estratégia: impeachment ou demissão de árbitros independentes.',
    example: 'Argentina, 1946; Turquia, 2016.',
  },

  // ---------- 6. Impunidade e quebra da reserva institucional ----------
  {
    code: 'F1',
    dimension: 'reserva',
    gravity: 2,
    type: 'CPI com assinaturas suficientes que não é instalada',
    book: 'Abdicação dos guardiões: o Legislativo deixa de fiscalizar.',
    example: 'Presidência da Casa segura o requerimento indefinidamente.',
  },
  {
    code: 'F2',
    dimension: 'reserva',
    gravity: 1,
    type: 'Comissão ou investigação encerrada sem conclusão ou relatório',
    book: 'Abdicação dos guardiões.',
    example: 'CPI que termina com o relatório final rejeitado e nenhum aprovado.',
  },
  {
    code: 'F3',
    dimension: 'reserva',
    gravity: 2,
    type: 'Arquivamento, anulação de provas ou caso parado sem apuração do mérito',
    book: 'Reserva institucional: árbitros que deixam de agir também abdicam.',
    example: 'Pedido de nulidade de relatório policial antes de qualquer análise de conteúdo.',
  },
  {
    code: 'F4',
    dimension: 'reserva',
    gravity: 3,
    type: 'Autoridade citada ou investigada participa da decisão sobre o próprio caso',
    book: 'Reserva institucional: ninguém deve ser juiz em causa própria.',
    example: 'Chefe de órgão citado em provas decide se o caso avança.',
  },
  {
    code: 'F5',
    dimension: 'reserva',
    gravity: 1,
    type: 'Decisões individuais de alto impacto sem referendo do colegiado em prazo curto',
    book: 'Reserva institucional: não usar todo o poder que o cargo permite.',
    example: 'Liminar monocrática que suspende lei por meses.',
  },
  {
    code: 'F6',
    dimension: 'reserva',
    gravity: 2,
    type: 'Uso de prerrogativa legal até o limite para fins políticos (“jogo duro constitucional”)',
    book: 'Reserva institucional: o oposto do “jogo duro constitucional”.',
    example: 'Decretos de emergência sucessivos para evitar o Congresso.',
  },

  // ---------- Contexto: registrados, mas não pontuam ----------
  {
    code: 'N1',
    dimension: null,
    gravity: 0,
    type: 'Promessa de campanha não cumprida',
    book: 'O livro trata o descumprimento de promessas como falha de governo, julgada nas urnas — não como ruptura democrática.',
    example: 'Balanço de promessas ao fim do mandato.',
  },
  {
    code: 'N2',
    dimension: null,
    gravity: 0,
    type: 'Declaração falsa ou enganosa de autoridade',
    book: 'Só pontua quando usada para justificar restrição de direitos ou atacar eleições (reclassificar em A1, B1 ou D5).',
    example: 'Dado econômico distorcido em discurso.',
  },
  {
    code: 'N3',
    dimension: null,
    gravity: 0,
    type: 'Corrupção ou irregularidade investigada pelo caminho normal',
    book: 'Sinal de que as instituições funcionam.',
    example: 'Órgão de controle intervém e a polícia investiga.',
  },
]

export const RUBRIC_BY_CODE = Object.fromEntries(RUBRIC.map((r) => [r.code, r]))
