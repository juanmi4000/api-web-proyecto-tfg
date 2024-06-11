import type { Opciones } from '@/tipos/tipos'

interface Props {
  opciones: Opciones[]
}

export function DocsLista ({ opciones }: Props): JSX.Element {
  return (
    <ul className='list-disc text-base list-outside flex flex-col gap-3'>
      {
        opciones.map(({ idOpcion, clave, definicion }) => {
          return (
            <li key={idOpcion} className='ml-10'>
              <span>{clave}</span>
              {definicion !== undefined && (
                <>
                  <span>: </span>
                  <span>{definicion}</span>
                </>
              )}
            </li>
          )
        })
      }
    </ul>
  )
}
