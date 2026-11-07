import SiteShell from "@/components/site/SiteShell";
import CourseOverview from "@/components/overview/CourseOverview";

export const metadata = {
  title: "From Zero to Payment Architect: course overview — PayArk Academy",
};

/** Payments course overview: 4 levels, 44 modules, and which ones have lessons yet. */
export default function CurriculumPage() {
  return (
    <SiteShell>
      <CourseOverview courseId="payments" />
    </SiteShell>
  );
}
