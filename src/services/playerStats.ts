import { AdvancedStats, BoxStats, GameLog } from "@/types/api";

export const trueShooting = (pts: number, fgm: number, fta: number) =>
  pts / (2 * (fgm + 0.44 * fta));

export const effectiveFg = (fgm: number, fg3m: number, fga: number) =>
  (fgm + 0.5 * fg3m) / fga;

/** Convert NBA "MIN" field to decimal minutes (e.g. "34:12" → 34.2). */
export const parseMinutes = (raw: unknown): number => {
  if (raw === null || raw === undefined) return 0;

  /* ---------- 1. Input is already a number ---------- */
  // Reject NaN and negative values; keep 0-48+ as-is.
  if (typeof raw === 'number') {
    return isFinite(raw) && raw >= 0 ? raw : 0;
  }

  const str = String(raw).trim();

  /* ---------- 2. Plain integer string ---------- */
  if (/^\d+$/.test(str)) {
    return Number(str);              // "23" => 23
  }

  /* ---------- 3. Colon formats ---------- */
  // Accept mm:ss  (e.g. 12:45)  or  h:mm:ss  (e.g. 1:02:30)
  if (/^\d+:\d{1,2}(:\d{2})?$/.test(str)) {
    const parts = str.split(':').map(Number);      // ["34","12"] → [34,12]

    let hours = 0, minutes = 0, seconds = 0;
    if (parts.length === 3) {          // h:mm:ss
      [hours, minutes, seconds] = parts;
    } else {                           // mm:ss
      [minutes, seconds] = parts;
    }

    return hours * 60 + minutes + seconds / 60;
  }

  /* ---------- 4. Everything else ---------- */
  // "DNP", "—", empty, garbage ⇒ 0
  return 0;
};



export const normalizeGameLog = (raw: Record<string, unknown>): GameLog => {
  return {
    PTS: Number(raw["PTS"]) || 0,
    AST: Number(raw["AST"]) || 0,
    REB: Number(raw["REB"]) || 0,
    FGM: Number(raw["FGM"]) || 0,
    FGA: Number(raw["FGA"]) || 0,
    FG3M: Number(raw["FG3M"]) || 0,
    FG3A: Number(raw["FG3A"]) || 0,
    FTM: Number(raw["FTM"]) || 0,
    FTA: Number(raw["FTA"]) || 0,
    STL: Number(raw["STL"]) || 0,
    BLK: Number(raw["BLK"]) || 0,
    TOV: Number(raw["TOV"]) || 0,
    PLUS_MINUS:
      raw["PLUS_MINUS"] !== undefined ? Number(raw["PLUS_MINUS"]) : undefined,
    MIN: parseMinutes(raw["MIN"]),
    GAME_DATE : String(raw["GAME_DATE"] ?? ''),
    MATCHUP   : String(raw["MATCHUP"]   ?? ''),
    WL        : String(raw["WL"]        ?? ''),
    FG_PCT    : Number(raw["FG_PCT"]    ?? 0),
    FG3_PCT   : Number(raw["FG3_PCT"]   ?? 0),
    FT_PCT    : Number(raw["FT_PCT"]    ?? 0),
  };
};

export const getAverages = (games: GameLog[]): AdvancedStats => {
  const totals = {
    pts: 0,
    ast: 0,
    reb: 0,
    oreb: 0,
    dreb: 0,
    fgm: 0,
    fga: 0,
    fg3m: 0,
    fg3a: 0,
    ftm: 0,
    fta: 0,
    stl: 0,
    blk: 0,
    tov: 0,
    pf: 0,
    plus_minus: 0,
    minutes: 0,
  };

  for (const g of games) {
    totals.pts += g.PTS;
    totals.ast += g.AST;
    totals.reb += g.REB;
    totals.oreb += g.OREB ?? 0;
    totals.dreb += g.DREB ?? 0;
    totals.fgm += g.FGM;
    totals.fga += g.FGA;
    totals.fg3m += g.FG3M;
    totals.fg3a += g.FG3A;
    totals.ftm += g.FTM;
    totals.fta += g.FTA;
    totals.stl += g.STL;
    totals.blk += g.BLK;
    totals.tov += g.TOV;
    totals.pf += g.PF ?? 0;
    totals.plus_minus += g.PLUS_MINUS ?? 0;
    totals.minutes += g.MIN;
  }

  const c = games.length || 1;

  const box: BoxStats = {
    pts: totals.pts / c,
    ast: totals.ast / c,
    reb: totals.reb / c,
    oreb: totals.oreb / c,
    dreb: totals.dreb / c,
    fgm: totals.fgm / c,
    fga: totals.fga / c,
    fgp: totals.fga ? (totals.fgm / totals.fga) * 100 : 0,
    fg3m: totals.fg3m / c,
    fg3a: totals.fg3a / c,
    tpp: totals.fg3a ? (totals.fg3m / totals.fg3a) * 100 : 0,
    ftm: totals.ftm / c,
    fta: totals.fta / c,
    ftp: totals.fta ? (totals.ftm / totals.fta) * 100 : 0,
    stl: totals.stl / c,
    blk: totals.blk / c,
    tov: totals.tov / c,
    pf: totals.pf / c,
    plus_minus: totals.plus_minus / c,
    minutes: totals.minutes / c,
  };

  const tsDen = box.fgm + 0.44 * box.fta;

  const finalStats: AdvancedStats = {
    ...box,
    ts: tsDen ? trueShooting(box.pts, box.fgm, box.fta) * 100 : 0, // % True Shooting
    efg: box.fga ? effectiveFg(box.fgm, box.fg3m, box.fga) * 100 : 0, // % Effective FG
  };

  return finalStats;
};

