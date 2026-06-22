import {
  Building2,
  Droplets,
  Hammer,
  PaintRoller,
  ScanSearch,
  ShieldCheck,
  Snowflake,
  SprayCan,
  Wind,
} from "lucide-react";

export const site = {
  name: "VERTIKAL",
  tagline: "Edilizia acrobatica & lavori in quota su fune",
  phone: "+39 02 1234 5678",
  email: "info@vertikal.it",
  address: "Via delle Alpi 24, 20121 Milano (MI)",
};

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Azienda", href: "/#azienda" },
  { label: "Lavori", href: "/#lavori" },
  { label: "Processo", href: "/#processo" },
  { label: "Sicurezza", href: "/#sicurezza" },
  { label: "Contatti", href: "/#contatti" },
];

export const stats = [
  { value: "5.000+", label: "Interventi completati" },
  { value: "15 anni", label: "Zero incidenti" },
  { value: "−60%", label: "Costi vs. ponteggi" },
  { value: "48h", label: "Sopralluogo medio" },
];

export const services = [
  {
    icon: SprayCan,
    title: "Pulizia facciate",
    description:
      "Lavaggio e sanificazione di facciate, vetrate e superfici in quota senza ponteggi né piattaforme.",
  },
  {
    icon: Hammer,
    title: "Ristrutturazioni",
    description:
      "Ripristino di calcestruzzo, intonaci e cornicioni con accesso su fune in totale sicurezza.",
  },
  {
    icon: Droplets,
    title: "Impermeabilizzazioni",
    description:
      "Sigillatura giunti, terrazzi e coperture per eliminare infiltrazioni in modo definitivo.",
  },
  {
    icon: ScanSearch,
    title: "Ispezioni strutturali",
    description:
      "Rilievi fotografici e report tecnici dettagliati su strutture difficili da raggiungere.",
  },
  {
    icon: PaintRoller,
    title: "Tinteggiature",
    description:
      "Verniciatura e protezione di facciate con prodotti certificati e finiture durature.",
  },
  {
    icon: Wind,
    title: "Bonifiche & rimozioni",
    description:
      "Rimozione di elementi pericolanti, vegetazione infestante e bonifica di superfici.",
  },
  {
    icon: Building2,
    title: "Manutenzione edifici",
    description:
      "Contratti di manutenzione programmata per condomini, hotel e immobili commerciali.",
  },
  {
    icon: Snowflake,
    title: "Disgaggio neve & ghiaccio",
    description:
      "Rimozione di accumuli nevosi e formazioni di ghiaccio da tetti e cornicioni.",
  },
  {
    icon: ShieldCheck,
    title: "Linee vita & sicurezza",
    description:
      "Installazione e collaudo di linee vita e ancoraggi a norma per accessi futuri.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Sopralluogo gratuito",
    description:
      "Valutiamo l'intervento sul posto e definiamo ambito, tempi e accessi senza alcun impegno.",
  },
  {
    step: "02",
    title: "Preventivo trasparente",
    description:
      "Ricevi un'offerta chiara e dettagliata, in media più economica del 60% rispetto ai ponteggi.",
  },
  {
    step: "03",
    title: "Intervento su fune",
    description:
      "I nostri tecnici certificati IRATA operano in quota con procedure di sicurezza rigorose.",
  },
  {
    step: "04",
    title: "Report & garanzia",
    description:
      "Consegniamo documentazione fotografica completa e garanzia sui lavori eseguiti.",
  },
];

export const certifications = [
  "IRATA Internazionale",
  "SOA OS6 / OG1",
  "ISO 9001:2015",
  "ISO 45001 Sicurezza",
  "DPI Categoria III",
  "Formazione D.Lgs 81/08",
];

export interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
  location: string;
  year: string;
  duration: string;
  surface: string;
  services: string[];
  summary: string;
  body: string[];
  gallery: string[];
}

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    slug: "torre-uffici-milano",
    title: "Torre uffici — Milano Porta Nuova",
    category: "Pulizia facciate vetrate",
    image: u("1486406146926-c627a92ad1ab"),
    location: "Milano (MI)",
    year: "2024",
    duration: "5 giorni",
    surface: "4.200 m²",
    services: ["Pulizia facciate", "Linee vita & sicurezza"],
    summary:
      "Lavaggio e sanificazione dell'intera facciata vetrata di una torre per uffici di 24 piani, eseguito su fune senza interrompere l'attività degli uffici.",
    body: [
      "La torre presentava forti depositi di smog e calcare sulle vetrate, con un accesso impossibile da terra per via dell'altezza e della pedonalizzazione dell'area. Abbiamo pianificato l'intervento su fune con doppia linea di ancoraggio, operando in fasce orarie concordate per non disturbare gli occupanti.",
      "In cinque giorni lavorativi abbiamo trattato oltre 4.200 m² di superficie vetrata, restituendo trasparenza e uniformità all'involucro. Al termine abbiamo collaudato i punti di ancoraggio per le future manutenzioni programmate.",
    ],
    gallery: [u("1581092160562-40aa08e78837", 800), u("1504307651254-35680f356dfd", 800)],
  },
  {
    slug: "palazzo-storico-torino",
    title: "Palazzo storico — Centro Torino",
    category: "Ripristino cornicioni",
    image: u("1449157291145-7efd050a4d0e"),
    location: "Torino (TO)",
    year: "2023",
    duration: "12 giorni",
    surface: "1.800 m²",
    services: ["Ristrutturazioni", "Bonifiche & rimozioni"],
    summary:
      "Messa in sicurezza e ripristino dei cornicioni e degli elementi decorativi di un palazzo storico vincolato, nel pieno rispetto della facciata originale.",
    body: [
      "Diversi elementi in cotto e stucco mostravano distacchi pericolosi per i pedoni. Intervenendo su fune abbiamo evitato il ponteggio — non autorizzabile sulla via — rimuovendo le parti instabili e consolidando le decorazioni.",
      "Il ripristino ha previsto materiali compatibili con l'edificio storico e una documentazione fotografica completa, fornita alla Soprintendenza a fine lavori.",
    ],
    gallery: [u("1486325212027-8081e485255e", 800), u("1581092160562-40aa08e78837", 800)],
  },
  {
    slug: "residence-genova",
    title: "Residence — Genova",
    category: "Impermeabilizzazione coperture",
    image: u("1487958449943-2429e8be8625"),
    location: "Genova (GE)",
    year: "2024",
    duration: "8 giorni",
    surface: "2.600 m²",
    services: ["Impermeabilizzazioni", "Manutenzione edifici"],
    summary:
      "Risoluzione definitiva delle infiltrazioni su coperture e terrazzi di un complesso residenziale affacciato sul mare.",
    body: [
      "Le infiltrazioni interessavano gli ultimi piani dell'edificio. Abbiamo individuato i punti critici dei giunti e delle coperture e sigillato le superfici con membrane e prodotti adatti all'ambiente marino.",
      "L'accesso su fune ci ha permesso di raggiungere anche le porzioni più esposte senza installare strutture provvisorie, riducendo tempi e costi per il condominio.",
    ],
    gallery: [u("1504307651254-35680f356dfd", 800), u("1486325212027-8081e485255e", 800)],
  },
  {
    slug: "hotel-como",
    title: "Hotel 5 stelle — Como",
    category: "Tinteggiatura facciata",
    image: u("1545324418-cc1a3fa10c00"),
    location: "Como (CO)",
    year: "2023",
    duration: "10 giorni",
    surface: "3.100 m²",
    services: ["Tinteggiature", "Pulizia facciate"],
    summary:
      "Rinnovo completo della facciata di un hotel di lusso, eseguito durante la stagione operativa senza chiudere la struttura.",
    body: [
      "L'hotel non poteva permettersi né la chiusura né l'ingombro di un ponteggio davanti all'ingresso principale. Operando su fune abbiamo lavato, preparato e tinteggiato la facciata in fasce orarie compatibili con gli ospiti.",
      "Sono stati impiegati prodotti certificati ad alta durabilità, con finiture uniformi e protezione contro smog e agenti atmosferici.",
    ],
    gallery: [u("1581092160562-40aa08e78837", 800), u("1486325212027-8081e485255e", 800)],
  },
  {
    slug: "polo-industriale-brescia",
    title: "Polo industriale — Brescia",
    category: "Ispezione strutturale",
    image: u("1503387762-592deb58ef4e"),
    location: "Brescia (BS)",
    year: "2024",
    duration: "3 giorni",
    surface: "—",
    services: ["Ispezioni strutturali", "Linee vita & sicurezza"],
    summary:
      "Ispezione tecnica e rilievo fotografico delle strutture in quota di un capannone industriale, con report dettagliato per la manutenzione.",
    body: [
      "Il committente necessitava di una valutazione dello stato di travi, coperture e ancoraggi difficilmente raggiungibili. Abbiamo eseguito un rilievo ravvicinato su fune, fotografando ogni criticità.",
      "Il report finale ha permesso di pianificare gli interventi di manutenzione prioritari e di mettere a norma i punti di ancoraggio esistenti.",
    ],
    gallery: [u("1504307651254-35680f356dfd", 800), u("1581092160562-40aa08e78837", 800)],
  },
  {
    slug: "centro-commerciale-bergamo",
    title: "Centro commerciale — Bergamo",
    category: "Manutenzione programmata",
    image: u("1460472178825-e5240623afd5"),
    location: "Bergamo (BG)",
    year: "2022 — oggi",
    duration: "Contratto annuale",
    surface: "6.500 m²",
    services: ["Manutenzione edifici", "Pulizia facciate", "Disgaggio neve & ghiaccio"],
    summary:
      "Contratto di manutenzione programmata per un grande centro commerciale: pulizie periodiche, controlli e interventi rapidi su chiamata.",
    body: [
      "Gestiamo la manutenzione in quota dell'intero involucro: pulizia delle vetrate, controllo delle coperture e rimozione di accumuli di neve e ghiaccio nei mesi invernali.",
      "La programmazione degli interventi garantisce continuità all'attività commerciale e tempi di risposta rapidi in caso di necessità.",
    ],
    gallery: [u("1486325212027-8081e485255e", 800), u("1504307651254-35680f356dfd", 800)],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const testimonials = [
  {
    quote:
      "Hanno pulito tutta la facciata del nostro condominio in tre giorni, senza il disagio dei ponteggi. Professionali e puntuali.",
    author: "Marco Bianchi",
    role: "Amministratore di condominio, Milano",
  },
  {
    quote:
      "Il risparmio rispetto al preventivo con ponteggi è stato enorme. Lavoro impeccabile e documentazione fotografica completa.",
    author: "Giulia Ferrari",
    role: "Property Manager, Torino",
  },
  {
    quote:
      "Squadra seria e attenta alla sicurezza. Hanno individuato problemi strutturali che non avremmo mai notato da terra.",
    author: "Andrea Rossi",
    role: "Direttore tecnico, Genova",
  },
];
