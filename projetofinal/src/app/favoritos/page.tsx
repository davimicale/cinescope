'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Favorito = {
  id: string
  titulo: string
  imagem: string
}

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('favoritos')
    if (stored) {
      setFavoritos(JSON.parse(stored))
    }
  }, [])

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 lg:px-20 py-6">
      <section aria-labelledby="titulo-favoritos">
        <h1 id="titulo-favoritos" className="text-xl sm:text-2xl font-bold text-blue-600">
          Filmes Favoritos 💙
        </h1>
        <p className="mt-2 text-gray-700 text-sm sm:text-base">
          Aqui você verá os filmes ou séries marcados como favoritos.
        </p>
      </section>

      {favoritos.length === 0 ? (
        <p className="mt-6 text-gray-500">Nenhum favorito encontrado.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoritos.map((item) => (
            <li key={item.id} className="border rounded-lg overflow-hidden shadow-md">
              <img src={item.imagem} alt={item.titulo} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.titulo}</h3>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/"
        className="inline-block mt-8 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        ⬅️ Voltar para a Home
      </Link>
    </main>
  )
}
