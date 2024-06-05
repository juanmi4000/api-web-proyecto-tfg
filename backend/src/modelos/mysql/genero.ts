import { FieldPacket } from 'mysql2/promise'
import { GeneroMysql } from '../../tipos/tipos'
import { conexionMySQL } from '../../utilidades/conexiones'

export const GeneroModelo = {
  getAll: async () => {
    const conexion = await conexionMySQL()

    const [generos]: [GeneroMysql[], FieldPacket[]] = await conexion.query(
      'SELECT id, nombre FROM genero;'
    )

    return generos
  }
}
