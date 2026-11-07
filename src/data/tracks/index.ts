import { LLM } from "@/data/llm/curriculum";
import { HEALTHSPAN } from "@/data/healthspan/curriculum";
import type { Track } from "./types";

/** Every video course played in the shared lesson player, in dashboard order. */
export const TRACKS = { llm: LLM, healthspan: HEALTHSPAN } satisfies Record<string, Track>;

export type TrackId = keyof typeof TRACKS;

export const TRACK_LIST: Track[] = Object.values(TRACKS);

/** Routes that use the full-width player layout instead of the PayArk header. */
export const PLAYER_BASE_PATHS = TRACK_LIST.map((t) => t.basePath);
