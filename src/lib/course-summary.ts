import type { Track, TrackModule } from "@/data/tracks/types";
import { modules as paymentModules } from "@/data/curriculum";
import { LEVELS } from "@/lib/types";
import { PAYMENTS_CATEGORY, type CategoryId } from "@/data/categories";
import { PAYMENTS_CONTENT } from "@/lib/payments-progress";
import {
  currentModule,
  isModuleDone,
  moduleProgressPct,
  moduleStatus,
  moduleSteps,
  nextStepIndex,
  overallProgressPct,
  type TrackProgress,
} from "@/lib/track-progress";

// ─────────────────────────────────────────────────────────────
// Turns a course and its saved progress into what the dashboard card
// and the overview page show. Every number comes from the course data
// or from progress saved in this browser.
// ─────────────────────────────────────────────────────────────

/** A text preview: e.g. kicker "Course", text "Harvard CS50P", in the phase colour. */
export interface PreviewTile {
  kicker: string;
  text: string;
  color: string;
}

const TYPE_LABEL: Record<string, string> = {
  video: "Video", playlist: "Video series", code: "Code", book: "Book", course: "Course",
  article: "Article", paper: "Paper", tool: "Tool", dataset: "Dataset",
};

export type RowStatus = "completed" | "in_progress" | "available" | "locked" | "soon";

export interface ModuleRow {
  key: string;
  /** "00" or "M01" */
  num: string;
  title: string;
  /** null when the module has no lessons yet */
  href: string | null;
  meta: string;
  desc: string;
  status: RowStatus;
  pct: number;
  thumbId: string | null;
  /** Shown instead of a preview when the module has no video */
  tile: PreviewTile;
}

export interface ModuleSection {
  title: string;
  blurb: string;
  color: string;
  rows: ModuleRow[];
}

export interface CourseSummary {
  id: "payments" | "llm" | "healthspan";
  category: CategoryId;
  title: string;
  tagline: string;
  summary: string;
  meta: string;
  overviewHref: string;
  /** Where "Continue" goes: the module you're on */
  continueHref: string;
  color: string;
  /** YouTube id of the next video, for the preview image */
  thumbId: string | null;
  pct: number;
  started: boolean;
  modulesDone: number;
  moduleCount: number;
  /** e.g. "Module 3: Backprop" */
  moduleLine: string;
  /** e.g. "Part 2 of 4: The chain rule" */
  stepLine: string;
  modulePct: number;
  videosWatched: number;
  sections: ModuleSection[];
}

const pad2 = (n: number) => String(n).padStart(2, "0");
function tileFor(m: TrackModule, color: string): PreviewTile {
  const first = m.resources.find((r) => r.role === "main") ?? m.resources[0];
  return { kicker: first ? TYPE_LABEL[first.type] ?? "Resource" : "Module", text: first?.title ?? m.title, color };
}

const firstVideoId = (m: TrackModule) => m.resources.find((r) => r.role === "main" && r.video)?.video?.youtubeId ?? null;

export function summarizeTrack(track: Track, p: TrackProgress): CourseSummary {
  const mod = currentModule(p, track.modules) ?? track.modules[0];
  const step = moduleSteps(mod)[nextStepIndex(p, mod)];
  const thumbId =
    (step.kind === "resource" ? step.resource.video?.youtubeId : undefined) ??
    firstVideoId(mod) ??
    track.modules.map(firstVideoId).find(Boolean) ??
    null;
  const stepLine =
    step.kind === "resource"
      ? step.resource.video
        ? `Part ${step.resource.video.part} of ${step.resource.video.partCount}: ${step.resource.video.partTitle}`
        : step.resource.title
      : step.kind === "build"
        ? track.buildLabel
        : "Self-check";
  const pct = overallProgressPct(p, track.modules);
  const modulePct = moduleProgressPct(p, mod);

  const sections: ModuleSection[] = track.phases
    .filter((ph) => track.modules.some((m) => m.phase === ph.phase))
    .map((ph) => ({
      title: ph.phase,
      blurb: ph.blurb,
      color: ph.color,
      rows: track.modules
        .filter((m) => m.phase === ph.phase)
        .map((m) => ({
          key: String(m.id),
          num: pad2(m.id),
          title: m.title,
          href: `${track.basePath}/${m.slug}`,
          meta: `${m.durationLabel} · ${moduleSteps(m).length} steps`,
          desc: m.goal,
          status: moduleStatus(p, m),
          pct: moduleProgressPct(p, m),
          thumbId: firstVideoId(m),
          tile: tileFor(m, ph.color),
        })),
    }));

  return {
    id: track.id as CourseSummary["id"],
    category: track.category,
    title: track.title,
    tagline: track.tagline,
    summary: track.summary,
    meta: `${track.modules.length} modules · ${track.totalDuration} · ${track.weeklyHours}`,
    overviewHref: `${track.basePath}/overview`,
    continueHref: `${track.basePath}/${mod.slug}`,
    color: track.color,
    thumbId,
    pct,
    started: pct > 0 || modulePct > 0,
    modulesDone: track.modules.filter((m) => isModuleDone(p, m.id)).length,
    moduleCount: track.modules.length,
    moduleLine: `Module ${mod.id}: ${mod.title}`,
    stepLine,
    modulePct,
    videosWatched: track.modules.reduce((n, m) => n + m.resources.filter((r) => r.video && p.resources[r.id]).length, 0),
    sections,
  };
}

