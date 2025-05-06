import { parseMinutes } from '@/services/playerStats';

describe('parseMinutes()', () => {
  it('parses mm:ss strings', () => {
    expect(parseMinutes('34:12')).toBeCloseTo(34.2);
  });

  it('parses plain integers', () => {
    expect(parseMinutes('8')).toBe(8);
  });

  it('returns 0 for DNP / blank', () => {
    expect(parseMinutes('DNP')).toBe(0);
    expect(parseMinutes('')).toBe(0);
    expect(parseMinutes(undefined)).toBe(0);
  });

  it('parses h:mm:ss strings', () => {
    expect(parseMinutes('1:02:30')).toBeCloseTo(62.5); // 60 + 2 + 30/60
  });
  
  it('handles zero-seconds format', () => {
    expect(parseMinutes('17:00')).toBe(17);
  });
  
  it('trims spaces', () => {
    expect(parseMinutes(' 8:45 ')).toBeCloseTo(8.75);
  });
  
  it('returns 0 for non-numeric garbage', () => {
    expect(parseMinutes('DNP-CD')).toBe(0);
    expect(parseMinutes('—')).toBe(0);
  });
  
  it('returns 0 for negative / NaN numeric input', () => {
    expect(parseMinutes(-5)).toBe(0);
    expect(parseMinutes(NaN)).toBe(0);
  });
  
  it('keeps large whole numbers intact', () => {
    expect(parseMinutes(48)).toBe(48);
  });
  
});
