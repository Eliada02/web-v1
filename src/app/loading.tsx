import { Mountain } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Route-level Suspense fallback (App Router). Shown while a page segment is
 * loading/streaming — a window-cleaning themed loader: a squeegee wipes a
 * glass pane back and forth while the content gets ready.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center gap-7 bg-background">
      <style>{`
        @keyframes ld-wipe  { 0%,100% { transform: translateX(0) }    50% { transform: translateX(180px) } }
        @keyframes ld-shine { 0% { transform: translateX(-130%) }     60%,100% { transform: translateX(360%) } }
        @keyframes ld-dot   { 0%,80%,100% { opacity: .2 }             40% { opacity: 1 } }
        .ld-wipe  { animation: ld-wipe 1.9s ease-in-out infinite; }
        .ld-shine { animation: ld-shine 1.9s ease-in-out infinite; }
        .ld-dot   { animation: ld-dot 1.2s ease-in-out infinite; }
        .ld-dot.b { animation-delay: .2s; }
        .ld-dot.c { animation-delay: .4s; }
        @media (prefers-reduced-motion: reduce) {
          .ld-wipe, .ld-shine, .ld-dot { animation: none; }
        }
      `}</style>

      {/* Window pane being cleaned */}
      <div className="relative h-32 w-48 overflow-hidden border-2 border-primary/30 bg-primary/[0.06]">
        {/* mullion cross */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/10" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground/10" />
        {/* shine sweep on the glass */}
        <div className="ld-shine absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 blur-[2px]" />
        {/* squeegee blade wiping across */}
        <div className="ld-wipe absolute inset-y-0 left-0 w-3">
          <div className="h-full w-2.5 bg-gradient-to-r from-[#3c4453] to-[#0f141c] shadow-[3px_0_8px_rgba(0,0,0,.4)]" />
          <div className="absolute inset-y-0 left-2.5 w-px bg-white/50" />
        </div>
      </div>

      {/* Brand + status */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center bg-primary text-primary-foreground">
            <Mountain className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            {site.name}
          </span>
        </div>
        <p className="flex items-center text-sm text-muted-foreground">
          Stiamo pulendo i vetri
          <span className="ld-dot">.</span>
          <span className="ld-dot b">.</span>
          <span className="ld-dot c">.</span>
        </p>
      </div>
    </div>
  );
}
