import { GameLog } from "@/types/api";

// Nikola Jokic - 2023-24 season (3 games sample)
export const jokicGames: GameLog[] = [
  {
    PTS: 29, AST: 13, REB: 11,
    FGM: 12, FGA: 16,
    FG3M: 1, FG3A: 2,
    FTM: 4, FTA: 4,
    STL: 1, BLK: 1, TOV: 4,
    PLUS_MINUS: 15,
    MIN: 36,
    GAME_DATE: "2024-01-01",
    MATCHUP: "DEN vs. GSW",
    WL: "W",
    FG_PCT: 0.750,
    FG3_PCT: 0.500,
    FT_PCT: 1.000
  },
  {
    PTS: 25, AST: 9, REB: 14,
    FGM: 10, FGA: 18,
    FG3M: 2, FG3A: 4,
    FTM: 3, FTA: 4,
    STL: 2, BLK: 0, TOV: 2,
    PLUS_MINUS: 8,
    MIN: 34,
    GAME_DATE: "2024-01-03",
    MATCHUP: "DEN vs. LAL",
    WL: "W",
    FG_PCT: 0.556,
    FG3_PCT: 0.500,
    FT_PCT: 0.750
  },
  {
    PTS: 31, AST: 15, REB: 13,
    FGM: 13, FGA: 20,
    FG3M: 1, FG3A: 3,
    FTM: 4, FTA: 5,
    STL: 0, BLK: 2, TOV: 3,
    PLUS_MINUS: 12,
    MIN: 38,
    GAME_DATE: "2024-01-05",
    MATCHUP: "DEN vs. PHI",
    WL: "W",
    FG_PCT: 0.650,
    FG3_PCT: 0.333,
    FT_PCT: 0.800
  }
];

// Expected averages using total aggregation method (statistically accurate)
export const expectedJokicAverages = {
  pts: 28.33,      // (29 + 25 + 31) / 3
  ast: 12.33,      // (13 + 9 + 15) / 3
  reb: 12.67,      // (11 + 14 + 13) / 3
  fgm: 11.67,      // (12 + 10 + 13) / 3
  fga: 18.0,       // (16 + 18 + 20) / 3
  fg3m: 1.33,      // (1 + 2 + 1) / 3
  fg3a: 3.0,       // (2 + 4 + 3) / 3
  ftm: 3.67,       // (4 + 3 + 4) / 3
  fta: 4.33,       // (4 + 4 + 5) / 3
  stl: 1.0,        // (1 + 2 + 0) / 3
  blk: 1.0,        // (1 + 0 + 2) / 3
  tov: 3.0,        // (4 + 2 + 3) / 3
  plus_minus: 11.67, // (15 + 8 + 12) / 3
  minutes: 36.0,    // (36 + 34 + 38) / 3
  fgp: 64.81,      // Total makes/attempts: (35/54) * 100
  tpp: 44.44,      // Total 3P makes/attempts: (4/9) * 100
  ftp: 84.62,      // Total FT makes/attempts: (11/13) * 100
  ts: 71.17,       // Points / (2 * (FGA + 0.44 * FTA)) * 100
  efg: 68.52,      // (FGM + 0.5 * 3PM) / FGA * 100
  ast_to_tov: 4.11 // Total assists / Total turnovers: 37/9
}; 