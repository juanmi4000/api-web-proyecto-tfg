import { Router } from 'express'
import animes from '../json/animes.json'
import { randomUUID } from 'node:crypto'
import { ZodError } from 'zod'
import { Anime } from '../tipos/anime'
import { validarAnime, validarAnimeParcial } from '../esquemas/animes'

export const routerAnimes = Router()

routerAnimes.get('/', (req, res) => {
  const { categoria } = req.query
  if (categoria != null && !Array.isArray(categoria) && typeof categoria === 'string') {
    const animeFilrado = animes.filter((anime) => anime.generos.some((genero) => genero.toLowerCase() === categoria.toLowerCase()))
    if (animeFilrado.length !== 0) {
      return res.json(animeFilrado)
    } else {
      return res.status(404).json({ message: 'No se ha podido filtrar. Comprueba la categoría.' })
    }
  }
  return res.json(animes)
})

routerAnimes.get('/:id', (req, res) => {
  const { id } = req.params
  const anime = animes.find((anime) => anime.id === id)
  if (anime == null) {
    return res.status(404).json({ messaje: 'Anime no encontrado' })
  }
  return res.json(anime)
})

routerAnimes.post('/', (req, res) => {
  const resultado = validarAnime(req.body)

  if (resultado instanceof ZodError) {
    return res.status(400).json({ error: JSON.parse(resultado.message) })
  }

  const animeNuevo: Anime = {
    id: randomUUID(),
    ...resultado
  }
  // esto no es REST porque estoy guardando el estado de la API en memoria
  animes.push(animeNuevo)

  return res.json(animeNuevo)
})

routerAnimes.patch('/:id', (req, res) => {
  const resultado = validarAnimeParcial(req.body)

  if (resultado instanceof ZodError) {
    return res.status(400).json({ error: JSON.parse(resultado.message) })
  }

  const { id } = req.params
  const indiceAnime = animes.findIndex((anime) => anime.id === id)

  if (indiceAnime < 0) {
    return res.status(404).json({ message: 'Anime no encontrado' })
  }

  const actualizarAnime = {
    ...animes[indiceAnime],
    ...resultado
  }

  animes[indiceAnime] = actualizarAnime

  return res.status(200).json(actualizarAnime)
})

routerAnimes.delete('/:id', (req, res) => {
  const { id } = req.params
  const indiceAnime = animes.findIndex((anime) => anime.id === id)

  if (indiceAnime < 0) {
    return res.status(404).json({ error: 'Animes no encontrado' })
  }

  animes.splice(indiceAnime, 1)

  return res.json({ message: 'Anime eliminado' })
})
