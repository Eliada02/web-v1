"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

type ScrollingSectionProps = {
  children: ReactNode;
  className?: string;
  triggerOnce?: boolean;
};

/**
 * Staggered reveal when the block enters the viewport.
 * Scroll is never locked — animations run alongside native scrolling.
 */
export function ScrollingSection({
  children,
  className,
  triggerOnce = true,
}: ScrollingSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.08,
    rootMargin: "0px 0px -4% 0px",
    triggerOnce,
  });

  return (
    <div ref={ref} className="w-full">
      <motion.div
        className={cn(className)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainerVariants}
      >
        {children}
      </motion.div>
    </div>
  );
}
