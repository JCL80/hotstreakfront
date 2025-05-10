import { calculateHeatIndex } from '@/app/utils/playerStats';
import { STAT_KEYS } from '@/constants/statKeys';
import { AdvancedStats } from '@/types/api';
import { HeatWeights } from '@/types/heatIndex';

describe('calculateHeatIndex()', () => {
  // Create a mock stats object with all stats at their minimum values
  const minStats: AdvancedStats = {
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
    fgp: 0,
    tpp: 0,
    ftp: 0,
    ts: 0,
    efg: 0,
    ast_to_tov: 0
  };

  // Create a mock stats object with all stats at their maximum values
  const maxStats: AdvancedStats = {
    ...minStats,
    pts: 48, // 96% of 50
    ast: 12, // 100% of 12
    reb: 15, // 100% of 15
    oreb: 5, // 100% of 5
    dreb: 10, // 100% of 10
    stl: 5, // 100% of 5
    blk: 5, // 100% of 5
    tov: 0, // 0% of 6 (negative stat, lower is better)
    pf: 0, // 0% of 6 (negative stat, lower is better)
    plus_minus: 20, // 100% of 20
    ts: 75, // 100% of 75
    efg: 70, // 100% of 70
    fgp: 65, // 100% of 65
    tpp: 50, // 100% of 50
    ftp: 100, // 100% of 100
    ast_to_tov: 5 // 100% of 5
  };

  // Create a mock weights object with all weights at 1
  const defaultWeights: HeatWeights = {
    pts: 1,
    ts: 1,
    efg: 1,
    fgp: 1,
    tpp: 1,
    ftp: 1,
    ast: 1,
    reb: 1,
    oreb: 1,
    dreb: 1,
    stl: 1,
    blk: 1,
    tov: 1,
    pf: 1,
    plus_minus: 1,
    ast_to_tov: 1
  };

  it('returns 0 for minimum stats', () => {
    expect(calculateHeatIndex(minStats, defaultWeights)).toBe(0);
  });

  it('returns 100 for maximum stats', () => {
    expect(calculateHeatIndex(maxStats, defaultWeights)).toBe(100);
  });

  it('handles zero weights', () => {
    // Test empty weights object (cast as HeatWeights to satisfy type checker)
    expect(calculateHeatIndex(maxStats, {} as HeatWeights)).toBe(0);

    // Test weights object with all zeros
    const zeroWeights: HeatWeights = {
      ...defaultWeights,
      pts: 0,
      ts: 0,
      efg: 0,
      fgp: 0,
      tpp: 0,
      ftp: 0,
      ast: 0,
      reb: 0,
      oreb: 0,
      dreb: 0,
      stl: 0,
      blk: 0,
      tov: 0,
      pf: 0,
      plus_minus: 0,
      ast_to_tov: 0
    };
    expect(calculateHeatIndex(maxStats, zeroWeights)).toBe(0);
  });

  it('handles mixed weights', () => {
    const mixedWeights: HeatWeights = {
      ...defaultWeights,
      pts: 2,  // Double weight for points
      tov: 0.5 // Half weight for turnovers
    };
    const result = calculateHeatIndex(maxStats, mixedWeights);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('handles negative stats correctly', () => {
    const statsWithNegatives: AdvancedStats = {
      ...minStats,
      plus_minus: -20,
      tov: 6
    };
    const result = calculateHeatIndex(statsWithNegatives, defaultWeights);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('handles missing stats', () => {
    const incompleteStats: AdvancedStats = {
      ...minStats,
      pts: 25,
      ast: 5
    };
    const result = calculateHeatIndex(incompleteStats, defaultWeights);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });
}); 