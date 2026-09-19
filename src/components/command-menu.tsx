"use client";

import { useCallback, useEffect, useState } from "react";
import { Command } from "cmdk";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { externalLinks, sections } from "@/lib/site";
import { toggleTheme } from "@/lib/theme";

const localeNames: Record<string, string> = {
  pt: "Português",
  en: "English",
  it: "Italiano",
};

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("palette");
  const tNav = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const runCommand = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("trigger")}
        className="text-muted hover:text-foreground inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-1.5 font-mono text-xs transition-colors hover:border-[var(--accent)]"
      >
        <span aria-hidden="true" className="text-accent">
          ⌘
        </span>
        <span aria-hidden="true">K</span>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={t("trigger")}
        className="bg-background overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] shadow-2xl"
      >
        <Command.Input
          placeholder={t("placeholder")}
          className="text-foreground placeholder:text-muted w-full border-b border-[var(--border)] bg-transparent px-4 py-3 text-sm outline-none"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="text-muted px-2 py-6 text-center text-sm">
            {t("empty")}
          </Command.Empty>

          <Command.Group
            heading={t("navigate")}
            className="text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase"
          >
            <Item onSelect={() => runCommand(() => router.push("/"))}>{t("home")}</Item>
            {sections.map((id) => (
              <Item key={id} onSelect={() => runCommand(() => router.push(`/#${id}`))}>
                {tNav(id)}
              </Item>
            ))}
            <Item onSelect={() => runCommand(() => router.push("/styleguide"))}>
              {t("styleGuide")}
            </Item>
          </Command.Group>

          <Command.Group
            heading={t("language")}
            className="text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase"
          >
            {routing.locales.map((locale) => (
              <Item
                key={locale}
                onSelect={() => runCommand(() => router.replace(pathname, { locale }))}
              >
                {localeNames[locale]}
                {locale === activeLocale ? <span className="text-accent"> ·</span> : null}
              </Item>
            ))}
          </Command.Group>

          <Command.Group
            heading={t("theme")}
            className="text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase"
          >
            <Item onSelect={() => runCommand(toggleTheme)}>{t("toggleTheme")}</Item>
          </Command.Group>

          <Command.Group
            heading={t("links")}
            className="text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase"
          >
            {externalLinks.map((link) => (
              <Item
                key={link.href}
                onSelect={() =>
                  runCommand(() => window.open(link.href, "_blank", "noopener,noreferrer"))
                }
              >
                {link.label}
              </Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}

function Item({ children, onSelect }: { children: React.ReactNode; onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="text-foreground flex items-center rounded-md px-2 py-2 text-sm"
    >
      {children}
    </Command.Item>
  );
}
