import { getAverages } from '@/services/playerStats';
import { jokicGames, expectedJokicAverages } from '../../__fixtures__/realisticGames';

describe('getAverages() with realistic NBA data', () => {
  const actualAverages = getAverages(jokicGames);
  
  // Log the full actual and expected averages for comparison
  console.log('\nFull Stats Comparison:');
  console.log('=====================');
  Object.keys(expectedJokicAverages).forEach(key => {
    const actual = actualAverages[key as keyof typeof actualAverages];
    const expected = expectedJokicAverages[key as keyof typeof expectedJokicAverages];
    if (actual !== undefined) {
      console.log(`${key}:`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Actual:   ${actual}`);
      console.log(`  Diff:     ${(actual - expected).toFixed(2)}`);
      console.log('---------------------');
    }
  });

  describe('Basic counting stats', () => {
    it('calculates points per game correctly', () => {
      console.log('\nPoints per game:');
      console.log(`Expected: ${expectedJokicAverages.pts}`);
      console.log(`Actual:   ${actualAverages.pts}`);
      expect(actualAverages.pts).toBeCloseTo(expectedJokicAverages.pts, 1);
    });

    it('calculates assists per game correctly', () => {
      console.log('\nAssists per game:');
      console.log(`Expected: ${expectedJokicAverages.ast}`);
      console.log(`Actual:   ${actualAverages.ast}`);
      expect(actualAverages.ast).toBeCloseTo(expectedJokicAverages.ast, 1);
    });

    it('calculates rebounds per game correctly', () => {
      console.log('\nRebounds per game:');
      console.log(`Expected: ${expectedJokicAverages.reb}`);
      console.log(`Actual:   ${actualAverages.reb}`);
      expect(actualAverages.reb).toBeCloseTo(expectedJokicAverages.reb, 1);
    });

    it('calculates minutes per game correctly', () => {
      console.log('\nMinutes per game:');
      console.log(`Expected: ${expectedJokicAverages.minutes}`);
      console.log(`Actual:   ${actualAverages.minutes}`);
      expect(actualAverages.minutes).toBeCloseTo(expectedJokicAverages.minutes, 1);
    });
  });

  describe('Shooting percentages', () => {
    it('calculates field goal percentage correctly', () => {
      console.log('\nField Goal %:');
      console.log(`Expected: ${expectedJokicAverages.fgp}`);
      console.log(`Actual:   ${actualAverages.fgp}`);
      expect(actualAverages.fgp).toBeCloseTo(expectedJokicAverages.fgp, 0);
    });

    it('calculates three-point percentage correctly', () => {
      console.log('\nThree Point %:');
      console.log(`Expected: ${expectedJokicAverages.tpp}`);
      console.log(`Actual:   ${actualAverages.tpp}`);
      expect(actualAverages.tpp).toBeCloseTo(expectedJokicAverages.tpp, 0);
    });

    it('calculates free throw percentage correctly', () => {
      console.log('\nFree Throw %:');
      console.log(`Expected: ${expectedJokicAverages.ftp}`);
      console.log(`Actual:   ${actualAverages.ftp}`);
      expect(actualAverages.ftp).toBeCloseTo(expectedJokicAverages.ftp, 0);
    });
  });

  describe('Advanced metrics', () => {
    it('calculates true shooting percentage correctly', () => {
      console.log('\nTrue Shooting %:');
      console.log(`Expected: ${expectedJokicAverages.ts}`);
      console.log(`Actual:   ${actualAverages.ts}`);
      expect(actualAverages.ts).toBeCloseTo(expectedJokicAverages.ts, 0);
    });

    it('calculates effective field goal percentage correctly', () => {
      console.log('\nEffective FG %:');
      console.log(`Expected: ${expectedJokicAverages.efg}`);
      console.log(`Actual:   ${actualAverages.efg}`);
      expect(actualAverages.efg).toBeCloseTo(expectedJokicAverages.efg, 0);
    });

    it('calculates assist-to-turnover ratio correctly', () => {
      console.log('\nAssist/Turnover Ratio:');
      console.log(`Expected: ${expectedJokicAverages.ast_to_tov}`);
      console.log(`Actual:   ${actualAverages.ast_to_tov}`);
      expect(actualAverages.ast_to_tov).toBeCloseTo(expectedJokicAverages.ast_to_tov, 1);
    });
  });

  describe('Other stats', () => {
    it('calculates plus/minus correctly', () => {
      console.log('\nPlus/Minus:');
      console.log(`Expected: ${expectedJokicAverages.plus_minus}`);
      console.log(`Actual:   ${actualAverages.plus_minus}`);
      expect(actualAverages.plus_minus).toBeCloseTo(expectedJokicAverages.plus_minus, 1);
    });

    it('calculates steals and blocks correctly', () => {
      console.log('\nSteals and Blocks:');
      console.log('Steals:');
      console.log(`Expected: ${expectedJokicAverages.stl}`);
      console.log(`Actual:   ${actualAverages.stl}`);
      console.log('Blocks:');
      console.log(`Expected: ${expectedJokicAverages.blk}`);
      console.log(`Actual:   ${actualAverages.blk}`);
      expect(actualAverages.stl).toBeCloseTo(expectedJokicAverages.stl, 1);
      expect(actualAverages.blk).toBeCloseTo(expectedJokicAverages.blk, 1);
    });

    it('calculates turnovers correctly', () => {
      console.log('\nTurnovers:');
      console.log(`Expected: ${expectedJokicAverages.tov}`);
      console.log(`Actual:   ${actualAverages.tov}`);
      expect(actualAverages.tov).toBeCloseTo(expectedJokicAverages.tov, 1);
    });
  });
}); 