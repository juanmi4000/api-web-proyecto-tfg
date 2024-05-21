import { Router } from 'express'
import { CategoriasControlador } from '../controladores/categorias'
import { CategoriasModeloInter } from '../tipos/typos'

export function crearCategoriasRouter ({ categoriaModelo }: { categoriaModelo: CategoriasModeloInter }): Router {
  const routerCategorias = Router()

  const categoriasRouter = new CategoriasControlador({ categoriaModelo })

  routerCategorias.get('/', categoriasRouter.getAll)

  return routerCategorias
}
