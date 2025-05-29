import { NextResponse } from 'next/server'

const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function GET() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
  )
  const data = await response.json()

  return NextResponse.json(data)
}
