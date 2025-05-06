'use client';

import Link from 'next/link';
import { FireExtinguisherIcon} from 'lucide-react';

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 select-none"
      aria-label="Hot Streak home"
    >
      {/* icon */}
      <FireExtinguisherIcon className="w-6 h-6 text-orange-500 shrink-0" />

      {/* word-mark: hidden on mobile, shown on ≥ small */}
      <span
        className="hidden sm:inline text-xl sm:text-2xl font-extrabold
                   bg-gradient-to-r from-orange-500 to-red-500
                   bg-clip-text text-transparent"
      >
        Hot&nbsp;Streak
      </span>

    </Link>
  );
}
