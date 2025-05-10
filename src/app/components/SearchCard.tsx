'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function SearchCard() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={scrollToTop} className="group w-full text-left">
      <Card className="relative h-full flex flex-col border border-border/60 shadow-sm bg-white/60 backdrop-blur transition transform duration-150 hover:-translate-y-1 hover:shadow-lg rounded-xl p-4">
        <CardHeader className="flex-row items-center gap-3 pb-2">
          <Search className="w-6 h-6 shrink-0" />
          <div>
            <CardTitle className="text-base font-semibold text-orange-500">
              Search Players
            </CardTitle>
            <CardDescription className="text-xs">
              Find any active NBA player
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 flex-1">
          Quickly look up any player and access their latest stats and
          form.
        </CardContent>
      </Card>
    </button>
  );
} 