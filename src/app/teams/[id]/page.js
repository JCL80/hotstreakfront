import Link from "next/link";
import api from "../../utils/api";
import Image from "next/image";

async function getPlayers(teamId) {
  const res = await api.get(`api/nba/teams/single/${teamId}`);
  if (!res.data) throw new Error("Failed to fetch players");
  return res.data;
}

export default async function TeamPlayersPage({ params }) {
  const { id } = await params;
  const teamId = id;
  const {players , team} = await getPlayers(teamId);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Image
            src={team.logo_url}
            alt={team.fullName || "Team"}
            className="mx-auto"
            width={150}
            height={150}
          />
          <h1 className="text-3xl font-bold mt-2">
            {players[0]?.team?.fullName || team?.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((p) => (
            <Link key={p.PLAYER_ID} href={`/players/${p.PLAYER_ID}`}>
              <div className="flex gap-4 items-center rounded-xl bg-white shadow p-4 hover:shadow-lg transition">
                {/* head‑shot */}
                <Image
                  src={p.image_url}
                  alt={p.PLAYER_NAME}
                  width={64}
                  height={64}
                  className="rounded-full shrink-0"
                />

                {/* text block */}
                <div>
                  <h2 className="text-lg font-semibold">{p.PLAYER_NAME}</h2>

                  <p className="text-gray-600 text-sm">
                    GP&nbsp;{p.GP} •&nbsp;PTS&nbsp;{p.PTS} •&nbsp;REB&nbsp;{p.REB} •&nbsp;AST&nbsp;{p.AST}
                  </p>

                  <p className="text-xs text-gray-400">
                    Plus/Minus&nbsp;
                    {p.PLUS_MINUS > 0 && "+"}
                    {p.PLUS_MINUS}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
