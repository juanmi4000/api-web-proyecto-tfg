import express from 'express'
import { routerAnimes } from './rutas/animes'
import { corsMiddleware } from './middlewares/cors'
import { routerCategorias } from './rutas/categorias'
import { routerUsuarios } from './rutas/usuarios'

const PORT = process.env.PORT ?? 3000

const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(corsMiddleware())

app.get('/', (_req, res) => {
  res.json({ message: 'Hello World!' })
})

app.use('/animes', routerAnimes)

app.use('/categorias', routerCategorias)

app.use('/usuarios', routerUsuarios)

app.listen(PORT, () => {
  console.log(`El servidor de la API está corriendo en el puerto http://localhost:${PORT}`)
})
