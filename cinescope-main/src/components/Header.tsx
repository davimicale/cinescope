'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  const toggleMenu = () => setMenuAberto(!menuAberto)

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav
        className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center"
        role="navigation"
        aria-label="Menu principal"
      >
        <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition">
          🎬 CineScope
        </Link>

        {/* Botão do menu mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
        >
          {menuAberto ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-4 text-sm md:text-base" role="menubar">
          <li><Link href="/" className="hover:underline">Início</Link></li>
          <li><Link href="/favoritos" className="hover:underline">Favoritos</Link></li>
          <li><Link href="/busca" className="hover:underline">Buscar</Link></li>
          <li><Link href="/assistir-depois" className="hover:underline">Assistir Depois</Link></li>
          <li><Link href="/avaliacoes" className="hover:underline">Avaliações</Link></li>
          <li><Link href="/perfil" className="hover:underline">Perfil 👤</Link></li>
        </ul>
      </nav>

      {/* Menu mobile */}
      {menuAberto && (
        <ul
          className="md:hidden bg-blue-500 px-4 py-3 space-y-2 text-sm animate-fade-in"
          role="menu"
        >
          <li><Link href="/" onClick={toggleMenu}>Início</Link></li>
          <li><Link href="/favoritos" onClick={toggleMenu}>Favoritos ⭐</Link></li>
          <li><Link href="/busca" onClick={toggleMenu}>Buscar 🔍</Link></li>
          <li><Link href="/assistir-depois" onClick={toggleMenu}>Assistir Depois 🎯</Link></li>
          <li><Link href="/avaliacoes" onClick={toggleMenu}>Avaliações 📝</Link></li>
          <li><Link href="/perfil" onClick={toggleMenu}>Perfil 👤</Link></li>
        </ul>
      )}
    </header>
  )
}
