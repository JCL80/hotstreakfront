import { NextResponse } from "next/server";
import axios from "axios";

const FASTAPI = process.env.FAST_API_URL!;   // asserted because we just set it

interface TeamRaw {
  id: number;
  full_name: string;
  abbreviation: string;
  nickname: string;
  city: string;
  state: string;
  year_founded: number;
  logo_url: string;
}

/** CamelCased version for use in your frontend */
export interface Team {
  id: number;
  fullName: string;
  abbreviation: string;
  nickname: string;
  city: string;
  state: string;
  yearFounded: number;
  logoUrl: string;
}

/**  GET /api/nba/teams/all  */
export async function GET() {
  try {
  
    const { data: rawTeams } = await axios.get<TeamRaw[]>(`${FASTAPI}/teams`);

    // Map into your nicer Team type
    const teams: Team[] = rawTeams.map((t) => ({
      id:           t.id,
      fullName:     t.full_name,
      abbreviation: t.abbreviation,
      nickname:     t.nickname,
      city:         t.city,
      state:        t.state,
      yearFounded:  t.year_founded,
      logoUrl:      t.logo_url,
    }));

    return NextResponse.json(teams);
  } catch (error) {
    console.error("FastAPI teams fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch NBA teams" },
      { status: 500 },
    );
  }
}
