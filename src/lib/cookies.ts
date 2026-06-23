export const COOKIE_CONSENT_KEY = "vk-cookie-consent";
export const COOKIE_CONSENT_VERSION = 1;
export const OPEN_COOKIE_SETTINGS_EVENT = "vk:open-cookie-settings";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: number;
  updatedAt: string;
};

export const defaultPreferences = (): CookiePreferences => ({
  necessary: true,
  analytics: false,
  marketing: false,
  version: COOKIE_CONSENT_VERSION,
  updatedAt: new Date().toISOString(),
});

export function readCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CookiePreferences;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;

    return {
      ...parsed,
      necessary: true,
    };
  } catch {
    return null;
  }
}

export function saveCookiePreferences(
  prefs: Omit<CookiePreferences, "necessary" | "version" | "updatedAt">,
): CookiePreferences {
  const saved: CookiePreferences = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    version: COOKIE_CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(saved));
  window.dispatchEvent(
    new CustomEvent("cookie-consent-updated", { detail: saved }),
  );

  return saved;
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}
