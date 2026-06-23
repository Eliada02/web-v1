import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/cookie-consent";
import { IntroCleaner } from "@/components/intro-cleaner";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Lavori in quota su fune | Edilizia acrobatica`,
  description: `${site.name}: interventi in quota su fune senza ponteggi. Pulizia facciate, ristrutturazioni, impermeabilizzazioni e ispezioni strutturali. Oltre 5.000 interventi, zero incidenti in 15 anni.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip">
        {children}
        <Toaster richColors position="top-center" />
        <CookieConsent />
        <IntroCleaner />
      </body>
    </html>
  );
}
