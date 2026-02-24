import { createClient } from "@/lib/supabase/server";
import { modules } from "@/data/curriculum";
import CurrentPath from "@/components/dashboard/CurrentPath";
import LevelCards from "@/components/dashboard/LevelCards";
import Stats from "@/components/dashboard/Stats";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
