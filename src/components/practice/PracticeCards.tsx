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
        <div className="prac-plates small" aria-hidden="true">
          {set.modules.map((m) => (
            <span key={m.id} className="prac-plate">
              <span className="prac-plate-col" style={{ "--c": m.color } as React.CSSProperties}>
                <span style={{ height: `${Math.max(4, Math.round(moduleReadiness(p, m) * 100))}%` }} />
              </span>
              <span className="mono faint">{m.id}</span>
            </span>
          ))}
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
