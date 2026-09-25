import { getTranslations } from "next-intl/server";
import { externalLinks, site } from "@/lib/site";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-muted font-mono text-xs">
          © {year} {site.name}
        </p>
        <div className="text-muted flex flex-wrap items-center gap-4 font-mono text-xs">
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#top" className="hover:text-foreground transition-colors">
            {t("backToTop")}
          </a>
        </div>
      </div>
    </footer>
  );
}
