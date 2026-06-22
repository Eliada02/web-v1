"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface BackgroundVideoProps {
  /** Direct .mp4 (or .webm) URL. */
  src: string;
  /** Optional still shown while the video loads. Omit to show only the video
   *  (over a solid dark fallback) with no poster image. */
  poster?: string;
  className?: string;
}

/**
 * A muted, looping, autoplaying background video with a poster fallback.
 *
 * Performance / UX choices:
 *  - The poster paints immediately; the (heavy) video file is only requested
 *    after mount, so it never blocks first paint.
 *  - Respects `prefers-reduced-motion`: those users get the static poster and
 *    the video is never downloaded.
 *  - `muted` + `playsInline` are required for autoplay on mobile/Safari.
 */
export function BackgroundVideo({ src, poster, className }: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;
    video.load();
    // Some browsers need an explicit play() after the source is attached.
    video.play().catch(() => {
      /* autoplay can be blocked — the poster remains as a graceful fallback */
    });
  }, [enabled]);

  return (
    <video
      ref={ref}
      className={cn("bg-black object-cover", className)}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
    >
      {enabled && <source src={src} type="video/mp4" />}
    </video>
  );
}
