const playerIdMap = {
  237: 1966, // LeBron James
  115: 3975, // Stephen Curry
  140: 3202, // Kevin Durant
  15: 3032977, // Giannis Antetokounmpo
  246: 3112335, // Nikola Jokić
  145: 3059318, // Joel Embiid
  132: 3945274, // Luka Dončić
  168: 4065648, // Jayson Tatum
  79: 4279888, // Ja Morant
  57: 3136195, // Devin Booker
  67: 6606, // Damian Lillard
  117: 6583, // Anthony Davis
  79: 6430, // Jimmy Butler
  192: 3992, // James Harden
  274: 6450, // Kawhi Leonard
  4268: 4395628, // Zion Williamson
  79: 3908809, // Donovan Mitchell
  79: 3155526, // Jaylen Brown
  666786: 4278072, // Shai Gilgeous-Alexander
  666789: 4594268, // Anthony Edwards
  1610612754: 4396994, // Tyrese Haliburton
  666888: 4432818, // LaMelo Ball
  230: 3136197, // Karl-Anthony Towns
  444: 3913176, // Brandon Ingram
  407: 3064514, // Julius Randle
  54: 4066631, // De'Aaron Fox
  999999: 4437244, // Paolo Banchero
  555555: 3155942, // Domantas Sabonis
  305: 3102531, // Kristaps Porziņģis
  660: 3995, // Jrue Holiday
};

export const playerImageUrl = (player_id) => playerIdMap[player_id]
  ? `https://a.espncdn.com/i/headshots/nba/players/full/${playerIdMap[player_id]}.png`
  : "https://cdn.nba.com/headshots/nba/latest/1040x760/237.png"; // Fallback
