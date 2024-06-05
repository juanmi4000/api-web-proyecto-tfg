import mysql from 'mysql2/promise'
import { createRequire } from 'node:module'
import { exit } from 'node:process'
// import { exit } from 'node:process'
// import { Anime, Genero, Usuario } from '../../src/tipos/typos'

const leerArchivo = createRequire(import.meta.url)
const animes = leerArchivo('../../src/json/animes.json')
const generos = leerArchivo('../../src/json/generos.json.json')
const usuarios = leerArchivo('../../src/json/usuarios.json')
/* const animesValidados = animes as Anime[]
const generosValidadas = generos as Genero[]
const usuariosValidados = usuarios as Usuario[] */

let terminadoGeneros = false
let terminadoAnimes = false
let terminadoUsuarios = false

const conf = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'proyectotfg'
}

const conexion = await mysql.createConnection(conf)

function insertarGeneros () {
  generos.forEach(async ({ id, nombre }) => {
    await conexion.query(
      'INSERT INTO genero (id, nombre) VALUES (?, ?)',
      [id, nombre]
    )
  })
  terminadoGeneros = true
}

function insertarAnimes () {
  // console.log('COMIENZAN LOS ANIMES -------')
  animes.forEach(async ({ id, estudio, descripcion, fechaInicio, titulo, generos }) => {
    const [dia, mes, ano] = fechaInicio.split('/')
    const fechaFormateada = `${ano}-${mes}-${dia}`

    await conexion.query(
      'INSERT INTO anime (id, estudio, descripcion, fecha_inicio, titulo_enlace, titulo_texto) VALUES (?, ?, ?, ?, ?, ?)',
      [id, estudio, descripcion, fechaFormateada, titulo.enlace, titulo.texto]
    )
    generos.forEach(async (genero) => {
      const [generoEncontrado] = await conexion.query(
        'SELECT * FROM genero WHERE LOWER(nombre) = LOWER(?)',
        [genero]
      )
      if (generoEncontrado.id !== null) {
        await conexion.query(
          'INSERT INTO animes_generos (anime_id, genero_id) VALUES (?, ?)',
          [id, generoEncontrado[0].id]
        )
      }
    })
  })
  terminadoAnimes = true
}

function insertarUsuarios () {
  usuarios.forEach(async ({ id, calle, contrasena, email, genero, imagen, telefono, usuario, nombre }) => {
    await conexion.query(
      'INSERT INTO usuario (id, nombre_pila, apellido, usuario, email, contrasena, telefono, genero, calle_nombre, calle_numero, img_grande, img_mediana, img_miniatura) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, nombre.nombrePila, nombre.apellido, usuario, email, contrasena, telefono, genero, calle.nombre, calle.numero, imagen.grande, imagen.mediana, imagen.miniatura]
    )
  })
  terminadoUsuarios = true
}

function verificarTerminado () {
  if (terminadoAnimes && terminadoGeneros && terminadoUsuarios) {
    exit(0)
  } else {
    console.log('continuo')
  }
}

insertarGeneros()
insertarAnimes()
insertarUsuarios()

setInterval(verificarTerminado, 500)
