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
    >
      <option value='get'>GET</option>
      <option value='post'>POST</option>
      <option value='patch'>PATCH</option>
      <option value='delete'>DELETE</option>
    </select>
  )
}
