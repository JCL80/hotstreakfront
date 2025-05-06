export const pct = (n: number | undefined) =>
  isFinite(n!) ? `${n!.toFixed(1)}%` : "—";

export const num = (n: number | undefined, d = 1) =>
  isFinite(n!) ? n!.toFixed(d) : "—";

export const ftPct = (ftm?: number, fta?: number) =>
    fta && fta > 0 ? pct((ftm! / fta) * 100) : "—";
  