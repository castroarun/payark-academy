import Card from "@/components/ui/Card";

interface StatsProps {
  modulesCompleted: number;
  totalModules: number;
  quizzesPassed: number;
}

interface StatItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function StatItem({ label, value, icon }: StatItemProps) {
  return (
    <Card className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-bg3 flex items-center justify-center text-t3 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-t3 font-mono uppercase tracking-wider">
          {label}
        </p>
        <p className="text-lg font-semibold text-t1 font-mono">{value}</p>
      </div>
    </Card>
  );
}

function getCurrentLevel(modulesCompleted: number): number {
  if (modulesCompleted >= 44) return 4;
  if (modulesCompleted >= 28) return 3;
  if (modulesCompleted >= 12) return 2;
  return 1;
}

export default function Stats({
  modulesCompleted,
  totalModules,
  quizzesPassed,
}: StatsProps) {
  const currentLevel = getCurrentLevel(modulesCompleted);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatItem
        label="Modules"
        value={`${modulesCompleted}/${totalModules}`}
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        }
      />

      <StatItem
        label="Quizzes Passed"
        value={String(quizzesPassed)}
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      />

      <StatItem
        label="Level"
        value={String(currentLevel)}
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
        }
      />
    </div>
  );
}
