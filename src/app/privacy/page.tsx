import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.name}`,
  description:
    `Informativa sul trattamento dei dati personali di ${site.name} ai sensi del Regolamento (UE) 2016/679 (GDPR).`,
};

const lastUpdated = "22 giugno 2026";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <header className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 pb-12 pt-32 sm:px-6 lg:px-8">
            <Link
              href="/#home"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Torna alla home
            </Link>
            <span className="mt-6 block text-sm font-semibold uppercase tracking-wider text-primary">
              Informativa
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              Ultimo aggiornamento: {lastUpdated}
            </p>
          </div>
        </header>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="space-y-10 text-foreground/90">
            <p className="text-lg text-muted-foreground">
              La presente informativa descrive le modalità di trattamento dei
              dati personali degli utenti che consultano questo sito web e che
              utilizzano il modulo di contatto, ai sensi del Regolamento (UE)
              2016/679 («GDPR») e del D.Lgs. 196/2003.
            </p>

            <Section title="1. Titolare del trattamento">
              <p>
                Il Titolare del trattamento è {site.name} S.r.l., con sede in{" "}
                {site.address}. Per qualsiasi richiesta relativa al trattamento
                dei dati è possibile scrivere a{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>{" "}
                o telefonare al numero {site.phone}.
              </p>
            </Section>

            <Section title="2. Dati raccolti">
              <p>Trattiamo le seguenti categorie di dati personali:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  <span className="text-foreground">
                    Dati forniti volontariamente
                  </span>{" "}
                  tramite il modulo di contatto: nome e cognome, numero di
                  telefono, indirizzo email e contenuto del messaggio.
                </li>
                <li>
                  <span className="text-foreground">Dati di navigazione</span>{" "}
                  raccolti automaticamente (indirizzo IP, tipo di browser,
                  pagine visitate) per finalità tecniche e statistiche.
                </li>
              </ul>
            </Section>

            <Section title="3. Finalità e base giuridica">
              <p>I dati personali sono trattati per:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  rispondere alle richieste di preventivo e di informazioni
                  (base giuridica: misure precontrattuali su richiesta
                  dell&apos;interessato);
                </li>
                <li>
                  adempiere a obblighi di legge (base giuridica: obbligo
                  legale);
                </li>
                <li>
                  garantire il corretto funzionamento e la sicurezza del sito
                  (base giuridica: legittimo interesse).
                </li>
              </ul>
            </Section>

            <Section title="4. Modalità e conservazione">
              <p>
                Il trattamento avviene con strumenti informatici e con misure di
                sicurezza adeguate a prevenire la perdita, l&apos;uso illecito o
                non autorizzato dei dati. I dati sono conservati per il tempo
                strettamente necessario alle finalità indicate e, in ogni caso,
                non oltre i termini previsti dalla normativa vigente.
              </p>
            </Section>

            <Section title="5. Comunicazione dei dati">
              <p>
                I dati non sono diffusi né ceduti a terzi per finalità
                commerciali. Possono essere comunicati a fornitori di servizi
                tecnici (es. hosting) che operano come responsabili del
                trattamento, nei limiti necessari all&apos;erogazione del
                servizio.
              </p>
            </Section>

            <Section title="6. Diritti dell'interessato">
              <p>
                In qualità di interessato puoi esercitare in ogni momento i
                diritti previsti dagli artt. 15-22 del GDPR: accesso, rettifica,
                cancellazione, limitazione, portabilità e opposizione al
                trattamento. Hai inoltre il diritto di proporre reclamo
                all&apos;Autorità Garante per la protezione dei dati personali.
                Per esercitare i tuoi diritti scrivi a{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
                .
              </p>
            </Section>

            <Section title="7. Cookie" id="cookie">
              <p>
                Questo sito utilizza cookie e tecnologie simili per garantire il
                corretto funzionamento delle pagine e, solo previo consenso,
                per finalità analitiche o di marketing. Al momento non sono
                attivi strumenti di tracciamento di terze parti: le preferenze
                vengono salvate localmente nel browser.
              </p>

              <h3 className="mt-6 text-base font-semibold">
                Categorie di cookie
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  <span className="text-foreground">Necessari</span> — sempre
                  attivi; memorizzano la scelta sui cookie e consentono la
                  navigazione del sito.
                </li>
                <li>
                  <span className="text-foreground">Analitici</span> — opzionali;
                  servono a misurare l&apos;utilizzo del sito in forma aggregata.
                  Attualmente non sono in uso.
                </li>
                <li>
                  <span className="text-foreground">Marketing</span> — opzionali;
                  servono a personalizzare contenuti promozionali. Attualmente
                  non sono in uso.
                </li>
              </ul>

              <h3 className="mt-6 text-base font-semibold">
                Cookie e dati memorizzati
              </h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[32rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-2 pr-4 font-semibold">Nome</th>
                      <th className="py-2 pr-4 font-semibold">Tipo</th>
                      <th className="py-2 pr-4 font-semibold">Durata</th>
                      <th className="py-2 font-semibold">Finalità</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/60">
                      <td className="py-3 pr-4 text-foreground">vk-cookie-consent</td>
                      <td className="py-3 pr-4">Necessario (localStorage)</td>
                      <td className="py-3 pr-4">12 mesi</td>
                      <td className="py-3">
                        Memorizza le preferenze espresse tramite il banner cookie
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="mt-6 text-base font-semibold">
                Gestione del consenso
              </h3>
              <p className="mt-3">
                Al primo accesso viene mostrato un banner che consente di accettare
                tutti i cookie, rifiutare quelli opzionali o personalizzare le
                preferenze. Puoi modificare la scelta in qualsiasi momento
                cliccando su «Gestisci cookie» nel footer del sito oppure
                disabilitando i cookie dalle impostazioni del browser.
              </p>
            </Section>

            <Section title="8. Modifiche all'informativa">
              <p>
                Il Titolare si riserva il diritto di aggiornare la presente
                informativa. Eventuali modifiche saranno pubblicate su questa
                pagina con l&apos;indicazione della data di ultimo aggiornamento.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}
