import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

const points = [
  "Squadra interna di tecnici certificati IRATA / FISAT",
  "Sopralluogo e preventivo gratuiti entro 48 ore",
  "Cantieri senza ponteggi: meno costi, meno disagi",
  "Copertura assicurativa completa e report fotografici",
];

export function About() {
  return (
    <section id="azienda" className="bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Image collage */}
        <Reveal className="relative">
          <div className="group relative aspect-[4/3] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1000&q=80"
              alt="Tecnico VERTIKAL al lavoro in quota su fune"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover saturate-[0.8] transition-all duration-700 group-hover:scale-105 group-hover:saturate-100"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10"
            />
          </div>

          {/* Overlapping secondary image */}
          <div className="group absolute -bottom-8 -right-4 hidden aspect-square w-44 overflow-hidden border-4 border-background shadow-xl transition-transform duration-300 hover:scale-105 sm:block">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"
              alt="Dettaglio di attrezzatura e dispositivi di sicurezza"
              fill
              sizes="176px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Experience badge */}
          <div className="absolute -left-4 top-6 bg-primary px-5 py-4 text-primary-foreground shadow-lg">
            <div className="text-3xl font-bold leading-none">15+</div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wide">
              anni di esperienza
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal delay={120}>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Chi siamo
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Specialisti dell&apos;accesso su fune dal 2010
          </h2>
          <p className="mt-4 text-muted-foreground">
            VERTIKAL è una squadra di tecnici specializzati nell&apos;edilizia
            acrobatica. Raggiungiamo ogni punto di un edificio con corde e
            imbragature certificate, eliminando ponteggi e piattaforme: lavori
            più rapidi, più sicuri e a costi nettamente inferiori.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li
                key={point}
                className="group flex items-start gap-3 transition-transform duration-300 hover:translate-x-1"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-125" />
                <span className="text-foreground/90 transition-colors duration-300 group-hover:text-primary">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
