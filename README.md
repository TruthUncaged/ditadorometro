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
- [Publicação no GitHub Pages](#publicação-no-github-pages)
- [Atualização diária automática](#atualização-diária-automática)
- [Variante com o agente de código do GitHub Copilot](#variante-com-o-agente-de-código-do-github-copilot)
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

`src/data/rubric.js` traz 36 tipos genéricos de caso, pensados para classificar qualquer ocorrência futura com o
mesmo critério, independentemente de partido ou Poder. Cada código tem dimensão, gravidade (1 a 3), a passagem
correspondente do livro e um exemplo.

| Grupo | Dimensão | Exemplos de tipo |
| --- | --- | --- |
| A1–A5 | Regras do jogo | Questionar eleições sem provas; tentativa de golpe; descumprir decisão judicial; mudar regras para favorecer quem está no poder. |
| B1–B3 | Legitimidade | Rotular adversários como inimigos; pedir prisão ou cassação por opinião; usar o Estado para fichar críticos. |
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

## Estrutura do projeto

```
├── index.html                    página base (fontes, metadados, feed)
├── src/
│   ├── App.jsx                   montagem da página
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
│   ├── build-feed.mjs            gera dist/feed.xml
│   ├── collect-news.mjs          coleta notícias candidatas (Google News RSS)
│   ├── check-links.mjs           confere se as fontes ainda respondem
│   ├── diff-news.mjs             lista as mudanças entre duas versões do registro
│   └── apply-verdicts.mjs        consolida os votos dos verificadores
└── .github/
    ├── workflows/                deploy, atualização diária, variante Copilot, validação de PR
    ├── prompts/                  instruções dos agentes pesquisador e verificadores
    └── copilot-instructions.md   regras do agente do Copilot
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

## Publicação no GitHub Pages

`.github/workflows/deploy.yml` roda a cada push na `main` (e manualmente): valida o registro, gera o build e publica.

Configuração: **Settings → Pages → Source: GitHub Actions.**

`.github/workflows/validar-pr.yml` valida e gera o build em todo pull request. PRs abertos por agentes (branches
`copilot/` ou `agente/`) só podem alterar `src/data/news.js`.

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

## Variante com o agente de código do GitHub Copilot

> **Desativada.** A atualização em uso é a [diária com três verificadores](#atualização-diária-automática). Esta
> variante não tem agendamento e só roda se for disparada manualmente em **Actions**. Para reativá-la, volte a
> incluir o bloco `schedule` comentado no topo de `atualizacao-copilot.yml`; nesse caso, desative a outra variante.

Quando ativa, `.github/workflows/atualizacao-copilot.yml` roda todo dia às 06:30 (Brasília):

1. coleta notícias candidatas dos últimos 7 dias (`scripts/collect-news.mjs`);
2. verifica se as fontes existentes ainda respondem (`scripts/check-links.mjs`);
3. abre uma issue com esse material e a atribui ao Copilot, que edita `src/data/news.js` e abre um PR;
4. `mesclar-copilot.yml` detecta quando o Copilot termina, valida o PR (só `src/data/news.js` pode mudar) e faz o
   merge automático na `main`; o push dispara a publicação.

Se a tarefa do dia anterior ainda estiver aberta, nenhuma issue nova é criada. O ambiente do agente é preparado por
`copilot-setup-steps.yml`.

Configuração:

1. Plano do Copilot com agente de código (Pro+, Business ou Enterprise) e agente habilitado no repositório.
2. Secret `COPILOT_ASSIGN_TOKEN`: token pessoal *fine-grained* de um usuário com licença do Copilot, com acesso a
   este repositório e permissão de leitura e escrita em Actions, Contents, Issues e Pull requests.
3. **Settings → Copilot → Coding agent → Firewall:** liberar os domínios dos veículos (ou desativar o firewall).

Na variante do Copilot não há verificação independente de fatos, apenas a validação automática de formato.

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
