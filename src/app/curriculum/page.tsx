import Link from "next/link";
import { modules, getModulesByLevel } from "@/data/curriculum";
import { LEVELS } from "@/lib/types";
import type { Module } from "@/lib/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

// Modules that have content available
const AVAILABLE_MODULES = ["M01"];

function ModuleRow({ module }: { module: Module }) {
  const isAvailable = AVAILABLE_MODULES.includes(module.id);
  const levelInfo = LEVELS.find((l) => l.level === module.level);
  const levelColor = levelInfo?.color ?? "#3b82f6";

  const content = (
    <Card
      hoverable={isAvailable}
      className={`!p-4 ${!isAvailable ? "opacity-60" : ""}`}
    >
      <div className="flex items-start gap-4">
        {/* Module ID */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-mono font-bold shrink-0"
          style={{
            backgroundColor: `${levelColor}12`,
            color: levelColor,
          }}
        >
          {module.id}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-sm font-semibold text-t1">{module.title}</h3>
            {!isAvailable && (
              <span className="text-[10px] font-mono bg-bg4 text-t3 px-1.5 py-0.5 rounded">
                COMING SOON
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-t3 mb-2">
            <span className="font-mono">Week {module.week}</span>
            <span>~{module.estimatedHours}h</span>
          </div>

          {/* Topics preview */}
          <div className="flex flex-wrap gap-1.5">
            {module.topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="text-[11px] bg-bg3 border border-bdr rounded px-1.5 py-0.5 text-t3"
              >
                {topic}
              </span>
            ))}
            {module.topics.length > 5 && (
              <span className="text-[11px] text-t3">
                +{module.topics.length - 5} more
              </span>
            )}
          </div>

          {/* Hands-on */}
          <p className="text-xs text-t3 mt-2 italic">
            Lab: {module.handsOn}
          </p>
        </div>

        {/* Arrow */}
        {isAvailable && (
          <svg
            className="w-4 h-4 text-t3 shrink-0 mt-1"
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
        )}
      </div>
    </Card>
  );

  if (isAvailable) {
    return (
      <Link
        href={`/module/${module.id}`}
        className="block no-underline"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default function CurriculumPage() {
  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-t1 mb-2">Curriculum</h1>
        <p className="text-t2">
          44 modules across 4 certification levels. 32 weeks from zero to
          certified payment architect.
        </p>
      </div>

      {/* Level Sections */}
      {LEVELS.map((level) => {
        const levelModules = getModulesByLevel(level.level);

        return (
          <section key={level.level} className="space-y-4">
            {/* Level Header */}
            <div
              className="flex items-center gap-3 pb-3 border-b"
              style={{ borderColor: `${level.color}30` }}
            >
              <div
                className="w-2 h-8 rounded-full"
                style={{ backgroundColor: level.color }}
              />
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-t1">
                  Level {level.level} — {level.name}
                </h2>
                <Badge color={level.color}>{level.cert}</Badge>
                <span className="text-xs text-t3 font-mono">
                  {level.moduleCount} modules · {level.weeks} weeks
                  {level.examQuestions > 0 &&
                    ` · ${level.examQuestions}Q exam (${level.examTime}min, ${level.examPass}% pass)`}
                </span>
              </div>
            </div>

            {/* Module List */}
            <div className="space-y-2">
              {levelModules.map((module) => (
                <ModuleRow key={module.id} module={module} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Footer */}
      <div className="text-center py-8 border-t border-bdr">
        <p className="text-sm text-t3">
          Content is being developed module by module. Available modules are
          highlighted and clickable.
        </p>
      </div>
    </div>
  );
}
