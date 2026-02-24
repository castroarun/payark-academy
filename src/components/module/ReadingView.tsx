"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface ReadingViewProps {
  children: React.ReactNode;
  title: string;
  onComplete: () => void;
}

export default function ReadingView({
  children,
  title,
  onComplete,
}: ReadingViewProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-t1">{title}</h1>

      {/* MDX content area */}
      <div className="mdx-content">{children}</div>

      {/* Divider */}
      <hr className="border-t border-bdr" />

      {/* Complete button */}
      <div className="flex justify-end pb-8">
        <Button
          variant={completed ? "secondary" : "primary"}
          onClick={handleComplete}
          disabled={completed}
        >
          {completed ? (
            <>
              <svg
                className="w-4 h-4 text-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Completed
            </>
          ) : (
            <>
              Mark as Complete
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
