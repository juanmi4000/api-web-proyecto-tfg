import categoria from '../../json/categorias.json'
import { Categoria } from '../../tipos/tipos'

const validarCategorias = categoria as Categoria[]

export const CategoriaModelo = {
  async getAll() {
    return validarCategorias
  }
}
