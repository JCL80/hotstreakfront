import { NextResponse } from "next/server";
import { getPlayerBio, getPlayerGames } from "@/lib/nba-client";
import { getAverages } from "@/services/playerStats";
import { getHotColdStreak, calculateHeatIndex } from "@/app/utils/playerStats";

export async function POST(
  request: Request,
  segmentData: { params: Promise<{ id: string }> }
) {
  const { id } = await segmentData.params;
  const nbaId = Number(id);
  if (!nbaId) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const { prefs } = await request.json();

    const bio = await getPlayerBio(nbaId);
    const games = await getPlayerGames(nbaId);
//     console.log("games[0]", games[0]);
// console.log("games[lenght]" , games[games.length - 1])

    // Season averages should always be regular season only
    const regularSeasonGames = games.filter(game => !game.PLAYOFF);
    const seasonAverages = getAverages(regularSeasonGames);

    // Recent games are filtered based on user preferences
    // console.log("games", games.length);
    // console.log("games[0]", games[0]);
    // console.log("prefs", prefs.playoffOnly);  
    // console.log("prefs.gamesWindow", prefs.gamesWindow);

    const filteredGames = prefs.playoffOnly 
      ? games.filter(game => game.PLAYOFF)
      : regularSeasonGames;

    // console.log("filteredGames", filteredGames);

    const recentGames = filteredGames.slice(0, prefs.gamesWindow); 
    // const olderGames = filteredGames.slice(prefs.gamesWindow);

    // console.log(`Total games: ${games.length}, Regular season: ${regularSeasonGames.length}, Filtered games: ${filteredGames.length}, Recent games: ${recentGames.length}`);

    const lastNGamesAvg = getAverages(recentGames);
    
    const { ...weights } = prefs;
    // Calculate heat indexes
    const seasonHeatIndex = calculateHeatIndex(seasonAverages, weights);
    const lastNHeatIndex = calculateHeatIndex(lastNGamesAvg, weights);
    
    // 🎯 Personalized hot/cold streak
    const hotColdStreak = await getHotColdStreak(
      prefs,
      seasonAverages,
      lastNGamesAvg,
    );

    return NextResponse.json({
      playerBio : bio,
      seasonAverages,
      lastNGamesAvg,
      recentGames,
      hotColdStreak,
      prefs,
      heatIndexes: {
        season: seasonHeatIndex,
        lastN: lastNHeatIndex
      }
    });
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json(
      { error: "Failed to fetch player data." },
      { status: 500 }
    );
  }
}
