"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

/**
 * A single window of the services "facade". The glass lights up and a soft
 * orange glow follows the cursor — like switching the light on in a building.
 */
export function ServiceCard({
  icon,
  title,
  description,
  className,
}: ServiceCardProps) {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden border border-white/10 p-6 transition-colors duration-300 hover:bg-primary/[0.06] sm:p-7",
        className,
      )}
    >
      {/* Window light following the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--primary) 16%, transparent), transparent 70%)",
        }}
      />
      {/* Glass pane frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2.5 border border-white/[0.06]"
      />

      <div className="relative">
        <span className="flex size-12 items-center justify-center bg-primary/15 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-primary-foreground [&_svg]:size-6">
          {icon}
        </span>
        <h3 className="mt-4 text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
