import { notFound } from "next/navigation";
import Link from "next/link";
import { getModule } from "@/data/curriculum";
import { m01Content } from "@/data/m01/content";
import { LEVELS } from "@/lib/types";
import type { ContentStep } from "@/lib/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

// Modules that have content available
const AVAILABLE_MODULES = ["M01"];

interface ModulePageProps {
  params: Promise<{ id: string }>;
}

function getContentSteps(moduleId: string): ContentStep[] {
  switch (moduleId) {
    case "M01":
      return m01Content;
    default:
      return [];
  }
}

function StepIcon({ type }: { type: string }) {
  switch (type) {
    case "video":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "reading":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case "lab":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case "quiz":
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    default:
      return null;
  }
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { id } = await params;
  const moduleData = getModule(id);

  if (!moduleData) {
    notFound();
  }

  const levelInfo = LEVELS.find((l) => l.level === moduleData.level);
  const levelColor = levelInfo?.color ?? "#3b82f6";
  const isAvailable = AVAILABLE_MODULES.includes(moduleData.id);
  const contentSteps = getContentSteps(moduleData.id);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-t3">
        <Link href="/" className="hover:text-t1 transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/curriculum" className="hover:text-t1 transition-colors">
          Curriculum
        </Link>
        <span>/</span>
        <span className="text-t2">{moduleData.id}</span>
      </nav>

      {/* Module Header */}
      <Card className="relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: levelColor }}
        />
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge color={levelColor} variant="outline">
              Level {moduleData.level}
            </Badge>
            <Badge color={levelColor}>{levelInfo?.cert ?? ""}</Badge>
            <span className="text-xs font-mono text-t3">
              Week {moduleData.week}
            </span>
            <span className="text-xs font-mono text-t3">
              ~{moduleData.estimatedHours}h
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-t1">
              <span className="text-t3 font-mono text-lg mr-2">
                {moduleData.id}
              </span>
              {moduleData.title}
            </h1>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-xs font-mono text-t3 uppercase tracking-wider mb-2">
              Topics Covered
            </h3>
            <div className="flex flex-wrap gap-2">
              {moduleData.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs bg-bg3 border border-bdr rounded-md px-2.5 py-1 text-t2"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Hands-on */}
          <div>
            <h3 className="text-xs font-mono text-t3 uppercase tracking-wider mb-1">
              Hands-On Exercise
            </h3>
            <p className="text-sm text-t2">{moduleData.handsOn}</p>
          </div>

          {/* PayoneX Component */}
          <div>
            <h3 className="text-xs font-mono text-t3 uppercase tracking-wider mb-1">
              PayoneX Component
            </h3>
            <p className="text-sm text-t2">{moduleData.payonexComponent}</p>
          </div>
        </div>
      </Card>

      {/* Content Steps or Coming Soon */}
      {isAvailable ? (
        <div className="space-y-4">
          <h2 className="text-sm font-mono text-t3 uppercase tracking-wider">
            Content Steps ({contentSteps.length})
          </h2>

          <div className="space-y-2">
            {contentSteps.map((step, index) => {
              // Quiz step links to quiz page
              const href =
                step.type === "quiz"
                  ? `/module/${moduleData.id}/quiz`
                  : `/module/${moduleData.id}/${step.order}`;

              return (
                <Link key={step.id} href={href} className="block no-underline">
                  <Card hoverable className="!p-4">
                    <div className="flex items-center gap-4">
                      {/* Step number */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0"
                        style={{
                          backgroundColor: `${levelColor}15`,
                          color: levelColor,
                        }}
                      >
                        {index + 1}
                      </div>

                      {/* Icon + Info */}
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-t3 shrink-0">
                          <StepIcon type={step.type} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-t1 truncate">
                            {step.title}
                          </p>
                          <p className="text-xs text-t3 capitalize">
                            {step.type} · {step.duration}
                          </p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg
                        className="w-4 h-4 text-t3 shrink-0"
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
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <Card className="text-center py-12">
          <div className="text-4xl mb-4">🏗️</div>
          <h2 className="text-lg font-semibold text-t1 mb-2">Coming Soon</h2>
          <p className="text-sm text-t2 max-w-md mx-auto">
            Content for {moduleData.title} is being developed. Check back soon
            or continue with available modules.
          </p>
          <Link href="/curriculum" className="inline-block mt-4">
            <Button variant="secondary" size="sm">
              View Curriculum
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
