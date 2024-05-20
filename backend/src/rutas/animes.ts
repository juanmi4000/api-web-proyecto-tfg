import { Router } from 'express'
import { AnimesControlador } from '../controladores/animes'

export const routerAnimes = Router()

routerAnimes.get('/', AnimesControlador.getAll)

routerAnimes.get('/:id', AnimesControlador.getPorId)

routerAnimes.post('/', AnimesControlador.crearAnime)

routerAnimes.patch('/:id', AnimesControlador.actualizarAnime)

routerAnimes.delete('/:id', AnimesControlador.eliminarAnime)
