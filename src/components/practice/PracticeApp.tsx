"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { PracticeModule, PracticeSet, PracticeTopic, VivaPrompt } from "@/data/practice/types";
import {
  mistakes, moduleQuestions, moduleReadiness, pickSmart, setReadiness, shuffle, topicMastery, totals,
  usePracticeProgress, vivaId, type IdQuestion, type PracticeProgress, type SessionRecord,
} from "@/lib/practice-progress";
import { Icon, ICONS, SiteTopBar } from "@/components/site/SiteParts";

// ─────────────────────────────────────────────────────────────
// A practice set (e.g. the INFS CPT exam): readiness by module, quiz
// rounds that explain every answer, timed mocks with no feedback until
// the end, viva drills scored on key points, and a mistake bank.
// Styles: the ".prac" section of src/app/llm/llm.css.
// ─────────────────────────────────────────────────────────────

type Mode = "practice" | "mock";
interface Item { q: IdQuestion; order: number[]; pick: number | null }
type View =
  | { name: "home" }
  | { name: "module"; id: string }
  | { name: "intro"; topicId: string }
  | { name: "quiz"; items: Item[]; i: number; mode: Mode; label: string; back?: string; streak: number; best: number; endAt: number }
  | { name: "results"; items: Item[]; mode: Mode; label: string; back?: string; best: number; timeUp: boolean }
  | { name: "viva"; moduleId: string; items: { v: VivaPrompt; idx: number; shown: boolean; ticks: number[] }[]; i: number; scores: number[] }
  | { name: "vivaDone"; moduleId: string; scores: number[] };

const LETTERS = "ABCD";
const pct = (n: number, d: number) => (d ? Math.round((100 * n) / d) : 0);
const fmt = (ts: number) =>
  new Date(ts).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

function Meter({ value, color, label }: { value: number; color?: string; label: string }) {
  const v = Math.round(value * 100);
  return (
    <div className="bar" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span style={{ width: `${v}%`, background: color }} />
    </div>
  );
}

