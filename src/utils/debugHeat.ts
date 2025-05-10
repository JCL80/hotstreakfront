import { STAT_KEYS, STAT_MIN_MAX, NEGATIVE_STATS } from '@/constants/statKeys';
import type { AdvancedStats } from '@/types/api';
import type { HeatWeights }   from '@/types/heatIndex';

/** Returns an array of {key, raw, min, max, norm, weight, contribution}. */
export function explainHeatIndex(
  stats:   AdvancedStats,
  weights: HeatWeights,
) {
  const rows = [];

  for (const key of STAT_KEYS) {
    const raw     = stats[key] ?? 0;
    const weight  = weights[key] ?? 0;
    const [min, max] = STAT_MIN_MAX[key];

    let norm = 0;
    if (NEGATIVE_STATS.has(key))       norm = 1 - Math.min(raw / max, 1);
    else                               norm = Math.min((raw - min) / (max - min), 1);

    const contribution = norm * weight;

    rows.push({ key, raw, min, max, norm: +norm.toFixed(3), weight, contribution: +contribution.toFixed(3) });
  }

  const totalWeight = Object.values(weights).reduce((s, w) => s + w, 0);
  const score       = totalWeight === 0
        ? 0
        : Math.round(100 * rows.reduce((s, r) => s + r.contribution, 0) / totalWeight);

  return { rows, totalWeight, score };
}
