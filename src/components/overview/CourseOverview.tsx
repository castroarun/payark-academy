"use client";

import Link from "next/link";
import { categoryLabel } from "@/data/categories";
import type { CourseSummary, ModuleRow } from "@/lib/course-summary";
import { useCourses } from "@/lib/use-courses";
import { Icon, ICONS, SiteTopBar, Thumb } from "@/components/site/SiteParts";

// ─────────────────────────────────────────────────────────────
// Course overview, the same page for every course: what it is, your
// progress, a Continue button, and every module grouped by phase or
// level with its video preview and status.
// ─────────────────────────────────────────────────────────────

function StatusTag({ row }: { row: ModuleRow }) {
  switch (row.status) {
    case "completed":
      return <span className="pill ok"><Icon d={ICONS.tick} size={13} /> Done</span>;
    case "in_progress":
      return <span className="pill ok">{row.pct}% done</span>;
    case "available":
      return <span className="pill">Ready to start</span>;
    case "locked":
      return <span className="pill"><Icon d={ICONS.lock} size={13} /> Locked</span>;
    default:
      return <span className="pill">Coming soon</span>;
  }
}

function Row({ row }: { row: ModuleRow }) {
  const body = (
    <>
      <Thumb id={row.thumbId} label={row.num} />
      <div className="modrow-body">
        <div className="row wrap" style={{ gap: 8 }}>
          <span className="mono faint">{row.num}</span>
          <h3>{row.title}</h3>
        </div>
        <p className="mono faint">{row.meta}</p>
        <p className="muted clamp2" style={{ fontSize: 14 }}>{row.desc}</p>
        {row.status === "in_progress" && (
          <div className="bar" style={{ maxWidth: 320 }} aria-hidden="true">
            <span style={{ width: `${row.pct}%` }} />
          </div>
        )}
      </div>
      <div className="modrow-status">
        <StatusTag row={row} />
      </div>
    </>
  );
  const cls = `card modrow ${row.status === "locked" || row.status === "soon" ? "dim" : ""}`;
  return row.href ? (
    <Link href={row.href} className={cls}>{body}</Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function Overview({ c }: { c: CourseSummary }) {
  return (
    <>
      <SiteTopBar />
      <main className="dash">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href="/">← All courses</Link>
          <span aria-hidden="true">·</span>
          <span>{categoryLabel(c.category)}</span>
        </nav>

        <section className="card hero" aria-label="About this course">
          <Link href={c.continueHref} aria-label={`${c.started ? "Continue" : "Start"}: ${c.moduleLine}`}>
            <Thumb id={c.thumbId} />
          </Link>
          <div className="hero-body">
            <span className="label">{categoryLabel(c.category)}</span>
            <h1 style={{ fontSize: 26 }}>{c.title}</h1>
            <p className="muted">{c.tagline}</p>
            <p className="mono faint">{c.meta}</p>
            <div className="row">
              <div className="bar grow" role="progressbar" aria-valuenow={c.pct} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress">
                <span style={{ width: `${c.pct}%` }} />
              </div>
              <span className="mono faint">{c.pct}% · {c.modulesDone} of {c.moduleCount} modules</span>
            </div>
            <div className="row wrap" style={{ marginTop: 4 }}>
              <Link href={c.continueHref} className="btn primary">
                {c.started ? "Continue" : "Start the course"} <Icon d={ICONS.arrow} />
              </Link>
              <span className="faint" style={{ fontSize: 13 }}>{c.started ? "Next" : "First"}: {c.moduleLine}</span>
            </div>
          </div>
        </section>

        <section className="card pad" aria-labelledby="about">
          <h2 id="about" className="label" style={{ marginBottom: 8 }}>About this course</h2>
          <p className="muted" style={{ fontSize: 15 }}>{c.summary}</p>
        </section>

        {c.sections.map((s) => (
          <section key={s.title} aria-label={s.title}>
            <div className="phase-head">
              <span className="dot" style={{ background: s.color, width: 10, height: 10 }} aria-hidden="true" />
              <div className="grow">
                <h2>{s.title}</h2>
                <p className="faint" style={{ fontSize: 13 }}>{s.blurb}</p>
              </div>
              <span className="faint" style={{ fontSize: 13 }}>
                {s.rows.filter((r) => r.status === "completed").length} of {s.rows.length} done
              </span>
            </div>
            <div className="stack" style={{ gap: 10 }}>
              {s.rows.map((r) => (
                <Row key={r.key} row={r} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default function CourseOverview({ courseId }: { courseId: CourseSummary["id"] }) {
  const course = useCourses().find((c) => c.id === courseId);
  return course ? <Overview c={course} /> : null;
}
