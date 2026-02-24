import Link from "next/link";
import type { ContentStep } from "@/lib/types";

interface ContentListProps {
  steps: ContentStep[];
  completedSteps: string[];
  moduleId: string;
}

const stepTypeIcons: Record<ContentStep["type"], React.ReactNode> = {
  video: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
  ),
  reading: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  lab: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  quiz: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const stepTypeLabels: Record<ContentStep["type"], string> = {
  video: "Video",
  reading: "Reading",
  lab: "Lab",
  quiz: "Quiz",
};

type StepStatus = "completed" | "current" | "locked";

function getStepStatus(
  stepId: string,
  index: number,
  completedSteps: string[],
  steps: ContentStep[]
): StepStatus {
  if (completedSteps.includes(stepId)) return "completed";

  // First step is always available
  if (index === 0) return "current";

  // Available if previous step is completed
  const prevStepId = steps[index - 1]?.id;
  if (prevStepId && completedSteps.includes(prevStepId)) return "current";

  return "locked";
}

export default function ContentList({
  steps,
  completedSteps,
  moduleId,
}: ContentListProps) {
  return (
    <div className="flex flex-col gap-1">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id, index, completedSteps, steps);
        const isClickable = status !== "locked";

        const inner = (
          <div
            className={[
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150",
              status === "completed"
                ? "bg-bg2 border border-bdr"
                : status === "current"
                  ? "bg-bg2 border border-bdr2 hover:bg-bg3"
                  : "bg-bg2/50 border border-bdr/50 opacity-50 cursor-not-allowed",
            ].join(" ")}
          >
            {/* Status indicator */}
            <div className="shrink-0">
              {status === "completed" ? (
                <div className="w-6 h-6 rounded-full bg-green/15 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
              ) : status === "current" ? (
                <div className="w-6 h-6 rounded-full bg-blue/15 flex items-center justify-center text-blue">
                  {stepTypeIcons[step.type]}
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-bg3 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-t3" />
                </div>
              )}
            </div>

            {/* Step content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "text-sm font-medium truncate",
                    status === "completed"
                      ? "text-t2"
                      : status === "current"
                        ? "text-t1"
                        : "text-t3",
                  ].join(" ")}
                >
                  {step.title}
                </span>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-t3 uppercase">
                {stepTypeLabels[step.type]}
              </span>
              <span className="text-xs text-t3">{step.duration}</span>
            </div>
          </div>
        );

        if (isClickable) {
          return (
            <Link
              key={step.id}
              href={`/module/${moduleId}/${step.order}`}
              className="no-underline block"
            >
              {inner}
            </Link>
          );
        }

        return <div key={step.id}>{inner}</div>;
      })}
    </div>
  );
}
