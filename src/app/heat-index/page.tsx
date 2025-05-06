import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text ">
            Understanding the
            <span className="ms-2 text-transparent">Heat Index</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how we calculate player performance and determine hot/cold
            streaks
          </p>
        </div>

        <div className="space-y-8">
          {/* What is the Heat Index? */}
          <Card>
            <CardHeader>
              <CardTitle>What is the Heat Index?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The Heat Index represents a player’s current performance streak
                based on the stats you value most. It’s designed to be
                intuitive for new users while remaining fully customizable as
                you explore and refine your own metric.
              </p>
            </CardContent>
          </Card>

          {/* Calculation Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Calculation Overview</CardTitle>
              <CardDescription>How we compute the 0–100 score</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal ml-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Normalize each stat</strong> into a 0–1 range by
                  applying <code>(value – min)/(max – min)</code> and clamping
                  to [0,1].
                </li>
                <li>
                  <strong>Apply your weights</strong> (0–2) by multiplying each
                  normalized stat by its slider value.
                </li>
                <li>
                  <strong>Compute the weighted average</strong>:
                  <br />
                  <code>
                    weightedSum = Σ(normalized × weight);<br />
                    totalWeight = Σ(weight);<br />
                    average = weightedSum / totalWeight;
                  </code>
                </li>
                <li>
                  <strong>Scale to 0–100</strong> and clamp:
                  <br />
                  <code>heatIndex = clamp(average × 100, 0, 100)</code>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* User Customization */}
          <Card>
            <CardHeader>
              <CardTitle>User Customization</CardTitle>
              <CardDescription>
                Your control over the Heat Index
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>Stat sliders (0–2):</strong> Set how much each stat
                  (PTS, TS%, FG%, 3P%, AST, REB, +/-) matters to you.
                </li>
                <li>
                  <strong>Zero-weight stats:</strong> Any stat set to 0 is
                  ignored in the calculation.
                </li>
                <li>
                  <strong>All zero weights:</strong> If you disable all stats,
                  Heat Index returns 0 (no divide-by-zero errors).
                </li>
                <li>
                  <strong>Game window:</strong> Choose how many recent games
                  to include (3–10).
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Guarantees & Edge Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Guaranteed Behavior</CardTitle>
              <CardDescription>Why it never breaks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>Always 0–100:</strong> Monster games clamp normalized
                  stats to 1.0 → Heat Index never exceeds 100.
                </li>
                <li>
                  <strong>Scale invariant:</strong> Multiplying all sliders by
                  any constant yields the same final score.
                </li>
                <li>
                  <strong>Division safety:</strong> If total weight is zero, we
                  short-circuit and return 0.
                </li>
                <li>
                  <strong>Edge-proof:</strong> Even historic outliers or
                  perfect performances just max out at 100—no NaNs, no bugs.
                </li>
              </ul>
            </CardContent>
          </Card>

        
        </div>
      </div>
    </div>
  );
}
