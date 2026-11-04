# LLM track redesign — decisions

Mockup: [index.html](index.html) (open in a browser; layout, theme and colour switch from the top bar).

## Decided by Arun (2026-11-04)

| Topic | Decision | Runner-up |
|---|---|---|
| Layout | **C · Player** — syllabus rail on the left (all modules, ticks), lesson on the right (video, steps, about) | A · Workspace |
| Accent colour | **Midnight** — light `#172554`; dark mode tints the whole ground navy (`#0a1222` / `#101b31`) with a light-blue accent `#a3b8e8` | Navy |
| Themes | Both light and dark | — |
| Look | Clean and simple, easy to follow (reference: Upwork home — soft grey ground, white rounded cards, one accent) | — |

Kept for reference: layouts A (Workspace) and B (Path); colours Navy, Sapphire, Ocean, Indigo, Plum, Teal, Green, Rose, Terracotta, Amber, Graphite.

## Shown in the mockup, to confirm when building (recommended, not yet decided)

- Overall progress as a 12-segment bar in the top bar (one segment per module, partly filled while in progress).
- Videos track themselves: resume point saved, step ticks off at 90% watched (needs the YouTube IFrame API).
- Long videos split along the author's own parts/chapters. Done for "Intro to Large Language Models"
  (Part 1 0:00–25:43, Part 2 25:43–45:43, Part 3 45:43–end, chapters from the video description).
- The Self-check step completes a module and unlocks modules that depend on it.
- Extra material is optional and does not count toward progress.
