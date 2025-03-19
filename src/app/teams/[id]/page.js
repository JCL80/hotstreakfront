import { nbaTeamMap } from "../../constants/nbaTeamMap";
import Link from "next/link";
import api from "../../utils/api";

async function getPlayers(teamId) {
  const res = await api.get(`api/nba/teams/single/${teamId}`);
  if (!res.data) throw new Error("Failed to fetch players");
  return res.data;
}

export default async function TeamPlayersPage({ params }) {
  const { id } = await params;
  const teamId = id;
  const players = await getPlayers(teamId);

  const team = nbaTeamMap[teamId];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-center mb-8">
        <img
          src={team.logo}
          alt={players[0]?.team.full_name || "Team"}
          className="mx-auto"
          width={150}
        />
        <h1 className="text-2xl font-bold mt-2">
          {players[0]?.team?.full_name || team?.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.slice(0, 15).map((player) => (
          <Link key={player.id} href={`/players/${player.id}`}>
            <div key={player.id} className="rounded-xl bg-white shadow p-4">
              <h2 className="text-lg font-semibold">
                {player.first_name} {player.last_name}
              </h2>
              <p className="text-gray-600 text-sm">
                {player.position && `Position: ${player.position}`}
                {player.height && ` | Height: ${player.height}`}
                {player.weight && ` | Weight: ${player.weight} lbs`}
                {player.jersey_number && ` | #${player.jersey_number}`}
              </p>
              <p className="text-xs text-gray-400">
                {player.college || "N/A"} - {player.country || "Unknown"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
