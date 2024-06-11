export class ErrorInputs extends Error {
  readonly campo
  constructor (mensaje: string, campo: string) {
    super(mensaje)
    this.name = 'ObjetoVacio'
    this.campo = campo
  }
}

export function validarPeticion (inputValue: string, opcion: string): void {
  const inputs = inputValue.trim().split('/')
  if (inputs[1] === undefined && opcion.toUpperCase() === 'PATCH') {
    throw new ErrorInputs('Falta indicar la id del objeto', 'Error')
  }
}
