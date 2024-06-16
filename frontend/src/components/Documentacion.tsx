import React, { useEffect, useState, Fragment } from 'react'
import docs_info from '@/json/docs-info.json'
import docs_titulo from '@/json/docs-titulos.json'
import { MostrarOcultarInfo } from '@comp/BtnMostrar'
import { AsteriscoReact } from '@/multimedia/iconos/Asterisco'
import { CopiarReact } from '@/multimedia/iconos/Copiar'
import { toast, ToastContainer } from 'react-toastify'
import type { Contenido, DocsInfo } from '@/tipos/tipos'
import { DocsLista } from './DocsLista'
import 'react-toastify/dist/ReactToastify.css'
import '@/estilos/documentacion.css'

/* interface Contenido {
  id: `${string}-${string}-${string}-${string}-${string}`
  titulo: string
  descripcion: string
  codigoReq?: string
  codigoRes?: string
  copiar?: string
  info?: string
  idHref: string
  opciones?: Opciones[]
}

interface DocsInfo {
  id: `${string}-${string}-${string}-${string}-${string}`
  contenido: Contenido[]
} */

export function DocumentacionComp (): JSX.Element {
  const [idMostrarInfo, setIdMostrarInfo] = useState<Contenido['id']>(
    'd0c8ec5b-b84c-4f6d-b600-0cbda125aa02'
  )
  const [tituloPrincipal, setTituloPrincipal] = useState('Introducción')
  const [info, setInfo] = useState<Contenido[]>([])

  useEffect(() => {
    const contenidoEncontrado = docs_info.find(({ id }) => {
      return id === idMostrarInfo
    }) as DocsInfo | undefined
    if (contenidoEncontrado !== undefined) {
      setInfo(contenidoEncontrado.contenido)
    }
  }, [idMostrarInfo])

  const esIntroduccion = tituloPrincipal === 'Introducción'

  const renderizarDescripcion = (descripcion: string): JSX.Element[] => {
    const arrDescripcion = descripcion.split('\n')
    return arrDescripcion.map((fragmento, index) => {
      return (
        <Fragment key={index}>
          {fragmento}
          {arrDescripcion.length - 1 === index
            ? (
              <br />
              )
            : (
              <>
                <br />
                <br />
              </>
              )}
        </Fragment>
      )
    })
  }

  const copiarPortapapeles = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    // const textoCopiar = (e.target as HTMLButtonElement).getAttribute('data-copiar') // me interesa el que elemento que originó el evento aunque es el svg en este caso
    const textoCopiar = e.currentTarget.getAttribute('data-copiar')
    if (textoCopiar == null) return
    await navigator.clipboard.writeText(textoCopiar)
    const notify = (): void => {
      toast.success('¡Se ha copiado correctamente!', {
        position: 'top-right'
      })
    }
    notify()
  }

  const manejadorSelect = (
    evento: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const opcion = evento.currentTarget
    const indice = opcion.selectedIndex
    const opciones = opcion.options
    const id = opciones[indice].getAttribute('data-id') as Contenido['id'] | null
    const titulo = opcion.value
    if (id == null) return
    setIdMostrarInfo(id)
    setTituloPrincipal(titulo)
  }

  const manejadorEnlace = (evento: React.MouseEvent<HTMLAnchorElement, MouseEvent>, idHref: string): void => {
    evento.preventDefault()
    const elemento = document.getElementById(idHref)
    if (elemento != null) {
      elemento.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className='relative px-5' id='ocultar-main'>
      <section className='absolute text-black h-16 px-6 py-5 border-t-2 w-full top-0 left-0 bg-[rgb(var(--color-gris-grafito))] md:hidden'>
        <select
          className='rounded-md px-2 py-0.5 bg-[rgb(var(--color-gris-claro))]'
          onChange={(e) => {
            manejadorSelect(e)
          }}
        >
          {docs_titulo.map(({ subtitulos }) => {
            return subtitulos.map(({ id, titulo }) => {
              return (
                <option value={titulo} key={id} data-id={id}>
                  {titulo}
                </option>
              )
            })
          })}
        </select>
      </section>
      <section id='docs' className='gap-2 p-1'>
        <header className='hidden pt-10 pl-5 md:flex md:flex-col md:gap-10 md:border-r-2 overflow-y-auto'>
          {docs_titulo.map(({ id, titulo, subtitulos }) => (
            <article key={id}>
              <p className='font-fugaz cursor-default'>{titulo}</p>
              {subtitulos.map(({ id: idSubtitulo, titulo: subtitulo }) => (
                <button
                  className='ml-5 text-lg my-1 block hover:text-slate-400'
                  key={idSubtitulo}
                  onClick={() => {
                    setIdMostrarInfo((idSubtitulo as Contenido['id']))
                    setTituloPrincipal(subtitulo)
                  }}
                  aria-label={`Mostrar contenido de ${(subtitulo as string)}`}
                >
                  {subtitulo}
                </button>
              ))}
            </article>
          ))}
        </header>
        <main className='pt-10 flex flex-col gap-10 overflow-y-auto md:pr-5 lg:border-r-2 lg:pr-10'>
          <h2 className='font-fugaz text-3xl md:text-4xl'>{tituloPrincipal}</h2>
          <hr />
          {info.map(
            (
              {
                id,
                titulo,
                descripcion,
                codigoReq,
                copiar,
                info,
                codigoRes,
                idHref,
                opciones
              }
            ) => (
              <article className='mb-10' key={id} id={idHref}>
                {!esIntroduccion && (
                  <h3 className='font-fugaz text-2xl'>{titulo}</h3>
                )}
                <p className='mb-7'>{renderizarDescripcion(descripcion)}</p>
                {codigoReq !== undefined && (
                  <>
                    <p className='text-lg mb-7'>Petición:</p>
                    <code className='relative mb-3 block bg-[rgb(var(--color-gris-marmol))] p-0.5 rounded-md w-full text-black'>
                      <button
                        className='absolute top-2 right-2 border bg-[rgb(var(--color-gris-claro))] p-1 rounded'
                        data-copiar={copiar}
                        onClick={(e) => {
                          copiarPortapapeles(e).catch((error) => {
                            console.error(error)
                          })
                        }}
                        aria-label='Copiar codigo petición'
                      >
                        <span>
                          <CopiarReact clases='w-5' />
                        </span>
                        <ToastContainer autoClose={2000} />
                      </button>
                      <pre className='overflow-x-auto p-2'>{codigoReq}</pre>
                    </code>
                  </>
                )}
                {opciones !== undefined && <DocsLista opciones={opciones} />}
                {info !== undefined && (
                  <p className='flex justify-start items-center mb-7 text-base'>
                    <span>
                      <AsteriscoReact clases='w-5' />
                    </span>
                    <span className='ml-3'>{info}</span>
                  </p>
                )}
                {codigoRes !== undefined && (
                  <MostrarOcultarInfo codigoRes={JSON.parse(codigoRes)} />
                )}
              </article>
            )
          )}
        </main>
        <footer className='hidden pt-10 lg:flex lg:flex-col lg:gap-2 w-full overflow-y-auto'>
          <h3 className='font-fugaz text-lg'>En esta página</h3>
          {info.map(({ id, idHref, titulo }) => (
            <a
              href={`#${(idHref as string)}`}
              key={id}
              className='text-base hover:text-slate-400'
              onClick={(e) => { manejadorEnlace(e, idHref) }}
              aria-label={`Ir a la sección de ${(idHref as string)}`}
            >
              {titulo}
            </a>
          ))}
        </footer>
      </section>
    </main>
  )
}
