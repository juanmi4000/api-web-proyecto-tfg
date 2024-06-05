import { crearApi } from './app-api'
import { AnimeModelo } from './modelos/mongodb/anime'
import { GeneroModelo } from './modelos/mongodb/genero'
import { UsuarioModelo } from './modelos/mongodb/usuario'
import { config } from 'dotenv'

config()

const PUERTO = Number(process.env.SERVER_MONGODB) ?? 8004

crearApi({ animeModelo: AnimeModelo, generoModelo: GeneroModelo, usuarioModelo: UsuarioModelo, PUERTO })
