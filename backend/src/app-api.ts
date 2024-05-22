import express from 'express'
import { crearAnimesRouter } from './rutas/animes'
import { corsMiddleware } from './middlewares/cors'
import { crearCategoriasRouter } from './rutas/categorias'
import { crearUsuariosRouter } from './rutas/usuarios'
import { AnimeModeloInter, CategoriasModeloInter, UsuarioModeloInter } from './tipos/tipos'

export function crearApi ({ animeModelo, categoriaModelo, usuarioModelo, PUERTO }: { animeModelo: AnimeModeloInter, categoriaModelo: CategoriasModeloInter, usuarioModelo: UsuarioModeloInter, PUERTO: number }): void {
  const app = express()

  app.disable('x-powered-by')

  app.use(express.json())
  app.use(corsMiddleware())

  app.get('/', (_req, res) => {
    res.json({ message: 'Hello World!' })
  })

  app.use('/animes', crearAnimesRouter({ animeModelo }))

  app.use('/categorias', crearCategoriasRouter({ categoriaModelo }))

  app.use('/usuarios', crearUsuariosRouter({ usuarioModelo }))

  app.listen(PUERTO, () => {
    console.log(`El servidor de la API está corriendo en el puerto http://localhost:${PUERTO}`)
  })
}
