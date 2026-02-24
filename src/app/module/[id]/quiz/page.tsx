"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getModule } from "@/data/curriculum";
import { getRandomQuiz as getM01RandomQuiz } from "@/data/m01/quiz";
import { LEVELS } from "@/lib/types";
import type { QuizQuestion } from "@/lib/types";
import QuizEngine from "@/components/quiz/QuizEngine";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────
// Quiz page — loads questions and renders QuizEngine
// ─────────────────────────────────────────────────────────────

function getQuizQuestions(moduleId: string): QuizQuestion[] {
  switch (moduleId) {
    case "M01":
      return getM01RandomQuiz(15);
    default:
      return [];
  }
}

export default function QuizPage() {
  const params = useParams();
  const moduleId = params.id as string;
  const moduleData = getModule(moduleId);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizKey, setQuizKey] = useState(0);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
    passed: boolean;
  } | null>(null);

  const generateQuiz = useCallback(() => {
    setQuestions(getQuizQuestions(moduleId));
    setQuizKey((k) => k + 1);
    setFinished(false);
    setResult(null);
  }, [moduleId]);

  useEffect(() => {
    generateQuiz();
  }, [generateQuiz]);

  const handleComplete = useCallback(
    (score: number, total: number, passed: boolean) => {
      setFinished(true);
      setResult({ score, total, passed });

      // Save to localStorage as a simple record
      if (typeof window !== "undefined") {
        try {
          const key = `payark-quiz-${moduleId}`;
          const existing = JSON.parse(localStorage.getItem(key) || "[]");
          existing.push({
            score,
            total,
            passed,
            date: new Date().toISOString(),
          });
          localStorage.setItem(key, JSON.stringify(existing));
        } catch {
          // Silently fail
        }
      }
    },
    [moduleId]
  );

  if (!moduleData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-semibold text-t1 mb-2">
          Module Not Found
        </h2>
        <Link href="/curriculum">
          <Button variant="secondary" size="sm">
            View Curriculum
          </Button>
        </Link>
      </div>
    );
  }

  const levelInfo = LEVELS.find((l) => l.level === moduleData.level);
  const levelColor = levelInfo?.color ?? "#3b82f6";

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-semibold text-t1 mb-2">
          Quiz Not Available
        </h2>
        <p className="text-sm text-t2 mb-4">
          Quiz questions for this module are being prepared.
        </p>
        <Link href={`/module/${moduleId}`}>
          <Button variant="secondary" size="sm">
            Back to Module
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-t3">
        <Link href="/" className="hover:text-t1 transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <Link
          href={`/module/${moduleId}`}
          className="hover:text-t1 transition-colors"
        >
          {moduleData.id}
        </Link>
        <span>/</span>
        <span className="text-t2">Quiz</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge color={levelColor}>{moduleData.id}</Badge>
        <h1 className="text-xl font-bold text-t1">
          {moduleData.title} — Assessment
        </h1>
      </div>

      <p className="text-sm text-t2">
        15 questions drawn from a pool of 50. You need 70% (11/15) to pass.
        Each question is timed.
      </p>

      {/* Quiz Engine */}
      <QuizEngine
        key={quizKey}
        questions={questions}
        moduleId={moduleId}
        onComplete={handleComplete}
      />

      {/* Retake button (only shown after engine shows results) */}
      {finished && result && !result.passed && (
        <div className="flex justify-center pt-4">
          <Button variant="secondary" onClick={generateQuiz}>
            Generate New Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
