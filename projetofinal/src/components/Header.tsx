'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [busca, setBusca] = useState('')
  const router = useRouter()

  const toggleMenu = () => setMenuAberto(!menuAberto)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (busca.trim()) {
      router.push(`/pesquisa?query=${encodeURIComponent(busca.trim())}`)
      setBusca('')
      setMenuAberto(false)
    }
  }

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav
        className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center"
        role="navigation"
        aria-label="Menu principal"
      >
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition">
          🎬 CineScope
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-4 text-sm md:text-base" role="menubar">
          <li><Link href="/" className="hover:underline">Início</Link></li>
          <li><Link href="/favoritos" className="hover:underline">Favoritos </Link></li>
          <li><Link href="/assistir-depois" className="hover:underline">Assistir Depois </Link></li>
          <li><Link href="/avaliacoes" className="hover:underline">Avaliações </Link></li>
          <li><Link href="/perfil" className="hover:underline">Perfil 👤</Link></li>
        </ul>

        {/* Botão Menu Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
        >
          {menuAberto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden bg-blue-500 px-4 py-3 space-y-4">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar..."
              className="flex-1 px-3 py-1 rounded-l-md text-black outline-none"
            />
            <button
              type="submit"
              className="bg-blue-800 px-4 py-1 rounded-r-md hover:bg-blue-900"
            >
              🔍
            </button>
          </form>
          <ul className="space-y-2" role="menu">
            <li><Link href="/" onClick={toggleMenu}>Início</Link></li>
            <li><Link href="/favoritos" onClick={toggleMenu}>Favoritos </Link></li>
            <li><Link href="/assistir-depois" onClick={toggleMenu}>Assistir Depois </Link></li>
            <li><Link href="/avaliacoes" onClick={toggleMenu}>Avaliações </Link></li>
            <li><Link href="/perfil" onClick={toggleMenu}>Perfil 👤</Link></li>
          </ul>
        </div>
      )}
    </header>
  )
}
