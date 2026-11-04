"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  LLM_PHASES,
  LLM_TRACK,
  llmModules,
  formatMinutes,
  type LlmModule,
  type LlmResource,
} from "@/data/llm/curriculum";
import { VIDEOS, chaptersBetween, formatTime } from "@/data/llm/videos";
import {
  WATCHED_THRESHOLD,
  canCompleteModule,
  currentModule,
  isModuleDone,
  isStepDone,
  moduleProgressPct,
  moduleStatus,
  moduleSteps,
  nextStepIndex,
  overallProgressPct,
  playedSeconds,
  stepsDoneCount,
  useLlmProgress,
  watchedShare,
  type LlmProgress,
  type LlmStep,
} from "@/lib/llm-progress";
import { useLlmTheme } from "@/lib/llm-theme";
import VideoPart, { type VideoPartHandle } from "@/components/llm/VideoPart";

// ─────────────────────────────────────────────────────────────
// Layout C — "Player": syllabus on the left, the lesson on the right.
// ─────────────────────────────────────────────────────────────

const RESOURCE_LABEL: Record<LlmResource["type"], string> = {
  video: "Watch",
  playlist: "Series",
  code: "Code",
  book: "Book",
  course: "Course",
  article: "Read",
  paper: "Paper",
  tool: "Tool",
  dataset: "Dataset",
};

function stepLabel(step: LlmStep): string {
  if (step.kind === "build") return "Build";
  if (step.kind === "check") return "Self-check";
  return RESOURCE_LABEL[step.resource.type];
}

function stepShortTitle(step: LlmStep): string {
  if (step.kind === "build") return "Build";
  if (step.kind === "check") return "Self-check";
  const v = step.resource.video;
  return v ? `Part ${v.part}: ${v.partTitle}` : step.resource.title;
}

const pad2 = (n: number) => String(n).padStart(2, "0");

// ── Small icons (decorative) ─────────────────────────────────
function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
const TICK = "M5 12.5l4.5 4.5L19 7.5";
const LOCK = "M7 11V8a5 5 0 0110 0v3M5 11h14v9H5z";
const SUN = "M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 7a5 5 0 100 10 5 5 0 000-10z";
const MOON = "M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z";

// ── Progress bar of 12 segments, one per module ──────────────
function PathBar({ progress }: { progress: LlmProgress }) {
  const done = llmModules.filter((m) => isModuleDone(progress, m.id)).length;
  return (
    <div className="segbar" role="img" aria-label={`${done} of ${llmModules.length} modules complete`}>
      {llmModules.map((m) => (
        <span key={m.id}>
          <span style={{ width: `${moduleProgressPct(progress, m)}%` }} />
        </span>
      ))}
    </div>
  );
}

function TopBar({ progress }: { progress: LlmProgress }) {
  const { theme, toggle } = useLlmTheme();
  const done = llmModules.filter((m) => isModuleDone(progress, m.id)).length;
  return (
    <header className="topbar">
      <div className="topbar-in">
        <div className="stack">
          <Link href="/" className="back">← PayArk Academy</Link>
          <Link href="/llm" className="brand">{LLM_TRACK.title}</Link>
        </div>
        <div className="grow" style={{ minWidth: 200 }}>
          <PathBar progress={progress} />
        </div>
        <span className="muted" style={{ fontSize: 14 }}>
          <b style={{ color: "var(--l-text)" }}>{done} of {llmModules.length}</b> modules · {overallProgressPct(progress)}% of the path
        </span>
        <button
          type="button"
          className="iconbtn"
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          <Icon d={theme === "dark" ? SUN : MOON} size={18} />
        </button>
      </div>
    </header>
  );
}

