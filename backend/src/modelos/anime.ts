import { Anime, AnimePost } from '../tipos/anime'
import { ParsedQs } from 'qs'
import animes from '../json/animes.json'
import { randomUUID } from 'node:crypto'

const validarAnimes = animes as Anime[]

export const AnimeModelo = {
  async getAll ({ genero }: { genero: string | string[] | ParsedQs | ParsedQs[] | undefined }) {
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
  getPorId: async ({ id }: { id: string }) => {
    const anime = validarAnimes.find((anime) => anime.id === id)
    return anime
  },
  async crearAnime (input: AnimePost) {
    const nuevaPelicula = {
      id: randomUUID(),
      ...input
    }

    animes.push(nuevaPelicula)

    return nuevaPelicula
  },
  async eliminarAnime ({ id }: { id: string }) {
    const indiceAnime = validarAnimes.findIndex((anime) => anime.id === id)
    if (indiceAnime < 0) {
      return null
    }
    animes.splice(indiceAnime, 1)
    return indiceAnime
  },
  async actualizarAnime ({ id, ...input }: { id: string, [key: string]: any }) {
    const indiceAnime = validarAnimes.findIndex((anime) => anime.id === id)
    if (indiceAnime === -1) {
      return null
    }
    const actualizarAnime = {
      ...animes[indiceAnime],
      ...input
    }

    animes[indiceAnime] = actualizarAnime
    return actualizarAnime
  }
}
