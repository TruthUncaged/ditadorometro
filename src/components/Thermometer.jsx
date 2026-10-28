import { LEVELS } from '../data/levels'

export default function Thermometer({ score, level }) {
  const top = [...LEVELS].reverse()

  return (
    <figure className="thermo">
      <div
        className="thermo__body"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
        aria-valuetext={`${score} de 100: ${level.name}`}
        aria-label="Nível do Ditadorômetro"
      >
        <div className="thermo__tube" aria-hidden="true">
          <div className="thermo__empty" style={{ '--h': `${score}%` }} />
          <div className="thermo__mark" style={{ '--h': `${score}%` }}>
            <span>{score}</span>
          </div>
        </div>
        <ol className="thermo__scale">
          {top.map((l) => (
            <li
              key={l.id}
              className={`thermo__step${l.id === level.id ? ' is-current' : ''}`}
              style={{ '--tone': `var(--lvl-${l.id})` }}
              aria-current={l.id === level.id ? 'step' : undefined}
            >
              <span className="thermo__idx">{l.id}</span>
              <span className="thermo__name">{l.name}</span>
              {l.id === level.id && <span className="visually-hidden"> (nível atual)</span>}
            </li>
          ))}
        </ol>
      </div>
      <div className="thermo__bulb" aria-hidden="true" />
      <figcaption className="thermo__caption">
        Escala de 0 (democracia plena) a 100 (ditadura), em sete estágios.
      </figcaption>
    </figure>
  )
}
