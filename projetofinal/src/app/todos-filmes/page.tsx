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

  const handleCurtir = (id: string) => {
    setCurtidos(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleFavoritar = (id: string) => {
    setFavoritos(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleVerDepois = (id: string) => {
    setVerDepois(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 lg:px-20 py-6">
      <section
        aria-labelledby="titulo-todos-filmes"
        className="max-w-[1800px] mx-auto"
      >
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1
            id="titulo-todos-filmes"
            className="text-xl sm:text-3xl font-bold text-white-600"
          >
            Todos os Filmes
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:underline text-sm sm:text-base"
          >
            Voltar
          </Link>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 sm:gap-6">
          {filmesMock.map(filme => (
            <FilmeCard
              key={filme.id}
              id={filme.id}
              titulo={filme.titulo}
              imagem={filme.imagem}
              avaliacao={avaliacoes[filme.id] || 0}
              favorito={favoritos[filme.id] || false} // ✔️ Corrigido
              onAvaliar={handleAvaliacao}
              onCurtir={() => handleCurtir(filme.id)}
              onFavoritar={() => handleFavoritar(filme.id)}
              onVerDepois={() => handleVerDepois(filme.id)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
