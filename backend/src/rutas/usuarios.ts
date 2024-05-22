import { Router } from 'express'
import { UsuariosControlador } from '../controladores/usuarios'
import { UsuarioModeloInter } from '../tipos/tipos'

export function crearUsuariosRouter ({ usuarioModelo }: { usuarioModelo: UsuarioModeloInter }): Router {
  const routerUsuarios = Router()

  const usuariosRouter = new UsuariosControlador({ usuarioModelo })

  routerUsuarios.get('/', usuariosRouter.getAll)

  routerUsuarios.get('/:id', usuariosRouter.getPorId)

  routerUsuarios.post('/', usuariosRouter.crearUsuario)

  routerUsuarios.delete('/:id', usuariosRouter.eliminarUsuario)

  routerUsuarios.patch('/:id', usuariosRouter.actualizarUsuario)

  return routerUsuarios
}
