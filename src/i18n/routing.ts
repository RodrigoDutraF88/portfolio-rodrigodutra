import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "it"],
  defaultLocale: "pt",
  // Every locale is prefixed, so / redirects to /pt. Keeps hreflang simple.
  localePrefix: "always",
  // Always land on Portuguese; do not negotiate from the Accept-Language header.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
