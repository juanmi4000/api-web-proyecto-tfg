import React, { useState } from 'react'
import '@/estilos/crear-explorador.css'

interface Props {
  children: string
}

export function CrearExplorador ({ children }: Props): JSX.Element {
  const [respuesta, setRespuesta] = useState([])
  const [opcion, setOpcion] = useState('GET')

  const esPost = opcion.toUpperCase() === 'POST'

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
      setRespuesta(respuestaServer)
      console.log(respuesta)
    } catch (error) {
      console.error(error)
    }
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
              className='bg-[#B3B2AE] w-max py-1 px-5 rounded-md'
            />
          </form>
        </header>
      </article>
      <article className='cuerpo-respuesta gap-2 text-black'>
        <div className='bg-[rgb(var(--color-btn-border))]'>
          {esPost && <p>hola</p>}
        </div>

        <code className='bg-[rgb(var(--color-btn-border))] w-full overflow-y-auto text-wrap'>
          {respuesta.length !== 0 && (
            <pre>{JSON.stringify(respuesta, null, 2)}</pre>
          )}
        </code>
      </article>
    </>
  )
}
