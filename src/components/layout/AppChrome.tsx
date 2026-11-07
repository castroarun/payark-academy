"use client";

import { usePathname } from "next/navigation";
import { SiteTopBar } from "@/components/site/SiteParts";
import { PLAYER_BASE_PATHS } from "@/data/tracks";

/**
 * Every page gets the shared look (.llm, styles in src/app/llm/llm.css).
 * - Video courses: their own full-width layout and top bar (src/app/llm/layout.tsx).
 * - Dashboard and Payments overview: draw their own top bar.
 * - Everything else (Payments lessons, quiz, sign-in): the site top bar and a
 *   centred column. "legacy" re-points the older pages' colours to the new palette.
 */
export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (PLAYER_BASE_PATHS.some((b) => pathname === b || pathname.startsWith(`${b}/`))) return <>{children}</>;
  if (pathname === "/" || pathname === "/curriculum") return <div className="llm">{children}</div>;
  return (
    <div className="llm legacy">
      <SiteTopBar />
      <main className="legacy-main">{children}</main>
    </div>
  );
}
