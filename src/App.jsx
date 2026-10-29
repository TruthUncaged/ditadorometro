import { useMemo } from 'react'
import Header from './components/Header.jsx'
import Thermometer from './components/Thermometer.jsx'
import Dimensions from './components/Dimensions.jsx'
import NewsRegister from './components/NewsRegister.jsx'
import Rubric from './components/Rubric.jsx'
import History from './components/History.jsx'
import Method from './components/Method.jsx'
import About from './components/About.jsx'
import GitHubIcon, { REPO_URL } from './components/GitHubIcon.jsx'
import { db } from './app/database.js'
import { buildSiteModel } from './app/view-model.js'

// A página é uma função do banco: App monta o modelo de visão uma vez e passa
// partes dele aos componentes, que não conhecem o banco nem os serviços.
export default function App() {
  const site = useMemo(() => buildSiteModel(db), [])
  const { score, level, dimensions, items, updatedAt, model, rubric, levels, notes, history, coverage } = site

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <section id="inicio" className="reading" aria-labelledby="reading-title">
          <div className="wrap">
            <p className="kicker">Brasil · Leitura de {updatedAt}</p>
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
              <Thermometer score={score} level={level} levels={levels} />
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

        <NewsRegister items={items} model={model} />
        <Rubric items={items} rubric={rubric} indicators={model.indicators} />
        <History cases={history} levels={levels} />
        <Method dimensions={dimensions} status={model.status} powers={model.powers} notes={notes} coverage={coverage} />
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
          <p className="footer__repo">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={16} /> Código, dados e critérios abertos no GitHub
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
            . Contribuições de código, dados e revisão são bem-vindas; dúvidas e sugestões por e-mail:{' '}
            <a href="mailto:TruthUncaged@proton.me">TruthUncaged@proton.me</a>.
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
