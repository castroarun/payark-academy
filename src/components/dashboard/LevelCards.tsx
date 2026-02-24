import Link from "next/link";
import { LEVELS } from "@/lib/types";
import type { Level } from "@/lib/types";
import Card from "@/components/ui/Card";
import Progress from "@/components/ui/Progress";
import Badge from "@/components/ui/Badge";

interface LevelCardsProps {
  completedModules: string[];
}

/** Map module IDs to their level. Modules M01-M12 = L1, M13-M28 = L2, M29-M44 = L3, M45-M48 = L4 */
function getModuleLevel(moduleId: string): Level {
  const num = parseInt(moduleId.replace("M", ""), 10);
  if (num <= 12) return 1;
  if (num <= 28) return 2;
  if (num <= 44) return 3;
  return 4;
}

function countByLevel(modules: string[], level: Level): number {
  return modules.filter((id) => getModuleLevel(id) === level).length;
}

function isLevelUnlocked(level: Level, completedModules: string[]): boolean {
  if (level === 1) return true;
  const prevLevel = (level - 1) as Level;
  const prevLevelInfo = LEVELS.find((l) => l.level === prevLevel);
  if (!prevLevelInfo) return false;
  return countByLevel(completedModules, prevLevel) >= prevLevelInfo.moduleCount;
}

export default function LevelCards({ completedModules }: LevelCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {LEVELS.map((level) => {
        const completed = countByLevel(completedModules, level.level);
        const progressPct =
          level.moduleCount > 0
            ? Math.round((completed / level.moduleCount) * 100)
            : 0;
        const unlocked = isLevelUnlocked(level.level, completedModules);

        return (
          <LevelCard
            key={level.level}
            level={level.level}
            name={level.name}
            cert={level.cert}
            color={level.color}
            moduleCount={level.moduleCount}
            completed={completed}
            progressPct={progressPct}
            unlocked={unlocked}
          />
        );
      })}
    </div>
  );
}

interface LevelCardProps {
  level: Level;
  name: string;
  cert: string;
  color: string;
  moduleCount: number;
  completed: number;
  progressPct: number;
  unlocked: boolean;
}

function LevelCard({
  level,
  name,
  cert,
  color,
  moduleCount,
  completed,
  progressPct,
  unlocked,
}: LevelCardProps) {
  const content = (
    <Card
      hoverable={unlocked}
      className={`relative overflow-hidden ${
        !unlocked ? "opacity-50" : ""
      }`}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: unlocked ? color : "#555a6e" }}
      />

      <div className="flex flex-col gap-3">
        {/* Level number + lock */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-mono font-semibold uppercase tracking-wider"
            style={{ color: unlocked ? color : "#555a6e" }}
          >
            Level {level}
          </span>
          {!unlocked && (
            <svg
              className="w-4 h-4 text-t3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          )}
        </div>

        {/* Level name */}
        <h3 className="text-sm font-semibold text-t1 leading-tight">
          {name}
        </h3>

        {/* Cert badge */}
        <Badge color={unlocked ? color : "#555a6e"} variant="outline">
          {cert}
        </Badge>

        {/* Progress */}
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-t3">
              {completed}/{moduleCount} modules
            </span>
            <span className="text-xs font-mono text-t3">{progressPct}%</span>
          </div>
          <Progress
            value={progressPct}
            color={unlocked ? color : "#555a6e"}
            size="sm"
          />
        </div>
      </div>
    </Card>
  );

  if (unlocked) {
    return (
      <Link
        href={`/level/${level}`}
        className="no-underline block"
      >
        {content}
      </Link>
    );
  }

  return content;
}
