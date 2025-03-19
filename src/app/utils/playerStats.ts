/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export interface Stats {
    pts: number;
    ast: number;
    reb: number;
    fgp: number;
    tpp: number;
    plus_minus: number;
    fta: number;
    ortg: number;
    drtg: number;
  }

/**
 * Fetches a player's season averages.
 */

export const getSeasonAverages = async (
  playerId: number,
  season: number = 2023
): Promise<Stats | null> => {
  try {
    //   const response = await axios.get(`${BALLDONTLIE_API}/season_averages`, {
    //     params: { season, player_ids: [playerId] },
    //   });

    //   return response.data.data.length ? response.data.data[0] : null;

    const mockSeasonStats = {
      pts: 24.3,
      ast: 5.2,
      reb: 6.7,
      fgp: 47.2,
      tpp: 37.5,
      plus_minus: 4.3, // Added Plus-Minus
      fta: 5.6, // Needed for TS%
      ortg: 115, // Offensive Rating
      drtg: 112, // Defensive Rating
    };
    return mockSeasonStats;
  } catch (error) {
    console.error("Error fetching season averages:", error);
    return null;
  }
};
/**
 * Fetches a player's career averages.
 */
export const getCareerAverages = async (playerId: number) => {
  /* Function code */
};

/**
 * Fetches a player's last 5 games averages.
 */
export const getLast5GamesAverages = async (
  playerId: number
): Promise<Stats | null> => {
  try {
    //   const response = await axios.get(`${BALLDONTLIE_API}/stats`, {
    //     params: { player_ids: [playerId], per_page: 5 },
    //   });

    //   const games = response.data.data;
    //   if (!games.length) return null;

    //   let totalPoints = 0, totalFGM = 0, totalFGA = 0;
    //   let total3PM = 0, total3PA = 0, totalAssists = 0, totalRebounds = 0;

    //   games.forEach((game: { pts: number; fgm: number; fga: number; fg3m: number; fg3a: number; ast: number; reb: number; }) => {
    //     totalPoints += game.pts;
    //     totalFGM += game.fgm;
    //     totalFGA += game.fga;
    //     total3PM += game.fg3m;
    //     total3PA += game.fg3a;
    //     totalAssists += game.ast;
    //     totalRebounds += game.reb;
    //   });

    //   return {
    //     pts: totalPoints / 5,
    //     ast: totalAssists / 5,
    //     reb: totalRebounds / 5,
    //     fgp: totalFGA > 0 ? (totalFGM / totalFGA) * 100 : 0,
    //     tpp: total3PA > 0 ? (total3PM / total3PA) * 100 : 0,
    //   };

    // const mockLast5GamesStats = {
    //   pts: 29.4,
    //   ast: 6.8,
    //   reb: 9.0,
    //   fgp: 51.2,
    //   tpp: 42.3,
    //   plus_minus: 8.5, // Added plus-minus
    //   fta: 7.1, // Needed for TS%
    //   ortg: 120, // Offensive Rating
    //   drtg: 110, // Defensive Rating
    // };

    const mockSeasonStats = {
        pts: 24.3,
        ast: 5.2,
        reb: 6.7,
        fgp: 47.2,
        tpp: 37.5,
        plus_minus: 4.3, // Added Plus-Minus
        fta: 5.6, // Needed for TS%
        ortg: 115, // Offensive Rating
        drtg: 112, // Defensive Rating
      };

      const performanceMode = Math.random(); // 0.0 - 1.0
      let variationMultiplier = 1; // Default = Neutral
  
      if (performanceMode > 0.7) variationMultiplier = 1.5; // Hot Streak (30% chance)
      else if (performanceMode < 0.3) variationMultiplier = 0.5

    const mockLast5GamesStats = {
        pts: mockSeasonStats.pts + (Math.random() * 10 - 5) * variationMultiplier, 
        ast: mockSeasonStats.ast + (Math.random() * 3 - 1.5) * variationMultiplier,
        reb: mockSeasonStats.reb + (Math.random() * 3 - 1.5) * variationMultiplier,
        fgp: mockSeasonStats.fgp + (Math.random() * 5 - 2.5) * variationMultiplier,
        tpp: mockSeasonStats.tpp + (Math.random() * 5 - 2.5) * variationMultiplier,
        plus_minus: mockSeasonStats.plus_minus + (Math.random() * 10 - 5) * variationMultiplier,
        fta: mockSeasonStats.fta + (Math.random() * 2 - 1) * variationMultiplier,
        ortg: mockSeasonStats.ortg + (Math.random() * 5 - 2.5) * variationMultiplier,
        drtg: mockSeasonStats.drtg + (Math.random() * 5 - 2.5) * variationMultiplier,
      };

    return mockLast5GamesStats;
  } catch (error) {
    console.error("Error fetching last 5 games averages:", error);
    return null;
  }
};

/**
 * Calculates the Heat Index based on stats.
 */
export const calculateHeatIndex = (stats: {
  pts: number;
  ast: number;
  reb: number;
  fgp: number;
  tpp: number;
  plus_minus: number;
  fta: number;
  ortg: number;
  drtg: number;
}): number => {
  if (!stats) return 0;

  // Calculate True Shooting %
  // NOTE: The TS calculation here deviates from the standard TS% formula.
  // Instead of using field goal attempts, we're using the field goal percentage (fgp)
  // combined with free throw attempts (fta). This approach simplifies the calculation
  // but may not reflect true shooting efficiency as conventionally defined.
  const ts = (stats.pts / (2 * (stats.fgp + 0.44 * stats.fta))) * 100;

  // Weighted Heat Index Calculation
  const heatIndex =
    stats.pts * 1.3 + // Scoring impact
    ts * 1.0 + // Efficiency impact
    stats.fgp * 0.6 + // Field Goal Efficiency
    stats.tpp * 0.5 + // Three-point shooting
    stats.ast * 1.2 + // Playmaking ability
    stats.reb * 1.0 + // Overall activity
    stats.plus_minus * 1.5 + // Impact on team success
    (stats.ortg - stats.drtg) * 1.2; // Net Rating impact

  return Math.round(heatIndex * 10) / 10; // Round to 1 decimal place
};

/**
 * Determines if a player is on a hot or cold streak.
 * @param {number} playerId - The player's ID.
 * @returns {Promise<{status: string, difference: number}>} - Streak status.
 */

export const getHotColdStreak = async (
  playerId: number
): Promise<{ status: string; difference: number ; seasonAverages: any; last5Games: any}> => {
  try {
    const last5Games = await getLast5GamesAverages(playerId);
    const seasonAverages = await getSeasonAverages(playerId);

    if (!last5Games || !seasonAverages) {
      return { status: "No Data", difference: 0 , seasonAverages: null, last5Games: null};
    }

    const last5GamesHeat = calculateHeatIndex(last5Games);
    const seasonHeat = calculateHeatIndex(seasonAverages);


    const difference = last5GamesHeat - seasonHeat;

    let status = "Neutral";
    if (difference > 5) status = "🔥 Hot Streak";
    else if (difference < -5) status = "❄️ Cold Streak";

    return { status, difference , seasonAverages, last5Games };
  } catch (error) {
    console.error("Error calculating streak:", error);
    return { status: "Error", difference: 0 , seasonAverages: null, last5Games: null};
  }
};
