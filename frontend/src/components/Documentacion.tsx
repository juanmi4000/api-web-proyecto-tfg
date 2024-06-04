import { useEffect, useState, Fragment } from 'react'
import docs_info from '@/json/docs-info.json'
import docs_titulo from '@/json/docs-titulos.json'
import { MostrarOcultarInfo } from '@comp/BtnMostrar'
import { AsteriscoReact } from '@/multimedia/iconos/Asterisco'
import { CopiarReact } from '@/multimedia/iconos/Copiar'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

export function DocumentacionComp (): JSX.Element {
  const [idMostrarInfo, setIdMostrarInfo] = useState(
    'd0c8ec5b-b84c-4f6d-b600-0cbda125aa02'
  )
  const [tituloPrincipal, setTituloPrincipal] = useState('Introducción')
  const [info, setInfo] = useState<Contenido[]>([])

  useEffect(() => {
    const contenidoEncontrado = docs_info.find(({ id }) => {
      return id === idMostrarInfo
    })
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
          {
            arrDescripcion.length - 1 === index
              ? <br />
              : (
                <>
                  <br />
                  <br />
                </>
                )
          }

        </Fragment>
      )
    })
  }

  const copiarPortapapeles = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    // const textoCopiar = (e.target as HTMLButtonElement).getAttribute('data-copiar') // me interesa el que elemento que originó el evento aunque es el svg en este caso
    const textoCopiar = e.currentTarget.getAttribute('data-copiar')
    if (textoCopiar === null) return
    await navigator.clipboard.writeText(textoCopiar)
    const notify = (): void => {
      toast.success('¡Se ha copiado correctamente!', {
        position: 'top-right'
      })
    }
    notify()
  }

  return (
    <>
      <header className='hidden pt-10 pl-5 md:flex md:flex-col md:gap-10 md:border-r-2 overflow-y-auto'>
        {docs_titulo.map(({ id, titulo, subtitulos }) => (
          <article key={id}>
            <p className='font-fugaz cursor-default'>{titulo}</p>
            {subtitulos.map(({ id: idSubtitulo, titulo: subtitulo }) => (
              <button
                className='ml-5 text-lg my-1 block'
                key={idSubtitulo}
                onClick={() => {
                  setIdMostrarInfo(idSubtitulo)
                  setTituloPrincipal(subtitulo)
                }}
              >
                {subtitulo}
              </button>
            ))}
          </article>
        ))}
      </header>
      <main className='pt-10 md:pr-5 lg:border-r-2 lg:pr-10 lg:flex lg: flex-col lg:gap-10 overflow-y-auto'>
        <h2 className='font-fugaz text-4xl'>{tituloPrincipal}</h2>
        <hr />
        {info.map(
          (
            { titulo, descripcion, codigoReq, copiar, info, codigoRes, idHref },
            index
          ) => (
            <article className='mb-10' key={index} id={idHref}>
              {!esIntroduccion && <h3 className='font-fugaz text-2xl'>{titulo}</h3>}
              <p className='mb-7'>{renderizarDescripcion(descripcion)}</p>
              {codigoReq !== undefined && (
                <>
                  <p className='text-lg mb-7'>Petición:</p>
                  <code className='relative mb-3 block bg-[rgb(var(--color-fondo-codigo))] p-2 rounded-md w-full text-black'>
                    <button className='absolute top-2 right-2 border bg-[rgb(var(--color-fondo-copiar))] p-1 rounded' data-copiar={copiar} onClick={(e) => { copiarPortapapeles(e).catch((error) => { console.error(error) }) }}>
                      <span><CopiarReact clases='w-5' /></span>
                      <ToastContainer autoClose={2000} />
                    </button>
                    <p>{codigoReq}</p>
                  </code>
                </>
              )}
              {info !== undefined && (
                <p className='flex justify-start items-center mb-7 text-base'>
                  <span><AsteriscoReact clases='w-5' /></span>
                  <span className='ml-3'>{info}</span>
                </p>
              )}
              {codigoRes !== undefined && (
                <MostrarOcultarInfo codigoRes={codigoRes} />
              )}
            </article>
          )
        )}
      </main>
      <footer className='hidden pt-10 lg:flex lg:flex-col lg:gap-2 w-full overflow-y-auto'>
        <h3 className='font-fugaz text-lg'>En esta página</h3>
        {
          info.map(({ href, titulo }, index) => (
            <a href={href} key={index} className='text-base'>{titulo}</a>
          ))
        }
      </footer>
    </>
  )
}
