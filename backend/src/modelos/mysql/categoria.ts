import { FieldPacket } from 'mysql2/promise'
import { CategoriaMysql } from '../../tipos/tipos'
import { conexionMySQL } from '../../utilidades/conexiones'

export const CategoriaModelo = {
  getAll: async () => {
    const conexion = await conexionMySQL()

    const [generos]: [CategoriaMysql[], FieldPacket[]] = await conexion.query(
      'SELECT id, nombre FROM genero;'
    )

    return generos
  }
}
