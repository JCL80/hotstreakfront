/* eslint-disable @typescript-eslint/no-unused-vars */

import { AdvancedStats } from "@/types/api";
import { HeatWeights, HotStreakPrefs } from "@/types/heatIndex";
import { STAT_KEYS , STAT_MIN_MAX , NEGATIVE_STATS} from "../../constants/statKeys";


export function calculateHeatIndex(
  stats: AdvancedStats,
  weights: HeatWeights
): number {
  // If no weights are provided, return 0
  if (!weights || Object.keys(weights).length === 0) {
    return 0
  }

  // Check if all stats are at minimum
  const isAllMin = Object.entries(stats).every(([key, value]) => {
    if (!(key in STAT_MIN_MAX)) return true // Skip stats not in STAT_MIN_MAX
    const [min, _] = STAT_MIN_MAX[key as keyof typeof STAT_MIN_MAX]
    return value === min || value === 0
  })

  if (isAllMin) {
    return 0
  }

  // Check if all stats are at or near maximum
  const isAllMax = Object.entries(stats).every(([key, value]) => {
    if (!(key in STAT_MIN_MAX)) return true // Skip stats not in STAT_MIN_MAX
    const [_, max] = STAT_MIN_MAX[key as keyof typeof STAT_MIN_MAX]
    
    // For percentage stats, check if value is at or above max
    if (['ts', 'efg', 'fgp', 'tpp', 'ftp'].includes(key)) {
      return value >= max * 0.9 // Allow for small variations
    }
    
    // For negative stats, 0 is best
    if (NEGATIVE_STATS.has(key as keyof typeof STAT_MIN_MAX)) {
      return value <= max * 0.1 // Allow for small variations
    }
    
    // For other stats, check if value is at or above max
    return value >= max * 0.9 // Allow for small variations
  })

  if (isAllMax) {
    return 100
  }

  let weightedSum = 0
  let totalWeight = 0

  for (const key of STAT_KEYS) {
    const rawValue = stats[key] ?? 0
    const [min, max] = STAT_MIN_MAX[key]
    
    // Calculate how good the stat is (0 to 1)
    let normalizedValue
    if (NEGATIVE_STATS.has(key)) {
      // For negative stats (turnovers, fouls), 0 is best
      normalizedValue = 1 - Math.min(rawValue / max, 1)
    } else if (['ts', 'efg', 'fgp', 'tpp', 'ftp'].includes(key)) {
      // For percentage stats, normalize based on min/max
      normalizedValue = Math.min((rawValue - min) / (max - min), 1)
    } else {
      // For other stats, normalize based on min/max
      normalizedValue = Math.min((rawValue - min) / (max - min), 1)
    }

    // Keep value between 0 and 1
    normalizedValue = Math.min(Math.max(normalizedValue, 0), 1)

    // Add weighted contribution
    const weight = weights[key] ?? 0
    weightedSum += normalizedValue * weight
    totalWeight += weight
  }

  // If all weights are 0, return 0
  if (totalWeight === 0) {
    return 0
  }

  // Calculate final score (0 to 100)
  const average = weightedSum / totalWeight
  return Math.round(average * 100)
}

export const getHotColdStreak = async (
  prefs: HotStreakPrefs,
  seasonAverages: AdvancedStats | null,
  lastNGamesAvg: AdvancedStats | null
): Promise<{
  status: string
  difference: number
}> => {
  // Handle missing data first
  if (!seasonAverages || !lastNGamesAvg || !prefs || Object.keys(seasonAverages).length === 0 || Object.keys(lastNGamesAvg).length === 0) {
    return {
      status: 'No Data',
      difference: 0,
    }
  }

  try {
    const { gamesWindow, ...weights } = prefs
    
    // Check if weights are valid
    if (Object.keys(weights).length === 0) {
      return {
        status: 'Error',
        difference: 0,
      }
    }
    
    // Calculate heat indexes
    const seasonHeat = calculateHeatIndex(seasonAverages, weights)
    const recentHeat = calculateHeatIndex(lastNGamesAvg, weights)
    const difference = Math.round((recentHeat - seasonHeat) * 10) / 10

    // Determine hot/cold status
    let status
    if (difference > 5) status = 'Hot'
    else if (difference < -5) status = 'Cold'
    else status = 'Neutral'

    return { status, difference }
  } catch (err) {
    console.error('Hot/cold streak error:', err)
    return {
      status: 'Error',
      difference: 0,
    }
  }
}

