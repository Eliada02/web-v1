import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BackgroundVideo } from "@/components/background-video";
import { site } from "@/lib/site";

const points = [
  "Squadra interna di tecnici certificati IRATA / FISAT",
  "Sopralluogo e preventivo gratuiti entro 48 ore",
  "Cantieri senza ponteggi: meno costi, meno disagi",
  "Copertura assicurativa completa e report fotografici",
];

export function About() {
  return (
    <section
      id="azienda"
      className="section relative isolate overflow-hidden overflow-x-clip bg-background text-foreground"
    >
      {/* On-brand rope-access footage as an ambient backdrop. The clip is slowed
          and desaturated so it reads as texture behind the content. A white
          overlay keeps the copy and image collage fully legible. */}
      <div className="absolute inset-0 -z-10">
        <BackgroundVideo
          src="https://videos.pexels.com/video-files/13361431/13361431-hd_1920_1080_60fps.mp4"
          playbackRate={0.5}
          className="size-full saturate-[0.45]"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-white/90 via-white/80 to-white/90"
      />

      <div className="section-container grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image collage */}
        <Reveal className="relative pb-10 sm:pb-0">
          <div className="group relative aspect-[4/3] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1000&q=80"
              alt={`Tecnico ${site.name} al lavoro in quota su fune`}
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
          <div className="group absolute -bottom-6 -right-2 hidden aspect-square w-36 overflow-hidden border-4 border-background shadow-xl transition-transform duration-300 hover:scale-105 sm:-bottom-8 sm:-right-4 sm:block sm:w-44">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"
              alt="Dettaglio di attrezzatura e dispositivi di sicurezza"
              fill
              sizes="176px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Experience badge */}
          <div className="absolute left-0 top-4 bg-primary px-4 py-3 text-primary-foreground shadow-lg sm:-left-4 sm:top-6 sm:px-5 sm:py-4">
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
            {site.name} è una squadra di tecnici specializzati nell&apos;edilizia
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
