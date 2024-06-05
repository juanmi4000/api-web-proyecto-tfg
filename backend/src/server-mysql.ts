import { crearApi } from './app-api'
import { AnimeModelo } from './modelos/mysql/anime'
import { GeneroModelo } from './modelos/mysql/genero'
import { UsuarioModelo } from './modelos/mysql/usuario'
import { config } from 'dotenv'

config()

const PUERTO = Number(process.env.SERVER_MYSQL) ?? 8002

crearApi({ animeModelo: AnimeModelo, generoModelo: GeneroModelo, usuarioModelo: UsuarioModelo, PUERTO })
