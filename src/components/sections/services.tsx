import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section
      id="servizi"
      className="dark bg-background py-20 text-foreground lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
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

        {/* The services are arranged as the lit windows of a single building
            facade — one object, not separate cards. */}
        <Reveal className="mx-auto mt-14 max-w-5xl">
          <div className="border-2 border-primary/25 bg-white/[0.02] shadow-2xl shadow-black/40">
            {/* Rooftop / cornice */}
            <div className="flex items-center justify-between gap-4 border-b-2 border-primary/25 bg-primary/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  VERTIKAL · Servizi in quota
                </span>
              </div>
              <div className="flex items-end gap-1" aria-hidden>
                <span className="h-2 w-1 bg-white/30" />
                <span className="h-3.5 w-1 bg-white/30" />
                <span className="h-1.5 w-1 bg-white/30" />
              </div>
            </div>

            {/* Windows (gap-0 → shared mullions form one facade) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => {
                const Icon = service.icon;
                const isLast = i === services.length - 1;
                return (
                  <ServiceCard
                    key={service.title}
                    icon={<Icon />}
                    title={service.title}
                    description={service.description}
                    // keep the facade complete: the lone last window fills the
                    // row on the 2-column (tablet) layout.
                    className={isLast ? "sm:col-span-2 lg:col-span-1" : undefined}
                  />
                );
              })}
            </div>

            {/* Ground line / entrance */}
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
