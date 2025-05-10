import { calculateHeatIndex } from '@/app/utils/playerStats';
import { stripWeights } from '@/utils/weights';     // helper we built earlier
import { AdvancedStats }      from '@/types/api';
import { jokicSeasonAvg } from '../../__fixtures__/realisticGames';
import { SHOOTING_PREFS, COUNTING_PREFS } from '@/constants/prefsSamples';

/**
 * Two meaningful prefs presets
 * 1. Shooting‑only   → emphasises TS, eFG, FG%, 3P%, FT%
 * 2. Counting stats  → emphasises PTS, REB, AST, STL, BLK
 */

describe('calculateHeatIndex snapshots', () => {
  const shootingScore = calculateHeatIndex(
    jokicSeasonAvg as AdvancedStats,
    stripWeights(SHOOTING_PREFS),
  );

  const countingScore = calculateHeatIndex(
    jokicSeasonAvg as AdvancedStats,
    stripWeights(COUNTING_PREFS),
  );

  it('matches snapshot – shooting‑only weighting', () => {
    expect(shootingScore).toMatchSnapshot();
  });

  it('matches snapshot – counting‑stats weighting', () => {
    expect(countingScore).toMatchSnapshot();
  });
});
