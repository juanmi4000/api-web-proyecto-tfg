import { Collection, MongoClient, ServerApiVersion } from 'mongodb'
import { Usuario, UsuarioPost } from '../../tipos/tipos'
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
    return baseDatos.collection('usuarios')
  } catch (error) {
    console.error('Error conectando a la base de datos')
    console.error(error)
    await conexion.close()
    return undefined
  }
}

export const UsuarioModelo = {
  getAll: async () => {
    const bd = await conectar()
    if (bd === undefined) return null
    const usuarios: unknown = await bd.find({}, { projection: { _id: 0 } }).toArray()
    return usuarios as Usuario[]
  },
  getPorId: async ({ id: idPasado }: { id: Usuario['id'] | string }) => {
    if (!isUuid(idPasado)) {
      return null
    }

    const bd = await conectar()
    if (bd === undefined) return null

    const usuario: unknown = await bd.find({
      id: idPasado
    }, { projection: { _id: 0 } }).toArray()
    console.log(usuario)
    return (usuario as Usuario[]).length !== 0 ? (usuario as Usuario[])[0] : undefined
  },
  crearUsuario: async (input: UsuarioPost) => {
    return {
      id: randomUUID(),
      ...input
    }
  },
  eliminarUsuario: async ({ id: idPasado }: { id: Usuario['id'] | string }) => {
    if (!isUuid(idPasado)) {
      return null
    }

    const bd = await conectar()
    if (bd === undefined) return null

    const usuario = await bd.find({
      id: idPasado
    }, { projection: { _id: 0 } }).toArray()

    return usuario !== undefined ? 1 : undefined
  },
  actualizarUsuario: async ({ id: idPasado, ...input }: { id: Usuario['id'] | string, [key: string]: any }) => {
    if (!isUuid(idPasado)) {
      return null
    }
    const bd = await conectar()
    if (bd === undefined) return null

    const usuario: unknown = await bd.find({ id: idPasado }, { projection: { _id: 0 } }).toArray()

    if (usuario === undefined) return undefined

    const usuarioActualizado = usuario as Usuario[]

    return {
      ...usuarioActualizado[0],
      ...input

    }
  }
}
