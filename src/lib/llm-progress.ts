"use client";

import { useCallback, useSyncExternalStore } from "react";
import { llmModules, type LlmModule, type LlmResource } from "@/data/llm/curriculum";

// ─────────────────────────────────────────────────────────────
// LLM track progress — stored in this browser (localStorage) until a
// database is added. One record holds everything:
//   resources: steps ticked off (main material and extras)
//   watch:     per video part, last position and furthest point (seconds)
//   built:     modules whose Build is finished
//   done:      modules whose Self-check is passed (= module complete)
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "payark-llm-progress-v1";

/** A video part counts as watched once this share of it has been played. */
export const WATCHED_THRESHOLD = 0.9;

export interface WatchState {
  /** Last position, seconds into the full video (resume point) */
  pos: number;
  /** Furthest position reached, seconds into the full video */
  max: number;
  /**
   * Stretches actually played, [from, to] in seconds, merged. Only time between
   * two nearby reports counts, so skipping ahead does not mark anything watched.
   */
  ranges?: [number, number][];
}

/** Two reports further apart than this are treated as a skip, not playback. */
const MAX_PLAY_GAP_SECONDS = 15;

function addRange(ranges: [number, number][], from: number, to: number): [number, number][] {
  const all = [...ranges, [from, to] as [number, number]].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const [a, b] of all) {
    const last = merged[merged.length - 1];
    if (last && a <= last[1] + 1) last[1] = Math.max(last[1], b);
    else merged.push([a, b]);
  }
  return merged;
}

/** Seconds played between `from` and `to`. Older records without ranges fall back to the furthest point. */
export function playedSeconds(w: WatchState | undefined, from: number, to: number): number {
  if (!w) return 0;
  if (!w.ranges) return Math.max(0, Math.min(w.max, to) - from);
  return w.ranges.reduce((sum, [a, b]) => sum + Math.max(0, Math.min(b, to) - Math.max(a, from)), 0);
}

export interface LlmProgress {
  resources: Record<string, boolean>;
  watch: Record<string, WatchState>;
  built: Record<string, boolean>;
  done: Record<string, boolean>;
}

const EMPTY: LlmProgress = { resources: {}, watch: {}, built: {}, done: {} };

let cache: LlmProgress | null = null;
const listeners = new Set<() => void>();

function read(): LlmProgress {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<LlmProgress>) : {};
    cache = {
      resources: parsed.resources ?? {},
      watch: parsed.watch ?? {},
      built: parsed.built ?? {},
      done: parsed.done ?? {},
    };
  } catch {
    cache = { ...EMPTY };
  }
  return cache;
}

function write(next: LlmProgress) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked: keep progress in memory for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

// ─────────────────────────────────────────────────────────────
// Steps: every module is main material → Build → Self-check
// ─────────────────────────────────────────────────────────────

export type LlmStep =
  | { kind: "resource"; key: string; resource: LlmResource }
  | { kind: "build"; key: string; text: string }
  | { kind: "check"; key: string; text: string };

export function moduleSteps(mod: LlmModule): LlmStep[] {
  return [
    ...mod.resources
      .filter((r) => r.role === "main")
      .map((r): LlmStep => ({ kind: "resource", key: r.id, resource: r })),
    { kind: "build", key: `build-${mod.id}`, text: mod.build },
    { kind: "check", key: `check-${mod.id}`, text: mod.doneWhen },
  ];
}

export function isStepDone(p: LlmProgress, mod: LlmModule, step: LlmStep): boolean {
  if (step.kind === "build") return !!p.built[String(mod.id)];
  if (step.kind === "check") return !!p.done[String(mod.id)];
  return !!p.resources[step.key];
}

/** 0–1. Video parts count partially while being watched. */
function stepFraction(p: LlmProgress, mod: LlmModule, step: LlmStep): number {
  if (isStepDone(p, mod, step)) return 1;
  return watchedShare(p, step);
}

