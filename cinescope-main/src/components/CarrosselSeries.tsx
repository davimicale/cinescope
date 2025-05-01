'use client'

import { useState } from 'react'
import { seriesMock } from '@/data/seriesMock'
import FilmeCard from './FilmeCard'

type Props = {
  avaliacoes: { [id: string]: number }
  onAvaliar: (id: string, nota: number) => void
  onCurtir: (id: string) => void
  onFavoritar: (id: string) => void
  onVerDepois: (id: string) => void
}

export default function CarrosselSeries({
  avaliacoes,
  onAvaliar,
  onCurtir,
  onFavoritar,
  onVerDepois
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsToShow = 5

  const next = () => {
    if (currentIndex < seriesMock.length - itemsToShow) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="relative w-full overflow-hidden group">
      <div 
        className="flex transition-transform duration-300"
        style={{ 
          transform: `translateX(calc(-${currentIndex * (100 / itemsToShow)}% + ${currentIndex * 8}px))`,
        }}
      >
        {seriesMock.map((serie) => (
          <div 
            key={serie.id} 
            className="flex-shrink-0 pl-2 first:pl-0"
            style={{ 
              width: `calc(${100 / itemsToShow}% - 8px)`,
              marginRight: '8px'
            }}
          >
            <FilmeCard
              {...serie}
              avaliacao={avaliacoes[serie.id] || 0}
              onAvaliar={onAvaliar}
              onCurtir={onCurtir}
              onFavoritar={onFavoritar}
              onVerDepois={onVerDepois}
              className="h-full w-full"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600/90 text-white rounded-full shadow-md hover:bg-blue-700 transition opacity-0 group-hover:opacity-100"
        disabled={currentIndex === 0}
      >
        &#8592;
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600/90 text-white rounded-full shadow-md hover:bg-blue-700 transition opacity-0 group-hover:opacity-100"
        disabled={currentIndex >= seriesMock.length - itemsToShow}
      >
        &#8594;
      </button>
    </div>
  )
}
