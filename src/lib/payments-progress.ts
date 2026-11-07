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

const CHANGED = "payark-payments-progress";

function subscribeStorage(listener: () => void) {
  window.addEventListener("storage", listener); // other tabs
  window.addEventListener(CHANGED, listener); // this tab
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(CHANGED, listener);
  };
}

/** Marks one lesson step finished. */
export function markPaymentsStepDone(moduleId: string, stepId: string) {
  const key = `payark-progress-${moduleId}`;
  try {
    const current = JSON.parse(localStorage.getItem(key) || "{}") as Record<string, boolean>;
    localStorage.setItem(key, JSON.stringify({ ...current, [stepId]: true }));
  } catch {
    // Storage blocked: nothing is saved this visit.
  }
  window.dispatchEvent(new Event(CHANGED));
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