export default function PracticeApp({ set }: { set: PracticeSet }) {
  const { progress, recordAnswers, recordViva, recordMock, logSession } = usePracticeProgress(set.id);
  const [view, setViewState] = useState<View>({ name: "home" });
  // Handlers read the latest view from here, so fast clicks and key presses
  // never act on a stale copy from an earlier render.
  const viewRef = useRef<View>(view);
  const setView = (v: View) => {
    viewRef.current = v;
    setViewState(v);
  };
  const allQ = useMemo(() => set.modules.flatMap(moduleQuestions), [set]);

  const go = (v: View) => {
    setView(v);
    window.scrollTo(0, 0);
  };

  const startQuiz = (qs: IdQuestion[], opts: { label: string; back?: string; mode?: Mode; minutes?: number }) => {
    if (!qs.length) return;
    go({
      name: "quiz", items: qs.map((q) => ({ q, order: shuffle([0, 1, 2, 3]), pick: null })), i: 0,
      mode: opts.mode ?? "practice", label: opts.label, back: opts.back, streak: 0, best: 0,
      endAt: opts.minutes ? Date.now() + opts.minutes * 60000 : 0,
    });
  };

  const finishQuiz = (v: Extract<View, { name: "quiz" }>, timeUp: boolean) => {
    const answered = v.mode === "practice" ? v.items.filter((it) => it.pick !== null) : v.items;
    if (!answered.length) return go(v.back ? { name: "module", id: v.back } : { name: "home" });
    if (v.mode === "mock") {
      recordAnswers(answered.map((it) => ({ id: it.q.id, right: it.pick === it.q.a })));
      const per = new Map<string, { s: number; t: number }>();
      for (const it of answered) {
        const r = per.get(it.q.module.id) ?? { s: 0, t: 0 };
        r.t++;
        if (it.pick === it.q.a) r.s++;
        per.set(it.q.module.id, r);
      }
      per.forEach((r, id) => recordMock(id, pct(r.s, r.t)));
    }
    const score = answered.filter((it) => it.pick === it.q.a).length;
    logSession({ label: v.label, kind: v.mode === "mock" ? "mock" : "quiz", score, total: answered.length });
    go({ name: "results", items: answered, mode: v.mode, label: v.label, back: v.back, best: v.best, timeUp });
  };

  let body: React.ReactNode;
  switch (view.name) {
    case "home":
      body = <HomeView set={set} p={progress} allQ={allQ} go={go} startQuiz={startQuiz} />;
      break;
    case "module":
      body = <ModuleView set={set} p={progress} m={set.modules.find((m) => m.id === view.id)!} go={go} startQuiz={startQuiz} />;
      break;
    case "intro": {
      const m = set.modules.find((mm) => mm.topics.some((t) => t.id === view.topicId))!;
      const t = m.topics.find((tt) => tt.id === view.topicId)!;
      body = <IntroView m={m} t={t} go={go} start={() => startQuiz(shuffle(moduleQuestions(m).filter((q) => q.topic.id === t.id)), { label: `${m.id} · ${t.title}`, back: m.id })} />;
      break;
    }
    case "quiz":
      body = (
        <QuizView
          v={view}
          onPick={(oi) => {
            const view = viewRef.current;
            if (view.name !== "quiz") return;
            const it = view.items[view.i];
            if (view.mode === "practice") {
              if (it.pick !== null) return;
              const right = oi === it.q.a;
              const items = view.items.map((x, k) => (k === view.i ? { ...x, pick: oi } : x));
              const streak = right ? view.streak + 1 : 0;
              recordAnswers([{ id: it.q.id, right }]);
              setView({ ...view, items, streak, best: Math.max(view.best, streak) });
            } else {
              setView({ ...view, items: view.items.map((x, k) => (k === view.i ? { ...x, pick: oi } : x)) });
            }
          }}
          onMove={(d) => {
            const view = viewRef.current;
            if (view.name !== "quiz") return;
            const i = view.i + d;
            if (i >= view.items.length) return finishQuiz(view, false);
            if (i < 0) return;
            setView({ ...view, i });
            window.scrollTo(0, 0);
          }}
          onFinish={(timeUp) => {
            const cur = viewRef.current;
            if (cur.name === "quiz") finishQuiz(cur, timeUp);
          }}
          onQuit={() => {
            const cur = viewRef.current;
            if (cur.name !== "quiz") return;
            if (cur.mode === "practice") finishQuiz(cur, false);
            else go(cur.back ? { name: "module", id: cur.back } : { name: "home" });
          }}
        />
      );
      break;
    case "results":
      body = <ResultsView set={set} v={view} go={go} retry={(qs) => startQuiz(shuffle(qs), { label: "Retry missed", back: view.back })} />;
      break;
    case "viva":
      body = (
        <VivaView
          v={view}
          setView={setView}
          latest={() => viewRef.current}
          onScore={() => {
            const view = viewRef.current;
            if (view.name !== "viva") return;
            const it = view.items[view.i];
            const share = it.ticks.length / it.v.p.length;
            const m = set.modules.find((mm) => mm.id === view.moduleId)!;
            recordViva(vivaId(m, it.idx), share);
            const scores = [...view.scores, share];
            if (view.i + 1 < view.items.length) {
              setView({ ...view, i: view.i + 1, scores });
              window.scrollTo(0, 0);
            } else {
              const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
              logSession({ label: `${view.moduleId} · viva drill`, kind: "viva", score: Math.round(avg * 100), total: 100 });
              go({ name: "vivaDone", moduleId: view.moduleId, scores });
            }
          }}
        />
      );
      break;
    case "vivaDone":
      body = <VivaDoneView set={set} v={view} go={go} />;
      break;
  }

  return (
    <>
      <SiteTopBar />
      <main className="dash prac">{body}</main>
    </>
  );
}

// ── Home ──────────────────────────────────────────────────────

type Go = (v: View) => void;
type StartQuiz = (qs: IdQuestion[], opts: { label: string; back?: string; mode?: Mode; minutes?: number }) => void;

