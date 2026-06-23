"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ParsedStat = {
  prefix: string;
  end: number;
  suffix: string;
  formatThousands: boolean;
};

function parseStatValue(value: string): ParsedStat {
  const match = value.match(/^([^\d]*?)(\d[\d.,]*)(.*)$/);
  if (!match) {
    return { prefix: "", end: 0, suffix: value, formatThousands: false };
  }

  const [, prefix, numPart, suffix] = match;
  const formatThousands =
    /\.\d{3}/.test(numPart) && !numPart.includes(",");
  const normalized = numPart.replace(/\./g, "").replace(",", ".");
  const end = parseFloat(normalized);

  return {
    prefix,
    end: Number.isNaN(end) ? 0 : end,
    suffix,
    formatThousands,
  };
}

function formatCount(current: number, formatThousands: boolean): string {
  const rounded = Math.round(current);
  return formatThousands
    ? rounded.toLocaleString("it-IT")
    : String(rounded);
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

type CountUpProps = {
  value: string;
  className?: string;
  delay?: number;
  duration?: number;
};

export function CountUp({
  value,
  className,
  delay = 0,
  duration = 1600,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parseStatValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { prefix, end, suffix, formatThousands } = parseStatValue(value);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      el.textContent = value;
      return;
    }

    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        timeout = setTimeout(() => {
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const current = end * easeOutExpo(progress);
            el.textContent = `${prefix}${formatCount(current, formatThousands)}${suffix}`;

            if (progress < 1) {
              raf = requestAnimationFrame(tick);
            } else {
              el.textContent = value;
            }
          };

          raf = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.2, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [value, delay, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {`${parsed.prefix}${formatCount(0, parsed.formatThousands)}${parsed.suffix}`}
    </span>
  );
}
