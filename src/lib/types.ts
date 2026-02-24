export type Level = 1 | 2 | 3 | 4;
export type CertId = "PAKF" | "PAKE" | "PAKSA" | "PAKA";
export type StepType = "video" | "reading" | "lab" | "quiz";
export type ModuleStatus = "not_started" | "in_progress" | "completed";
export type Difficulty = "easy" | "medium" | "hard";

export interface LevelInfo {
  level: Level;
  name: string;
  cert: CertId;
  certFull: string;
  color: string;
  weeks: number;
  moduleCount: number;
  examQuestions: number;
  examTime: number;
  examPass: number;
}

export interface Module {
  id: string;
  title: string;
  shortTitle: string;
  level: Level;
  week: number;
  topics: string[];
  handsOn: string;
  payonexComponent: string;
  prerequisites: string[];
  estimatedHours: number;
}

export interface ContentStep {
  id: string;
  moduleId: string;
  order: number;
  type: StepType;
  title: string;
  duration: string;
  source?: "youtube" | "mdx" | "lab" | "quiz";
  youtubeId?: string;
  youtubeStart?: number;
  youtubeEnd?: number;
  mdxSlug?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
  topic: string;
}

export interface QuizAttempt {
  moduleId: string;
  score: number;
  total: number;
  passed: boolean;
  answers: Record<string, number>;
}

export interface ModuleProgress {
  moduleId: string;
  status: ModuleStatus;
  progressPct: number;
  startedAt: string | null;
  completedAt: string | null;
}

export interface ContentStepProgress {
  moduleId: string;
  stepId: string;
  completed: boolean;
}

export interface UserProfile {
  id: string;
  displayName: string;
  avatarUrl: string;
}

export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    name: "Payment Foundations",
    cert: "PAKF",
    certFull: "PayArk Certified — Payment Foundations",
    color: "#3b82f6",
    weeks: 6,
    moduleCount: 12,
    examQuestions: 60,
    examTime: 90,
    examPass: 70,
  },
  {
    level: 2,
    name: "Platform Engineer",
    cert: "PAKE",
    certFull: "PayArk Certified — Platform Engineer",
    color: "#06b6d4",
    weeks: 8,
    moduleCount: 16,
    examQuestions: 80,
    examTime: 120,
    examPass: 70,
  },
  {
    level: 3,
    name: "Payment Systems Architect",
    cert: "PAKSA",
    certFull: "PayArk Certified — Payment Systems Architect",
    color: "#8b5cf6",
    weeks: 10,
    moduleCount: 16,
    examQuestions: 60,
    examTime: 180,
    examPass: 75,
  },
  {
    level: 4,
    name: "Capstone — Build Payment House",
    cert: "PAKA",
    certFull: "PayArk Certified Payment Architect",
    color: "#f59e0b",
    weeks: 8,
    moduleCount: 4,
    examQuestions: 0,
    examTime: 0,
    examPass: 75,
  },
];
