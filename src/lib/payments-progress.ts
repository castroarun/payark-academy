"use client";

import { useSyncExternalStore } from "react";
import { m01Content } from "@/data/m01/content";
import type { ContentStep } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// Payments course progress, read from this browser.
// The module pages save finished steps under payark-progress-<moduleId>.
// Only Module 1 (M01) has lessons so far.
// ─────────────────────────────────────────────────────────────

/** Lessons per module; add a module here when its content is written. */
export const PAYMENTS_CONTENT: Record<string, ContentStep[]> = { M01: m01Content };

export const isPaymentsModuleAvailable = (id: string) => id in PAYMENTS_CONTENT;

function subscribeStorage(listener: () => void) {
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

/** Steps finished in one module, e.g. { "m01-step-1": true }. */
export function usePaymentsSteps(moduleId = "M01"): Record<string, boolean> {
  const raw = useSyncExternalStore(
    subscribeStorage,
    () => {
      try {
        return localStorage.getItem(`payark-progress-${moduleId}`) ?? "";
      } catch {
        return "";
      }
    },
    () => ""
  );
  try {
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}
