import zod, { ZodError } from 'zod'
import { AnimePost } from '../tipos/tipos'

const esquemaAnime = zod.object({
  estudio: zod.string({
    invalid_type_error: 'El estudio debe ser un string',
    required_error: 'El estudio es requerido'
  }),
  descripcion: zod.string({
    invalid_type_error: 'La descripción debe ser un string',
    required_error: 'La descripción es requerida'
  }),
  fechaInicio: zod.string({
    invalid_type_error: 'La fecha de inicio debe ser un string',
    required_error: 'La fecha de inicio es requerida'
  }),
  titulo: zod.object(
    {
      enlace: zod
        .string({
          invalid_type_error: 'El enlace debe ser un string',
          required_error: 'El enlace es requerido'
        })
        .url({
          message: 'El enlace debe ser una URL válida'
        }),
      texto: zod.string({
        invalid_type_error: 'El texto debe ser un string',
        required_error: 'El texto es requerido'
      })
    },
    {
      invalid_type_error: 'El título debe ser un objeto',
      required_error: 'El título es requerido'
    }
  ),
  generos: zod.array(
    zod.enum(
      ['Misterio', 'Seinen', 'Sobrenatural', 'Comedia', 'Erótico', 'Fantasía', 'Harem', 'Romance', 'Escuela', 'Ciencia Ficción', 'Acción', 'Shounen', 'Superpoderes', 'Drama', 'Militar', 'Policiaca', 'Aventura', 'Mágico', 'Cotidiano', 'Demónios', 'Mecha', 'Terror', 'Espacio', 'Inteligencia Artificial', 'Shoujo', 'Thriller', 'Histórica', 'Samurái', 'Deportes', 'Música', 'Parodia', 'Juegos', 'Niños'],
      {
        invalid_type_error: 'Alguna de las generos no existe'
      }
    )
  ).default([])
})

export function validarAnime (anime: AnimePost): AnimePost | ZodError {
  const resultado = esquemaAnime.safeParse(anime)

  if (resultado.success) {
    return resultado.data
  } else {
    return resultado.error
  }
}

export function validarAnimeParcial (anime: Partial<AnimePost>): Partial<AnimePost> | ZodError {
  const resultado = esquemaAnime.partial().safeParse(anime)

  if (resultado.success) {
    return resultado.data
  } else {
    return resultado.error
  }
}
