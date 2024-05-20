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

// Tipos de Categorías
export type NameCategoria = 'Misterio' | 'Seinen' | 'Sobrenatural' | 'Comedia' | 'Erótico' | 'Fantasía' | 'Harem' | 'Romance' | 'Escuela' | 'Ciencia Ficción' | 'Acción' | 'Shounen' | 'Superpoderes' | 'Drama' | 'Militar' | 'Policiaca' | 'Aventura' | 'Mágico' | 'Cotidiano' | 'Demónios' | 'Mecha' | 'Terror' | 'Espacio' | 'Inteligencia Artificial' | 'Shoujo' | 'Thriller' | 'Histórica' | 'Samurái' | 'Deportes' | 'Música' | 'Parodia' | 'Juegos' | 'Niños'

export interface Categoria {
  id: `${string}-${string}-${string}-${string}-${string}`
  nombre: NameCategoria
}
