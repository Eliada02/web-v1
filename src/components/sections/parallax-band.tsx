import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParallaxLayer } from "@/components/parallax-layer";
import { Reveal } from "@/components/reveal";

export function ParallaxBand() {
  return (
    <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden">
      {/* Slow-drifting background (40% of scroll speed). Oversized so the
          vertical drift never reveals an edge inside the clipped section. */}
      <ParallaxLayer speed={0.4} aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-x-0 -inset-y-[35%] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
      </ParallaxLayer>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/90 via-navy/75 to-black/85" />

      <Reveal className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Perché VERTIKAL
        </span>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Fino al <span className="text-primary">60%</span> di risparmio.
          <br className="hidden sm:block" /> Zero ponteggi, zero pensieri.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
          Niente montaggio, niente occupazione di suolo pubblico, tempi ridotti.
          L&apos;accesso su fune abbatte i costi e accelera ogni intervento in
          quota — con la massima sicurezza.
        </p>
        <Button asChild size="lg" className="mt-8 text-base">
          <a href="#contatti">
            Richiedi un preventivo
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </Reveal>
    </section>
  );
}
