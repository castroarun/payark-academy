"use client";

import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    // Local preview mode: no auth backend, go straight in.
    if (!isSupabaseConfigured) {
      window.location.href = "/";
      return;
    }
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg">
      <div className="w-full max-w-md mx-auto px-6">
        <div className="bg-bg2 border border-bdr rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold font-display tracking-tight mb-2"
              style={{
                background:
                  "linear-gradient(135deg, #fff 0%, #3b82f6 50%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PayArk Academy
            </h1>
            <p className="text-t2 text-sm">From Zero to Payment Architect</p>
          </div>

          {/* Stats teaser */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-t3 mb-8">
            <span>44 Modules</span>
            <span className="text-bdr2">·</span>
            <span>4 Certifications</span>
            <span className="text-bdr2">·</span>
            <span>32 Weeks</span>
          </div>

          {/* Divider */}
          <div className="border-t border-bdr mb-8" />

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-medium py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Footer note */}
          <p className="text-center text-xs text-t3 mt-6">
            Secure authentication powered by Supabase
          </p>
        </div>
      </div>
    </div>
  );
}
