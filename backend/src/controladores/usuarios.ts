import { Request, Response } from 'express'
import { asyncHandler } from '../middlewares/manejadorAsync'
import { validarUsuario, validarUsuarioParcial } from '../esquemas/usuarios'
import { ZodError } from 'zod'
import { UsuarioModeloInter } from '../tipos/typos'

export class UsuariosControlador {
  private readonly usuarioModelo: UsuarioModeloInter
  constructor ({ usuarioModelo }: { usuarioModelo: UsuarioModeloInter }) {
    this.usuarioModelo = usuarioModelo
  }

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    try {
      const usuarios = await this.usuarioModelo.getAll()
      return res.json(usuarios)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })

  getPorId = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const usuario = await this.usuarioModelo.getPorId({ id })
      if (usuario === null) {
        return res.status(400).json({ message: 'La id no sigue el patrón correcto' })
      }
      if (usuario === undefined) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
      return res.json(usuario)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })

  crearUsuario = asyncHandler(async (req: Request, res: Response) => {
    try {
      const resultado = validarUsuario(req.body)
      if (resultado instanceof ZodError) {
        return res.status(400).json({ error: JSON.parse(resultado.message) })
      }
      const usuarioNuevo = await this.usuarioModelo.crearUsuario(resultado)
      return res.status(201).json(usuarioNuevo)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })

  eliminarUsuario = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const usuarioEncontrado = await this.usuarioModelo.eliminarUsuario({ id })
      if (usuarioEncontrado === null) {
        return res.status(400).json({ message: 'La id no sigue el patrón correcto' })
      }
      if (usuarioEncontrado === undefined) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      return res.json({ message: 'Usuario eliminado' })
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })

  actualizarUsuario = asyncHandler(async (req: Request, res: Response) => {
    try {
      const resultado = validarUsuarioParcial(req.body)

      if (resultado instanceof ZodError) {
        return res.status(400).json({ error: JSON.parse(resultado.message) })
      }
      const { id } = req.params
      const usuarioEncontrado = await this.usuarioModelo.actualizarUsuario({ id, ...resultado })
      if (usuarioEncontrado === null) {
        return res.status(400).json({ message: 'La id no sigue el patrón correcto' })
      }
      if (usuarioEncontrado === undefined) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
      return res.json(usuarioEncontrado)
    } catch (error) {
      console.error('Error en la promesa: ', error)
      return res.status(500).json({ message: 'Error interno del servidor.' })
    }
  })
}
