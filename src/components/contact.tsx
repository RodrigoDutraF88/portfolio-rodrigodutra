import { getTranslations } from "next-intl/server";
import { externalLinks, resumeHref, site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="border-t border-[var(--border)] py-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <p className="text-muted font-mono text-xs tracking-widest uppercase">
            <span className="text-accent">{"// "}</span>
            {t("label")}
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">{t("title")}</h2>
          <p className="text-muted mt-3 max-w-md text-sm leading-relaxed">{t("body")}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={resumeHref}
              download
              className="bg-accent text-accent-foreground brutal brutal-press rounded-lg px-4 py-2 text-sm font-medium"
            >
              {t("resume")} ↓
            </a>
            <a
              href={site.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface brutal brutal-press rounded-lg px-4 py-2 text-sm font-medium"
            >
              {t("linktree")} ↗
            </a>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {externalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal brutal-press bg-surface flex items-center justify-between rounded-lg px-4 py-3 font-mono text-sm"
                >
                  <span>{link.label}</span>
                  <span className="text-muted" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-6 flex flex-col gap-2 font-mono text-sm">
            <a
              href={`mailto:${site.email}`}
              className="hover:text-accent inline-flex items-center gap-2 transition-colors"
            >
              <span className="text-accent" aria-hidden="true">
                ✉
              </span>
              <span>{site.email}</span>
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent inline-flex items-center gap-2 transition-colors"
            >
              <span className="text-accent">WhatsApp</span>
              <span>+55 (61) 99997-1502</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
