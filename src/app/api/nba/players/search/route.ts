import { NextResponse } from 'next/server';
import { searchPlayers } from '@/lib/nba-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search') ?? '';

  // console.log("queryyy " , query)

  if (!query.trim()) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const data = await searchPlayers(query, 100);
    return NextResponse.json(data);
  } catch (err) {
    console.error('FastAPI player search error', err);
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 },
    );
  }
}
