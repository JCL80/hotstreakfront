import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SlumpsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4 cursor-pointer">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            Slumps ❄️
          </h1>
          <p className="text-lg text-muted-foreground">
            Players currently underperforming their season averages
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Slumps</CardTitle>
              <CardDescription>
                Players showing significant performance decline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  These players are currently performing below their season averages by a significant margin.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-semibold text-blue-500">Struggling Stars</h4>
                    <p className="text-sm text-muted-foreground">
                      Established players experiencing significant drop-offs
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-semibold text-blue-500">Rookie Slumps</h4>
                    <p className="text-sm text-muted-foreground">
                      Young players facing challenges in their development
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Slump Analysis</CardTitle>
              <CardDescription>
                Understanding performance declines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Performance over last 5 games</li>
                  <li>Comparison to season averages</li>
                  <li>Impact on team performance</li>
                  <li>Shooting efficiency metrics</li>
                  <li>Minutes and role changes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recovery Indicators</CardTitle>
              <CardDescription>
                Signs of potential bounce-back
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Improving shooting percentages</li>
                  <li>Increased minutes and role stability</li>
                  <li>Positive team impact metrics</li>
                  <li>Historical recovery patterns</li>
                  <li>Upcoming favorable matchups</li>
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
                  <li>Historical slump comparisons</li>
                  <li>Recovery prediction models</li>
                  <li>Team impact analysis</li>
                  <li>Custom slump alerts</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 