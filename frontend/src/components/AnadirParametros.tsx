import { CerrarSvg } from '@/multimedia/iconos/Cerrar'
interface Parametros {
  key: `${string}-${string}-${string}-${string}-${string}`
}

interface Props {
  manejadorParametros: () => void
  parametros: Parametros[]
  manejadorCerrar: (evento: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export function AnadirParamentros ({ manejadorParametros, parametros, manejadorCerrar }: Props): JSX.Element {
  return (
    <>
      <button
        className='text-base text-slate-700'
        onClick={manejadorParametros}
      >
        Añadir parámetros
      </button>
      <div id='parametros' className='flex flex-col gap-3 p-1'>
        {parametros.map(({ key }) => {
          return (
            <div
              key={key}
              className='relative mx-2 flex flex-col gap-2 items-center w-[90%] bg-slate-400 py-5 px-2 rounded-md text-sm'
            >
              <button
                onClick={manejadorCerrar}
                className='absolute top-0 right-0'
                data-key={key}
              >
                <CerrarSvg class='w-5' />
              </button>
              <input type='text' placeholder='Clave' className='w-full' />
              <input type='text' placeholder='Valor' className='w-full' />
            </div>
          )
        })}
      </div>
    </>
  )
}
