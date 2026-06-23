import { Reveal } from "@/components/reveal";
import { ServicesAnimatedGrid } from "@/components/services-animated-grid";
import { site } from "@/lib/site";

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
            Ogni servizio dietro la sua finestra: dalla pulizia delle facciate
            alle ispezioni strutturali, eseguiti su fune da tecnici certificati.
          </p>
        </Reveal>

        <Reveal className="section-content">
          <div className="border-2 border-primary/25 bg-white/[0.02] shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between gap-4 border-b-2 border-primary/25 bg-primary/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {site.name} · Servizi in quota
                </span>
              </div>
              <div className="flex items-end gap-1" aria-hidden>
                <span className="h-2 w-1 bg-white/30" />
                <span className="h-3.5 w-1 bg-white/30" />
                <span className="h-1.5 w-1 bg-white/30" />
              </div>
            </div>

            <ServicesAnimatedGrid />

            <div className="flex items-center justify-center border-t-2 border-primary/25 bg-primary/10 px-5 py-2.5">
              <span className="text-xs font-medium uppercase tracking-widest text-primary/80">
                9 servizi · un unico partner
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
