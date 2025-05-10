import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, ChartLine, Settings, Info } from "lucide-react";
import HeatFormula from "@/app/components/HeatFormula";
import PlayerSpotlight from "@/app/components/PlayerSpotlight";
import Upcoming from "@/app/components/Upcoming";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center">
      {/* Hero Section */}
      <header id="search-section" className="relative w-full max-w-5xl text-center pt-12 py-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground text-center">
          Discover Who&apos;s Heating Up 🔥 in the NBA
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground text-center max-w-2xl mx-auto">
          Check detailed hot and cold streaks for individual NBA players — based
          on their most recent performances.
        </p>
      </header>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="w-full max-w-4xl mx-auto mt-8">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-foreground mb-6 text-center">
          Features
        </h2>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 md:auto-rows-fr">
          {/* Search Players */}
          <Link href="#search-section" className="group">
            <Card className="relative h-full flex flex-col border border-border/60 shadow-sm bg-white/60 backdrop-blur transition transform duration-150 hover:-translate-y-1 hover:shadow-lg rounded-xl p-4">
              <CardHeader className="flex-row items-center gap-3 pb-2">
                <Search className="w-6 h-6 shrink-0" />
                <div>
                  <CardTitle className="text-base font-semibold text-orange-500">
                    Search Players
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Find any active NBA player
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 flex-1">
                Quickly look up any player and access their latest stats and
                form.
              </CardContent>
            </Card>
          </Link>

          {/* Player Trends */}
          <Card className="relative h-full flex flex-col border border-border/60 shadow-sm bg-white/60 backdrop-blur transition transform duration-150 hover:-translate-y-1 hover:shadow-lg rounded-xl p-4">
            <CardHeader className="flex-row items-center gap-3 pb-2">
              <ChartLine className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <CardTitle className="text-base font-semibold text-orange-500">
                  Track Player Trends
                </CardTitle>
                <CardDescription className="text-xs">
                  Analyze recent game performance
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 flex-1">
              See how a player is trending over their latest games — hot or
              cold.
            </CardContent>
          </Card>

          {/* Heat Index Formula */}
          <Link href="/heat-index" className="group">
            <Card className="relative h-full flex flex-col border border-border/60 shadow-sm bg-white/60 backdrop-blur transition transform duration-150 hover:-translate-y-1 hover:shadow-lg rounded-xl p-4">
              <CardHeader className="flex-row items-center gap-3 pb-2">
                <Info className="w-6 h-6 text-orange-500 shrink-0" />
                <div>
                  <CardTitle className="text-base font-semibold text-orange-500">
                    Learn More About the Formula
                  </CardTitle>
                  <CardDescription className="text-xs">
                    How Heat Index is calculated
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 flex-1">
                See which stats are weighted and how we decide who&apos;s hot, cold,
                or mid.
              </CardContent>
            </Card>
          </Link>

          {/* Customize Heat Index */}
          <Link href="/preferences" className="group">
            <Card className="relative h-full flex flex-col border border-border/60 shadow-sm bg-white/60 backdrop-blur transition transform duration-150 hover:-translate-y-1 hover:shadow-lg rounded-xl p-4">
              <CardHeader className="flex-row items-center gap-3 pb-2">
                <Settings className="w-6 h-6 shrink-0" />
                <div>
                  <CardTitle className="text-base font-semibold text-orange-500">
                    Customize Your Heat Index
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Adjust scoring weights
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 flex-1">
                Modify the formula to prioritize the stats you care about most.
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
      <Suspense fallback={null}>
        <PlayerSpotlight />
      </Suspense>

      {/* Upcoming Section */}
      <Upcoming />

      <HeatFormula />

      <section className="w-full max-w-4xl mx-auto mt-24 mb-12 px-4 text-center">
        <h2 className="text-4xl font-bold text-foreground text-center mb-4">
          Ready to see who&apos;s heating up?
        </h2>

        <hr />

        <div className=" rounded-xl p-8">
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            Dive into recent performances and customize your own Heat Index to
            track the players that matter most to you.
          </p>
          <Link href="#search-section">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-full text-base shadow-md transition flex items-center gap-2 mx-auto">
              <Search className="w-5 h-5" />
              Explore Player Stats
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-xs text-gray-500">
        <p>
          Currently in Alpha – player-focused stats only. Team leaderboards and
          live updates coming soon!
        </p>
        <p className="mt-2">Built with ❤️ by an NBA fan </p>
      </footer>
    </div>
  );
}
