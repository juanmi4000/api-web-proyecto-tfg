import { Anime, AnimePost } from '../../tipos/typos'
import { ParsedQs } from 'qs'
import animes from '../../json/animes.json'
import { randomUUID } from 'node:crypto'
import { validate as isUuid } from 'uuid'

const validarAnimes = animes as Anime[]

export const AnimeModelo = {
  getAll: async ({ genero }: { genero: string | string[] | ParsedQs | ParsedQs[] | undefined }) => {
    if (genero != null && !Array.isArray(genero) && typeof genero === 'string') {
      const animeFilrado: Anime[] = validarAnimes.filter((anime) => anime.generos.some((categoria) => genero.toLowerCase() === categoria.toLowerCase()))
      if (animeFilrado.length !== 0) {
        return animeFilrado
      } else {
        return null
      }
    }
    return validarAnimes
  },
  getPorId: async ({ id }: { id: Anime['id'] | string }) => {
    if (!isUuid(id)) {
      return null
    }
    const anime = validarAnimes.find((anime) => anime.id === id)
    return anime
  },
  crearAnime: async (input: AnimePost) => {
    const nuevoAnime = {
      id: randomUUID(),
      ...input
    }

    animes.push(nuevoAnime)

    return nuevoAnime
  },
  eliminarAnime: async ({ id }: { id: Anime['id'] | string }) => {
    if (!isUuid(id)) {
      return null
    }
    const indiceAnime = validarAnimes.findIndex((anime) => anime.id === id)
    if (indiceAnime < 0) {
      return undefined
    }
    animes.splice(indiceAnime, 1)
    return indiceAnime
  },
  actualizarAnime: async ({ id, ...input }: { id: Anime['id'] | string, [key: string]: any }) => {
    if (!isUuid(id)) {
      return null
    }
    const indiceAnime = validarAnimes.findIndex((anime) => anime.id === id)
    if (indiceAnime === -1) {
      return undefined
    }
    const actualizarAnime = {
      ...validarAnimes[indiceAnime],
      ...input
    }

    animes[indiceAnime] = actualizarAnime
    return actualizarAnime
  }
}
