import { useState } from 'react'

interface Props {
  manejadorFormulario: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  flechaIzq: React.ReactNode
}
export function FormularioExplorador ({ manejadorFormulario, flechaIzq }: Props): JSX.Element {
  const [valor, setValor] = useState('animes')

  return (
    <header className='text-center bg-[rgb(var(--color-gris-claro))] w-full py-3 rounded-sm'>
      <form
        className='flex flex-col gap-2 items-center text-black md:flex-row md:justify-between'
        onSubmit={(event) => {
          manejadorFormulario(event).catch((error) => console.error(error))
        }}
      >
        <label className='flex flex-col sm:flex-row items-center gap-2'>
          <span className='hidden md:block'>{flechaIzq}</span>
          <span>https://proyectotfg.onrender.com/</span>
          <input
            type='text'
            name='endpoint'
            className='rounded-md flex gap-2 w-full'
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            aria-label='Introducir endpoint'
          />
        </label>
        <input
          type='submit'
          value='Enviar'
          aria-label='Enviar petición'
          className='bg-[rgb(var(--color-gris-grafito))] text-white w-max py-1 px-5 rounded-md cursor-pointer'
        />
      </form>
    </header>
  )
}
