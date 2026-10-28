import { useMemo } from 'react'
import Header from './components/Header.jsx'
import Thermometer from './components/Thermometer.jsx'
import Dimensions from './components/Dimensions.jsx'
import NewsRegister from './components/NewsRegister.jsx'
import Rubric from './components/Rubric.jsx'
import History from './components/History.jsx'
import Method from './components/Method.jsx'
import About from './components/About.jsx'
import { NEWS, UPDATED_AT } from './data/news'
import { computeScore } from './lib/score'
import { levelFor } from './data/levels'

export default function App() {
  const { score, dimensions } = useMemo(() => computeScore(NEWS), [])
  const level = levelFor(score)

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <section id="inicio" className="reading" aria-labelledby="reading-title">
          <div className="wrap">
            <p className="kicker">Brasil · Leitura de {UPDATED_AT}</p>
            <h1 id="reading-title" className="reading__title">
              Quão perto estamos de uma ditadura?
            </h1>
            <p className="reading__lede">
              Um medidor público, com fontes, dos sinais de erosão democrática descritos por Steven Levitsky e
              Daniel Ziblatt em <cite>Como as Democracias Morrem</cite>, aplicado ao governo, ao Congresso, ao
              Judiciário e ao processo eleitoral. O nível muda conforme as ocorrências registradas abaixo — e conforme
              as instituições as apuram ou não.
            </p>

            <div className="reading__grid">
              <Thermometer score={score} level={level} />
              <div className="reading__verdict">
                <p className="verdict__label">Nível atual</p>
                <p className="verdict__score">
                  <span className="verdict__num">{score}</span>
                  <span className="verdict__of">/100</span>
                </p>
                <h2 className="verdict__name">{level.name}</h2>
                <p className="verdict__summary">{level.summary}</p>
                {level.examples.length > 0 && (
                  <p className="verdict__examples">
                    <span>Precedentes deste estágio:</span> {level.examples.join('; ')}.
                  </p>
                )}
                <Dimensions dimensions={dimensions} />
              </div>
            </div>
          </div>
        </section>

        <NewsRegister news={NEWS} />
        <Rubric news={NEWS} />
        <History />
        <Method />
        <About />
      </main>
      <footer className="footer">
        <div className="wrap footer__inner">
          <p>
            Ditadorômetro é um projeto independente e sem fins lucrativos. Não há coleta de dados de visitantes.
          </p>
          <p>
            Para receber as atualizações do índice e do registro, assine o <a href="feed.xml" type="application/rss+xml">feed
            RSS</a> em qualquer leitor de feeds.
          </p>
          <p>
            As pessoas citadas não foram condenadas pelos fatos relatados, salvo quando indicado. Vale a presunção
            de inocência.
          </p>
        </div>
      </footer>
    </>
  )
}
