import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/site";

export function Projects() {
  return (
    <section id="lavori" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Portfolio
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Alcuni dei nostri interventi
          </h2>
          <p className="mt-4 text-muted-foreground">
            Edifici residenziali, uffici, hotel e poli industriali in tutta
            Italia.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 80}>
              <Link
                href={`/lavori/${project.slug}`}
                aria-label={`${project.title} — scopri di più`}
                className="group relative block aspect-[4/5] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <span className="absolute right-4 top-4 flex size-10 translate-y-2 items-center justify-center bg-primary text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="size-5" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <span className="mt-3 flex items-center gap-2 text-sm font-medium text-white/0 transition-colors duration-300 group-hover:text-white">
                    Scopri di più
                    <span className="h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-8" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
