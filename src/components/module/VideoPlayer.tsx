"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  onComplete: () => void;
}

export default function VideoPlayer({
  youtubeId,
  title,
  onComplete,
}: VideoPlayerProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    onComplete();
  };

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-lg font-semibold text-t1">{title}</h2>

      {/* Video container — 16:9 aspect ratio */}
      <div className="relative w-full bg-bg2 rounded-xl border border-bdr overflow-hidden aspect-video">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Complete button */}
      <div className="flex justify-end">
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
