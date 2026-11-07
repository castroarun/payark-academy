import { Inter } from "next/font/google";
import { LLM_THEME_SCRIPT } from "@/lib/llm-theme";
// Same look and light/dark setting as the course player
import "@/app/llm/llm.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-llm" });

/** Wraps pages outside /llm and /healthspan (dashboard, Payments overview) in the shared look. */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`llm ${inter.variable}`}>
      {/* Sets light/dark before first paint */}
      <script dangerouslySetInnerHTML={{ __html: LLM_THEME_SCRIPT }} />
      {children}
    </div>
  );
}
