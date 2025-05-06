import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HotStreaksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4 cursor-pointer">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Hot Streaks 🔥
          </h1>
          <p className="text-lg text-muted-foreground">
            Players currently performing at their peak
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Hot Streaks</CardTitle>
              <CardDescription>
                Players showing exceptional performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  These players are currently outperforming their season averages by a significant margin.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <h4 className="font-semibold text-red-500">Top Performers</h4>
                    <p className="text-sm text-muted-foreground">
                      Players with the highest Heat Index scores
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <h4 className="font-semibold text-red-500">Rising Stars</h4>
                    <p className="text-sm text-muted-foreground">
                      Players showing significant improvement
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Streak Analysis</CardTitle>
              <CardDescription>
                Understanding player performance trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Performance over last 5 games</li>
                  <li>Comparison to season averages</li>
                  <li>Impact on team success</li>
                  <li>Consistency metrics</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                Features in development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Historical streak comparisons</li>
                  <li>Predictive analytics</li>
                  <li>Player matchup analysis</li>
                  <li>Custom streak notifications</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 