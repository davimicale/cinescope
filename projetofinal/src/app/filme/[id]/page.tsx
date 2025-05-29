interface PageProps {
  params: {
    id: string
  }
}

const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

async function getFilme(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`,
    { next: { revalidate: 86400 } } // Revalida a cada 24 horas (opcional)
  )
  if (!res.ok) {
    throw new Error('Falha ao buscar os dados do filme')
  }
  return res.json()
}

export default async function DetalhesFilme({ params }: PageProps) {
  const id = params.id
  const filme = await getFilme(id)

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 lg:px-20 py-6">
      <section aria-labelledby="titulo-detalhes">
        <h1
          id="titulo-detalhes"
          className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4"
        >
          {filme.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
            alt={filme.title}
            className="rounded-lg shadow-md w-full md:w-1/3"
          />

          <div className="flex-1 space-y-4">
            <p className="text-gray-700 text-base">{filme.overview}</p>

            <div className="text-sm space-y-1">
              <p>
                <strong>Data de lançamento:</strong> {filme.release_date}
              </p>
              <p>
                <strong>Nota:</strong> {filme.vote_average} ⭐
              </p>
              <p>
                <strong>Duração:</strong> {filme.runtime} minutos
              </p>
              <p>
                <strong>Gêneros:</strong>{' '}
                {filme.genres.map((g: any) => g.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
