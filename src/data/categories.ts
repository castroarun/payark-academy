// ─────────────────────────────────────────────────────────────
// Course categories: shown as filter tabs on the dashboard, a label on
// each course card and in the path at the top of each course overview.
// To add a category, add it here; then set `category` on the course
// (video courses: in their curriculum file; Payments: PAYMENTS_CATEGORY).
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: "technology", label: "Technology" },
  { id: "health", label: "Health & fitness" },
  { id: "fintech", label: "Fintech" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const categoryLabel = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

/** The Payments course isn't a video track, so its category is set here. */
export const PAYMENTS_CATEGORY: CategoryId = "fintech";
