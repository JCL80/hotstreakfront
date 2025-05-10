'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const router   = useRouter();
  const go = () => q.trim() && router.push(`/search?search=${q}`);

  return (
    <div className="relative flex-1 max-w-[700px]">
      {/* input */}
      <Input
        value={q}
        onChange={e => setQ(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && go()}
        placeholder="Search players…"
        data-search-bar
        /* note: right-padding leaves room for the icon */
        className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-300
                   bg-white/70 backdrop-blur-sm
                   focus:outline-none focus:ring-2 focus:ring-orange-500
                   transition-shadow shadow-sm focus:shadow-md"
      />

      {/* icon-only button */}
      <button
        onClick={go}
        aria-label="Search"
        className="absolute right-3 top-1/2 -translate-y-1/2
                   p-0 m-0 bg-transparent border-none
                   leading-none text-gray-600 hover:text-orange-500
                   focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <Search className="w-5 h-5 pointer-events-none" />
      </button>
    </div>
  );
}
