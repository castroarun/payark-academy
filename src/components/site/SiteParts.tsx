"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { TRACKS } from "@/data/tracks";
import { useLlmTheme } from "@/lib/llm-theme";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

// ─────────────────────────────────────────────────────────────
// Pieces shared by the dashboard and the course overview pages:
// the top bar, icons and the video preview image.
// Styles live in src/app/llm/llm.css.
// ─────────────────────────────────────────────────────────────

export function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export const ICONS = {
  sun: "M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 7a5 5 0 100 10 5 5 0 000-10z",
  moon: "M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  tick: "M5 12.5l4.5 4.5L19 7.5",
  lock: "M7 11V8a5 5 0 0110 0v3M5 11h14v9H5z",
};

/** Where each course's overview page lives. */
export const OVERVIEW_HREF = {
  payments: "/curriculum",
  llm: `${TRACKS.llm.basePath}/overview`,
  healthspan: `${TRACKS.healthspan.basePath}/overview`,
} as const;

const thumbUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** A course or module preview: the real YouTube frame of its video, 16:9. */
export function Thumb({ id, badge, label }: { id: string | null; badge?: string; label?: string }) {
  return (
    <div className="thumb">
      {id ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbUrl(id)} alt="" loading="lazy" />
      ) : (
        label && <span className="thumb-label">{label}</span>
      )}
      {id && (
        <span className="playmark" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </span>
      )}
      {badge && <span className="badge">{badge}</span>}
    </div>
  );
}

function useSignedInUser(): User | null {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);
  return user;
}

export function SiteTopBar() {
  const { theme, toggle } = useLlmTheme();
  const user = useSignedInUser();
  const name = user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? user?.email?.split("@")[0];
  const signOut = async () => {
    await createClient().auth.signOut();
    window.location.href = "/login";
  };
  return (
    <header className="topbar">
      <div className="topbar-in">
        <Link href="/" className="brand">PayArk Academy</Link>
        <nav className="nav" aria-label="Courses">
          <Link href={OVERVIEW_HREF.payments}>Payments</Link>
          <Link href={OVERVIEW_HREF.llm}>{TRACKS.llm.navLabel}</Link>
          <Link href={OVERVIEW_HREF.healthspan}>{TRACKS.healthspan.navLabel}</Link>
        </nav>
        {!isSupabaseConfigured ? (
          <span className="pill" title="No database yet: progress is saved in this browser">Local preview</span>
        ) : user ? (
          <>
            <span className="muted" style={{ fontSize: 14 }}>{name}</span>
            <button type="button" className="btn small" onClick={signOut}>Sign out</button>
          </>
        ) : (
          <Link href="/login" className="btn small">Sign in</Link>
        )}
        <button
          type="button"
          className="iconbtn"
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          <Icon d={theme === "dark" ? ICONS.sun : ICONS.moon} size={18} />
        </button>
      </div>
    </header>
  );
}
