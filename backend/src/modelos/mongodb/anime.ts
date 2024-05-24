import { Collection, MongoClient, ServerApiVersion } from 'mongodb'
import { ParsedQs } from 'qs'
import { Anime, AnimePost } from '../../tipos/tipos'
import { validate as isUuid } from 'uuid'
import { randomUUID } from 'node:crypto'

const URI = 'mongodb://localhost:27017'

const conexion = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function conectar (): Promise<Collection<Document> | undefined> {
  try {
    await conexion.connect()
    const baseDatos = conexion.db('proyectotfg')
    return baseDatos.collection('animes')
  } catch (error) {
    console.error('Error conectando a la base de datos')
    console.error(error)
    await conexion.close()
    return undefined
  }
}

export const AnimeModelo = {
  getAll: async ({ genero }: { genero: string | string[] | ParsedQs | ParsedQs[] | undefined }) => {
    const bd = await conectar()
    if (bd === undefined) return null
    if (genero !== undefined && !Array.isArray(genero) && typeof genero === 'string') {
      const animes: unknown = await bd.find({
        generos: {
          $elemMatch: {
            $regex: `^${genero}$`,
            $options: 'i'
          }
        }
      }, { projection: { _id: 0 } }).toArray()

      return animes !== undefined ? animes as Anime[] : null
    }

    const animes: unknown = await bd.find({}, { projection: { _id: 0 } }).toArray()

    return animes !== undefined ? animes as Anime[] : null
  },
  getPorId: async ({ id: idPasado }: { id: Anime['id'] | string }) => {
    if (!isUuid(idPasado)) {
      return null
    }
    const bd = await conectar()
    if (bd === undefined) return null
    const animes: unknown = await bd.find({
      id: idPasado
    }, { projection: { _id: 0 } }).toArray()

    return (animes as Anime[]).length !== 0 ? (animes as Anime[])[0] : undefined
  },

  crearAnime: async (input: AnimePost) => {
    // const bd = await conectar()
    // const { idInsertado } = await bd?.insertOne(input)
    return {
      id: randomUUID(),
      ...input
    }
  },
  eliminarAnime: async ({ id: idPasado }: { id: Anime['id'] | string }) => {
    if (!isUuid(idPasado)) {
      return null
    }
    const bd = await conectar()
    if (bd === undefined) return null
    // const objeto = new ObjectId(id)
    // const { deletedCount } = await bd?.deleteOne({ _id: objeto })
    const anime = await bd.find({
      id: idPasado
    }, { projection: { _id: 0 } }).toArray()
    return anime !== undefined ? 1 : undefined // cambiar uno
  },
  actualizarAnime: async ({ id: idPasado, ...input }: { id: Anime['id'] | string, [key: string]: any }) => {
    if (!isUuid(idPasado)) {
      return null
    }
    const bd = await conectar()
    if (bd === undefined) return null
    // const objeto = new ObjectId(id)
    // const { ok, value } = await bd?.findOneAndUpdate({ _id: objeto }, { $set: input }, { returnNewDocument: true })
    // if (ok === undefined) return null

    const anime: unknown = await bd.find({
      id: idPasado
    }, { projection: { _id: 0 } }).toArray()

    if ((anime as Anime[]).length === 0) return undefined

    const animeActualizado = anime as Anime[]

    return {
      ...animeActualizado[0],
      ...input
    }
  }
}
