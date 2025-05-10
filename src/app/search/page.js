"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "../utils/api";
import Image from "next/image";
import Loading from "../components/Loading";

function SearchPlayersContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

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
      if (!data.length) {
        setError("No players found.");
      } else {
        // console.log(data);
        setPlayers(data);
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (searchQuery) {
      fetchPlayers(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          {searchQuery ? `Results for "${searchQuery}"` : "Search NBA Players"}
        </h1>

        {loading && <Loading />}
        {error && (
          <p className="text-center text-red-500 font-semibold mb-6">{error}</p>
        )}
        {!players.length && !error && !loading && (
          <p className="text-center text-gray-400 italic mt-8">
            Type a player&apos;s name in the search bar above.
          </p>
        )}

        {/* Player Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((p) => (
            <Link key={p.id} href={`/players/${p.id}`}>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                <Image
                  src={p.image_url}
                  alt={`${p.first_name} ${p.last_name}`}
                  width={64}
                  height={64}
                  className="rounded-full object-cover bg-white p-1 shrink-0"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{p.first_name} {p.last_name}</h2>
                  <div className="text-gray-600 text-sm flex flex-wrap gap-2">
                    <span>GP: {p.gp ?? "N/A"}</span>
                    <span>OffRtg: {p.off_rating?.toFixed(1) ?? "N/A"}</span>
                    <span>DefRtg: {p.def_rating?.toFixed(1) ?? "N/A"}</span>
                    <span>NetRtg: {p.net_rating?.toFixed(1) ?? "N/A"}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 flex flex-wrap gap-2">
                    <span>eFG%: {p.efg_pct ? (p.efg_pct * 100).toFixed(1) + "%" : "N/A"}</span>
                    <span>TS%: {p.ts_pct ? (p.ts_pct * 100).toFixed(1) + "%" : "N/A"}</span>
                    <span>PIE: {p.pie ? (p.pie * 100).toFixed(1) + "%" : "N/A"}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPlayersPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center">Loading search results...</div>
      }
    >
      <SearchPlayersContent />
    </Suspense>
  );
}
