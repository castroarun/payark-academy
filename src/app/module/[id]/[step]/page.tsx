"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getModule } from "@/data/curriculum";
import { m01Content } from "@/data/m01/content";
import type { ContentStep, Module } from "@/lib/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { LEVELS } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// MDX content map — dynamically import reading content
// ─────────────────────────────────────────────────────────────
const mdxModules: Record<string, React.ComponentType> = {
  "01-payment-lifecycle": dynamic(
    () => import("@/content/m01/01-payment-lifecycle.mdx")
  ),
  "02-clearing-settlement": dynamic(
    () => import("@/content/m01/02-clearing-settlement.mdx")
  ),
  "03-correspondent-banking": dynamic(
    () => import("@/content/m01/03-correspondent-banking.mdx")
  ),
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function getContentSteps(moduleId: string): ContentStep[] {
  switch (moduleId) {
    case "M01":
      return m01Content;
    default:
      return [];
  }
}

function getLocalProgress(moduleId: string): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(`payark-progress-${moduleId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalProgress(moduleId: string, stepId: string) {
  if (typeof window === "undefined") return;
  const progress = getLocalProgress(moduleId);
  progress[stepId] = true;
  localStorage.setItem(
    `payark-progress-${moduleId}`,
    JSON.stringify(progress)
  );
}

// ─────────────────────────────────────────────────────────────
// Video Player
// ─────────────────────────────────────────────────────────────
function VideoPlayer({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden bg-bg3 border border-bdr">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reading View
// ─────────────────────────────────────────────────────────────
function ReadingView({ mdxSlug }: { mdxSlug: string }) {
  const MdxComponent = mdxModules[mdxSlug];

  if (!MdxComponent) {
    return (
      <Card className="text-center py-12">
        <p className="text-t2">Reading content not found for: {mdxSlug}</p>
      </Card>
    );
  }

  return (
    <div className="mdx-content">
      <MdxComponent />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Lab View
// ─────────────────────────────────────────────────────────────
function LabView({ step }: { step: ContentStep }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-2">
        <span
          className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-amber/10 text-amber border border-amber/20"
        >
          LAB
        </span>
        <span className="text-xs text-t3">{step.duration}</span>
      </div>

      <h2 className="text-xl font-bold text-t1">{step.title}</h2>

      <div className="bg-bg3 border border-bdr rounded-lg p-4">
        <h3 className="text-sm font-mono text-t3 uppercase tracking-wider mb-2">
          Instructions
        </h3>
        <p className="text-sm text-t2 leading-relaxed">
          Complete the hands-on exercise described above. Take your time to
          explore each field and understand its purpose in the payment message.
          Document your findings as you work through the exercise.
        </p>
      </div>

      {step.mdxSlug && mdxModules[step.mdxSlug] && (
        <div className="mdx-content mt-6">
          {(() => {
            const MdxComponent = mdxModules[step.mdxSlug!];
            return <MdxComponent />;
          })()}
        </div>
      )}
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────────────────
export default function ContentStepPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  const stepParam = params.step as string;
  const stepOrder = parseInt(stepParam, 10);

  const [completed, setCompleted] = useState(false);

  const moduleData: Module | undefined = getModule(moduleId);
  const contentSteps = getContentSteps(moduleId);
  const step = contentSteps.find((s) => s.order === stepOrder);

  const levelInfo = moduleData
    ? LEVELS.find((l) => l.level === moduleData.level)
    : undefined;
  const levelColor = levelInfo?.color ?? "#3b82f6";

  // Check if step is already completed on mount
  useEffect(() => {
    if (step) {
      const progress = getLocalProgress(moduleId);
      setCompleted(!!progress[step.id]);
    }
  }, [moduleId, step]);

  if (!moduleData || !step) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-semibold text-t1 mb-2">Step Not Found</h2>
        <p className="text-sm text-t2 mb-4">
          This content step does not exist.
        </p>
        <Link href={`/module/${moduleId}`}>
          <Button variant="secondary" size="sm">
            Back to Module
          </Button>
        </Link>
      </div>
    );
  }

  // Non-content steps (quiz) redirect
  if (step.type === "quiz") {
    router.push(`/module/${moduleId}/quiz`);
    return null;
  }

  const prevStep = contentSteps.find((s) => s.order === stepOrder - 1);
  const nextStep = contentSteps.find((s) => s.order === stepOrder + 1);

  const handleMarkComplete = () => {
    saveLocalProgress(moduleId, step.id);
    setCompleted(true);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-t3">
        <Link href="/" className="hover:text-t1 transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <Link
          href={`/module/${moduleId}`}
          className="hover:text-t1 transition-colors"
        >
          {moduleData.id}
        </Link>
        <span>/</span>
        <span className="text-t2">Step {step.order}</span>
      </nav>

      {/* Step Header */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge color={levelColor} variant="outline">
          {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
        </Badge>
        <span className="text-xs font-mono text-t3">{step.duration}</span>
        {completed && (
          <Badge color="#10b981">Completed</Badge>
        )}
      </div>

      <h1 className="text-2xl font-bold text-t1">{step.title}</h1>

      {/* Content Area */}
      {step.type === "video" && step.youtubeId && (
        <VideoPlayer youtubeId={step.youtubeId} title={step.title} />
      )}

      {step.type === "reading" && step.mdxSlug && (
        <Card>
          <ReadingView mdxSlug={step.mdxSlug} />
        </Card>
      )}

      {step.type === "lab" && <LabView step={step} />}

      {/* Mark Complete */}
      {!completed && (
        <div className="flex justify-center">
          <Button onClick={handleMarkComplete} size="lg">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Mark as Complete
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-bdr">
        {prevStep ? (
          <Link href={`/module/${moduleId}/${prevStep.order}`}>
            <Button variant="ghost" size="sm">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {nextStep ? (
          <Link
            href={
              nextStep.type === "quiz"
                ? `/module/${moduleId}/quiz`
                : `/module/${moduleId}/${nextStep.order}`
            }
          >
            <Button variant="secondary" size="sm">
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
        ) : (
          <Link href={`/module/${moduleId}`}>
            <Button variant="secondary" size="sm">
              Back to Module
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
