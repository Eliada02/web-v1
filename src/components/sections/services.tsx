import { Reveal } from "@/components/reveal";
import { ServicesAnimatedGrid } from "@/components/services-animated-grid";

export function Services() {
  return (
    <section
      id="servizi"
      className="section dark bg-background text-foreground"
    >
      <div className="section-container">
        <Reveal className="section-header">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Cosa facciamo
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Un unico partner per ogni lavoro in quota
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nove specializzazioni su fune — dalla pulizia delle facciate alle
            ispezioni strutturali — con una sola squadra certificata.
          </p>
        </Reveal>

        <Reveal className="section-content">
          <ServicesAnimatedGrid />
        </Reveal>
      </div>
    </section>
  );
}
