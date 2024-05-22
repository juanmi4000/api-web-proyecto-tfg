import { Anime, AnimePost } from '../../tipos/typos'
import { ParsedQs } from 'qs'
import mysql from 'mysql2/promise'
// import { randomUUID } from 'node:crypto'
// import { validate as isUuid } from 'uuid'

const configuracion = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3006,
  databases: 'proyectotfg'
}

const conexion = await mysql.createConnection(configuracion)

export const AnimeModelo = {
  async getAll ({ genero }: { genero: string | string[] | ParsedQs | ParsedQs[] | undefined }) {
    const [animes] = await conexion.query(
      'SELECT BIN_TO_UUID(id), estudio, descripcion, fecha_inicio, titulo_enlace, titulo_texto  FROM anime;'
    )

    return animes
  },
  getPorId: async ({ id }: { id: Anime['id'] | string }) => {
    const [animes] = await conexion.query(
      'SELECT BIN_TO_UUID(id), estudio, descripcion, fecha_inicio, titulo_enlace, titulo_texto  FROM anime WHERE id = UUID_TO_BIN(?)', [id]
    )

    return animes
  },
  async crearAnime (input: AnimePost) {
    await conexion.query(
      'INSERT INTO anime (id, estudio, descripcion, fecha_inicio, titulo_enlace, titulo_texto) VALUES '
    )
  },
  async eliminarAnime ({ id }: { id: Anime['id'] | string }) {

  },
  async actualizarAnime ({ id, ...input }: { id: Anime['id'] | string, [key: string]: any }) {

  }
}
