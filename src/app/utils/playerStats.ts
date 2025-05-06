/* eslint-disable @typescript-eslint/no-unused-vars */

import { AdvancedStats } from "@/types/api";
import { HeatWeights, HotStreakPrefs } from "@/types/heatIndex";
import { STAT_KEYS , STAT_MIN_MAX , NEGATIVE_STATS} from "../../constants/statKeys";


export function calculateHeatIndex(
  stats: AdvancedStats,
  weights: HeatWeights
): number {
  let weightedSum = 0
  let totalWeight = 0

  for (const key of STAT_KEYS) {
    const rawValue = stats[key] ?? 0
    const [min, max] = STAT_MIN_MAX[key]
    // Normalize into 0–1
    let norm = (rawValue - min) / (max - min)

    // Invert negatives
    if (NEGATIVE_STATS.has(key)) {
      norm = 1 - norm
    }

    // Clamp
    norm = Math.min(Math.max(norm, 0), 1)

    const w = weights[key] ?? 0
    weightedSum += norm * w
    totalWeight += w
  }

  // If user disabled all stats, return 0
  if (totalWeight === 0) {
    return 0
  }

  // Weighted average then scale to 0–100
  const average = weightedSum / totalWeight
  const heatIndex = Math.round(Math.min(Math.max(average * 100, 0), 100))

  return heatIndex
}

export const getHotColdStreak = async (
  prefs: HotStreakPrefs,
  seasonAverages: AdvancedStats,
  lastNGamesAvg: AdvancedStats
): Promise<{
  status: string
  difference: number
}> => {
  try {
    // console.log("****** hotcoldstreak ********")
    // console.log("seasonAverages" , seasonAverages)
    // console.log("lastNGamesAverage" , lastNGamesAvg)
    const { gamesWindow, ...weights } = prefs
  
    if (!seasonAverages || !lastNGamesAvg) {
      return {
        status: 'No Data',
        difference: 0,
      }
    }

    const seasonHeat = calculateHeatIndex(seasonAverages, weights)
    const recentHeat = calculateHeatIndex(lastNGamesAvg, weights)
    const difference = Math.round((recentHeat - seasonHeat) * 10) / 10

    const status =
      difference > 5 ? 'Hot' : difference < -5 ? 'Cold' : 'Neutral'

    return {
      status,
      difference,
    }
  } catch (err) {
    console.error('Hot/cold streak error:', err)
    return {
      status: 'Error',
      difference: 0,
    }
  }
}

