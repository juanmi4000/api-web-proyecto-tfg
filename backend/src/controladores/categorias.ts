import { Request, Response } from 'express'
import { asyncHandler } from '../middlewares/manejadorAsync'
import { CategoriaModelo } from '../modelos/categoria'

export const CategoriasControlador = {
  getAll: asyncHandler(async (_req: Request, res: Response) => {
    try {
      return res.json(await CategoriaModelo.getAll())
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })
}
