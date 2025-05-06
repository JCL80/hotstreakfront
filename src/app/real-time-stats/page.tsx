import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RealTimeStatsPage() {
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
            Real-Time Stats 📊
          </h1>
          <p className="text-lg text-muted-foreground">
            Live player statistics and performance tracking
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Live Game Updates</CardTitle>
              <CardDescription>
                Real-time statistics from ongoing games
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our system continuously monitors and updates player statistics during games, providing you with the most current performance data.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <h4 className="font-semibold text-orange-500">Current Games</h4>
                    <p className="text-sm text-muted-foreground">
                      Live updates from all ongoing NBA games
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <h4 className="font-semibold text-orange-500">Player Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Individual player performance metrics
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Sources</CardTitle>
              <CardDescription>
                Where we get our real-time data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Unofficial NBA API integration</li>
                  <li>FAST NBA API for comprehensive stats</li>
                  <li>Custom data processing pipeline</li>
                  <li>Real-time game event tracking</li>
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
                  <li>Live game visualization</li>
                  <li>Player comparison tools</li>
                  <li>Advanced analytics dashboard</li>
                  <li>Custom alerts and notifications</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 