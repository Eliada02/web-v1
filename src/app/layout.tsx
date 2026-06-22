import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { IntroCleaner } from "@/components/intro-cleaner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VERTIKAL — Lavori in quota su fune | Edilizia acrobatica",
  description:
    "VERTIKAL: interventi in quota su fune senza ponteggi. Pulizia facciate, ristrutturazioni, impermeabilizzazioni e ispezioni strutturali. Oltre 5.000 interventi, zero incidenti in 15 anni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-center" />
        <IntroCleaner />
      </body>
    </html>
  );
}
