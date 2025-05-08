import { getHotColdStreak } from '@/app/utils/playerStats';
import { AdvancedStats } from '@/types/api';
import { HotStreakPrefs } from '@/types/heatIndex';

describe('getHotColdStreak()', () => {
  // Create mock stats with all values at 0
  const emptyStats: AdvancedStats = {
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

  // Create mock stats with all values at their maximum
  const maxStats: AdvancedStats = {
    ...emptyStats,
    pts: 50,
    ast: 12,
    reb: 15,
    oreb: 5,
    dreb: 10,
    stl: 5,
    blk: 5,
    tov: 6,
    pf: 6,
    plus_minus: 20,
    ts: 75,
    efg: 70,
    fgp: 65,
    tpp: 50,
    ftp: 100,
    ast_to_tov: 5
  };

  const defaultPrefs: HotStreakPrefs = {
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
    ast_to_tov: 1,
    gamesWindow: 5
  };

  it('identifies hot streak', async () => {
    const result = await getHotColdStreak(
      defaultPrefs,
      emptyStats,  // Season averages at minimum
      maxStats     // Recent games at maximum
    );

    expect(result.status).toBe('Hot');
    expect(result.difference).toBeGreaterThan(5);
  });

  it('identifies cold streak', async () => {
    const result = await getHotColdStreak(
      defaultPrefs,
      maxStats,    // Season averages at maximum
      emptyStats   // Recent games at minimum
    );

    expect(result.status).toBe('Cold');
    expect(result.difference).toBeLessThan(-5);
  });

  it('identifies neutral streak', async () => {
    const result = await getHotColdStreak(
      defaultPrefs,
      emptyStats,  // Season averages at minimum
      emptyStats   // Recent games at minimum
    );

    expect(result.status).toBe('Neutral');
    expect(result.difference).toBe(0);
  });

  it('handles missing data', async () => {
    const result = await getHotColdStreak(
      defaultPrefs,
      {} as AdvancedStats,
      {} as AdvancedStats
    );

    expect(result.status).toBe('No Data');
    expect(result.difference).toBe(0);
  });

  it('handles error cases', async () => {
    // @ts-ignore - Testing invalid input
    const result = await getHotColdStreak(
      {} as HotStreakPrefs,
      emptyStats,
      maxStats
    );

    expect(result.status).toBe('Error');
    expect(result.difference).toBe(0);
  });
}); 