/*  components/PlayerSpotlightCard.tsx  ----------------------------- */
'use client';

import Image from 'next/image';
import Link  from 'next/link';
import { Flame, Snowflake } from 'lucide-react';
import { Card } from '@/components/ui/card';

/* ────────────────────────────────────────────────────────── */
/* 1️⃣  small helper that gives us a “fake” last-game object */
const TEAMS = [
  'ATL','BOS','BKN','CHA','CHI','CLE','DAL','DEN','DET','GSW',
  'HOU','IND','LAC','LAL','MEM','MIA','MIL','MIN','NOP','NYK',
  'OKC','ORL','PHI','PHX','POR','SAC','SAS','TOR','UTA','WAS',
];
function mockGame(isHot) {
  const opp  = TEAMS[Math.floor(Math.random() * TEAMS.length)];
  const date = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' }); // “Apr 27”
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
export default function PlayerSpotlightCard({ player, streak, game }) {
  const hot  = streak.status === 'Hot';

  /* NEW: make a filler if parent didn’t pass `game` */
  const g = game ?? mockGame(hot);

  return (
    <Card
      className="relative overflow-hidden rounded-xl shadow-sm
                 hover:shadow-md focus-within:ring-2 focus-within:ring-orange-500
                 transition "
    >
      {/* coloured accent */}
      {/* <span
        className={`absolute inset-y-0 left-0 w-1 ${
          hot ? 'bg-gradient-to-b from-orange-500 to-red-500'
              : 'bg-gradient-to-b from-sky-400 to-blue-600'
        }`}
      /> */}

      {/* headline */}
      <h3 className="text-xl px-6 pt-2 text-sm font-semibold text-gray-600">
        Trending Performance
      </h3>

      {/* avatar row */}
      <div className="flex flex-col items-center mt-2">
        <Image
          src={player.image_url}
          alt={player.first_name}
          width={88}
          height={88}
          className="object-contain -mb-1"
          priority
        />
        <h4 className="text-lg font-semibold text-center">
          {player.first_name} {player.last_name}
        </h4>
      </div>

      {/* matchup / result bar (now always present) */}
      <p className="mx-6 mt-1 mb-2 text-xs text-muted-foreground flex items-center gap-1">
        {g.date} &nbsp; vs <span className="font-medium">{g.vs}</span>
        <span
          className={`ml-1 px-1.5 rounded-full text-[10px] font-semibold
                      ${g.wl === 'W'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'}`}
        >
          {g.wl}
        </span>
        &nbsp; {g.score}
      </p>

      {/* streak line */}
      <p className="flex items-center justify-center gap-1 text-sm">
        {hot ? (
          <Flame className="w-4 h-4 text-orange-500" />
        ) : (
          <Snowflake className="w-4 h-4 text-blue-500" />
        )}
        <span className={hot ? 'text-orange-600' : 'text-blue-600'}>
          {streak.status}
        </span>
        <span className="text-muted-foreground">• {streak.difference}</span>
      </p>

      {/* mini-stats grid (now always shown) */}
      <div
        className="grid grid-cols-6 gap-x-4 gap-y-1 text-[11px] text-center
                   mx-6 mt-3 mb-4 text-gray-700"
      >
        {[
          ['MIN', g.stats.MIN],
          ['PTS', g.stats.PTS],
          ['REB', g.stats.REB],
          ['AST', g.stats.AST],
          ['+/-', g.stats.PLUS_MINUS],
          ['FG%', (g.stats.FG_PCT * 100).toFixed(1)],
          ['3P', (g.stats.TS     * 100).toFixed(1)],
          ['FT%', (g.stats.FT_PCT* 100).toFixed(1)],
        ].map(([k, v]) => (
          <div key={k}>
            <span className="block font-semibold">{v}</span>
            <span className="text-muted-foreground">{k}</span>
          </div>
        ))}
      </div>

      {/* cta */}
      <Link
        href={`/players/${player.id}`}
        className="block text-center text-xs text-orange-600 hover:underline pb-4"
      >
        View full stats →
      </Link>
    </Card>
  );
}
