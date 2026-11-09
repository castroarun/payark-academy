"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { PracticeModule, PracticeSet, PracticeTopic, VivaPrompt } from "@/data/practice/types";
import {
  mistakes, moduleQuestions, moduleReadiness, pickSmart, projectedMarks, setReadiness, shuffle, today, topicMastery,
  usePracticeProgress, vivaId, vivaScore, weakestTopics, type IdQuestion, type PracticeProgress,
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
  | { name: "viva"; label: string; exam: boolean; back?: string; items: VivaItem[]; i: number; scores: { moduleId: string; share: number }[] }
  | { name: "vivaDone"; label: string; exam: boolean; back?: string; scores: { moduleId: string; share: number }[] };
interface VivaItem { m: PracticeModule; v: VivaPrompt; idx: number; shown: boolean; ticks: number[] }

const LETTERS = "ABCD";
const pct = (n: number, d: number) => (d ? Math.round((100 * n) / d) : 0);

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

  const startViva: StartViva = (picks, label, exam, back) => {
    if (!picks.length) return;
    go({ name: "viva", label, exam, back, i: 0, scores: [], items: picks.map((x) => ({ ...x, shown: false, ticks: [] })) });
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
      body = <HomeView set={set} p={progress} allQ={allQ} go={go} startQuiz={startQuiz} startViva={startViva} />;
      break;
    case "module":
      body = <ModuleView set={set} p={progress} m={set.modules.find((m) => m.id === view.id)!} go={go} startQuiz={startQuiz} startViva={startViva} />;
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
            recordViva(vivaId(it.m, it.idx), share);
            const scores = [...view.scores, { moduleId: it.m.id, share }];
            if (view.i + 1 < view.items.length) {
              setView({ ...view, i: view.i + 1, scores });
              window.scrollTo(0, 0);
              return;
            }
            // Each module's average share becomes its latest viva result (exam-style score).
            const per = new Map<string, number[]>();
            for (const sc of scores) per.set(sc.moduleId, [...(per.get(sc.moduleId) ?? []), sc.share]);
            per.forEach((arr, id) => recordMock(id, Math.round((100 * arr.reduce((a, b) => a + b, 0)) / arr.length)));
            const avg = scores.reduce((a, b) => a + b.share, 0) / scores.length;
            logSession({ label: view.label, kind: "viva", score: Math.round(avg * 100), total: 100 });
            go({ name: "vivaDone", label: view.label, exam: view.exam, back: view.back, scores });
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
type StartViva = (picks: { m: PracticeModule; v: VivaPrompt; idx: number }[], label: string, exam: boolean, back?: string) => void;

function HomeView({ set, p, allQ, go, startQuiz, startViva }: { set: PracticeSet; p: PracticeProgress; allQ: IdQuestion[]; go: Go; startQuiz: StartQuiz; startViva: StartViva }) {
  const { ensurePlan } = usePracticeProgress(set.id);
  const miss = mistakes(p, set);
  const mcq = set.modules.filter((m) => m.kind === "mcq");
  const viva = set.modules.filter((m) => m.kind === "viva");
  const weak = weakestTopics(p, set);

  // Today's plan is fixed once a day: the weakest topic and the weakest viva module at that moment.
  useEffect(() => {
    ensurePlan(() => {
      const t = weak[0];
      const vm = [...viva].sort((a, b) => vivaScore(p, a) - vivaScore(p, b))[0];
      return { topicId: t?.t.id ?? "", vivaModuleId: vm?.id ?? "" };
    });
  }, [ensurePlan, weak, viva, p]);

  const fullWritten = () =>
    startQuiz(shuffle(mcq.flatMap((m) => shuffle(moduleQuestions(m)).slice(0, set.mockSize))), {
      label: "Full written mock", mode: "mock", minutes: mcq.length * set.mockSize,
    });
  const fullViva = () =>
    startViva(viva.flatMap((m) => shuffle((m.viva ?? []).map((v, idx) => ({ m, v, idx }))).slice(0, 2)), "Full viva", true);

  return (
    <>
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">← All courses</Link>
        <span aria-hidden="true">·</span>
        <Link href="/practice">Practice</Link>
      </nav>

      <div className="row wrap" style={{ justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
        <div className="stack" style={{ gap: 6 }}>
          <h1 style={{ fontSize: 28 }}>{set.title}</h1>
          <p className="muted">{allQ.length} questions · {viva.reduce((n, m) => n + (m.viva?.length ?? 0), 0)} viva prompts · pass mark {set.passPct}% in every module</p>
        </div>
        <div className="row wrap">
          <button type="button" className="btn" disabled={!miss.length} onClick={() => startQuiz(shuffle(miss).slice(0, 10), { label: "Mistake bank" })}>Mistake bank · {miss.length}</button>
          <button type="button" className="btn" onClick={fullWritten}>Full written mock</button>
        </div>
      </div>

      <div className="prac-top">
        <ReadinessCard set={set} p={p} />
        <TodayCard set={set} p={p} allQ={allQ} go={go} startQuiz={startQuiz} startViva={startViva} />
      </div>

      <ModuleTable set={set} p={p} go={go} />

      <section className="card pad stack" style={{ gap: 14 }} aria-labelledby="prac-weak">
        <div className="row wrap" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 id="prac-weak" style={{ fontSize: 18, fontWeight: 700 }}>Weakest topics</h2>
          <span className="faint" style={{ fontSize: 13 }}>Lowest mastery first · pick one to drill it</span>
        </div>
        <div className="prac-weak">
          {weak.slice(0, 6).map(({ m, t, mastery }) => (
            <button key={t.id} type="button" className="prac-weak-row" onClick={() => go({ name: "intro", topicId: t.id })}>
              <span className="mono faint">{m.id}</span>
              <span className="prac-weak-name">{t.title}</span>
              <span className="bar warm"><span style={{ width: `${Math.round(mastery * 100)}%` }} /></span>
              <span className="mono faint" style={{ textAlign: "right" }}>{Math.round(mastery * 100)}%</span>
            </button>
          ))}
        </div>
      </section>

      <ExamSections set={set} p={p} go={go} startQuiz={startQuiz} startViva={startViva} fullWritten={fullWritten} fullViva={fullViva} />
    </>
  );
}

function Donut({ value, pass }: { value: number; pass: number }) {
  const r = 62, c = 2 * Math.PI * r, v = Math.round(value * 100);
  return (
    <svg width="148" height="148" viewBox="0 0 148 148" role="img" aria-label={`Exam readiness ${v} percent, pass line at ${pass} percent`} className="prac-donut">
      <circle cx="74" cy="74" r={r} fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="12" />
      <circle cx="74" cy="74" r={r} fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round"
        strokeDasharray={`${(c * Math.max(0.005, value)).toFixed(1)} ${c.toFixed(1)}`} transform="rotate(-90 74 74)" />
      <line x1="74" y1="4" x2="74" y2="20" className="prac-pass-stroke" strokeWidth="3" transform={`rotate(${pass * 3.6} 74 74)`} />
      <text x="74" y="72" textAnchor="middle" fontSize="34" fontWeight="800" fill="currentColor">{v}%</text>
      <text x="74" y="94" textAnchor="middle" fontSize="12" fill="currentColor" fillOpacity="0.7">ready</text>
    </svg>
  );
}

function ReadinessCard({ set, p }: { set: PracticeSet; p: PracticeProgress }) {
  const ready = setReadiness(p, set);
  const part = (kind: "mcq" | "viva") => {
    const ms = set.modules.filter((m) => m.kind === kind);
    return ms.length ? ms.reduce((n, m) => n + moduleReadiness(p, m), 0) / ms.length : 0;
  };
  const onTrack = set.modules.filter((m) => moduleReadiness(p, m) * 100 >= set.passPct).length;
  const gap = Math.round(ready * 100) - set.passPct;
  return (
    <section className="prac-ready-card" aria-label="Exam readiness">
      <span className="label">Exam readiness</span>
      <div className="row wrap" style={{ gap: 24 }}>
        <Donut value={ready} pass={set.passPct} />
        <div className="stack grow" style={{ gap: 10, minWidth: 140 }}>
          {([["Written paper", part("mcq")], ["Viva", part("viva")]] as const).map(([label, v]) => (
            <div key={label} className="stack" style={{ gap: 6 }}>
              <div className="row" style={{ justifyContent: "space-between" }}><span>{label}</span><span className="mono">{Math.round(v * 100)}%</span></div>
              <div className="prac-ready-bar"><span style={{ width: `${Math.round(v * 100)}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
      <p className="prac-ready-note">
        {gap >= 0 ? `${gap} points above` : `${-gap} points below`} the {set.passPct}% pass line (gold tick). {onTrack} of {set.modules.length} modules are on track.
      </p>
    </section>
  );
}

function TodayCard({ set, p, allQ, go, startQuiz, startViva }: { set: PracticeSet; p: PracticeProgress; allQ: IdQuestion[]; go: Go; startQuiz: StartQuiz; startViva: StartViva }) {
  const plan = p.plan?.day === today() ? p.plan : undefined;
  const ses = p.sessions.filter((s) => new Date(s.ts).toISOString().slice(0, 10) === today());
  const topic = plan && set.modules.flatMap((m) => m.topics.map((t) => ({ m, t }))).find((x) => x.t.id === plan.topicId);
  const vm = plan && set.modules.find((m) => m.id === plan.vivaModuleId);
  const miss = mistakes(p, set).length;
  const tasks = [
    {
      key: "set", title: "Warm-up: Today's set",
      detail: `10 mixed questions${miss ? `, starting with ones you got wrong (${miss} in the mistake bank)` : ""}.`,
      time: "8 min", done: ses.some((s) => s.label === "Today's set"),
      run: () => startQuiz(pickSmart(p, allQ, 10), { label: "Today's set" }),
    },
    topic && {
      key: "topic", title: `Drill: ${topic.m.id} ${topic.t.title}`,
      detail: `Your weakest topic at ${Math.round(topicMastery(p, topic.t) * 100)}%. Fact, primer, then ${topic.t.qs.length} questions.`,
      time: `${Math.max(4, topic.t.qs.length)} min`, done: ses.some((s) => s.label === `${topic.m.id} · ${topic.t.title}`),
      run: () => go({ name: "intro", topicId: topic.t.id }),
    },
    vm && {
      key: "viva", title: `Viva: ${vm.id} ${vm.name}`,
      detail: "Answer 3 prompts out loud, then tick the key points you covered.",
      time: "10 min", done: ses.some((s) => s.label === `${vm.id} · viva drill`),
      run: () => startViva(shuffle((vm.viva ?? []).map((v, idx) => ({ m: vm, v, idx }))).slice(0, 3), `${vm.id} · viva drill`, false),
    },
  ].filter(Boolean) as { key: string; title: string; detail: string; time: string; done: boolean; run: () => void }[];
  const doneN = tasks.filter((t) => t.done).length;
  const next = tasks.findIndex((t) => !t.done);
  return (
    <section className="card prac-today" aria-labelledby="prac-today">
      <div className="prac-today-head">
        <div className="stack" style={{ gap: 2 }}>
          <h2 id="prac-today" style={{ fontSize: 18, fontWeight: 700 }}>Today</h2>
          <span className="faint" style={{ fontSize: 13 }}>About 25 minutes, built from your weakest topics and missed questions</span>
        </div>
        <span className="faint" style={{ fontSize: 13 }}>{doneN} of {tasks.length} done</span>
      </div>
      {tasks.map((t, i) => (
        <div key={t.key} className="prac-task">
          <span className={`prac-check ${t.done ? "on" : ""}`} aria-hidden="true">{t.done ? "✓" : ""}</span>
          <div className="stack grow" style={{ gap: 3, minWidth: 220 }}>
            <b style={{ fontSize: 15, fontWeight: 600 }}>{t.title}</b>
            <span className="muted" style={{ fontSize: 13 }}>{t.detail}</span>
          </div>
          <span className="mono faint">{t.time}</span>
          <button type="button" className={`btn ${i === next ? "primary" : ""}`} onClick={t.run}>
            {t.done ? "Again" : "Start"}<span className="sr-only"> {t.title}</span>
          </button>
        </div>
      ))}
    </section>
  );
}

function ModuleTable({ set, p, go }: { set: PracticeSet; p: PracticeProgress; go: Go }) {
  return (
    <section className="card prac-table" aria-labelledby="prac-mods">
      <div className="prac-table-head">
        <h2 id="prac-mods" style={{ fontSize: 18, fontWeight: 700 }}>Modules</h2>
        <span className="faint" style={{ fontSize: 13 }}>Readiness from practice rounds · tick on each bar = {set.passPct}% pass line</span>
      </div>
      <div className="prac-scroll">
        <div className="prac-grid prac-grid-head" aria-hidden="true">
          <span>Code</span><span>Module</span><span>Paper</span><span>Readiness</span><span>Best score</span><span>Status</span>
        </div>
        {set.modules.map((m) => {
          const r = moduleReadiness(p, m);
          const pc = Math.round(r * 100);
          const ok = pc >= set.passPct;
          const best = p.mocks[m.id]?.best;
          return (
            <button key={m.id} type="button" className="prac-grid" onClick={() => go({ name: "module", id: m.id })}>
              <span className="mono faint">{m.id}</span>
              <b style={{ fontWeight: 600 }}>{m.name}</b>
              <span className="muted">{m.kind === "mcq" ? "Written" : "Viva"}</span>
              <span className="row" style={{ gap: 10 }}>
                <span className="prac-passbar" style={{ "--pass-at": `${set.passPct}%` } as React.CSSProperties}>
                  <span style={{ width: `${pc}%` }} />
                </span>
                <span className="mono" style={{ width: 40, textAlign: "right" }}>{pc}%</span>
              </span>
              <span className="mono faint">{best === undefined ? "–" : `${best}%`}</span>
              <span><span className={`pill ${ok ? "ok" : "warn"}`}>{ok ? "On track" : "Needs work"}</span></span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MarkCells({ marks, pass }: { marks: number | null; pass: number }) {
  return (
    <div className="prac-cells" role="img" aria-label={marks === null ? "No result yet" : `${marks} of 25, pass is ${pass}`}>
      {Array.from({ length: 25 }, (_, i) => (
        <span key={i} className={`${marks !== null && i < marks ? "on" : ""} ${i === pass - 1 ? "pass" : ""}`} />
      ))}
    </div>
  );
}

function ExamSections({ set, p, go, startQuiz, startViva, fullWritten, fullViva }: {
  set: PracticeSet; p: PracticeProgress; go: Go; startQuiz: StartQuiz; startViva: StartViva; fullWritten: () => void; fullViva: () => void;
}) {
  const passMarks = Math.round((set.passPct * 25) / 100);
  const papers = (["mcq", "viva"] as const).map((kind) => {
    const mods = set.modules.filter((m) => m.kind === kind);
    const rows = mods.map((m) => ({ m, marks: projectedMarks(p, m) }));
    const got = rows.reduce((n, r) => n + (r.marks ?? 0), 0);
    return { kind, mods, rows, got, total: mods.length * 25, done: rows.filter((r) => r.marks !== null).length };
  });
  const all = papers.reduce((n, x) => n + x.got, 0);
  const max = papers.reduce((n, x) => n + x.total, 0);
  const anyResult = papers.some((x) => x.done > 0);
  return (
    <section className="stack" style={{ gap: 12 }} aria-labelledby="prac-exam">
      <div className="row wrap" style={{ justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
        <div className="stack" style={{ gap: 4 }}>
          <h2 id="prac-exam" style={{ fontSize: 18, fontWeight: 700 }}>Exam result, projected</h2>
          <span className="faint" style={{ fontSize: 13 }}>Written paper from your mock exams. Viva from viva drills and the full viva. Practice rounds don&apos;t count here.</span>
        </div>
        <div className="row" style={{ gap: 8, alignItems: "baseline" }}>
          <b style={{ fontSize: 28, fontWeight: 800 }}>{anyResult ? all : "–"}</b>
          <span className="muted">/ {max} · pass {Math.round((set.passPct * max) / 100)}</span>
        </div>
      </div>
      <div className="prac-papers">
        {papers.map((pp) => (
          <div key={pp.kind} className="card prac-paper">
            <div className="prac-table-head">
              <div className="stack" style={{ gap: 2 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700 }}>{pp.kind === "mcq" ? "Written paper" : "Viva"}</h3>
                <span className="faint" style={{ fontSize: 13 }}>
                  {pp.kind === "mcq" ? "Online MCQ exam" : "Oral exam"} · {pp.mods.length} modules × 25 marks · {pp.done} of {pp.mods.length} tested
                </span>
              </div>
              <div className="row" style={{ gap: 12 }}>
                <span className="mono">{pp.done ? `${pp.got} / ${pp.total}` : `– / ${pp.total}`}</span>
                <button type="button" className="btn primary" onClick={pp.kind === "mcq" ? fullWritten : fullViva}>
                  {pp.kind === "mcq" ? "Take full written mock" : "Take full viva"}
                </button>
              </div>
            </div>
            {pp.rows.map(({ m, marks }) => {
              const ok = marks !== null && marks >= passMarks;
              const weakT = [...m.topics].sort((a, b) => topicMastery(p, a) - topicMastery(p, b))[0];
              const runModule = () =>
                m.kind === "mcq"
                  ? startQuiz(shuffle(moduleQuestions(m)).slice(0, set.mockSize), { label: `${m.id} · mock exam`, back: m.id, mode: "mock", minutes: set.mockSize })
                  : startViva(shuffle((m.viva ?? []).map((v, idx) => ({ m, v, idx }))), `${m.id} · viva drill`, false, m.id);
              return (
                <div key={m.id} className="prac-paper-row">
                  <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
                    <span className="row" style={{ gap: 10, alignItems: "baseline", minWidth: 0 }}>
                      <span className="mono faint">{m.id}</span>
                      <b style={{ fontWeight: 600 }}>{m.name}</b>
                    </span>
                    <span className={`mono ${marks === null ? "faint" : ok ? "prac-ok" : "prac-warn"}`} style={{ fontWeight: 600 }}>
                      {marks === null ? "– / 25" : `${marks} / 25`}
                    </span>
                  </div>
                  <MarkCells marks={marks} pass={passMarks} />
                  <div className="row wrap" style={{ justifyContent: "space-between", fontSize: 13 }}>
                    <span className="muted">
                      {marks === null
                        ? m.kind === "mcq" ? "No mock yet." : "No viva drill yet."
                        : ok ? `Pass level. Weakest topic: ${weakT?.title}` : `${passMarks - marks} marks to pass. Focus: ${weakT?.title}`}
                    </span>
                    <span className="row" style={{ gap: 14 }}>
                      {weakT && <button type="button" className="prac-link" onClick={() => go({ name: "intro", topicId: weakT.id })}>Drill weakest topic</button>}
                      <button type="button" className="prac-link strong" onClick={runModule}>{m.kind === "mcq" ? "Module mock" : "Module drill"}</button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="row wrap prac-legend">
        <span><i className="on" />Projected marks</span>
        <span><i />Still to earn</span>
        <span><i className="pass" />Pass line, {passMarks} of 25</span>
      </div>
    </section>
  );
}

// ── Module & topic intro ──────────────────────────────────────

function ModuleView({ set, p, m, go, startQuiz, startViva }: { set: PracticeSet; p: PracticeProgress; m: PracticeModule; go: Go; startQuiz: StartQuiz; startViva: StartViva }) {
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
          <div className="grow"><Meter value={r} label={`${m.id} readiness`} /></div>
          <span className="mono faint">{Math.round(r * 100)}% ready</span>
        </div>
        <div className="row wrap" style={{ marginTop: 14 }}>
          {m.kind === "mcq" ? (
            <button type="button" className="btn primary" onClick={() => startQuiz(shuffle(qs).slice(0, set.mockSize), { label: `${m.id} · mock exam`, back: m.id, mode: "mock", minutes: set.mockSize })}>
              Mock exam · {set.mockSize} questions · {set.mockSize} min
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={() => startViva(shuffle((m.viva ?? []).map((v, idx) => ({ m, v, idx }))), `${m.id} · viva drill`, false, m.id)}>
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
                  <div style={{ maxWidth: 360 }}><Meter value={tm} label={`${t.title} mastery`} /></div>
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

const VIVA_SECONDS = 120;

/** Per-question clock for the full viva. It only warns; you move on when ready. */
function VivaClock() {
  const [start] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, VIVA_SECONDS * 1000 - (now - start));
  const m = Math.floor(left / 60000), sec = Math.floor((left % 60000) / 1000);
  return (
    <span className={`pill mono ${left < 30000 ? "warn" : ""}`} style={{ fontSize: 14 }} aria-label="Time left for this answer">
      {left === 0 ? "Time's up. Wrap up" : `${m}:${String(sec).padStart(2, "0")}`}
    </span>
  );
}

function VivaView({ v, setView, latest, onScore }: { v: Extract<View, { name: "viva" }>; setView: (v: View) => void; latest: () => View; onScore: () => void }) {
  const it = v.items[v.i];
  const n = v.items.length;
  const update = (patch: (cur: VivaItem) => Partial<VivaItem>) => {
    const cur = latest();
    if (cur.name !== "viva") return;
    setView({ ...cur, items: cur.items.map((x, k) => (k === cur.i ? { ...x, ...patch(x) } : x)) });
  };
  return (
    <div className="prac-col stack" style={{ gap: 14 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="label">{v.label}</span>
        <span className="row" style={{ gap: 12 }}>
          {v.exam && !it.shown && <VivaClock key={v.i} />}
          <span className="mono faint">Question {v.i + 1} of {n}</span>
        </span>
      </div>
      <Meter value={v.i / n} label="Viva progress" />
      <span className="label" style={{ color: "var(--l-muted)" }}>{it.m.id} {it.m.name} · the examiner asks</span>
      <h2 className="prac-q">{it.v.q}</h2>
      {!it.shown ? (
        <>
          <div className="card pad muted">
            <b style={{ color: "var(--l-text)" }}>Answer out loud first.</b>{" "}
            {v.exam
              ? "You have about 2 minutes per question, as in the oral exam. Then reveal the key points and tick the ones you covered."
              : "Aim for 45–90 seconds in full sentences, as you would to the examiner. Then reveal the key points and tick the ones you covered."}
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
  const avg = v.scores.length ? v.scores.reduce((a, b) => a + b.share, 0) / v.scores.length : 0;
  const p = Math.round(avg * 100);
  const passMarks = Math.round((set.passPct * 25) / 100);
  const per = new Map<string, number[]>();
  for (const sc of v.scores) per.set(sc.moduleId, [...(per.get(sc.moduleId) ?? []), sc.share]);
  return (
    <div className="prac-col">
      <section className={`card pad prac-score ${p >= set.passPct ? "pass" : "fail"}`}>
        <span className="label">{v.label}</span>
        <div className="row wrap" style={{ gap: 20, marginTop: 6 }}>
          <b className="prac-big">{p}%</b>
          <div className="stack" style={{ gap: 2 }}>
            <b style={{ fontSize: 20 }}>{p >= 80 ? "Examiner-ready" : p >= set.passPct ? "Solid. Tighten the gaps." : "Rehearse the key points again"}</b>
            <span className="muted">Average share of key points you covered</span>
          </div>
        </div>
        {v.exam && (
          <div className="prac-list" style={{ marginTop: 14 }}>
            {[...per.entries()].map(([id, arr]) => {
              const m = set.modules.find((mm) => mm.id === id)!;
              const marks = Math.round((25 * arr.reduce((a, b) => a + b, 0)) / arr.length);
              return (
                <div key={id} className="prac-li">
                  <span className="grow"><b className="mono">{id}</b> {m.name}</span>
                  <span className={`pill ${marks >= passMarks ? "ok" : "warn"}`}>{marks} / 25 · {marks >= passMarks ? "pass" : "below pass mark"}</span>
                </div>
              );
            })}
          </div>
        )}
        <div className="row wrap" style={{ marginTop: 16 }}>
          {v.back && <button type="button" className="btn" onClick={() => go({ name: "module", id: v.back! })}>Back to {v.back}</button>}
          <button type="button" className="btn primary" onClick={() => go({ name: "home" })} autoFocus>Practice home</button>
        </div>
      </section>
    </div>
  );
}
