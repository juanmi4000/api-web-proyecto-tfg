import { Router } from 'express'
import { CategoriasControlador } from '../controladores/categorias'

export const routerCategorias = Router()

routerCategorias.get('/', CategoriasControlador.getAll)
