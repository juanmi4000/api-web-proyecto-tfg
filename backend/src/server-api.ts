import express from 'express'
import categorias from './json/categorias.json'
import { routerAnimes } from './rutas/animes'
import { corsMiddleware } from './middlewares/cors'

// leer un JSON lo recomendado
/* import { createRequire } from 'node:module'
const leerArchivo = createRequire(import.meta.url) // tiene la dirección del archivo actual
const animes = leerArchivo('./animes.json') */

const PORT = process.env.PORT ?? 3000

const app = express()

app.disable('x-powered-by')

app.use(express.json()) // Middleware para utilizar req.body ya que se van subiendo poco a poco
app.use(corsMiddleware())

app.get('/', (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // --> permitir acceso desde cualquier parte (cualquier navegador)
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000') // --> un ejemplo de uso
  res.json({ message: 'Hello World!' })
})

// Todos los recursos que sean animes se identifican con /animes y carga todas las rutas que tenga el routerAnimes
app.use('/animes', routerAnimes)

app.get('/categorias', (_req, res) => {
  return res.json(categorias)
})
/*
app.options('/movies:id', (req, res) => {
  const origen = req.header('origin')
  if ((origen !== undefined && typeof origen === 'string')) { // cambiarlo
    if (ORIGINES_ACEPTADOS.includes(origen)) {
      res.setHeader('Access-Control-Allow-Origin', origen)
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE') // --> le damos permisos para las operaciones que aceptamos
    }
  }

  return res.send(200)
}) */

app.listen(PORT, () => {
  console.log(`El servidor de la API está corriendo en el puerto http://localhost:${PORT}`)
})
