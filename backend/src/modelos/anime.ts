import { Anime } from '../tipos/tiposAnime'
import animes from '../json/animes.json'

export class AnimeModelo {
  static getAll({ genero }: { genero: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined }): Anime[] {
    if (genero != null && !Array.isArray(genero) && typeof genero === 'string') {
      const animeFilrado = animes.filter((anime) => anime.generos.some((categoria) => genero.toLowerCase() === categoria.toLowerCase()))
      if (animeFilrado.length !== 0) {
        return animeFilrado
      }
    }
  }
}
