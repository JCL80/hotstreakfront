"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Snowflake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlayerSpotlightCard from "./PlayerSpotlightCard";

const IDS = [2544, 201939, 1629029, 1630596]; // 4 IDs
const pick = () => IDS.sort(() => 0.5 - Math.random()).slice(0, 2); // 2 random

export default function PlayerSpotlight() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all(
      pick().map((id) =>
        fetch(`/api/nba/players/single/${id}`, {
          method: "POST",
          body: JSON.stringify({ prefs: { gamesWindow: 8 } }),
        }).then((r) => r.json())
      )
    )
      .then(setCards)
      .catch(console.error);
  }, []);

  if (!cards.length)
    return (
      <div className="w-full max-w-4xl mt-12 animate-pulse h-24 rounded-lg bg-muted/40" />
    );

  return (
    <section className="w-full max-w-4xl mx-auto mt-12">
      <h2 className="text-4xl font-bold text-foreground mb-6 text-center">
        Examples
      </h2>
      <div className="w-full mx-auto mt- grid sm:grid-cols-2 gap-6 ">
        {cards.map(({ playerBio, hotColdStreak }) => {
          const hot = hotColdStreak.status === "Hot";
          return (
            <PlayerSpotlightCard
              key={playerBio.id}
              player={playerBio}
              streak={hotColdStreak}
            />
          );
        })}
      </div>
    </section>
  );
}

/* tiny pill */
function StatChip({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[11px]">
      <span className="font-semibold">{value}</span> {label}
    </span>
  );
}
