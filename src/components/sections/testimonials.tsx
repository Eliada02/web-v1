"use client";

import { useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  const autoplay = useRef(
    Autoplay({
      delay: 4500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.current.stop();
    }
  }, []);

  return (
    <section className="section bg-muted/40">
      <div className="section-container">
        <Reveal className="section-header">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Dicono di noi
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            La fiducia di chi ci ha scelto
          </h2>
        </Reveal>

        <Carousel
          className="section-content"
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
        >
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.author} className="md:basis-1/2">
                <Card className="h-full border-t-2 border-t-transparent transition-all duration-300 hover:border-t-primary hover:shadow-lg">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <Quote className="size-8 text-primary/30" />
                    <p className="flex-1 text-foreground/90">“{t.quote}”</p>
                    <div>
                      <div className="font-semibold">{t.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
