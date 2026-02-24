"use client";

import type { QuizQuestion } from "@/lib/types";

interface QuestionProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  timeRemaining: number;
}

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

function getTimerLimit(difficulty: QuizQuestion["difficulty"]): number {
  return difficulty === "hard" ? 120 : 90;
}

export default function Question({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  timeRemaining,
}: QuestionProps) {
  const timerLimit = getTimerLimit(question.difficulty);
  const timerPct = Math.max(0, (timeRemaining / timerLimit) * 100);
  const isLowTime = timeRemaining <= 15;
  const isLocked = selectedAnswer !== null;

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar: question count + timer */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-t3 uppercase tracking-wider">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span
          className={[
            "text-sm font-mono font-semibold tabular-nums",
            isLowTime ? "text-rose" : "text-t2",
          ].join(" ")}
        >
          {Math.floor(timeRemaining / 60)}:
          {String(timeRemaining % 60).padStart(2, "0")}
        </span>
      </div>

      {/* Timer bar */}
      <div className="w-full h-1 rounded-full bg-bg3 overflow-hidden">
        <div
          className={[
            "h-full rounded-full transition-all duration-1000 ease-linear",
            isLowTime ? "bg-rose" : "bg-blue",
          ].join(" ")}
          style={{ width: `${timerPct}%` }}
        />
      </div>

      {/* Question text */}
      <div className="bg-bg2 border border-bdr rounded-xl p-6">
        <p className="text-base sm:text-lg font-medium text-t1 leading-relaxed">
          {question.question}
        </p>
        <span className="inline-block mt-2 text-xs font-mono text-t3 uppercase">
          {question.difficulty}
        </span>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;

          return (
            <button
              key={index}
              onClick={() => {
                if (!isLocked) onAnswer(index);
              }}
              disabled={isLocked}
              className={[
                "flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-150",
                "cursor-pointer disabled:cursor-default",
                isSelected
                  ? "border-blue bg-blue/10 text-t1"
                  : "border-bdr bg-bg2 text-t2 hover:border-bdr2 hover:bg-bg3",
                isLocked && !isSelected ? "opacity-50" : "",
              ].join(" ")}
            >
              {/* Label */}
              <span
                className={[
                  "w-7 h-7 rounded-md flex items-center justify-center text-xs font-mono font-bold shrink-0",
                  isSelected
                    ? "bg-blue text-white"
                    : "bg-bg3 text-t3",
                ].join(" ")}
              >
                {OPTION_LABELS[index]}
              </span>

              {/* Option text */}
              <span className="text-sm">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
