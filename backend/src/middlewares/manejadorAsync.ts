import { Request, Response, NextFunction } from 'express'

// Esta función toma una función asíncrona (fn) y devuelve una nueva función que maneja cualquier error que pueda ocurrir durante la ejecución de fn. Cualquier error se pasa a next, que es el manejador de errores de Express.
export const asyncHandler = (fn: Function) => (
  req: Request, res: Response, next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
