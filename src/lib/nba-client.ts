// src/lib/nba-client.ts
import { normalizeGameLog } from "@/services/playerStats";
import { GameLog, GamesResponse, PlayerBio , PlayerResponse } from "@/types/api"

const FASTAPI = process.env.FAST_API_URL!;
if (!FASTAPI) throw new Error("FAST_API_URL is not defined");

/**
 * Fetches player bio + metadata.
 */
export const getPlayerBio = async (playerId: number): Promise<PlayerBio> => {
  try {
    const resp = await fetch(`${FASTAPI}/player/${playerId}`);
    if (!resp.ok) throw new Error("Player not found");

    const player = (await resp.json()) as PlayerResponse;
    const infoSet = player.resultSets.find(r => r.name === "CommonPlayerInfo");
    if (!infoSet || !infoSet.rowSet.length) throw new Error("No player info found");

    const headers = infoSet.headers;
    const row = infoSet.rowSet[0];
    const meta = Object.fromEntries(
      headers.map((h, i) => [h, row[i] as string | number])
    ) as Record<string, string | number>;

    return {
      id: playerId,
      first_name: meta["FIRST_NAME"] as string,
      last_name: meta["LAST_NAME"] as string,
      team: {
        id: player.team_id,            // <-- New
        full_name: meta["TEAM_NAME"] as string,
        logo_url: player.team_logo_url, // <-- New
      },
      position: meta["POSITION"] as string,
      height: meta["HEIGHT"] as string,
      weight: meta["WEIGHT"] as string,
      jersey_number: Number(meta["JERSEY"]),
      college: meta["SCHOOL"] as string,
      country: meta["COUNTRY"] as string,
      image_url: player.image_url,
    };
  } catch (err) {
    console.error("getPlayerBio error:", err);
    throw err;
  }
};


/**
 * Fetches all games for a player.
 */

export const getPlayerGames = async (playerId: number): Promise<GameLog[]> => {
  try {
    const resp = await fetch(`${FASTAPI}/player/${playerId}/games`);
    if (!resp.ok) throw new Error("Failed to fetch player games");

    const { resultSets } = (await resp.json()) as GamesResponse;
    const logSet = resultSets.find(r => r.name === "PlayerGameLog");
    if (!logSet || !logSet.rowSet.length) return [];

    const headers = logSet.headers;
    const games = logSet.rowSet.map(row => {
      const entry = Object.fromEntries(
        headers.map((h, i) => [h, row[i]])
      );
      return {
        // existing fields
        ...normalizeGameLog(entry),
  
        // extra fields for the front-end cards
        GAME_DATE : entry["GAME_DATE"]  as string,
        MATCHUP   : entry["MATCHUP"]    as string,
        WL        : entry["WL"]         as string,
  
        FG_PCT    : Number(entry["FG_PCT"])   || 0,
        FG3_PCT   : Number(entry["FG3_PCT"])  || 0,
        FT_PCT    : Number(entry["FT_PCT"])   || 0,
        OREB      : Number(entry["OREB"])     || 0,
        DREB      : Number(entry["DREB"])     || 0,
        PF        : Number(entry["PF"])       || 0,
      };
    });

    // console.log("[Player Games API] Raw entries:", games);

    return games;
  } catch (err) {
    console.error("getPlayerGames error:", err);
    throw err;
  }
};

/**
 * Searches for a player.
 */
export async function searchPlayers(query: string, limit = 100) {
  const res = await fetch(`${FASTAPI}/players?search=${encodeURIComponent(query)}&limit=${limit}`);
  if (!res.ok) throw new Error(`FastAPI search failed – ${res.status}`);
  return res.json();          // returns PlayerBio[]
}