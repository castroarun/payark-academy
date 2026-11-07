"use client";

import { TRACKS } from "@/data/tracks";
import { useTrackProgress } from "@/lib/track-progress";
import { usePaymentsSteps } from "@/lib/payments-progress";
import { summarizePayments, summarizeTrack, type CourseSummary } from "@/lib/course-summary";

/**
 * Every course with its progress in this browser, in dashboard order.
 * When a new video course is added to TRACKS, add a line here too.
 */
export function useCourses(): CourseSummary[] {
  const pay = usePaymentsSteps("M01");
  const llm = useTrackProgress(TRACKS.llm.storageKey).progress;
  const hs = useTrackProgress(TRACKS.healthspan.storageKey).progress;
  return [summarizePayments(pay), summarizeTrack(TRACKS.llm, llm), summarizeTrack(TRACKS.healthspan, hs)];
}
