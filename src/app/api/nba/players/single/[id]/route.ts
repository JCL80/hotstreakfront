import { NextResponse } from "next/server";
import { BalldontlieAPI } from "@balldontlie/sdk";
import { getHotColdStreak } from "@/app/utils/playerStats"

// Make sure your env file has: BALL_DONT_LIE_API_KEY=yourAPIkey
if (!process.env.BALL_DONT_LIE_API_KEY) {
  throw new Error("BALL_DONT_LIE_API_KEY is not set in environment variables.");
}

const api = new BalldontlieAPI({ apiKey: process.env.BALL_DONT_LIE_API_KEY });

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const server_params = await params
  const playerId = Number(server_params.id);
  // const playerId = Number(params.id);

  // 1️⃣ Validate ID
  if (!playerId) {
    return NextResponse.json({ error: "Invalid player ID." }, { status: 400 });
  }

  try {
    // 2️⃣ Fetch player details
    const playerResponse = await api.nba.getPlayer(playerId);

    if (!playerResponse || !playerResponse.data) {
      return NextResponse.json({ error: "Player not found." }, { status: 404 });
    }

    const player = playerResponse.data;
    const teamId = player.team?.id;

    // 3️⃣ If no team, assume free agent
    if (!teamId) {
      // Return player + empty recent_games
      return NextResponse.json({ player, recent_games: [] });
    }

    // 4️⃣ Date setup
    //    - yesterday is end_date
    //    - 30 days before that is start_date
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const endDate = today.toISOString().split("T")[0];

    const startDate = new Date();
    startDate.setDate(today.getDate() - 30);
    const formattedStartDate = startDate.toISOString().split("T")[0];

    // 5️⃣ Fetch last 10 games within date range for the player’s team
    const gamesResponse = await api.nba.getGames({
      team_ids: [teamId],
      start_date: formattedStartDate,
      end_date: endDate,
      per_page: 100,
    });

    const games = gamesResponse.data;
    // Sort descending by date
    games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const lastGame = games.length > 0 ? games[0] : null;
    if (!lastGame) {
      // Return player + null last_game
      return NextResponse.json({ player, last_game: null });
    }

    // 6️⃣ Calculate hot/cold streak
    const hotColdStreak = await getHotColdStreak(playerId);

    // 7️⃣ Return final payload
    return NextResponse.json({ player, hotColdStreak });
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json(
      { error: "Failed to fetch player data." },
      { status: 500 }
    );
  }
}
