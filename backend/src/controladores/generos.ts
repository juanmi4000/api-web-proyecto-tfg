import { Request, Response } from 'express'
import { asyncHandler } from '../middlewares/manejadorAsync'
import { GenerosModeloInter } from '../tipos/tipos'

export class GenerosControlador {
  private readonly generoModelo: GenerosModeloInter
  constructor ({ generoModelo }: { generoModelo: GenerosModeloInter }) {
    this.generoModelo = generoModelo
  }

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    try {
      return res.json(await this.generoModelo.getAll())
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })
}