export function watchedShare(p: LlmProgress, step: LlmStep): number {
  if (step.kind !== "resource" || !step.resource.video) return 0;
  const { start, end } = step.resource.video;
  return Math.min(1, playedSeconds(p.watch[step.key], start, end) / (end - start));
}

export function isModuleDone(p: LlmProgress, id: number): boolean {
  return !!p.done[String(id)];
}

export function moduleProgressPct(p: LlmProgress, mod: LlmModule): number {
  if (isModuleDone(p, mod.id)) return 100;
  const steps = moduleSteps(mod);
  const sum = steps.reduce((acc, s) => acc + stepFraction(p, mod, s), 0);
  return Math.round((sum / steps.length) * 100);
}

export function stepsDoneCount(p: LlmProgress, mod: LlmModule): number {
  return moduleSteps(mod).filter((s) => isStepDone(p, mod, s)).length;
}

/** The Self-check unlocks once every other step in the module is done. */
export function canCompleteModule(p: LlmProgress, mod: LlmModule): boolean {
  return moduleSteps(mod)
    .filter((s) => s.kind !== "check")
    .every((s) => isStepDone(p, mod, s));
}

export type LlmModuleStatus = "completed" | "in_progress" | "available" | "locked";

export function moduleStatus(p: LlmProgress, mod: LlmModule): LlmModuleStatus {
  if (isModuleDone(p, mod.id)) return "completed";
  if (!mod.prerequisites.every((id) => isModuleDone(p, id))) return "locked";
  return moduleProgressPct(p, mod) > 0 ? "in_progress" : "available";
}

export function overallProgressPct(p: LlmProgress): number {
  const total = llmModules.reduce((acc, m) => acc + moduleProgressPct(p, m), 0);
  return Math.round(total / llmModules.length);
}

/** First module in progress, else the first one ready to start. */
export function currentModule(p: LlmProgress): LlmModule | undefined {
  return (
    llmModules.find((m) => moduleStatus(p, m) === "in_progress") ??
    llmModules.find((m) => moduleStatus(p, m) === "available")
  );
}

export function nextStepIndex(p: LlmProgress, mod: LlmModule): number {
  const i = moduleSteps(mod).findIndex((s) => !isStepDone(p, mod, s));
  return i === -1 ? 0 : i;
}

// ─────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────

export function useLlmProgress() {
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY);

  const setStepDone = useCallback((mod: LlmModule, step: LlmStep, value: boolean) => {
    const p = read();
    const id = String(mod.id);
    if (step.kind === "build") write({ ...p, built: { ...p.built, [id]: value } });
    else if (step.kind === "check") write({ ...p, done: { ...p.done, [id]: value } });
    else write({ ...p, resources: { ...p.resources, [step.key]: value } });
  }, []);

  const toggleResource = useCallback((resourceId: string) => {
    const p = read();
    write({ ...p, resources: { ...p.resources, [resourceId]: !p.resources[resourceId] } });
  }, []);

  /** Called by the video player every few seconds while playing. */
  const recordWatch = useCallback((resource: LlmResource, position: number) => {
    if (!resource.video) return;
    const p = read();
    const prev = p.watch[resource.id];
    const { start, end } = resource.video;
    const max = Math.max(prev?.max ?? start, position);
    let ranges = prev?.ranges ?? [];
    const gap = prev ? position - prev.pos : Infinity;
    if (prev && gap > 0 && gap <= MAX_PLAY_GAP_SECONDS) ranges = addRange(ranges, prev.pos, position);
    const next: WatchState = { pos: position, max, ranges };
    const reached = playedSeconds(next, start, end) / (end - start) >= WATCHED_THRESHOLD;
    write({
      ...p,
      watch: { ...p.watch, [resource.id]: next },
      resources: reached ? { ...p.resources, [resource.id]: true } : p.resources,
    });
  }, []);

  return { progress, setStepDone, toggleResource, recordWatch };
}
