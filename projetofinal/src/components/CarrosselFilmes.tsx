'use client'

import { useEffect, useState } from 'react'
import FilmeCard from './FilmeCard'

type Filme = {
  id: string
  titulo: string
  imagem: string
}

type Favorito = {
  id: string
  titulo: string
  imagem: string
}

type Props = {
  avaliacoes: { [id: string]: number }
  onAvaliar: (id: string, nota: number) => void
  onCurtir: (id: string) => void
  onFavoritar: (id: string, titulo: string, imagem: string) => void
  onVerDepois: (id: string) => void
  favoritos: { [id: string]: Favorito }
}

export default function CarrosselFilmes({
  avaliacoes,
  onAvaliar,
  onCurtir,
  onFavoritar,
  onVerDepois,
  favoritos
}: Props) {
  const [isDesktop, setIsDesktop] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filmes, setFilmes] = useState<Filme[]>([])
  const visibleItems = 6

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const res = await fetch('/api/tmdb/filmes')
        const data = await res.json()
        const filmesFormatados = data.results.map((filme: any) => ({
          id: filme.id.toString(),
          titulo: filme.title,
          imagem: `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        }))
        setFilmes(filmesFormatados)
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      }
    }

    fetchFilmes()
  }, [])

  if (filmes.length === 0) return <p>Carregando filmes...</p>

  if (!isDesktop) {
    return (
      <section className="overflow-x-auto px-4 pb-2 scroll-smooth snap-x snap-mandatory">
        <div className="flex gap-4">
          {filmes.map((filme) => (
            <article key={filme.id} className="flex-shrink-0 w-1/2 snap-start">
              <FilmeCard
                {...filme}
                avaliacao={avaliacoes[filme.id] || 0}
                onAvaliar={onAvaliar}
                onCurtir={onCurtir}
                onFavoritar={() =>
                  onFavoritar(filme.id, filme.titulo, filme.imagem)
                }
                onVerDepois={onVerDepois}
                className="h-full w-full max-w-full"
                favorito={!!favoritos[filme.id]}
              />
            </article>
          ))}
        </div>
      </section>
    )
  }

  const next = () => {
    if (currentIndex < filmes.length - visibleItems) {
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
        aria-label="Carrossel de filmes"
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
      >
        {filmes.map((filme) => (
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
              onFavoritar={() =>
                onFavoritar(filme.id, filme.titulo, filme.imagem)
              }
              onVerDepois={onVerDepois}
              className="h-full w-full"
              favorito={!!favoritos[filme.id]}
            />
          </article>
        ))}
      </nav>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600/90 text-white rounded-full shadow-md hover:bg-blue-700 transition opacity-0 group-hover:opacity-100 disabled:opacity-30"
        disabled={currentIndex === 0}
        aria-label="Voltar carrossel de filmes"
      >
        &#8592;
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-blue-600/90 text-white rounded-full shadow-md hover:bg-blue-700 transition opacity-0 group-hover:opacity-100 disabled:opacity-30"
        disabled={currentIndex >= filmes.length - visibleItems}
        aria-label="Avançar carrossel de filmes"
      >
        &#8594;
      </button>
    </section>
  )
}
