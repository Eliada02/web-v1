import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParallaxLayer } from "@/components/parallax-layer";
import { BackgroundVideo } from "@/components/background-video";

const highlights = [
  "Oltre 5.000 interventi",
  "Tecnici certificati IRATA / FISAT",
  "0 incidenti in 15 anni",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Looping drone-over-the-city video fills the hero (over a dark
          fallback while it loads). No poster image — only the video. */}
      <div className="absolute inset-0 -z-10">
        <BackgroundVideo
          src="https://videos.pexels.com/video-files/2450250/2450250-hd_1920_1080_30fps.mp4"
          className="size-full"
        />
      </div>
      {/* Legibility overlay + a soft fade into the next section. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background" />

      {/* Foreground text moves slightly faster than scroll (speed > 1) so it
          separates from the static video. The entrance animation stays on the
          inner element to keep it off the parallax transform. */}

      <ParallaxLayer speed={1.08} className="relative w-full">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start px-4 py-28 duration-1000 ease-out animate-in fade-in slide-in-from-bottom-6 sm:px-6 lg:px-8">
        <span className="mb-6 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
          <span className="size-1.5 bg-primary" />
          Edilizia acrobatica · Rope access
        </span>

        <h1 className="max-w-4xl text-5xl font-bold leading-[1.03] tracking-tight text-white drop-shadow-md sm:text-6xl lg:text-7xl">
          Lavori in quota{" "}
          <span className="text-primary">senza ponteggi.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-white/85 drop-shadow sm:text-xl">
          Fino al 60% di risparmio rispetto al ponteggio tradizionale.
          Interventi rapidi, sicuri e certificati su qualsiasi edificio.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="text-base">
            <a href="#contatti">
              Preventivo gratuito
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/5 text-base text-white hover:bg-white/15 hover:text-white"
          >
            <a href="#servizi">Scopri i servizi</a>
          </Button>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm font-medium text-white/90"
            >
              <CheckCircle2 className="size-4 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      </ParallaxLayer>

      <a
        href="#servizi"
        aria-label="Scorri verso il basso"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/60 transition-colors hover:text-white motion-safe:animate-bounce md:block"
      >
        <ChevronDown className="size-7" />
      </a>
    </section>
  );
}
