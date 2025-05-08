import type { StatKey } from "@/constants/statKeys";

export type HeatWeights = Record<StatKey, number>

export interface HotStreakPrefs extends Record<StatKey, number> {
  gamesWindow: number
  playoffOnly: boolean
}

export const DEFAULT_PREFS: HotStreakPrefs = {
  // one entry *for every* STAT_KEY:
  pts: 1, ts:1, efg:1, fgp:1, tpp:1, ftp:1,
  ast:1, reb:1, oreb:1, dreb:1,
  stl:1, blk:1, tov:1, pf:1, plus_minus:1, ast_to_tov:1,
  gamesWindow: 5,
  playoffOnly: false,
}
