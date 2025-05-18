import { Star, Heart, Clock } from 'lucide-react'

type Props = {
  id: string
  titulo: string
  imagem: string
  avaliacao: number
  onAvaliar: (id: string, nota: number) => void
  onCurtir: (id: string) => void
  onFavoritar: (id: string) => void
  onVerDepois: (id: string) => void
  className?: string
}

export default function FilmeCard({
  id,
  titulo,
  imagem,
  avaliacao,
  onAvaliar,
  onCurtir,
  onFavoritar,
  onVerDepois,
  className = ''
}: Props) {
  return (
    <article
      className={`flex flex-col w-full ${className} 
        max-w-full sm:max-w-[200px]`}
    >
      <figure className="relative w-full h-[300px] rounded-md overflow-hidden">
        <img
          src={imagem}
          alt={`Capa de ${titulo}`}
          title={titulo}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </figure>

      <figcaption
        className="text-sm mt-2 font-medium line-clamp-2"
        title={titulo}
      >
        {titulo}
      </figcaption>

      <div
        className="flex mt-1"
        role="radiogroup"
        aria-label={`Avaliação de ${titulo}`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={`cursor-pointer transition ${
              avaliacao >= star ? 'text-yellow-400' : 'text-gray-400'
            }`}
            onClick={() => onAvaliar(id, star)}
            fill={avaliacao >= star ? 'currentColor' : 'none'}
            aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
            role="radio"
            aria-checked={avaliacao === star}
          />
        ))}
      </div>

      <div className="flex justify-between mt-2 gap-1">
        <Heart
          size={20}
          className="cursor-pointer text-gray-400 hover:text-red-500 transition"
          onClick={() => onCurtir(id)}
          aria-label="Curtir"
          role="button"
        />
        <Star
          size={20}
          className="cursor-pointer text-gray-400 hover:text-yellow-500 transition"
          onClick={() => onFavoritar(id)}
          aria-label="Favoritar"
          role="button"
        />
        <Clock
          size={20}
          className="cursor-pointer text-gray-400 hover:text-blue-500 transition"
          onClick={() => onVerDepois(id)}
          aria-label="Ver depois"
          role="button"
        />
      </div>
    </article>
  )
}
