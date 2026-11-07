"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { TrackModule, TrackResource } from "@/data/tracks/types";

// ─────────────────────────────────────────────────────────────
// Course progress — stored in this browser (localStorage) until a
// database is added. One record per course (its own storage key) holds:
//   resources: steps ticked off (main material and extras)
//   watch:     per video part, last position and furthest point (seconds)
//   built:     modules whose Build is finished
//   done:      modules whose Self-check is passed (= module complete)
// ─────────────────────────────────────────────────────────────

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

export interface TrackProgress {
  resources: Record<string, boolean>;
  watch: Record<string, WatchState>;
  built: Record<string, boolean>;
  done: Record<string, boolean>;
}

const EMPTY: TrackProgress = { resources: {}, watch: {}, built: {}, done: {} };

interface Store {
  cache: TrackProgress | null;
  listeners: Set<() => void>;
}

const stores = new Map<string, Store>();

function store(key: string): Store {
  let s = stores.get(key);
  if (!s) {
    s = { cache: null, listeners: new Set() };
    stores.set(key, s);
  }
  return s;
}

function read(key: string): TrackProgress {
  const st = store(key);
  if (st.cache) return st.cache;
  let cache: TrackProgress;
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as Partial<TrackProgress>) : {};
    cache = {
      resources: parsed.resources ?? {},
      watch: parsed.watch ?? {},
      built: parsed.built ?? {},
      done: parsed.done ?? {},
    };
  } catch {
    cache = { ...EMPTY };
  }
  st.cache = cache;
  return cache;
}

function write(key: string, next: TrackProgress) {
  const st = store(key);
  st.cache = next;
  try {
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    // Storage full or blocked: keep progress in memory for this visit.
  }
  st.listeners.forEach((l) => l());
}

function subscribeTo(key: string, listener: () => void) {
  const st = store(key);
  st.listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === key) {
      st.cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    st.listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

// ─────────────────────────────────────────────────────────────
// Steps: every module is main material → Build → Self-check
// ─────────────────────────────────────────────────────────────

export type TrackStep =
  | { kind: "resource"; key: string; resource: TrackResource }
  | { kind: "build"; key: string; text: string }
  | { kind: "check"; key: string; text: string };

export function moduleSteps(mod: TrackModule): TrackStep[] {
  return [
    ...mod.resources
      .filter((r) => r.role === "main")
      .map((r): TrackStep => ({ kind: "resource", key: r.id, resource: r })),
    { kind: "build", key: `build-${mod.id}`, text: mod.build },
    { kind: "check", key: `check-${mod.id}`, text: mod.doneWhen },
  ];
}

export function isStepDone(p: TrackProgress, mod: TrackModule, step: TrackStep): boolean {
  if (step.kind === "build") return !!p.built[String(mod.id)];
  if (step.kind === "check") return !!p.done[String(mod.id)];
  return !!p.resources[step.key];
}

/** 0–1. Video parts count partially while being watched. */
function stepFraction(p: TrackProgress, mod: TrackModule, step: TrackStep): number {
  if (isStepDone(p, mod, step)) return 1;
  return watchedShare(p, step);
}

export function watchedShare(p: TrackProgress, step: TrackStep): number {
  if (step.kind !== "resource" || !step.resource.video) return 0;
  const { start, end } = step.resource.video;
  return Math.min(1, playedSeconds(p.watch[step.key], start, end) / (end - start));
}

export function isModuleDone(p: TrackProgress, id: number): boolean {
  return !!p.done[String(id)];
}

export function moduleProgressPct(p: TrackProgress, mod: TrackModule): number {
  if (isModuleDone(p, mod.id)) return 100;
  const steps = moduleSteps(mod);
  const sum = steps.reduce((acc, s) => acc + stepFraction(p, mod, s), 0);
  return Math.round((sum / steps.length) * 100);
}

export function stepsDoneCount(p: TrackProgress, mod: TrackModule): number {
  return moduleSteps(mod).filter((s) => isStepDone(p, mod, s)).length;
}

/** The Self-check unlocks once every other step in the module is done. */
export function canCompleteModule(p: TrackProgress, mod: TrackModule): boolean {
  return moduleSteps(mod)
    .filter((s) => s.kind !== "check")
    .every((s) => isStepDone(p, mod, s));
}

export type ModuleStatus = "completed" | "in_progress" | "available" | "locked";

export function moduleStatus(p: TrackProgress, mod: TrackModule): ModuleStatus {
  if (isModuleDone(p, mod.id)) return "completed";
  if (!mod.prerequisites.every((id) => isModuleDone(p, id))) return "locked";
  return moduleProgressPct(p, mod) > 0 ? "in_progress" : "available";
}

export function overallProgressPct(p: TrackProgress, modules: TrackModule[]): number {
  const total = modules.reduce((acc, m) => acc + moduleProgressPct(p, m), 0);
  return Math.round(total / modules.length);
}

/** First module in progress, else the first one ready to start. */
export function currentModule(p: TrackProgress, modules: TrackModule[]): TrackModule | undefined {
  return (
    modules.find((m) => moduleStatus(p, m) === "in_progress") ??
    modules.find((m) => moduleStatus(p, m) === "available")
  );
}

export function nextStepIndex(p: TrackProgress, mod: TrackModule): number {
  const i = moduleSteps(mod).findIndex((s) => !isStepDone(p, mod, s));
  return i === -1 ? 0 : i;
}

// ─────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────

/** Progress for one course, identified by its storage key. */
export function useTrackProgress(key: string) {
  const subscribe = useCallback((listener: () => void) => subscribeTo(key, listener), [key]);
  const getSnapshot = useCallback(() => read(key), [key]);
  const progress = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const setStepDone = useCallback((mod: TrackModule, step: TrackStep, value: boolean) => {
    const p = read(key);
    const id = String(mod.id);
    if (step.kind === "build") write(key, { ...p, built: { ...p.built, [id]: value } });
    else if (step.kind === "check") write(key, { ...p, done: { ...p.done, [id]: value } });
    else write(key, { ...p, resources: { ...p.resources, [step.key]: value } });
  }, [key]);

  const toggleResource = useCallback((resourceId: string) => {
    const p = read(key);
    write(key, { ...p, resources: { ...p.resources, [resourceId]: !p.resources[resourceId] } });
  }, [key]);

  /** Called by the video player every few seconds while playing. */
  const recordWatch = useCallback((resource: TrackResource, position: number) => {
    if (!resource.video) return;
    const p = read(key);
    const prev = p.watch[resource.id];
    const { start, end } = resource.video;
    const max = Math.max(prev?.max ?? start, position);
    let ranges = prev?.ranges ?? [];
    const gap = prev ? position - prev.pos : Infinity;
    if (prev && gap > 0 && gap <= MAX_PLAY_GAP_SECONDS) ranges = addRange(ranges, prev.pos, position);
    const next: WatchState = { pos: position, max, ranges };
    const reached = playedSeconds(next, start, end) / (end - start) >= WATCHED_THRESHOLD;
    write(key, {
      ...p,
      watch: { ...p.watch, [resource.id]: next },
      resources: reached ? { ...p.resources, [resource.id]: true } : p.resources,
    });
  }, [key]);

  return { progress, setStepDone, toggleResource, recordWatch };
}
