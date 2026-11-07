import { LLM_TRACK } from "@/data/llm/curriculum";
import Player from "@/components/track/Player";

export const metadata = {
  title: `${LLM_TRACK.title} — PayArk Academy`,
  description: LLM_TRACK.tagline,
};

/** Opens the player at the learner's current module (Module 0 on a first visit). */
export default function LlmTrackPage() {
  return <Player trackId="llm" />;
}
