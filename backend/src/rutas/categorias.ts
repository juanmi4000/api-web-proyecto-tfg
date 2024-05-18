import { Router } from 'express'
import categorias from '../json/categorias.json'

export const routerCategorias = Router()

routerCategorias.get('/', (_req, res) => {
  return res.json(categorias)
})
