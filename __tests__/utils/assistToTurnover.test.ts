import { assistToTurnover } from '@/services/playerStats';

describe('assistToTurnover()', () => {
  it('calculates correct ratio', () => {
    expect(assistToTurnover(10, 2)).toBe(5);
    expect(assistToTurnover(5, 1)).toBe(5);
    expect(assistToTurnover(0, 5)).toBe(0);
  });

  it('handles zero turnovers', () => {
    expect(assistToTurnover(5, 0)).toBe(0);
    expect(assistToTurnover(0, 0)).toBe(0);
  });

  it('handles negative values', () => {
    expect(assistToTurnover(-5, 2)).toBe(-2.5);
    expect(assistToTurnover(5, -2)).toBe(-2.5);
  });
}); 