# Ditadorômetro (Brasil)

**Quão perto estamos de uma ditadura?** O Ditadorômetro é um medidor público, com fontes, dos sinais de erosão
democrática descritos por Steven Levitsky e Daniel Ziblatt em *Como as Democracias Morrem*, aplicado ao governo
federal, ao Congresso, ao Judiciário e ao processo eleitoral brasileiro.

O site é uma única página estática (React + Vite, sem backend). O nível do termômetro não é opinião de quem mantém
o projeto: ele é **calculado** a partir de um registro de ocorrências, cada uma com pelo menos duas fontes, a posição
dos citados e uma classificação feita com uma tabela pública de critérios.

- [Como funciona](#como-funciona)
- [A escala](#a-escala)
- [As seis dimensões](#as-seis-dimensões)
- [Tabela de classificação](#tabela-de-classificação)
- [Cálculo do índice](#cálculo-do-índice)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Rodar localmente](#rodar-localmente)
- [Feed RSS](#feed-rss)
- [SEO](#seo)
- [Publicação no GitHub Pages](#publicação-no-github-pages)
- [Atualização diária automática](#atualização-diária-automática)
- [Ferramentas de apoio](#ferramentas-de-apoio)
- [Regras editoriais](#regras-editoriais)
- [Licença](#licença)
- [Como contribuir](#como-contribuir)

## Como funciona

1. **Ocorrências.** Cada fato relevante (uma decisão, uma CPI que não é instalada, um inquérito sem prazo, uma
   declaração de autoridade) vira uma entrada em `src/data/news.js`, com resumo, outro lado, instituições
   envolvidas, situação e fontes.
2. **Classificação.** A ocorrência recebe um ou mais códigos da tabela de classificação (`src/data/rubric.js`).
   Cada código pertence a uma dimensão e tem uma gravidade de 0 a 3.
3. **Resposta institucional.** A situação (`status`) mede o que as instituições fizeram com o fato: um caso sem
   apuração pesa mais do que um caso em que houve responsabilização.
4. **Índice.** As ocorrências somam pontos em cada dimensão; a média das dimensões dá o índice de 0 a 100, que
   posiciona o termômetro num dos sete estágios.

A página mostra, nesta ordem: o termômetro e o nível atual, a pressão em cada dimensão, o registro de ocorrências
(filtrável por Poder), a tabela de classificação, precedentes históricos de outros países, o método e a seção
“Sobre”.

## A escala

Sete estágios, cada um ocupando 1/7 da escala (`src/data/levels.js`), seguindo o roteiro do livro:

| Estágio | Nome | Em resumo |
| --- | --- | --- |
| 0 | Democracia plena | Liberdade de expressão e imprensa, árbitros independentes, oposição tratada como adversária legítima. |
| 1 | Grades de proteção desgastadas | As normas informais de tolerância mútua e reserva institucional começam a ceder. |
| 2 | Erosão das normas | O descumprimento das normas vira rotina e deixa de ter custo. |
| 3 | Captura dos árbitros | Tribunais, procuradoria, polícia e órgãos de controle passam a proteger aliados e mirar adversários. |
| 4 | Adversários fora de campo | Opositores, imprensa e críticos são afastados, processados ou silenciados. |
| 5 | Regras reescritas | Regras eleitorais e constitucionais são alteradas para manter quem está no poder. |
| 6 | Ditadura | Direitos cerceados pelo Estado; não há alternância possível. |

## As seis dimensões

As quatro primeiras são os indicadores de comportamento autoritário de Levitsky e Ziblatt; as duas últimas medem o
estado das instituições (os “árbitros” e as “grades de proteção”). Definidas em `src/data/indicators.js`.

| Dimensão | O que mede |
| --- | --- |
| Rejeição das regras do jogo | Tentativas de anular eleições, golpes, desrespeito à Constituição. |
| Negação da legitimidade dos oponentes | Tratar adversários como criminosos, traidores ou ameaça existencial, sem base legal. |
| Tolerância à violência | Deixar de condenar, justificar ou incentivar violência política. |
| Restrição de liberdades civis e de imprensa | Censura, remoção de conteúdo, suspensão de plataformas, assédio a jornalistas. |
| Captura dos árbitros | Conflito de interesses, quebra do sistema acusatório, inquéritos sem objeto ou prazo, aparelhamento. |
| Impunidade e quebra da reserva institucional | CPIs não instaladas, arquivamentos sem mérito, “jogo duro constitucional”. |

## Tabela de classificação

`src/data/rubric.js` traz 47 tipos genéricos de caso, pensados para classificar qualquer ocorrência futura com o
mesmo critério, independentemente de partido ou Poder. Cada código tem dimensão, gravidade (0 a 3; os códigos N valem
0), a passagem correspondente do livro e um exemplo genérico ou histórico, nunca o caso concreto que motivou o
código. Todo código descreve uma **conduta, não um ator**: para cada conduta típica de tribunais ou do Ministério
Público há um espelho para o Executivo, o Legislativo, as Forças Armadas, partidos e candidatos, e vice-versa. A
gravidade reflete o alcance e a irreversibilidade do ato, não o seu motivo; o motivo entra no “outro lado” e na
situação.

| Grupo | Dimensão | Exemplos de tipo |
| --- | --- | --- |
| A1–A7 | Regras do jogo | Questionar eleições sem provas; não reconhecer resultado; tentativa de golpe; descumprir decisão judicial; mudar regras para favorecer quem está no poder; pressão das Forças Armadas; indulto ou anistia a aliados. |
| B1–B2 | Legitimidade | Rotular adversários como inimigos ou criminosos; pedir prisão ou cassação por opinião. |
| C1–C4 | Violência | Não condenar violência de aliados; elogiar golpes ou tortura; incitar ou financiar depredação; vínculo com grupos armados. |
| D1–D12 | Liberdades | Remoção de conteúdo sem decisão fundamentada; suspensão de plataforma; busca e apreensão por opinião; órgão do Estado para definir a verdade; assédio judicial a jornalistas; medida seletiva contra opositor; retaliação administrativa a crítico; restrição a protesto; vigilância de críticos. |
| E1–E10 | Árbitros | Conflito de interesses de julgador; tribunal investiga e julga; inquérito de ofício sem prazo; nomeação de advogado pessoal ou subordinado; empacotamento; expurgos; vazamento seletivo; ameaça a tribunais pelo conteúdo de decisões. |
| F1–F8 | Impunidade | CPI com assinaturas não instalada; arquivamento sem mérito decidido; citado decide sobre o próprio caso; decisão individual sem referendo; jogo duro constitucional; Executivo obstrui fiscalização; Casa legislativa blinda membros. |
| N1–N4 | Contexto (não pontua) | Promessa não cumprida; declaração falsa de autoridade; irregularidade investigada pelo caminho normal; pedido à Justiça ainda não decidido. |

Os códigos N valem zero de propósito: o livro trata de erosão das instituições, não de mau governo. Promessas
quebradas e declarações falsas ficam registradas como contexto e podem ganhar peso, se assim se decidir, alterando a
gravidade em `rubric.js`.

## Cálculo do índice

Para cada ocorrência:

1. em cada dimensão, vale a **maior gravidade** entre os códigos daquela dimensão;
2. a dimensão mais grave conta **por inteiro**, a segunda conta **pela metade** e, a partir da terceira, não soma
   (um mesmo ato visto por vários ângulos não vale várias vezes mais que um ato de dimensão única);
3. o resultado é multiplicado pelo **multiplicador da situação**, que mede a resposta institucional. A linha de
   base (1,0) é um ato de Estado cumprido ou um caso em apuração; só há agravo quando há dever de apurar e inércia
   documentada, e só há desconto quando outra instituição reviu, reverteu ou puniu:

| Situação (`status`) | Multiplicador | Quando usar |
| --- | --- | --- |
| Sem apuração, apesar do dever de apurar (`sem-apuracao`) | 1,3 | Há dever legal de apurar e a inércia está documentada no resumo. |
| Arquivado ou anulado sem exame do mérito (`arquivamento`) | 1,3 | Só depois da decisão de arquivar ou anular; pedido pendente é `em-curso`. |
| Apuração travada (`travada`) | 1,2 | CPI com assinaturas não instalada, inquérito parado por quem deveria movê-lo. |
| Ato de Estado cumprido (`consumado`) | 1,0 | Decisão, decreto, nomeação ou omissão cumpridos, sem revisão por outra instituição. |
| Em apuração (`em-curso`) | 1,0 | Investigação, processo ou tramitação em andamento. |
| Declaração pública (`declaracao`) | 0,8 | Fala sem ato. |
| Revisto por outra instituição ou limitado (`revisado`) | 0,9 | Outra instituição referendou (Senado aprova indicação) ou a mesma instituição limitou a medida. Ratificação pelo próprio órgão não conta. |
| Medida anulada ou desfeita (`revertido`) | 0,6 | A medida foi derrubada ou desfeita (STF suspende decreto, Senado rejeita PEC, relator arquiva a própria operação). |
| Responsabilização efetivada (`responsabilizado`) | 0,7 | Condenação ou sanção efetivada. O desconto é limitado de propósito: a punição não apaga a conduta. |
| Contexto, não pontua (`contexto`) | 0 | Só com códigos N. |

Os pontos são somados por dimensão e limitados a um **teto próprio de cada dimensão** (`SATURATION` em
`src/data/indicators.js`), menor nas dimensões em que as ocorrências são raras e graves: Regras 20, Legitimidade 15,
Violência 12, Liberdades 30, Árbitros 30, Impunidade 20. O índice é a média das seis dimensões, de 0 a 100. O código
está em `src/lib/score.js`, e o mesmo cálculo é usado pelo site, pelo validador, pelo feed e pelos scripts de
automação.

### Recalibrações

Toda mudança de critério (tetos, multiplicadores, gravidades, regra de soma) é uma **recalibração**: ela altera a
leitura publicada de uma vez, sem fato novo, e precisa vir com uma nota em `src/data/notes.js` (exibida na seção de
método do site) e nesta lista, com o efeito no índice.

| Data | Mudança | Índice antes → depois | Motivo |
| --- | --- | --- | --- |
| 28 out. 2026 | Teto único 15 → 25 | 50 (estágio 3) → 36 (estágio 2) | Com 15, *Liberdades* e *Árbitros* estavam no teto e não reagiam a casos novos. |
| 28 out. 2026 | Teto por dimensão; multiplicadores achatados (3,75× → 2,2×); segunda dimensão a 50%; códigos simétricos (47); reclassificação de 14 ocorrências; 14 ocorrências de 2019–2026 incluídas | 36 (estágio 2) → 46 (estágio 3) | Três auditorias independentes com mandatos opostos concluíram que a tabela media com muito mais detalhe a conduta de tribunais do que a do político autoritário, eixo do livro, e que o registro não tinha o Executivo de 2019–2022. Ver [Auditoria de imparcialidade](#auditoria-de-imparcialidade). |

Para simular outros tetos com o registro atual:

```bash
node scripts/saturacao.mjs                  # fatores 0,6, 0,8, 1 e 1,2 sobre os tetos atuais
node scripts/saturacao.mjs regras=10 violencia=8   # tetos específicos
```

### Auditoria de imparcialidade

Em 28 de outubro de 2026, três auditores independentes revisaram as regras e o registro: um com o mandato de provar
viés contra o STF e o governo, outro com o mandato de provar viés contra a oposição, e um metodologista neutro. Os
três convergiram no mesmo diagnóstico, que não era de intenção partidária, mas de construção:

- 16 dos 34 códigos pontuáveis só podiam ser cometidos por tribunais, MP ou Congresso, e vários exemplos tinham
  sido escritos a partir dos casos do registro;
- o multiplicador de responsabilização (0,4) fazia uma tentativa de golpe condenada valer menos que uma mensagem
  apagada, e “arquivamento” era acionado por um simples pedido;
- um ato judicial recebia dois ou três códigos em dimensões diferentes e somava tudo, enquanto a fala de um político
  recebia um;
- o teto único deixava inertes as três dimensões que o livro usa para identificar o político autoritário;
- o registro não tinha nenhuma ocorrência do Executivo de 2019 a 2022, e a pauta de busca da automação era
  organizada por tema judicial, não por ator.

As correções estão na tabela de recalibrações acima, na [tabela de classificação](#tabela-de-classificação), no
[cálculo do índice](#cálculo-do-índice) e na [atualização diária](#atualização-diária-automática). Pontos deixados
para uma próxima revisão: janela temporal ou decaimento (hoje 2019 pesa como 2026); estágio com gatilhos
qualitativos por dimensão, além da média; campo `actors[]` separado da arena.

## Estrutura do projeto

```
├── index.html                    página base (fontes, metadados, feed)
├── vite.config.js                build (caminhos relativos, para o GitHub Pages)
├── .nvmrc                        versão do Node usada no CI
├── AGENTS.md                     orientações para agentes e sessões de IA que mexem no repositório
├── LICENSE / LICENSE-DADOS.md    MIT para o código, CC BY 4.0 para dados e textos
├── src/
│   ├── App.jsx                   montagem da página
│   ├── main.jsx                  entrada do navegador (hidrata o HTML pré-renderizado)
│   ├── entry-server.jsx          entrada do build que pré-renderiza a página
│   ├── components/               menu, termômetro, dimensões, registro, tabela, histórico, método, sobre
│   ├── data/
│   │   ├── news.js               registro de ocorrências (o que move o ponteiro) e UPDATED_AT
│   │   ├── rubric.js             tabela de classificação (A1…F6, N1…N3)
│   │   ├── indicators.js         as seis dimensões, multiplicadores de situação e saturação
│   │   ├── levels.js             os sete estágios
│   │   ├── notes.js              notas de método (recalibrações), exibidas no site
│   │   └── history.js            precedentes históricos
│   ├── lib/score.js              cálculo do índice
│   └── styles.css                estilos (tema claro e escuro, movimento reduzido)
├── data/pendencias.md            fila do pesquisador e omissões dos verificadores (escrito pela automação)
├── scripts/
│   ├── lib/load-news.mjs         carregador seguro do registro: analisa a sintaxe e só aceita dados
│   ├── validate.mjs              valida o registro e imprime o índice
│   ├── cobertura.mjs             ocorrências e pontos por esfera e dimensão, códigos nunca usados
│   ├── pendencias.mjs            monta data/pendencias.md (fila e omissões) na consolidação
│   ├── score.test.mjs            testes do cálculo (npm test)
│   ├── load-news.test.mjs        testes do carregador seguro contra payloads de código
│   ├── saturacao.mjs             simula o índice com outros valores de SATURATION
│   ├── build-seo.mjs             pré-renderiza a página e gera metadados, sitemap, robots e imagens
│   ├── build-feed.mjs            gera dist/feed.xml
│   ├── collect-news.mjs          lista notícias candidatas: feeds oficiais, veículos por linha editorial, buscas por código
│   ├── check-links.mjs           confere se as fontes ainda respondem
│   ├── diff-news.mjs             lista as mudanças entre duas versões do registro
│   └── apply-verdicts.mjs        consolida os votos dos verificadores
└── .github/
    ├── workflows/                deploy, atualização diária, validação de PR
    └── prompts/                  instruções dos agentes pesquisador e verificadores
```

## Rodar localmente

Requer Node.js 20 ou mais recente (o CI usa a versão em `.nvmrc`).

```bash
npm install
npm run dev                  # desenvolvimento em http://localhost:5173
node scripts/validate.mjs    # valida o registro e mostra o índice por dimensão
npm test                     # testes do cálculo e do carregador do registro
npm run build                # valida e gera dist/ estático, incluindo dist/feed.xml
npm run preview              # serve o build em http://localhost:4173
```

O validador recusa: campos faltando ou desconhecidos, ids repetidos, códigos ou situações inexistentes, ocorrências
com menos de duas fontes `https` e URLs repetidas.

**Nenhum script importa `news.js` antes de ele passar pelo carregador seguro.** O arquivo é escrito por agentes
que leem a web, e um `import` executaria qualquer código de topo que ele contivesse; o build SSR (que embute o
registro) só roda depois que o validador aceitou o arquivo. Por isso `scripts/lib/load-news.mjs` analisa a sintaxe do
arquivo
(com o `acorn`) e só aceita `export const` com strings, números, booleanos, `null`, listas e objetos de chaves
simples; chamadas, `await`, `import()`, template strings, funções, getters, spread e chaves computadas são
recusados, com a linha do erro. Validador, diff, consolidação, build, feed e testes passam por esse carregador;
`scripts/load-news.test.mjs` confere que os payloads conhecidos são recusados sem executar nada. O `npm run build`
roda o validador antes de qualquer outra etapa.

## Feed RSS

`npm run build` gera `dist/feed.xml` (`scripts/build-feed.mjs`), anunciado no `<head>`, no menu e no rodapé.

- um item com o **índice atual**, cujo identificador é o próprio valor: ele reaparece no leitor de feeds quando o
  índice chega a um valor novo, e não a cada atualização do registro (se o índice voltar a um valor já publicado,
  leitores que guardam identificadores podem não mostrá-lo de novo);
- um item por **ocorrência**, com resumo, outro lado, códigos, pontos e fontes, que reaparece quando a situação
  dela muda.

Os links do feed são absolutos: no deploy, `SITE_URL` vem do endereço do GitHub Pages; localmente, o padrão é
`http://localhost:4173/`. O feed não existe em `npm run dev`.

## SEO

`npm run build` roda, depois do build normal, um build SSR (`src/entry-server.jsx`) e `scripts/build-seo.mjs`, que:

- **pré-renderiza a página** em `dist/index.html`: buscadores e redes sociais leem todo o conteúdo (índice, registro,
  tabela, método) sem executar JavaScript, e o navegador apenas hidrata o HTML (`src/main.jsx`);
- escreve um **título e uma descrição com o índice atual** (por exemplo, “Ditadorômetro: quão perto o Brasil está de
  uma ditadura? (36/100)”), além de `canonical` e `robots`;
- adiciona **Open Graph e Twitter Card** com uma imagem de compartilhamento 1200×630 (`og-image.png`) gerada a cada
  build com o termômetro, o índice, o estágio e a data;
- inclui **dados estruturados JSON-LD** (`WebSite`, `Organization`, `WebPage`, `Book` e `Dataset`, este com o feed
  RSS como distribuição);
- gera `sitemap.xml` (com `lastmod` igual a `UPDATED_AT`), `robots.txt`, `site.webmanifest`, `favicon.svg` e os ícones
  `apple-touch-icon.png` e `icon-512.png`, todos na cor do estágio atual.

Como o texto e a imagem saem do registro, cada atualização diária já publica os metadados novos. Todos os links
absolutos usam `SITE_URL`, que no deploy vem do endereço do GitHub Pages.

Depois da primeira publicação, para acelerar a indexação:

1. Cadastre o site no [Google Search Console](https://search.google.com/search-console) e no
   [Bing Webmaster Tools](https://www.bing.com/webmasters), e envie `sitemap.xml` nos dois. Num site de projeto do
   GitHub Pages (`usuario.github.io/ditadorometro/`), os buscadores só leem o `robots.txt` da raiz do domínio, então o
   envio manual do sitemap é o que garante a descoberta.
2. Confira a prévia de compartilhamento no [Validador de Cards do LinkedIn](https://www.linkedin.com/post-inspector/)
   ou no [Depurador de Compartilhamento do Facebook](https://developers.facebook.com/tools/debug/), e os dados
   estruturados no [Teste de pesquisa aprimorada do Google](https://search.google.com/test/rich-results).
3. Com um domínio próprio (Settings → Pages → Custom domain), o `robots.txt` passa a valer e o endereço fica mais
   fácil de lembrar e citar. Basta publicar com o novo `SITE_URL`, que o deploy obtém automaticamente.

## Publicação no GitHub Pages

`.github/workflows/deploy.yml` roda a cada push na `main` (e manualmente): valida o registro, gera o build e publica.

Configuração: **Settings → Pages → Source: GitHub Actions.**

`.github/workflows/validar-pr.yml` valida e gera o build em todo pull request. PRs abertos por agentes (branches
`agente/`) só podem alterar `src/data/news.js`.

## Atualização diária automática

`.github/workflows/atualizacao-diaria.yml` roda todo dia às 06:00 (Brasília), com agentes de IA executados pelo
GitHub Actions, e aos domingos às 07:00 numa **execução de
rebalanceamento**, que ignora o Judiciário e busca só atos de Executivo, Congresso, Forças Armadas, estados, partidos
e plataformas, com janela de 30 dias. Nenhuma mudança vai ao ar sem passar por três verificações independentes:

1. **preparar** — `scripts/collect-news.mjs` reúne pistas de feeds oficiais (STF, Senado, Câmara, Agência Brasil,
   TCU, Defesa), de veículos agrupados por linha editorial e de buscas no Google News organizadas por código da
   tabela, com o vocabulário dos dois lados do debate; `scripts/cobertura.mjs` conta ocorrências por esfera e
   códigos nunca usados. Os dois arquivos vão para o pesquisador e para os verificadores, que assim veem o que
   estava disponível e não entrou.
2. **pesquisar** — um agente (no modelo mais capaz, por ser o passo que decide o que entra) revisa as ocorrências existentes,
   busca fatos dos últimos 7 dias **por ator** (Presidência, Congresso, tribunais, MP, polícias, TSE, Forças
   Armadas, estados, partidos e militantes, plataformas e imprensa) e propõe mudanças em `src/data/news.js`
   (`.github/prompts/atualizar-registro.md`). Cotas: no máximo 5 ocorrências novas, 2 por esfera e 2 por enredo,
   com prioridade às esferas menos cobertas nos últimos 90 dias; o que não couber vai para a fila. O relatório traz
   uma tabela de cobertura por ator e a resposta ao **teste do espelho** (o mesmo ato, praticado pelo campo oposto,
   teria sido buscado e classificado igual?). Só pode escrever no registro e no relatório.
3. **verificar** — três agentes, cada um em seu próprio job e sem ver o trabalho dos outros, votam em cada mudança
   (`.github/prompts/verificar-registro.md`):
   - *fontes*: abre todos os links e confere cada afirmação, data e número, e se o par de fontes é válido pelos
     grupos de linha editorial;
   - *classificação* (no modelo mais capaz): confere códigos (nem a mais, nem a menos), situação, o teste do espelho
     e se casos equivalentes tiveram o mesmo tratamento; e faz a **verificação de cobertura**: lê a fila e os
     descartados, busca por conta própria atos das esferas menos cobertas e registra as omissões no veredito;
   - *linguagem*: confere atribuição, título descritivo, outro lado, presunção de inocência e risco jurídico.

   Cada verificador também recalcula os pontos de cada caso.
4. **consolidar** — `scripts/apply-verdicts.mjs` aceita uma mudança só com **2 aprovações de 3, nenhum veto e pontos
   confirmados pela maioria**. Voto ausente conta como rejeição. Mudanças recusadas voltam à versão anterior.
   `scripts/pendencias.mjs` grava em `data/pendencias.md` a fila do pesquisador e as omissões dos verificadores, que
   o pesquisador seguinte lê obrigatoriamente. O resultado é validado e enviado por commit direto na `main`, com o
   placar dos votos, as objeções e o resumo de cobertura na mensagem.
5. **publicar** — o deploy roda em seguida.

Os jobs dos agentes rodam só com `contents: read` e sem `id-token`; apenas a consolidação tem `contents: write`.
O pesquisador só tem permissão de escrita em `src/data/news.js` e `.agent/relatorio.md`, e cada verificador só no
próprio veredito, então nenhum deles consegue alterar scripts ou dependências antes de rodar os comandos
permitidos. Como o candidato passa pelo carregador seguro antes de qualquer execução (ver
[Rodar localmente](#rodar-localmente)), um agente que obedeça a instruções injetadas por uma página só consegue
fazer chegar à `main` dados, que os verificadores ainda votam.

Configuração:

1. A chave de API do provedor dos agentes, no secret cujo nome está em `.github/workflows/atualizacao-diaria.yml`,
   em **Settings → Secrets and variables → Actions**.
2. Se a `main` tiver proteção de branch, permitir que o GitHub Actions faça push nela.

## Ferramentas de apoio

Scripts para manutenção manual do registro:

```bash
node scripts/collect-news.mjs candidatas.md 7   # pistas de feeds oficiais, veículos e buscas por código
node scripts/cobertura.mjs cobertura.md 90      # ocorrências por esfera e dimensão, códigos nunca usados
node scripts/check-links.mjs links.md           # confere se as fontes do registro ainda respondem
```

## Regras editoriais

- Cada ocorrência precisa de pelo menos duas fontes de linhas editoriais diferentes, ou uma fonte oficial e um
  veículo, pelos grupos definidos na regra 4 de `.github/prompts/atualizar-registro.md` (oficial, generalista,
  especializado, linha declarada à esquerda, linha declarada à direita). Sites partidários, entidades que são parte
  no caso e fonte oficial do próprio órgão citado nunca são a única base.
- Toda ocorrência traz a posição dos citados (`response`).
- Relatar o que as fontes dizem, sem concluir o que elas não concluíram, sem adjetivos de juízo e sem frases que
  absolvam ou condenem. O título descreve o ato, não qualifica o autor.
- As pessoas citadas não foram condenadas pelos fatos relatados, salvo quando indicado. Vale a presunção de
  inocência.
- Os critérios valem para qualquer pessoa, partido ou Poder. Teste do espelho: o mesmo ato, praticado pelo campo
  oposto, receberia os mesmos códigos e a mesma situação.

## Licença

- **Dados e textos** (registro, tabela de classificação, dimensões, escala, precedentes, notas, textos do site e
  prompts dos agentes): [CC BY 4.0](LICENSE-DADOS.md). Use à vontade, com crédito ao Ditadorômetro.
- **Código** (componentes, scripts, estilos, `index.html`, `vite.config.js` e workflows): [MIT](LICENSE).
- **Fora das licenças:** as reportagens e os documentos citados como fontes, e os trechos citados ou parafraseados
  do livro na tabela de classificação, que pertencem aos seus autores.

## Como contribuir

- **Nova ocorrência ou correção:** edite `src/data/news.js` seguindo as regras acima, atualize `UPDATED_AT`, rode
  `node scripts/validate.mjs` e abra um pull request com as fontes.
- **Mudança de critério:** altere a gravidade ou crie códigos em `src/data/rubric.js`, ajuste multiplicadores e o
  teto em `src/data/indicators.js`, ou as faixas dos estágios em `src/data/levels.js`. Explique no PR o fundamento no
  livro; a mudança afeta todo o histórico de uma
  vez, então registre o efeito no índice em `src/data/notes.js`. O exemplo de um código novo é genérico ou
  histórico, nunca o caso concreto que motivou a criação.
- **Erro factual:** abra uma issue com o link da fonte que contradiz o registro.
