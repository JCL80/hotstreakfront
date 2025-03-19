import { NextResponse } from "next/server";
import { BalldontlieAPI } from "@balldontlie/sdk";

if (!process.env.BALL_DONT_LIE_API_KEY) {
    throw new Error(
      "BALL_DONT_LIE_API_KEY is not set in the environment variables."
    );
  }
  
const api = new BalldontlieAPI({ apiKey: process.env.BALL_DONT_LIE_API_KEY });

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const server_params = await params;
  const id = server_params.id;

  const teamId =  Number(id);  

  try {
    const playersResponse = await api.nba.getPlayers({
      team_ids: [teamId],
      per_page: 100,
    });

    const players = playersResponse.data;
    const first15Players = players.slice(0, 15);

    
    return NextResponse.json(first15Players);
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json({ error: "Failed to fetch team data" }, { status: 500 });
  }
}
