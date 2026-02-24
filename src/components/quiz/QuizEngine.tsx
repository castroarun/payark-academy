"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { QuizQuestion } from "@/lib/types";
import Question from "@/components/quiz/Question";
import Results from "@/components/quiz/Results";
import Progress from "@/components/ui/Progress";

interface QuizEngineProps {
  questions: QuizQuestion[];
  moduleId: string;
  onComplete: (score: number, total: number, passed: boolean) => void;
}

interface ShuffledQuestion {
  original: QuizQuestion;
  shuffledOptions: string[];
  /** Maps shuffled index -> original index */
  indexMap: number[];
}

/** Fisher-Yates shuffle, returns shuffled array + index map */
function shuffleOptions(options: string[]): {
  shuffled: string[];
  indexMap: number[];
} {
  const indices = options.map((_, i) => i);
  // Fisher-Yates
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return {
    shuffled: indices.map((i) => options[i]),
    indexMap: indices,
  };
}

function getTimerDuration(difficulty: QuizQuestion["difficulty"]): number {
  return difficulty === "hard" ? 120 : 90;
}

const PASS_THRESHOLD = 0.7;
const ADVANCE_DELAY_MS = 1000;

export default function QuizEngine({
  questions,
  moduleId,
  onComplete,
}: QuizEngineProps) {
  // Shuffle options on mount
  const shuffledQuestions = useMemo<ShuffledQuestion[]>(() => {
    return questions.map((q) => {
      const { shuffled, indexMap } = shuffleOptions(q.options);
      return {
        original: q,
        shuffledOptions: shuffled,
        indexMap,
      };
    });
  }, [questions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(() =>
    shuffledQuestions.length > 0
      ? getTimerDuration(shuffledQuestions[0].original.difficulty)
      : 90
  );
  const [isFinished, setIsFinished] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = shuffledQuestions[currentIndex] ?? null;
  const totalQuestions = shuffledQuestions.length;

  // Advance to next question or finish
  const advanceToNext = useCallback(() => {
    if (currentIndex >= totalQuestions - 1) {
      setIsFinished(true);
    } else {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setTimeRemaining(
        getTimerDuration(shuffledQuestions[nextIdx].original.difficulty)
      );
      setIsAdvancing(false);
    }
  }, [currentIndex, totalQuestions, shuffledQuestions]);

  // Timer countdown
  useEffect(() => {
    if (isFinished || isAdvancing || !currentQuestion) return;

    if (timeRemaining <= 0) {
      // Time expired -- auto-advance (counts as wrong, answer stays undefined)
      setIsAdvancing(true);
      advanceTimeoutRef.current = setTimeout(advanceToNext, 500);
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, isFinished, isAdvancing, currentQuestion, advanceToNext]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, []);

  // Handle answer selection
  const handleAnswer = useCallback(
    (shuffledIndex: number) => {
      if (isAdvancing || answers[currentIndex] !== undefined) return;

      // Map shuffled index back to original index for scoring
      const originalIndex = currentQuestion.indexMap[shuffledIndex];
      setAnswers((prev) => ({ ...prev, [currentIndex]: originalIndex }));

      // Advance after delay
      setIsAdvancing(true);
      advanceTimeoutRef.current = setTimeout(advanceToNext, ADVANCE_DELAY_MS);
    },
    [currentIndex, currentQuestion, isAdvancing, answers, advanceToNext]
  );

  // Calculate results when finished
  useEffect(() => {
    if (!isFinished) return;

    let correct = 0;
    shuffledQuestions.forEach((sq, i) => {
      if (answers[i] === sq.original.correctIndex) {
        correct++;
      }
    });

    const passed = totalQuestions > 0 && correct / totalQuestions >= PASS_THRESHOLD;
    onComplete(correct, totalQuestions, passed);
  }, [isFinished, answers, shuffledQuestions, totalQuestions, onComplete]);

  // Results screen
  if (isFinished) {
    let score = 0;
    shuffledQuestions.forEach((sq, i) => {
      if (answers[i] === sq.original.correctIndex) {
        score++;
      }
    });
    const passed = totalQuestions > 0 && score / totalQuestions >= PASS_THRESHOLD;

    return (
      <Results
        score={score}
        total={totalQuestions}
        passed={passed}
        moduleId={moduleId}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-t2">No questions available for this quiz.</p>
      </div>
    );
  }

  // Build a shuffled QuizQuestion for the Question component
  // The Question component receives shuffled options, so selectedAnswer must also be in shuffled space
  const selectedShuffledAnswer =
    answers[currentIndex] !== undefined
      ? currentQuestion.indexMap.indexOf(answers[currentIndex])
      : null;

  const questionForDisplay: QuizQuestion = {
    ...currentQuestion.original,
    options: currentQuestion.shuffledOptions,
  };

  const progressPct =
    totalQuestions > 0 ? (currentIndex / totalQuestions) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      {/* Overall progress */}
      <Progress value={progressPct} color="#3b82f6" size="sm" />

      {/* Current question */}
      <Question
        question={questionForDisplay}
        questionNumber={currentIndex + 1}
        totalQuestions={totalQuestions}
        selectedAnswer={selectedShuffledAnswer}
        onAnswer={handleAnswer}
        timeRemaining={timeRemaining}
      />
    </div>
  );
}
