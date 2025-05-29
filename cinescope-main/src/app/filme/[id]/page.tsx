interface PageProps {
  params: {
    id: string;
  };
}

export default async function DetalhesFilme({ params }: PageProps) {
  const id = params.id;

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 lg:px-20 py-6">
      <section aria-labelledby="titulo-detalhes">
        <h1 id="titulo-detalhes" className="text-xl sm:text-2xl font-bold text-blue-600">
          Detalhes do Filme 🎥
        </h1>
        <p className="mt-2 text-gray-700 text-sm sm:text-base">
          ID do filme: <span className="font-mono text-gray-800">{id}</span>
        </p>
      </section>
    </main>
  );
}