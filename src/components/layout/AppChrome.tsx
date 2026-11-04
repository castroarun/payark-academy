"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

/**
 * The PayArk header and centred column wrap every page except the LLM track,
 * which has its own full-width layout and top bar (src/app/llm/layout.tsx).
 */
export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/llm" || pathname.startsWith("/llm/")) return <>{children}</>;
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </>
  );
}
