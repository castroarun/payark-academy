# TODO — PayArk Academy

Cross-session source of truth for pending work. Last updated: 2026-11-04.

## In progress

### Launch the "Build an LLM from Scratch" track
- **Why:** second curriculum (12 modules, Karpathy Zero to Hero core). Source doc:
  https://claude.ai/artifact/SvucvmY37g2w8dHy5tsz6B
- **Done (2026-11-04):**
  - Data: `src/data/llm/curriculum.ts` (all 12 modules, resources, Build, Done when, prerequisites)
  - Pages: `/llm` (player at your current module) and `/llm/[slug]` (player at that module)
  - Progress saved in browser localStorage (`payark-llm-progress-v1`)
  - Dashboard card + header nav links ("Payments" / "Build an LLM")
- **Next:**
  - [x] Redesign mockups done — see `docs/mockups/llm-track/DECISIONS.md`
  - [x] Built and deployed the chosen design (2026-11-04): layout C (Player) +
        Midnight accent, light + dark toggle — `src/components/llm/Player.tsx`, `src/app/llm/llm.css`
  - [x] All 11 YouTube videos split into parts along the author's chapters — `src/data/llm/videos.ts`
  - [x] Video progress tracks itself (YouTube IFrame API): resume point saved, ticks off at 90%
  - [ ] Click through in a browser (play/resume a part, chapter ticks, light/dark, mobile width)
  - [x] Committed to `main` and deployed: https://payark-academy.vercel.app/llm
  - [ ] Confirm prerequisite chain (currently: 2←0, 3←1, 4←2+3, 8←6+7, 11←8+9, others linear)
  - [ ] Optional: per-module quizzes (reuse `QuizEngine`)
  - [ ] Optional: notes attached to video timestamps (suggested in the doc's appendix)
  - [x] Deployed 2026-11-04 (no database): https://payark-academy.vercel.app

## Up next

### Supabase setup
- **Why:** login + progress that survives across devices. Without keys the app now runs in
  "local preview" mode (no login, localStorage progress) — see `src/lib/supabase/config.ts`.
- [ ] Create Supabase project, enable Google OAuth, fill `.env.local` from `.env.local.example`
- [ ] Run `supabase/migrations/001_initial.sql`
- [ ] Add tables for LLM-track progress (resources / built / done) and move off localStorage

### Database (Supabase free tier is used up)
- **Options:** share an existing Supabase project (own schema / `payark_` tables) or
  Neon + Auth.js (stays Postgres). Undecided.
- [ ] Pick option, then add `NEXT_PUBLIC_SUPABASE_*` (or new) env vars in Vercel

### Vercel
- [x] Project `castroaruns-projects/payark-academy`, linked to GitHub — pushes to `main` auto-deploy
- [x] Production: https://payark-academy.vercel.app (runs in preview mode: no login, open to anyone)

## Tech debt
- [ ] 2 pre-existing lint errors (`react-hooks/set-state-in-effect`) in
      `src/app/module/[id]/[step]/page.tsx` and `src/app/module/[id]/quiz/page.tsx`
- [ ] Next 16 deprecation: rename `src/middleware.ts` → `src/proxy.ts`
- [ ] `npm audit`: 16 vulnerabilities (1 critical, 12 high) — review and update deps
- [ ] README: clone URL points to `ArunCastro/payark-academy` (should be `castroarun`);
      LAUNCHPAD block is stale (last updated 2026-02-24); mention the LLM track
- [ ] Dashboard "Your Stats" hard-codes 44 modules and ignores progress

## Payments track (PayArk)
- [ ] Modules M02–M44 + capstones S1–S4: content still "Coming Soon"
