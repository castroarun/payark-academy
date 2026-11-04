"use client";

import { useCallback, useSyncExternalStore } from "react";

// Light/dark for the LLM track. Stored per browser; the first visit follows
// the system setting. The attribute lives on <html> so the inline script in
// src/app/llm/layout.tsx can set it before the page paints (no flash).

export type LlmTheme = "light" | "dark";
export const LLM_THEME_KEY = "payark-llm-theme";

/** Runs before React loads — keep it tiny and dependency-free. */
export const LLM_THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${LLM_THEME_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-llm-theme",t)}catch(e){document.documentElement.setAttribute("data-llm-theme","light")}})();`;

const listeners = new Set<() => void>();

function current(): LlmTheme {
  return document.documentElement.getAttribute("data-llm-theme") === "dark" ? "dark" : "light";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLlmTheme() {
  const theme = useSyncExternalStore(subscribe, current, () => "light" as LlmTheme);
  const toggle = useCallback(() => {
    const next: LlmTheme = current() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-llm-theme", next);
    try {
      localStorage.setItem(LLM_THEME_KEY, next);
    } catch {
      // Storage blocked: the choice lasts for this visit only.
    }
    listeners.forEach((l) => l());
  }, []);
  return { theme, toggle };
}
