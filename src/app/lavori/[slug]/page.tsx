import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Ruler,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { getProject, projects, site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: `Lavoro non trovato — ${site.name}` };
  return {
    title: `${project.title} — ${site.name}`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const meta = [
    { icon: MapPin, label: "Luogo", value: project.location },
    { icon: Calendar, label: "Anno", value: project.year },
    { icon: Clock, label: "Durata", value: project.duration },
    { icon: Ruler, label: "Superficie", value: project.surface },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero header */}
        <header className="relative isolate flex min-h-[60vh] items-end overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/40" />

          <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
            <Link
              href="/#lavori"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Tutti i lavori
            </Link>
            <span className="mt-6 block text-sm font-semibold uppercase tracking-wider text-primary">
              {project.category}
            </span>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
          </div>
        </header>

        {/* Meta bar */}
        <div className="border-b bg-background">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
            {meta.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="px-2">
                  <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="size-4 text-primary" />
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold">{item.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>

        {/* Body */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:gap-16 lg:px-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold tracking-tight">
                L&apos;intervento
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {project.summary}
              </p>
              <div className="mt-6 space-y-4 text-foreground/90">
                {project.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Gallery */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {project.gallery.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} — immagine ${i + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6 border bg-muted/30 p-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Servizi erogati
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {project.services.map((service) => (
                      <li key={service} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span className="text-foreground/90">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-6">
                  <p className="text-sm text-muted-foreground">
                    Hai un intervento simile? Richiedi un sopralluogo e un
                    preventivo gratuito.
                  </p>
                  <Button asChild pulse className="mt-4 w-full">
                    <Link href="/#contatti">
                      Richiedi un preventivo
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Other projects */}
        <section className="border-t bg-muted/30 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight">Altri lavori</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((p) => p.slug !== project.slug)
                .slice(0, 3)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/lavori/${p.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {p.category}
                      </span>
                      <h3 className="mt-1 text-base font-semibold text-white">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
