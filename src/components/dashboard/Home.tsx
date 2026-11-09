"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, categoryLabel, type CategoryId } from "@/data/categories";
import type { CourseSummary } from "@/lib/course-summary";
import { useCourses } from "@/lib/use-courses";
import { Icon, ICONS, SiteTopBar, Thumb } from "@/components/site/SiteParts";
import PracticeCards from "@/components/practice/PracticeCards";

// ─────────────────────────────────────────────────────────────
// Dashboard: a "continue learning" card for the course you're furthest
// into, every course as a card (filter by category), and a few totals.
// Same look as the course player (styles in src/app/llm/llm.css).
// Every number shown is worked out from the progress saved in this browser.
// ─────────────────────────────────────────────────────────────

function Hero({ c }: { c: CourseSummary }) {
  return (
    <section className="card hero" aria-label={c.started ? "Continue learning" : "Start here"}>
      <Link href={c.continueHref} aria-label={`${c.started ? "Continue" : "Start"}: ${c.moduleLine}`}>
        <Thumb id={c.thumbId} />
      </Link>
      <div className="hero-body">
        <div className="row wrap" style={{ gap: 8 }}>
          <span className="pill ok">{c.started ? "Continue learning" : "Start here"}</span>
          <span className="faint" style={{ fontSize: 13 }}>{c.title}</span>
        </div>
        <h2>{c.moduleLine}</h2>
        <p className="muted" style={{ fontSize: 14 }}>Next: {c.stepLine}</p>
        <div className="row">
          <div className="bar grow" role="progressbar" aria-valuenow={c.modulePct} aria-valuemin={0} aria-valuemax={100} aria-label="Module progress">
            <span style={{ width: `${c.modulePct}%` }} />
          </div>
          <span className="mono faint">{c.modulePct}% of module</span>
        </div>
        <div className="row wrap" style={{ marginTop: 4 }}>
          <Link href={c.continueHref} className="btn primary">
            {c.started ? "Continue" : "Start"} <Icon d={ICONS.arrow} />
          </Link>
          <Link href={c.overviewHref} className="btn">Course overview</Link>
        </div>
      </div>
    </section>
  );
}

function Course({ c }: { c: CourseSummary }) {
  return (
    <Link href={c.started ? c.continueHref : c.overviewHref} className="card course">
      <Thumb id={c.thumbId} badge={`${c.moduleCount} modules`} />
      <div className="course-body">
        <span className="label">{categoryLabel(c.category)}</span>
        <h3>{c.title}</h3>
        <p className="muted clamp2" style={{ fontSize: 14 }}>{c.tagline}</p>
        <p className="mono faint">{c.meta}</p>
        <div className="row">
          <div className="bar grow" role="progressbar" aria-valuenow={c.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${c.title} progress`}>
            <span style={{ width: `${c.pct}%` }} />
          </div>
          <span className="mono faint">{c.pct}%</span>
        </div>
        <div className="course-next">
          <div className="row" style={{ gap: 8 }}>
            <span className="dot" style={{ background: c.color }} aria-hidden="true" />
            <span className="grow" style={{ fontWeight: 600 }}>
              {c.started ? "Next" : "Starts with"}: {c.moduleLine}
            </span>
          </div>
          <p className="faint" style={{ marginTop: 2, paddingLeft: 16 }}>
            {c.modulesDone} of {c.moduleCount} modules done
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Home({ name }: { name: string }) {
  const courses = useCourses();
  const [filter, setFilter] = useState<CategoryId | "all">("all");

  // The course you're furthest into; if nothing is started yet, the first course.
  const score = (c: CourseSummary) => c.pct + c.modulePct / 100;
  const hero = courses.reduce((best, c) => (score(c) > score(best) ? c : best), courses[0]);
  const started = courses.filter((c) => c.started).length;
  const modulesDone = courses.reduce((n, c) => n + c.modulesDone, 0);
  const videos = courses.reduce((n, c) => n + c.videosWatched, 0);

  // Only categories that have a course get a tab.
  const tabs = CATEGORIES.filter((cat) => courses.some((c) => c.category === cat.id));
  const shown = filter === "all" ? courses : courses.filter((c) => c.category === filter);

  return (
    <>
      <SiteTopBar />
      <main className="dash">
        <div className="stack" style={{ gap: 4 }}>
          <h1>Welcome back, {name}</h1>
          <p className="muted">
            {started ? "Pick up where you left off." : "Choose a course to begin. Your progress is saved as you go."}
          </p>
        </div>

        <Hero c={hero} />

        <section aria-labelledby="my-courses">
          <div className="section-head">
            <h2 id="my-courses">My courses ({courses.length})</h2>
            <span className="faint" style={{ fontSize: 13 }}>{started} started</span>
          </div>
          <div className="filters" role="group" aria-label="Filter by category">
            <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
              All <span className="faint">{courses.length}</span>
            </button>
            {tabs.map((cat) => (
              <button key={cat.id} type="button" aria-pressed={filter === cat.id} onClick={() => setFilter(cat.id)}>
                {cat.label} <span className="faint">{courses.filter((c) => c.category === cat.id).length}</span>
              </button>
            ))}
          </div>
          <div className="courses">
            {shown.map((c) => (
              <Course key={c.id} c={c} />
            ))}
          </div>
        </section>

        <section aria-labelledby="practice">
          <div className="section-head">
            <h2 id="practice">Practice</h2>
            <Link href="/practice" className="faint" style={{ fontSize: 13 }}>Quiz rounds, mocks and viva drills, scored</Link>
          </div>
          <PracticeCards />
        </section>

        <section aria-labelledby="my-progress">
          <div className="section-head">
            <h2 id="my-progress">Your progress</h2>
          </div>
          <div className="stats">
            <div className="card stat">
              <span className="label">Courses started</span>
              <b>{started} <span className="faint" style={{ fontSize: 15, fontWeight: 500 }}>of {courses.length}</span></b>
            </div>
            <div className="card stat">
              <span className="label">Modules completed</span>
              <b>{modulesDone}</b>
            </div>
            <div className="card stat">
              <span className="label">Videos watched</span>
              <b>{videos}</b>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
