"use client";

import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AuthButtons() {
  const user = useUser();
  const [fallback, setFallback] = useState(false);

  const login = () => supabase.auth.signInWithOAuth({ provider: "google" });
  const logout = () => supabase.auth.signOut();

  /* ---------- Logged-in state ---------- */
  if (user) {
    // console.log("user", user.user_metadata);
    return (
      <div className="flex items-center gap-2">
        {/* avatar (click = profile later, so keep it focusable) */}
        <button
          className="relative w-8 h-8 rounded-full overflow-hidden
                     focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Account"
        >
          <Image
            src={
              fallback || !user.user_metadata?.avatar_url
                ? "https://ui-avatars.com/api/?name=J+D&background=DD6B20&color=fff"
                : user.user_metadata.avatar_url
            }
            alt={user.email ?? "avatar"}
            fill // keeps it square inside the 32×32 wrapper
            sizes="32px" // suppresses Next’s “sizes” warning
            onError={() => setFallback(true)}
            priority // avoids flicker in the header
          />
        </button>

        {/* invisible ghost button with logout icon */}
        <Button
          onClick={logout}
          size="icon"
          variant="ghost"
          aria-label="Log out"
          className="text-gray-600 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  /* ---------- Logged-out state ---------- */
  return (
    <Button
      onClick={login}
      size="icon"
      variant="ghost"
      aria-label="Sign in with Google"
      className="text-gray-600 hover:text-green-600"
    >
      <LogIn className="w-5 h-5" />
    </Button>
  );
}
