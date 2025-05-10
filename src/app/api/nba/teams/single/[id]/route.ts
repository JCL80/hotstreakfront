// app/api/nba/teams/single/[id]/route.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const FASTAPI = process.env.FAST_API_URL!; // e.g. http://localhost:8000

export async function GET(request: NextRequest): Promise<NextResponse> {
  // parse the dynamic segment from the incoming URL
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const rawId = parts[parts.length - 1]; // last segment
  const teamId = parseInt(rawId, 10);

  try {
    const { data } = await axios.get(`${FASTAPI}/teams/${teamId}/players`);

    // shape A
    if (data.team && data.players) {
      return NextResponse.json({ team: data.team, players: data.players });
    }

    // legacy shape B
    const overallSet = data.resultSets[0];
    const playersSet = data.resultSets[1];

    const teamInfo = {
      id: teamId,
      name: overallSet.headers[overallSet.headers.indexOf("TEAM_NAME")],
      wins: overallSet.rowSet[0][overallSet.headers.indexOf("W")],
      losses: overallSet.rowSet[0][overallSet.headers.indexOf("L")],
      logo_url: `https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`,
    };
    // Treat rowSet as unknown[][] so each "row" is unknown[]
    const roster = (playersSet.rowSet as unknown[][]).map((row) =>
      Object.fromEntries(
        // TS will infer `idx` as number
        playersSet.headers.map((header: string, idx: number) => {
          // row[idx] is unknown → cast to the primitive you expect
          const value = row[idx] as string | number;
          return [header, value];
        })
      )
    );

    return NextResponse.json({ team: teamInfo, players: roster });
  } catch (err) {
    console.error("⚠️ FastAPI roster fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch team data" },
      { status: 500 }
    );
  }
}
