export default function Rubric({ items, rubric, indicators }) {
  const usage = {}
  for (const n of items) for (const c of n.cases) usage[c] = (usage[c] ?? 0) + 1
  const groups = [
    ...indicators.map((i, n) => ({ id: i.id, title: `${n + 1}. ${i.name}`, description: i.description })),
    { id: null, title: 'Contexto — registrado, mas não pontua', description: 'Fatos relevantes para o debate público que, pelo critério do livro, não indicam ruptura democrática por si sós.' },
  ]

  return (
    <section id="criterios" className="section section--alt" aria-labelledby="criterios-title">
      <div className="wrap">
        <header className="section__head">
          <p className="kicker">Tabela de classificação</p>
          <h2 id="criterios-title">Critérios de pontuação</h2>
          <p className="section__lede">
            Toda ocorrência é enquadrada em um ou mais tipos desta tabela, e a gravidade vem daqui — não do caso. Assim,
            situações equivalentes pontuam igual, seja quem for o autor. A tabela é a referência para classificar casos
            futuros.
          </p>
        </header>

        {groups.map((g) => {
          const rows = rubric.filter((r) => r.dimension === g.id)
          return (
            <div key={g.id ?? 'contexto'} className="rubric-group">
              <h3 className="rubric-group__title">{g.title}</h3>
              <p className="rubric-group__desc">{g.description}</p>
              <div className="table-scroll" role="region" aria-label={g.title} tabIndex={0}>
                <table className="rubric">
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Tipo de ocorrência</th>
                      <th scope="col">Gravidade</th>
                      <th scope="col">Base no livro</th>
                      <th scope="col">Exemplo genérico</th>
                      <th scope="col" className="num">Casos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.code} id={`rubrica-${r.code}`}>
                        <th scope="row" className="rubric__code">{r.code}</th>
                        <td className="rubric__type">{r.type}</td>
                        <td>
                          <Gravity value={r.gravity} />
                        </td>
                        <td className="rubric__book">{r.book}</td>
                        <td className="rubric__example">{r.example}</td>
                        <td className="num">{usage[r.code] ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const LABELS = ['não pontua', 'leve', 'moderada', 'grave']

function Gravity({ value }) {
  return (
    <span className="gravity" title={LABELS[value]}>
      <span className="gravity__dots" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} className={n <= value ? 'on' : ''} />
        ))}
      </span>
      <span className="gravity__label">
        {value} · {LABELS[value]}
      </span>
    </span>
  )
}
