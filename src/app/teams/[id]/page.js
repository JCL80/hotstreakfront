import Link from "next/link";
import api from "../../utils/api";
import Image from "next/image";

async function getPlayers(teamId) {
  const res = await api.get(`api/nba/teams/single/${teamId}`);
  // console.log("Fetched players:", res.data.players); // Debugging line
  if (!res.data) throw new Error("Failed to fetch players");
  return res.data;
}

export default async function TeamPlayersPage({ params }) {
  const { id } = await params;
  const teamId = id;
  const {players , team} = await getPlayers(teamId);

  // console.log("team" , team)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-center mb-8">
        <Image
          src={team.logo_url}
          alt={team.fullName || "Team"}
          className="mx-auto"
          width={150}
          height={150}
        />
        <h1 className="text-2xl font-bold mt-2">
          {players[0]?.team?.fullName || team?.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                GP&nbsp;{p.GP} • PTS&nbsp;{p.PTS} • REB&nbsp;{p.REB} • AST&nbsp;{p.AST}
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
  );
}
