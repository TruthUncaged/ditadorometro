// Tabela de classificação de referência.
//
// Toda ocorrência do registro (src/data/news.js) deve ser enquadrada em um
// ou mais códigos desta tabela. A gravidade (0 a 3) vem daqui, não do caso;
// assim, situações equivalentes recebem sempre a mesma pontuação, seja qual
// for o partido, o Poder ou a pessoa envolvida.
//
// "book" resume o trecho de "Como as Democracias Morrem" que justifica o
// código. "example" é um exemplo genérico ou histórico, nunca o caso concreto.
//
// Simetria: todo código descreve uma conduta, não um ator. Para cada conduta
// típica de tribunais ou do Ministério Público há um espelho para o Executivo,
// o Legislativo, partidos e candidatos (D9–D12, E9–E10, F7–F8), e vice-versa.
// A gravidade reflete o alcance e a irreversibilidade do ato, não o seu motivo:
// o motivo entra no "outro lado" e na situação (status).

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
    type: 'Tentativa de golpe ou plano para impedir a posse de governo eleito, com ou sem uso das Forças Armadas',
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

  {
    code: 'A6',
    dimension: 'regras',
    gravity: 2,
    type: 'Manifestação política de militares da ativa ou pressão institucional das Forças Armadas sobre outro Poder',
    book: 'Primeiro indicador: usar meios extraconstitucionais, inclusive a ameaça militar, para pressionar instituições.',
    example: 'Comandante militar divulga nota sobre votação em curso no Parlamento ou no tribunal.',
  },
  {
    code: 'A7',
    dimension: 'regras',
    gravity: 3,
    type: 'Indulto, anistia ou perdão a aliados ou a condenados por crimes contra a ordem democrática',
    book: 'Primeiro indicador e quebra da reserva institucional: a lei é aplicada aos adversários e suspensa para os aliados.',
    example: 'Governo perdoa condenados por ataque a prédios públicos que agiram em seu favor.',
  },

  // ---------- 2. Negação da legitimidade dos oponentes ----------
  {
    code: 'B1',
    dimension: 'legitimidade',
    gravity: 2,
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

  {
    code: 'C4',
    dimension: 'violencia',
    gravity: 3,
    type: 'Vínculo de autoridade, candidato ou partido com milícias, grupos armados ou paramilitares',
    book: 'Terceiro indicador: ter laços com gangues armadas, forças paramilitares ou milícias.',
    example: 'Partido mantém braço armado ou autoridade protege grupo paramilitar que intimida opositores.',
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
    gravity: 3,
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
    example: 'Tribunal manda retirar do ar manifesto de entidade contra proposta em discussão no Parlamento.',
  },
  {
    code: 'D4',
    dimension: 'liberdades',
    gravity: 3,
    type: 'Busca e apreensão, bloqueio de bens ou prisão em razão de manifestação de opinião',
    book: 'Quarto indicador: ameaçar críticos com ações legais ou punitivas.',
    example: 'Prisão ou busca em casa de cidadão por críticas a autoridades, sem indício de crime além da opinião.',
  },
  {
    code: 'D5',
    dimension: 'liberdades',
    gravity: 2,
    type: 'Órgão do Estado encarregado de definir o que é verdade ou de notificar plataformas para remover conteúdo',
    book: 'Quarto indicador; segunda estratégia: usar o Estado contra a mídia crítica.',
    example: 'Conselho de mídia controlado pelo governo (Hungria, 2010).',
  },
  {
    code: 'D6',
    dimension: 'liberdades',
    gravity: 1,
    type: 'Regra legal ou jurisprudencial que incentiva remoção preventiva de conteúdo (efeito inibidor)',
    book: 'Quarto indicador: leis que ampliam punição a críticas e restringem protestos.',
    example: 'Lei que multa veículos ou plataformas por conteúdo “ofensivo” definido de forma vaga, levando-os a apagar antes de qualquer ordem.',
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

  {
    code: 'D9',
    dimension: 'liberdades',
    gravity: 2,
    type: 'Medida estatal seletiva contra opositor ou crítico (operação, cautelar, fiscalização, sanção) sem fato novo, por qualquer órgão',
    book: 'Segunda estratégia: usar o aparato estatal para “tirar jogadores de campo”, aplicando a lei de forma seletiva contra rivais.',
    example: 'Fiscalização tributária ou cautelar que atinge só o líder da oposição, dias depois de uma eleição, com base em processo parado havia anos.',
  },
  {
    code: 'D10',
    dimension: 'liberdades',
    gravity: 2,
    type: 'Retaliação administrativa a crítico: demissão, corte de verba ou de publicidade oficial, exclusão de acesso',
    book: 'Quarto indicador: punir críticos por meios administrativos e econômicos, não só judiciais.',
    example: 'Governo retira publicidade oficial de veículo que publicou reportagem crítica.',
  },
  {
    code: 'D11',
    dimension: 'liberdades',
    gravity: 2,
    type: 'Restrição a protesto ou reunião, ou repressão desproporcional a manifestação pacífica',
    book: 'Quarto indicador: restringir as liberdades civis de reunião e expressão.',
    example: 'Proibição genérica de manifestações na capital ou uso de força contra ato pacífico.',
  },
  {
    code: 'D12',
    dimension: 'liberdades',
    gravity: 3,
    type: 'Uso de órgão do Estado para monitorar, fichar ou rotular críticos',
    book: 'Segunda estratégia: usar o aparato estatal para “tirar jogadores de campo”.',
    example: 'Serviço de inteligência produz dossiês sobre jornalistas, servidores e opositores.',
  },

  // ---------- 5. Árbitros: captura e abuso ----------
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
    type: 'Quebra do sistema acusatório: tribunal instaura, conduz e julga investigação de que é vítima ou parte, ou decide contrariando manifestação do Ministério Público pela ilegalidade da medida',
    book: 'Primeira estratégia: árbitros convertidos em instrumento de punição.',
    example: 'Corte suprema abre por conta própria investigação sobre críticas que recebeu, escolhe o relator e julga; ou mantém operação que a procuradoria declarou ilegal.',
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
    gravity: 2,
    type: 'Nomeação de advogado pessoal, subordinado direto ou parente para corte, procuradoria ou órgão de controle',
    book: 'Primeira estratégia: preencher os árbitros com aliados.',
    example: 'Governo nomeia para a corte suprema alguém que acabou de deixar o próprio gabinete ou a própria defesa, sem passagem pela magistratura ou pelo Ministério Público.',
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

  {
    code: 'E9',
    dimension: 'arbitros',
    gravity: 2,
    type: 'Vazamento seletivo de material sigiloso ou medida de investigação com finalidade de exposição pública',
    book: 'Captura dos árbitros: polícia e procuradoria usadas como arma contra adversários.',
    example: 'Condução coercitiva anunciada à imprensa antes de o investigado ser intimado.',
  },
  {
    code: 'E10',
    dimension: 'arbitros',
    gravity: 2,
    type: 'Ameaça de impeachment, de corte orçamentário ou de emenda retaliatória contra tribunal ou órgão de controle pelo conteúdo de suas decisões',
    book: 'Captura dos árbitros: intimidar juízes e órgãos de controle para que decidam conforme o governo ou o partido.',
    example: 'Parlamentares anunciam impeachment de juízes depois de decisão contrária ao seu grupo.',
  },

  // ---------- 6. Impunidade e quebra da reserva institucional ----------
  {
    code: 'F1',
    dimension: 'reserva',
    gravity: 2,
    type: 'CPI com assinaturas suficientes que não é instalada',
    book: 'Reserva institucional e “jogo duro constitucional”: a maioria usa o controle da pauta para não fiscalizar (extensão do método).',
    example: 'Requerimento com as assinaturas exigidas pela Constituição fica meses sem leitura em plenário, e a comissão nunca é instalada.',
  },
  {
    code: 'F2',
    dimension: 'reserva',
    gravity: 1,
    type: 'Comissão ou investigação encerrada sem votação de relatório ou conclusão',
    book: 'Reserva institucional: fiscalização que começa e não termina (extensão do método).',
    example: 'Comissão de inquérito tem o prazo esgotado sem votar relatório, e as conclusões parciais não são encaminhadas a nenhum órgão.',
  },
  {
    code: 'F3',
    dimension: 'reserva',
    gravity: 2,
    type: 'Arquivamento ou anulação de provas decididos sem exame do mérito, ou caso parado sem apuração',
    book: 'Reserva institucional: árbitros que deixam de agir também abdicam.',
    example: 'Investigação sobre autoridade é arquivada por vício formal, sem que o conteúdo das provas seja examinado.',
  },
  {
    code: 'F4',
    dimension: 'reserva',
    gravity: 3,
    type: 'Autoridade citada ou investigada participa da decisão sobre o próprio caso',
    book: 'Reserva institucional: ninguém deve ser juiz em causa própria.',
    example: 'Autoridade investigada integra o colegiado que vota o arquivamento do próprio inquérito, sem se declarar impedida.',
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

  {
    code: 'F7',
    dimension: 'reserva',
    gravity: 2,
    type: 'Executivo obstrui fiscalização: sigilo de longo prazo sobre atos de interesse público, requisição do TCU ou do Congresso descumprida',
    book: 'Reserva institucional: usar as prerrogativas do cargo para escapar do controle.',
    example: 'Governo impõe sigilo de décadas a documentos pedidos por órgão de controle.',
  },
  {
    code: 'F8',
    dimension: 'reserva',
    gravity: 2,
    type: 'Casa legislativa blinda membros ou autoridades de investigação ou sanção',
    book: 'Reserva institucional: a maioria usa suas prerrogativas para proteger aliados da lei.',
    example: 'Parlamento aprova regra que condiciona a investigação de seus membros à própria autorização.',
  },

  // ---------- Contexto: registrados, mas não pontuam ----------
  {
    code: 'N1',
    dimension: null,
    gravity: 0,
    type: 'Promessa de campanha não cumprida',
    book: 'O livro trata o descumprimento de promessas como falha de governo, julgada nas urnas — não como ruptura democrática.',
    example: 'Governo prometeu em campanha uma medida concreta e, passado o prazo, não a executou nem explicou.',
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
  {
    code: 'N4',
    dimension: null,
    gravity: 0,
    type: 'Pedido de medida à Justiça ainda não decidido',
    book: 'Pedir ao árbitro é o caminho legal; pontua o que o árbitro decide, não o que a parte pede.',
    example: 'Campanha pede ao tribunal eleitoral a remoção de publicações; o pedido aguarda decisão.',
  },
]

export const RUBRIC_BY_CODE = Object.fromEntries(RUBRIC.map((r) => [r.code, r]))
