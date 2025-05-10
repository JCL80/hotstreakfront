import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { pct, num, ftPct } from "@/app/utils/format";
  
  export default function ComparisonCard({ seasonAverages, lastNGamesAvg, prefs, heatIndexes }) {
    console.log("seasonAverages", seasonAverages) 
    console.log("lastNGamesAvg", lastNGamesAvg)
    const formatReb = (reb, oreb) => `${num(reb)} (${num(oreb || 0)})`;
    const formatMadeAttempt = (made, attempt) => `${num(made)}/${num(attempt)}`;
  
    const buildStats = (averages) => ({
      main: [
        ["MIN", num(averages.minutes)],
        ["PTS", num(averages.pts)],
        ["REB (O)", formatReb(averages.reb, averages.oreb)],
        ["AST", num(averages.ast)],
        ["STL", num(averages.stl)],
        ["BLK", num(averages.blk)],
        ["+/-", num(averages.plus_minus, 2)],
        ["TOV", num(averages.tov)],
        ["PF", num(averages.pf)],
      ],
      shooting: [
        ["FG", formatMadeAttempt(averages.fgm, averages.fga)],
        ["FG%", pct(averages.fgp * 100)],
        ["3P", formatMadeAttempt(averages.fg3m, averages.fg3a)],
        ["3P%", pct(averages.tpp * 100)],
        ["FT", formatMadeAttempt(averages.ftm, averages.fta)],
        ["FT%", ftPct(averages.ftm, averages.fta)],
        ["TS%", pct(averages.ts * 100)],
        ["eFG%", pct(averages.efg * 100)],
        ["AST/TO", num(averages.ast_to_tov, 2)],
      ],
    });
  
    const seasonStats = buildStats(seasonAverages);
    const lastNStats = buildStats(lastNGamesAvg);

    // Helper function to check if a stat is used in heat index
    const isStatUsed = (label) => {
      const statMap = {
        'PTS': 'pts',
        'REB (O)': 'reb',
        'AST': 'ast',
        'STL': 'stl',
        'BLK': 'blk',
        '+/-': 'plus_minus',
        'TOV': 'tov',
        'PF': 'pf',
        'FG%': 'fgp',
        '3P%': 'tpp',
        'FT%': 'ftp',
        'TS%': 'ts',
        'eFG%': 'efg',
        'AST/TO': 'ast_to_tov'
      };
      const statKey = statMap[label];
      return statKey && prefs[statKey] > 0;
    };
  
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {/* Season Averages */}
        <Card>
          <CardHeader>
            <CardTitle>Season Averages</CardTitle>
            <CardDescription>
              Overall performance this season
              <div className="mt-1 text-sm font-medium">
                Heat Index: {num(heatIndexes.season, 2)}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Stats */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {seasonStats.main.map(([label, value]) => (
                <div key={label} className={`flex flex-col items-center ${isStatUsed(label) ? 'bg-orange-50 rounded-lg p-1' : ''}`}>
                  <span className="font-bold text-sm">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
  
            {/* Shooting Stats */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {seasonStats.shooting.map(([label, value]) => (
                <div key={label} className={`flex flex-col items-center ${isStatUsed(label) ? 'bg-orange-50 rounded-lg p-1' : ''}`}>
                  <span className="font-bold text-sm">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
  
        {/* Last N Games */}
        <Card>
          <CardHeader>
            <CardTitle>Last Games</CardTitle>
            <CardDescription>
              Recent trend analysis
              <div className="mt-1 text-sm font-medium">
                Heat Index: {num(heatIndexes.lastN, 2)}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Stats */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {lastNStats.main.map(([label, value]) => (
                <div key={label} className={`flex flex-col items-center ${isStatUsed(label) ? 'bg-orange-50 rounded-lg p-1' : ''}`}>
                  <span className="font-bold text-sm">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
  
            {/* Shooting Stats */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {lastNStats.shooting.map(([label, value]) => (
                <div key={label} className={`flex flex-col items-center ${isStatUsed(label) ? 'bg-orange-50 rounded-lg p-1' : ''}`}>
                  <span className="font-bold text-sm">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  