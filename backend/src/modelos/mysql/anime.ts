import { Anime, AnimePost, AnimeMysql, CategoriaMysql } from '../../tipos/tipos'
import { ParsedQs } from 'qs'
import { randomUUID } from 'crypto'
import { FieldPacket } from 'mysql2/promise'
import { validate as isUuid } from 'uuid'
import { conexionMySQL, formatearFecha } from '../../utilidades/conexiones'

export const AnimeModelo = {
  getAll: async ({ genero }: { genero: string | string[] | ParsedQs | ParsedQs[] | undefined }) => {
    const conexion = await conexionMySQL()

    if (genero != null && !Array.isArray(genero) && typeof genero === 'string') {
      const generoMinusculas = genero.toLowerCase()
      const [animesFiltrados]: [AnimeMysql[], FieldPacket[]] = await conexion.query(
        'SELECT a.id, a.descripcion, a.estudio, a.estudio, a.fecha_inicio, a.titulo_texto FROM anime AS a INNER JOIN animes_generos as ag ON a.id = ag.anime_id INNER JOIN genero as g ON ag.genero_id = g.id WHERE LOWER(g.nombre) = LOWER(?)', [generoMinusculas]
      )

      if (animesFiltrados.length === 0) return null

      const arrayAnimesEncontrados = []

      for (const { id, descripcion, estudio, fecha_inicio: fechaInicio, titulo_texto: tituloTexto, titulo_enlace: tituloEnlace } of animesFiltrados) {
        const [generos]: [CategoriaMysql[], FieldPacket[]] = await conexion.query(
          'SELECT * FROM anime as a INNER JOIN animes_generos as ag on anime_id = a.id INNER JOIN genero as g ON genero_id = g.id WHERE a.id = ?',
          [id]
        )
        arrayAnimesEncontrados.push({
          id,
          estudio,
          generos: generos.map(({ nombre }) => nombre),
          descripcion,
          titulo: {
            enlace: tituloEnlace,
            texto: tituloTexto
          },
          fechaInicio: formatearFecha(fechaInicio)
        })
      }

      if (animesFiltrados.length !== 0) {
        return arrayAnimesEncontrados
      } else {
        return null
      }
    }
    const [animes]: [AnimeMysql[], FieldPacket[]] = await conexion.query(
      'SELECT id, estudio, descripcion, fecha_inicio, titulo_enlace, titulo_texto  FROM anime'
    )
    const animesUnidos = []
    for (const { id, descripcion, estudio, fecha_inicio: fechaInicio, titulo_texto: tituloTexto, titulo_enlace: tituloEnlace } of animes) {
      const [generos]: [CategoriaMysql[], FieldPacket[]] = await conexion.query(
        'SELECT * FROM anime as a INNER JOIN animes_generos as ag on anime_id = a.id INNER JOIN genero as g ON genero_id = g.id WHERE a.id = ?',
        [id]
      )
      animesUnidos.push({
        id,
        estudio,
        generos: generos.map(({ nombre }) => nombre),
        descripcion,
        titulo: {
          enlace: tituloEnlace,
          texto: tituloTexto
        },
        fechaInicio: formatearFecha(fechaInicio)
      })
    }

    return animesUnidos
  },

  getPorId: async ({ id }: { id: Anime['id'] | string }) => {
    if (!isUuid(id)) {
      return null
    }
    const conexion = await conexionMySQL()

    const [animes]: [AnimeMysql[], FieldPacket[]] = await conexion.query(
      'SELECT id, estudio, descripcion, fecha_inicio, titulo_enlace, titulo_texto  FROM anime WHERE id = ?', [id]
    )

    if (animes[0] === undefined) return undefined
    const [generos]: [CategoriaMysql[], FieldPacket[]] = await conexion.query(
      'SELECT * FROM anime as a INNER JOIN animes_generos as ag on anime_id = a.id INNER JOIN genero as g ON genero_id = g.id WHERE a.id = ?',
      [animes[0].id]
    )

    const { id: idAnime, descripcion, estudio, fecha_inicio: fechaInicio, titulo_texto: tituloTexto, titulo_enlace: tituloEnlace } = animes[0]
    const anime = {
      id: idAnime,
      estudio,
      generos: generos.map(({ nombre }) => nombre),
      descripcion,
      titulo: {
        enlace: tituloEnlace,
        texto: tituloTexto
      },
      fechaInicio: formatearFecha(fechaInicio)
    }

    return anime
  },

  crearAnime: async (input: AnimePost) => {
    const nuevoAnime = {
      id: randomUUID(),
      ...input
    }
    /* const { descripcion, estudio, fechaInicio, titulo, generos } = input
    await conexion.query(
      'INSERT INTO anime (id, estudio, descripcion, fecha_inicio, titulo_enlace, titulo_texto) VALUES (?, ?, ?, ?, ?, ?)',
      [randomUUID(), estudio, descripcion, fechaInicio, titulo.enlace, titulo.texto]
    )  */
    return nuevoAnime
  },

  eliminarAnime: async ({ id }: { id: Anime['id'] | string }) => {
    if (!isUuid(id)) {
      return null
    }
    const conexion = await conexionMySQL()

    const [anime]: [AnimeMysql[], FieldPacket[]] = await conexion.query(
      'SELECT id, estudio, descripcion, fecha_inicio, titulo_enlace, titulo_texto  FROM anime WHERE id = ?', [id]
    )
    if (anime.length === 0) return undefined

    return 1
  },

  actualizarAnime: async ({ id, ...input }: { id: Anime['id'] | string, [key: string]: any }) => {
    if (!isUuid(id)) {
      return null
    }
    const conexion = await conexionMySQL()

    const [animes]: [AnimeMysql[], FieldPacket[]] = await conexion.query(
      'SELECT id, estudio, descripcion, fecha_inicio, titulo_enlace, titulo_texto  FROM anime WHERE id = ?', [id]
    )
    if (animes.length === 0) return undefined

    const [generos]: [CategoriaMysql[], FieldPacket[]] = await conexion.query(
      'SELECT * FROM anime as a INNER JOIN animes_generos as ag on anime_id = a.id INNER JOIN genero as g ON genero_id = g.id WHERE a.id = ?',
      [animes[0].id]
    )

    const { id: idAnime, descripcion, estudio, fecha_inicio: fechaInicio, titulo_texto: tituloTexto, titulo_enlace: tituloEnlace } = animes[0]
    const anime = {
      id: idAnime,
      estudio,
      generos: generos.map(({ nombre }) => nombre),
      descripcion,
      titulo: {
        enlace: tituloEnlace,
        texto: tituloTexto
      },
      fechaInicio: formatearFecha(fechaInicio)
    }

    const animeActualizado = {
      ...anime,
      ...input
    }
    return animeActualizado
  }
}
