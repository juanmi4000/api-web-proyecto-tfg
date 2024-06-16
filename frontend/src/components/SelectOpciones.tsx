import type { Parametros } from '@/tipos/tipos'

interface Props {
  setOpcion: React.Dispatch<React.SetStateAction<string>>
  setParametros: React.Dispatch<React.SetStateAction<Parametros[]>>
}

export function SelectOpciones ({ setOpcion, setParametros }: Props): JSX.Element {
  const manejadorOpcion = (evento: React.ChangeEvent<HTMLSelectElement>): void => {
    setOpcion(evento.target.value)
    setParametros([])
  }

  return (
    <select
      id='opciones'
      className='text-black rounded-md p-1 min-w-max'
      onChange={(e) => manejadorOpcion(e)}
      aria-label='Selecciona una de las siguientes opciones para hacer la petición'
    >
      <option value='get' aria-label='Opción GET'>GET</option>
      <option value='post' aria-label='Opción POST'>POST</option>
      <option value='patch' aria-label='Opción PATCH'>PATCH</option>
      <option value='delete' aria-label='Opción DELETE'>DELETE</option>
    </select>
  )
}
