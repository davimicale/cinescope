'use client'

import { useState } from 'react'
import Link from 'next/link'
import CarrosselFilmes from '@/components/CarrosselFilmes'
import CarrosselSeries from '@/components/CarrosselSeries'

export default function Home() {
  const [avaliacoes, setAvaliacoes] = useState<{ [id: string]: number }>({})
  const [curtidos, setCurtidos] = useState<{ [id: string]: boolean }>({})
  const [favoritos, setFavoritos] = useState<{ [id: string]: boolean }>({})
  const [verDepois, setVerDepois] = useState<{ [id: string]: boolean }>({})

  const handleAvaliacao = (id: string, nota: number) => {
    setAvaliacoes((prev) => ({ ...prev, [id]: nota }))
  }

  const handleCurtir = (id: string) => {
    setCurtidos((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleFavoritar = (id: string) => {
    setFavoritos((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleVerDepois = (id: string) => {
    setVerDepois((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <main className="min-h-screen bg-white">
      
      {/* Seção de Filmes */}
      <section className="pb-10 pt-6 w-full" aria-labelledby="filmes-populares">
        <header className="w-full px-4 sm:px-6 lg:px-20 mx-auto max-w-[1800px] mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h2 id="filmes-populares" className="text-xl sm:text-2xl font-semibold text-blue-600">
            Filmes Populares
          </h2>
          <Link
            href="/todos-filmes"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1 text-sm sm:text-base"
          >
            Ver todos <span>→</span>
          </Link>
        </header>

        <div className="w-full px-4 sm:px-6 lg:px-20 mx-auto max-w-[1800px]">
          <CarrosselFilmes
            avaliacoes={avaliacoes}
            onAvaliar={handleAvaliacao}
            onCurtir={handleCurtir}
            onFavoritar={handleFavoritar}
            onVerDepois={handleVerDepois}
          />
        </div>
      </section>

      {/* Seção de Séries */}
      <section className="pb-10 w-full" aria-labelledby="series-populares">
        <header className="w-full px-4 sm:px-6 lg:px-20 mx-auto max-w-[1800px] mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h2 id="series-populares" className="text-xl sm:text-2xl font-semibold text-blue-600">
            Séries Populares
          </h2>
          <Link
            href="/todos-series"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1 text-sm sm:text-base"
          >
            Ver todas <span>→</span>
          </Link>
        </header>

        <div className="w-full px-4 sm:px-6 lg:px-20 mx-auto max-w-[1800px]">
          <CarrosselSeries
            avaliacoes={avaliacoes}
            onAvaliar={handleAvaliacao}
            onCurtir={handleCurtir}
            onFavoritar={handleFavoritar}
            onVerDepois={handleVerDepois}
          />
        </div>
      </section>
    </main>
  )
}
