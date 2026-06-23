import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      {/* Looping footage of a rope-access technician washing a high-rise
          facade fills the hero (over a dark fallback while it loads). The 60fps
          source is slowed to 0.6× so the loop feels longer and more cinematic.
          No poster image — only the video. */}
      <div className="absolute inset-0 -z-10">
        <BackgroundVideo
          src="https://videos.pexels.com/video-files/13361431/13361431-hd_1920_1080_60fps.mp4"
          playbackRate={0.6}
          className="size-full"
        />
      </div>
      {/* Legibility overlay + a soft fade into the next section. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background" />

      {/* Foreground content scrolls with the page (no scroll-driven transform).
          A JS parallax here only made the hero text judder a frame behind the
          native scroll on the way into the next section, with no depth payoff
          since the video background isn't counter-parallaxed. The entrance
          animation is preserved. */}
      <div className="relative w-full">
      <div className="section-container flex flex-col items-start pb-20 pt-28 duration-1000 ease-out animate-in fade-in slide-in-from-bottom-6 sm:pb-24 sm:pt-32 lg:pb-28">
        <span className="mb-4 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur sm:mb-6 sm:px-4 sm:text-sm">
          <span className="size-1.5 bg-primary" />
          Edilizia acrobatica · Rope access
        </span>

        <h1 className="max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-md sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
          Lavori in quota{" "}
          <span className="text-primary">senza ponteggi.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base text-white/85 drop-shadow sm:mt-6 sm:text-lg md:text-xl">
          Fino al 60% di risparmio rispetto al ponteggio tradizionale.
          Interventi rapidi, sicuri e certificati su qualsiasi edificio.
        </p>

        <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
          <Button asChild size="lg" pulse className="text-base">
            <a href="#contatti">
              Preventivo gratuito
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            pulse
            className="border-white/30 bg-white/5 text-base text-white hover:bg-white/15 hover:text-white"
          >
            <a href="#servizi">Scopri i servizi</a>
          </Button>
        </div>

        <ul className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
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
      </div>

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
