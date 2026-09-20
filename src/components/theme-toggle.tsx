"use client";

import { useSyncExternalStore } from "react";
import { getTheme, subscribeTheme, toggleTheme } from "@/lib/theme";

/** Flips between the dark and light themes, reading the live theme from the document. */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "light" as const);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Tema escuro, alternar" : "Tema claro, alternar"}
      className="text-muted hover:text-foreground inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-2.5 py-1.5 font-mono text-xs transition-colors hover:border-[var(--accent)]"
    >
      <span className="text-accent" aria-hidden="true">
        {theme === "dark" ? "◗" : "◖"}
      </span>
      <span aria-hidden="true">theme: {theme}</span>
    </button>
  );
}
