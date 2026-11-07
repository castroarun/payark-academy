import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import Home from "@/components/dashboard/Home";

export default async function DashboardPage() {
  const user = isSupabaseConfigured
    ? (await (await createClient()).auth.getUser()).data.user
    : null;

  const name =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    "Learner";

  return <Home name={name} />;
}
