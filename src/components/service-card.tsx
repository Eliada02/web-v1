import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  index,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/45 hover:bg-accent sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105 [&_svg]:size-5">
          {icon}
        </span>
        <span className="text-sm font-medium tabular-nums text-muted-foreground/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
