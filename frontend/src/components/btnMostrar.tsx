import { useState } from 'react'

interface Props {
  codigoRes: string
}

export function MostrarOcultarInfo ({ codigoRes }: Props): JSX.Element {
  const [pulsado, setPulsado] = useState<boolean>(false)

  const manejadorBtn = (): void => {
    setPulsado(!pulsado)
  }

  return (
    <>
      <button
        onClick={manejadorBtn}
        className='bg-[rgb(var(--color-btn))] p-2 mb-7 rounded-md lg:text-ellipsis'
      >
        {!pulsado ? 'Mostrar respuesta' : 'Ocultar respuesta'}
      </button>
      {pulsado && (
        <div>
          <p className='text-lg mb-7'>Respuesta:</p>
          <code className='mb-7 block bg-[rgb(var(--color-fondo-codigo))] p-2 rounded-md w-full text-black'>
            <p>{codigoRes}</p>
          </code>
        </div>
      )}
    </>
  )
}
