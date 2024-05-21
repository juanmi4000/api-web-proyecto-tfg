import { Router } from 'express'
import { AnimesControlador } from '../controladores/animes'
import { AnimeModeloInter } from '../tipos/typos'

export function crearAnimesRouter ({ animeModelo }: { animeModelo: AnimeModeloInter }): Router {
  const routerAnimes = Router()

  const animesRouter = new AnimesControlador({ animeModelo })

  routerAnimes.get('/', animesRouter.getAll)

  routerAnimes.get('/:id', animesRouter.getPorId)

  routerAnimes.post('/', animesRouter.crearAnime)

  routerAnimes.patch('/:id', animesRouter.actualizarAnime)

  routerAnimes.delete('/:id', animesRouter.eliminarAnime)

  return routerAnimes
}
