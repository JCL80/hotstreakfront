/*  components/PlayerSpotlightCard.tsx  ----------------------------- */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Flame, Snowflake, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

/* ────────────────────────────────────────────────────────── */
/* 1️⃣  small helper that gives us a "fake" last-game object */
const TEAMS = [
  'ATL','BOS','BKN','CHA','CHI','CLE','DAL','DEN','DET','GSW',
  'HOU','IND','LAC','LAL','MEM','MIA','MIL','MIN','NOP','NYK',
  'OKC','ORL','PHI','PHX','POR','SAC','SAS','TOR','UTA','WAS',
];
function mockGame(isHot) {
  const opp  = TEAMS[Math.floor(Math.random() * TEAMS.length)];
  const date = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' }); // "Apr 27"
  const wl   = isHot ? 'W' : 'L';
  const us   = Math.floor(Math.random() * 30) + 90;   // 90-119 pts for your team
  const them = us + (isHot ? -Math.floor(Math.random()*15) :  Math.floor(Math.random()*15));
  const score = wl === 'W' ? `${us}-${them}` : `${them}-${us}`;

  return {
    date,
    vs  : opp,
    wl,
    score,
    stats: {
      MIN : 30 + Math.floor(Math.random()*12),
      PTS : isHot ? 25 + Math.floor(Math.random()*10) : 12 + Math.floor(Math.random()*8),
      REB : 3 + Math.floor(Math.random()*8),
      AST : 2 + Math.floor(Math.random()*9),
      STL : Math.floor(Math.random()*3),
      BLK : Math.floor(Math.random()*3),
      PLUS_MINUS: isHot ? +5 + Math.floor(Math.random()*10) : -3 - Math.floor(Math.random()*8),
      FG_PCT : 0.42 + Math.random()*0.18,
      FT_PCT : 0.72 + Math.random()*0.24,
      TS     : 0.52 + Math.random()*0.18,
    },
  };
}

/* ────────────────────────────────────────────────────────── */
/* 2️⃣  original component with one new line            */
export default function PlayerSpotlightCard({ player, streak, stats, name }) {
  // name prop will be used for display (Joe Doe, Carl Carlos)
  return (
    <Card
      className="relative overflow-hidden rounded-xl shadow-sm
                 hover:shadow-md focus-within:ring-2 focus-within:ring-orange-500
                 transition"
    >
      {/* generic user icon */}
      <div className="flex flex-col items-center mt-3 mb-1">
        <User className="w-10 h-10 text-muted-foreground mb-1" />
        <h4 className="text-lg font-semibold text-center">
          {name}
        </h4>
      </div>

      {/* heat index score */}
      <div className="text-center mt-2">
        <span className="text-sm font-semibold text-orange-500">
          Heat Index: {stats.score.toFixed(1)}
        </span>
      </div>

      {/* full stats table */}
      <div className="overflow-x-auto px-4 mt-4 mb-2">
        <table className="w-full text-xs border rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-medium">Stat</th>
              <th className="text-right p-2 font-medium">Value</th>
              <th className="text-right p-2 font-medium">Contribution</th>
            </tr>
          </thead>
          <tbody>
            {stats.rows.filter(r => r.weight !== 0).map(r => (
              <tr key={r.key} className="border-b last:border-0">
                <td className="p-2">{r.key}</td>
                <td className="p-2 text-right">{r.raw}</td>
                <td className="p-2 text-right">{r.contribution.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
