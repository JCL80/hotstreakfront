"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "../utils/api";

function SearchPlayersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchPlayers(query) {
    setLoading(true);
    setError("");
    setPlayers([]);

    try {
      const res = await api.get(`api/nba/players/search?search=${query}`);
      const { data } = res;

      if (data.length === 0) {
        setError("No players found.");
      } else {
        setPlayers(data);
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialQuery) {
      fetchPlayers(initialQuery);
    }
  }, [initialQuery]);

  function handleSearch() {
    if (!searchQuery.trim()) {
      setError("Please enter a player name.");
      return;
    }

    router.push(`/search?search=${searchQuery}`);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Search NBA Players</h1>
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter player name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player) => (
          <Link key={player.id} href={`/players/${player.id}`}>
            <div key={player.id} className="rounded-xl bg-white shadow p-4">
              <h2 className="text-lg font-semibold">
                {player.first_name} {player.last_name}
              </h2>
              <p className="text-gray-600 text-sm">
                {player.position ? `Position: ${player.position}` : "Position: N/A"}
                {player.height ? ` | Height: ${player.height}` : ""}
                {player.weight ? ` | Weight: ${player.weight} lbs` : ""}
                {player.jersey_number ? ` | #${player.jersey_number}` : ""}
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

export default function SearchPlayersPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchPlayersContent />
    </Suspense>
  );
}
