import React, { useState } from 'react'
import '@/estilos/crear-explorador.css'

interface Props {
  children: string
}

interface Respuesta {
  [key: string]: any
}

interface Parametros {
  key: `${string}-${string}-${string}-${string}-${string}`
}

export function CrearExplorador ({ children }: Props): JSX.Element {
  const [respuesta, setRespuesta] = useState<Respuesta | null>(null)
  const [opcion, setOpcion] = useState('GET')
  const [parametros, setParametros] = useState<Parametros[]>([])

  const esGet = opcion.toUpperCase() === 'GET'
  const esDetete = opcion.toUpperCase() === 'DELETE'

  const handleForm = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    if (opcion === null) return
    const { elements } = event.currentTarget
    const endpoint = elements.namedItem('endpoint')
    const isElement = endpoint instanceof HTMLInputElement
    if (!isElement || isElement === null) return

    try {
      const respuestaServer = await fetch(
        `http://localhost:4000/${endpoint.value}`,
        {
          method: opcion.toUpperCase()
        }
      ).then(async (res) => await res.json())
      if (respuestaServer.ok === false && respuestaServer.status === 404) {
        throw new Error('ERROR: Ese endpoint no existe')
      }
      setRespuesta(respuestaServer)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        setRespuesta({ error: error.message })
      } else {
        setRespuesta({ error: 'Ha ocurrido un error inesperado' })
      }
    }
  }

  /* const manejadorParametros = (evento: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setParametros([...parametros, { key: crypto.randomUUID() }])
  } */
  const manejadorParametros = (): void => {
    setParametros([...parametros, { key: crypto.randomUUID() }])
  }

  return (
    <>
      <article className='my-2 flex flex-col items-center gap-5 w-full md:bg-[rgb(var(--color-btn-border))] md:px-8 md:flex-row'>
        <select
          id='opciones'
          className='text-black rounded-md p-1 min-w-max'
          onChange={(e) => setOpcion(e.target.value)}
        >
          <option value='get'>GET</option>
          <option value='post'>POST</option>
          <option value='patch'>PATCH</option>
          <option value='delete'>DELETE</option>
        </select>
        <header className='text-center bg-[rgb(var(--color-btn-border))] w-full py-3 rounded-sm'>
          <form
            className='flex flex-col gap-2 items-center text-black md:flex-row md:justify-between'
            onSubmit={(event) => {
              handleForm(event).catch((error) => console.error(error))
            }}
          >
            <label className='flex flex-col sm:flex-row items-center gap-2'>
              <span className='hidden md:block'>{children}</span>
              http://localhost:4000/
              <input
                type='text'
                name='endpoint'
                className='rounded-md flex gap-2 w-full'
              />
            </label>
            <input
              type='submit'
              value='Enviar'
              className='bg-[#B3B2AE] w-max py-1 px-5 rounded-md cursor-pointer'
            />
          </form>
        </header>
      </article>
      <article className='cuerpo-respuesta gap-2 text-black'>
        <div className='bg-[rgb(var(--color-btn-border))] rounded p-2'>
          {(!esGet && !esDetete) && (
            <>
              <button className='text-base text-slate-700' onClick={manejadorParametros}>Añadir parámetros</button>
              <div id='parametros' className='flex flex-col gap-3'>
                {parametros.map(({ key }) => {
                  return (
                    <div key={key} className='mx-2'>
                      <input type='text' placeholder='Clave' className='w-28' />
                      <input type='text' placeholder='Valor' />
                      <hr />
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>

        <code className='bg-[rgb(var(--color-btn-border))] w-full overflow-y-auto text-wrap rounded-sm'>
          {respuesta !== null && (
            <pre>{JSON.stringify(respuesta, null, 2)}</pre>
          )}
        </code>
      </article>
    </>
  )
}
