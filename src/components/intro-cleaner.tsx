"use client";

import { useEffect, useState } from "react";
import { Mountain } from "lucide-react";

const dropStyle: React.CSSProperties = {
  background:
    "radial-gradient(circle at 35% 30%, rgba(255,255,255,.9), rgba(255,255,255,.25) 55%, rgba(255,255,255,0) 75%)",
  boxShadow: "0 2px 5px rgba(0,0,0,.2), inset 0 0 4px rgba(255,255,255,.45)",
};

const EASE = "cubic-bezier(.6,.04,.3,1)";
const MIN_MS = 2000; // minimum time the loader stays on screen
const MAX_MS = 7000; // failsafe: never hang longer than this

/**
 * Page loader shown while the page renders. It stays for at least 2s, and if
 * the page isn't fully loaded by then it keeps showing until the `load` event
 * fires (all elements ready). Then a squeegee wipes the foggy glass away to
 * reveal the content. Reduced-motion users still get the timed reveal.
 */
export function IntroCleaner() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const start = performance.now();
    let started = false;
    const startReveal = () => {
      if (started) return;
      started = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      window.setTimeout(() => setPhase("reveal"), wait);
    };

    if (document.readyState === "complete") startReveal();
    else window.addEventListener("load", startReveal, { once: true });
    const failsafe = window.setTimeout(startReveal, MAX_MS);

    return () => {
      window.removeEventListener("load", startReveal);
      window.clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    if (phase !== "reveal") return;
    const t = window.setTimeout(() => setPhase("done"), 1300);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;
  const revealing = phase === "reveal";

  return (
    <div className="vk-loader pointer-events-none fixed inset-0 z-[200]" aria-hidden>
      {/* If JS is disabled, never trap the page behind the loader. */}
      <noscript>
        <style
          dangerouslySetInnerHTML={{ __html: ".vk-loader{display:none!important}" }}
        />
      </noscript>

      <style>{`
        @keyframes vk-drip { 0% { transform: translateY(-30px); opacity: 0 } 20% { opacity:.8 } 100% { transform: translateY(60vh); opacity: 0 } }
        @keyframes vk-dot  { 0%,80%,100% { opacity:.2 } 40% { opacity:1 } }
        .vk-drop { animation: vk-drip 2.2s ease-in infinite; }
        .vk-dot  { animation: vk-dot 1.2s ease-in-out infinite; }
        .vk-dot.b { animation-delay: .2s; }
        .vk-dot.c { animation-delay: .4s; }
        @media (prefers-reduced-motion: reduce) { .vk-drop, .vk-dot { animation: none; } }
      `}</style>

      {/* Foggy, grimy glass that gets wiped clean */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden bg-background/92 backdrop-blur-md"
        style={{
          clipPath: revealing ? "inset(100% 0 0 0)" : "inset(0 0 0 0)",
          transition: `clip-path 1.3s ${EASE}`,
        }}
      >
        {/* grime */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(40vw 40vh at 25% 30%, rgba(120,130,150,.10), transparent 70%), radial-gradient(45vw 35vh at 75% 65%, rgba(120,130,150,.08), transparent 70%)",
          }}
        />
        {/* droplets */}
        <span className="vk-drop absolute left-[18%] top-0 size-3 rounded-full" style={dropStyle} />
        <span className="vk-drop absolute left-[42%] top-0 size-4 rounded-full" style={{ ...dropStyle, animationDelay: ".6s" }} />
        <span className="vk-drop absolute left-[70%] top-0 size-2.5 rounded-full" style={{ ...dropStyle, animationDelay: "1s" }} />
        <span className="vk-drop absolute left-[86%] top-0 size-3.5 rounded-full" style={{ ...dropStyle, animationDelay: ".3s" }} />

        {/* brand + status */}
        <div className="relative flex flex-col items-center gap-3 text-center">
          <span className="flex size-14 items-center justify-center bg-primary text-primary-foreground">
            <Mountain className="size-7" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            VERTIKAL
          </span>
          <span className="flex items-center text-sm text-muted-foreground">
            Stiamo pulendo i vetri
            <span className="vk-dot">.</span>
            <span className="vk-dot b">.</span>
            <span className="vk-dot c">.</span>
          </span>
        </div>
      </div>

      {/* Squeegee — idles at the top, then sweeps down on reveal */}
      <div
        className="absolute inset-x-0"
        style={{ top: revealing ? "100%" : "-2%", transition: `top 1.3s ${EASE}` }}
      >
        <div className="absolute inset-x-0 -top-2 h-2.5 bg-white/40 blur-[3px]" />
        <div className="h-3 w-full bg-gradient-to-b from-[#3c4453] to-[#0f141c] shadow-[0_4px_10px_rgba(0,0,0,.5)]" />
        <div className="h-px w-full bg-white/50" />
      </div>
    </div>
  );
}
