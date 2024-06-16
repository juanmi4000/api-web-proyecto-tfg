import { crearApi } from './app-api'
import { AnimeModelo } from './modelos/local/anime'
import { GeneroModelo } from './modelos/local/genero'
import { UsuarioModelo } from './modelos/local/usuario'
import { config } from 'dotenv'

config()

const PUERTO = process.env.PORT ?? 4000

crearApi({ animeModelo: AnimeModelo, generoModelo: GeneroModelo, usuarioModelo: UsuarioModelo, PUERTO })
