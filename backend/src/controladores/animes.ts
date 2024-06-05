import { Request, Response } from 'express'
import { asyncHandler } from '../middlewares/manejadorAsync'
import { validarAnime, validarAnimeParcial } from '../esquemas/animes'
import { ZodError } from 'zod'
import { AnimeModeloInter } from '../tipos/tipos'

export class AnimesControlador {
  private readonly animeModelo: AnimeModeloInter
  constructor ({ animeModelo }: { animeModelo: AnimeModeloInter }) {
    this.animeModelo = animeModelo
  }

  getAll = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { genero } = req.query
      const animes = await this.animeModelo.getAll({ genero: genero as string })
      if (animes == null || animes.length === 0) {
        return res.status(404).json({ message: 'No se ha podido filtrar. Compruebe el género.' })
      }
      return res.json(animes)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })

  getPorId = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const anime = await this.animeModelo.getPorId({ id })
      if (anime === null) {
        return res.status(400).json({ message: 'La id no sigue el patrón correcto' })
      }
      if (anime === undefined) {
        return res.status(404).json({ message: 'Anime no encontrado' })
      }
      return res.json(anime)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })

  crearAnime = asyncHandler(async (req: Request, res: Response) => {
    try {
      const resultado = validarAnime(req.body)

      if (resultado instanceof ZodError) {
        return res.status(400).json({ error: JSON.parse(resultado.message) })
      }
      const animeNuevo = await this.animeModelo.crearAnime(resultado)
      return res.status(201).json(animeNuevo)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })

  eliminarAnime = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const animeEncontrado = await this.animeModelo.eliminarAnime({ id })
      if (animeEncontrado == null) {
        return res.status(400).json({ message: 'La id no sigue el patrón correcto' })
      }
      if (animeEncontrado == null) {
        return res.status(404).json({ error: 'Animes no encontrado' })
      }

      return res.json({ message: 'Anime eliminado' })
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })

  actualizarAnime = asyncHandler(async (req: Request, res: Response) => {
    try {
      const resultado = validarAnimeParcial(req.body)

      if (resultado instanceof ZodError) {
        return res.status(400).json({ error: JSON.parse(resultado.message) })
      }

      const { id } = req.params

      const animeActualizado = await this.animeModelo.actualizarAnime({ id, ...resultado })
      if (animeActualizado == null) {
        return res.status(400).json({ message: 'La id no sigue el patrón correcto' })
      }
      if (animeActualizado === undefined) {
        return res.status(404).json({ message: 'Anime no encontrado' })
      }
      return res.json(animeActualizado)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })
}
