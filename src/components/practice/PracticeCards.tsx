"use client";

import Link from "next/link";
import type { PracticeSet } from "@/data/practice/types";
import { PRACTICE_SETS, practiceHref } from "@/data/practice";
import { mistakes, moduleReadiness, setReadiness, totals, usePracticeProgress } from "@/lib/practice-progress";
import { Icon, ICONS } from "@/components/site/SiteParts";

// One card per practice set: readiness, per-module bars, and what's waiting
// (questions you got wrong). Used on the dashboard and on /practice.

function PracticeCard({ set }: { set: PracticeSet }) {
  const { progress: p } = usePracticeProgress(set.id);
  const ready = Math.round(setReadiness(p, set) * 100);
  const t = totals(p);
  const miss = mistakes(p, set).length;
  const qCount = set.modules.reduce((n, m) => n + m.topics.reduce((k, tp) => k + tp.qs.length, 0), 0);
  return (
    <Link href={practiceHref(set.id)} className="card prac-card">
      <div className="prac-card-top">
        <div className="stack" style={{ gap: 2 }}>
          <span className="label">Exam readiness</span>
          <b className="prac-big" style={{ fontSize: 40 }}>{ready}%</b>
        </div>
        <div className="prac-split">
          {(["mcq", "viva"] as const).map((kind) => {
            const mods = set.modules.filter((m) => m.kind === kind);
            const r = mods.length ? Math.round((100 * mods.reduce((n, m) => n + moduleReadiness(p, m), 0)) / mods.length) : 0;
            return (
              <div key={kind} className="stack" style={{ gap: 4 }}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <span className="faint" style={{ fontSize: 12 }}>{kind === "mcq" ? "Written paper" : "Viva"}</span>
                  <span className="mono faint">{r}%</span>
                </div>
                <div className="bar"><span style={{ width: `${r}%` }} /></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="course-body">
        <span className="label">Practice · Health &amp; fitness</span>
        <h3>{set.title}</h3>
        <p className="muted clamp2" style={{ fontSize: 14 }}>{set.tagline}</p>
        <p className="mono faint">{qCount} questions · {set.modules.length} modules · mocks and viva drills</p>
        <div className="course-next row" style={{ justifyContent: "space-between" }}>
          <span className="faint">{t.answered ? `${t.answered} answered · ${t.accuracy}% right · ${miss} to revisit` : "Not started yet"}</span>
          <span className="row" style={{ gap: 6, fontWeight: 600 }}>{t.answered ? "Practise" : "Start"} <Icon d={ICONS.arrow} /></span>
        </div>
      </div>
    </Link>
  );
}

export default function PracticeCards() {
  return (
    <div className="courses">
      {PRACTICE_SETS.map((s) => <PracticeCard key={s.id} set={s} />)}
    </div>
  );
}
