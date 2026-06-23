import { Award, HardHat, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { certifications } from "@/lib/site";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Zero incidenti in 15 anni",
    description:
      "Procedure di sicurezza rigorose e doppia linea di ancoraggio su ogni intervento.",
  },
  {
    icon: HardHat,
    title: "Tecnici certificati IRATA",
    description:
      "Formazione continua e DPI di Categoria III per ogni operatore in quota.",
  },
  {
    icon: Award,
    title: "Aziende e norme",
    description:
      "Operatività conforme al D.Lgs 81/08 e piena copertura assicurativa.",
  },
];

export function Safety() {
  return (
    <section
      id="sicurezza"
      className="section dark bg-background text-foreground"
    >
      <div className="section-container">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Sicurezza & certificazioni
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              La sicurezza non è un optional
            </h2>
            <p className="mt-4 text-muted-foreground">
              Ogni intervento è pianificato nel dettaglio e supervisionato da un
              responsabile della sicurezza. Lavoriamo solo con attrezzature
              certificate e protocolli verificati.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {certifications.map((cert) => (
                <Badge
                  key={cert}
                  variant="secondary"
                  className="border border-border bg-secondary text-foreground hover:bg-accent"
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal
                  key={pillar.title}
                  delay={i * 120}
                  className="group flex gap-4 border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/50 hover:bg-accent"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{pillar.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
