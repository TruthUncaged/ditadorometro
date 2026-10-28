// Entrada usada só no build: gera o HTML da página para que buscadores e
// redes sociais leiam o conteúdo sem executar JavaScript.
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export function render() {
  return renderToString(<App />)
}
