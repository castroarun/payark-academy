import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { modules } from "@/data/curriculum";
import CurrentPath from "@/components/dashboard/CurrentPath";
import LevelCards from "@/components/dashboard/LevelCards";
import Stats from "@/components/dashboard/Stats";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { TRACK_LIST } from "@/data/tracks";

export default async function DashboardPage() {
  const user = isSupabaseConfigured
    ? (await (await createClient()).auth.getUser()).data.user
    : null;

  // For now, use localStorage-based progress on the client side.
  // When Supabase tables are set up, fetch from DB here.
  // Default: no progress yet, show welcome state.
  const completedModules: string[] = [];
  const quizzesPassed = 0;

  // Determine the current module: first incomplete module in order
  const currentModule =
    modules.find((m) => !completedModules.includes(m.id)) ?? null;

  // Calculate progress percentage for the current module
  // (0% since we have no step-level progress on server yet)
  const currentProgress = 0;

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    "Learner";

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">
        Welcome back,{" "}
        <span className="text-blue">{displayName}</span>
      </h2>

      <CurrentPath module={currentModule} progressPct={currentProgress} />

      <div>
        <h3 className="text-sm font-mono text-t3 uppercase tracking-wider mb-4">
          Other Tracks
        </h3>
        <div className="space-y-4">
          {TRACK_LIST.map((t) => (
            <Link key={t.id} href={t.basePath} className="block no-underline">
              <Card hoverable className="relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: t.color }}
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-lg font-semibold text-t1">{t.title}</h4>
                      <Badge color={t.color}>NEW</Badge>
                    </div>
                    <p className="text-sm text-t2">{t.tagline}</p>
                    <p className="text-xs font-mono text-t3">
                      {t.modules.length} modules · {t.totalDuration} · {t.weeklyHours}
                    </p>
                  </div>
                  <span className="text-sm shrink-0" style={{ color: t.color }}>Open track →</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-mono text-t3 uppercase tracking-wider mb-4">
          Certification Levels
        </h3>
        <LevelCards completedModules={completedModules} />
      </div>

      <div>
        <h3 className="text-sm font-mono text-t3 uppercase tracking-wider mb-4">
          Your Stats
        </h3>
        <Stats
          modulesCompleted={completedModules.length}
          totalModules={44}
          quizzesPassed={quizzesPassed}
        />
      </div>
    </div>
  );
}
