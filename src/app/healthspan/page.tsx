import { HEALTHSPAN } from "@/data/healthspan/curriculum";
import Player from "@/components/track/Player";

export const metadata = {
  title: `${HEALTHSPAN.title} — PayArk Academy`,
  description: HEALTHSPAN.tagline,
};

/** Opens the player at the learner's current module (Module 0 on a first visit). */
export default function HealthspanTrackPage() {
  return <Player trackId="healthspan" />;
}
