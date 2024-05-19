import { Router } from 'express'
import { AnimesController } from '../controladores/animes'

export const routerAnimes = Router()

routerAnimes.get('/', AnimesController.getAll)

routerAnimes.get('/:id', AnimesController.getPorId)

routerAnimes.post('/', AnimesController.crearAnime)

routerAnimes.patch('/:id', AnimesController.actualizarAnime)

routerAnimes.delete('/:id', AnimesController.eliminarAnime)
