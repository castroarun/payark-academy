import Link from "next/link";
import type { Module } from "@/lib/types";
import { LEVELS } from "@/lib/types";
import Card from "@/components/ui/Card";
import Progress from "@/components/ui/Progress";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface CurrentPathProps {
  module: Module | null;
  progressPct: number;
}

export default function CurrentPath({ module, progressPct }: CurrentPathProps) {
  if (!module) {
    return (
      <Card className="relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-t3 uppercase tracking-wider mb-1">
              Current Path
            </p>
            <h2 className="text-lg font-semibold text-t1">
              Start your learning journey
            </h2>
            <p className="text-sm text-t2 mt-1">
              Begin with Payment Foundations and work your way to certified
              architect.
            </p>
          </div>
          <Link href="/module/M01">
            <Button size="md">
              Get Started
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  const levelInfo = LEVELS.find((l) => l.level === module.level);
  const levelColor = levelInfo?.color ?? "#3b82f6";

  return (
    <Card className="relative overflow-hidden">
      {/* Subtle accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: levelColor }}
      />

      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs font-mono text-t3 uppercase tracking-wider">
                Current Path
              </p>
              {levelInfo && (
                <Badge color={levelColor} variant="outline">
                  Level {module.level}
                </Badge>
              )}
            </div>
            <h2 className="text-lg font-semibold text-t1 truncate">
              {module.title}
            </h2>
            <p className="text-sm text-t2 mt-0.5">
              {levelInfo?.name}
            </p>
          </div>

          <Link href={`/module/${module.id}`} className="shrink-0">
            <Button size="md">
              Continue Learning
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Progress value={progressPct} color={levelColor} size="sm" />
          </div>
          <span className="text-xs font-mono text-t3 whitespace-nowrap">
            {Math.round(progressPct)}%
          </span>
        </div>
      </div>
    </Card>
  );
}
