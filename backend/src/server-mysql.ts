import { crearApi } from './app-api'
import { AnimeModelo } from './modelos/mysql/anime'
import { CategoriaModelo } from './modelos/mysql/categoria'
import { UsuarioModelo } from './modelos/mysql/usuario'
import { config } from 'dotenv'

config()

const PUERTO = Number(process.env.SERVER_MYSQL) ?? 8002

crearApi({ animeModelo: AnimeModelo, categoriaModelo: CategoriaModelo, usuarioModelo: UsuarioModelo, PUERTO })
