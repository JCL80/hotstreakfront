// __tests__/utils/getAverages.test.ts
import { getAverages } from '@/services/playerStats';
import { g1, g2 } from '../fixtures/twoGames';

describe('getAverages()', () => {
  const avg = getAverages([g1, g2]);   // 2-game sample

  it('computes counting averages', () => {
    expect(avg.pts).toBe(25);        // (20+30)/2
    expect(avg.plus_minus).toBe(1);  // (5 + -3)/2
  });

  it('derives shooting percentages', () => {
    // fgp = total FGM / total FGA
    const expFGP = (g1.FGM + g2.FGM) / (g1.FGA + g2.FGA) * 100;
    expect(avg.fgp).toBeCloseTo(expFGP, 4);

    const expTpp = (g1.FG3M + g2.FG3M) / (g1.FG3A + g2.FG3A) * 100;
    expect(avg.tpp).toBeCloseTo(expTpp, 4);
  });

  it('includes advanced rates in 0-100 range', () => {
    expect(avg.ts).toBeGreaterThanOrEqual(0);
    expect(avg.ts).toBeLessThanOrEqual(100);
    expect(avg.efg).toBeGreaterThanOrEqual(0);
    expect(avg.efg).toBeLessThanOrEqual(100);
  });

  it('avoids divide-by-zero when FGA / FTA = 0', () => {
    const zeroGame = { ...g1, FGA: 0, FG3A: 0, FTA: 0, FGM: 0, FG3M: 0, FTM: 0 };
    const res = getAverages([zeroGame]);
    expect(res.fgp).toBe(0);
    expect(res.tpp).toBe(0);
    expect(isFinite(res.ts)).toBe(true);
  });
});
