import { useState } from 'react'

const GRAVITY = ['', 'leve', 'moderada', 'grave']

export default function NewsRegister({ items, model }) {
  const [power, setPower] = useState('todos')
  const sorted = [...items].sort((a, b) => b.sort.localeCompare(a.sort))
  const visible = power === 'todos' ? sorted : sorted.filter((n) => n.power === power)

  return (
    <section id="registro" className="section" aria-labelledby="registro-title">
      <div className="wrap">
        <header className="section__head">
          <p className="kicker">Registro de ocorrências</p>
          <h2 id="registro-title">O que move o ponteiro</h2>
          <p className="section__lede">
            Fatos do Executivo, do Legislativo, do Judiciário e do processo eleitoral, reportados por órgãos oficiais e
            pela imprensa, com a posição dos citados. Cada caso é classificado pela{' '}
            <a href="#criterios">tabela de critérios</a>. Pesa mais o que não é apurado.
          </p>
        </header>

        <div className="filters" role="group" aria-label="Filtrar por esfera">
          <button type="button" aria-pressed={power === 'todos'} onClick={() => setPower('todos')}>
            Todos <span className="count">{items.length}</span>
          </button>
          {Object.entries(model.powers).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={power === id} onClick={() => setPower(id)}>
              {label} <span className="count">{items.filter((n) => n.power === id).length}</span>
            </button>
          ))}
        </div>

        <ol className="register" aria-live="polite">
          {visible.map((item) => (
            <li key={item.id}>
              <Entry item={item} model={model} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Entry({ item, model }) {
  const { weights, points } = item
  const dimensionName = Object.fromEntries(model.indicators.map((i) => [i.id, i.short]))
  return (
    <article id={`ocorrencia-${item.id}`} className="entry" aria-labelledby={`t-${item.id}`}>
      <div className="entry__meta">
        <time className="entry__date">{item.when}</time>
        <span className={`status status--${item.status}`}>{model.status[item.status].label}</span>
        <span className="entry__inst">
          {model.powers[item.power]} · {item.institutions.join(', ')}
        </span>
      </div>

      <div className="entry__body">
        <h3 id={`t-${item.id}`} className="entry__title">{item.title}</h3>
        <p>{item.summary}</p>
        <p className="entry__response">
          <strong>Outro lado:</strong> {item.response}
        </p>

        <p className="entry__codes">
          <span>Classificação:</span>{' '}
          {item.cases.map((c) => (
            <a key={c} href={`#rubrica-${c}`} className="code" title={model.rubricByCode[c].type}>
              {c}
            </a>
          ))}
        </p>

        {Object.keys(weights).length > 0 && (
          <dl className="entry__weights">
            {Object.entries(weights).map(([id, w]) => (
              <div key={id}>
                <dt>{dimensionName[id]}</dt>
                <dd>{GRAVITY[w]}</dd>
              </div>
            ))}
            <div className="entry__total">
              <dt>Contribuição</dt>
              <dd>{points.toFixed(1)} pts</dd>
            </div>
          </dl>
        )}

        <p className="entry__sources">
          <span>Fontes:</span>{' '}
          {item.sources.map((s, i) => (
            <span key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.outlet}
                <span className="visually-hidden"> (abre em nova aba)</span>
              </a>
              {i < item.sources.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>
    </article>
  )
}
