// Registro de ocorrências que alimenta o termômetro.
//
// Cada ocorrência deve:
//   - ser enquadrada em um ou mais códigos de src/data/rubric.js ("cases");
//   - ter uma situação de src/data/indicators.js ("status");
//   - ter pelo menos duas fontes verificáveis e a posição dos citados.
//
// "power" indica a esfera principal: executivo, legislativo, judiciario
// ou eleicoes. Relate o que as fontes dizem; não conclua o que elas não
// concluíram.

export const POWERS = {
  executivo: 'Executivo',
  legislativo: 'Legislativo',
  judiciario: 'Judiciário e MP',
  eleicoes: 'Eleições',
}

export const NEWS = [
  {
    id: 'flavio-descumprimento',
    sort: '2026-10-27',
    when: '26 e 27 out. 2026',
    power: 'legislativo',
    title: 'Intimado a entregar os passaportes, Flávio Bolsonaro não os entrega e deixa o país com o passaporte diplomático já cancelado',
    summary:
      'Segundo a Exame, o senador disse ter recebido intimação para entregar os passaportes e que não poderia deixar o país. Ele não entregou os documentos, e a PF cancelou os passaportes comum e diplomático em 27 de outubro, segundo a Agência Brasil. De acordo com a CNN Brasil, Flávio cruzou para a Argentina com passaporte italiano e entrou nos Estados Unidos, por Miami, usando o passaporte diplomático já cancelado; a Agência Brasil registrou que não havia saída formal do país.',
    response:
      'As reportagens consultadas não trazem manifestação de Flávio Bolsonaro ou da defesa sobre a viagem nem sobre a não entrega dos documentos. Flávio contesta a base da decisão que determinou a retenção.',
    institutions: ['Senado', 'STF', 'Polícia Federal'],
    status: 'em-curso',
    cases: ['A4'],
    sources: [
      { outlet: 'Agência Brasil', url: 'https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/policia-federal-cancela-passaportes-de-flavio-bolsonaro' },
      { outlet: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/internacional/flavio-bolsonaro-entrou-nos-eua-com-passaporte-diplomatico-que-pf-cancelou/' },
      { outlet: 'Exame', url: 'https://exame.com/brasil/flavio-bolsonaro-diz-recebeu-intimicao-para-entregar-passsaporte-e-nao-pode-deixar-o-pais/' },
    ],
  },
  {
    id: 'flavio-resultado',
    sort: '2026-10-26',
    when: '25 e 26 out. 2026',
    power: 'eleicoes',
    title: 'Derrotado no segundo turno, Flávio Bolsonaro diz que “o sistema ganhou” e acusa compra de votos sem apresentar provas',
    summary:
      'Na noite de 25 de outubro, Flávio Bolsonaro disse que não aceitaria “que a regra do jogo tenha sido mudada em cima do jogo”, em referência à decisão do ministro Cristiano Zanin que prorrogou a votação até as 19h. Em vídeo no dia seguinte, afirmou que “não fui eu que perdi, foi o sistema que ganhou” e que a democracia “faliu”, disse que Lula usou dinheiro público para fazer “a maior compra de votos da história” e anunciou que pedirá a cassação da chapa vencedora. As reportagens não registram provas apresentadas para as acusações.',
    response:
      'Flávio sustenta que a campanha de Lula cometeu abuso de poder político e econômico. O cientista político Cláudio Couto, ouvido pelo Brasil de Fato, considera descabida a tese de que a prorrogação mudou as regras durante a disputa.',
    institutions: ['TSE', 'STF'],
    status: 'declaracao',
    cases: ['A1'],
    sources: [
      { outlet: 'Exame', url: 'https://exame.com/brasil/flavio-bolsonaro-diz-recebeu-intimicao-para-entregar-passsaporte-e-nao-pode-deixar-o-pais/' },
      { outlet: 'Brasil de Fato', url: 'https://www.brasildefato.com.br/2026/10/26/pf-apreende-passaporte-de-flavio-bolsonaro-que-volta-a-questionar-resultado-das-urnas/' },
    ],
  },
  {
    id: 'flavio-passaporte',
    sort: '2026-10-25',
    when: '25 out. 2026',
    power: 'judiciario',
    title: 'Na noite da apuração, Moraes autoriza, a pedido da PF, a retenção dos passaportes de Flávio Bolsonaro',
    summary:
      'O pedido da Polícia Federal, de 16 páginas, foi assinado às 21h16 de 25 de outubro, sete minutos depois de o TSE oficializar a derrota de Flávio Bolsonaro (PL-RJ) no segundo turno. O ministro Alexandre de Moraes concedeu a medida na mesma noite, sem consulta prévia à Procuradoria-Geral da República, e ela foi cumprida na manhã seguinte. A PF citou um inquérito sigiloso sobre lavagem de dinheiro atribuída ao advogado Willer Tomaz, em que Flávio aparece como usuário master de uma conta de empresa de Tomaz em Portugal até maio de 2025, e uma declaração de Eduardo Bolsonaro, em 23 de outubro, de que seria a favor de o irmão deixar o país se perdesse a eleição. Segundo a PF, Tomaz está em Miami desde agosto. Flávio não entregou os documentos, e a PF cancelou os passaportes comum e diplomático em 27 de outubro. Segundo a CNN Brasil, ele cruzou para a Argentina com passaporte italiano e entrou nos Estados Unidos, por Miami, com o passaporte diplomático já cancelado; a Agência Brasil registrou que não havia saída formal do país.',
    response:
      'Flávio Bolsonaro contesta a base da decisão e pergunta se a medida seria tomada caso ele tivesse vencido; integrantes da campanha falam em retaliação política. O STF não informou quando a decisão, sob sigilo, foi assinada. As reportagens consultadas não trazem manifestação de Flávio ou da defesa sobre a viagem.',
    institutions: ['STF', 'Polícia Federal', 'PGR'],
    status: 'em-curso',
    cases: ['D9'],
    sources: [
      { outlet: 'Estado de Minas', url: 'https://www.em.com.br/politica/2026/10/7528647-7-minutos-separam-o-resultado-da-eleicao-do-pedido-da-pf-de-apreender-o-passaporte-de-flavio-bolsonaro.html' },
      { outlet: 'Gazeta do Povo', url: 'https://www.gazetadopovo.com.br/republica/moraes-ordena-cancelamento-de-passaporte-de-flavio-bolsonaro-apos-eleicoes/' },
      { outlet: 'Agência Brasil', url: 'https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/policia-federal-cancela-passaportes-de-flavio-bolsonaro' },
      { outlet: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/internacional/flavio-bolsonaro-entrou-nos-eua-com-passaporte-diplomatico-que-pf-cancelou/' },
    ],
  },
  {
    id: 'zanin-prorrogacao',
    sort: '2026-10-25',
    when: '25 out. 2026',
    power: 'eleicoes',
    title: 'Por decisão individual, STF prorroga a votação do segundo turno até as 19h, a pedido da campanha de Lula, depois de o TSE não decidir sobre falhas no transporte',
    summary:
      'Em reclamação apresentada ao STF pela coligação de Lula, que apontou redução da frota de ônibus em cidades da Bahia e de São Paulo e descumprimento da ADPF 1.013 (transporte público gratuito no dia da eleição), o ministro Cristiano Zanin prorrogou a votação em duas horas em todas as seções do país; depois, restringiu a medida aos locais com problemas. O pedido havia sido feito antes ao TSE, cujo presidente, Nunes Marques, pediu esclarecimentos às prefeituras sem decidir até o fim do horário. Segundo a CNN Brasil, ministros do TSE viram na decisão interferência em atribuição do tribunal, mas descartaram um terceiro turno. Zanin foi advogado pessoal de Lula na Lava Jato.',
    response:
      'Especialistas ouvidos pela Conjur afirmam que a decisão estava dentro da competência do STF, por garantir uma decisão anterior da Corte, e que a omissão do TSE justificava a intervenção; Lenio Streck avaliou que Zanin decidiu fora de hora e foi além do pedido. Segundo a Conjur, 34,3 mil eleitores votaram depois das 17h, número que não muda o resultado. A campanha de Flávio Bolsonaro também havia pedido prorrogação ao TSE, por causa de chuvas em São Paulo e no Sul.',
    institutions: ['STF', 'TSE'],
    status: 'consumado',
    cases: ['F5'],
    sources: [
      { outlet: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/eleicoes/decisao-de-zanin-constrange-tse-e-ministros-descartam-3o-turno/' },
      { outlet: 'Conjur', url: 'https://conjur.com.br/2026-out-26/zanin-agiu-dentro-de-suas-competencias-ao-estender-horario-da-votacao/' },
    ],
  },
  {
    id: 'flavio-acao-imprensa',
    sort: '2026-10-22',
    when: '22 out. 2026',
    power: 'eleicoes',
    title: 'Campanha de Flávio Bolsonaro pede ao TSE a remoção de 241 publicações de três sites de notícias e que eles não divulguem atos de campanha',
    summary:
      'Em ação protocolada em 22 de outubro e dirigida ao corregedor-geral eleitoral, a campanha pediu a retirada, em três horas, de 241 publicações do Diário do Centro do Mundo, do ICL Notícias e do Brasil Fora da Caverna, e que os sites deixassem de publicar convocações e agendas de atos de campanha até o fim do segundo turno. A campanha sustenta que os veículos funcionam como extensões da campanha de Lula e diz ter usado inteligência artificial para classificar as manchetes como favoráveis ou desfavoráveis. A Abraji classificou o pedido como censura prévia, contrária à Constituição.',
    response:
      'A própria petição reconhece que publicar notícias críticas a um candidato não é, por si só, infração eleitoral. Até a última verificação, não havia decisão do TSE sobre o pedido.',
    institutions: ['TSE'],
    status: 'contexto',
    cases: ['N4'],
    sources: [
      { outlet: 'Abraji', url: 'https://www.abraji.org.br/noticias/abraji-repudia-tentativa-de-censura-da-imprensa-pela-campanha-de-flavio-bolsonaro' },
      { outlet: 'SpaceMoney', url: 'https://www.spacemoney.com.br/politica/flavio-bolsonaro-tse-icl' },
    ],
  },
  {
    id: 'tse-remocoes-2turno',
    sort: '2026-10-19',
    when: '12 a 19 out. 2026',
    power: 'eleicoes',
    title: 'No segundo turno, Justiça Eleitoral manda recolher jornal sindical e proíbe republicar trechos que o próprio TSE havia considerado lícitos',
    summary:
      'A pedido da campanha de Flávio Bolsonaro, o presidente do TSE, Nunes Marques, mandou recolher em 12 de outubro 30 mil exemplares de uma edição especial do Sindicato Unificado dos Petroleiros, suspender a circulação e retirar o conteúdo do site, sob multa de R$ 10 mil por descumprimento; a decisão é liminar e ainda vai ao Plenário. Em 15 de outubro, o Plenário removeu um vídeo de Flávio que ligava o filho de Lula à fraude do INSS, mas considerou que a parte sobre a fala de Lula a respeito de garis faz parte do debate eleitoral. Em 19 de outubro, a pedido da coligação de Lula, o corregedor-geral eleitoral, Ricardo Villas Bôas Cueva, proibiu Nikolas Ferreira e Pablo Marçal de publicar conteúdos já vetados, incluindo, segundo o Poder360, trechos sobre os garis que o Plenário havia liberado.',
    response:
      'Nunes Marques afirmou que a liberdade de expressão não é “salvo-conduto para a prática de ilícitos eleitorais”; a FUP classificou o recolhimento do jornal como censura. O TSE informou que só se manifesta nos autos, e o gabinete do corregedor não respondeu ao Poder360.',
    institutions: ['TSE'],
    status: 'consumado',
    cases: ['D3'],
    sources: [
      { outlet: 'Correio da Manhã', url: 'https://www.correiodamanha.com.br/politica/2026/10/326302-tse-manda-recolher-jornal-sindical-contra-flavio-bolsonaro.html' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/poder-eleicoes-2026/corregedor-do-tse-veta-conteudo-de-flavio-que-o-tribunal-disse-ser-licito/' },
    ],
  },
  {
    id: 'lula-fascismo-ato',
    sort: '2026-10-09',
    when: '9 out. 2026',
    power: 'executivo',
    title: 'Em ato do segundo turno, Lula diz que o país não será governado “pelo fascismo” nem por “assassinos” da pandemia',
    summary:
      'Em Ceilândia (DF), no primeiro ato do segundo turno, o presidente e candidato à reeleição afirmou, segundo a Agência Brasil, que “esse país não voltará a ser governado pelo fascismo”, nem “por aqueles assassinos de milhares de pessoas com covid-19”, nem “pelos sócios do Banco Master, pelos parentes do Vorcaro”. Ele não citou Flávio Bolsonaro pelo nome; a Folhapress, publicada pelo Jornal de Brasília, relacionou as falas ao adversário.',
    response:
      'As reportagens consultadas não trazem resposta da campanha de Flávio Bolsonaro nem manifestação do presidente sobre o alvo das falas.',
    institutions: ['Presidência da República'],
    status: 'declaracao',
    cases: ['B1'],
    sources: [
      { outlet: 'Jornal de Brasília (Folhapress)', url: 'https://jornaldebrasilia.com.br/noticias/politica-e-poder/em-primeiro-ato-do-2o-turno-lula-cita-fascismo-assassinos-da-pandemia-e-master-para-atacar-flavio/' },
      { outlet: 'Agência Brasil (via Mais Minas)', url: 'https://maisminas.com.br/brasil/brasil-nao-sera-governado-por-socios-do-banco-master-diz-lula-em-ato/' },
    ],
  },
  {
    id: 'master-relatorio-pf',
    sort: '2026-09-15',
    when: 'set. 2026',
    power: 'judiciario',
    title: 'Relatório da PF aponta 187 interações entre Alexandre de Moraes e Daniel Vorcaro; PGR pede a nulidade do documento',
    summary:
      'O relatório, entregue em 27 de agosto e tornado público em 1º de setembro, registra 187 interações e indícios de ao menos seis encontros entre o ministro do STF e o controlador do Banco Master. O procurador-geral Paulo Gonet e o diretor-geral da PF também são citados nas mensagens. O relator, ministro André Mendonça, abriu vista à PGR e propôs levar o material ao Plenário. O pedido de nulidade partiu da PGR, cujo chefe é citado no mesmo material. Em 15 de setembro, o Plenário do STF discutiu por mais de seis horas a validade das ordens de Mendonça e se os processos seriam julgados em conjunto; o ministro Flávio Dino pediu vista, com prazo de até 90 dias, e o mérito não foi decidido. Segundo O Povo, a votação preliminar estava em 4 a 3 pela separação dos processos, e Nunes Marques e Dias Toffoli se declararam impedidos.',
    response:
      'A PF ressalva que não concluiu que o ministro tenha cometido crime, interferido em apurações ou atendido a pedidos de Vorcaro. A PGR sustenta que o relatório foi produzido de forma irregular. Em manifestação a Edson Fachin, Moraes chamou a investigação conduzida por Mendonça de “inconstitucional e ilegal”, disse que ela foi ordenada sem pedido da PGR ou da PF e sem aval do Plenário, e negou ter favorecido Vorcaro.',
    institutions: ['STF', 'PGR', 'Polícia Federal'],
    status: 'em-curso',
    cases: ['E1'],
    sources: [
      { outlet: 'Congresso em Foco', url: 'https://www.congressoemfoco.com.br/noticia/121871/pgr-pede-nulidade-de-relatorio-sobre-mensagens-de-moraes-e-vorcaro' },
      { outlet: 'Diario de Pernambuco', url: 'https://www.diariodepernambuco.com.br/politica/2026/09/11722819-pgr-devera-se-manifestar-sobre-supostas-conversas-entre-vorcaro-e-moraes.html' },
      { outlet: 'O Povo', url: 'https://mais.opovo.com.br/jornal/politica/2026/09/15/supremo-adia-definicao-sobre-moraes-mas-escancara-fraturas-em-sessao-historica.html' },
      { outlet: 'Correio da Manhã', url: 'https://www.correiodamanha.com.br/politica/2026/09/319107-moraes-chama-investigacao-de-vinganca-e-nega-favorecimento-a-vorcaro-antes-de-julgamento-no-stf.html' },
      { outlet: 'Correio da Manhã', url: 'https://www.correiodamanha.com.br/politica/2026/09/316129-fachin-levara-caso-moraes-vorcaro-ao-plenario-do-stf-apos-revelacoes-da-pf.html' },
    ],
  },
  {
    id: 'promessas-2022',
    sort: '2026-06-30',
    when: 'jan. 2023 – jun. 2026',
    power: 'eleicoes',
    title: 'Balanços de promessas da campanha de 2022 apontam compromissos não cumpridos',
    summary:
      'Levantamentos jornalísticos divergem conforme o critério: um balanço até junho de 2026 conta 26 de 36 promessas cumpridas; outro, com 103 promessas, aponta 28% cumpridas e 17% paralisadas. Entre as pendências citadas estão o Ministério da Segurança Pública e a reorganização do sistema penitenciário. Em pesquisa Quaest de junho de 2025, 70% disseram que o presidente não cumpre o que prometeu.',
    response:
      'O presidente afirma que cumprirá os compromissos até o fim do mandato.',
    institutions: ['Presidência da República'],
    status: 'contexto',
    cases: ['N1'],
    sources: [
      { outlet: 'Gazeta do Povo', url: 'https://www.gazetadopovo.com.br/ideias/lula-disse-mas-nao-fez-balanco-mandato-furadas/' },
      { outlet: 'Folha de Pernambuco', url: 'https://www.folhape.com.br/politica/com-popularidade-em-baixa-lula-nao-cumpre-promessas-e-faz-anuncio-de/402110/' },
      { outlet: 'Diario de Pernambuco (Quaest)', url: 'https://www.diariodepernambuco.com.br/politica/2025/06/3894834-genial-quaest-70-dos-brasileiros-dizem-que-lula-nao-cumpre-promessas-de-campanha.html' },
    ],
  },
  {
    id: 'master-cpi',
    sort: '2026-06-01',
    when: 'jan.–jun. 2026',
    power: 'legislativo',
    title: 'CPI do Banco Master reúne assinaturas no Senado e na Câmara, mas não é instalada',
    summary:
      'Os requerimentos superaram o mínimo exigido nas duas Casas — no Senado, 53 assinaturas segundo a Band, para um mínimo de 27. Os presidentes Davi Alcolumbre (Senado) e Hugo Motta (Câmara) não instalaram as comissões. Senadores recorreram ao STF para obrigar a instalação.',
    response:
      'Hugo Motta afirmou que seguiria o regimento e a fila de pedidos de CPI, sem prazo definido. Reportagens associam o impasse ao calendário eleitoral de 2026.',
    institutions: ['Senado', 'Câmara dos Deputados'],
    status: 'travada',
    cases: ['F1'],
    sources: [
      { outlet: 'Band', url: 'https://www.band.com.br/politica/senadores-pedem-que-stf-determine-instalacao-de-cpi-do-banco-master' },
      { outlet: 'SBT News', url: 'https://sbtnews.sbt.com.br/noticia/politica/vieira-anuncia-que-senado-ira-recorrer-ao-stf-para-obrigar-instalacao-de-cpi-do-banco-master' },
      { outlet: 'NSC Total', url: 'https://www.nsctotal.com.br/economia/cpi-banco-master-congresso-impasse' },
    ],
  },
  {
    id: 'lei-dosimetria',
    sort: '2026-04-30',
    when: 'dez. 2025 – mai. 2026',
    power: 'legislativo',
    title: 'Congresso derruba veto e promulga lei que reduz as penas dos condenados pelo 8 de janeiro; STF suspende a aplicação',
    summary:
      'O PL 2.162/2023, apresentado originalmente como anistia, foi aprovado pela Câmara em 10 de dezembro de 2025 e pelo Senado em 17 de dezembro, por 48 votos a 25 e 1 abstenção, com relatório que limitou expressamente os efeitos aos crimes do contexto de 8 de janeiro de 2023, segundo a Gazeta do Povo. O texto proíbe a soma das penas de crimes contra a democracia cometidos num mesmo contexto e reduz para 1/6 da pena o tempo para progressão de regime, alcançando o ex-presidente Jair Bolsonaro, condenado a 27 anos e 3 meses. Em 8 de janeiro de 2026, Lula vetou integralmente o projeto. Em 30 de abril de 2026, o Congresso derrubou o veto por 318 votos a 144 na Câmara e 49 a 24 no Senado; o presidente do Congresso, Davi Alcolumbre, declarou prejudicado um trecho sobre progressão de regime para evitar conflito com a Lei Antifacção e, em 8 de maio, promulgou a lei. ABI, Federação PSOL-Rede e Federação PT-PCdoB-PV, entre outros, ajuizaram ações diretas de inconstitucionalidade; em 9 de maio, o relator, ministro Alexandre de Moraes, suspendeu a aplicação da lei até o julgamento pelo plenário, segundo a IstoÉ.',
    response:
      'O Planalto sustentou que a lei representa retrocesso, viola a proporcionalidade, a isonomia e a impessoalidade, e que o texto deveria ter voltado à Câmara após as mudanças feitas pelo Senado. A oposição afirma que a alteração do Senado foi emenda de redação e chama o projeto de “iniciativa de pacificação”; o relator na CCJ do Senado, Esperidião Amin, defendeu a tramitação adotada. Na base do governo, o senador Marcelo Castro (MDB) disse que o texto “alivia para os comandantes do golpe”.',
    institutions: ['Câmara dos Deputados', 'Senado', 'Presidência da República', 'STF'],
    status: 'revisado',
    cases: ['A7'],
    sources: [
      { outlet: 'Gazeta do Povo', url: 'https://www.gazetadopovo.com.br/republica/pl-da-dosimetria-e-aprovado-pelo-senado-texto-vai-a-sancao/' },
      { outlet: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/politica/veja-proximos-passos-apos-lula-vetar-pl-da-dosimetria/' },
      { outlet: 'Gazeta do Povo', url: 'https://www.gazetadopovo.com.br/republica/congresso-derruba-veto-de-lula-ao-pl-da-dosimetria/' },
      { outlet: 'O Povo', url: 'https://mais.opovo.com.br/jornal/politica/2026/05/09/dosimetria-e-promulgada-e-no-mesmo-dia-vira-alvo-de-questionamentos-no-stf.html' },
      { outlet: 'IstoÉ', url: 'https://istoe.com.br/ptpcdob-e-pv-apresentam-acao-ao-stf-para-derrubar-dosimetria-que-beneficia-bolsonaro' },
    ],
  },
  {
    id: 'messias-stf',
    sort: '2026-04-29',
    when: 'nov. 2025 – abr. 2026',
    power: 'executivo',
    title: 'Presidente indica ao STF seu advogado-geral da União, Jorge Messias; Senado rejeita o nome pela primeira vez desde 1988',
    summary:
      'Em 20 de novembro de 2025, Lula anunciou Jorge Messias, advogado-geral da União desde 2023, para a vaga aberta com a aposentadoria antecipada de Luís Roberto Barroso; a mensagem chegou ao Senado em 1º de abril de 2026. A oposição criticou a gestão de Messias na AGU, em especial a criação da Procuradoria Nacional de Defesa da Democracia, apelidada de “ministério da verdade”, e o presidente do Senado, Davi Alcolumbre, defendia outro nome para a vaga, segundo a Gazeta do Povo e a Agência Senado. Em 29 de abril de 2026, a CCJ aprovou o indicado por 16 votos a 11, mas o plenário rejeitou a indicação por 42 votos contrários, 34 favoráveis e 1 abstenção; eram necessários 41 votos. Foi a primeira rejeição de um indicado ao STF desde a Constituição de 1988 e a primeira em mais de 130 anos, segundo as reportagens.',
    response:
      'Na sabatina, Messias defendeu a atuação equilibrada do STF e a conciliação como forma de resolver conflitos. Integrantes da base governista esperavam a aprovação; o ministro José Guimarães havia chamado a indicação de “a próxima batalha” do governo. A rejeição seguiu o rito constitucional: o presidente pode indicar outro nome ou insistir em Messias, o que exigiria nova sabatina e nova votação.',
    institutions: ['Presidência da República', 'AGU', 'Senado', 'STF'],
    status: 'revertido',
    cases: ['E6'],
    sources: [
      { outlet: 'O Povo (Agência Senado)', url: 'https://www.opovo.com.br/noticias/politica/2026/04/29/indicacao-de-jorge-messias-e-rejeitada-no-senado.html' },
      { outlet: 'Gazeta do Povo', url: 'https://www.gazetadopovo.com.br/republica/por-que-o-senado-decidiu-rejeitar-jorge-messias-para-o-stf/' },
    ],
  },
  {
    id: 'cpmi-inss',
    sort: '2026-03-28',
    when: 'ago. 2025 – mar. 2026',
    power: 'legislativo',
    title: 'CPMI do INSS termina sem relatório aprovado sobre descontos indevidos de aposentados',
    summary:
      'Instalada em agosto de 2025 para apurar fraudes de até R$ 6,3 bilhões em descontos de benefícios, a comissão teve o relatório do relator Alfredo Gaspar, com 216 pedidos de indiciamento, rejeitado por 19 a 12. O texto alternativo da base governista também não foi aprovado, e a CPMI terminou sem relatório oficial. As investigações da Polícia Federal seguem.',
    response:
      'Cópias do material foram enviadas ao MPF e ao STF. O governo anunciou ressarcimento aos segurados com recursos da União.',
    institutions: ['Congresso Nacional', 'INSS'],
    status: 'contexto',
    cases: ['N3'],
    sources: [
      { outlet: 'Movimento Econômico', url: 'https://movimentoeconomico.com.br/politica/2026/03/28/cpmi-do-inss-rejeita-216-indiciamentos-e-termina-com-dois-relatorios-na-gaveta/' },
      { outlet: 'Congresso em Foco', url: 'https://www.congressoemfoco.com.br/noticia/115913/cpmi-do-inss-volta-em-2026-com-foco-em-fraudes-nos-beneficios' },
      { outlet: 'Portal Tela', url: 'https://www.portaltela.com/politica/2026/03/28/cpmi-do-inss-encerra-sem-relatorio-final/' },
    ],
  },
  {
    id: 'master-toffoli',
    sort: '2026-02-12',
    when: 'dez. 2025 – fev. 2026',
    power: 'judiciario',
    title: 'Caso Master corre sob sigilo no STF; relator deixa o caso após pedido de suspeição da PF',
    summary:
      'Relator do caso, o ministro Dias Toffoli concentrou a investigação no STF, decretou sigilo e determinou que o material apreendido fosse levado lacrado à Corte. Reportagens apontaram relação do ministro com um resort ligado ao caso. Após a PF pedir sua suspeição, Toffoli deixou a relatoria em 12 de fevereiro de 2026.',
    response:
      'Toffoli retirou o sigilo de depoimentos de Vorcaro e de ex-diretor do BRB em janeiro de 2026 e negou ter acessado dados do celular de Vorcaro enquanto relator.',
    institutions: ['STF'],
    status: 'revisado',
    cases: ['E4', 'E5', 'E1'],
    sources: [
      { outlet: 'CartaCapital', url: 'https://www.cartacapital.com.br/politica/decisoes-sobre-daniel-vorcaro-e-investigacoes-conexas-terao-de-passar-pelo-stf-diz-toffoli/' },
      { outlet: 'O Povo', url: 'https://mais.opovo.com.br/jornal/politica/2026/01/23/relacao-de-toffoli-com-resort-e-conducao-do-caso-master-pressionam-o-ministro-e-o-stf.html' },
      { outlet: 'Band', url: 'https://www.band.com.br/noticias/toffoli-retira-sigilo-de-depoimentos-de-vorcaro-e-ex-diretor-do-brb-202601291918' },
      { outlet: 'Diario de Pernambuco', url: 'https://www.diariodepernambuco.com.br/politica/2026/03/11709270-toffoli-nega-que-teve-acesso-a-quebra-de-sigilo-do-celular-de-vorcaro.html' },
    ],
  },
  {
    id: 'master-contrato',
    sort: '2025-12-23',
    when: 'dez. 2025',
    power: 'judiciario',
    title: 'Escritório da esposa de Alexandre de Moraes tinha contrato de R$ 129 milhões com o Banco Master',
    summary:
      'O contrato de três anos com o escritório Barci de Moraes, comandado por Viviane Barci de Moraes e que tem dois filhos do casal entre os integrantes, foi encontrado pela PF no celular de Daniel Vorcaro. O texto não especificava causas: previa representar o banco “onde for necessário”. A PGR admitiu a existência do contrato. A Transparência Internacional criticou o caso. O contrato foi localizado pela PF no material do caso Master, sobre o qual a PGR se manifestou (ver a ocorrência sobre o relatório da PF, de set. 2026).',
    response:
      'O escritório afirma que nunca conduziu causa do Banco Master no STF; a defesa diz que o ministro jamais julgou processo envolvendo o banco. Em nova proposta de delação (jun. 2026), Vorcaro negou que o ministro tenha cometido crime ligado ao contrato.',
    institutions: ['STF', 'PGR'],
    status: 'em-curso',
    cases: ['E1'],
    sources: [
      { outlet: 'Band', url: 'https://www.band.com.br/nacional/brasil/escritorio-esposa-moraes-contrato-banco-master' },
      { outlet: 'Gazeta do Povo', url: 'https://www.gazetadopovo.com.br/republica/escritorio-esposa-moraes-contrato-129-milhoes-banco-master/' },
      { outlet: 'Correio da Manhã', url: 'https://www.correiodamanha.com.br/politica/2025/12/245496-pgr-admite-existencia-de-contrato-do-master-com-esposa-de-moraes.html' },
      { outlet: 'Gazeta do Povo', url: 'https://www.gazetadopovo.com.br/republica/transparencia-internacional-critica-contrato-de-esposa-de-moraes-com-banco-master/' },
      { outlet: 'Correio da Manhã', url: 'https://www.correiodamanha.com.br/politica/2026/06/292250-em-nova-delacao-vorcaro-isenta-moraes-por-contrato-com-o-master.html' },
    ],
  },
  {
    id: 'master-liquidacao',
    sort: '2025-11-18',
    when: '18 nov. 2025',
    power: 'executivo',
    title: 'Banco Central decreta a liquidação extrajudicial do Banco Master',
    summary:
      'O BC liquidou o Banco Master e outras empresas do conglomerado, citando grave crise de liquidez e violações às normas do Sistema Financeiro Nacional. Os bens de controladores e ex-administradores ficaram indisponíveis.',
    response:
      'Registro de contexto: aqui o órgão de controle agiu.',
    institutions: ['Banco Central'],
    status: 'contexto',
    cases: ['N3'],
    sources: [
      { outlet: 'Poder360', url: 'https://poder360.com.br/poder-economia/banco-central-decreta-liquidacao-extrajudicial-do-banco-master/' },
      { outlet: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/economia/negocios/banco-central-decreta-liquidacao-extrajudicial-do-banco-master/' },
    ],
  },
  {
    id: 'pec-blindagem',
    sort: '2025-09-16',
    when: '16–24 set. 2025',
    power: 'legislativo',
    title: 'Câmara aprova PEC que exige autorização prévia do Congresso para o STF processar parlamentares; CCJ do Senado rejeita por unanimidade',
    summary:
      'Em 16 de setembro de 2025, a Câmara aprovou em segundo turno, por 344 votos a 133, o texto-base da PEC 3/2021, chamada de “PEC das Prerrogativas” pelos defensores e de “PEC da Blindagem” pelos críticos. O texto condicionava a abertura de processo criminal contra deputados e senadores no STF a autorização da respectiva Casa, por maioria simples e em até 90 dias, e restringia medidas cautelares contra parlamentares; a exigência de voto secreto foi retirada por falta de quórum (296 votos, mínimo de 308), segundo a Agência Câmara. Após protestos em diversas capitais, a CCJ do Senado aprovou em 24 de setembro, por unanimidade (26 votos), o parecer do relator Alessandro Vieira pela inconstitucionalidade e injuridicidade da proposta, e a Presidência do Senado determinou o arquivamento definitivo da matéria com base no art. 101, § 1º, do Regimento Interno.',
    response:
      'O relator na Câmara, Claudio Cajado (PP-BA), afirmou que as prerrogativas são “garantias indispensáveis à própria viabilidade institucional do Legislativo” e protegem o mandato contra perseguições políticas; Carlos Jordy (PL-RJ) disse que a Câmara poderia avaliar se processos por falas de deputados devem avançar. O presidente da CCJ do Senado, Otto Alencar, classificou a proposta como “desrespeito ao povo brasileiro”.',
    institutions: ['Câmara dos Deputados', 'Senado', 'STF'],
    status: 'revertido',
    cases: ['F8'],
    sources: [
      { outlet: 'Agência Câmara', url: 'https://www.camara.leg.br/noticias/1200769-camara-aprova-em-2-turno-o-texto-base-da-pec-das-prerrogativas' },
      { outlet: 'Senado Federal (tramitação)', url: 'https://www25.senado.leg.br/web/atividade/materias/-/materia/170519' },
      { outlet: 'Agência Senado', url: 'https://www12.senado.leg.br/noticias/videos/2025/09/presidente-da-ccj-critica-pec-da-blindagem-aprovada-pela-camara' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/poder-congresso/ccj-do-senado-rejeita-pec-da-blindagem-por-unanimidade/' },
    ],
  },
  {
    id: 'golpe-condenacao',
    sort: '2025-09-11',
    when: '11 set. 2025',
    power: 'executivo',
    title: 'STF condena o ex-presidente Jair Bolsonaro e outros sete réus por tentativa de golpe de Estado',
    summary:
      'Por 4 votos a 1, a Primeira Turma do STF condenou o ex-presidente e aliados por tentativa de golpe e outros quatro crimes ligados à tentativa de impedir a posse do governo eleito em 2022. A pena do ex-presidente foi de 27 anos e 3 meses.',
    response:
      'A defesa nega os crimes e recorreu. O ministro Luiz Fux votou contra a condenação.',
    institutions: ['STF'],
    status: 'responsabilizado',
    cases: ['A2', 'A3', 'C3'],
    sources: [
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/poder-justica/maioria-da-1a-turma-do-stf-condena-bolsonaro-por-tentativa-de-golpe/' },
      { outlet: 'Bloomberg Línea', url: 'https://www.bloomberglinea.com.br/brasil/jair-bolsonaro-e-considerado-culpado-pelo-stf-por-golpe-de-estado-e-mais-quatro-crimes/' },
      { outlet: 'Folha de Pernambuco', url: 'https://www.folhape.com.br/politica/por-4-a-1-stf-condena-bolsonaro-e-mais-sete-pela-trama-golpista/437340/' },
    ],
  },
  {
    id: 'marco-civil-19',
    sort: '2025-06-26',
    when: '26 jun. 2025',
    power: 'judiciario',
    title: 'STF muda regra do Marco Civil e passa a responsabilizar plataformas por conteúdo de usuários sem ordem judicial prévia',
    summary:
      'Por 8 votos a 3, o Plenário declarou o artigo 19 do Marco Civil da Internet parcialmente inconstitucional. Antes, a plataforma só respondia se descumprisse ordem judicial; agora pode ser responsabilizada após notificação e tem “deveres de cuidado”. Para crimes contra a honra, a ordem judicial continua necessária. Especialistas apontam risco de remoção preventiva de conteúdo legítimo.',
    response:
      'A maioria do STF entendeu que a regra anterior não protegia de forma suficiente direitos fundamentais e a democracia. O tema estava parado no Congresso.',
    institutions: ['STF'],
    status: 'consumado',
    cases: ['D6'],
    sources: [
      { outlet: 'Teletime', url: 'https://teletime.com.br/26/06/2025/art-19-stf-concilia-votos-e-plataformas-terao-responsabilizacao-parcial/' },
      { outlet: 'Business & Human Rights', url: 'https://www.business-humanrights.org/pt/%C3%BAltimas-not%C3%ADcias/brasil-stf-redefine-regras-de-responsabiliza%C3%A7%C3%A3o-das-plataformas-digitais' },
      { outlet: 'Núcleo / Desinformante', url: 'https://desinformante.substack.com/p/especialistas-avaliam-decisao-do' },
    ],
  },
  {
    id: 'abin-paralela',
    sort: '2025-06-17',
    when: '2019–2022; indiciamento em jun. 2025',
    power: 'executivo',
    title: 'PF indicia o ex-presidente, o ex-diretor da Abin e um filho dele por estrutura de monitoramento ilegal de autoridades e jornalistas (“Abin paralela”)',
    summary:
      'Em 17 de junho de 2025, a Polícia Federal concluiu o inquérito e indiciou mais de 30 pessoas, entre elas Jair Bolsonaro, o deputado Alexandre Ramagem, diretor-geral da Abin de 2019 a 2022, e o vereador Carlos Bolsonaro. Segundo a PF, citada pela Folha de Pernambuco (Agência O Globo), a estrutura usou o programa FirstMile para localizar celulares e monitorou ministros do STF, o presidente da Câmara, governadores, servidores, jornalistas e “milhares de cidadãos”, com pico nas eleições municipais de 2020, além de produzir dossiês e difundir informações falsas sobre o sistema eleitoral. A PGR não ofereceu denúncia específica neste inquérito. Em 20 de julho de 2026, o ministro Alexandre de Moraes acolheu parecer da PGR e arquivou a investigação contra Bolsonaro e Ramagem, por entender que os fatos já haviam sido examinados na ação penal da tentativa de golpe; descreveu a estrutura como uma “célula clandestina”, manteve a validade das provas, autorizou o compartilhamento com o inquérito das fake news e enviou à Justiça Federal do Distrito Federal o caso dos investigados sem foro, entre eles Carlos Bolsonaro, que segue investigado.',
    response:
      'Bolsonaro e Ramagem negaram a existência de estrutura paralela e participação em espionagem ilegal; os policiais federais indiciados negaram ter usado as ferramentas da agência para espionagem. A Abin disse estar “à disposição das autoridades” e afirmou que os fatos ocorreram em “gestões passadas”. As reportagens sobre a decisão de julho de 2026 não trazem manifestação das defesas.',
    institutions: ['Abin', 'Presidência da República', 'Polícia Federal', 'STF', 'PGR'],
    status: 'em-curso',
    cases: ['D12'],
    sources: [
      { outlet: 'Folha de Pernambuco (Agência O Globo)', url: 'https://www.folhape.com.br/politica/abin-paralela-pf-indicia-bolsonaro-carlos-ramagem-outros/418741/' },
      { outlet: 'Itatiaia', url: 'https://www.itatiaia.com.br/politica/moraes-arquiva-investigacao-contra-jair-bolsonaro-no-inquerito-da-abin-paralela/' },
      { outlet: 'Correio da Manhã', url: 'https://www.correiodamanha.com.br/politica/2026/07/303749-moraes-arquiva-investigacao-contra-bolsonaro-por-abin-paralela.html' },
      { outlet: 'IstoÉ', url: 'https://istoe.com.br/arquivamento-abin-paralela-bolsonaro-ramagem-stf' },
    ],
  },
  {
    id: 'x-suspensao',
    sort: '2024-08-30',
    when: 'ago.–out. 2024',
    power: 'judiciario',
    title: 'Rede social X é suspensa em todo o país por decisão do STF',
    summary:
      'O ministro Alexandre de Moraes determinou a suspensão nacional do X depois que a empresa fechou o escritório no Brasil e descumpriu ordens judiciais, acumulando R$ 18,35 milhões em multas. A Primeira Turma confirmou a decisão por unanimidade. O serviço foi liberado em 8 de outubro, após a empresa cumprir as exigências.',
    response:
      'O STF justificou a medida pela ausência de representante legal no país e pelo descumprimento de decisões judiciais.',
    institutions: ['STF'],
    status: 'consumado',
    cases: ['D2'],
    sources: [
      { outlet: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/politica/alexandre-de-moraes-manda-bloquear-o-x-no-brasil/' },
      { outlet: 'Correio Braziliense', url: 'https://www.correiobraziliense.com.br/politica/2024/08/6931634-por-que-moraes-suspendeu-o-x-o-ex-twitter-no-brasil.html' },
      { outlet: 'Band', url: 'https://www.band.com.br/nacional/brasil/alexandre-de-moraes-decide-liberar-x-no-brasil-apos-parecer-da-pgr' },
    ],
  },
  {
    id: 'dino-stf',
    sort: '2023-12-13',
    when: 'nov.–dez. 2023',
    power: 'executivo',
    title: 'Presidente indica ao STF Flávio Dino, seu ministro da Justiça',
    summary:
      'Lula indicou Flávio Dino, então ministro da Justiça e Segurança Pública, para a vaga de Rosa Weber, aposentada em setembro de 2023. Dino foi juiz federal, deputado, governador do Maranhão e senador eleito em 2022; o Poder360 descreve a indicação como escolha pessoal do presidente, marcada pela proximidade entre os dois. Em 13 de dezembro de 2023, após sabatina de cerca de 11 horas e aprovação na CCJ por 17 votos a 10, o plenário do Senado aprovou a indicação por 47 votos a 31, com 2 abstenções; eram necessários 41.',
    response:
      'A oposição criticou a atuação de Dino no 8 de janeiro, acusando-o de omissão na segurança, e suas posições sobre regulação de redes sociais. Dino negou omissão e, em carta ao Senado, prometeu atuação “técnica” e “imparcial” no STF. A indicação seguiu o rito constitucional, com sabatina e aprovação do Senado.',
    institutions: ['Presidência da República', 'Senado', 'STF'],
    status: 'revisado',
    cases: ['E6'],
    sources: [
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/congresso/senado-aprova-dino-para-ministro-do-stf-com-47-votos/' },
      { outlet: 'Migalhas', url: 'https://www.migalhas.com.br/quentes/398986/plenario-do-senado-aprova-flavio-dino-para-o-stf' },
    ],
  },
  {
    id: 'lula-venezuela',
    sort: '2023-06-29',
    when: '29 jun. 2023',
    power: 'executivo',
    title: 'Presidente Lula diz que “o conceito de democracia é relativo” ao defender o governo da Venezuela',
    summary:
      'Em entrevista à Rádio Gaúcha, questionado sobre o regime de Nicolás Maduro, o presidente afirmou que a Venezuela faz mais eleições que o Brasil e que o conceito de democracia é relativo. Um mês antes, havia chamado as acusações de autoritarismo contra Maduro de “narrativa”. O ministro do STF Gilmar Mendes e a ministra Simone Tebet contestaram publicamente a declaração.',
    response:
      'O governo sustenta que a política externa brasileira privilegia o diálogo e a não intervenção.',
    institutions: ['Presidência da República'],
    status: 'declaracao',
    cases: ['D7'],
    sources: [
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/governo/conceito-de-democracia-e-relativo-diz-lula-sobre-venezuela/' },
      { outlet: 'Correio Braziliense', url: 'https://www.correiobraziliense.com.br/politica/2023/06/5105586-lula-sobre-venezuela-conceito-de-democracia-e-relativo-para-voce-e-para-mim.html' },
      { outlet: 'Aos Fatos', url: 'https://www.aosfatos.org/noticias/lula-venezuela-defesa-maduro/' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/justica/conceito-de-democracia-nao-e-relativo-diz-gilmar-mendes/' },
    ],
  },
  {
    id: 'zanin-stf',
    sort: '2023-06-21',
    when: 'jun. 2023',
    power: 'executivo',
    title: 'Presidente indica seu advogado pessoal, Cristiano Zanin, ao STF',
    summary:
      'Zanin defendeu Lula nos processos da Lava Jato. A indicação foi criticada por falta de impessoalidade e aprovada pelo Senado por 58 votos a 18 em 21 de junho de 2023.',
    response:
      'O presidente afirmou que Zanin “será um excepcional ministro”. A indicação seguiu o rito constitucional, com sabatina e aprovação do Senado.',
    institutions: ['Presidência da República', 'Senado', 'STF'],
    status: 'revisado',
    cases: ['E6'],
    sources: [
      { outlet: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/politica/lula-confirma-indicacao-de-zanin-para-o-stf/' },
      { outlet: 'Rádio Senado', url: 'https://www12.senado.leg.br/radio/1/noticia/2023/06/21/ccj-aprova-indicado-para-stf' },
      { outlet: 'O Povo', url: 'https://www.opovo.com.br/noticias/politica/2023/06/01/amp/lula-indica-para-stf-cristiano-zanin-advogado-dele-na-lava-jato.html' },
    ],
  },
  {
    id: 'telegram-pl2630',
    sort: '2023-05-10',
    when: '10 mai. 2023',
    power: 'judiciario',
    title: 'STF manda o Telegram apagar mensagem contrária ao PL das Fake News e publicar retratação',
    summary:
      'Durante a tramitação do projeto, o Telegram enviou aos usuários um texto afirmando que a proposta daria ao governo poder de censura. Moraes deu uma hora para a remoção, sob pena de suspensão do aplicativo por 72 horas, e obrigou a empresa a divulgar um texto de retratação. O ministro da Justiça elogiou a decisão.',
    response:
      'A decisão classificou a mensagem como desinformação e ataque ao Congresso durante a votação.',
    institutions: ['STF', 'Ministério da Justiça'],
    status: 'consumado',
    cases: ['D3'],
    sources: [
      { outlet: 'Congresso em Foco', url: 'https://www.congressoemfoco.com.br/projeto-bula/reportagem/telegram-atende-stf-e-apaga-mensagem-contra-pl-das-fake-news/' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/justica/alexandre-de-moraes-ameaca-tirar-telegram-do-ar' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/governo/dino-elogia-decisao-de-moraes-contra-o-telegram-importante/' },
    ],
  },
  {
    id: 'oito-de-janeiro',
    sort: '2023-01-08',
    when: '8 jan. 2023 – presente',
    power: 'eleicoes',
    title: 'Apoiadores do presidente derrotado invadem e depredam as sedes dos três Poderes em 8 de janeiro de 2023',
    summary:
      'Em 8 de janeiro de 2023, uma semana após a posse do governo eleito, manifestantes invadiram e depredaram o Palácio do Planalto, o Congresso e o STF, em Brasília. Segundo a PGR, citada pelo O Povo, a invasão foi o “desfecho violento” de uma atuação coordenada para impedir a posse do presidente eleito. Balanço do gabinete do relator, ministro Alexandre de Moraes, publicado pelo STF em 29 de abril de 2026, registra 1.878 denúncias (1.160 contra incitadores, 628 contra executores e 31 contra integrantes dos núcleos principais), 1.402 réus responsabilizados, 552 acordos de não persecução penal e 190 presos, 169 deles em prisão definitiva. Em agosto de 2025, o Poder360 registrava 638 condenações e dez absolvições; em janeiro de 2026, o O Povo contava 1.039 condenados, 497 deles à prisão, com penas de um ano a 17 anos e seis meses. A reparação por dano moral coletivo foi fixada em R$ 30 milhões, a serem pagos solidariamente pelos condenados por crimes graves.',
    response:
      'Os réus foram julgados individualmente e parte deles recorreu. Segundo o Poder360, os 552 acordos de não persecução penal homologados exigem confissão, prestação de serviços comunitários, multa de R$ 5 mil e participação em curso sobre democracia. A lei que reduz as penas desses condenados, aprovada pelo Congresso em 2025–2026, está registrada em ocorrência própria.',
    institutions: ['STF', 'PGR', 'Polícia Federal'],
    status: 'responsabilizado',
    cases: ['C3'],
    sources: [
      { outlet: 'STF (oficial)', url: 'https://noticias.stf.jus.br/postsnoticias/stf-divulga-balanco-atualizado-sobre-investigacoes-e-condenacoes-por-atos-antidemocraticos/' },
      { outlet: 'O Povo', url: 'https://www.opovo.com.br/noticias/politica/2026/01/08/atos-de-8-de-janeiro-o-que-aconteceu-e-quem-foi-condenado.html' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/poder-justica/stf-responsabiliza-1-190-por-atos-de-8-de-janeiro-638-foram-condenados/' },
    ],
  },
  {
    id: 'agu-pndd',
    sort: '2023-01-02',
    when: 'jan. 2023 – presente',
    power: 'executivo',
    title: 'Governo cria na AGU a Procuradoria Nacional de Defesa da Democracia, encarregada de combater “desinformação”',
    summary:
      'O órgão pode notificar plataformas e pedir a remoção de publicações sobre políticas públicas e instituições. Especialistas ouvidos pelo Poder360 consideraram válidas as críticas de que falta critério claro de atuação; a oposição o apelidou de “ministério da verdade” e acionou o STF. Após críticas, a AGU refez o grupo de trabalho que regulamentaria a procuradoria.',
    response:
      'A AGU afirma que a procuradoria não cerceia opiniões nem críticas e atua apenas contra desinformação.',
    institutions: ['AGU', 'Presidência da República'],
    status: 'em-curso',
    cases: ['D5'],
    sources: [
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/justica/criticas-a-procuradoria-da-democracia-sao-validas-dizem-especialistas/' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/midia/orgao-anti-fake-news-da-agu-e-ministerio-da-verdade-diz-oposicao/' },
      { outlet: 'Teletime', url: 'https://teletime.com.br/23/01/2023/apos-criticas-agu-recria-gt-que-regulamentara-procuradoria-de-combate-as-fake-news/' },
    ],
  },
  {
    id: 'orcamento-secreto',
    sort: '2022-12-19',
    when: '2020 – dez. 2022',
    power: 'legislativo',
    title: 'Emendas de relator (“orçamento secreto”) distribuem bilhões sem identificar quem pede; STF declara o mecanismo inconstitucional',
    summary:
      'As emendas de relator (RP9) permitiam ao relator-geral do Orçamento destinar recursos sem registro público de quem os solicitava, em negociações entre o Congresso e o governo. Segundo a Jovem Pan, R$ 36,9 bilhões foram desembolsados em 2021 e 2022, dos quais apenas R$ 10,9 bilhões tiveram os beneficiários identificados; o Orçamento de 2023 reservava R$ 19,4 bilhões para essas emendas, segundo o Poder360. O STF já havia suspendido os repasses em liminar, e, em 16 de dezembro de 2022, o Congresso aprovou resolução dividindo os recursos entre os presidentes das Casas, a Comissão Mista de Orçamento e os líderes partidários. Em 19 de dezembro de 2022, por 6 votos a 5, o plenário do STF declarou o mecanismo inconstitucional: a relatora, Rosa Weber, considerou que o uso das emendas para atender pedidos de parlamentares ou de pessoas externas viola a separação de Poderes e o direito à informação, e a tese fixada diz que elas “destinam-se, exclusivamente, à correção de erros e omissões”. A Corte determinou a divulgação, em 90 dias, dos dados de 2020 a 2022.',
    response:
      'O Congresso defendia a constitucionalidade do modelo e aprovou a resolução de dezembro de 2022 como resposta aos questionamentos. Os ministros Alexandre de Moraes, André Mendonça, Nunes Marques, Dias Toffoli e Gilmar Mendes votaram pela validade das emendas, com exigência de mais transparência; Ricardo Lewandowski afirmou que a resolução tornou a distribuição “menos arbitrária”, mas não “equânime”.',
    institutions: ['Congresso Nacional', 'STF'],
    status: 'revertido',
    cases: ['F6'],
    sources: [
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/justica/stf-tem-maioria-para-derrubar-emendas-de-relator/' },
      { outlet: 'Jovem Pan', url: 'https://jovempan.com.br/politica/stf-forma-maioria-e-considera-orcamento-secreto-inconstitucional/' },
      { outlet: 'A Gazeta (Estadão Conteúdo)', url: 'https://www.agazeta.com.br/brasil/stf-forma-maioria-para-declarar-orcamento-secreto-inconstitucional-1222' },
    ],
  },
  {
    id: 'empresarios-whatsapp',
    sort: '2022-08-23',
    when: 'ago. 2022 – ago. 2023',
    power: 'eleicoes',
    title: 'Empresários são alvo de busca e apreensão por mensagens em grupo privado de WhatsApp; caso é arquivado um ano depois',
    summary:
      'Às vésperas da eleição de 2022, Moraes autorizou operação da PF, com bloqueio de contas, contra oito empresários a partir de reportagem sobre mensagens em um grupo fechado. A PGR considerou a operação ilegal, por violar o sistema acusatório, e pediu a anulação; o pedido foi negado. Em agosto de 2023, a investigação contra seis deles foi arquivada por ausência de justa causa: as mensagens não ultrapassaram os limites da manifestação de opinião.',
    response:
      'A decisão original apontou indícios de apoio a atos antidemocráticos. A apuração sobre um dos empresários continuou.',
    institutions: ['STF', 'PGR', 'Polícia Federal'],
    status: 'revertido',
    cases: ['D4', 'E2'],
    sources: [
      { outlet: 'Folha de Pernambuco', url: 'https://www.folhape.com.br/politica/moraes-arquiva-investigacao-contra-empresarios-acusados-de-trocar/287427/' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/justica/pgr-diz-que-operacao-contra-empresarios-e-ilegal-e-pede-anulacao/' },
      { outlet: 'Correio Braziliense', url: 'https://www.correiobraziliense.com.br/politica/2023/08/5118822-moraes-arquiva-investigacao-contra-empresarios-bolsonaristas.html' },
    ],
  },
  {
    id: 'embaixadores-inelegibilidade',
    sort: '2022-07-18',
    when: '18 jul. 2022 – 30 jun. 2023',
    power: 'executivo',
    title: 'Presidente reúne embaixadores no Alvorada para questionar as urnas sem provas; TSE o torna inelegível por oito anos',
    summary:
      'Em 18 de julho de 2022, Jair Bolsonaro convocou embaixadores estrangeiros ao Palácio da Alvorada e, em evento transmitido pela TV Brasil e pelas redes oficiais, questionou o sistema eleitoral de 2018, disse que as urnas não permitem auditoria, afirmou que não é possível acompanhar a apuração e criticou ministros do TSE e do STF, segundo o Poder360. O PDT acionou a Justiça Eleitoral em agosto de 2022 por abuso de poder político e uso indevido dos meios de comunicação. Em 30 de junho de 2023, por 5 votos a 2, o TSE declarou Bolsonaro inelegível por oito anos contados da eleição de 2022, o que o afasta das disputas de 2024, 2026 e 2028. O relator, Benedito Gonçalves, classificou as falas como “flerte perigoso com o golpismo”; o ministro André Ramos Tavares afirmou que o então presidente questionou o sistema eleitoral ao menos 23 vezes no ano anterior à eleição. O acórdão, de 433 páginas, foi publicado em 1º de agosto de 2023.',
    response:
      'A defesa anunciou recurso ao STF e pediu a retirada da chamada “minuta golpista” do processo, o que o relator negou. Os ministros Raul Araújo e Nunes Marques votaram contra a inelegibilidade, por entenderem que a discussão sobre voto impresso e as críticas ao sistema eram permitidas, embora Araújo tenha reconhecido excessos verbais. O plenário absolveu o candidato a vice, Walter Braga Netto.',
    institutions: ['TSE', 'Presidência da República'],
    status: 'responsabilizado',
    cases: ['A1'],
    sources: [
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/justica/tse-forma-maioria-pela-inelegibilidade-de-bolsonaro/' },
      { outlet: 'Migalhas', url: 'https://www.migalhas.com.br/quentes/389164/por-5-votos-a-2-tse-torna-bolsonaro-inelegivel' },
      { outlet: 'Correio (BA)', url: 'https://www.correio24horas.com.br/brasil/bolsonaro-e-declarado-inelegivel-por-8-anos-pelo-tse-0623' },
      { outlet: 'Diário de Pernambuco', url: 'https://www.diariodepernambuco.com.br/noticia/politica/2023/08/tse-publica-decisao-que-tornou-bolsonaro-inelegivel-por-oito-anos.html' },
    ],
  },
  {
    id: 'graca-daniel-silveira',
    sort: '2022-04-21',
    when: '21 abr. 2022 – 10 mai. 2023',
    power: 'executivo',
    title: 'Presidente concede graça a deputado aliado um dia após a condenação pelo STF; Corte anula o decreto por desvio de finalidade',
    summary:
      'Em 20 de abril de 2022, o STF condenou o deputado Daniel Silveira (PTB-RJ) a 8 anos e 9 meses de prisão em regime fechado, por 10 votos a 1, por coação no curso do processo e crime da Lei de Segurança Nacional, em razão de vídeos com ataques e ameaças a ministros da Corte, segundo a Tribuna de Jundiaí e o Metrópoles. Em 21 de abril, Jair Bolsonaro anunciou em transmissão ao vivo e publicou em edição extra do Diário Oficial um decreto de “graça constitucional” incondicionada, que invocou a “legítima comoção” da sociedade pela condenação de um parlamentar que “somente fez uso de sua liberdade de expressão”; o presidente disse que o “decreto vai ser cumprido”. Rede, PDT, Cidadania e PSOL acionaram o STF. Em 10 de maio de 2023, por 8 votos a 2, o plenário declarou o decreto inconstitucional: a relatora, Rosa Weber, apontou desvio de finalidade e afirmou que perdoar aliado político por afinidade pessoal e ideológica é incompatível com os princípios da administração pública.',
    response:
      'Bolsonaro sustentou que a graça é prerrogativa presidencial e um ato em defesa da liberdade de expressão. No STF, André Mendonça votou que conceder indulto é prerrogativa do presidente que deve ser observada, e Nunes Marques entendeu que o Judiciário só pode avaliar os aspectos formais do perdão. As reportagens sobre o julgamento não registram manifestação da defesa de Silveira.',
    institutions: ['Presidência da República', 'STF'],
    status: 'revertido',
    cases: ['A7'],
    sources: [
      { outlet: 'Tribuna de Jundiaí', url: 'https://tribunadejundiai.com.br/politica/bolsonaro-desafia-stf-perdoa-daniel-silveira-e-amplia-crise-entre-poderes/' },
      { outlet: 'Metrópoles', url: 'https://www.metropoles.com/brasil/politica-brasil/confira-a-integra-do-decreto-que-perdoa-penas-de-daniel-silveira' },
      { outlet: 'Conjur', url: 'https://www.conjur.com.br/2023-mai-10/stf-confirma-anulacao-graca-concedida-bolsonaro-silveira/' },
      { outlet: 'Gazeta do Povo', url: 'https://www.gazetadopovo.com.br/republica/breves/stf-conclui-julgamento-e-derruba-indulto-de-bolsonaro-a-silveira-por-8-a-2/' },
    ],
  },
  {
    id: 'mendonca-stf',
    sort: '2021-12-01',
    when: 'jul.–dez. 2021',
    power: 'executivo',
    title: 'Presidente indica ao STF André Mendonça, que foi seu advogado-geral da União e ministro da Justiça',
    summary:
      'Em 13 de julho de 2021, Jair Bolsonaro indicou André Mendonça para a vaga de Marco Aurélio Mello. Mendonça chefiou a AGU desde janeiro de 2019, foi ministro da Justiça entre abril de 2020 e março de 2021 e voltou à AGU; o presidente havia prometido um ministro “terrivelmente evangélico”, segundo a Agência Senado. O presidente da CCJ, Davi Alcolumbre, levou 141 dias para marcar a sabatina, a maior espera desse tipo na história republicana, segundo o Poder360. Na sabatina, Mendonça foi questionado pelo relatório do Ministério da Justiça sobre 579 servidores e professores identificados como “antifascistas” e pelo uso da Lei de Segurança Nacional contra críticos do governo. Em 1º de dezembro de 2021, o Senado aprovou a indicação por 47 votos a 32, seis acima do mínimo.',
    response:
      'Mendonça afirmou que o relatório não tinha caráter investigativo, defendeu o Estado laico (“na vida, a Bíblia; no Supremo, a Constituição”) e declarou compromisso com a democracia e com as garantias individuais. A relatora, senadora Eliziane Gama, destacou a capacidade técnica do indicado e disse que a religião não foi o critério da escolha. A indicação seguiu o rito constitucional, com sabatina e aprovação do Senado.',
    institutions: ['Presidência da República', 'AGU', 'Senado', 'STF'],
    status: 'revisado',
    cases: ['E6'],
    sources: [
      { outlet: 'Agência Senado', url: 'https://www12.senado.leg.br/noticias/materias/2021/12/01/senado-aprova-andre-mendonca-para-o-stf' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/governo/bolsonaro-vence-e-senado-aprova-andre-mendonca-por-47-a-32-votos-para-o-stf/' },
    ],
  },
  {
    id: 'sete-setembro-2021',
    sort: '2021-09-07',
    when: '7 e 9 set. 2021',
    power: 'executivo',
    title: 'Em ato de 7 de Setembro, presidente diz que não cumprirá mais decisões de ministro do STF; recua em nota dois dias depois',
    summary:
      'Em 7 de setembro de 2021, em discurso a apoiadores na Avenida Paulista, Jair Bolsonaro afirmou que “qualquer decisão do senhor Alexandre de Moraes, esse presidente não mais cumprirá”, chamou o ministro de “canalha” e disse que “ou esse ministro se enquadra ou ele pede para sair”, segundo o Poder360 e o O Povo. Mais cedo, na Esplanada dos Ministérios, pediu que o presidente do STF, Luiz Fux, “enquadrasse” o colega; na Paulista, disse que determinaria a libertação de “presos políticos” e que “jamais” seria preso. Em 9 de setembro, divulgou uma “Declaração à Nação”, redigida com participação do ex-presidente Michel Temer, em que afirmou que “nunca tive nenhuma intenção de agredir quaisquer dos Poderes”, que as divergências com Moraes “devem ser resolvidas por medidas judiciais” e que suas palavras, “por vezes contundentes, decorreram do calor do momento”.',
    response:
      'Na nota, Bolsonaro disse que a harmonia entre os Poderes “não é vontade minha, mas determinação constitucional que todos, sem exceção, devem respeitar”. O presidente do STF, Luiz Fux, afirmou que descumprir decisões judiciais configura crime de responsabilidade, segundo o Diário do Nordeste. Moraes divulgou nota dizendo que a independência se fortalece com o respeito à democracia.',
    institutions: ['Presidência da República', 'STF'],
    status: 'declaracao',
    cases: ['A4'],
    sources: [
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/governo/bolsonaro-chama-moraes-de-canalha-e-diz-que-nunca-sera-preso/' },
      { outlet: 'O Povo', url: 'https://www.opovo.com.br/noticias/politica/2021/09/07/em-sp-bolsonaro-diz-que-nao-cumprira-mais-decisoes-de-moraes-paciencia-esgotou.html' },
      { outlet: 'Correio (BA)', url: 'https://www.correio24horas.com.br/noticia/nid/bolsonaro-recua-e-poe-panos-quentes-em-relacao-com-alexandre-de-moraes-leia-nota' },
      { outlet: 'Diário do Nordeste', url: 'https://diariodonordeste.verdesmares.com.br/pontopoder/bolsonaro-divulga-nota-oficial-afirmando-que-nunca-teve-intencao-de-agredir-quaisquer-dos-poderes-1.3133811' },
    ],
  },
  {
    id: 'blindados-voto-impresso',
    sort: '2021-08-10',
    when: '10 ago. 2021',
    power: 'executivo',
    title: 'Blindados da Marinha desfilam diante do Planalto no dia em que a Câmara vota a PEC do voto impresso',
    summary:
      'Na manhã de 10 de agosto de 2021, cerca de 50 veículos da Marinha, entre tanques e blindados, passaram pela Esplanada dos Ministérios e em frente ao Palácio do Planalto, onde o presidente Jair Bolsonaro, o ministro da Defesa, Walter Braga Netto, e os três comandantes militares receberam um convite para a Operação Formosa, segundo o Correio Braziliense. Foi a primeira vez, desde 1988, que o deslocamento para Formosa (GO) passou pela Esplanada; apoiadores presentes gritaram “eu autorizo” e trechos do artigo 142 da Constituição. Na mesma noite, a Câmara rejeitou a PEC 135/2019, do voto impresso, por 229 votos a 218 (eram necessários 308); deputados criticaram o desfile como intimidação ao Parlamento, segundo a Agência Câmara. O presidente da Câmara, Arthur Lira, chamou a coincidência de “trágica” e disse que o ato abria espaço para especulações sobre pressão.',
    response:
      'Em nota de 9 de agosto, a Marinha afirmou que o desfile foi planejado antes da votação e “não possui relação com a mesma, ou qualquer outro ato em curso nos Poderes da República”, e que os eventos buscam mostrar o preparo de seus meios operativos. Segundo Lira, Bolsonaro negou intenção de intimidar o Legislativo e comprometeu-se a aceitar a decisão da Câmara.',
    institutions: ['Presidência da República', 'Marinha', 'Ministério da Defesa', 'Câmara dos Deputados'],
    status: 'consumado',
    cases: ['A6'],
    sources: [
      { outlet: 'Correio Braziliense', url: 'https://www.correiobraziliense.com.br/politica/2021/08/4942769-militares-desfilam-na-esplanada-e-entregam-convite-a-bolsonaro.html' },
      { outlet: 'Agência Câmara', url: 'https://www.camara.leg.br/noticias/792343-camara-rejeita-proposta-que-tornava-obrigatorio-o-voto-impresso/' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/brasil/tragica-coincidencia-diz-lira-sobre-desfile-militar-em-dia-de-voto-impresso/' },
      { outlet: 'Estado de Minas', url: 'https://www.em.com.br/app/noticia/politica/2021/08/09/interna_politica,1294273/marinha-desfile-foi-planejado-antes-de-agenda-da-pec-do-voto-impresso.shtml' },
    ],
  },
  {
    id: 'dossie-antifascista',
    sort: '2020-08-07',
    when: 'ago. 2020 – mai. 2022',
    power: 'executivo',
    title: 'Ministério da Justiça produz relatório de inteligência sobre 579 servidores “antifascistas”; STF suspende e declara os atos inconstitucionais',
    summary:
      'Em 2020, reportagens revelaram que a Secretaria de Operações Integradas (Seopi) do Ministério da Justiça produziu relatório sigiloso sobre 579 servidores federais e estaduais de segurança e três professores universitários identificados com o movimento “antifascismo”, com nomes, fotos e perfis em redes sociais, distribuído a órgãos federais e estaduais, segundo a Rede Sustentabilidade na ADPF 722. Em 7 de agosto, o ministro André Mendonça confirmou a existência do relatório, segundo o Poder360. Em 20 de agosto de 2020, o STF, por 9 votos a 1, suspendeu a produção e o compartilhamento desses relatórios; a relatora, Cármen Lúcia, afirmou que o uso da máquina estatal para colher informações de servidores contrários ao governo “caracteriza, sim, desvio de finalidade” e que não compete ao ministério fazer dossiê “de quem quer que seja”. Em 13 de maio de 2022, o plenário confirmou no mérito a inconstitucionalidade dos atos, com voto divergente de Nunes Marques; Mendonça, já ministro do STF, declarou-se impedido.',
    response:
      'Mendonça disse que a Seopi não conduz investigação, evitou o termo “dossiê” e afirmou que governos anteriores produziram documentos de inteligência semelhantes; após a decisão, defendeu a atividade de inteligência como essencial ao Estado democrático. Nunes Marques entendeu que não houve comprovação de atos que violassem garantias constitucionais. Em 2020, Marco Aurélio votou pela inadequação da ADPF, e ministros registraram que o monitoramento começou antes da gestão de Mendonça.',
    institutions: ['Ministério da Justiça', 'STF'],
    status: 'revertido',
    cases: ['D12'],
    sources: [
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/governo/carmen-lucia-impoe-sigilo-a-dossie-do-governo-contra-antifascistas/' },
      { outlet: 'Migalhas', url: 'https://www.migalhas.com.br/quentes/332276/stf-proibe-dossie-contra-antifascistas-em-ministerio-da-justica' },
      { outlet: 'Conjur', url: 'https://www.conjur.com.br/2020-ago-20/ministerio-justica-parar-producao-dossie-antifascistas/' },
      { outlet: 'Jovem Pan', url: 'https://jovempan.com.br/brasil/stf-maioria-suspensao-producao-de-relatorios-ministerio-da-justica/' },
      { outlet: 'Tribuna do Sertão (Estadão Conteúdo)', url: 'https://www.tribunadosertao.com.br/politica/2022/05/13/436670-stf-faz-maioria-para-declarar-inconstitucional-dossie-sobre-antifascistas' },
    ],
  },
  {
    id: 'comemoracao-1964-ustra',
    sort: '2019-03-25',
    when: 'mar. e ago. 2019',
    power: 'executivo',
    title: 'Presidente determina “comemorações devidas” do 31 de março de 1964 nos quartéis e chama o coronel Ustra de “herói nacional”',
    summary:
      'Em 25 de março de 2019, o porta-voz da Presidência, general Otávio Rêgo Barros, informou que Jair Bolsonaro determinou ao Ministério da Defesa as “comemorações devidas” do 31 de março de 1964 e que “o presidente não considera 31 de março de 1964 um golpe militar”, segundo o Jornal de Brasília e a Agência Brasil; a data havia sido retirada das celebrações oficiais no governo Dilma Rousseff. Em 28 de março, Bolsonaro disse que pediu aos quartéis para “rememorar”, não comemorar. Em 8 de agosto de 2019, após receber no Planalto a viúva do coronel Carlos Alberto Brilhante Ustra, chefe do DOI-Codi de São Paulo e primeiro militar condenado pela Justiça por sequestro e tortura durante a ditadura, segundo o Estadão Conteúdo, o presidente o chamou de “um herói nacional que evitou que o Brasil caísse naquilo que a esquerda hoje em dia quer”.',
    response:
      'Segundo o porta-voz, civis e militares, “percebendo o perigo”, se uniram para “recolocar o nosso país no rumo”, e cada comando decidiria a forma das celebrações. Bolsonaro afirmou que “a Lei da Anistia está aí e valeu para todos”. O Ministério Público Federal recomendou que as unidades evitassem comemorações públicas, e uma ação popular contra o ato foi ajuizada na Justiça Federal do DF.',
    institutions: ['Presidência da República', 'Ministério da Defesa'],
    status: 'declaracao',
    cases: ['C2'],
    sources: [
      { outlet: 'Jornal de Brasília', url: 'https://jornaldebrasilia.com.br/noticias/politica-e-poder/bolsonaro-determina-que-sejam-feitas-comemoracoes-devidas-a-64/' },
      { outlet: 'IstoÉ (Agência Brasil)', url: 'https://istoe.com.br/bolsonaro-autoriza-celebracao-do-31-de-marco-de-1964/' },
      { outlet: 'O Povo', url: 'https://mais.opovo.com.br/jornal/politica/2019/03/28/bolsonaro-diz-que-pediu-a-quarteis-para--rememorar--64.html' },
      { outlet: 'IstoÉ Dinheiro (Estadão Conteúdo)', url: 'https://istoedinheiro.com.br/presidente-volta-a-chamar-ustra-de-heroi-nacional-e-recebe-viuva' },
    ],
  },
  {
    id: 'inquerito-4781',
    sort: '2019-03-14',
    when: 'mar. 2019 – presente',
    power: 'judiciario',
    title: 'Inquérito das fake news: aberto de ofício pelo STF e prorrogado há mais de seis anos',
    summary:
      'Instaurado pelo próprio tribunal, sem pedido do Ministério Público, com relator designado sem sorteio, para apurar ataques à própria Corte. Tramita sob sigilo e vem sendo prorrogado sucessivamente — a última prorrogação localizada, de 180 dias, é de dezembro de 2024. A reportagem da IstoÉ registra as críticas de objeto indefinido e de acúmulo das funções de investigar e julgar.',
    response:
      'O Plenário do STF validou o inquérito em 2020, no julgamento da ADPF 572.',
    institutions: ['STF'],
    status: 'em-curso',
    cases: ['E3', 'E2', 'E5'],
    sources: [
      { outlet: 'STF (oficial)', url: 'https://noticias.stf.jus.br/postsnoticias/stf-prorroga-inquerito-das-fake-news-por-180-dias/' },
      { outlet: 'Correio da Manhã', url: 'https://www.correiodamanha.com.br/politica/2024/12/173443-moraes-da-mais-180-dias-para-inquerito-das-fake-news.html' },
      { outlet: 'IstoÉ', url: 'https://istoe.com.br/os-seis-anos-do-inquerito-das-fake-news-e-o-comportamento-do-stf' },
    ],
  },
]

export const UPDATED_AT = '28 de outubro de 2026'
