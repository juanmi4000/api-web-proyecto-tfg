import { FieldPacket } from 'mysql2/promise'
import { Usuario, UsuarioMysql, UsuarioPost } from '../../tipos/tipos'
import { validate as isUuid } from 'uuid'
import { randomUUID } from 'node:crypto'
import { conexionMySQL } from '../../utilidades/conexiones'

export const UsuarioModelo = {
  getAll: async () => {
    const conexion = await conexionMySQL()
    const [usuarios]: [UsuarioMysql[], FieldPacket[]] = await conexion.query(
      'SELECT id, apellido, calle_nombre, calle_numero, contrasena,email, genero, img_grande, img_mediana, img_miniatura, nombre_pila, telefono, usuario FROM usuario'
    )

    return usuarios.map(({ id, apellido, calle_nombre: calleNombre, calle_numero: calleNumero, contrasena, email, genero, img_grande: imgGrande, img_mediana: imgMediana, img_miniatura: imgMiniatura, nombre_pila: nombrePila, telefono, usuario }) => {
      return {
        id,
        nombre: {
          nombrePila,
          apellido
        },
        usuario,
        email,
        contrasena,
        telefono,
        genero,
        calle: {
          nombre: calleNombre,
          numero: calleNumero
        },
        imagen: {
          grande: imgGrande,
          mediana: imgMediana,
          miniatura: imgMiniatura
        }

      }
    })
  },

  getPorId: async ({ id }: { id: Usuario['id'] | string }) => {
    if (!isUuid(id)) {
      return null
    }
    const conexion = await conexionMySQL()
    const [usuarios]: [UsuarioMysql[], FieldPacket[]] = await conexion.query(
      'SELECT id, apellido, calle_nombre, calle_numero, contrasena,email, genero, img_grande, img_mediana, img_miniatura, nombre_pila, telefono, usuario FROM usuario WHERE id = ?',
      [id]
    )

    const usuarioEncontrado = usuarios.map(({ id, apellido, calle_nombre: calleNombre, calle_numero: calleNumero, contrasena, email, genero, img_grande: imgGrande, img_mediana: imgMediana, img_miniatura: imgMiniatura, nombre_pila: nombrePila, telefono, usuario }) => {
      return {
        id,
        nombre: {
          nombrePila,
          apellido
        },
        usuario,
        email,
        contrasena,
        telefono,
        genero,
        calle: {
          nombre: calleNombre,
          numero: calleNumero
        },
        imagen: {
          grande: imgGrande,
          mediana: imgMediana,
          miniatura: imgMiniatura
        }

      }
    })[0]
    return usuarioEncontrado
  },

  crearUsuario: async (input: UsuarioPost) => {
    const nuevoUsuario = {
      id: randomUUID(),
      ...input
    }

    return nuevoUsuario
  },

  eliminarUsuario: async ({ id }: { id: Usuario['id'] | string }) => {
    if (!isUuid(id)) {
      return null
    }
    const conexion = await conexionMySQL()
    const [usuarios]: [UsuarioMysql[], FieldPacket[]] = await conexion.query(
      'SELECT id, apellido, calle_nombre, calle_numero, contrasena,email, genero, img_grande, img_mediana, img_miniatura, nombre_pila, telefono, usuario FROM usuario WHERE id = ?',
      [id]
    )
    if (usuarios.length === 0) return undefined
    return 1
  },

  actualizarUsuario: async ({ id, ...input }: { id: Usuario['id'] | string, [key: string]: any }) => {
    if (!isUuid(id)) {
      return null
    }
    const conexion = await conexionMySQL()
    const [usuarios]: [UsuarioMysql[], FieldPacket[]] = await conexion.query(
      'SELECT id, apellido, calle_nombre, calle_numero, contrasena,email, genero, img_grande, img_mediana, img_miniatura, nombre_pila, telefono, usuario FROM usuario WHERE id = ?',
      [id]
    )

    if (usuarios.length === 0) return undefined

    const usuarioActualizado: unknown = usuarios.map(({ id, apellido, calle_nombre: calleNombre, calle_numero: calleNumero, contrasena, email, genero, img_grande: imgGrande, img_mediana: imgMediana, img_miniatura: imgMiniatura, nombre_pila: nombrePila, telefono, usuario }) => {
      return {
        id,
        nombre: {
          nombrePila,
          apellido
        },
        usuario,
        email,
        contrasena,
        telefono,
        genero,
        calle: {
          nombre: calleNombre,
          numero: calleNumero
        },
        imagen: {
          grande: imgGrande,
          mediana: imgMediana,
          miniatura: imgMiniatura
        }

      }
    })[0]
    return {
      ...usuarioActualizado as Usuario,
      ...input
    }
  }
}
