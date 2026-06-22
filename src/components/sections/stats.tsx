import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/site";

export function Stats() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 90}
            className="group px-4 py-2 text-center lg:border-l lg:border-border lg:first:border-l-0"
          >
            <div className="text-3xl font-bold tracking-tight text-primary transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