function HomeView({ set, p, allQ, go, startQuiz }: { set: PracticeSet; p: PracticeProgress; allQ: IdQuestion[]; go: Go; startQuiz: StartQuiz }) {
  const t = totals(p);
  const miss = mistakes(p, set);
  const ready = setReadiness(p, set);
  const topics = set.modules.flatMap((m) => m.topics.map((tp) => ({ m, t: tp })));
  // Rotates as you answer; stable between server and browser renders.
  const fact = topics[t.answered % topics.length];
  const mcq = set.modules.filter((m) => m.kind === "mcq");
  const viva = set.modules.filter((m) => m.kind === "viva");
  const fullMock = () =>
    startQuiz(shuffle(mcq.flatMap((m) => shuffle(moduleQuestions(m)).slice(0, set.mockSize))), {
      label: "Full written mock · " + mcq.length + " modules", mode: "mock", minutes: mcq.length * set.mockSize,
    });

  return (
    <>
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">← All courses</Link>
        <span aria-hidden="true">·</span>
        <Link href="/practice">Practice</Link>
      </nav>

      <section className="card prac-hero" aria-label="Exam readiness">
        <div className="prac-ready">
          <span className="label">Exam readiness</span>
          <b className="prac-big">{Math.round(ready * 100)}%</b>
          <div className="prac-plates" aria-label="Readiness by module">
            {set.modules.map((m) => {
              const r = moduleReadiness(p, m);
              return (
                <button key={m.id} type="button" className="prac-plate" onClick={() => go({ name: "module", id: m.id })} title={`${m.id} ${m.name}: ${Math.round(r * 100)}% ready`}>
                  <span className="prac-plate-col" style={{ "--c": m.color } as React.CSSProperties}>
                    <span style={{ height: `${Math.max(4, Math.round(r * 100))}%` }} />
                  </span>
                  <span className="mono faint">{m.id}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="hero-body">
          <div className="row wrap" style={{ gap: 8 }}>
            <span className="pill ok">Practice</span>
            <span className="faint" style={{ fontSize: 13 }}>{allQ.length} questions · {set.modules.reduce((n, m) => n + (m.viva?.length ?? 0), 0)} viva prompts</span>
          </div>
          <h1 style={{ fontSize: 26 }}>{set.title}</h1>
          <p className="muted">{set.tagline}</p>
          <div className="row wrap" style={{ marginTop: 4 }}>
            <button type="button" className="btn primary" onClick={() => startQuiz(pickSmart(p, allQ, 10), { label: "Today's set" })}>
              Today&apos;s set · 10 questions <Icon d={ICONS.arrow} />
            </button>
            <button type="button" className="btn" disabled={!miss.length} onClick={() => startQuiz(shuffle(miss).slice(0, 10), { label: "Mistake bank" })}>
              Mistake bank · {miss.length}
            </button>
            <button type="button" className="btn" onClick={fullMock}>Full written mock</button>
          </div>
        </div>
      </section>

      <div className="stats">
        <div className="card stat"><span className="label">Answers given</span><b>{t.answered}</b></div>
        <div className="card stat"><span className="label">Accuracy</span><b>{t.accuracy}%</b></div>
        <div className="card stat"><span className="label">Days practised</span><b>{p.days.length}</b></div>
      </div>

      <section className="card pad prac-fact" style={{ "--c": fact.m.color } as React.CSSProperties} aria-label="Did you know">
        <span className="label">Did you know · {fact.m.id} {fact.t.title}</span>
        <p style={{ marginTop: 6 }}>{fact.t.fact}</p>
      </section>

      <ModuleGrid title="Written paper (MCQ)" note="Recall: facts, numbers, definitions" mods={mcq} p={p} go={go} />
      <ModuleGrid title="Viva (oral exam)" note="Answer out loud, then score yourself" mods={viva} p={p} go={go} />

      <section aria-labelledby="prac-recent">
        <div className="section-head"><h2 id="prac-recent">Recent sessions</h2></div>
        <Sessions list={p.sessions.slice(0, 8)} pass={set.passPct} />
      </section>

      <p className="faint" style={{ fontSize: 13 }}>{set.rules} Progress is saved in this browser.</p>
    </>
  );
}

function ModuleGrid({ title, note, mods, p, go }: { title: string; note: string; mods: PracticeModule[]; p: PracticeProgress; go: Go }) {
  return (
    <section>
      <div className="section-head"><h2>{title}</h2><span className="faint" style={{ fontSize: 13 }}>{note}</span></div>
      <div className="prac-mods">
        {mods.map((m) => {
          const r = moduleReadiness(p, m);
          const mock = p.mocks[m.id];
          const qn = moduleQuestions(m).length;
          return (
            <button key={m.id} type="button" className="card prac-mod" onClick={() => go({ name: "module", id: m.id })}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="row" style={{ gap: 8 }}>
                  <span className="dot" style={{ background: m.color, width: 10, height: 10 }} aria-hidden="true" />
                  <b className="mono" style={{ fontSize: 14 }}>{m.id}</b>
                </span>
                {m.kind === "mcq" && mock ? (
                  <span className={`pill ${mock.best >= 60 ? "ok" : "warn"}`}>Best mock {mock.best}%</span>
                ) : (
                  <span className="pill">{m.kind === "viva" ? "Viva" : "MCQ"}</span>
                )}
              </div>
              <h3>{m.name}</h3>
              <p className="mono faint">
                {m.kind === "viva" ? `${m.viva?.length ?? 0} viva · ${qn} quiz questions` : `${qn} questions · ${m.topics.length} topics`}
              </p>
              <div className="row">
                <div className="grow"><Meter value={r} color={m.color} label={`${m.id} readiness`} /></div>
                <span className="mono faint">{Math.round(r * 100)}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Sessions({ list, pass }: { list: SessionRecord[]; pass: number }) {
  if (!list.length) return <div className="card pad muted">No sessions yet. Start with Today&apos;s set, or pick a module.</div>;
  return (
    <div className="card prac-list">
      {list.map((s, k) => {
        const pc = s.kind === "viva" ? s.score : pct(s.score, s.total);
        return (
          <div key={k} className="prac-li">
            <div className="grow">
              <div style={{ fontWeight: 600 }}>{s.label}</div>
              <div className="mono faint">{fmt(s.ts)}</div>
            </div>
            <span className={`pill ${pc >= pass ? "ok" : "warn"}`}>{s.kind === "viva" ? `${pc}%` : `${s.score}/${s.total} · ${pc}%`}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Module & topic intro ──────────────────────────────────────

function ModuleView({ set, p, m, go, startQuiz }: { set: PracticeSet; p: PracticeProgress; m: PracticeModule; go: Go; startQuiz: StartQuiz }) {
  const qs = moduleQuestions(m);
  const r = moduleReadiness(p, m);
  const mock = p.mocks[m.id];
  return (
    <>
      <nav className="crumb" aria-label="Breadcrumb">
        <button type="button" className="prac-link" onClick={() => go({ name: "home" })}>← {set.title}</button>
      </nav>
      <section className="card pad prac-modhead" style={{ "--c": m.color } as React.CSSProperties}>
        <div className="row wrap" style={{ justifyContent: "space-between" }}>
          <span className="label">{m.id} · {m.kind === "viva" ? "Viva module" : "MCQ module · 25 marks"}</span>
          {mock && <span className={`pill ${mock.best >= set.passPct ? "ok" : "warn"}`}>Mock best {mock.best}% · last {mock.last}%</span>}
        </div>
        <h1 style={{ fontSize: 26, marginTop: 6 }}>{m.name}</h1>
        <p className="muted" style={{ marginTop: 4 }}>{m.blurb}</p>
        <div className="row" style={{ marginTop: 14 }}>
          <div className="grow"><Meter value={r} color={m.color} label={`${m.id} readiness`} /></div>
          <span className="mono faint">{Math.round(r * 100)}% ready</span>
        </div>
        <div className="row wrap" style={{ marginTop: 14 }}>
          {m.kind === "mcq" ? (
            <button type="button" className="btn primary" onClick={() => startQuiz(shuffle(qs).slice(0, set.mockSize), { label: `${m.id} · mock exam`, back: m.id, mode: "mock", minutes: set.mockSize })}>
              Mock exam · {set.mockSize} questions · {set.mockSize} min
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={() => go({ name: "viva", moduleId: m.id, i: 0, scores: [], items: shuffle((m.viva ?? []).map((v, idx) => ({ v, idx, shown: false, ticks: [] as number[] }))) })}>
              Viva drill · {m.viva?.length ?? 0} questions
            </button>
          )}
          <button type="button" className="btn" onClick={() => startQuiz(pickSmart(p, qs, 10), { label: `${m.id} · mixed round`, back: m.id })}>Mixed round · 10 questions</button>
        </div>
      </section>

      <section>
        <div className="section-head"><h2>Topics</h2><span className="faint" style={{ fontSize: 13 }}>Fact, 60-second primer, then questions</span></div>
        <div className="stack" style={{ gap: 12 }}>
          {m.topics.map((t) => {
            const tm = topicMastery(p, t);
            return (
              <div key={t.id} className="card prac-topic">
                <div className="grow stack" style={{ gap: 6 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600 }}>{t.title}</h3>
                  <p className="mono faint">{t.qs.length} questions · {Math.round(tm * 100)}% mastered</p>
                  <div style={{ maxWidth: 360 }}><Meter value={tm} color={m.color} label={`${t.title} mastery`} /></div>
                </div>
                <button type="button" className="btn" onClick={() => go({ name: "intro", topicId: t.id })}>Learn &amp; quiz <Icon d={ICONS.arrow} /></button>
              </div>
            );
          })}
        </div>
      </section>

      {m.viva && (
        <section>
          <div className="section-head"><h2>Viva questions</h2><span className="faint" style={{ fontSize: 13 }}>Best self-score</span></div>
          <div className="card prac-list">
            {m.viva.map((v, i) => {
              const rec = p.viva[vivaId(m, i)];
              return (
                <div key={i} className="prac-li">
                  <span className="grow">{v.q}</span>
                  <span className="mono faint">{rec ? `${Math.round(rec.best * 100)}%` : "–"}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

function IntroView({ m, t, go, start }: { m: PracticeModule; t: PracticeTopic; go: Go; start: () => void }) {
  return (
    <>
      <nav className="crumb" aria-label="Breadcrumb">
        <button type="button" className="prac-link" onClick={() => go({ name: "module", id: m.id })}>← {m.id} {m.name}</button>
      </nav>
      <div className="prac-col stack" style={{ gap: 16 }}>
        <h1 style={{ fontSize: 26 }}>{t.title}</h1>
        <section className="card pad prac-fact" style={{ "--c": m.color } as React.CSSProperties}>
          <span className="label">Did you know</span>
          <p style={{ marginTop: 6, fontSize: 17 }}>{t.fact}</p>
        </section>
        <section className="card pad">
          <span className="label">60-second primer</span>
          <ul className="howto" style={{ marginTop: 10, color: "var(--l-text)", fontSize: 15 }}>
            {t.primer.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </section>
        <div className="row"><button type="button" className="btn primary" onClick={start} autoFocus>Start {t.qs.length} questions <Icon d={ICONS.arrow} /></button></div>
      </div>
    </>
  );
}

// ── Quiz ──────────────────────────────────────────────────────

function Timer({ endAt, onEnd }: { endAt: number; onEnd: () => void }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, endAt - now);
  useEffect(() => {
    if (left === 0) onEnd();
  }, [left, onEnd]);
  const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
  return <span className={`pill ${left < 180000 ? "warn" : ""} mono`} style={{ fontSize: 14 }} aria-label="Time left">{m}:{String(s).padStart(2, "0")}</span>;
}

function QuizView({ v, onPick, onMove, onFinish, onQuit }: {
  v: Extract<View, { name: "quiz" }>;
  onPick: (oi: number) => void;
  onMove: (d: number) => void;
  onFinish: (timeUp: boolean) => void;
  onQuit: () => void;
}) {
  const it = v.items[v.i];
  const q = it.q;
  const n = v.items.length;
  const practice = v.mode === "practice";
  const answered = it.pick !== null;
  const letter = (oi: number) => LETTERS[it.order.indexOf(oi)];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const map: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
      const k = e.key.toLowerCase();
      if (k in map) {
        if (practice && answered) return;
        e.preventDefault();
        onPick(it.order[map[k]]);
      } else if (k === "enter" && practice && answered) {
        e.preventDefault();
        onMove(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [it, practice, answered, onPick, onMove]);

  return (
    <div className="prac-col stack" style={{ gap: 14 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <button type="button" className="prac-link" onClick={onQuit}>✕ {practice ? "End round" : "Leave mock"}</button>
        {practice ? (
          <span className={`pill ${v.streak >= 3 ? "ok" : ""}`}>{v.streak} in a row</span>
        ) : (
          <Timer endAt={v.endAt} onEnd={() => onFinish(true)} />
        )}
      </div>
      <Meter value={(v.i + (practice && answered ? 1 : 0)) / n} label="Round progress" />
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="mono faint">{v.label}</span>
        <span className="mono faint">Question {v.i + 1} of {n}</span>
      </div>
      <div className="row" style={{ gap: 8 }}>
        <span className="dot" style={{ background: q.module.color }} aria-hidden="true" />
        <span className="label" style={{ color: "var(--l-muted)" }}>{q.module.id} · {q.topic.title}</span>
      </div>
      <h2 className="prac-q">{q.q}</h2>
      <div className="stack" style={{ gap: 10 }} role="group" aria-label="Answer options">
        {it.order.map((oi, pos) => {
          let cls = "prac-opt";
          if (practice && answered) {
            if (oi === q.a) cls += " right";
            else if (oi === it.pick) cls += " wrong";
          } else if (!practice && it.pick === oi) cls += " sel";
          return (
            <button key={oi} type="button" className={cls} disabled={practice && answered} onClick={() => onPick(oi)} aria-pressed={it.pick === oi}>
              <span className="prac-key">{LETTERS[pos]}</span>
              <span>{q.o[oi]}</span>
            </button>
          );
        })}
      </div>

      {practice && answered && (
        <div className="stack" style={{ gap: 10 }} aria-live="polite">
          <div className="prac-ex good">
            <span className="label">{it.pick === q.a ? "Correct" : `The right answer is ${letter(q.a)}`}</span>
            <p>{q.w[q.a]}</p>
          </div>
          {it.pick !== q.a && it.pick !== null && (
            <div className="prac-ex bad">
              <span className="label">Why {letter(it.pick)} is wrong</span>
              <p>{q.w[it.pick]}</p>
            </div>
          )}
          <div className="prac-ex hook">
            <span className="label">Memory hook</span>
            <p>{q.h}</p>
          </div>
          <details className="prac-others">
            <summary>Why the other options are wrong</summary>
            {it.order.filter((oi) => oi !== q.a && oi !== it.pick).map((oi) => (
              <p key={oi}><b>{letter(oi)}.</b> {q.w[oi]}</p>
            ))}
          </details>
          <div className="row" style={{ justifyContent: "flex-end" }}>
            <span className="mono faint">Enter for next</span>
            <button type="button" className="btn primary" onClick={() => onMove(1)} autoFocus>
              {v.i + 1 < n ? "Next question" : "See results"} <Icon d={ICONS.arrow} />
            </button>
          </div>
        </div>
      )}
      {practice && !answered && <p className="mono faint">Press 1–4 or A–D to answer.</p>}
      {!practice && (
        <div className="row" style={{ justifyContent: "space-between", marginTop: 4 }}>
          <button type="button" className="btn" disabled={v.i === 0} onClick={() => onMove(-1)}>Previous</button>
          <span className="mono faint">{v.items.filter((x) => x.pick !== null).length} of {n} answered</span>
          {v.i + 1 < n ? (
            <button type="button" className="btn primary" onClick={() => onMove(1)}>Next</button>
          ) : (
            <button type="button" className="btn primary" onClick={() => onFinish(false)}>Finish and mark</button>
          )}
        </div>
      )}
    </div>
  );
}

function ResultsView({ set, v, go, retry }: { set: PracticeSet; v: Extract<View, { name: "results" }>; go: Go; retry: (qs: IdQuestion[]) => void }) {
  const score = v.items.filter((it) => it.pick === it.q.a).length;
  const p = pct(score, v.items.length);
  const passed = p >= set.passPct;
  const missed = v.items.filter((it) => it.pick !== it.q.a);
  const per = new Map<string, { s: number; t: number; name: string }>();
  for (const it of v.items) {
    const r = per.get(it.q.module.id) ?? { s: 0, t: 0, name: it.q.module.name };
    r.t++;
    if (it.pick === it.q.a) r.s++;
    per.set(it.q.module.id, r);
  }
  const msg = p >= 85 ? "Exam-ready on this set." : passed ? "Pass level. Keep sharpening." : `Below the ${set.passPct}% pass mark. Review the misses below.`;
  return (
    <div className="prac-col stack" style={{ gap: 16 }}>
      <section className={`card pad prac-score ${passed ? "pass" : "fail"}`}>
        <span className="label">{v.label}{v.timeUp ? " · time ran out" : ""}</span>
        <div className="row wrap" style={{ gap: 20, marginTop: 6 }}>
          <b className="prac-big">{score}<span className="faint" style={{ fontSize: "0.45em" }}>/{v.items.length}</span></b>
          <div className="stack" style={{ gap: 2 }}>
            <b style={{ fontSize: 22 }}>{p}%</b>
            <span className="muted">{msg}</span>
            {v.mode === "practice" && v.best > 1 && <span className="mono faint">Best streak: {v.best} in a row</span>}
          </div>
        </div>
        {v.mode === "mock" && (
          <div className="prac-list" style={{ marginTop: 14 }}>
            {[...per.entries()].map(([id, r]) => {
              const pc = pct(r.s, r.t);
              return (
                <div key={id} className="prac-li">
                  <span className="grow"><b className="mono">{id}</b> {r.name}</span>
                  <span className={`pill ${pc >= set.passPct ? "ok" : "warn"}`}>{r.s}/{r.t} · {pc}% · {pc >= set.passPct ? "pass" : "below pass mark"}</span>
                </div>
              );
            })}
          </div>
        )}
        <div className="row wrap" style={{ marginTop: 16 }}>
          {missed.length > 0 && <button type="button" className="btn primary" onClick={() => retry(missed.map((it) => it.q))} autoFocus>Retry the {missed.length} missed</button>}
          {v.back && <button type="button" className="btn" onClick={() => go({ name: "module", id: v.back! })}>Back to {v.back}</button>}
          <button type="button" className="btn" onClick={() => go({ name: "home" })}>Practice home</button>
        </div>
      </section>

      {missed.length > 0 && (
        <section>
          <div className="section-head"><h2>Review your misses</h2></div>
          <div className="stack" style={{ gap: 12 }}>
            {missed.map((it) => (
              <div key={it.q.id} className="card pad stack" style={{ gap: 8 }}>
                <span className="label" style={{ color: "var(--l-muted)" }}>{it.q.module.id} · {it.q.topic.title}</span>
                <b>{it.q.q}</b>
                <div className="prac-ex good"><span className="label">Answer: {it.q.o[it.q.a]}</span><p>{it.q.w[it.q.a]}</p></div>
                {it.pick !== null ? (
                  <div className="prac-ex bad"><span className="label">You chose: {it.q.o[it.pick]}</span><p>{it.q.w[it.pick]}</p></div>
                ) : (
                  <p className="mono faint">Not answered.</p>
                )}
                <p className="muted" style={{ fontSize: 14 }}><b>Hook:</b> {it.q.h}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Viva ──────────────────────────────────────────────────────

function VivaView({ v, setView, latest, onScore }: { v: Extract<View, { name: "viva" }>; setView: (v: View) => void; latest: () => View; onScore: () => void }) {
  const it = v.items[v.i];
  const n = v.items.length;
  const update = (patch: (cur: typeof it) => Partial<typeof it>) => {
    const cur = latest();
    if (cur.name !== "viva") return;
    setView({ ...cur, items: cur.items.map((x, k) => (k === cur.i ? { ...x, ...patch(x) } : x)) });
  };
  return (
    <div className="prac-col stack" style={{ gap: 14 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="label">{v.moduleId} · viva drill</span>
        <span className="mono faint">Question {v.i + 1} of {n}</span>
      </div>
      <Meter value={v.i / n} label="Drill progress" />
      <span className="label" style={{ color: "var(--l-muted)" }}>The examiner asks</span>
      <h2 className="prac-q">{it.v.q}</h2>
      {!it.shown ? (
        <>
          <div className="card pad muted">
            <b style={{ color: "var(--l-text)" }}>Answer out loud first.</b> Aim for 45–90 seconds in full sentences, as you would to the examiner. Then reveal the key points and tick the ones you covered.
          </div>
          <div className="row"><button type="button" className="btn primary" onClick={() => update(() => ({ shown: true }))} autoFocus>I&apos;ve answered. Show the key points</button></div>
        </>
      ) : (
        <>
          <div className="stack" style={{ gap: 8 }}>
            {it.v.p.map((pt, i) => {
              const on = it.ticks.includes(i);
              return (
                <label key={i} className={`prac-tick ${on ? "on" : ""}`}>
                  <input type="checkbox" checked={on} onChange={() => update((x) => ({ ticks: x.ticks.includes(i) ? x.ticks.filter((k) => k !== i) : [...x.ticks, i] }))} />
                  <span>{pt}</span>
                </label>
              );
            })}
          </div>
          <div className="prac-ex hook"><span className="label">Examiner tip</span><p>{it.v.tip}</p></div>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <span className="muted">You covered <b style={{ color: "var(--l-text)" }}>{it.ticks.length}/{it.v.p.length}</b></span>
            <button type="button" className="btn primary" onClick={onScore}>{v.i + 1 < n ? "Score and next" : "Score and finish"}</button>
          </div>
        </>
      )}
    </div>
  );
}

function VivaDoneView({ set, v, go }: { set: PracticeSet; v: Extract<View, { name: "vivaDone" }>; go: Go }) {
  const avg = v.scores.length ? v.scores.reduce((a, b) => a + b, 0) / v.scores.length : 0;
  const p = Math.round(avg * 100);
  const m = set.modules.find((mm) => mm.id === v.moduleId)!;
  return (
    <div className="prac-col">
      <section className={`card pad prac-score ${p >= set.passPct ? "pass" : "fail"}`}>
        <span className="label">{v.moduleId} viva drill</span>
        <div className="row wrap" style={{ gap: 20, marginTop: 6 }}>
          <b className="prac-big">{p}%</b>
          <div className="stack" style={{ gap: 2 }}>
            <b style={{ fontSize: 20 }}>{p >= 80 ? "Examiner-ready" : p >= set.passPct ? "Solid. Tighten the gaps." : "Rehearse the key points again"}</b>
            <span className="muted">Average share of key points you covered</span>
          </div>
        </div>
        <div className="row wrap" style={{ marginTop: 16 }}>
          <button type="button" className="btn primary" onClick={() => go({ name: "viva", moduleId: m.id, i: 0, scores: [], items: shuffle((m.viva ?? []).map((vv, idx) => ({ v: vv, idx, shown: false, ticks: [] as number[] }))) })}>Drill again</button>
          <button type="button" className="btn" onClick={() => go({ name: "module", id: m.id })}>Back to {m.id}</button>
          <button type="button" className="btn" onClick={() => go({ name: "home" })}>Practice home</button>
        </div>
      </section>
    </div>
  );
}
