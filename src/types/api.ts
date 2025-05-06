/**
 * Box score counting stats for a single game or aggregated span.
 * These come straight from the NBA stats endpoint.
 */
export interface BoxStats {
  /** Points scored */
  pts: number;
  /** Assists */
  ast: number;
  /** Total rebounds */
  reb: number;
  oreb: number;
  dreb: number;

  // Shooting splits
  fgm: number; // Field‑goals made
  fga: number; // Field‑goal attempts
  fgp: number; //
  tpp: number; //
  fg3m: number; // 3‑pt makes
  fg3a: number; // 3‑pt attempts
  ftm: number; // Free‑throws made
  fta: number; // Free‑throw attempts
  ftp: number; // Free-throw percentage

  // Miscellaneous
  stl: number; // Steals
  blk: number; // Blocks
  tov: number; // Turnovers
  plus_minus: number; // Raw +/- from NBA.com
  minutes: number; // Minutes played
  pf: number; // Personal Fouls
}

export interface AdvancedStats extends BoxStats {
  /** True‑shooting percentage */
  ts: number;
  /** Effective FG% */
  efg: number;
  /** Usage rate (needs team context) */
  usg?: number;
  /** Offensive rating (pts/100 poss) */
  ortg?: number;
  /** Defensive rating (pts allowed/100 poss) */
  drtg?: number;

  // Public composite metrics
  bpm?: number;
  vorp?: number;
  ws48?: number;
  epm?: number;
  raptor?: number;
  lebron?: number;
  darko?: number;
}

export interface GameLog {
  PTS: number;
  AST: number;
  REB: number;
  FGM: number;
  FGA: number;
  FG3M: number;
  FG3A: number;
  FTM: number;
  FTA: number;
  STL: number;
  BLK: number;
  TOV: number;
  PLUS_MINUS?: number;
  MIN: number; // minutes string like "34:12" or numeric string
  GAME_DATE?: string;
  MATCHUP?: string;
  WL?: string;
  FG_PCT?: number;
  FG3_PCT?: number;
  FT_PCT?: number;
  OREB?: number; // <-- NEW
  DREB?: number; // <-- NEW
  PF?: number;
}

/**
 * Generic result set coming from your FastAPI backend.
 */
export interface ResultSet {
  name: string;
  headers: string[];
  rowSet: unknown[][];
}

/**
 * Shape of the JSON from GET /player/{id}
 */
export interface PlayerResponse {
  resultSets: ResultSet[];
  image_url: string;
  team_id: number; // <-- Add this
  team_logo_url: string; // <-- Add this
}

/**
 * Structured player bio.
 */
export interface PlayerBio {
  id: number;
  first_name: string;
  last_name: string;
  team: { id: number; full_name: string; logo_url: string }; // Updated
  position: string;
  height: string;
  weight: string;
  jersey_number: number;
  college: string;
  country: string;
  image_url: string;
}

/**
 * Shape of the JSON from GET /player/{id}/games
 */
export interface GamesResponse {
  resultSets: ResultSet[];
}
