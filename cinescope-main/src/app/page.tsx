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
      <section className="pb-10 pt-6 w-full">
        <div className="w-full px-20 mx-auto max-w-[1800px]">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-2xl font-semibold text-blue-600">Filmes Populares</h2>
            <Link 
              href="/todos-filmes" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1"
            >
              Ver todos <span>→</span>
            </Link>
          </div>

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
      <section className="pb-10 w-full">
        <div className="w-full px-20 mx-auto max-w-[1800px]">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-2xl font-semibold text-blue-600">Séries Populares</h2>
            <Link 
              href="/todos-series" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1"
            >
              Ver todas <span>→</span>
            </Link>
          </div>

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
