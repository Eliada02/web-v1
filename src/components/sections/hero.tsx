"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundVideo } from "@/components/background-video";

const highlights = [
  "Oltre 5.000 interventi",
  "Tecnici certificati IRATA / FISAT",
  "0 incidenti in 15 anni",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);

  // Cursor-follow "reveal" spotlight: the pointer position is written to CSS
  // custom properties (in %), and the overlay gradients below read them. We
  // batch writes into a single rAF so a burst of pointermove events does at
  // most one style write per frame — no React re-render, no layout thrash.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(rafRef.current);
      const { clientX, clientY } = e;
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${((clientX - rect.left) / rect.width) * 100}%`);
        el.style.setProperty("--spot-y", `${((clientY - rect.top) / rect.height) * 100}%`);
      });
    };
    // Ease the light back to a pleasing off-centre rest position.
    const reset = () => {
      cancelAnimationFrame(rafRef.current);
      el.style.setProperty("--spot-x", "50%");
      el.style.setProperty("--spot-y", "38%");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      // Initial spotlight position (also the SSR / touch fallback).
      style={{ "--spot-x": "50%", "--spot-y": "38%" } as React.CSSProperties}
    >
      {/* Background stack (video → overlays), clipped so the slow zoom never
          reveals an edge. Everything here sits behind the content. */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Reflective glass-skyscraper footage with a slow, breathing Ken Burns
            zoom for a cinematic feel. */}
        <div className="absolute inset-0 will-change-transform motion-safe:animate-[heroZoom_20s_ease-in-out_infinite_alternate]">
          <BackgroundVideo
            src="https://videos.pexels.com/video-files/8783209/8783209-hd_1920_1080_30fps.mp4"
            playbackRate={0.7}
            className="size-full"
          />
        </div>

        {/* Always-dark band on the left keeps the copy legible regardless of
            where the spotlight is. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

        {/* Interactive reveal: a vignette that opens up around the cursor, so
            the glass facade "lights up" where you point. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 28%, rgba(0,0,0,0.62) 72%)",
          }}
        />

        {/* Brand-coloured glow that follows the cursor (screen-blended). */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-70 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle 260px at var(--spot-x) var(--spot-y), color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%)",
          }}
        />

        {/* Soft fade into the next section. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Foreground content (scrolls naturally with the page). */}
      <div className="relative w-full">
        <div className="section-container flex flex-col items-start pb-20 pt-28 duration-1000 ease-out animate-in fade-in slide-in-from-bottom-6 sm:pb-24 sm:pt-32 lg:pb-28">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur sm:mb-6 sm:px-4 sm:text-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            Edilizia acrobatica · Rope access
          </span>

          <h1 className="max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-md sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
            Lavori in quota{" "}
            <span className="relative inline-block text-primary">
              senza ponteggi.
              <span className="absolute -bottom-1 left-0 h-1 w-full origin-left bg-primary/70 duration-1000 ease-out animate-in fade-in slide-in-from-left-8 [animation-delay:400ms]" />
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-white/85 drop-shadow sm:mt-6 sm:text-lg md:text-xl">
            Fino al 60% di risparmio rispetto al ponteggio tradizionale.
            Interventi rapidi, sicuri e certificati su qualsiasi edificio.
          </p>

          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
            <Button asChild size="lg" pulse className="text-base">
              <a href="#contatti">
                Preventivo gratuito
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              pulse
              className="border-white/30 bg-white/5 text-base text-white backdrop-blur hover:bg-white/15 hover:text-white"
            >
              <a href="#servizi">Scopri i servizi</a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/90 backdrop-blur transition-colors duration-300 hover:border-primary/50 hover:bg-white/10"
              >
                <CheckCircle2 className="size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href="#servizi"
        aria-label="Scorri verso il basso"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/60 transition-colors hover:text-white md:flex"
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-widest">
          Scorri
        </span>
        <ChevronDown className="size-6 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
