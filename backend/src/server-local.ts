import { crearApi } from './app-api'
import { AnimeModelo } from './modelos/local/anime'
import { CategoriaModelo } from './modelos/local/categoria'
import { UsuarioModelo } from './modelos/local/usuario'
import { config } from 'dotenv'

config()

const PUERTO = Number(process.env.SERVER_LOCAL) ?? 8000

crearApi({ animeModelo: AnimeModelo, categoriaModelo: CategoriaModelo, usuarioModelo: UsuarioModelo, PUERTO })
