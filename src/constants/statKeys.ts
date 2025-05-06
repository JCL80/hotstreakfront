export const STAT_KEYS = [
  'pts',        // points
  'ts',         // true shooting %
  'efg',        // effective FG%
  'fgp',        // raw FG%
  'tpp',        // 3-Point %
  'ftp',        // Free Throw %
  'ast',        // assists
  'reb',        // total rebounds
  'oreb',       // offensive boards
  'dreb',       // defensive boards
  'stl',        // steals
  'blk',        // blocks
  'tov',        // turnovers (negative)
  'pf',         // personal fouls (negative)
  'plus_minus', // raw +/-­
] as const

export const STAT_LABELS: Record<StatKey, string> = {
  pts:         'Points',
  ts:          'True Shooting %',
  efg:         'Effective FG%',
  fgp:         'Field Goal %',
  tpp:         '3-Point %',
  ftp:         'Free Throw %',
  ast:         'Assists',
  reb:         'Rebounds',
  oreb:        'Offensive Rebounds',
  dreb:        'Defensive Rebounds',
  stl:         'Steals',
  blk:         'Blocks',
  tov:         'Turnovers',
  pf:          'Fouls',
  plus_minus:  'Plus-Minus',
}

export type StatKey = typeof STAT_KEYS[number]

// constants/statKeys.ts

export const STAT_MIN_MAX: Record<StatKey, [number, number]> = {
  pts:         [0,  50],
  ts:          [0.40,0.75],
  efg:         [0.35,0.70],
  fgp:         [0.35,0.65],
  tpp:         [0.25,0.50],
  ftp:         [0.50,1.00],
  ast:         [0,  12],
  reb:         [0,  15],
  oreb:        [0,   5],
  dreb:        [0,  10],
  stl:         [0,   5],
  blk:         [0,   5],
  tov:         [0,   6],
  pf:          [0,   6],
  plus_minus:  [-20,20],
}

export const NEGATIVE_STATS = new Set<StatKey>([
  'tov','pf'
])
