"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "@/components/service-card";
import {
  ScrollingSection,
  staggerItemVariants,
} from "@/components/scrolling-section";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServicesAnimatedGrid() {
  return (
    <ScrollingSection
      triggerOnce
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3",
      )}
    >
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.title}
            variants={staggerItemVariants}
            className={cn(i === 0 && "sm:col-span-2 lg:col-span-1")}
          >
            <ServiceCard
              icon={<Icon />}
              title={service.title}
              description={service.description}
              index={i}
            />
          </motion.div>
        );
      })}
    </ScrollingSection>
  );
}
