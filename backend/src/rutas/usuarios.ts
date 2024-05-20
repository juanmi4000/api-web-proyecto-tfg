import { Router } from 'express'
import { UsuariosControlador } from '../controladores/usuarios'

export const routerUsuarios = Router()

routerUsuarios.get('/', UsuariosControlador.getAll)

routerUsuarios.get('/:id', UsuariosControlador.getPorId)

routerUsuarios.post('/', UsuariosControlador.crearUsuario)

routerUsuarios.delete('/:id', UsuariosControlador.eliminarUsuario)

routerUsuarios.patch('/:id', UsuariosControlador.actualizarUsuario)
