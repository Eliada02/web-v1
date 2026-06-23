"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Mountain, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/site";

const tel = `tel:${site.phone.replace(/\s/g, "")}`;
const sectionId = (href: string) => href.split("#")[1] ?? "";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  // Solid glass background once the user leaves the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently crossing the viewport middle.
  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(sectionId(l.href)))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open + close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const overHero = !scrolled && !open;
  const linkCls = overHero
    ? "text-white/80 hover:text-white"
    : "text-foreground/70 hover:text-foreground";
  const solidText = overHero ? "text-white" : "text-foreground";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
          scrolled || open
            ? "border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="section-container flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="/#home"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 font-bold tracking-tight transition-colors",
              open ? "text-foreground" : solidText,
            )}
          >
            <span className="flex size-9 items-center justify-center bg-primary text-primary-foreground">
              <Mountain className="size-5" />
            </span>
            <span className="text-lg">{site.name}</span>
          </a>

          {/* Desktop nav with animated active indicator */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === sectionId(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    "after:absolute after:bottom-1 after:left-3 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
                    isActive
                      ? "after:w-[calc(100%-1.5rem)]"
                      : "after:w-0 hover:after:w-[calc(100%-1.5rem)]",
                    isActive
                      ? overHero
                        ? "text-white"
                        : "text-foreground"
                      : linkCls,
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={tel}
              aria-label={`Chiama ${site.phone}`}
              title={site.phone}
              className={cn(
                "inline-flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors md:size-9",
                open
                  ? "text-primary hover:bg-primary/10"
                  : overHero
                    ? "text-white hover:bg-white/10"
                    : "text-primary hover:bg-primary/10",
              )}
            >
              <Phone className="size-5 motion-safe:animate-[phone-shake_2.5s_ease-in-out_infinite]" />
            </a>

            <div className="hidden items-center gap-3 md:flex">
              <Button asChild>
                <a href="/#contatti">Preventivo gratuito</a>
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              aria-expanded={open}
              className={cn(
                "inline-flex size-10 shrink-0 flex-col items-center justify-center rounded-lg transition-colors md:hidden",
                open ? "text-foreground" : solidText,
                !open &&
                  "motion-safe:animate-[nav-pulse_1.5s_ease-in-out_infinite]",
              )}
            >
              <span
                className={cn(
                  "block h-0.5 w-6 bg-current transition-transform duration-300",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "mt-1.5 block h-0.5 w-6 bg-current transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "mt-1.5 block h-0.5 w-6 bg-current transition-transform duration-300",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background transition-[opacity,visibility] duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav className="flex flex-col px-4 pt-24 sm:px-6">
          {navLinks.map((link, i) => {
            const isActive = active === sectionId(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
                className={cn(
                  "flex items-baseline gap-4 border-b border-border/60 py-3.5 text-xl font-semibold tracking-tight transition-all duration-300 sm:py-4 sm:text-2xl",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  isActive ? "text-primary" : "text-foreground",
                )}
              >
                <span className="text-sm font-medium tabular-nums text-muted-foreground">
                  0{i + 1}
                </span>
                {link.label}
              </a>
            );
          })}
        </nav>

        <div
          className="mt-auto space-y-4 px-4 pb-10 transition-all duration-300 sm:px-6"
          style={{
            transitionDelay: open ? `${100 + navLinks.length * 50}ms` : "0ms",
          }}
        >
          <Button asChild size="lg" className="w-full text-base">
            <a href="#contatti" onClick={() => setOpen(false)}>
              Preventivo gratuito
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
