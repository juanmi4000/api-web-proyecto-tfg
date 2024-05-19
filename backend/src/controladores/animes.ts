import { AnimeModelo } from '../modelos/anime'
import { Request, Response } from 'express'
import { asyncHandler } from '../middlewares/manejadorAsync'
import { validarAnime, validarAnimeParcial } from '../esquemas/animes'
import { ZodError } from 'zod'

export const AnimesController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    try {
      const { categoria } = req.query
      const animes = await AnimeModelo.getAll({ genero: categoria as string })
      if (animes == null || animes.length === 0) {
        return res.status(404).json({ message: 'No se ha podido filtrar. Comprueba la categoría.' })
      }
      return res.json(animes)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  }),
  getPorId: asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const anime = await AnimeModelo.getPorId({ id })
      if (anime == null) {
        return res.status(404).json({ message: 'Anime no encontrado' })
      }
      return res.json(anime)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  }),
  crearAnime: asyncHandler(async (req: Request, res: Response) => {
    try {
      const resultado = validarAnime(req.body)

      if (resultado instanceof ZodError) {
        return res.status(400).json({ error: JSON.parse(resultado.message) })
      }
      const animeNuevo = await AnimeModelo.crearAnime(resultado)
      return res.status(201).json(animeNuevo)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  }),
  eliminarAnime: asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const animeEncontrado = await AnimeModelo.eliminarAnime({ id })

      if (animeEncontrado == null) {
        return res.status(404).json({ error: 'Animes no encontrado' })
      }

      return res.json({ message: 'Anime eliminado' })
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  }),
  actualizarAnime: asyncHandler(async (req: Request, res: Response) => {
    try {
      const resultado = validarAnimeParcial(req.body)

      if (resultado instanceof ZodError) {
        return res.status(400).json({ error: JSON.parse(resultado.message) })
      }

      const { id } = req.params

      const animeActualizado = await AnimeModelo.actualizarAnime({ id, ...resultado })
      if (animeActualizado == null) {
        return res.status(404).json({ message: 'Anime no encontrado' })
      }
      return res.json(animeActualizado)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })
}
