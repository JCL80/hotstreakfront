import { playerImageUrl } from "../../constants/nbaPlayersMap";
import api from "../../utils/api";

async function getPlayer(playerId) {
  const res = await api.get(`api/nba/players/single/${playerId}`);
  if (!res) throw new Error("Failed to fetch player data");
  return res.data;
}

export default async function PlayerPage({ params }) {
  const server_params = await params;
  const playerId = server_params.id;
  const data = await getPlayer(playerId);

  const player = data.player;
  const hotColdStreak = data.hotColdStreak;
  const player_image_url = playerImageUrl(player.id);

  const isMockData = true;

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-700 ">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Player Info Section */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <img
            src={player_image_url}
            alt={`${player.first_name} ${player.last_name}`}
            className="w-40 h-40 rounded-full shadow-md mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">
            {player.first_name} {player.last_name}
          </h1>
          <p className="text-gray-500 text-lg">
            {player.team?.full_name || "Free Agent"}
          </p>
          <div className="mt-4 text-gray-700 space-y-2">
            <p>
              <span className="font-semibold">Position:</span>{" "}
              {player.position || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Height:</span>{" "}
              {player.height || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Weight:</span>{" "}
              {player.weight ? `${player.weight} lbs` : "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Jersey:</span>{" "}
              {player.jersey_number ? `#${player.jersey_number}` : "N/A"}
            </p>
            <p>
              <span className="font-semibold">College:</span>{" "}
              {player.college || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Country:</span>{" "}
              {player.country || "Unknown"}
            </p>
          </div>
        </div>

        {/* Performance Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Performance Analysis
          </h2>

          {/* Streak Indicator */}
          <div
            className={`text-center text-lg p-3 rounded-md shadow-md 
            ${
              hotColdStreak.status === "Hot"
                ? "bg-red-200 text-red-700"
                : "bg-blue-200 text-blue-700"
            }`}
          >
            <span className="font-semibold">Streak:</span>{" "}
            {hotColdStreak.status}
            <span className="ml-2">(Diff: {hotColdStreak.difference})</span>
          </div>

          {/* Fake Data Warning */}
          {isMockData && (
            <div className="mt-3 text-center text-sm text-gray-600 italic bg-yellow-200 p-2 rounded-md">
              ⚠️ This data is currently mocked and does not reflect real NBA
              stats.
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Season Averages */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Season Averages
              </h3>
              <div className="mt-2 space-y-1 text-gray-700">
                <p>🔥 Points: {hotColdStreak.seasonAverages.pts}</p>
                <p>🎯 FG%: {hotColdStreak.seasonAverages.fgp}</p>
                <p>🏀 Rebounds: {hotColdStreak.seasonAverages.reb}</p>
                <p>🎯 3P%: {hotColdStreak.seasonAverages.tpp}</p>
                <p>🅿️ Plus-Minus: {hotColdStreak.seasonAverages.plus_minus}</p>
                <p>🛡️ Defensive Rating: {hotColdStreak.seasonAverages.drtg}</p>
              </div>
            </div>

            {/* Last 5 Games */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">Last 5 Games</h3>
              <div className="mt-2 space-y-1 text-gray-700">
                <p>🔥 Points: {hotColdStreak.last5Games.pts}</p>
                <p>🎯 FG%: {hotColdStreak.last5Games.fgp}</p>
                <p>🏀 Rebounds: {hotColdStreak.last5Games.reb}</p>
                <p>🎯 3P%: {hotColdStreak.last5Games.tpp}</p>
                <p>🅿️ Plus-Minus: {hotColdStreak.last5Games.plus_minus}</p>
                <p>🛡️ Defensive Rating: {hotColdStreak.last5Games.drtg}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
