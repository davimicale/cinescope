import { NextResponse } from 'next/server'

const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json(
      { error: 'Parâmetro "query" é obrigatório.' },
      { status: 400 }
    )
  }

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`
  )
  const data = await response.json()

  return NextResponse.json(data)
}
