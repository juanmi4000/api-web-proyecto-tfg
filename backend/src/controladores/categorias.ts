import { Request, Response } from 'express'
import { asyncHandler } from '../middlewares/manejadorAsync'
import { CategoriasModeloInter } from '../tipos/tipos'

export class CategoriasControlador {
  private readonly categoriaModelo: CategoriasModeloInter
  constructor({ categoriaModelo }: { categoriaModelo: CategoriasModeloInter }) {
    this.categoriaModelo = categoriaModelo
  }

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    try {
      return res.json(await this.categoriaModelo.getAll())
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })
}
