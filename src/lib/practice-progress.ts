"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { PracticeModule, PracticeSet, PracticeQuestion, PracticeTopic } from "@/data/practice/types";

// ─────────────────────────────────────────────────────────────
// Practice progress, saved in this browser (localStorage), one key per
// practice set. Holds:
//   q:        per question — tries, right answers, whether the last answer was right
//   viva:     per viva prompt — best and last share of key points covered (0–1)
//   mocks:    per module — best and last exam-style score (percent): written
//             mock exams, and viva drills / the full viva for viva modules
//   plan:     today's three-task study plan (fixed for the day)
//   sessions: the latest finished rounds, newest first
//   days:     dates (YYYY-MM-DD) you practised
// ─────────────────────────────────────────────────────────────

export interface QuestionRecord { n: number; c: number; last: 0 | 1; t: number }
export interface VivaRecord { best: number; last: number; t: number }
export interface MockRecord { best: number; last: number; t: number }
export interface SessionRecord {
  label: string;
  kind: "quiz" | "mock" | "viva";
  score: number;
  total: number;
  ts: number;
}

export interface DailyPlan { day: string; topicId: string; vivaModuleId: string }

export interface PracticeProgress {
  plan?: DailyPlan;
  q: Record<string, QuestionRecord>;
  viva: Record<string, VivaRecord>;
  mocks: Record<string, MockRecord>;
  sessions: SessionRecord[];
  days: string[];
}

const EMPTY: PracticeProgress = { q: {}, viva: {}, mocks: {}, sessions: [], days: [] };
export const practiceKey = (setId: string) => `payark-practice-${setId}-v1`;

interface Store { cache: PracticeProgress | null; listeners: Set<() => void> }
const stores = new Map<string, Store>();
function store(key: string): Store {
  let s = stores.get(key);
  if (!s) { s = { cache: null, listeners: new Set() }; stores.set(key, s); }
  return s;
}

