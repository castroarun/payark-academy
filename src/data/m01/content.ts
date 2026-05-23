import { ContentStep } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// M01 — How Payments Work: Content Steps
// 7 steps: video → reading → video → reading → video → lab → quiz
// ─────────────────────────────────────────────────────────────

export const m01Content: ContentStep[] = [
  {
    id: "m01-step-1",
    moduleId: "M01",
    order: 1,
    type: "video",
    title: "Payment Lifecycle Explained",
    duration: "15 min",
    source: "youtube",
    youtubeId: "gzTYbl2Kwuk",
  },
  {
    id: "m01-step-2",
    moduleId: "M01",
    order: 2,
    type: "reading",
    title: "How a Payment Flows: End to End",
    duration: "12 min",
    source: "mdx",
    mdxSlug: "01-payment-lifecycle",
  },
  {
    id: "m01-step-3",
    moduleId: "M01",
    order: 3,
    type: "video",
    title: "Clearing vs Settlement Deep Dive",
    duration: "18 min",
    source: "youtube",
    youtubeId: "Dr7qzPG24i4",
  },
  {
    id: "m01-step-4",
    moduleId: "M01",
    order: 4,
    type: "reading",
    title: "RTGS vs DNS: Real-Time Gross vs Deferred Net",
    duration: "10 min",
    source: "mdx",
    mdxSlug: "02-clearing-settlement",
  },
  {
    id: "m01-step-5",
    moduleId: "M01",
    order: 5,
    type: "video",
    title: "Correspondent Banking & Nostro/Vostro Accounts",
    duration: "20 min",
    source: "youtube",
    youtubeId: "dVlaATdoRwc",
  },
  {
    id: "m01-step-6",
    moduleId: "M01",
    order: 6,
    type: "lab",
    title: "Map a Real SWIFT MT103 Message Field by Field",
    duration: "45 min",
    source: "lab",
    mdxSlug: "04-lab-mt103-mapping",
  },
  {
    id: "m01-step-7",
    moduleId: "M01",
    order: 7,
    type: "quiz",
    title: "Module 01 Assessment",
    duration: "20 min",
    source: "quiz",
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

export function getM01Content(): ContentStep[] {
  return m01Content;
}
