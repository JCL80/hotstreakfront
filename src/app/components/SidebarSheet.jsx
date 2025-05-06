// components/layout/SidebarSheet.tsx
"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X, Home, Users, Gauge, Settings } from "lucide-react";
import Logo from "./molecules/Logo";
import AuthButtons from "./molecules/AuthButtons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function SidebarSheet() {
  return (
    <Sheet>
      {/* ───── trigger button ───── */}
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className="p-2 rounded-md hover:bg-muted/50
                     focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>

      {/* ───── drawer ───── */}
      <SheetContent
        side="right"
        className="w-[280px] sm:w-[320px] flex flex-col"
      >
        {/* Radix-required title (visually hidden) */}
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        {/* Header row inside drawer */}
        <SheetHeader className="mb-4 flex flex-row items-center justify-between">
          <Logo />
          <SheetClose asChild/>
        </SheetHeader>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-1">
          <DrawerLink href="/" icon={Home}>
            Home
          </DrawerLink>
          <DrawerLink href="/teams" icon={Users}>
            Teams
          </DrawerLink>
          <DrawerLink href="/leaderboard" icon={Gauge}>
            Leaderboard
          </DrawerLink>

          <DrawerLink href="/preferences" icon={Settings}>Preferences </DrawerLink>
        </nav>

        {/* push auth buttons to the bottom */}
        <div
          className="mt-auto py-2 border-t border-border
                flex items-center justify-center gap-3"
        >
          <AuthButtons />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DrawerLink({ href, icon: Icon, children }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-orange-100 text-orange-700"
          : "text-gray-800 hover:bg-orange-50 hover:text-orange-600"
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {children}
    </Link>
  );
}
