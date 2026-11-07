# TODO — PayArk Academy

Cross-session source of truth for pending work. Last updated: 2026-11-07.

## In progress

### "Longevity & Healthspan" track (built and deployed 2026-11-07)
- **Why:** a free alternative to the paid INFS "Longevity & Healthspan" workshop (₹2,499, 4 h),
  covering the same topics in more depth: science of ageing, key markers and tests, supplements
  (evidence vs hype), a 90-day plan, and coaching use. Arun asked for it "just like the LLM course".
- **Done:**
  - 11 modules in 6 phases, 19 free expert videos (Attia, Andrew Steele / Royal Institution,
    Kaeberlein / Optispan, Stuart Phillips, Matt Walker, Layne Norton, Gil Carvalho), about 9 h of
    main video. Chapters fetched from YouTube 2026-11-07 with yt-dlp. Each module has a Practice
    step (own labs table, Healthspan Scorecard baseline, zone 2 week, protein log, supplement
    check…) and a Safety note where labs, drugs or supplements come up.
  - Data: `src/data/healthspan/curriculum.ts` + `videos.ts`. Pages: `/healthspan`, `/healthspan/[slug]`.
  - **The player is now shared by every video course.** `src/components/track/Player.tsx` takes a
    `trackId`; a track supplies its modules, videos, route, storage key and labels
    (`src/data/tracks/`: types, helpers, registry). Progress lives in `src/lib/track-progress.ts`,
    one localStorage key per course. The LLM key is unchanged (`payark-llm-progress-v1`), so saved
    LLM progress still loads. Header nav and dashboard cards list every course from the registry.
  - Fixed for both courses: on phones the syllabus made the page scroll sideways (485px on a 390px
    screen). It now fits.
  - Checked: tsc, eslint, `npm run build` (all 11 pages generated), a data check (part times
    inside each video, prerequisites, unique ids), and Edge screenshots at desktop and phone widths.
    Marking a Healthspan step saves only under `payark-healthspan-progress-v1`.
- **Next:**
  - [x] Committed and pushed to `main` 2026-11-07 (auto-deploys): https://payark-academy.vercel.app/healthspan
  - [ ] Play a video part end to end in a real browser (resume point, chapter ticks)
  - [ ] Optional: a printable Healthspan Scorecard (Module 3) and 90-day plan template (capstone)
- **Found while testing (old, not from this change):** the dashboard's Payments "Level 1" card
  linked to `/level/1` (404). Gone: the dashboard was redesigned 2026-11-07 without those cards.

### One look across the whole app (2026-11-07)
- **Done:** dashboard redesigned (continue card, course cards with video previews, category
  filter tabs, real totals); a course overview page for every course (`/curriculum`,
  `/llm/overview`, `/healthspan/overview`); course categories in `src/data/categories.ts`
  (Technology, Health & fitness, Fintech); the Payments lesson, reading, quiz and sign-in pages
  now use the same navy look with light/dark (old colour names re-pointed in `.llm.legacy`,
  `src/app/llm/llm.css`); modules with no video show a text preview tile.
- Checked: tsc, eslint (0 errors), build, screenshots light/dark, no sideways scroll at 390px.
- [ ] Optional: rebuild the Payments lessons on the shared video player (chapters, watch tracking)
- [ ] Confirm category names with Arun (asked "payways": read as pathways)

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
        Midnight accent, light + dark toggle — `src/components/track/Player.tsx` (moved 2026-11-07, now shared), `src/app/llm/llm.css`
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
- [x] 2 pre-existing lint errors (`react-hooks/set-state-in-effect`) in the Payments step and
      quiz pages — fixed 2026-11-07
- [ ] Next 16 deprecation: rename `src/middleware.ts` → `src/proxy.ts`
- [ ] `npm audit`: 16 vulnerabilities (1 critical, 12 high) — review and update deps
- [ ] README: clone URL points to `ArunCastro/payark-academy` (should be `castroarun`);
      LAUNCHPAD block is stale (last updated 2026-02-24); mention the LLM track
- [x] Dashboard "Your Stats" hard-coded 44 modules — replaced 2026-11-07 by totals from real progress

## Payments track (PayArk)
- [ ] Modules M02–M44 + capstones S1–S4: content still "Coming Soon"
