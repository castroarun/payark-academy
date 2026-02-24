"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Button from "@/components/ui/Button";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "User";

  const avatarUrl =
    user?.user_metadata?.avatar_url ??
    user?.user_metadata?.picture ??
    null;

  return (
    <header className="sticky top-0 z-50 bg-bg2/80 backdrop-blur-md border-b border-bdr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span
            className="text-xl font-bold font-display tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, #fff 0%, #3b82f6 50%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PayArk Academy
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-24 bg-bg3 rounded-lg animate-pulse" />
          ) : user ? (
            <>
              <div className="flex items-center gap-2">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-7 h-7 rounded-full border border-bdr"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-bg3 border border-bdr flex items-center justify-center text-xs font-semibold text-t2">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-t2 hidden sm:block">
                  {displayName}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
