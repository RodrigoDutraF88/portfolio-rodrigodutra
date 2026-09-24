"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const names: Record<string, string> = {
  pt: "Português",
  en: "English",
  it: "Italiano",
};

/** Switches locale while staying on the current page. */
export function LocaleSwitcher() {
  const active = useLocale();
  const pathname = usePathname();
  const t = useTranslations("palette");

  return (
    <nav aria-label={t("language")} className="flex items-center gap-1 font-mono text-xs">
      {routing.locales.map((locale) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            aria-label={names[locale]}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "rounded px-1.5 py-1 uppercase transition-colors",
              isActive ? "text-accent" : "text-muted hover:text-foreground",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
