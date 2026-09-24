import { getTranslations } from "next-intl/server";
import { CommandMenu } from "./command-menu";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { resumeHref, sections } from "@/lib/site";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const tA11y = await getTranslations("a11y");

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b border-[var(--border)] backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="font-mono text-sm">
          <span className="text-accent">~</span>/rodrigo
        </a>

        <nav
          aria-label={tA11y("primaryNav")}
          className="text-muted hidden items-center gap-5 text-sm sm:flex"
        >
          {sections.map((id) => (
            <a key={id} href={`#${id}`} className="hover:text-foreground transition-colors">
              {t(id)}
            </a>
          ))}
          <a href={resumeHref} download className="hover:text-foreground transition-colors">
            {t("resume")}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <CommandMenu />
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
