"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type HTMLAttributes,
  type RefObject,
} from "react";
import { parallaxManager, type ParallaxFrame } from "@/lib/parallax";
import { cn } from "@/lib/utils";

// useLayoutEffect runs before paint (no flash) but warns during SSR; fall back
// to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export interface UseParallaxOptions {
  /**
   * Apparent scroll speed of this layer, as a fraction of normal page scroll:
   *  - `1`   → moves with the page (no parallax)
   *  - `<1`  → slower than scroll → recedes into the background (e.g. `0.2`)
   *  - `>1`  → faster than scroll → pops toward the foreground (e.g. `1.3`)
   *  - `0`   → appears pinned in place while it is in view
   */
  speed?: number;
  /** Axis to translate along. Defaults to vertical (`"y"`). */
  axis?: "x" | "y";
  /** Turn the effect off (renders a plain, static element). */
  disabled?: boolean;
}

/**
 * Attaches a parallax transform to the returned ref.
 *
 * ── The math ──────────────────────────────────────────────────────────────
 * Elements in normal flow already scroll at 100% of page speed. To make a
 * layer *appear* to scroll at `speed` × page speed, we cancel `(1 - speed)`
 * of its natural movement with a counter-translate:
 *
 *   relative = scroll + viewportSize / 2 − layerNaturalCenter   // signed px
 *   translate = relative × (1 − speed)
 *
 * `relative` is how far the layer's center sits from the viewport's center, in
 * document space. Multiplying by `(1 − speed)`:
 *   • speed = 1 → translate 0          → moves exactly with the page
 *   • speed = 0.2 → cancels 80%         → drifts slowly (background)
 *   • speed = 0   → cancels 100%        → fully pinned while on screen
 *   • speed > 1 → over-cancels (sign flips) → outruns the page (foreground)
 *
 * The offset is bounded by the viewport size, so it never runs away.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>({
  speed = 0.5,
  axis = "y",
  disabled = false,
}: UseParallaxOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    // Nothing to do for a 1:1 layer, when disabled, or for reduced-motion users.
    if (!el || disabled || speed === 1 || prefersReducedMotion()) return;

    // Cached, transform-independent geometry. Measured on mount + resize only.
    let naturalCenter = 0;
    // The translate we last wrote, so re-measuring isn't polluted by it.
    let applied = 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (axis === "y") {
        naturalCenter = rect.top + window.scrollY - applied + rect.height / 2;
      } else {
        naturalCenter = rect.left + window.scrollX - applied + rect.width / 2;
      }
    };

    const onFrame = (frame: ParallaxFrame) => {
      const scroll = axis === "y" ? frame.scrollY : frame.scrollX;
      const viewport =
        axis === "y" ? frame.viewportHeight : frame.viewportWidth;

      const relative = scroll + viewport / 2 - naturalCenter;
      applied = relative * (1 - speed);

      // translate3d → promotes to its own GPU layer (hardware acceleration).
      el.style.transform =
        axis === "y"
          ? `translate3d(0, ${applied.toFixed(2)}px, 0)`
          : `translate3d(${applied.toFixed(2)}px, 0, 0)`;
    };

    const unsubscribe = parallaxManager.subscribe(onFrame, measure);

    return () => {
      unsubscribe();
      el.style.transform = ""; // restore natural position
    };
  }, [speed, axis, disabled]);

  return ref;
}

export interface ParallaxLayerProps
  extends HTMLAttributes<HTMLDivElement>,
    UseParallaxOptions {}

/**
 * A reusable wrapper that parallaxes its children. Compose several with
 * different `speed` values to build depth.
 *
 * ```tsx
 * <ParallaxLayer speed={0.2}> background </ParallaxLayer>
 * <ParallaxLayer speed={0.6}> midground </ParallaxLayer>
 * <ParallaxLayer speed={1.2}> foreground </ParallaxLayer>
 * ```
 */
export function ParallaxLayer({
  speed = 0.5,
  axis = "y",
  disabled = false,
  className,
  children,
  ...rest
}: ParallaxLayerProps) {
  const ref = useParallax<HTMLDivElement>({ speed, axis, disabled });
  const animated = !disabled && speed !== 1;

  return (
    <div
      ref={ref}
      // `will-change: transform` hints the compositor to pre-promote the layer.
      // Only set it when actually animating — it's not free for static nodes.
      className={cn(animated && "will-change-transform", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
