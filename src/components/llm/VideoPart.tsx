"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { LlmVideoPart } from "@/data/llm/curriculum";

// ─────────────────────────────────────────────────────────────
// Plays one part of a YouTube video (start → end) and reports the
// position every few seconds so progress can be saved.
// Uses the YouTube IFrame Player API, loaded once on first play.
// If the API can't load (blocked, offline), it falls back to a plain
// embed of the same part — the lesson still works, it just can't
// track position.
// ─────────────────────────────────────────────────────────────

interface YTPlayer {
  getCurrentTime(): number;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  playVideo(): void;
  destroy(): void;
}

interface YTPlayerOptions {
  host?: string;
  videoId: string;
  playerVars: Record<string, number | string>;
  events: {
    onStateChange?: (e: { data: number }) => void;
  };
}

interface YTNamespace {
  Player: new (el: HTMLElement, options: YTPlayerOptions) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onerror = () => {
      apiPromise = null;
      reject(new Error("YouTube player API failed to load"));
    };
    document.head.appendChild(tag);
    window.setTimeout(() => reject(new Error("YouTube player API timed out")), 8000);
  });
  return apiPromise;
}

export interface VideoPartHandle {
  seek(seconds: number): void;
}

interface VideoPartProps {
  video: LlmVideoPart;
  title: string;
  /** Saved resume point, seconds into the full video */
  resumeAt?: number;
  /** 0–1 share of this part already watched (for the red bar on the thumbnail) */
  watchedShare: number;
  onProgress: (positionSeconds: number) => void;
}

const REPORT_EVERY_MS = 5000;

const VideoPart = forwardRef<VideoPartHandle, VideoPartProps>(function VideoPart(
  { video, title, resumeAt, watchedShare, onProgress },
  ref
) {
  const [mode, setMode] = useState<"thumb" | "api" | "plain">("thumb");
  const [pendingSeek, setPendingSeek] = useState<number | null>(null);
  const holder = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  const startAt =
    resumeAt && resumeAt > video.start + 5 && resumeAt < video.end - 10 ? Math.floor(resumeAt) : video.start;

  const begin = useCallback((at?: number) => {
    setPendingSeek(at ?? null);
    setMode("api");
  }, []);

  useImperativeHandle(ref, () => ({
    seek(seconds: number) {
      if (player.current) {
        player.current.seekTo(seconds, true);
        player.current.playVideo();
      } else {
        begin(seconds);
      }
    },
  }), [begin]);

  // Create the API player once the user presses play.
  useEffect(() => {
    if (mode !== "api" || !holder.current) return;
    let timer: number | undefined;
    let cancelled = false;
    const mount = document.createElement("div");
    holder.current.appendChild(mount);

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        player.current = new YT.Player(mount, {
          host: "https://www.youtube-nocookie.com",
          videoId: video.youtubeId,
          playerVars: {
            start: pendingSeek ?? startAt,
            end: video.end,
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onStateChange: (e) => {
              window.clearInterval(timer);
              const report = () => {
                const t = player.current?.getCurrentTime();
                if (typeof t === "number") onProgressRef.current(Math.min(t, video.end));
              };
              if (e.data === YT.PlayerState.PLAYING) {
                report(); // mark where playback (re)starts, so the next report adds a played stretch
                timer = window.setInterval(report, REPORT_EVERY_MS);
              } else if (e.data === YT.PlayerState.ENDED) {
                onProgressRef.current(video.end);
              } else if (e.data === YT.PlayerState.PAUSED) {
                report();
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setMode("plain");
      });

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      const t = player.current?.getCurrentTime();
      if (typeof t === "number" && t > video.start) onProgressRef.current(Math.min(t, video.end));
      player.current?.destroy();
      player.current = null;
      mount.remove();
    };
    // Recreate only when switching to the player or to another part.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, video.youtubeId, video.start, video.end]);

  return (
    <div className="video">
      {mode === "thumb" && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} alt="" />
          <button
            type="button"
            className="play"
            onClick={() => begin()}
            aria-label={`${resumeAt && startAt !== video.start ? "Resume" : "Play"}: ${title}`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="watched" aria-hidden="true">
            <span style={{ width: `${Math.round(watchedShare * 100)}%` }} />
          </div>
        </>
      )}
      {mode === "api" && <div ref={holder} />}
      {mode === "plain" && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?start=${pendingSeek ?? startAt}&end=${video.end}&autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
});

export default VideoPart;
