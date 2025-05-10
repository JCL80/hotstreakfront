import type { HotStreakPrefs } from "@/types/heatIndex";

/* ------------------------------------------------------------------ */
/*  Preset A – Shooting‑centric weights                               */
/*     Heavily rewards efficiency; ignores volume/counting numbers.   */
/* ------------------------------------------------------------------ */

export const SHOOTING_PREFS: HotStreakPrefs = {
    // efficiency tilted
    ts: 2,
    efg: 1.5,
    fgp: 1,
    tpp: 1,
    ftp: 1,

    // rest zero
    pts: 0, reb: 0, ast: 0, oreb: 0, dreb: 0,
    stl: 0, blk: 0, tov: 0, pf: 0, plus_minus: 0, ast_to_tov: 0,

    gamesWindow: 5,
    playoffOnly: false,
};


/* ------------------------------------------------------------------ */
/*  Preset B – Counting‑stat weights                                  */
/*     Rewards box‑score production; efficiency set to zero.          */
/* ------------------------------------------------------------------ */

export const COUNTING_PREFS: HotStreakPrefs = {
    pts: 2,
    reb: 1.5,
    ast: 1.5,
    oreb: 1,
    dreb: 1,
    stl: 1,
    blk: 1,

    // efficiency off
    ts: 0, efg: 0, fgp: 0, tpp: 0, ftp: 0,
    tov: 0, pf: 0, plus_minus: 0, ast_to_tov: 0,

    gamesWindow: 5,
    playoffOnly: false,
};
