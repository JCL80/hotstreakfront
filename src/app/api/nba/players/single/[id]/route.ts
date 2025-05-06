import { NextResponse } from "next/server";
import { getPlayerBio, getPlayerGames } from "@/lib/nba-client";
import { getAverages } from "@/services/playerStats";
import { getHotColdStreak } from "@/app/utils/playerStats";

export async function POST(
  request: Request,
  segmentData: { params: Promise<{ id: string }> }
) {
  // console.log("POST **** single player stats");
  const { id } = await segmentData.params;
  const nbaId = Number(id);
  if (!nbaId) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const { prefs } = await request.json();

    const bio = await getPlayerBio(nbaId);
    const games = await getPlayerGames(nbaId);

    const seasonAverages = getAverages(games)

    // console.log("seasonAvera" , seasonAverages)

    const recentGames = games.slice(0, prefs.gamesWindow); 
    const lastNGamesAvg = getAverages(recentGames);

    // console.log("last n games average" , lastNGamesAvg)
    

    // 🎯 Personalized hot/cold streak
    const hotColdStreak = await getHotColdStreak(
      prefs,
      seasonAverages,
      lastNGamesAvg,
    );

    // console.log("hot cold streak " , hotColdStreak)

    return NextResponse.json({
      playerBio : bio,
      seasonAverages,
      lastNGamesAvg,
      recentGames,
      hotColdStreak,
    });
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json(
      { error: "Failed to fetch player data." },
      { status: 500 }
    );
  }
}
