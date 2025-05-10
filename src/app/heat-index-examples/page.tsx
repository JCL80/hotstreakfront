import { jokicSeasonAvg } from '../../../__fixtures__/realisticGames';
import { stripWeights } from '@/utils/weights';
import { explainHeatIndex } from '@/utils/debugHeat';
import { SHOOTING_PREFS, COUNTING_PREFS } from '@/constants/prefsSamples';
import { AdvancedStats } from '@/types/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeatIndexExamples() {
  const shooting = explainHeatIndex(jokicSeasonAvg as AdvancedStats, stripWeights(SHOOTING_PREFS));
  const counting = explainHeatIndex(jokicSeasonAvg as AdvancedStats, stripWeights(COUNTING_PREFS));

  const renderTable = (title: string, data: ReturnType<typeof explainHeatIndex>) => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Total score: <span className="font-semibold text-orange-500">{data.score}</span></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Stat</th>
                <th className="text-right p-2 font-medium">Raw</th>
                <th className="text-right p-2 font-medium">Norm (0‑1)</th>
                <th className="text-right p-2 font-medium">Weight</th>
                <th className="text-right p-2 font-medium">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.filter(r => r.weight !== 0).map(r => (
                <tr key={r.key} className="border-b last:border-0 hover:bg-orange-50/50">
                  <td className="p-2">{r.key}</td>
                  <td className="p-2 text-right">{r.raw}</td>
                  <td className="p-2 text-right">{r.norm}</td>
                  <td className="p-2 text-right">{r.weight}</td>
                  <td className="p-2 text-right">{r.contribution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/heat-index">
            <Button variant="outline" className="mb-4 cursor-pointer">
              ← Back to Heat Index
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Heat Index Examples
          </h1>
          <p className="text-lg text-muted-foreground">
            See how the Heat Index formula works with real NBA stats
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About These Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Below are two worked examples using Nikola Jokić&apos;s 2024‑25 regular‑season
              averages. We show the exact normalization and weighting math for different
              stat preferences.
            </p>
          </CardContent>
        </Card>

        {renderTable('Preset A – Shooting‑focused weights', shooting)}
        {renderTable('Preset B – Counting‑stat weights', counting)}

        <p className="text-sm text-muted-foreground mt-4">
          *Preset definitions live in <code>constants/prefsSamples.ts</code>
        </p>
      </div>
    </div>
  );
}
