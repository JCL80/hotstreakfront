import { NextResponse } from "next/server";
import { BalldontlieAPI } from "@balldontlie/sdk";

if (!process.env.BALL_DONT_LIE_API_KEY) {
    throw new Error(
      "BALL_DONT_LIE_API_KEY is not set in the environment variables."
    );
  }
  
const api = new BalldontlieAPI({ apiKey: process.env.BALL_DONT_LIE_API_KEY });

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const teamId = Number(params.id);
  console.log(`Fetching team with ID ${teamId}`);

  try {
    const team = await api.nba.getTeam(teamId);
    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json({ error: "Failed to fetch team data" }, { status: 500 });
  }
}