// ── Syllabus ─────────────────────────────────────────────────
function Syllabus({
  progress,
  activeModule,
  activeStepKey,
  onPickStep,
}: {
  progress: LlmProgress;
  activeModule: LlmModule;
  activeStepKey: string;
  onPickStep: (key: string) => void;
}) {
  return (
    <nav className="syllabus" aria-label="Syllabus">
      {LLM_PHASES.map((phase) => (
        <div key={phase.phase}>
          <div className="label syl-phase">{phase.phase}</div>
          {llmModules
            .filter((m) => m.phase === phase.phase)
            .map((m) => {
              const status = moduleStatus(progress, m);
              const here = m.id === activeModule.id;
              return (
                <div key={m.id}>
                  <Link href={`/llm/${m.slug}`} className="syl-mod" aria-current={here ? "page" : undefined}>
                    <span className={`num ${status === "completed" ? "done" : here ? "current" : ""}`}>
                      {status === "completed" ? <Icon d={TICK} /> : pad2(m.id)}
                    </span>
                    <span className="grow stack">
                      <span style={{ fontWeight: here ? 600 : 500, fontSize: 14, color: status === "locked" ? "var(--l-muted)" : "var(--l-text)" }}>
                        {m.title}
                      </span>
                      <span className="faint" style={{ fontSize: 12 }}>
                        {status === "completed" ? "Completed" : status === "locked" ? `Locked · ${m.durationLabel}` : `${moduleProgressPct(progress, m)}% · ${m.durationLabel}`}
                      </span>
                    </span>
                    {status === "locked" && <span className="faint"><Icon d={LOCK} /></span>}
                  </Link>
                  {here && (
                    <ul className="syl-steps">
                      {moduleSteps(m).map((s) => {
                        const d = isStepDone(progress, m, s);
                        return (
                          <li key={s.key}>
                            <button type="button" onClick={() => onPickStep(s.key)} aria-current={s.key === activeStepKey ? "step" : undefined}>
                              <span className={`check small ${d ? "on" : ""}`} aria-hidden="true">{d && <Icon d={TICK} size={12} />}</span>
                              <span className="grow">{stepShortTitle(s)}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
        </div>
      ))}
    </nav>
  );
}

// ── The lesson: one step at a time ───────────────────────────
function Lesson({
  mod,
  step,
  progress,
  onDone,
  onUndo,
}: {
  mod: LlmModule;
  step: LlmStep;
  progress: LlmProgress;
  onDone: () => void;
  onUndo: () => void;
}) {
  const { recordWatch } = useLlmProgress();
  const videoRef = useRef<VideoPartHandle>(null);
  const done = isStepDone(progress, mod, step);

  if (step.kind === "resource" && step.resource.video) {
    const r = step.resource;
    const v = r.video!;
    const full = VIDEOS[v.videoKey];
    const share = watchedShare(progress, step);
    const resume = progress.watch[r.id]?.pos;
    const chapters = chaptersBetween(full, v.start, v.end);
    // Share of chapter i actually played (1 for every chapter once the part is done)
    const chapterShare = (i: number) => {
      if (done) return 1;
      const from = chapters[i].at;
      const to = chapters[i + 1]?.at ?? v.end;
      return to > from ? Math.min(1, playedSeconds(progress.watch[r.id], from, to) / (to - from)) : 0;
    };
    return (
      <div className="stack" style={{ gap: 16 }}>
        <VideoPart
          key={r.id}
          ref={videoRef}
          video={v}
          title={r.title}
          resumeAt={resume}
          watchedShare={done ? 1 : share}
          onProgress={(t) => recordWatch(r, t)}
        />
        <div className="row wrap" style={{ alignItems: "flex-start" }}>
          <div className="grow stack" style={{ gap: 4 }}>
            <div className="row wrap" style={{ gap: 8 }}>
              <span className="label">Watch</span>
              <span className="pill">Part {v.part} of {v.partCount}</span>
              {done && <span className="pill ok">Watched</span>}
            </div>
            <h2 style={{ fontSize: 20, lineHeight: 1.3 }}>{v.partTitle}</h2>
            <p className="faint" style={{ fontSize: 14 }}>
              {v.videoTitle} · {r.author} · {formatMinutes(r.minutes ?? 0)} · plays {formatTime(v.start)}–{formatTime(v.end)} of the full video
            </p>
            {r.note && <p className="muted" style={{ fontSize: 14 }}>{r.note}</p>}
            <p className="faint" style={{ fontSize: 13 }}>
              {done
                ? "Done."
                : share > 0
                  ? `Watched ${Math.round(share * 100)}%${resume ? ` · resumes at ${formatTime(resume)}` : ""} · ticks itself off at ${WATCHED_THRESHOLD * 100}%`
                  : `Ticks itself off once you've watched ${WATCHED_THRESHOLD * 100}% of it.`}
            </p>
          </div>
          {done ? (
            <button type="button" className="btn small" onClick={onUndo}>Undo</button>
          ) : (
            <button type="button" className="btn small" onClick={onDone}>Mark watched</button>
          )}
        </div>
        {chapters.length > 0 && (
          <div className="card pad">
            <div className="row wrap" style={{ justifyContent: "space-between" }}>
              <span className="label">In this part · {chapters.length} chapters</span>
              <span className="faint" style={{ fontSize: 13 }}>
                {chapters.filter((c, i) => chapterShare(i) >= WATCHED_THRESHOLD).length} of {chapters.length} watched
              </span>
            </div>
            <ol className="chapters">
              {chapters.map((c, i) => {
                const cs = chapterShare(i);
                const seen = cs >= WATCHED_THRESHOLD;
                const end = chapters[i + 1]?.at ?? v.end;
                const isResume = !done && resume !== undefined && resume >= c.at && resume < end;
                return (
                  <li key={c.at}>
                    <button type="button" onClick={() => videoRef.current?.seek(c.at)} aria-label={`Play from ${formatTime(c.at)}: ${c.title}${seen ? " (watched)" : cs > 0 ? ` (${Math.round(cs * 100)}% watched)` : ""}`}>
                      <span className={`check small ${seen ? "on" : cs > 0 ? "part" : ""}`} aria-hidden="true">
                        {seen && <Icon d={TICK} size={12} />}
                      </span>
                      <span className="mono">{formatTime(c.at)}</span>
                      <span className="grow" style={{ color: seen ? "var(--l-muted)" : "var(--l-text)" }}>{c.title}</span>
                      {isResume && <span className="pill ok">Resume here</span>}
                      {!seen && cs > 0 && !isResume && <span className="faint mono">{Math.round(cs * 100)}%</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    );
  }

  if (step.kind === "resource") {
    const r = step.resource;
    return (
      <div className="card pad stack" style={{ gap: 12 }}>
        <div className="row wrap" style={{ gap: 8 }}>
          <span className="label">{RESOURCE_LABEL[r.type]}</span>
          {r.author && <span className="faint" style={{ fontSize: 13 }}>{r.author}</span>}
          {done && <span className="pill ok">Done</span>}
        </div>
        <h2 style={{ fontSize: 20, lineHeight: 1.3 }}>{r.title}</h2>
        {r.note && <p className="muted">{r.note}</p>}
        <div className="row wrap">
          <a className="btn primary" href={r.url} target="_blank" rel="noopener noreferrer">
            Open {RESOURCE_LABEL[r.type].toLowerCase()} ↗
          </a>
          {done ? (
            <button type="button" className="btn" onClick={onUndo}>Undo</button>
          ) : (
            <button type="button" className="btn" onClick={onDone}>Mark done</button>
          )}
        </div>
        <p className="faint" style={{ fontSize: 13 }}>Opens in a new tab. Come back and mark it done when you finish.</p>
      </div>
    );
  }

  if (step.kind === "build") {
    return (
      <div className="card pad stack" style={{ gap: 12 }}>
        <div className="row wrap" style={{ gap: 8 }}>
          <span className="pill warn">Build</span>
          {done && <span className="pill ok">Done</span>}
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.6 }}>{step.text}</p>
        {mod.hardware && <p className="faint" style={{ fontSize: 14 }}>Hardware: {mod.hardware}</p>}
        <div>
          {done ? (
            <button type="button" className="btn" onClick={onUndo}>Undo</button>
          ) : (
            <button type="button" className="btn primary" onClick={onDone}>I finished the build</button>
          )}
        </div>
      </div>
    );
  }

  const ready = canCompleteModule(progress, mod);
  return (
    <div className="card pad stack" style={{ gap: 12 }}>
      <div className="row wrap" style={{ gap: 8 }}>
        <span className="pill ok">Self-check</span>
        {done && <span className="pill ok">Module complete</span>}
      </div>
      <p className="label" style={{ marginTop: 4 }}>You&apos;re done when</p>
      <p style={{ fontSize: 17, lineHeight: 1.6 }}>{step.text}</p>
      <div>
        {done ? (
          <button type="button" className="btn" onClick={onUndo}>Undo</button>
        ) : (
          <button type="button" className="btn primary" onClick={onDone} disabled={!ready}>
            Yes, I can do this — complete module
          </button>
        )}
      </div>
      {!done && !ready && (
        <p className="faint" style={{ fontSize: 13 }}>
          Finish the other steps first. This check completes the module and unlocks the ones that depend on it.
        </p>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
type Tab = "lesson" | "steps" | "extras" | "about";

export default function Player({ slug }: { slug?: string }) {
  const { progress, setStepDone, toggleResource } = useLlmProgress();
  const mod =
    (slug ? llmModules.find((m) => m.slug === slug) : currentModule(progress)) ?? llmModules[0];
  return (
    <>
      <TopBar progress={progress} />
      {/* key: start fresh (next step, Lesson tab) when the module changes */}
      <ModuleView
        key={mod.id}
        mod={mod}
        progress={progress}
        setStepDone={setStepDone}
        toggleResource={toggleResource}
      />
    </>
  );
}

function ModuleView({
  mod,
  progress,
  setStepDone,
  toggleResource,
}: {
  mod: LlmModule;
  progress: LlmProgress;
  setStepDone: (mod: LlmModule, step: LlmStep, value: boolean) => void;
  toggleResource: (id: string) => void;
}) {
  const steps = moduleSteps(mod);
  const [pickedKey, setPickedKey] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("lesson");

  const activeIndex = pickedKey
    ? Math.max(0, steps.findIndex((s) => s.key === pickedKey))
    : nextStepIndex(progress, mod);
  const step = steps[activeIndex];
  const status = moduleStatus(progress, mod);
  const pct = moduleProgressPct(progress, mod);
  const extras = mod.resources.filter((r) => r.role === "extra");
  const missing = mod.prerequisites
    .filter((id) => !isModuleDone(progress, id))
    .map((id) => llmModules.find((m) => m.id === id))
    .filter((m): m is LlmModule => !!m);

  const pickStep = useCallback((key: string) => {
    setPickedKey(key);
    setTab("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const markDone = () => {
    setStepDone(mod, step, true);
    // Move on to the next unfinished step after this one, if any.
    const after = steps.findIndex((s, i) => i > activeIndex && !isStepDone(progress, mod, s));
    setPickedKey(after === -1 ? null : steps[after].key);
  };

  const idx = llmModules.findIndex((m) => m.id === mod.id);
  const prev = llmModules[idx - 1];
  const next = llmModules[idx + 1];

  return (
    <div className="shell">
      <Syllabus progress={progress} activeModule={mod} activeStepKey={step.key} onPickStep={pickStep} />

      <main className="main">
        <div className="stack" style={{ gap: 10 }}>
          <div className="row wrap" style={{ gap: 8 }}>
            <span className="pill">Module {mod.id}</span>
            <span className="pill">{mod.phase}</span>
            <span className="pill">{mod.durationLabel}</span>
            {status === "completed" && <span className="pill ok">Completed</span>}
            {status === "in_progress" && <span className="pill ok">In progress · {pct}%</span>}
            {status === "locked" && <span className="pill">Locked</span>}
          </div>
          <h1 style={{ fontSize: 26, lineHeight: 1.25 }}>{mod.title}</h1>
          <div className="row">
            <div className="bar grow" style={{ maxWidth: 420 }}>
              <span style={{ width: `${pct}%` }} />
            </div>
            <span className="mono faint">
              {stepsDoneCount(progress, mod)}/{steps.length} steps · step {activeIndex + 1}: {stepLabel(step)}
            </span>
          </div>
          {status === "locked" && missing.length > 0 && (
            <p className="notice">
              Recommended first:{" "}
              {missing.map((m, i) => (
                <span key={m.id}>
                  {i > 0 && " and "}
                  <Link href={`/llm/${m.slug}`}>Module {m.id} — {m.title}</Link>
                </span>
              ))}
              . You can still look around.
            </p>
          )}
        </div>

        <div className="tabs" role="tablist" aria-label="Module sections">
          {([
            ["lesson", "Lesson"],
            ["steps", `All steps (${steps.length})`],
            ["extras", `Extra material (${extras.length})`],
            ["about", "About this module"],
          ] as [Tab, string][]).map(([k, label]) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>
              {label}
            </button>
          ))}
        </div>

        {tab === "lesson" && (
          <Lesson
            mod={mod}
            step={step}
            progress={progress}
            onDone={markDone}
            onUndo={() => setStepDone(mod, step, false)}
          />
        )}

        {tab === "steps" && (
          <div className="stack" style={{ gap: 8 }}>
            {steps.map((s, i) => {
              const d = isStepDone(progress, mod, s);
              const share = watchedShare(progress, s);
              const locked = s.kind === "check" && !d && !canCompleteModule(progress, mod);
              return (
                <div key={s.key} className={`step ${d ? "done" : ""}`}>
                  <span className={`check ${d ? "on" : share > 0 ? "part" : ""}`} aria-hidden="true">
                    {d ? <Icon d={TICK} size={14} /> : i + 1}
                  </span>
                  <div className="grow stack" style={{ gap: 4 }}>
                    <span className="label">
                      {stepLabel(s)}
                      {s.kind === "resource" && s.resource.minutes ? ` · ${formatMinutes(s.resource.minutes)}` : ""}
                      {share > 0 && !d ? ` · ${Math.round(share * 100)}% watched` : ""}
                    </span>
                    <button type="button" className="open" onClick={() => pickStep(s.key)}>
                      {s.kind === "resource" ? s.resource.title : s.text}
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn small"
                    disabled={locked}
                    aria-pressed={d}
                    onClick={() => setStepDone(mod, s, !d)}
                  >
                    {d ? "Done ✓" : s.kind === "check" ? "Complete" : "Mark done"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {tab === "extras" && (
          <div className="stack" style={{ gap: 8 }}>
            <p className="muted" style={{ fontSize: 14 }}>
              Optional supporting material. It doesn&apos;t count toward progress — dip in when a main video loses you.
            </p>
            {extras.map((r) => {
              const d = !!progress.resources[r.id];
              return (
                <div key={r.id} className={`step ${d ? "done" : ""}`}>
                  <button
                    type="button"
                    className={`check ${d ? "on" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleResource(r.id)}
                    aria-pressed={d}
                    aria-label={d ? `Mark ${r.title} as not read` : `Mark ${r.title} as read`}
                  >
                    {d && <Icon d={TICK} size={14} />}
                  </button>
                  <div className="grow stack" style={{ gap: 4 }}>
                    <span className="label">{RESOURCE_LABEL[r.type]}{r.author ? ` · ${r.author}` : ""}</span>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                      {r.title} ↗
                    </a>
                    {r.note && <p className="muted" style={{ fontSize: 14 }}>{r.note}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "about" && (
          <div className="card pad stack" style={{ gap: 16 }}>
            <div className="stack" style={{ gap: 4 }}>
              <span className="label">Goal</span>
              <p>{mod.goal}</p>
            </div>
            {mod.hardware && (
              <div className="stack" style={{ gap: 4 }}>
                <span className="label">Hardware</span>
                <p>{mod.hardware}</p>
              </div>
            )}
            <div className="stack" style={{ gap: 6 }}>
              <span className="label">How this works</span>
              <ol className="howto">
                <li><b>Start at Module 0.</b> Opening the track always takes you to your next step.</li>
                <li><b>Each module is a few steps:</b> watch or read the main material, do the Build, then the Self-check.</li>
                <li><b>Long videos are split into parts</b> along the author&apos;s own chapters. Each part plays only its section.</li>
                <li><b>Videos track themselves.</b> Stop halfway and it remembers where; at {WATCHED_THRESHOLD * 100}% it ticks off.</li>
                <li><b>The Self-check completes the module</b> and unlocks the modules that depend on it.</li>
                <li><b>Progress is saved in this browser.</b> It won&apos;t follow you to another device yet.</li>
              </ol>
            </div>
          </div>
        )}

        <div className="row" style={{ justifyContent: "space-between", borderTop: "1px solid var(--l-border)", paddingTop: 16 }}>
          {prev ? <Link className="btn small" href={`/llm/${prev.slug}`}>← Module {prev.id}</Link> : <span />}
          {next ? <Link className="btn small" href={`/llm/${next.slug}`}>Module {next.id}: {next.title} →</Link> : <span />}
        </div>
      </main>
    </div>
  );
}
