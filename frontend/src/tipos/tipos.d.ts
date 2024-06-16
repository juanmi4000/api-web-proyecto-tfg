export interface Anime {
  estudio?: string
  generos?: string[]
  descripcion?: string
  titulo?: Titulo
  fechaInicio?: string
}

export interface Titulo {
  enlace?: string
  texto?: string
}

export interface UsuarioNombre {
  nombrePila?: string
  apellido?: string
}

export interface UsuarioCalle {
  nombre?: string
  numero?: number
}

export interface UsuarioImagen {
  grande?: string
  mediana?: string
  miniatura?: string
}

export interface Usuario {
  nombre?: UsuarioNombre
  usuario?: string
  email?: string
  contrasena?: string
  telefono?: string
  genero?: string
  calle?: UsuarioCalle
  imagen?: UsuarioImagen
}

export interface Respuesta {
  [key: string]: any
}

export interface Parametros {
  key: `${string}-${string}-${string}-${string}-${string}`
}

export interface Opciones {
  idOpcion: `${string}-${string}-${string}-${string}-${string}`
  clave: string
  definicion?: string
}

export interface Contenido {
  id: `${string}-${string}-${string}-${string}-${string}`
  titulo: string
  descripcion: string
  codigoReq?: string
  codigoRes?: string
  copiar?: string
  info?: string
  idHref: string
  opciones?: Opciones[]
}

export interface DocsInfo {
  id: `${string}-${string}-${string}-${string}-${string}`
  contenido: Contenido[]
}
