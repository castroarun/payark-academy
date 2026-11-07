import { Inter } from "next/font/google";
import { LLM_THEME_SCRIPT } from "@/lib/llm-theme";
// Same player styles and light/dark setting as the LLM course
import "../llm/llm.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-llm" });

export default function HealthspanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`llm ${inter.variable}`}>
      {/* Sets light/dark before first paint */}
      <script dangerouslySetInnerHTML={{ __html: LLM_THEME_SCRIPT }} />
      {children}
    </div>
  );
}
