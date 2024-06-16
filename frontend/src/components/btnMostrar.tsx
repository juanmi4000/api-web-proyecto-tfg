import { useState } from 'react'

interface Contenido {
  titulo: string
  descripcion: string
  codigoReq?: string
  codigoRes?: string
  copiar?: string
  info?: string
  idHref: string
  href: string
}
interface Props {
  codigoRes: Contenido[]
}

export function MostrarOcultarInfo ({ codigoRes }: Props): JSX.Element {
  const [pulsado, setPulsado] = useState<boolean>(false)

  const manejadorBtn = (): void => {
    setPulsado(!pulsado)
  }

  const comprobarCodigoRes = (): Contenido | Contenido[] => {
    return codigoRes.length !== 1 ? codigoRes : codigoRes[0]
  }

  return (
    <>
      <button
        onClick={manejadorBtn}
        className='bg-[rgb(var(--color-btn-mostrar))] p-2 mb-7 rounded-md lg:text-ellipsis'
        aria-label='Mostrat la respuesta de la petición'
      >
        {!pulsado ? 'Mostrar respuesta' : 'Ocultar respuesta'}
      </button>
      {pulsado && (
        <div>
          <p className='text-lg mb-7'>Respuesta:</p>
          <code className='mb-7 block bg-[rgb(var(--color-gris-marmol))] p-2 rounded-md w-full text-black overflow-auto'>
            <pre>{JSON.stringify(comprobarCodigoRes(), null, 2)}</pre>
          </code>
        </div>
      )}
    </>
  )
}
