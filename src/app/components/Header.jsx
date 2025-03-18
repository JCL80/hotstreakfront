"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function handleSearch() {
    if (searchQuery.trim()) {
      router.push(`/search?search=${searchQuery}`);
    }
  }

  return (
    <header className="w-full bg-white shadow-2xl text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-black">
        <Link href={"/"}>
          NBA Hot Streak Tracker <span className="text-orange-500">🏀</span>
        </Link>
      </h1>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search players..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-64 text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-500 text-black px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          Search
        </button>
      </div>
    </header>
  );
}
