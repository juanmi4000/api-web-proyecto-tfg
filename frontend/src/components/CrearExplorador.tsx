import React, { useState } from 'react'
import { AnadirParamentros } from './AnadirParametros'
import { SelectOpciones } from './SelectOpciones'
import { FormularioExplorador } from './FormularioExplorador'
import type { Anime, Titulo, Usuario, UsuarioCalle, UsuarioImagen, UsuarioNombre, Parametros, Respuesta } from '@/tipos/tipos'
import '@/estilos/crear-explorador.css'
import { ErrorInputs, validarPeticion } from '@/utilidades/utilidades'

interface Props {
  children: string
}

export function CrearExplorador ({ children }: Props): JSX.Element {
  const [respuesta, setRespuesta] = useState<Respuesta | null>(null)
  const [opcion, setOpcion] = useState('GET')
  const [parametros, setParametros] = useState<Parametros[]>([])

  const esGet = opcion.toUpperCase() === 'GET'
  const esDetete = opcion.toUpperCase() === 'DELETE'

  const primeraLetraMayus = (cadena: string): string => {
    const arrCadena = cadena.split(' ').map(cad => (cad.charAt(0).toUpperCase() + cad.slice(1).toLowerCase()).trim()).filter((cad) => cad !== '')
    let cadAux = ''
    arrCadena.forEach((cad, index) => {
      if (arrCadena.length - 1 !== index) {
        cadAux += cad.trim() + ' '
      } else {
        cadAux += cad.trim()
      }
    })
    return cadAux
  }

  const comprobarParametros = (divs: NodeListOf<HTMLDivElement>, value: string): Anime | Usuario | undefined => {
    const [endpoint] = value.split('/')
    validarPeticion(value, opcion)
    if (endpoint === 'animes') {
      const anime: Anime = {}
      const titulo: Titulo = {}

      divs.forEach((div) => {
        const inputs = div.querySelectorAll('input')
        const [generico, diferencial] = inputs[0].value.split('_')

        if (generico === 'titulo' && (diferencial === 'enlace' || diferencial === 'texto')) {
          titulo[diferencial] = inputs[1].value
          anime.titulo = titulo
        } else if (inputs[0].value === 'generos') {
          // primeraLetraMayus(inputs[1].value).forEach(h => console.log(h))
          anime.generos = inputs[1].value.split(',').map(genero => primeraLetraMayus(genero))
        } else {
          (anime as any)[inputs[0].value] = inputs[1].value
        }
      })
      return anime
    } else if (endpoint === 'usuarios') {
      const usuario: Usuario = {}
      const nombre: UsuarioNombre = {}
      const calle: UsuarioCalle = {}
      const imagen: UsuarioImagen = {}
      divs.forEach(div => {
        const inputs = div.querySelectorAll('input')
        const [generico, diferencial] = inputs[0].value.split('_')

        if (generico === 'nombre' && (diferencial === 'pila' || diferencial === 'apellido')) {
          if (diferencial === 'pila') {
            nombre.nombrePila = inputs[1].value
          } else {
            nombre[diferencial] = inputs[1].value
          }
          usuario.nombre = nombre
        } else if (generico === 'calle' && (diferencial === 'nombre' || diferencial === 'numero')) {
          (calle as any)[diferencial] = inputs[1].value
          usuario.calle = calle
        } else if (generico === 'imagen' && (diferencial === 'grande' || diferencial === 'mediana' || diferencial === 'miniatura')) {
          imagen[diferencial] = inputs[1].value
          usuario.imagen = imagen
        } else {
          (usuario as any)[inputs[0].value] = inputs[1].value
        }
      })

      return usuario
    }
  }

  const manejadorFormulario = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    if (opcion === null) return
    const { elements } = event.currentTarget
    const endpoint = elements.namedItem('endpoint')
    const isElement = endpoint instanceof HTMLInputElement
    if (!isElement || isElement === null) return

    try {
      let respuestaServer
      if (opcion.toUpperCase() === 'POST' || opcion.toUpperCase() === 'PATCH') {
        const parametrosDiv = document.getElementById('parametros')
        if (parametrosDiv === null) return
        const divs = parametrosDiv.querySelectorAll('div')
        const objeto: Anime | Usuario | undefined = comprobarParametros(divs, endpoint.value)
        if (JSON.stringify(objeto) === '{}') {
          throw new ErrorInputs('No has añadido ningún parámetro', 'Error')
        }
        respuestaServer = await fetch(
          `https://proyectotfg.onrender.com/${endpoint.value}`,
          {
            method: opcion.toUpperCase(),
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto)
          }
        ).then(async (res) => await res.json())
      } else {
        respuestaServer = await fetch(
          `https://proyectotfg.onrender.com/${endpoint.value}`,
          {
            method: opcion.toUpperCase()
          }
        ).then(async (res) => await res.json())
      }

      if (respuestaServer.ok === false && respuestaServer.status === 404) {
        throw new Error('ERROR: Ese endpoint no existe')
      }
      setRespuesta(respuestaServer)
    } catch (error) {
      if (error instanceof ErrorInputs) {
        setRespuesta({ [error.campo]: error.message })
      } else if (error instanceof Error) {
        setRespuesta({ error: error.message })
      } else {
        setRespuesta({ error: 'Ha ocurrido un error inesperado' })
      }
    }
  }

  const manejadorCerrar = (evento: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const key = evento.currentTarget.getAttribute('data-key')
    const indiceEncontrado = parametros.findIndex((parametro) => { return parametro.key === key })
    parametros.splice(indiceEncontrado, 1)
    setParametros([...parametros])
  }

  const manejadorParametros = (): void => {
    setParametros([...parametros, { key: crypto.randomUUID() }])
  }

  return (
    <>
      <article className='my-2 flex flex-col items-center gap-5 w-full md:bg-[rgb(var(--color-btn-border))] md:px-8 md:flex-row'>
        <SelectOpciones setOpcion={setOpcion} setParametros={setParametros} />
        <FormularioExplorador manejadorFormulario={manejadorFormulario} flechaIzq={children} />
      </article>
      <article className='cuerpo-respuesta gap-2 text-black'>
        <div className='bg-[rgb(var(--color-btn-border))] rounded p-2 flex flex-col items-center overflow-y-auto'>
          {(!esGet && !esDetete) && <AnadirParamentros manejadorParametros={manejadorParametros} manejadorCerrar={manejadorCerrar} parametros={parametros} />}
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
