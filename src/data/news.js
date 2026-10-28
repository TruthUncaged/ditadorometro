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
    id: 'flavio-resultado',
    sort: '2026-10-26',
    when: '25 e 26 out. 2026',
    power: 'eleicoes',
    title: 'Derrotado no segundo turno, Flávio Bolsonaro diz que “o sistema ganhou” e acusa compra de votos sem apresentar provas',
    summary:
      'Na noite de 25 de outubro, Flávio Bolsonaro disse que não aceitaria “que a regra do jogo tenha sido mudada em cima do jogo”, em referência à decisão do ministro Cristiano Zanin que prorrogou a votação até as 19h. Em vídeo no dia seguinte, afirmou que “não fui eu que perdi, foi o sistema que ganhou” e que a democracia “faliu”, disse que Lula usou dinheiro público para fazer “a maior compra de votos da história” e anunciou que pedirá a cassação da chapa vencedora. As reportagens não registram provas apresentadas para as acusações. O pedido de cassação à Justiça Eleitoral é um caminho legal e, sozinho, não pontua.',
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
    title: 'Na noite da apuração, PF pede e Moraes autoriza a retenção dos passaportes de Flávio Bolsonaro, sem ouvir a PGR',
    summary:
      'O pedido da Polícia Federal, de 16 páginas, foi assinado às 21h16 de 25 de outubro, sete minutos depois de o TSE oficializar a derrota de Flávio Bolsonaro (PL-RJ) no segundo turno. O ministro Alexandre de Moraes concedeu a medida na mesma noite, sem consulta prévia à Procuradoria-Geral da República, e ela foi cumprida na manhã seguinte. A PF citou um inquérito sigiloso sobre lavagem de dinheiro atribuída ao advogado Willer Tomaz, em que Flávio aparece como usuário master de uma conta de empresa de Tomaz em Portugal até maio de 2025, e uma declaração de Eduardo Bolsonaro, em 23 de outubro, de que seria a favor de o irmão deixar o país se perdesse a eleição. Segundo a PF, Tomaz está em Miami desde agosto. Flávio não entregou os documentos, e a PF cancelou os passaportes comum e diplomático em 27 de outubro. Segundo a CNN Brasil, ele cruzou para a Argentina com passaporte italiano e entrou nos Estados Unidos, por Miami, com o passaporte diplomático já cancelado; a Agência Brasil registrou que não havia saída formal do país.',
    response:
      'Flávio Bolsonaro contesta a base da decisão e pergunta se a medida seria tomada caso ele tivesse vencido; integrantes da campanha falam em retaliação política. O STF não informou quando a decisão, sob sigilo, foi assinada. As reportagens consultadas não trazem manifestação de Flávio ou da defesa sobre a viagem.',
    institutions: ['STF', 'Polícia Federal', 'PGR'],
    status: 'em-curso',
    cases: ['B4', 'E2'],
    sources: [
      { outlet: 'Estado de Minas', url: 'https://www.em.com.br/politica/2026/10/7528647-7-minutos-separam-o-resultado-da-eleicao-do-pedido-da-pf-de-apreender-o-passaporte-de-flavio-bolsonaro.html' },
      { outlet: 'Gazeta do Povo', url: 'https://www.gazetadopovo.com.br/republica/moraes-ordena-cancelamento-de-passaporte-de-flavio-bolsonaro-apos-eleicoes/' },
      { outlet: 'Agência Brasil', url: 'https://agenciabrasil.ebc.com.br/politica/noticia/2026-10/policia-federal-cancela-passaportes-de-flavio-bolsonaro' },
      { outlet: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/internacional/flavio-bolsonaro-entrou-nos-eua-com-passaporte-diplomatico-que-pf-cancelou/' },
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
    status: 'arquivamento',
    cases: ['E1', 'F3', 'F4'],
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
    status: 'em-curso',
    cases: ['F2'],
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
    status: 'em-curso',
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
      'O contrato de três anos com o escritório Barci de Moraes, comandado por Viviane Barci de Moraes e que tem dois filhos do casal entre os integrantes, foi encontrado pela PF no celular de Daniel Vorcaro. O texto não especificava causas: previa representar o banco “onde for necessário”. A PGR admitiu a existência do contrato. A Transparência Internacional criticou o caso. Não há notícia de investigação específica sobre o contrato.',
    response:
      'O escritório afirma que nunca conduziu causa do Banco Master no STF; a defesa diz que o ministro jamais julgou processo envolvendo o banco. Em nova proposta de delação (jun. 2026), Vorcaro negou que o ministro tenha cometido crime ligado ao contrato.',
    institutions: ['STF', 'PGR'],
    status: 'sem-apuracao',
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
    id: 'golpe-condenacao',
    sort: '2025-09-11',
    when: '11 set. 2025',
    power: 'eleicoes',
    title: 'STF condena o ex-presidente Jair Bolsonaro e outros sete réus por tentativa de golpe de Estado',
    summary:
      'Por 4 votos a 1, a Primeira Turma do STF condenou o ex-presidente e aliados por tentativa de golpe e outros quatro crimes ligados à tentativa de impedir a posse do governo eleito em 2022. A pena do ex-presidente foi de 27 anos e 3 meses. É o tipo de conduta que o livro aponta como o primeiro indicador de autoritarismo; a resposta institucional reduz o peso no termômetro.',
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
    status: 'revisado',
    cases: ['D6'],
    sources: [
      { outlet: 'Teletime', url: 'https://teletime.com.br/26/06/2025/art-19-stf-concilia-votos-e-plataformas-terao-responsabilizacao-parcial/' },
      { outlet: 'Business & Human Rights', url: 'https://www.business-humanrights.org/pt/%C3%BAltimas-not%C3%ADcias/brasil-stf-redefine-regras-de-responsabiliza%C3%A7%C3%A3o-das-plataformas-digitais' },
      { outlet: 'Núcleo / Desinformante', url: 'https://desinformante.substack.com/p/especialistas-avaliam-decisao-do' },
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
    status: 'revisado',
    cases: ['D2'],
    sources: [
      { outlet: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/politica/alexandre-de-moraes-manda-bloquear-o-x-no-brasil/' },
      { outlet: 'Correio Braziliense', url: 'https://www.correiobraziliense.com.br/politica/2024/08/6931634-por-que-moraes-suspendeu-o-x-o-ex-twitter-no-brasil.html' },
      { outlet: 'Band', url: 'https://www.band.com.br/nacional/brasil/alexandre-de-moraes-decide-liberar-x-no-brasil-apos-parecer-da-pgr' },
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
    status: 'consumado',
    cases: ['D4', 'E2'],
    sources: [
      { outlet: 'Folha de Pernambuco', url: 'https://www.folhape.com.br/politica/moraes-arquiva-investigacao-contra-empresarios-acusados-de-trocar/287427/' },
      { outlet: 'Poder360', url: 'https://www.poder360.com.br/justica/pgr-diz-que-operacao-contra-empresarios-e-ilegal-e-pede-anulacao/' },
      { outlet: 'Correio Braziliense', url: 'https://www.correiobraziliense.com.br/politica/2023/08/5118822-moraes-arquiva-investigacao-contra-empresarios-bolsonaristas.html' },
    ],
  },
  {
    id: 'inquerito-4781',
    sort: '2019-03-14',
    when: 'mar. 2019 – presente',
    power: 'judiciario',
    title: 'Inquérito das fake news: aberto de ofício pelo STF e prorrogado há mais de seis anos',
    summary:
      'Instaurado pelo próprio tribunal, sem pedido do Ministério Público, com relator designado sem sorteio, para apurar ataques à própria Corte. Tramita sob sigilo e vem sendo prorrogado sucessivamente — a última prorrogação localizada, de 180 dias, é de dezembro de 2024. Críticos apontam objeto indefinido e quebra do sistema acusatório, em que quem investiga não deveria julgar.',
    response:
      'O Plenário do STF validou o inquérito em 2020, no julgamento da ADPF 572.',
    institutions: ['STF'],
    status: 'em-curso',
    cases: ['E3', 'E2', 'E5', 'D1'],
    sources: [
      { outlet: 'STF (oficial)', url: 'https://noticias.stf.jus.br/postsnoticias/stf-prorroga-inquerito-das-fake-news-por-180-dias/' },
      { outlet: 'Correio da Manhã', url: 'https://www.correiodamanha.com.br/politica/2024/12/173443-moraes-da-mais-180-dias-para-inquerito-das-fake-news.html' },
      { outlet: 'IstoÉ', url: 'https://istoe.com.br/os-seis-anos-do-inquerito-das-fake-news-e-o-comportamento-do-stf' },
    ],
  },
]

export const UPDATED_AT = '28 de outubro de 2026'
