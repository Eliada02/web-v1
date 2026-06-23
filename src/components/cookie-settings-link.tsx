"use client";

import { openCookieSettings } from "@/lib/cookies";

export function CookieSettingsLink({
  className,
  children = "Gestisci cookie",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={className}
    >
      {children}
    </button>
  );
}
