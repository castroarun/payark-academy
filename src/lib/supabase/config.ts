/**
 * True when Supabase keys are present. Without them the app runs in
 * local preview mode: no login, progress kept in localStorage only.
 */
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
