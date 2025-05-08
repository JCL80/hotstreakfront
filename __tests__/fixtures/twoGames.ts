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
};

export const g2: GameLog = {
  ...g1,
  PTS: 30, // bump a few fields to be different
  FGM: 12,
  PLUS_MINUS: -3,
  MIN: 28,
};
