"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioGrid, type PortfolioGridItem } from "@/lib/site";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function curtainTransform(
  direction: "vertical" | "horizontal",
  reveal: number,
  side: "a" | "b",
): string {
  const closed = (1 - reveal) * 100;
  const isVertical = direction === "vertical";
  if (isVertical) {
    return side === "a"
      ? `translate3d(0, ${-closed}%, 0)`
      : `translate3d(0, ${closed}%, 0)`;
  }
  return side === "a"
    ? `translate3d(${-closed}%, 0, 0)`
    : `translate3d(${closed}%, 0, 0)`;
}

function cardReveal(progress: number, index: number, active: number) {
  if (index > active) return 1;
  if (index === 0) return clamp01(progress);
  return clamp01(progress - (index - 1));
}

export type PortfolioCardHandle = {
  setReveal: (reveal: number, focused: boolean) => void;
};

const PortfolioFocusCard = forwardRef<
  PortfolioCardHandle,
  {
    item: PortfolioGridItem;
    direction: "vertical" | "horizontal";
    stacked?: boolean;
    initialFocused?: boolean;
    initialReveal?: number;
  }
>(function PortfolioFocusCard(
  {
    item,
    direction,
    stacked = true,
    initialFocused = false,
    initialReveal = 0,
  },
  ref,
) {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLSpanElement>(null);
  const ctaLineRef = useRef<HTMLSpanElement>(null);
  const curtainARef = useRef<HTMLDivElement>(null);
  const curtainBRef = useRef<HTMLDivElement>(null);
  const focusedRef = useRef(initialFocused);

  const applyReveal = (reveal: number, focused: boolean) => {
    const closed = (1 - reveal) * 100;
    const isVertical = direction === "vertical";

    if (curtainARef.current) {
      curtainARef.current.style.transform = isVertical
        ? `translate3d(0, ${-closed}%, 0)`
        : `translate3d(${-closed}%, 0, 0)`;
    }
    if (curtainBRef.current) {
      curtainBRef.current.style.transform = isVertical
        ? `translate3d(0, ${closed}%, 0)`
        : `translate3d(${closed}%, 0, 0)`;
    }
    if (stacked && imageWrapRef.current) {
      imageWrapRef.current.style.transform = `scale(${1.06 - 0.06 * reveal})`;
    }

    if (focused !== focusedRef.current) {
      focusedRef.current = focused;
      arrowRef.current?.classList.toggle("translate-y-0", focused);
      arrowRef.current?.classList.toggle("opacity-100", focused);
      arrowRef.current?.classList.toggle("translate-y-2", !focused);
      arrowRef.current?.classList.toggle("opacity-0", !focused);
      ctaRef.current?.classList.toggle("text-white", focused);
      ctaRef.current?.classList.toggle("text-white/0", !focused);
      ctaLineRef.current?.classList.toggle("w-8", focused);
      ctaLineRef.current?.classList.toggle("w-0", !focused);
    }
  };

  useImperativeHandle(ref, () => ({
    setReveal: applyReveal,
  }));

  useEffect(() => {
    applyReveal(initialReveal, initialFocused);
  }, [initialReveal, initialFocused]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Link
        href={item.href}
        aria-label={`${item.title} — scopri di più`}
        tabIndex={focusedRef.current ? 0 : -1}
        className={cn(
          "group relative flex h-full min-h-[14rem] overflow-hidden shadow-lg",
          "transition-shadow duration-500",
          focusedRef.current && "shadow-2xl shadow-black/30",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          item.featured && "border-l-4 border-l-primary",
        )}
      >
        <div
          ref={imageWrapRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={initialFocused}
            sizes="(max-width: 768px) 100vw, 80vw"
            className={cn(
              "object-cover",
              !stacked &&
                "scale-100 transition-transform duration-500 ease-out group-hover:scale-105",
            )}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
        <span
          ref={arrowRef}
          className={cn(
            "absolute right-4 top-4 flex size-10 items-center justify-center bg-primary text-primary-foreground",
            initialFocused
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
            ref={ctaRef}
            className={cn(
              "mt-3 flex items-center gap-2 text-sm font-medium sm:text-base",
              initialFocused ? "text-white" : "text-white/0",
              "group-hover:text-white",
            )}
          >
            Scopri di più
            <span
              ref={ctaLineRef}
              className={cn(
                "h-0.5 bg-primary",
                initialFocused ? "w-8" : "w-0",
                "group-hover:w-8",
              )}
            />
          </span>
        </div>
      </Link>

      {direction === "vertical" ? (
        <>
          <div
            ref={curtainARef}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/2 bg-background will-change-transform motion-reduce:hidden"
            style={{ transform: curtainTransform(direction, initialReveal, "a") }}
          />
          <div
            ref={curtainBRef}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-background will-change-transform motion-reduce:hidden"
            style={{ transform: curtainTransform(direction, initialReveal, "b") }}
          />
        </>
      ) : (
        <>
          <div
            ref={curtainARef}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 bg-background will-change-transform motion-reduce:hidden"
            style={{ transform: curtainTransform(direction, initialReveal, "a") }}
          />
          <div
            ref={curtainBRef}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2 bg-background will-change-transform motion-reduce:hidden"
            style={{ transform: curtainTransform(direction, initialReveal, "b") }}
          />
        </>
      )}
    </div>
  );
});

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
              stacked={false}
              initialReveal={1}
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
  const cardRefs = useRef<(PortfolioCardHandle | null)[]>([]);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [useScrollShowcase, setUseScrollShowcase] = useState(true);
  const count = portfolioGrid.length;

  useEffect(() => {
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

    const applyProgress = (progress: number) => {
      const active = Math.min(count - 1, Math.round(progress));

      portfolioGrid.forEach((_, i) => {
        const reveal = cardReveal(progress, i, active);
        const wrapper = wrapperRefs.current[i];
        if (wrapper) {
          wrapper.style.zIndex = String(reveal >= 1 ? 10 : 11 + i);
        }
        cardRefs.current[i]?.setReveal(reveal, i === active);
      });
    };

    const update = () => {
      const rect = track.getBoundingClientRect();
      const step = viewportStep();
      const scrolled = Math.max(0, -rect.top);
      applyProgress(Math.min(count - 1, scrolled / step));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", onScroll, {
      passive: true,
    });
    window.visualViewport?.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  useLayoutEffect(() => {
    if (!useScrollShowcase) return;

    const track = trackRef.current;
    if (!track) return;

    const viewportStep = () =>
      window.visualViewport?.height ?? window.innerHeight;

    const rect = track.getBoundingClientRect();
    const step = viewportStep();
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(count - 1, scrolled / step);
    const active = Math.min(count - 1, Math.round(progress));

    portfolioGrid.forEach((_, i) => {
      const reveal = cardReveal(progress, i, active);
      const wrapper = wrapperRefs.current[i];
      if (wrapper) {
        wrapper.style.zIndex = String(reveal >= 1 ? 10 : 11 + i);
      }
      cardRefs.current[i]?.setReveal(reveal, i === active);
    });
  }, [count, useScrollShowcase]);

  if (!useScrollShowcase) {
    return <PortfolioGridFallback />;
  }

  return (
    <div
      ref={trackRef}
      className="relative touch-pan-y [overflow-anchor:none]"
      style={{ height: `${count * 100}dvh` }}
    >
      <div className="sticky top-0 flex h-dvh flex-col bg-background [transform:translateZ(0)]">
        <div className="section-container shrink-0 pt-20 pb-6 sm:pt-10 sm:pb-5">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Portfolio
            </span>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:mt-2 sm:text-3xl lg:text-4xl">
              Alcuni dei nostri interventi
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-2 sm:text-base">
              Edifici residenziali, uffici, hotel e poli industriali in tutta
              Italia.
            </p>
          </div>
        </div>

        <div className="section-container relative min-h-0 flex-1 pb-4 sm:pb-10">
          {portfolioGrid.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                wrapperRefs.current[i] = el;
              }}
              className="absolute inset-0 pb-4 sm:pb-10"
              style={{ zIndex: i === 0 ? 11 : 10 }}
            >
              <PortfolioFocusCard
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                item={item}
                initialReveal={i === 0 ? 0 : 1}
                initialFocused={i === 0}
                direction={i % 2 === 0 ? "vertical" : "horizontal"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
