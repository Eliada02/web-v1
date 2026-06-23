"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioGrid, type PortfolioGridItem } from "@/lib/site";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function PortfolioFocusCard({
  item,
  reveal,
  focused,
  direction,
  stacked = true,
}: {
  item: PortfolioGridItem;
  /** How open this card's curtain is: 0 = fully covered, 1 = fully revealed. */
  reveal: number;
  focused: boolean;
  direction: "vertical" | "horizontal";
  stacked?: boolean;
}) {
  // Distance the curtain panels still need to travel to be fully retracted.
  const closed = (1 - reveal) * 100;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Link
        href={item.href}
        aria-label={`${item.title} — scopri di più`}
        tabIndex={focused ? 0 : -1}
        className={cn(
          "group relative flex h-full min-h-[14rem] overflow-hidden shadow-lg",
          "transition-shadow duration-500",
          focused && "shadow-2xl shadow-black/30",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          item.featured && "border-l-4 border-l-primary",
        )}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={focused}
          sizes="(max-width: 768px) 100vw, 80vw"
          className={cn(
            "object-cover transition-transform duration-500 ease-out",
            !stacked && "scale-100 group-hover:scale-105",
          )}
          // Gentle zoom that resolves as the card opens (showcase only).
          style={
            stacked ? { transform: `scale(${1.06 - 0.06 * reveal})` } : undefined
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
        <span
          className={cn(
            "absolute right-4 top-4 flex size-10 items-center justify-center bg-primary text-primary-foreground transition-all duration-300",
            focused ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            "group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          <ArrowUpRight className="size-5" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <span className="text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
            {item.category}
          </span>
          <h3
            className={cn(
              "mt-1 font-semibold text-white",
              item.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
            )}
          >
            {item.title}
          </h3>
          <span
            className={cn(
              "mt-3 flex items-center gap-2 text-sm font-medium transition-all duration-500 sm:text-base",
              focused ? "text-white" : "text-white/0",
              "group-hover:text-white",
            )}
          >
            Scopri di più
            <span
              className={cn(
                "h-0.5 bg-primary transition-all duration-500",
                focused ? "w-8" : "w-0",
                "group-hover:w-8",
              )}
            />
          </span>
        </div>
      </Link>

      {/* Curtain panels. Their offset is driven directly by `reveal`, so the
          opening tracks the scroll position; a short eased transition smooths
          out any per-frame jitter. */}
      {direction === "vertical" ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2 bg-background transition-transform duration-300 ease-out motion-reduce:hidden"
            style={{ transform: `translateY(${-closed}%)` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-background transition-transform duration-300 ease-out motion-reduce:hidden"
            style={{ transform: `translateY(${closed}%)` }}
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 bg-background transition-transform duration-300 ease-out motion-reduce:hidden"
            style={{ transform: `translateX(${-closed}%)` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2 bg-background transition-transform duration-300 ease-out motion-reduce:hidden"
            style={{ transform: `translateX(${closed}%)` }}
          />
        </>
      )}
    </div>
  );
}

function PortfolioGridFallback() {
  return (
    <div className="section">
      <div className="section-container section-header">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Portfolio
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Alcuni dei nostri interventi
        </h2>
        <p className="mt-4 text-muted-foreground">
          Edifici residenziali, uffici, hotel e poli industriali in tutta Italia.
        </p>
      </div>
      <div className="section-container section-content grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioGrid.map((item, i) => (
          <div key={item.title} className="relative min-h-56">
            <PortfolioFocusCard
              item={item}
              reveal={1}
              focused={false}
              stacked={false}
              direction={i % 2 === 0 ? "vertical" : "horizontal"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioGrid() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Continuous scroll progress through the showcase (0 → count - 1).
  const [progress, setProgress] = useState(0);
  const [useScrollShowcase, setUseScrollShowcase] = useState(true);
  const count = portfolioGrid.length;

  useEffect(() => {
    // Plain grid only for users who prefer reduced motion.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setUseScrollShowcase(false);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    const viewportStep = () =>
      window.visualViewport?.height ?? window.innerHeight;

    const update = () => {
      const rect = track.getBoundingClientRect();
      const step = viewportStep();
      const scrolled = Math.max(0, -rect.top);
      // Fractional progress — this is what makes the reveal track the scroll
      // continuously instead of snapping at each viewport boundary.
      setProgress(Math.min(count - 1, scrolled / step));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
    };
  }, [count]);

  if (!useScrollShowcase) {
    return <PortfolioGridFallback />;
  }

  const activeIndex = Math.min(count - 1, Math.round(progress));

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${count * 100}svh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col bg-background">
        <div className="section-container shrink-0 pt-6 pb-3 sm:pt-10 sm:pb-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                Portfolio
              </span>
              <h2 className="mt-1.5 text-xl font-bold tracking-tight sm:mt-2 sm:text-3xl lg:text-4xl">
                Alcuni dei nostri interventi
              </h2>
              <p className="mt-1.5 max-w-xl text-xs text-muted-foreground sm:mt-2 sm:text-base">
                Edifici residenziali, uffici, hotel e poli industriali in tutta
                Italia.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
              <span className="text-sm font-medium tabular-nums text-muted-foreground">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="text-foreground/40"> / </span>
                {String(count).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5" aria-hidden>
                {portfolioGrid.map((item, i) => (
                  <span
                    key={item.title}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      i === activeIndex
                        ? "w-6 bg-primary"
                        : i < activeIndex
                          ? "w-1.5 bg-primary/50"
                          : "w-1.5 bg-border",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="section-container relative min-h-0 flex-1 pb-4 sm:pb-10">
          {portfolioGrid.map((item, i) => {
            // Card i opens across the scroll segment [i-1, i]. Card 0 is always
            // open. Cards stack so the one currently opening sits on top of the
            // already-revealed one beneath it; not-yet-opened cards stay behind.
            const reveal = clamp01(progress - (i - 1));
            return (
              <div
                key={item.title}
                className="absolute inset-0 pb-4 sm:pb-10"
                style={{ zIndex: reveal === 0 ? 10 : 11 + i }}
              >
                <PortfolioFocusCard
                  item={item}
                  reveal={reveal}
                  focused={i === activeIndex}
                  direction={i % 2 === 0 ? "vertical" : "horizontal"}
                />
              </div>
            );
          })}
        </div>

        <p className="section-container shrink-0 pb-3 text-center text-[0.65rem] text-muted-foreground sm:pb-6 sm:text-xs">
          Scorri per esplorare ogni intervento
        </p>
      </div>
    </div>
  );
}
