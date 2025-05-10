import { jokicSeasonAvg } from '../../../__fixtures__/realisticGames';
import { stripWeights } from '@/utils/weights';
import { explainHeatIndex } from '@/utils/debugHeat';
import { SHOOTING_PREFS, COUNTING_PREFS } from '@/constants/prefsSamples';
import { AdvancedStats } from '@/types/api';
import PlayerSpotlightCard from "./PlayerSpotlightCard";

// Mock player data based on Jokic's stats
const mockPlayer = {
  id: 203999,
  first_name: "John",
  last_name: "Carlos",
  image_url: "https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png",
  team: {
    id: 8,
    full_name: "Denver Nuggets",
    logo_url: "https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg"
  }
};

// Mock hot/cold streak data
const mockStreak = {
  status: "Hot",
  difference: "+15.2"
};

export default function PlayerSpotlight() {
  // Use Jokic's data to calculate heat index
  const shooting = explainHeatIndex(jokicSeasonAvg as AdvancedStats, stripWeights(SHOOTING_PREFS));
  const counting = explainHeatIndex(jokicSeasonAvg as AdvancedStats, stripWeights(COUNTING_PREFS));

  // Create two different views of the same player with different stat preferences
  const cards = [
    {
      playerBio: mockPlayer,
      hotColdStreak: mockStreak,
      stats: shooting
    },
    {
      playerBio: mockPlayer,
      hotColdStreak: mockStreak,
      stats: counting
    }
  ];

  return (
    <section className="w-full max-w-4xl mx-auto mt-12">
      <h2 className="text-4xl font-bold text-foreground mb-6 text-center">
        Examples
      </h2>
      <div className="w-full mx-auto mt- grid sm:grid-cols-2 gap-6">
        {cards.map(({ playerBio, hotColdStreak, stats }) => (
          <PlayerSpotlightCard
            key={`${playerBio.id}-${stats.score}`}
            player={playerBio}
            streak={hotColdStreak}
            stats={stats}
            name={`${playerBio.first_name} ${playerBio.last_name}`}
          />
        ))}
      </div>
    </section>
  );
} 