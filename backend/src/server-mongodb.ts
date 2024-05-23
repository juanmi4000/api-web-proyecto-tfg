import { crearApi } from './app-api'
import { AnimeModelo } from './modelos/mongodb/anime'
import { CategoriaModelo } from './modelos/mongodb/categoria'
import { UsuarioModelo } from './modelos/mongodb/usuario'
import { config } from 'dotenv'

config()

const PUERTO = Number(process.env.SERVER_MONGODB) ?? 8004

crearApi({ animeModelo: AnimeModelo, categoriaModelo: CategoriaModelo, usuarioModelo: UsuarioModelo, PUERTO })
