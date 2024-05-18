export interface AnimePost {
  estudio: string
  generos: string[]
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
