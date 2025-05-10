// __tests__/fixtures/twoGames.ts
import { GameLog } from "@/types/api";

export const g1: GameLog = {
  PTS: 20, AST: 4, REB: 5,
  FGM: 8,  FGA: 15,
  FG3M: 2, FG3A: 6,
  FTM: 2,  FTA: 2,
  STL: 1,  BLK: 0, TOV: 2,
  PLUS_MINUS: 5,
  MIN: 30,
  GAME_DATE: "2024-01-01",
  MATCHUP: "TEAM vs. OPP",
  WL: "W",
  FG_PCT: 53.3,
  FG3_PCT: 33.3,
  FT_PCT: 100.0,
  OREB: 2,
  DREB: 3,
  PF: 2,
  PLAYOFF: false
};

export const g2: GameLog = {
  ...g1,
  PTS: 30, // bump a few fields to be different
  FGM: 12,
  PLUS_MINUS: -3,
  MIN: 28,
  GAME_DATE: "2024-01-02",
  MATCHUP: "TEAM @ OPP",
  WL: "L",
  FG_PCT: 60.0,
  FG3_PCT: 40.0,
  FT_PCT: 80.0,
  OREB: 3,
  DREB: 4,
  PF: 3
};
