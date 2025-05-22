'use client'

import { useEffect, useState } from 'react'
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
    // ✅ MOBILE STYLE: estilo Netflix com scroll e snapping
    return (
      <section className="overflow-x-auto px-4 pb-2 scroll-smooth scroll-pl-4 snap-x snap-mandatory">
        <div className="flex gap-4">
          {filmesMock.map((filme) => (
            <article
              key={filme.id}
              className="flex-shrink-0 min-w-[160px] snap-start"
            >
              <FilmeCard
                {...filme}
                avaliacao={avaliacoes[filme.id] || 0}
                onAvaliar={onAvaliar}
                onCurtir={onCurtir}
                onFavoritar={onFavoritar}
                onVerDepois={onVerDepois}
              />
            </article>
          ))}
        </div>
      </section>
    )
  }

  // ✅ DESKTOP STYLE: mantém as setas e controle tradicional
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
    <section className="relative w-full overflow-hidden">
      <nav
        aria-label="Carrossel de filmes"
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
      >
        {filmesMock.map((filme) => (
          <article
            key={filme.id}
            className="flex-shrink-0 px-[2px]"
            style={{ width: `${100 / visibleItems}%` }}
          >
            <FilmeCard
              {...filme}
              avaliacao={avaliacoes[filme.id] || 0}
              onAvaliar={onAvaliar}
              onCurtir={onCurtir}
              onFavoritar={onFavoritar}
              onVerDepois={onVerDepois}
            />
          </article>
        ))}
      </nav>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 disabled:opacity-30"
        disabled={currentIndex === 0}
        aria-label="Voltar carrossel"
      >
        &#8592;
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 disabled:opacity-30"
        disabled={currentIndex >= filmesMock.length - visibleItems}
        aria-label="Avançar carrossel"
      >
        &#8594;
      </button>
    </section>
  )
}
