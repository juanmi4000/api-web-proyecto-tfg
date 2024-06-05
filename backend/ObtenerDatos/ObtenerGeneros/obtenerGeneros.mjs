import fs from 'node:fs'

// leer un JSON lo recomendado
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url) // tiene la dirección del archivo actual
const animes = require('../../animes.json')

const generos = []

animes.forEach(({ generos }) => {
  let encontrado
  generos.forEach((genero) => {
    encontrado = generos.find((generoFind) => generoFind === genero)
    if (!encontrado) {
      generos.push(genero)
    }
  })
})

const jsonGeneros = []

generos.forEach((genero) => {
  jsonGeneros.push({
    id: crypto.randomUUID(),
    nombre: genero
  })
})
fs.writeFileSync(
  '../../generos-copia.json',
  JSON.stringify(jsonGeneros, null, 2)
)

// generos.forEach((genero) => console.log(genero));
