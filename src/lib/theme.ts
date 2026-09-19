// Shared theme state. The document's data-theme attribute is the source of truth,
// set before paint by the script in the layout. Both the toggle and the command
// palette read and write through here so there is one owner.
export type Theme = "dark" | "light";

export const THEME_EVENT = "themechange";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can be blocked. The theme still applies for the session.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function toggleTheme(): void {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

export function subscribeTheme(callback: () => void): () => void {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
