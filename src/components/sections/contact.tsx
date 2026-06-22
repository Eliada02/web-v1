"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const contactInfo = [
  { icon: Phone, label: "Telefono", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Sede", value: site.address },
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: collegare a un endpoint reale (API route / servizio email).
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Richiesta inviata!", {
        description: "Ti ricontatteremo entro 24 ore per il sopralluogo.",
      });
    }, 800);
  }

  return (
    <section
      id="contatti"
      className="dark bg-background py-20 text-foreground lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Contatti
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Richiedi un preventivo gratuito
            </h2>
            <p className="mt-4 text-muted-foreground">
              Raccontaci il tuo intervento: ti risponderemo entro 24 ore con un
              sopralluogo gratuito e un&apos;offerta su misura.
            </p>

            <div className="mt-10 space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const content = (
                  <div className="group flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {info.label}
                      </div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </div>
                );
                return info.href ? (
                  <a
                    key={info.label}
                    href={info.href}
                    className="block transition-opacity hover:opacity-80"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={info.label}>{content}</div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120} className="border bg-background p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome e cognome</Label>
                  <Input id="name" name="name" required placeholder="Mario Rossi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="+39 333 1234567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="mario@email.it" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Tipo di intervento</Label>
                <Input id="service" name="service" placeholder="Es. pulizia facciata condominio" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Messaggio</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Descrivi brevemente il lavoro e l'indirizzo dell'immobile…"
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? "Invio in corso…" : "Invia richiesta"}
                {!submitting && <Send className="size-4" />}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Inviando accetti la nostra{" "}
                <Link
                  href="/privacy"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
                . Nessuno spam.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
