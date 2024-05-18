import cors from 'cors'

const ORIGINES_ACEPTADOS = [
  'http://localhost:4321',
  'http://localhost:8080'
]

export const corsMiddleware = ({ origenesAceptados = ORIGINES_ACEPTADOS } = {}): ReturnType<typeof cors> => cors({
  origin: (origen, callback) => {
    if ((origen !== undefined && typeof origen === 'string')) { // cambiarlo
      if (origenesAceptados.includes(origen)) {
        return callback(null, true)
      }
    } else if (origen === undefined) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
})
