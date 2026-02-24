# PayArk Academy

**From Zero to Payment Architect** — A structured, self-paced training program for mastering enterprise payment systems.

44 modules across 4 certification levels, 32 weeks of hands-on learning.

<!-- LAUNCHPAD:START -->
```json
{
  "stage": "building",
  "progress": 30,
  "complexity": "F",
  "lastUpdated": "2026-02-24",
  "targetDate": "2026-03-31",
  "nextAction": "Supabase setup + Vercel deploy",
  "blocker": null,
  "demoUrl": null,
  "techStack": ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "MDX"],
  "shipped": false,
  "linkedinPosted": false
}
```
<!-- LAUNCHPAD:END -->

## Certification Levels

| Level | Code | Modules | Focus |
|-------|------|---------|-------|
| Foundation | PAKF | 11 modules | Payment basics, rails, compliance |
| Expert | PAKE | 11 modules | ISO 20022, APIs, fraud, FX |
| Solutions Architect | PAKSA | 11 modules | System design, orchestration, resilience |
| Architect | PAKA | 11 modules | Enterprise architecture, strategy, leadership |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS v4 (dark theme) |
| Auth + DB | Supabase (Google OAuth + PostgreSQL) |
| Content | MDX (reading material) |
| Video | YouTube embeds |
| Deploy | Vercel |

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase project ([create one here](https://supabase.com))

### Setup

```bash
# Clone
git clone https://github.com/ArunCastro/payark-academy.git
cd payark-academy

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your Supabase project keys

# Run the migration SQL in your Supabase SQL editor
# (file: supabase/migrations/001_initial.sql)

# Start dev server
npm run dev
```

### Supabase Configuration

1. Create a new Supabase project
2. Go to **Auth > Providers > Google** and enable Google OAuth
3. Copy your project URL and anon key to `.env.local`
4. Run the migration SQL in the Supabase SQL Editor

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Dashboard
│   ├── login/              # Google OAuth login
│   ├── curriculum/         # Full 44-module curriculum view
│   └── module/[id]/        # Module overview, content steps, quiz
├── components/             # React components
│   ├── ui/                 # Button, Card, Progress, Badge
│   ├── layout/             # Header
│   ├── dashboard/          # CurrentPath, LevelCards, Stats
│   ├── module/             # ContentList, VideoPlayer, ReadingView
│   └── quiz/               # QuizEngine, Question, Results
├── content/m01/            # MDX reading articles
├── data/                   # Curriculum metadata + M01 quiz questions
└── lib/                    # Supabase clients, TypeScript types
```

## Current Status

- Module 1 ("How Payments Work") is fully built with 6 content steps + quiz
- Modules 2-44 show as "Coming Soon" with full metadata
- Quiz engine: 15 random questions from 50-question pool, per-question timer, 70% pass mark

## License

Private — PayoneX Training Division
