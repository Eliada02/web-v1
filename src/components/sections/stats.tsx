import { CountUp } from "@/components/count-up";
import { stats } from "@/lib/site";

export function Stats() {
  return (
    <section className="border-b bg-background">
      <div className="section-container grid grid-cols-2 gap-y-6 py-10 sm:gap-y-8 sm:py-12 lg:grid-cols-4 lg:gap-y-0">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="group py-2 text-center lg:border-l lg:border-border lg:px-6 lg:first:border-l-0"
          >
            <CountUp
              value={stat.value}
              delay={i * 60}
              className="block text-3xl font-bold tracking-tight text-primary transition-transform duration-300 group-hover:scale-110 sm:text-4xl"
            />
            <div className="mt-2 text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
