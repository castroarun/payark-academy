import type { TrackModule, TrackResource, VideoDef } from "./types";

/** "1:02:57" → 3777 seconds */
export function toSeconds(time: string): number {
  return time.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}

/** 3777 → "1:02:57" */
export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

/** Chapters that start inside [start, end) */
export function chaptersBetween(video: VideoDef, start: number, end: number): { at: number; title: string }[] {
  return video.chapters
    .map(([t, title]) => ({ at: toSeconds(t), title }))
    .filter((c) => c.at >= start && c.at < end);
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  return `~${Number.isInteger(hours) ? hours : hours.toFixed(1)} h`;
}

export function findModule(modules: TrackModule[], slugOrId: string): TrackModule | undefined {
  return modules.find((m) => m.slug === slugOrId || String(m.id) === slugOrId);
}

/**
 * One "main" resource per part of a video, so each part is its own step.
 * `parts` picks which parts (1-based) belong to this module, so one long video
 * can be shared across modules.
 */
export function videoPartsOf(
  videos: Record<string, VideoDef>,
  key: string,
  idPrefix: string,
  parts?: number[],
  note?: string,
): TrackResource[] {
  const v = videos[key];
  if (!v) throw new Error(`Unknown video "${key}"`);
  const chosen = parts ?? v.parts.map((_, i) => i + 1);
  return chosen.map((n, i) => {
    const def = v.parts[n - 1];
    const start = toSeconds(def.start);
    const end = toSeconds(def.end);
    return {
      id: `${idPrefix}-p${n}`,
      type: "video",
      role: "main",
      title: v.parts.length > 1 ? `${v.title} · Part ${n}: ${def.title}` : v.title,
      author: v.author,
      url: `https://www.youtube.com/watch?v=${v.youtubeId}&t=${start}s`,
      minutes: Math.max(1, Math.round((end - start) / 60)),
      note: i === 0 ? note : undefined,
      video: {
        videoKey: key,
        youtubeId: v.youtubeId,
        start,
        end,
        part: n,
        partCount: v.parts.length,
        partTitle: def.title,
        videoTitle: v.title,
      },
    };
  });
}
