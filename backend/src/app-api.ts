import express from 'express'
import { crearAnimesRouter } from './rutas/animes'
import { corsMiddleware } from './middlewares/cors'
import { crearGenerosRouter } from './rutas/generos'
import { crearUsuariosRouter } from './rutas/usuarios'
import { AnimeModeloInter, GenerosModeloInter, UsuarioModeloInter } from './tipos/tipos'

export function crearApi ({ animeModelo, generoModelo, usuarioModelo, PUERTO }: { animeModelo: AnimeModeloInter, generoModelo: GenerosModeloInter, usuarioModelo: UsuarioModeloInter, PUERTO: number }): void {
  const app = express()

  app.disable('x-powered-by')

  app.use(express.json())
  app.use(corsMiddleware())

  app.get('/', (_req, res) => {
    res.json({ message: 'Hello World!' })
  })

  app.use('/animes', crearAnimesRouter({ animeModelo }))

  app.use('/generos', crearGenerosRouter({ generoModelo }))

  app.use('/usuarios', crearUsuariosRouter({ usuarioModelo }))

  app.listen(PUERTO, () => {
    console.log(`El servidor de la API está corriendo en el puerto http://localhost:${PUERTO}`)
  })
}
