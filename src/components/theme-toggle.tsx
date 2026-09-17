"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const THEME_EVENT = "themechange";

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/**
 * Flips between the dark and light themes and remembers the choice.
 * The pre paint script in the layout applies the stored value on load, so this
 * reads the live theme from the document rather than holding its own copy.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked. The toggle still works for the session.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      className="text-muted hover:text-foreground inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-2.5 py-1.5 font-mono text-xs transition-colors hover:border-[var(--accent)]"
    >
      <span className="text-accent" aria-hidden="true">
        {theme === "dark" ? "◗" : "◖"}
      </span>
      <span aria-hidden="true">theme: {theme}</span>
    </button>
  );
}
