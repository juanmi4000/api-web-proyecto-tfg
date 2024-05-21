import { ParsedQs } from 'qs'

//! Tipos de Animes

export interface AnimePost {
  estudio: string
  generos: NameCategoria[]
  descripcion: string
  titulo: {
    enlace: string
    texto: string
  }
  fechaInicio: string
}

export interface Anime extends AnimePost {
  id: `${string}-${string}-${string}-${string}-${string}`
}

//! Tipos de Categorías
export type NameCategoria = 'Misterio' | 'Seinen' | 'Sobrenatural' | 'Comedia' | 'Erótico' | 'Fantasía' | 'Harem' | 'Romance' | 'Escuela' | 'Ciencia Ficción' | 'Acción' | 'Shounen' | 'Superpoderes' | 'Drama' | 'Militar' | 'Policiaca' | 'Aventura' | 'Mágico' | 'Cotidiano' | 'Demónios' | 'Mecha' | 'Terror' | 'Espacio' | 'Inteligencia Artificial' | 'Shoujo' | 'Thriller' | 'Histórica' | 'Samurái' | 'Deportes' | 'Música' | 'Parodia' | 'Juegos' | 'Niños'

export interface Categoria {
  id: `${string}-${string}-${string}-${string}-${string}`
  nombre: NameCategoria
}

//! Tipos de usuarios
interface UsuarioNombre {
  nombrePila: string
  apellido: string
}

interface UsuarioCalle {
  nombre: string
  numero: number
}

interface UsuarioImagen {
  grande: string
  mediana: string
  miniatura: string
}

export interface UsuarioPost {
  nombre: UsuarioNombre
  usuario: string
  email: string
  contrasena: string
  telefono: string
  genero: string
  calle: UsuarioCalle
  imagen: UsuarioImagen
}

export interface Usuario extends UsuarioPost {
  id: `${string}-${string}-${string}-${string}-${string}`
}

//! Interfaces para los modelos
export interface AnimeModeloInter {
  getAll: (params: { genero: string | string[] | ParsedQs | ParsedQs[] | undefined }) => Promise<Anime[] | null>
  getPorId: (params: { id: Anime['id'] | string }) => Promise<Anime | null | undefined>
  crearAnime: (input: AnimePost) => Promise<Anime>
  eliminarAnime: (params: { id: Anime['id'] | string }) => Promise<number | undefined | null>
  actualizarAnime: (params: { id: Anime['id'] | string, [key: string]: any }) => Promise<Anime | Partial<Anime> | undefined | null>
}

export interface CategoriasModeloInter {
  getAll: () => Promise<Categoria[]>
}

export interface UsuarioModeloInter {
  getAll: () => Promise<Usuario[]>
  getPorId: (params: { id: Usuario['id'] | string }) => Promise<Usuario | null | undefined>
  crearUsuario: (input: UsuarioPost) => Promise<Usuario>
  eliminarUsuario: (params: { id: Usuario['id'] | string }) => Promise<number | undefined | null>
  actualizarUsuario: (params: { id: Usuario['id'] | string, [key: string]: any }) => Promise<Anime | Partial<Anime> | undefined | null>
}
