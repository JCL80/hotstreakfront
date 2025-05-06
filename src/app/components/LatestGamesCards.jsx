import GameCard from "@/app/components/GameCard"

export default function LatestGamesCards({ recentGames }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recentGames.map((game, i) => (
        <GameCard game={game} key={i}/>
      ))}
    </div>
  );
}
