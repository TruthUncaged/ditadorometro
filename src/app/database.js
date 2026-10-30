// Banco do site: os JSON de db/ entram no bundle em tempo de build, e o
// repositório os expõe aos componentes. Esta é a única importação de dados
// do front-end; componentes recebem tudo por props.
import ocorrencias from '../../db/ocorrencias.json'
import tabela from '../../db/tabela.json'
import metodo from '../../db/metodo.json'
import estagios from '../../db/estagios.json'
import notas from '../../db/notas.json'
import historia from '../../db/historia.json'
import comparaveis from '../../db/comparaveis.json'
import { createRepository } from '../services/repository.js'

export const db = createRepository({ ocorrencias, tabela, metodo, estagios, notas, historia, comparaveis })
