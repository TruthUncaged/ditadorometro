import { STATUS, SATURATION, INDICATORS } from '../data/indicators'

export default function Method() {
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
            que define a dimensão afetada e a gravidade, de 0 (não pontua) a 3 (grave). Quando dois códigos caem na
            mesma dimensão, vale o mais grave. A gravidade é multiplicada pelo peso da resposta institucional. Os
            pontos de cada dimensão são somados e limitados a {SATURATION} pontos (100%). O nível geral é a média
            das seis dimensões.
          </p>

          <ol className="method-dims">
            {INDICATORS.map((i) => (
              <li key={i.id}>
                <strong>{i.name}.</strong> {i.description}
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
            O princípio vem do próprio livro: democracias morrem menos por atos isolados e mais quando as
            instituições que deveriam reagir deixam de reagir. Por isso, um golpe tentado e punido pesa menos que
            um conflito de interesses que ninguém investiga.
          </p>
          <p>
            O índice é uma ferramenta editorial, não uma medição científica. A classificação de cada caso está
            aberta e pode ser contestada; os critérios valem para qualquer pessoa, partido ou Poder.
          </p>
        </div>
      </div>
    </section>
  )
}
