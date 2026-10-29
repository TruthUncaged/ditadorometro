# Ditadorômetro

Site estático (React 18 + Vite 5) que calcula um índice de erosão democrática a partir do banco JSON em `db/` (registro em `db/ocorrencias.json`).
O README é a documentação completa do método, da automação e das regras editoriais: leia-o antes de mudar dados ou critério.

## Comandos

- `npm run dev` — desenvolvimento.
- `node scripts/validate.mjs` — valida o registro e imprime o índice por dimensão. Roda sempre antes de commitar dados.
- `npm test` — testes dos serviços e da integridade do banco (`scripts/services.test.mjs`).
- `npm run build` — valida, gera `dist/` pré-renderizado, SEO e `feed.xml`. O build já recusa um registro inválido.
- `node scripts/saturacao.mjs 0.8 1 1.2` — simula o índice com outros tetos (fatores sobre os tetos por dimensão, ou `regras=10`).
- `node scripts/cobertura.mjs` — ocorrências por esfera e dimensão, códigos nunca usados.

## Regras que valem para qualquer mudança

- O banco em `db/` é JSON puro. Scripts leem e gravam só por `src/services/repository.node.js`; o site importa os JSON em `src/app/database.js`. Nenhum componente importa dados: tudo chega por props a partir de `src/app/view-model.js`. Regras de domínio ficam em `src/services/` (funções puras, sem React e sem IO) e são testadas em `scripts/services.test.mjs`.
- Uma ocorrência tem exatamente os campos `id, sort, when, power, title, summary, response, institutions, status, cases, sources`, nessa ordem; cada fonte tem `outlet` e `url`. Campo novo exige mudar `ITEM_FIELDS` em `src/services/validation.js`, os componentes e os prompts.
- Mudança de critério (`db/tabela.json`, `db/metodo.json`, `db/estagios.json`) altera a leitura publicada de uma vez. Registre uma nota em `db/notas.json` e no README, com o efeito no índice.
- Exemplos da tabela de classificação são genéricos ou históricos, nunca o caso concreto que motivou o código. Todo código descreve uma conduta, não um ator; um código novo só entra se puder ser ilustrado por atores de campos opostos (teste do espelho).
- Cálculo: maior gravidade por dimensão; a dimensão mais grave conta inteira, a segunda pela metade, a terceira não soma; multiplicador do `status` com linha de base 1,0; teto por dimensão. Ao mudar qualquer um desses, atualize README, `Method.jsx`, o prompt do verificador (que recalcula os pontos à mão) e os testes.
- Regras editoriais (duas fontes, outro lado, presunção de inocência, mesmo critério para todos) estão no README e em `.github/prompts/atualizar-registro.md`.
- Mensagens de commit em português, no formato `tipo(escopo): descrição` (`feat(dados)`, `fix(metodo)`, `docs`, `ci`).

## Automação

`.github/workflows/atualizacao-diaria.yml` roda agentes (pesquisador + três verificadores) e faz commit direto na `main` só com mudanças aprovadas, mais `data/pendencias.md` (fila e omissões). O pesquisador só pode alterar `db/ocorrencias.json` e o relatório. A busca é organizada por ator, com cotas por esfera e teste do espelho; roda a cada 3 dias e, aos domingos, em modo de rebalanceamento. Ao mudar os prompts em `.github/prompts/`, mantenha a seção “Regras que não podem ser quebradas”, que o verificador também lê.
