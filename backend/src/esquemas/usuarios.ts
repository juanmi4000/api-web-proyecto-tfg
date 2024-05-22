import zod, { ZodError } from 'zod'
import { UsuarioPost } from '../tipos/tipos'

const esquemaUsuario = zod.object({
  nombre: zod.object({
    nombrePila: zod.string({
      invalid_type_error: 'El estudio debe ser un string',
      required_error: 'El estudio es requerido'
    }),
    apellido: zod.string({
      invalid_type_error: 'El apellido debe ser un string',
      required_error: 'El apellido es requerido'
    })
  },
  {
    invalid_type_error: 'El nombre debe ser un objeto',
    required_error: 'El nombre es requerido'
  }),
  usuario: zod.string({
    invalid_type_error: 'El usuario debe ser un string',
    required_error: 'El usuario es requerido'
  }),
  email: zod.string({
    invalid_type_error: 'El email debe ser un string',
    required_error: 'El email es requerido'
  }),
  contrasena: zod.string({
    invalid_type_error: 'La contraseña debe ser un string',
    required_error: 'La contraseña es requerida'
  }),
  telefono: zod.string({
    invalid_type_error: 'El teléfono debe ser un string',
    required_error: 'El teléfono es requerido'
  }),
  genero: zod.string({
    invalid_type_error: 'El género debe ser un string',
    required_error: 'El género es requerido'
  }),
  calle: zod.object({
    nombre: zod.string({
      invalid_type_error: 'El nombre de la calle debe ser un string',
      required_error: 'El nombre de la calle es requerido'
    }),
    numero: zod.number({
      invalid_type_error: 'El número de la calle debe ser un número',
      required_error: 'El número de la calle es requerido'
    }).min(1)
  },
  {
    invalid_type_error: 'La calle debe ser un objeto',
    required_error: 'La calle es requerida'
  }
  ),
  imagen: zod.object(
    {
      grande: zod
        .string({
          invalid_type_error: 'La imagen grande debe ser un string',
          required_error: 'La imagen grande es requerido'
        })
        .url({
          message: 'La imagen grande debe ser una URL válida'
        }),
      mediana: zod
        .string({
          invalid_type_error: 'La imagen mediana debe ser un string',
          required_error: 'La imagen mediana es requerido'
        })
        .url({
          message: 'La imagen mediana debe ser una URL válida'
        }),
      miniatura: zod
        .string({
          invalid_type_error: 'La imagen miniatura debe ser un string',
          required_error: 'La imagen miniatura es requerido'
        })
        .url({
          message: 'La imagen miniatura debe ser una URL válida'
        })
    },
    {
      invalid_type_error: 'La imagen debe ser un objeto',
      required_error: 'La imagen es requerida'
    }
  )
})

export function validarUsuario (usuario: UsuarioPost): UsuarioPost | ZodError {
  const resultado = esquemaUsuario.safeParse(usuario)
  if (resultado.success) {
    return resultado.data
  } else {
    return resultado.error
  }
}

export function validarUsuarioParcial (usuario: Partial<UsuarioPost>): Partial<UsuarioPost> | ZodError {
  const resultado = esquemaUsuario.partial().safeParse(usuario)
  if (resultado.success) {
    return resultado.data
  } else {
    return resultado.error
  }
}
