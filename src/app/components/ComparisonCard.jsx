import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { pct, num, ftPct } from "@/app/utils/format";
  
  export default function ComparisonCard({ seasonAverages, lastNGamesAvg }) {
    // console.log("comparison card ****");
    // console.log("Season avg", seasonAverages);
    // console.log("last n ga", lastNGamesAvg);
  
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
        ["FG%", pct(averages.fgp)],
        ["3P", formatMadeAttempt(averages.fg3m, averages.fg3a)],
        ["3P%", pct(averages.tpp)],
        ["FT", formatMadeAttempt(averages.ftm, averages.fta)],
        ["FT%", ftPct(averages.ftm, averages.fta)],
        // ["TS%", averages.ts_pct ? (averages.ts_pct * 100).toFixed(1) : "N/A"], // Uncomment if you want TS%
      ],
    });
  
    const seasonStats = buildStats(seasonAverages);
    const lastNStats = buildStats(lastNGamesAvg);
  
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {/* Season Averages */}
        <Card>
          <CardHeader>
            <CardTitle>Season Averages</CardTitle>
            <CardDescription>Overall performance this season</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Stats */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {seasonStats.main.map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="font-bold text-sm">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
  
            {/* Shooting Stats */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {seasonStats.shooting.map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
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
            <CardDescription>Recent trend analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Stats */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {lastNStats.main.map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="font-bold text-sm">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
  
            {/* Shooting Stats */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {lastNStats.shooting.map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
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
  