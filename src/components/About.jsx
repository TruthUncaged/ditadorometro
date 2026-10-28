export default function About() {
  return (
    <section id="sobre" className="section" aria-labelledby="sobre-title">
      <div className="wrap prose-grid">
        <header className="section__head">
          <p className="kicker">Sobre</p>
          <h2 id="sobre-title">Por que este medidor existe</h2>
        </header>

        <div className="prose">
          <p>
            Em <cite>Como as Democracias Morrem</cite> (Zahar, 2018), os cientistas políticos Steven Levitsky e
            Daniel Ziblatt, de Harvard, mostram que as rupturas democráticas modernas raramente começam com tanques
            nas ruas. Elas avançam por etapas legais e graduais, e quase sempre passam por três movimentos:
            <strong> capturar os árbitros</strong>, <strong>tirar os adversários de campo</strong> e{' '}
            <strong>mudar as regras do jogo</strong>.
          </p>
          <p>
            Os autores lembram que constituições sozinhas não bastam. A democracia depende de duas grades de
            proteção não escritas: a <strong>tolerância mútua</strong> — aceitar o adversário como legítimo — e a{' '}
            <strong>reserva institucional</strong> — não usar todo o poder que o cargo permite.
          </p>
          <p>
            O Ditadorômetro aplica esse roteiro ao Brasil de hoje, a partir de fatos reportados e com fontes. Não
            pertence a partido, não aceita patrocínio e não tem lado: o critério que vale para um Poder vale para
            os outros.
          </p>

          <h3>Critérios para as fontes</h3>
          <ul>
            <li>Documentos e comunicados oficiais (STF, PGR, Banco Central, Congresso) sempre que disponíveis.</li>
            <li>Ao menos duas fontes jornalísticas independentes por ocorrência, de linhas editoriais distintas.</li>
            <li>A posição de quem é citado é publicada junto com o fato.</li>
            <li>Opinião e coluna não entram como fonte de fato.</li>
          </ul>

          <h3>Correções</h3>
          <p>
            Encontrou um erro, uma fonte melhor ou uma resposta oficial que não está aqui? O registro é revisado e
            as correções são indicadas na própria ocorrência.
          </p>

          <h3>Licença</h3>
          <p>
            O registro de ocorrências, a tabela de classificação, a escala, os precedentes, as notas e os demais
            textos do site podem ser reutilizados sob a licença{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/deed.pt-br" rel="license">Creative Commons Atribuição 4.0</a>,
            com crédito ao Ditadorômetro. As reportagens e os documentos citados como fontes, e os trechos do livro
            reproduzidos na tabela, pertencem aos seus autores. O código do site é software livre sob a licença MIT.
          </p>
        </div>
      </div>
    </section>
  )
}
