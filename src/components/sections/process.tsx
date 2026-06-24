import { Reveal } from "@/components/reveal";
import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section
      id="processo"
      className="section dark bg-background text-foreground"
    >
      <div className="section-container">
        <Reveal className="section-header">
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

        <div className="section-content grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 100} className="relative">
              <div className="text-5xl font-bold text-primary">
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
