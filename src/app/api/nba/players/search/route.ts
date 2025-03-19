import { NextResponse } from "next/server";
import { BalldontlieAPI } from "@balldontlie/sdk";

// Make sure your BALDONTLIE_API_KEY is set in .env
if (!process.env.BALL_DONT_LIE_API_KEY) {
  throw new Error("BALL_DONT_LIE_API_KEY is not set in the environment variables.");
}

// Create the BallDontLie client
const api = new BalldontlieAPI({ apiKey: process.env.BALL_DONT_LIE_API_KEY });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("search") || "";

  try {
    // Use the 'search' parameter to filter players by name
    const playersResponse = await api.nba.getPlayers({
      search: searchQuery,
      per_page: 100,
    });

    // Return the JSON array of matched players
    return NextResponse.json(playersResponse.data);
  } catch (error) {
    console.error("Error searching players:", error);
    return NextResponse.json(
      { error: "Failed to fetch players from BallDontLie API" },
      { status: 500 }
    );
  }
}
