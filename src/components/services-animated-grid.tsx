"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "@/components/service-card";
import {
  ScrollingSection,
  staggerItemVariants,
} from "@/components/scrolling-section";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Asymmetric-friendly grid: 3 cols desktop, featured first cell spans 2 on tablet */
const serviceGridClass = [
  "md:col-span-2 lg:col-span-1", // 0 — Pulizia facciate (wide on tablet)
  "", // 1
  "", // 2
  "", // 3
  "", // 4
  "", // 5
  "", // 6
  "", // 7
  "sm:col-span-2 lg:col-span-1", // 8 — last row balance on tablet
];

export function ServicesAnimatedGrid() {
  return (
    <ScrollingSection
      triggerOnce
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        "gap-0",
      )}
    >
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.title}
            variants={staggerItemVariants}
            className={cn(serviceGridClass[i])}
          >
            <ServiceCard
              icon={<Icon />}
              title={service.title}
              description={service.description}
            />
          </motion.div>
        );
      })}
    </ScrollingSection>
  );
}
