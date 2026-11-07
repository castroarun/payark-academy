"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import { PLAYER_BASE_PATHS } from "@/data/tracks";

/**
 * The PayArk header and centred column wrap every page except the
 * dashboard and the video courses, which have their own full-width layout and top bar
 * (src/app/page.tsx, src/app/llm/layout.tsx).
 */
export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Dashboard and Payments overview use the shared look (src/components/site/SiteShell.tsx)
  if (pathname === "/" || pathname === "/curriculum") return <>{children}</>;
  if (PLAYER_BASE_PATHS.some((b) => pathname === b || pathname.startsWith(`${b}/`))) return <>{children}</>;
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </>
  );
}
