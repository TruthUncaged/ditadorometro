# Ditadorômetro

Site estático (React 18 + Vite 5) que calcula um índice de erosão democrática a partir de `src/data/news.js`.
O README é a documentação completa do método, da automação e das regras editoriais: leia-o antes de mudar dados ou critério.

## Comandos

- `npm run dev` — desenvolvimento.
- `node scripts/validate.mjs` — valida o registro e imprime o índice por dimensão. Roda sempre antes de commitar dados.
- `npm test` — testes do cálculo e do carregador do registro (`scripts/*.test.mjs`).
- `npm run build` — valida, gera `dist/` pré-renderizado, SEO e `feed.xml`. O build já recusa um registro inválido.
- `node scripts/saturacao.mjs 0.8 1 1.2` — simula o índice com outros tetos (fatores sobre os tetos por dimensão, ou `regras=10`).
- `node scripts/cobertura.mjs` — ocorrências por esfera e dimensão, códigos nunca usados.

## Regras que valem para qualquer mudança

- `src/data/news.js` contém só dados. Nenhum script o importa antes de ele passar por `scripts/lib/load-news.mjs`, que analisa a sintaxe e só aceita `export const` com literais, listas e objetos; o build SSR só roda depois do validador. Qualquer novo script que leia o registro usa esse carregador, nunca `import`.
- Uma ocorrência tem exatamente os campos `id, sort, when, power, title, summary, response, institutions, status, cases, sources`; cada fonte tem `outlet` e `url`. Campo novo exige mudar `scripts/validate.mjs`, `scripts/apply-verdicts.mjs` e os componentes.
- Mudança de critério (`rubric.js`, `indicators.js`, `levels.js`) altera a leitura publicada de uma vez. Registre uma nota em `src/data/notes.js` e no README, com o efeito no índice.
- Exemplos da tabela de classificação são genéricos ou históricos, nunca o caso concreto que motivou o código. Todo código descreve uma conduta, não um ator; um código novo só entra se puder ser ilustrado por atores de campos opostos (teste do espelho).
- Cálculo: maior gravidade por dimensão; a dimensão mais grave conta inteira, a segunda pela metade, a terceira não soma; multiplicador do `status` com linha de base 1,0; teto por dimensão. Ao mudar qualquer um desses, atualize README, `Method.jsx`, o prompt do verificador (que recalcula os pontos à mão) e os testes.
- Regras editoriais (duas fontes, outro lado, presunção de inocência, mesmo critério para todos) estão no README e em `.github/prompts/atualizar-registro.md`.
- Mensagens de commit em português, no formato `tipo(escopo): descrição` (`feat(dados)`, `fix(metodo)`, `docs`, `ci`).

## Automação

`.github/workflows/atualizacao-diaria.yml` roda agentes (pesquisador + três verificadores) e faz commit direto na `main` só com mudanças aprovadas, mais `data/pendencias.md` (fila e omissões). O pesquisador só pode alterar `news.js` e o relatório. A busca é organizada por ator, com cotas por esfera e teste do espelho; roda a cada 3 dias e, aos domingos, em modo de rebalanceamento. Ao mudar os prompts em `.github/prompts/`, mantenha a seção “Regras que não podem ser quebradas”, que o verificador também lê.
