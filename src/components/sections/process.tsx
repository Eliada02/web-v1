import { Reveal } from "@/components/reveal";
import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section
      id="processo"
      className="dark bg-background py-20 text-foreground lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Come lavoriamo
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Quattro passi, zero pensieri
          </h2>
          <p className="mt-4 text-muted-foreground">
            Un percorso semplice e trasparente, dal primo contatto alla
            consegna del lavoro.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 100} className="group relative">
              <div className="text-5xl font-bold text-primary/20 transition-colors duration-300 group-hover:text-primary">
                {step.step}
              </div>
              {i < processSteps.length - 1 && (
                <div className="absolute right-0 top-6 hidden h-px w-1/2 bg-border lg:block" />
              )}
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
