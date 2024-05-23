import mysql from 'mysql2/promise'

const configuracion = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'proyectotfg'
}

export async function conexionMySQL (): Promise<mysql.Connection> {
  const conexion = await mysql.createConnection(configuracion)
  return conexion
}

export function formatearFecha (fecha: Date): String {
  const conseguirMes: number = fecha.getMonth()
  const anio: string = String(fecha.getFullYear())
  const mes = String(conseguirMes + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${dia}/${mes}/${anio}`
}
