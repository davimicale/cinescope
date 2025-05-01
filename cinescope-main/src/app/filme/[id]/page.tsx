interface PageProps {
  params: {
    id: string;
  };
}

export default async function DetalhesFilme({ params }: PageProps) {
  const id = params.id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">Detalhes do Filme 🎥</h1>
      <p className="mt-2 text-gray-700">ID do filme: {id}</p>
    </div>
  )
}
