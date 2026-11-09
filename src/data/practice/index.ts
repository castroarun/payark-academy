import { CPT } from "./cpt";
import type { PracticeSet } from "./types";

/** Every practice set, in the order shown on the dashboard and /practice. */
export const PRACTICE_SETS: PracticeSet[] = [CPT];

export const practiceHref = (id: string) => `/practice/${id}`;
