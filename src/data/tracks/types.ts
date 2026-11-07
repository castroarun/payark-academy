// ─────────────────────────────────────────────────────────────
// Shared shape of a video course ("track") played in the lesson player.
// Each track supplies its modules, its videos and a few labels; the player,
// progress tracking and pages are the same for every track.
// ─────────────────────────────────────────────────────────────

export type ResourceType = "video" | "playlist" | "code" | "book" | "course" | "article" | "paper" | "tool" | "dataset";
export type ResourceRole = "main" | "extra";

export interface VideoPartDef {
  title: string;
  start: string;
  end: string;
}

export interface VideoDef {
  youtubeId: string;
  title: string;
  author: string;
  length: string;
  chapters: [string, string][];
  parts: VideoPartDef[];
}

export interface TrackVideoPart {
  videoKey: string;
  youtubeId: string;
  /** Seconds into the full video */
  start: number;
  end: number;
  /** 1-based part number and how many parts the whole video has */
  part: number;
  partCount: number;
  partTitle: string;
  videoTitle: string;
}

export interface TrackResource {
  id: string;
  type: ResourceType;
  role: ResourceRole;
  title: string;
  url: string;
  /** Who made it, e.g. "Karpathy" */
  author?: string;
  /** Approximate length in minutes (videos only) */
  minutes?: number;
  note?: string;
  /** Set when this resource is one part of a split YouTube video */
  video?: TrackVideoPart;
}

export interface TrackModule {
  id: number;
  slug: string;
  title: string;
  phase: string;
  /** Duration range in weeks, e.g. [2, 4] */
  durationWeeks: [number, number];
  durationLabel: string;
  goal: string;
  resources: TrackResource[];
  build: string;
  doneWhen: string;
  prerequisites: number[];
  hardware?: string;
}

export interface PhaseInfo {
  phase: string;
  color: string;
  blurb: string;
}

export interface Track {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  weeklyHours: string;
  totalDuration: string;
  color: string;
  /** Route the track lives at, e.g. "/llm" */
  basePath: string;
  /** localStorage key for this track's progress */
  storageKey: string;
  /** Word for the hands-on step, e.g. "Build" or "Practice" */
  buildLabel: string;
  /** Label for the optional module note ("Hardware", "Safety", …) */
  hardwareLabel: string;
  /** Short label for the dashboard and nav */
  navLabel: string;
  phases: PhaseInfo[];
  modules: TrackModule[];
  videos: Record<string, VideoDef>;
}
