import genero from '../../json/generos.json'
import { Genero } from '../../tipos/tipos'

const validarGeneros = genero as Genero[]

export const GeneroModelo = {
  async getAll () {
    return validarGeneros
  }
}
