import { STATUS, SATURATION, INDICATORS } from '../data/indicators'
import { NOTES } from '../data/notes'
import { NEWS, POWERS } from '../data/news'
import { itemContributions } from '../lib/score'

// Cobertura do registro: quantas ocorrências e quantos pontos cada esfera e cada ano
// trazem. Mostra o que o índice mede; não é meta.
function coverage() {
  const byPower = Object.fromEntries(Object.keys(POWERS).map((p) => [p, { n: 0, pts: 0 }]))
  const byYear = {}
  for (const n of NEWS) {
    const pts = Object.values(itemContributions(n)).reduce((a, b) => a + b, 0)
    byPower[n.power].n++
    byPower[n.power].pts += pts
    const y = n.sort.slice(0, 4)
    byYear[y] = byYear[y] ?? { n: 0, pts: 0 }
    byYear[y].n++
    byYear[y].pts += pts
  }
  return { byPower, byYear }
}

export default function Method() {
  const { byPower, byYear } = coverage()
  return (
    <section id="metodo" className="section section--alt" aria-labelledby="metodo-title">
      <div className="wrap prose-grid">
        <header className="section__head">
          <p className="kicker">Metodologia</p>
          <h2 id="metodo-title">Como o nível é calculado</h2>
        </header>

        <div className="prose">
          <p>
            Cada ocorrência é enquadrada em um ou mais códigos da <a href="#criterios">tabela de classificação</a>,
            que define a dimensão afetada e a gravidade, de 0 (não pontua) a 3 (grave). A gravidade mede o alcance e
            a irreversibilidade do ato, não o seu motivo. Quando dois códigos caem na mesma dimensão, vale o mais
            grave; a dimensão mais grave de uma ocorrência conta por inteiro, a segunda conta pela metade e, a partir
            da terceira, não soma. A gravidade é multiplicada pelo peso da resposta institucional. Os pontos de cada
            dimensão são somados e limitados a um teto próprio (100%), menor nas dimensões em que as ocorrências são
            raras e graves. O nível geral é a média das seis dimensões.
          </p>

          <ol className="method-dims">
            {INDICATORS.map((i) => (
              <li key={i.id}>
                <strong>{i.name}.</strong> {i.description} <span className="method-cap">Teto: {SATURATION[i.id]} pontos.</span>
              </li>
            ))}
          </ol>

          <table className="weights">
            <caption>Peso da resposta institucional</caption>
            <thead>
              <tr>
                <th scope="col">Situação</th>
                <th scope="col" className="num">Multiplicador</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(STATUS).map(([id, s]) => (
                <tr key={id}>
                  <th scope="row">
                    <span className={`status status--${id}`}>{s.label}</span>
                  </th>
                  <td className="num">×{s.multiplier.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            A linha de base é um ato de Estado cumprido ou um caso em apuração. O peso só sobe quando há dever de
            apurar e inércia documentada, e só desce quando outra instituição reviu, reverteu ou puniu a conduta. O
            princípio vem do livro: democracias morrem menos por atos isolados e mais quando as instituições que
            deveriam reagir deixam de reagir. O desconto por responsabilização é limitado de propósito: a punição
            não apaga o fato de que a conduta ocorreu.
          </p>
          <p>
            O índice é uma ferramenta editorial, não uma medição científica. A classificação de cada caso está
            aberta e pode ser contestada; os critérios valem para qualquer pessoa, partido ou Poder.
          </p>

          <h3>O que o registro cobre</h3>
          <p>
            Ocorrências e pontos por esfera do autor da conduta e por ano. A tabela mostra o que o índice mede hoje,
            para que a leitura seja feita com esse contexto; lacunas são tratadas pela busca por ator da atualização
            automática.
          </p>
          <table className="weights">
            <caption>Cobertura por esfera</caption>
            <thead>
              <tr>
                <th scope="col">Esfera</th>
                <th scope="col" className="num">Ocorrências</th>
                <th scope="col" className="num">Pontos</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(byPower).map(([p, s]) => (
                <tr key={p}>
                  <th scope="row">{POWERS[p]}</th>
                  <td className="num">{s.n}</td>
                  <td className="num">{s.pts.toFixed(1).replace('.', ',')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="weights">
            <caption>Cobertura por ano</caption>
            <thead>
              <tr>
                <th scope="col">Ano</th>
                <th scope="col" className="num">Ocorrências</th>
                <th scope="col" className="num">Pontos</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(byYear).sort().map(([y, s]) => (
                <tr key={y}>
                  <th scope="row">{y}</th>
                  <td className="num">{s.n}</td>
                  <td className="num">{s.pts.toFixed(1).replace('.', ',')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {NOTES.length > 0 && (
            <>
              <h3>Notas de método</h3>
              <p>
                Mudanças de critério alteram a leitura publicada de imediato, sem que nenhum fato novo tenha
                acontecido. Elas ficam registradas aqui para que a série do índice seja lida com contexto.
              </p>
              <ol className="notes">
                {NOTES.map((n, i) => (
                  <li key={`${n.iso}-${i}`}>
                    <time dateTime={n.iso}>{n.date}</time>
                    <strong>{n.title}.</strong> {n.text}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
