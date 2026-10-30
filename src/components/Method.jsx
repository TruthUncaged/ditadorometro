// Metodologia: recebe o modelo, as notas e a cobertura por props.
export default function Method({ dimensions, status, powers, notes, coverage, comparables }) {
  const dimName = Object.fromEntries(dimensions.map((d) => [d.id, d.short]))
  const { byPower, byYear } = coverage
  const fmt = (x) => x.toFixed(1).replace('.', ',')
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
            {dimensions.map((i) => (
              <li key={i.id}>
                <strong>{i.name}.</strong> {i.description} <span className="method-cap">Teto: {i.saturation} pontos.</span>
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
              {Object.entries(status).map(([id, s]) => (
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

          <h3>Linhagem e comparáveis</h3>
          <p>
            A estrutura das dimensões vem de uma literatura conhecida; as gravidades, os multiplicadores, os tetos e a
            regra de soma são construção editorial do projeto. Para quem quiser comparar, a tabela aponta, para cada
            dimensão, os indicadores correspondentes de dois índices internacionais de referência.
          </p>
          <ul className="lineage">
            {comparables.linhagem.map((l) => (
              <li key={l.ref}>
                <strong>{l.ref}.</strong> {l.papel}
              </li>
            ))}
          </ul>
          <div className="table-scroll" role="region" aria-label="Mapeamento para índices internacionais" tabIndex={0}>
            <table className="weights mapping">
              <caption>Dimensão do Ditadorômetro e indicadores correspondentes</caption>
              <thead>
                <tr>
                  <th scope="col">Dimensão</th>
                  <th scope="col">V-Dem (variáveis)</th>
                  <th scope="col">WJP Rule of Law (fatores)</th>
                </tr>
              </thead>
              <tbody>
                {comparables.mapeamento.map((m) => (
                  <tr key={m.dimensao}>
                    <th scope="row">{dimName[m.dimensao]}</th>
                    <td>{m.vdem.join('; ')}</td>
                    <td>{m.wjp.join('; ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="legal__note">{comparables.aviso}</p>

          {comparables.indices.length > 0 && (
            <>
              <h3>O Brasil nos índices internacionais</h3>
              <p>
                Contexto, não parte do cálculo: avaliações externas julgam os mesmos fatos que o registro documenta, e
                por isso entram só como referência (código N5). Valores lidos nas páginas oficiais em{' '}
                {comparables.verificadoEm}.
              </p>
              <div className="table-scroll" role="region" aria-label="Índices internacionais" tabIndex={0}>
                <table className="weights mapping">
                  <caption>Séries recentes do Brasil</caption>
                  <thead>
                    <tr>
                      <th scope="col">Índice</th>
                      <th scope="col">Escala</th>
                      <th scope="col">Série</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparables.indices.map((i) => (
                      <tr key={i.id}>
                        <th scope="row">
                          <a href={i.url} target="_blank" rel="noopener noreferrer">{i.nome}</a>
                          <span className="method-cap"> {i.organizacao}{i.versao ? ` · ${i.versao}` : ''}</span>
                        </th>
                        <td>{i.escala}</td>
                        <td>{i.serie.map((s) => `${s.ano}: ${s.valor}${s.nota ? ` (${s.nota})` : ''}`).join(' · ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

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
                  <th scope="row">{powers[p]}</th>
                  <td className="num">{s.n}</td>
                  <td className="num">{fmt(s.pts)}</td>
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
                  <td className="num">{fmt(s.pts)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {notes.length > 0 && (
            <>
              <h3>Notas de método</h3>
              <p>
                Mudanças de critério alteram a leitura publicada de imediato, sem que nenhum fato novo tenha
                acontecido. Elas ficam registradas aqui para que a série do índice seja lida com contexto.
              </p>
              <ol className="notes">
                {notes.map((n, i) => (
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
