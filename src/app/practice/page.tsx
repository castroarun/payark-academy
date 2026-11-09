import Link from "next/link";
import { SiteTopBar } from "@/components/site/SiteParts";
import PracticeCards from "@/components/practice/PracticeCards";

export const metadata = { title: "Practice — PayArk Academy" };

/** Every practice set: question banks you answer and get scored on. */
export default function PracticePage() {
  return (
    <>
      <SiteTopBar />
      <main className="dash">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href="/">← All courses</Link>
        </nav>
        <div className="stack" style={{ gap: 4 }}>
          <h1>Practice</h1>
          <p className="muted">Quiz rounds that explain every answer, timed mocks and viva drills. Your scores are saved in this browser.</p>
        </div>
        <PracticeCards />
      </main>
    </>
  );
}
