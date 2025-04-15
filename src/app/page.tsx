/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center">
      {/* Hero Section */}
      <header className="w-full max-w-5xl text-center py-10">
        <h1 className="text-4xl font-extrabold tracking-wide mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          NBA Hot Streak Tracker 🔥
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover which NBA players are <span className="text-orange-500 font-semibold">on fire</span> and who's stuck in a <span className="text-blue-500 font-semibold">cold streak</span> ❄️.
          Get real-time stats, performance trends, and insights into player efficiency.
        </p>
      </header>

      {/* Feature Highlights */}
      <section className="w-full max-w-4xl grid md:grid-cols-4 gap-6 mt-10">
        <Link href="/real-time-stats" className="h-full">
          <Card className="border-2 border-orange-500/20 hover:border-orange-500/40 transition-all cursor-pointer hover:scale-[1.02] h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-orange-500">🔥 Real-Time Stats</CardTitle>
              <CardDescription>Live data and instant analysis</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">We fetch live data and analyze player trends instantly.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/heat-index" className="h-full">
          <Card className="border-2 border-yellow-500/20 hover:border-yellow-500/40 transition-all cursor-pointer hover:scale-[1.02] h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-yellow-500">📊 Heat Index</CardTitle>
              <CardDescription>Custom performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">Our custom "Heat Index" determines who's playing at their peak.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/hot-streaks" className="h-full">
          <Card className="border-2 border-red-500/20 hover:border-red-500/40 transition-all cursor-pointer hover:scale-[1.02] h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-red-500">🔥 Hot Streaks</CardTitle>
              <CardDescription>Players on fire right now</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">Discover which players are currently on hot streaks and outperforming their season averages.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/slumps" className="h-full">
          <Card className="border-2 border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer hover:scale-[1.02] h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-blue-500">❄️ Slumps</CardTitle>
              <CardDescription>Players in cold streaks</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">Track players who are underperforming and struggling to find their rhythm.</p>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Shortcomings Section */}
      <Card className="w-full max-w-4xl mt-10 border-2 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-500">🚧 Current Shortcomings</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc text-muted-foreground ml-5 space-y-2">
            <li>API limitations may cause occasional data delays.</li>
            <li>Historical data is currently limited to recent games.</li>
            <li>Advanced stats and predictive analytics are in progress.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Call-to-Action */}
      <div className="mt-10">
        <Link href="/teams">
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            Explore Teams 🚀
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-muted-foreground text-sm">
        Built with ❤️ by an NBA fan. Data powered by BallDontLie API.
      </footer>

      
    </div>
  );
}
