'use client'

import { useState } from 'react'
import FilmeCard from '@/components/FilmeCard'
import { filmesMock } from '@/data/filmesMock'
import Link from 'next/link'

export default function TodosFilmes() {
  const [avaliacoes, setAvaliacoes] = useState<{ [id: string]: number }>({})
  const [curtidos, setCurtidos] = useState<{ [id: string]: boolean }>({})
  const [favoritos, setFavoritos] = useState<{ [id: string]: boolean }>({})
  const [verDepois, setVerDepois] = useState<{ [id: string]: boolean }>({})

  const handleAvaliacao = (id: string, nota: number) => {
    setAvaliacoes(prev => ({ ...prev, [id]: nota }))
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Todos os Filmes</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Voltar
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
          {filmesMock.map(filme => (
            <FilmeCard
              key={filme.id}
              {...filme}
              avaliacao={avaliacoes[filme.id] || 0}
              onAvaliar={handleAvaliacao}
              onCurtir={(id) => setCurtidos(prev => ({ ...prev, [id]: !prev[id] }))}
              onFavoritar={(id) => setFavoritos(prev => ({ ...prev, [id]: !prev[id] }))}
              onVerDepois={(id) => setVerDepois(prev => ({ ...prev, [id]: !prev[id] }))}
            />
          ))}
        </div>
      </div>
    </main>
  )
}