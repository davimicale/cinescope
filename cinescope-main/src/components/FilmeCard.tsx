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
    <div className={`flex flex-col w-full max-w-[200px] ${className}`}>
      <div className="relative w-full h-[300px] rounded-md overflow-hidden">  {/* Ajuste a altura */}
        <img 
          src={imagem} 
          alt={titulo} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      <h3 className="text-sm mt-2 font-medium line-clamp-2">{titulo}</h3>
      
      <div className="flex mt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={`cursor-pointer ${avaliacao >= star ? 'text-yellow-400' : 'text-gray-400'}`}
            onClick={() => onAvaliar(id, star)}
            fill={avaliacao >= star ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      
      <div className="flex justify-between mt-2 gap-1">
        <Heart
          size={20}
          className="cursor-pointer text-gray-400 hover:text-red-500"
          onClick={() => onCurtir(id)}
        />
        
        <Star
          size={20}
          className="cursor-pointer text-gray-400 hover:text-yellow-500"
          onClick={() => onFavoritar(id)}
        />
        
        <Clock
          size={20}
          className="cursor-pointer text-gray-400 hover:text-blue-500"
          onClick={() => onVerDepois(id)}
        />
      </div>
    </div>
  )
}
