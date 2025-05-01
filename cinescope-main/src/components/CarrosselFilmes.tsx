'use client'

import { useState } from 'react'
import { filmesMock } from '@/data/filmesMock'
import FilmeCard from './FilmeCard'

type Props = {
  avaliacoes: { [id: string]: number }
  onAvaliar: (id: string, nota: number) => void
  onCurtir: (id: string) => void
  onFavoritar: (id: string) => void
  onVerDepois: (id: string) => void
}

export default function CarrosselFilmes({
  avaliacoes,
  onAvaliar,
  onCurtir,
  onFavoritar,
  onVerDepois
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleItems = 6

  const next = () => {
    if (currentIndex < filmesMock.length - visibleItems) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
      >
        {filmesMock.map((filme) => (
          <div
            key={filme.id}
            className="flex-shrink-0 px-[2px]"
            style={{ width: `${100 / visibleItems}%` }}
          >
            <FilmeCard
              id={filme.id}
              titulo={filme.titulo}
              imagem={filme.imagem}
              avaliacao={avaliacoes[filme.id] || 0}
              onAvaliar={onAvaliar}
              onCurtir={onCurtir}
              onFavoritar={onFavoritar}
              onVerDepois={onVerDepois}
            />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
        disabled={currentIndex === 0}
      >
        &#8592;
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
        disabled={currentIndex >= filmesMock.length - visibleItems}
      >
        &#8594;
      </button>
    </div>
  )
}
