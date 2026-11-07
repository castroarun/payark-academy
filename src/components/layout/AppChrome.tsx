"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import { PLAYER_BASE_PATHS } from "@/data/tracks";

/**
 * The PayArk header and centred column wrap every page except the
 * video courses, which have their own full-width layout and top bar (src/app/llm/layout.tsx).
 */
export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (PLAYER_BASE_PATHS.some((b) => pathname === b || pathname.startsWith(`${b}/`))) return <>{children}</>;
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </>
  );
}
