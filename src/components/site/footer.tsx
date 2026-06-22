import Link from "next/link";
import { Mail, MapPin, Mountain, Phone } from "lucide-react";
import { navLinks, services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="dark border-t bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <a href="/#home" className="flex items-center gap-2 font-bold">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Mountain className="size-5" />
            </span>
            <span className="text-lg">{site.name}</span>
          </a>
          <p className="max-w-xs text-sm text-muted-foreground">
            {site.tagline}. Interventi in quota su fune, senza ponteggi, in
            tutta Italia.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold">Navigazione</h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold">Servizi</h3>
          <ul className="space-y-2.5 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.title}>
                <a
                  href="/#servizi"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold">Contatti</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              {site.address}
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 transition-colors hover:text-foreground"
              >
                <Phone className="size-4 shrink-0 text-primary" />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-foreground"
              >
                <Mail className="size-4 shrink-0 text-primary" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name} S.r.l. — P.IVA
            01234567890. Tutti i diritti riservati.
          </p>
          <p className="flex items-center gap-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/privacy#cookie"
              className="transition-colors hover:text-foreground"
            >
              Cookie Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
