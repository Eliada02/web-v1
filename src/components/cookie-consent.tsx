"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  readCookiePreferences,
  saveCookiePreferences,
  type CookiePreferences,
} from "@/lib/cookies";

type DraftPreferences = Pick<CookiePreferences, "analytics" | "marketing">;

function PreferenceToggle({
  id,
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer gap-3 rounded-lg border border-border p-4 transition-colors",
        disabled ? "cursor-default opacity-80" : "hover:bg-muted/50",
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 size-4 shrink-0 accent-primary"
      />
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>
    </label>
  );
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState<CookiePreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState<DraftPreferences>({
    analytics: false,
    marketing: false,
  });

  const applyPreferences = useCallback(
    (prefs: DraftPreferences) => {
      const next = saveCookiePreferences(prefs);
      setSaved(next);
      setDraft({ analytics: next.analytics, marketing: next.marketing });
      setShowBanner(false);
      setShowSettings(false);
    },
    [],
  );

  useEffect(() => {
    const existing = readCookiePreferences();
    setSaved(existing);
    setShowBanner(!existing);
    if (existing) {
      setDraft({
        analytics: existing.analytics,
        marketing: existing.marketing,
      });
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    const openSettings = () => {
      const existing = readCookiePreferences();
      if (existing) {
        setDraft({
          analytics: existing.analytics,
          marketing: existing.marketing,
        });
      }
      setShowSettings(true);
      setShowBanner(false);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () =>
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  if (!mounted) return null;

  const panelOpen = showBanner || showSettings;

  if (!panelOpen) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-md sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center bg-primary/10 text-primary">
              <Cookie className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2
                id="cookie-consent-title"
                className="text-base font-semibold tracking-tight sm:text-lg"
              >
                {showSettings
                  ? "Preferenze cookie"
                  : "Questo sito utilizza cookie"}
              </h2>
              <p
                id="cookie-consent-desc"
                className="mt-2 text-sm leading-relaxed text-muted-foreground"
              >
                {showSettings ? (
                  "Scegli quali categorie di cookie autorizzare. I cookie necessari sono sempre attivi perché indispensabili al funzionamento del sito."
                ) : (
                  <>
                    Utilizziamo cookie tecnici necessari e, solo con il tuo
                    consenso, eventuali cookie analitici o di marketing. Puoi
                    modificare le preferenze in qualsiasi momento.{" "}
                    <Link
                      href="/privacy#cookie"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Cookie Policy
                    </Link>
                    {" · "}
                    <Link
                      href="/privacy"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </>
                )}
              </p>

              {showSettings && (
                <div className="mt-4 space-y-3">
                  <PreferenceToggle
                    id="cookie-necessary"
                    title="Necessari"
                    description="Memorizzano la tua scelta sui cookie e garantiscono il corretto funzionamento del sito. Non possono essere disattivati."
                    checked
                    disabled
                  />
                  <PreferenceToggle
                    id="cookie-analytics"
                    title="Analitici"
                    description="Ci aiutano a capire come viene utilizzato il sito, in forma aggregata e anonima. Attualmente non sono attivi strumenti di analisi."
                    checked={draft.analytics}
                    onChange={(analytics) =>
                      setDraft((prev) => ({ ...prev, analytics }))
                    }
                  />
                  <PreferenceToggle
                    id="cookie-marketing"
                    title="Marketing"
                    description="Servono a mostrare contenuti promozionali pertinenti. Attualmente non utilizziamo cookie di profilazione."
                    checked={draft.marketing}
                    onChange={(marketing) =>
                      setDraft((prev) => ({ ...prev, marketing }))
                    }
                  />
                </div>
              )}

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {showSettings ? (
                  <>
                    <Button
                      type="button"
                      onClick={() => applyPreferences(draft)}
                      className="sm:flex-1"
                    >
                      Salva preferenze
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (saved) {
                          setShowSettings(false);
                        } else {
                          setShowSettings(false);
                          setShowBanner(true);
                        }
                      }}
                    >
                      Annulla
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      onClick={() =>
                        applyPreferences({
                          analytics: true,
                          marketing: true,
                        })
                      }
                      className="sm:flex-1"
                    >
                      Accetta tutti
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        applyPreferences({
                          analytics: false,
                          marketing: false,
                        })
                      }
                      className="sm:flex-1"
                    >
                      Solo necessari
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowSettings(true)}
                    >
                      Personalizza
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