function read(key: string): PracticeProgress {
  const st = store(key);
  if (st.cache) return st.cache;
  let p: PracticeProgress = EMPTY;
  try {
    const raw = localStorage.getItem(key);
    if (raw) p = { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    // Unreadable or blocked storage: start fresh.
  }
  st.cache = p;
  return p;
}

function write(key: string, next: PracticeProgress) {
  const st = store(key);
  st.cache = next;
  try {
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    // Storage blocked: progress lasts for this visit only.
  }
  st.listeners.forEach((l) => l());
}

export const today = () => new Date().toISOString().slice(0, 10);
const withDay = (p: PracticeProgress) => (p.days.includes(today()) ? p.days : [...p.days, today()].slice(-400));

export function usePracticeProgress(setId: string) {
  const key = practiceKey(setId);
  const subscribe = useCallback((l: () => void) => {
    const st = store(key);
    st.listeners.add(l);
    return () => { st.listeners.delete(l); };
  }, [key]);
  const progress = useSyncExternalStore(subscribe, () => read(key), () => EMPTY);

  /** Save the answers to a batch of questions (one write for the batch). */
  const recordAnswers = useCallback((answers: { id: string; right: boolean }[]) => {
    const p = read(key);
    const q = { ...p.q };
    const t = Date.now();
    for (const { id, right } of answers) {
      const r = q[id] ?? { n: 0, c: 0, last: 0 as const, t: 0 };
      q[id] = { n: r.n + 1, c: r.c + (right ? 1 : 0), last: right ? 1 : 0, t };
    }
    write(key, { ...p, q, days: withDay(p) });
  }, [key]);

  const recordViva = useCallback((id: string, share: number) => {
    const p = read(key);
    const old = p.viva[id];
    write(key, { ...p, viva: { ...p.viva, [id]: { best: Math.max(share, old?.best ?? 0), last: share, t: Date.now() } }, days: withDay(p) });
  }, [key]);

  const recordMock = useCallback((moduleId: string, pct: number) => {
    const p = read(key);
    const old = p.mocks[moduleId];
    write(key, { ...p, mocks: { ...p.mocks, [moduleId]: { best: Math.max(pct, old?.best ?? 0), last: pct, t: Date.now() } } });
  }, [key]);

  const logSession = useCallback((s: Omit<SessionRecord, "ts">) => {
    const p = read(key);
    write(key, { ...p, sessions: [{ ...s, ts: Date.now() }, ...p.sessions].slice(0, 80), days: withDay(p) });
  }, [key]);

  /** Set today's plan once per day; later calls the same day keep it. */
  const ensurePlan = useCallback((make: () => Omit<DailyPlan, "day">) => {
    const p = read(key);
    if (p.plan?.day === today()) return;
    write(key, { ...p, plan: { day: today(), ...make() } });
  }, [key]);

  return { progress, recordAnswers, recordViva, recordMock, logSession, ensurePlan };
}

// ── Derived numbers ───────────────────────────────────────────

export interface IdQuestion extends PracticeQuestion { id: string; topic: PracticeTopic; module: PracticeModule }

/** Every question of a module, with its stable id (topicId-index). */
export function moduleQuestions(m: PracticeModule): IdQuestion[] {
  return m.topics.flatMap((t) => t.qs.map((q, i) => ({ ...q, id: `${t.id}-${i}`, topic: t, module: m })));
}
export const vivaId = (m: PracticeModule, i: number) => `${m.id}-v${i}`;

const mastered = (p: PracticeProgress, id: string) => p.q[id]?.last === 1;

export function topicMastery(p: PracticeProgress, t: PracticeTopic): number {
  if (!t.qs.length) return 0;
  return t.qs.filter((_, i) => mastered(p, `${t.id}-${i}`)).length / t.qs.length;
}

export function quizMastery(p: PracticeProgress, m: PracticeModule): number {
  const qs = moduleQuestions(m);
  return qs.length ? qs.filter((q) => mastered(p, q.id)).length / qs.length : 0;
}

export function vivaScore(p: PracticeProgress, m: PracticeModule): number {
  const v = m.viva ?? [];
  return v.length ? v.reduce((s, _, i) => s + (p.viva[vivaId(m, i)]?.best ?? 0), 0) / v.length : 0;
}

/** MCQ modules: questions last answered right. Viva modules: half that, half viva drill scores. */
export function moduleReadiness(p: PracticeProgress, m: PracticeModule): number {
  return m.kind !== "mcq" ? 0.5 * quizMastery(p, m) + 0.5 * vivaScore(p, m) : quizMastery(p, m);
}

export function setReadiness(p: PracticeProgress, set: PracticeSet): number {
  return set.modules.length ? set.modules.reduce((s, m) => s + moduleReadiness(p, m), 0) / set.modules.length : 0;
}

export function totals(p: PracticeProgress) {
  let answered = 0, right = 0;
  for (const r of Object.values(p.q)) { answered += r.n; right += r.c; }
  return { answered, right, accuracy: answered ? Math.round((100 * right) / answered) : 0 };
}

/** Questions whose last answer was wrong. */
export function mistakes(p: PracticeProgress, set: PracticeSet): IdQuestion[] {
  return set.modules.flatMap(moduleQuestions).filter((q) => p.q[q.id]?.last === 0);
}

export function shuffle<T>(a: T[]): T[] {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

/** Up to n questions: some recent mistakes first, then ones never seen, then the longest unseen. */
export function pickSmart(p: PracticeProgress, pool: IdQuestion[], n: number): IdQuestion[] {
  const wrong = shuffle(pool.filter((q) => p.q[q.id]?.last === 0));
  const unseen = shuffle(pool.filter((q) => !p.q[q.id]));
  const seen = pool.filter((q) => p.q[q.id]?.last === 1).sort((a, b) => p.q[a.id].t - p.q[b.id].t);
  const order = [...wrong.slice(0, Math.ceil(n * 0.4)), ...unseen, ...seen, ...wrong];
  return order.filter((q, i) => order.indexOf(q) === i).slice(0, n);
}

/** Topics ordered weakest first: lowest mastery, then ones already tried before untouched ones. */
export function weakestTopics(p: PracticeProgress, set: PracticeSet) {
  const all = set.modules.flatMap((m) => m.topics.map((t) => {
    const tried = t.qs.some((_, i) => p.q[`${t.id}-${i}`]);
    return { m, t, mastery: topicMastery(p, t), tried };
  }));
  return all.sort((a, b) => a.mastery - b.mastery || Number(b.tried) - Number(a.tried));
}

/** Projected exam marks for a module from its latest exam-style score, or null before any. */
export function projectedMarks(p: PracticeProgress, m: PracticeModule, outOf = 25): number | null {
  const r = p.mocks[m.id];
  return r ? Math.round((r.last * outOf) / 100) : null;
}
