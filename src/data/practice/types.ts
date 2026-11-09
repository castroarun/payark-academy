// ─────────────────────────────────────────────────────────────
// Practice sets: question banks you answer, with a score.
// A set has modules; a module has topics (fact + primer + multiple-choice
// questions) and, for oral-exam modules, viva prompts you answer out loud.
// ─────────────────────────────────────────────────────────────

export interface PracticeQuestion {
  q: string;
  /** Exactly four options */
  o: [string, string, string, string];
  /** Index of the right option */
  a: number;
  /** Why each option is right or wrong, same order as `o` */
  w: [string, string, string, string];
  /** Memory hook */
  h: string;
}

export interface PracticeTopic {
  id: string;
  title: string;
  /** "Did you know" opener */
  fact: string;
  /** 60-second primer, a few lines */
  primer: string[];
  qs: PracticeQuestion[];
}

export interface VivaPrompt {
  q: string;
  /** Key points an examiner listens for */
  p: string[];
  tip: string;
}

export interface PracticeModule {
  id: string;
  name: string;
  /** "mcq" = written multiple-choice paper; "viva" = oral exam */
  kind: "mcq" | "viva";
  color: string;
  blurb: string;
  topics: PracticeTopic[];
  viva?: VivaPrompt[];
}

export interface PracticeSet {
  id: string;
  title: string;
  tagline: string;
  /** Pass mark, percent */
  passPct: number;
  /** Questions per module in a mock exam, and minutes per question */
  mockSize: number;
  modules: PracticeModule[];
  /** Short line on the exam's rules */
  rules: string;
}
