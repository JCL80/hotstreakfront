import { normalizeGameLog } from '@/services/playerStats';

describe('normalizeGameLog()', () => {
  it('normalizes valid game data', () => {
    const rawGame = {
      PTS: "25",
      AST: "5",
      REB: "10",
      FGM: "10",
      FGA: "20",
      FG3M: "3",
      FG3A: "8",
      FTM: "2",
      FTA: "2",
      STL: "1",
      BLK: "2",
      TOV: "3",
      PLUS_MINUS: "+10",
      MIN: "34:12",
      GAME_DATE: "2024-01-01",
      MATCHUP: "LAL vs. BOS",
      WL: "W",
      FG_PCT: "50.0",
      FG3_PCT: "37.5",
      FT_PCT: "100.0",
      OREB: "2",
      DREB: "8",
      PF: "3",
      PLAYOFF: "false"
    };

    const normalized = normalizeGameLog(rawGame);

    expect(normalized).toEqual({
      PTS: 25,
      AST: 5,
      REB: 10,
      FGM: 10,
      FGA: 20,
      FG3M: 3,
      FG3A: 8,
      FTM: 2,
      FTA: 2,
      STL: 1,
      BLK: 2,
      TOV: 3,
      PLUS_MINUS: 10,
      MIN: 34.2,
      GAME_DATE: "2024-01-01",
      MATCHUP: "LAL vs. BOS",
      WL: "W",
      FG_PCT: 50.0,
      FG3_PCT: 37.5,
      FT_PCT: 100.0,
      OREB: 2,
      DREB: 8,
      PF: 3,
      PLAYOFF: false
    });
  });

  it('handles missing or invalid data', () => {
    const rawGame = {
      PTS: "invalid",
      AST: undefined,
      MIN: "DNP",
      GAME_DATE: null,
      MATCHUP: undefined
    };

    const normalized = normalizeGameLog(rawGame);

    expect(normalized).toEqual({
      PTS: 0,
      AST: 0,
      REB: 0,
      FGM: 0,
      FGA: 0,
      FG3M: 0,
      FG3A: 0,
      FTM: 0,
      FTA: 0,
      STL: 0,
      BLK: 0,
      TOV: 0,
      PLUS_MINUS: undefined,
      MIN: 0,
      GAME_DATE: "",
      MATCHUP: "",
      WL: "",
      FG_PCT: 0,
      FG3_PCT: 0,
      FT_PCT: 0,
      PLAYOFF: false
    });
  });

  it('handles different minute formats', () => {
    const testCases = [
      { input: "34:12", expected: 34.2 },
      { input: "1:02:30", expected: 62.5 },
      { input: "48", expected: 48 },
      { input: "DNP", expected: 0 },
      { input: "DNP-CD", expected: 0 },
      { input: "—", expected: 0 },
      { input: "", expected: 0 },
      { input: undefined, expected: 0 }
    ];

    testCases.forEach(({ input, expected }) => {
      const normalized = normalizeGameLog({ MIN: input });
      expect(normalized.MIN).toBe(expected);
    });
  });
}); 