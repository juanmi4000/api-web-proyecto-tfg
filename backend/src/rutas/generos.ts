import { Router } from 'express'
import { GenerosControlador } from '../controladores/generos'
import { GenerosModeloInter } from '../tipos/tipos'

export function crearGenerosRouter ({ generoModelo }: { generoModelo: GenerosModeloInter }): Router {
  const routerGeneros = Router()

  const generosRouter = new GenerosControlador({ generoModelo })

  routerGeneros.get('/', generosRouter.getAll)

  return routerGeneros
}
