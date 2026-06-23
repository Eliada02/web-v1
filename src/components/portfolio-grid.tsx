"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioGrid, type PortfolioGridItem } from "@/lib/site";

function PortfolioFocusCard({
  item,
  open,
  focused,
  direction,
  stacked = true,
}: {
  item: PortfolioGridItem;
  open: boolean;
  focused: boolean;
  direction: "vertical" | "horizontal";
  stacked?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden transition-[transform,opacity,filter] duration-700 ease-out",
        !stacked && "scale-100 opacity-100",
        stacked &&
          focused &&
          "scale-100 opacity-100",
        stacked &&
          !focused &&
          open &&
          "scale-[0.97] opacity-0",
        stacked &&
          !focused &&
          !open &&
          "scale-[0.94] opacity-40",
      )}
    >
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
            "object-cover transition-transform duration-700 ease-out",
            focused ? "scale-100" : "scale-110",
            "group-hover:scale-105",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 transition-opacity duration-500",
            focused ? "opacity-100" : "opacity-80",
          )}
        />
        <span
          className={cn(
            "absolute right-4 top-4 flex size-10 items-center justify-center bg-primary text-primary-foreground transition-all duration-300",
            focused
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0",
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

      {direction === "vertical" ? (
        <>
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2 bg-background motion-reduce:hidden",
              "transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
              open ? "-translate-y-full" : "translate-y-0",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-background motion-reduce:hidden",
              "transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
              open ? "translate-y-full" : "translate-y-0",
            )}
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 bg-background motion-reduce:hidden",
              "transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
              open ? "-translate-x-full" : "translate-x-0",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2 bg-background motion-reduce:hidden",
              "transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
              open ? "translate-x-full" : "translate-x-0",
            )}
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
              open
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [useScrollShowcase, setUseScrollShowcase] = useState(true);
  const count = portfolioGrid.length;

  useEffect(() => {
    // The sticky, scroll-driven showcase is great with a mouse but feels like
    // scroll-jacking on touch/small screens (each item eats a full viewport of
    // swiping). Fall back to a plain grid there, and for reduced-motion users.
    const skipShowcase = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 768px), (pointer: coarse)",
    ).matches;
    if (skipShowcase) {
      setUseScrollShowcase(false);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    const update = () => {
      const rect = track.getBoundingClientRect();
      const step = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const index = Math.min(count - 1, Math.floor(scrolled / step));
      setActiveIndex(index);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  if (!useScrollShowcase) {
    return <PortfolioGridFallback />;
  }

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${count * 100}svh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col bg-background">
        <div className="section-container shrink-0 pt-8 pb-4 sm:pt-10 sm:pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Portfolio
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Alcuni dei nostri interventi
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                Edifici residenziali, uffici, hotel e poli industriali in tutta
                Italia.
              </p>
            </div>

            <div className="flex items-center gap-3 sm:flex-col sm:items-end">
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

        <div className="section-container relative min-h-0 flex-1 pb-8 sm:pb-10">
          {portfolioGrid.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "absolute inset-0 pb-8 sm:pb-10",
                i === activeIndex ? "z-20" : "z-10",
              )}
            >
              <PortfolioFocusCard
                item={item}
                open={i <= activeIndex}
                focused={i === activeIndex}
                direction={i % 2 === 0 ? "vertical" : "horizontal"}
              />
            </div>
          ))}
        </div>

        <p className="section-container shrink-0 pb-4 text-center text-xs text-muted-foreground sm:pb-6">
          Scorri per esplorare ogni intervento
        </p>
      </div>
    </div>
  );
}
