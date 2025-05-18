'use client'

import { useState } from 'react'
import FilmeCard from '@/components/FilmeCard'
import { seriesMock } from '@/data/seriesMock'
import Link from 'next/link'

export default function TodosSeries() {
  const [avaliacoes, setAvaliacoes] = useState<{ [id: string]: number }>({})
  const [curtidos, setCurtidos] = useState<{ [id: string]: boolean }>({})
  const [favoritos, setFavoritos] = useState<{ [id: string]: boolean }>({})
  const [verDepois, setVerDepois] = useState<{ [id: string]: boolean }>({})

  const handleAvaliacao = (id: string, nota: number) => {
    setAvaliacoes(prev => ({ ...prev, [id]: nota }))
  }

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 lg:px-20 py-6">
      <section aria-labelledby="titulo-todas-series" className="max-w-[1800px] mx-auto">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 id="titulo-todas-series" className="text-xl sm:text-3xl font-bold text-blue-600">
            Todas as Séries
          </h1>
          <Link href="/" className="text-blue-600 hover:underline text-sm sm:text-base">
            Voltar
          </Link>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 sm:gap-6">
          {seriesMock.map(serie => (
            <FilmeCard
              key={serie.id}
              {...serie}
              avaliacao={avaliacoes[serie.id] || 0}
              onAvaliar={handleAvaliacao}
              onCurtir={(id) => setCurtidos(prev => ({ ...prev, [id]: !prev[id] }))}
              onFavoritar={(id) => setFavoritos(prev => ({ ...prev, [id]: !prev[id] }))}
              onVerDepois={(id) => setVerDepois(prev => ({ ...prev, [id]: !prev[id] }))}
            />
          ))}
        </div>
      </section>
    </main>
  )
}