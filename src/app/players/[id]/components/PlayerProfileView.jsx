"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatComparisonChart from "@/app/components/StatComparisonChart";
import StatsChangesTable from "@/app/components/StatChangesTable";
import StatHorizontalComparison from "@/app/components/StatHorizontalComparison";
import LatestGamesCards from "@/app/components/LatestGamesCards";
import PlayerInfo from "@/app/components/PlayerInfo";
import ComparisonCard from "@/app/components/ComparisonCard";
import { Flame, Snowflake, TrendingUp } from "lucide-react";

export default function PlayerProfileView({
  playerBio,
  hotColdStreak,
  seasonAverages,
  lastNGamesAvg,
  recentGames,
  prefs,
  heatIndexes,
}) {

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player Info */}
          <PlayerInfo playerBio={playerBio} />

          {/* Heat Index Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card
              className={`border-2 ${
                hotColdStreak.status === "Hot"
                  ? "border-red-500/20 hover:border-red-500/40"
                  : hotColdStreak.status === "Cold"
                  ? "border-blue-500/20 hover:border-blue-500/40"
                  : "border-muted"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {hotColdStreak.status === "Hot" ? (
                    <>
                      <Flame className="w-5 h-5 text-orange-500" />
                      Hot Streak
                    </>
                  ) : hotColdStreak.status === "Cold" ? (
                    <>
                      <Snowflake className="w-5 h-5 text-blue-500" />
                      Cold Streak
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5 text-muted-foreground" />
                      📊 Neutral
                    </>
                  )}
                  <span className="text-sm font-normal text-muted-foreground">
                    (Difference: {hotColdStreak.difference})
                  </span>
                </CardTitle>
                <CardDescription>
                  {hotColdStreak.status === "Hot"
                    ? "Player is currently performing above their season average"
                    : hotColdStreak.status === "Cold"
                    ? "Player is currently performing below their season average"
                    : "Player performance is stable compared to season average"}
                </CardDescription>
              </CardHeader>
            </Card>
            <ComparisonCard
              seasonAverages={seasonAverages}
              lastNGamesAvg={lastNGamesAvg}
              prefs={prefs}
              heatIndexes={heatIndexes}
            />
          </div>
        </div>
        <div className="mt-8">
          <StatHorizontalComparison
            seasonAverages={seasonAverages}
            lastNGamesAvg={lastNGamesAvg}
          />
        </div>

        <div className="mt-12 mb-4">
          <h2 className="text-2xl font-bold mb-1">Latest Games Played</h2>
          <p className="text-muted-foreground text-sm">
            Breakdown of performance in the most recent {recentGames.length}{" "}
            games.
          </p>
        </div>

        {/* Mini Game Cards */}
        <LatestGamesCards recentGames={recentGames} />

        <div className="mt-12 mb-4">
          <h2 className="text-2xl font-bold mb-1">Comparison</h2>
          <p className="text-muted-foreground text-sm">
            Basic chart for ups and downs
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Stat Comparison</CardTitle>
              <CardDescription>
                Compare season averages with recent performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StatComparisonChart 
                seasonAverages={seasonAverages}
                lastNGamesAvg={lastNGamesAvg}
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 mb-4">
          <p className="text-muted-foreground text-sm">
            Simple ups and downs aggregation table
          </p>
        </div>
        <StatsChangesTable 
          seasonAverages={seasonAverages}
          lastNGamesAvg={lastNGamesAvg}
        />
      </div>
    </div>
  );
}
