import { NextResponse } from "next/server";
import { BalldontlieAPI } from "@balldontlie/sdk";

if (!process.env.BALL_DONT_LIE_API_KEY) {
  throw new Error(
    "BALL_DONT_LIE_API_KEY is not set in the environment variables."
  );
}

const api = new BalldontlieAPI({ apiKey: process.env.BALL_DONT_LIE_API_KEY });

export async function GET() {
  try {
    const teams = await api.nba.getTeams();
    console.log("server request teams" , teams)
    return NextResponse.json(teams.data);
  } catch (error) {
    console.error("Error fetching NBA teams", error);
    return NextResponse.json(
      { error: "Failed to fetch NBA teams" },
      { status: 500 }
    );
  }
}
