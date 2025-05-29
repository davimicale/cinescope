'use client'

import { useEffect, useState } from 'react'
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
  const [isDesktop, setIsDesktop] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleItems = 6

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isDesktop) {
    // ✅ MOBILE: 2 cards visíveis por vez com imagens maiores
    return (
      <section className="overflow-x-auto px-4 pb-2 scroll-smooth snap-x snap-mandatory">
        <div className="flex gap-4">
          {seriesMock.map((serie) => (
            <article
              key={serie.id}
              className="flex-shrink-0 w-1/2 snap-start"
            >
              <FilmeCard
                {...serie}
                avaliacao={avaliacoes[serie.id] || 0}
                onAvaliar={onAvaliar}
                onCurtir={onCurtir}
                onFavoritar={onFavoritar}
                onVerDepois={onVerDepois}
                className="h-full w-full max-w-full" // <-- garante largura total no mobile
              />
            </article>
          ))}
        </div>
      </section>
    )
  }

  // ✅ DESKTOP: carrossel com setas
  const next = () => {
    if (currentIndex < seriesMock.length - visibleItems) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <section className="relative w-full overflow-hidden group">
      <nav
        aria-label="Carrossel de séries"
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
      >
        {seriesMock.map((serie) => (
          <article
            key={serie.id}
            className="flex-shrink-0 px-[2px]"
            style={{ width: `${100 / visibleItems}%` }}
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
          </article>
        ))}
      </nav>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600/90 text-white rounded-full shadow-md hover:bg-blue-700 transition opacity-0 group-hover:opacity-100 disabled:opacity-30"
        disabled={currentIndex === 0}
        aria-label="Voltar carrossel de séries"
      >
        &#8592;
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600/90 text-white rounded-full shadow-md hover:bg-blue-700 transition opacity-0 group-hover:opacity-100 disabled:opacity-30"
        disabled={currentIndex >= seriesMock.length - visibleItems}
        aria-label="Avançar carrossel de séries"
      >
        &#8594;
      </button>
    </section>
  )
}