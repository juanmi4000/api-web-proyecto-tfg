import { Usuario, UsuarioPost } from '../tipos/typos'
import usuarios from '../json/usuarios.json'
import { randomUUID } from 'node:crypto'
import { validate as isUuid } from 'uuid'

const validarUsuarios = usuarios as Usuario[]

export const UsuarioModelo = {
  async getAll () {
    return validarUsuarios
  },
  async getPorId ({ id }: { id: Usuario['id'] | string }) {
    if (!isUuid(id)) {
      return null
    }
    const usuario = validarUsuarios.find((usuario) => usuario.id === id)
    return usuario
  },
  async crearUsuario (input: UsuarioPost) {
    const nuevoUsuario = {
      id: randomUUID(),
      ...input
    }

    usuarios.push(nuevoUsuario)

    return nuevoUsuario
  },
  async eliminarUsuario ({ id }: { id: Usuario['id'] | string }) {
    if (!isUuid(id)) {
      return null
    }
    const indiceUsuario = validarUsuarios.findIndex((usuarios) => usuarios.id === id)
    if (indiceUsuario < 0) {
      return undefined
    }
    usuarios.splice(indiceUsuario, 1)
    return indiceUsuario
  },
  async actualizarUsuario ({ id, ...input }: { id: Usuario['id'] | string, [key: string]: any }) {
    if (!isUuid(id)) {
      return null
    }
    const indiceUsuario = validarUsuarios.findIndex((usuario) => usuario.id === id)
    if (indiceUsuario === undefined) {
      return undefined
    }

    const usuarioActualizado = {
      ...usuarios[indiceUsuario],
      ...input
    }

    usuarios[indiceUsuario] = usuarioActualizado

    return usuarioActualizado
  }
}
