"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function handleSearch() {
    if (searchQuery.trim()) {
      router.push(`/search?search=${searchQuery}`);
    }
  }

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm border-b border-border/40 shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">
          <Link href={"/"} className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              NBA Hot Streak Tracker
            </span>
            <span className="text-orange-500">🏀</span>
          </Link>
        </h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button
            onClick={handleSearch}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white whitespace-nowrap"
          >
            Search
          </Button>
        </div>
      </div>
    </header>
  );
}
