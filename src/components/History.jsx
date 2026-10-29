export default function History({ cases, levels }) {
  return (
    <section id="precedentes" className="section" aria-labelledby="precedentes-title">
      <div className="wrap">
        <header className="section__head">
          <p className="kicker">Precedentes</p>
          <h2 id="precedentes-title">Como aconteceu em outros lugares</h2>
          <p className="section__lede">
            No último século, a maioria das democracias não caiu de uma vez. Foi desmontada por dentro, com
            aparência de legalidade, por governantes eleitos ou por elites que acreditaram poder controlá-los.
          </p>
        </header>

        <ol className="cases">
          {cases.map((c) => (
            <li key={c.country + c.period} className="case" style={{ '--tone': `var(--lvl-${c.level})` }}>
              <p className="case__head">
                <span className="case__country">{c.country}</span>
                <span className="case__period">{c.period}</span>
              </p>
              <p className="case__level">
                Estágio {c.level} · {levels[c.level].name}
              </p>
              <p className="case__text">{c.text}</p>
              <p className="case__lesson">{c.lesson}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
