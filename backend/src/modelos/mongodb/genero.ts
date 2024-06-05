import { Collection, MongoClient, ServerApiVersion } from 'mongodb'
import { Genero } from '../../tipos/tipos'

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
    return baseDatos.collection('generos')
  } catch (error) {
    console.error('Error conectando la base de datos')
    console.error(error)
    await conexion.close()
    return undefined
  }
}

export const GeneroModelo = {
  getAll: async () => {
    const bd = await conectar()
    if (bd === undefined) return undefined
    const generos: unknown = await bd.find({}, { projection: { _id: 0 } }).toArray()
    return generos as Genero[]
  }
}
