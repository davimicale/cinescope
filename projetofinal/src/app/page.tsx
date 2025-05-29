'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Header'
import CarrosselFilmes from '@/components/CarrosselFilmes'
import CarrosselSeries from '@/components/CarrosselSeries'

type Favorito = {
  id: string
  titulo: string
  imagem: string
}

export default function Home() {
  const [avaliacoes, setAvaliacoes] = useState<{ [id: string]: number }>({})
  const [curtidos, setCurtidos] = useState<{ [id: string]: boolean }>({})
  const [favoritos, setFavoritos] = useState<{ [id: string]: Favorito }>({})
  const [verDepois, setVerDepois] = useState<{ [id: string]: boolean }>({})

  const handleAvaliacao = (id: string, nota: number) => {
    setAvaliacoes((prev) => ({ ...prev, [id]: nota }))
  }

  const handleCurtir = (id: string) => {
    setCurtidos((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleFavoritar = (id: string, titulo: string, imagem: string) => {
    setFavoritos((prev) => {
      const novo = { ...prev }
      if (novo[id]) {
        delete novo[id]
      } else {
        novo[id] = { id, titulo, imagem }
      }
      return novo
    })
  }

  const handleVerDepois = (id: string) => {
    setVerDepois((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(Object.values(favoritos)))
  }, [favoritos])

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar /}
      <Navbar />

      {/* Filmes */}
      <section className="pb-10 pt-6 w-full">
        <header className="w-full px-4 sm:px-6 lg:px-20 mx-auto max-w-[1800px] mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white-600">
            Filmes Populares
          </h2>
          <Link
            href="/todos-filmes"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Ver todos →
          </Link>
        </header>

        <div className="w-full px-4 sm:px-6 lg:px-20 mx-auto max-w-[1800px]">
          <CarrosselFilmes
            avaliacoes={avaliacoes}
            onAvaliar={handleAvaliacao}
            onCurtir={handleCurtir}
            onFavoritar={handleFavoritar}
            onVerDepois={handleVerDepois}
            favoritos={favoritos}
          />
        </div>
      </section>

      {/* Séries */}
      <section className="pb-10 w-full">
        <header className="w-full px-4 sm:px-6 lg:px-20 mx-auto max-w-[1800px] mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white-600">
            Séries Populares
          </h2>
          <Link
            href="/todos-series"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Ver todas →
          </Link>
        </header>

        <div className="w-full px-4 sm:px-6 lg:px-20 mx-auto max-w-[1800px]">
          <CarrosselSeries
            avaliacoes={avaliacoes}
            onAvaliar={handleAvaliacao}
            onCurtir={handleCurtir}
            onFavoritar={handleFavoritar}
            onVerDepois={handleVerDepois}
            favoritos={favoritos}
          />
        </div>
      </section>
    </main>
  )
}
