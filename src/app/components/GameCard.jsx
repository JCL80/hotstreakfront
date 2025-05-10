import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { pct, num } from "@/app/utils/format";
  import { trueShooting, effectiveFg } from "@/services/playerStats";
  
  export default function GameCard({ game }) {
    const rebDisplay = `${game.REB} (${game.OREB || 0})`;
    
    // Calculate TS% and eFG% using the service methods
    const tsPct = trueShooting(game.PTS, game.FGA, game.FTA) * 100;
    const efgPct = effectiveFg(game.FGM, game.FG3M, game.FGA) * 100;
    const astToTovDisplay = game.AST && game.TOV ? (game.AST / game.TOV).toFixed(2) : "N/A";
  
    const mainStats = [
      ["MIN", num(game.MIN, 0)],
      ["PTS", num(game.PTS, 0)],
      ["REB (O)", rebDisplay],
      ["AST", num(game.AST, 0)],
      ["STL", num(game.STL, 0)],
      ["BLK", num(game.BLK, 0)],
      ["+/-", num(game.PLUS_MINUS, 0)],
      ["TOV", num(game.TOV, 0)],
      ["PF", num(game.PF, 0)],
    ];
  
    const shootingStats = [
      ["FG", `${game.FGM}/${game.FGA}`],
      ["FG%", pct(game.FG_PCT * 100)],
      ["3P", `${game.FG3M}/${game.FG3A}`],
      ["3P%", pct(game.FG3_PCT * 100)],
      ["FT", `${game.FTM}/${game.FTA}`],
      ["FT%", pct(game.FT_PCT * 100)],
      ["TS%", pct(tsPct)],
      ["eFG%", pct(efgPct)],
      ["AST/TO", astToTovDisplay],
    ];
  
    return (
      <Card className="border border-muted hover:shadow-md transition">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-base font-semibold">{game.GAME_DATE}</CardTitle>
          <CardDescription className="text-xs">
            {game.MATCHUP}
            <span
              className={`ml-1 font-medium ${
                game.WL === "W" ? "text-green-500" : "text-red-500"
              }`}
            >
              ({game.WL})
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Grid */}
          <div className="grid grid-cols-5 gap-2 text-center">
            {mainStats.map(([label, value]) => (
              <div key={label} className="flex flex-col items-center">
                <span className="font-bold text-sm">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
  
          {/* Shooting Grid */}
          <div className="grid grid-cols-5 gap-2 text-center">
            {shootingStats.map(([label, value]) => (
              <div key={label} className="flex flex-col items-center">
                <span className="font-bold text-sm">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  