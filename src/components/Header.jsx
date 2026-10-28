export default function Header() {
  return (
    <header className="masthead">
      <div className="wrap masthead__inner">
        <a className="wordmark" href="#inicio" aria-label="Ditadorômetro, voltar ao início">
          Ditadorômetro
        </a>
        <nav aria-label="Principal">
          <ul className="nav">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="feed.xml" type="application/rss+xml">RSS</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