/** Payments: 44 modules over 4 levels; only modules in PAYMENTS_CONTENT have lessons yet. */
export function summarizePayments(doneM01: Record<string, boolean>): CourseSummary {
  const mainModules = paymentModules.filter((m) => m.id.startsWith("M"));
  const m01 = mainModules[0];
  const steps = PAYMENTS_CONTENT.M01;
  const doneCount = steps.filter((s) => doneM01[s.id]).length;
  const next = steps.find((s) => !doneM01[s.id]) ?? steps[0];
  const m01Thumb = steps.find((s) => s.youtubeId)?.youtubeId ?? null;
  const thumbId = (!doneM01[next.id] && next.youtubeId) || m01Thumb;
  const modulePct = Math.round((doneCount / steps.length) * 100);
  const m01Status: RowStatus = doneCount === steps.length ? "completed" : doneCount > 0 ? "in_progress" : "available";
  const weeks = LEVELS.reduce((n, l) => n + l.weeks, 0);

  const sections: ModuleSection[] = LEVELS.map((lv) => ({
    title: `Level ${lv.level}: ${lv.name}`,
    blurb: `${lv.cert} · ${lv.moduleCount} modules · ${lv.weeks} weeks${
      lv.examQuestions > 0 ? ` · ${lv.examQuestions}-question exam (${lv.examTime} min, ${lv.examPass}% to pass)` : ""
    }`,
    color: lv.color,
    rows: paymentModules
      .filter((m) => m.level === lv.level)
      .map((m) => {
        const hasLessons = m.id in PAYMENTS_CONTENT;
        return {
          key: m.id,
          num: m.id,
          title: m.title,
          href: hasLessons ? `/module/${m.id}` : null,
          meta: `Week ${m.week} · ~${m.estimatedHours}h · Lab: ${m.handsOn}`,
          desc: m.topics.join(" · "),
          status: m.id === "M01" ? m01Status : "soon",
          pct: m.id === "M01" ? modulePct : 0,
          thumbId: m.id === "M01" ? m01Thumb : null,
          tile: { kicker: hasLessons ? m.id : `${m.id} · Coming soon`, text: m.shortTitle, color: lv.color },
        };
      }),
  }));

  return {
    id: "payments",
    category: PAYMENTS_CATEGORY,
    title: "From Zero to Payment Architect",
    tagline: "How money moves between banks, from payment basics to designing payment systems.",
    summary: `${mainModules.length} modules across ${LEVELS.length} certification levels, ${weeks} weeks from zero to certified payment architect. Content is being written module by module: modules with lessons open now, the rest are marked "Coming soon".`,
    meta: `${mainModules.length} modules · ${weeks} weeks · ${LEVELS.length} certification levels`,
    overviewHref: "/curriculum",
    continueHref: `/module/${m01.id}`,
    color: LEVELS[0].color,
    thumbId,
    pct: Math.round(modulePct / mainModules.length),
    started: doneCount > 0,
    modulesDone: m01Status === "completed" ? 1 : 0,
    moduleCount: mainModules.length,
    moduleLine: `Module 1: ${m01.title}`,
    stepLine: `Step ${next.order} of ${steps.length}: ${next.title}`,
    modulePct,
    videosWatched: steps.filter((s) => s.type === "video" && doneM01[s.id]).length,
    sections,
  };
}
