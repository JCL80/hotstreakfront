"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { usePrefs } from "@/hooks/usePrefs";
import PlayerProfileView from "./components/PlayerProfileView"; // Extract UI to a component
import Loading from "@/app/components/Loading"

export default function PlayerPage() {
  const { prefs, loading } = usePrefs();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const fetchedOnce = useRef(false);         

  useEffect(() => {
    if (loading || fetchedOnce.current) return; // skip if still loading prefs or already fetched
    fetchedOnce.current = true;

    if (!loading && prefs) {
      fetch(`/api/nba/players/single/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prefs }),
      })
        .then((res) => res.json())
        .then(setData);
    }
  }, [loading, prefs, id]);

  if (!data) return <div className="p-8"><Loading/></div>;

  return (
    // <div>{JSON.stringify(data)}</div>
    <PlayerProfileView
      playerBio={data.playerBio}
      player={data.player}
      hotColdStreak={data.hotColdStreak}
      seasonAverages={data.seasonAverages}
      lastNGamesAvg={data.lastNGamesAvg}
      recentGames={data.recentGames}
      prefs={data.prefs}
      heatIndexes={data.heatIndexes}
    />
  );
}
