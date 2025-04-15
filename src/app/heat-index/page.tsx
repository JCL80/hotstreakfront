import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeatIndexPage() {
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
            Understanding the Heat Index 🔥
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how we calculate player performance and determine hot/cold streaks
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>What is the Heat Index?</CardTitle>
              <CardDescription>
                A comprehensive metric that measures player performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The Heat Index is our proprietary metric that combines multiple statistical factors to determine a player&apos;s current performance level. It helps identify players who are performing above or below their season averages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Components</CardTitle>
              <CardDescription>
                The statistical factors that make up the Heat Index
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">1. Scoring Impact (30%)</h3>
                  <p className="text-muted-foreground">
                    Points per game weighted by efficiency metrics:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-muted-foreground">
                    <li>True Shooting Percentage (TS%)</li>
                    <li>Effective Field Goal Percentage (eFG%)</li>
                    <li>Free Throw Attempts</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">2. Playmaking (20%)</h3>
                  <p className="text-muted-foreground">
                    Assists and ball distribution metrics
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">3. Efficiency (20%)</h3>
                  <p className="text-muted-foreground">
                    Shooting percentages and advanced metrics:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-muted-foreground">
                    <li>Field Goal Percentage</li>
                    <li>Three-Point Percentage</li>
                    <li>Player Efficiency Rating (PER)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">4. Team Impact (30%)</h3>
                  <p className="text-muted-foreground">
                    Measures of team success and impact:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-muted-foreground">
                    <li>Plus-Minus</li>
                    <li>Offensive Rating</li>
                    <li>Defensive Rating</li>
                    <li>Net Rating</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Determining Streaks</CardTitle>
              <CardDescription>
                How we identify hot and cold streaks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  A player&apos;s current Heat Index is compared to their season average to determine if they&apos;re on a streak:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <h4 className="font-semibold text-red-500">🔥 Hot Streak</h4>
                    <p className="text-sm text-muted-foreground">
                      Current Heat Index is significantly above season average
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-semibold text-blue-500">❄️ Cold Streak</h4>
                    <p className="text-sm text-muted-foreground">
                      Current Heat Index is significantly below season average
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-500/10 border border-gray-500/20">
                    <h4 className="font-semibold text-gray-500">Neutral</h4>
                    <p className="text-sm text-muted-foreground">
                      Performance is within normal range
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Context Matters</CardTitle>
              <CardDescription>
                Additional factors we consider
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  The Heat Index takes into account various contextual factors:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Position-specific expectations</li>
                  <li>Team strength and opponent quality</li>
                  <li>Home vs. away games</li>
                  <li>Recent minutes played</li>
                  <li>Injury status and recovery</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 