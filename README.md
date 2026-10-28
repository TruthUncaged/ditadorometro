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
- [Regras editoriais](#regras-editoriais)
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

`src/data/rubric.js` traz 37 tipos genéricos de caso, pensados para classificar qualquer ocorrência futura com o
mesmo critério, independentemente de partido ou Poder. Cada código tem dimensão, gravidade (1 a 3), a passagem
correspondente do livro e um exemplo.

| Grupo | Dimensão | Exemplos de tipo |
| --- | --- | --- |
| A1–A5 | Regras do jogo | Questionar eleições sem provas; tentativa de golpe; descumprir decisão judicial; mudar regras para favorecer quem está no poder. |
| B1–B4 | Legitimidade | Rotular adversários como inimigos; pedir prisão ou cassação por opinião; usar o Estado para fichar críticos; medida cautelar contra opositor no momento do resultado eleitoral. |
| C1–C3 | Violência | Não condenar violência de aliados; elogiar golpes ou tortura; incitar ou financiar depredação. |
| D1–D8 | Liberdades | Remoção de conteúdo sem decisão fundamentada; suspensão de plataforma; busca e apreensão por opinião; assédio judicial a jornalistas. |
| E1–E8 | Árbitros | Conflito de interesses de julgador; quem investiga também julga; inquérito de ofício sem prazo; nomeação de aliado; expurgos. |
| F1–F6 | Impunidade | CPI com assinaturas não instalada; arquivamento sem mérito; citado decide sobre o próprio caso; decisões individuais sem referendo. |
| N1–N3 | Contexto (não pontua) | Promessa de campanha não cumprida; declaração falsa de autoridade; corrupção investigada pelo caminho normal. |

Os códigos N valem zero de propósito: o livro trata de erosão das instituições, não de mau governo. Promessas
quebradas e declarações falsas ficam registradas como contexto e podem ganhar peso, se assim se decidir, alterando a
gravidade em `rubric.js`.

## Cálculo do índice

Para cada ocorrência:

1. em cada dimensão, vale a **maior gravidade** entre os códigos daquela dimensão;
2. essa gravidade é multiplicada pelo **multiplicador da situação**:

| Situação (`status`) | Multiplicador |
| --- | --- |
| Sem apuração formal conhecida (`sem-apuracao`) | 1,5 |
| Arquivamento ou nulidade pedidos (`arquivamento`) | 1,4 |
| Apuração travada (`travada`) | 1,3 |
| Medida consumada, sem responsabilização (`consumado`) | 1,2 |
| Em curso (`em-curso`) | 1,0 |
| Declaração pública (`declaracao`) | 1,0 |
| Revisado por colegiado (`revisado`) | 0,8 |
| Responsabilização efetivada (`responsabilizado`) | 0,4 |
| Contexto, não pontua (`contexto`) | 0 |

Os pontos são somados por dimensão e limitados a `SATURATION` (15 pontos = 100% da dimensão). O índice é a média das
seis dimensões, de 0 a 100. O código está em `src/lib/score.js`, e o mesmo cálculo é usado pelo site, pelo
validador, pelo feed e pelos scripts de automação.

### Decisão pendente: o valor de `SATURATION`

`SATURATION` (em `src/data/indicators.js`) é quantos pontos uma dimensão precisa para chegar a 100%. Ele resolve duas
coisas que puxam em direções opostas:

- **Sensibilidade.** Quando uma dimensão chega ao teto, casos novos daquela dimensão deixam de mover o termômetro.
  Em outubro de 2026, com 15 pontos, *Liberdades* (17,8 pontos) e *Árbitros* (20,6 pontos) já estão no teto: um novo
  caso de censura ou de captura de tribunal entra no registro, mas o índice não muda.
- **Nível do índice.** Um teto maior faz cada ponto valer menos, então o índice publicado cai, e pode mudar de
  estágio, sem que nenhum fato novo tenha acontecido.

Simulação com o registro de 28 de outubro de 2026 (22 ocorrências):

| `SATURATION` | Índice | Estágio | Liberdades | Árbitros | Efeito |
| --- | --- | --- | --- | --- | --- |
| **15 (atual)** | 50 | 3 · Captura dos árbitros | 100% (teto) | 100% (teto) | Duas dimensões não reagem mais |
| 20 | 44 | 3 · Captura dos árbitros | 89% | 100% (teto) | Árbitros continua sem reagir |
| 25 | 36 | 2 · Erosão das normas | 71% | 82% | Cabem 2 ou 3 casos graves por dimensão antes do teto |
| 30 | 30 | 2 · Erosão das normas | 59% | 69% | Mais folga, índice perto do limite do estágio 2 |

Para repetir a simulação com os dados atuais ou outros valores:

```bash
node scripts/saturacao.mjs            # compara 15, 20, 25 e 30
node scripts/saturacao.mjs 18 22 40   # compara os valores informados
```

Pontos a considerar antes de decidir:

1. **Mudar o teto muda a leitura publicada de uma vez.** Se o índice cair de estágio, o site e o feed RSS mostram uma
   "melhora" que não veio de nenhum fato. Vale publicar a mudança junto com uma nota explicando a recalibração.
2. **O teto vale para todas as dimensões.** As dimensões com poucos pontos (*Regras*, *Legitimidade*, *Violência*)
   também ficam menores, mesmo sem estar perto do limite.
3. **Alternativas ao teto único**, se nenhum valor servir: um teto por dimensão (por exemplo, maior em *Árbitros* e
   *Liberdades*), ou uma curva de retorno decrescente no lugar do corte (cada ponto vale um pouco menos que o
   anterior, sem um limite rígido). As duas exigem mudar `src/lib/score.js` e a seção de método do site.
4. **Ajustar as faixas dos estágios** (`src/data/levels.js`) junto com o teto pode manter o estágio atual, mas também
   muda o critério para todos os casos futuros.

## Estrutura do projeto

```
├── index.html                    página base (fontes, metadados, feed)
├── src/
│   ├── App.jsx                   montagem da página
│   ├── main.jsx                  entrada do navegador (hidrata o HTML pré-renderizado)
│   ├── entry-server.jsx          entrada do build que pré-renderiza a página
│   ├── components/               termômetro, dimensões, registro, tabela, histórico, método, sobre
│   ├── data/
│   │   ├── news.js               registro de ocorrências (o que move o ponteiro) e UPDATED_AT
│   │   ├── rubric.js             tabela de classificação (A1…F6, N1…N3)
│   │   ├── indicators.js         as seis dimensões, multiplicadores de situação e saturação
│   │   ├── levels.js             os sete estágios
│   │   └── history.js            precedentes históricos
│   ├── lib/score.js              cálculo do índice
│   └── styles.css                estilos (tema claro e escuro, movimento reduzido)
├── scripts/
│   ├── validate.mjs              valida o registro e imprime o índice
│   ├── saturacao.mjs             simula o índice com outros valores de SATURATION
│   ├── build-seo.mjs             pré-renderiza a página e gera metadados, sitemap, robots e imagens
│   ├── build-feed.mjs            gera dist/feed.xml
│   ├── collect-news.mjs          lista notícias candidatas dos últimos dias (Google News RSS)
│   ├── check-links.mjs           confere se as fontes ainda respondem
│   ├── diff-news.mjs             lista as mudanças entre duas versões do registro
│   └── apply-verdicts.mjs        consolida os votos dos verificadores
└── .github/
    ├── workflows/                deploy, atualização diária, validação de PR
    └── prompts/                  instruções dos agentes pesquisador e verificadores
```

## Rodar localmente

Requer Node.js 20 ou mais recente.

```bash
npm install
npm run dev                  # desenvolvimento em http://localhost:5173
node scripts/validate.mjs    # valida o registro e mostra o índice por dimensão
npm run build                # gera dist/ estático, incluindo dist/feed.xml
npm run preview              # serve o build em http://localhost:4173
```

O validador recusa: campos faltando, ids repetidos, códigos ou situações inexistentes, ocorrências com menos de duas
fontes `https`, URLs repetidas e qualquer código executável dentro de `news.js` (o arquivo é escrito por agentes que
leem a web, então só pode conter dados).

## Feed RSS

`npm run build` gera `dist/feed.xml` (`scripts/build-feed.mjs`), anunciado no `<head>`, no menu e no rodapé.

- um item com o **índice atual**, que reaparece no leitor de feeds sempre que o índice muda;
- um item por **ocorrência**, com resumo, outro lado, códigos, pontos e fontes, que reaparece quando a situação
  dela muda.

Os links do feed são absolutos: no deploy, `SITE_URL` vem do endereço do GitHub Pages; localmente, o padrão é
`http://localhost:4173/`. O feed não existe em `npm run dev`.

## SEO

`npm run build` roda, depois do build normal, um build SSR (`src/entry-server.jsx`) e `scripts/build-seo.mjs`, que:

- **pré-renderiza a página** em `dist/index.html`: buscadores e redes sociais leem todo o conteúdo (índice, registro,
  tabela, método) sem executar JavaScript, e o navegador apenas hidrata o HTML (`src/main.jsx`);
- escreve um **título e uma descrição com o índice atual** (por exemplo, “Ditadorômetro: quão perto o Brasil está de
  uma ditadura? (50/100)”), além de `canonical` e `robots`;
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

`.github/workflows/atualizacao-diaria.yml` roda todo dia às 06:00 (Brasília), com agentes de IA via
[claude-code-action](https://github.com/anthropics/claude-code-action). Nenhuma mudança vai ao ar sem passar por três
verificações independentes:

1. **pesquisar** — um agente revisa as ocorrências existentes, busca fatos dos últimos 7 dias e propõe mudanças em
   `src/data/news.js` (`.github/prompts/atualizar-registro.md`). Qualquer alteração fora desse arquivo é
   descartada antes da validação.
2. **verificar** — três agentes, cada um em seu próprio job e sem ver o trabalho dos outros, votam em cada mudança
   (`.github/prompts/verificar-registro.md`):
   - *fontes*: abre todos os links e confere cada afirmação, data e número;
   - *classificação*: confere códigos, situação e se casos equivalentes tiveram o mesmo tratamento (roda num modelo
     diferente dos outros dois);
   - *linguagem*: confere atribuição, outro lado, presunção de inocência e risco jurídico.

   Cada verificador também recalcula os pontos de cada caso.
3. **consolidar** — `scripts/apply-verdicts.mjs` aceita uma mudança só com **2 aprovações de 3, nenhum veto e pontos
   confirmados pela maioria**. Voto ausente conta como rejeição. Mudanças recusadas voltam à versão anterior. O
   resultado é validado e enviado por commit direto na `main`, com o placar dos votos e as objeções na mensagem.
4. **publicar** — o deploy roda em seguida.

Configuração:

1. Secret `ANTHROPIC_API_KEY` em **Settings → Secrets and variables → Actions**.
2. Se a `main` tiver proteção de branch, permitir que o GitHub Actions faça push nela.

## Ferramentas de apoio

Scripts para manutenção manual do registro:

```bash
node scripts/collect-news.mjs candidatas.md 7   # notícias candidatas dos últimos 7 dias
node scripts/check-links.mjs links.md           # confere se as fontes do registro ainda respondem
```

## Regras editoriais

- Cada ocorrência precisa de pelo menos duas fontes de linhas editoriais diferentes, ou uma fonte oficial e um
  veículo. Sites partidários nunca são a única base.
- Toda ocorrência traz a posição dos citados (`response`).
- Relatar o que as fontes dizem, sem concluir o que elas não concluíram e sem adjetivos de juízo.
- As pessoas citadas não foram condenadas pelos fatos relatados, salvo quando indicado. Vale a presunção de
  inocência.
- Os critérios valem para qualquer pessoa, partido ou Poder.

## Como contribuir

- **Nova ocorrência ou correção:** edite `src/data/news.js` seguindo as regras acima, atualize `UPDATED_AT`, rode
  `node scripts/validate.mjs` e abra um pull request com as fontes.
- **Mudança de critério:** altere a gravidade ou crie códigos em `src/data/rubric.js`, ou ajuste multiplicadores em
  `src/data/indicators.js`. Explique no PR o fundamento no livro; a mudança afeta todo o histórico de uma vez.
- **Erro factual:** abra uma issue com o link da fonte que contradiz o registro.
