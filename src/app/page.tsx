import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { modules } from "@/data/curriculum";
import CurrentPath from "@/components/dashboard/CurrentPath";
import LevelCards from "@/components/dashboard/LevelCards";
import Stats from "@/components/dashboard/Stats";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { LLM_TRACK, llmModules } from "@/data/llm/curriculum";

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
        <Link href="/llm" className="block no-underline">
          <Card hoverable className="relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: LLM_TRACK.color }}
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-lg font-semibold text-t1">{LLM_TRACK.title}</h4>
                  <Badge color={LLM_TRACK.color}>NEW</Badge>
                </div>
                <p className="text-sm text-t2">{LLM_TRACK.tagline}</p>
                <p className="text-xs font-mono text-t3">
                  {llmModules.length} modules · {LLM_TRACK.totalDuration} · {LLM_TRACK.weeklyHours}
                </p>
              </div>
              <span className="text-sm text-violet shrink-0">Open track →</span>
            </div>
          </Card>
        </Link>
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
