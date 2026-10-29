import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// No build, o HTML já vem pré-renderizado (scripts/build-seo.mjs); em desenvolvimento, não.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)

// Navegação interna sem "#" na barra de endereço: os links de âncora rolam até a
// seção e devolvem o foco, mas a URL fica limpa. Quem chega por um link com "#"
// (feed RSS, links compartilhados) é levado à seção e a URL é limpa em seguida.
const cleanUrl = () => history.replaceState(null, '', location.pathname + location.search)
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function goTo(id, smooth) {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: smooth && !reduced ? 'smooth' : 'auto', block: 'start' })
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  return true
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]')
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const id = decodeURIComponent(a.getAttribute('href').slice(1))
  if (id && goTo(id, true)) {
    e.preventDefault()
    cleanUrl()
  }
})

if (location.hash.length > 1) {
  const id = decodeURIComponent(location.hash.slice(1))
  requestAnimationFrame(() => {
    goTo(id, false)
    cleanUrl()
  })
}
