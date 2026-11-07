import { LLM_TRACK as TRACK } from "@/data/llm/curriculum";
import CourseOverview from "@/components/overview/CourseOverview";

export const metadata = {
  title: `${TRACK.title}: course overview — PayArk Academy`,
  description: TRACK.tagline,
};

export default function OverviewPage() {
  return <CourseOverview courseId="llm" />;
}
