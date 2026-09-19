import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { externalLinks } from "@/lib/site";
import { AsciiField } from "@/components/ascii-field";
import { LogoMarquee } from "@/components/logo-marquee";

const revealStyle = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");

  return (
    <>
      <section
        id="top"
        className="relative flex min-h-[80vh] w-full flex-col justify-center overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <AsciiField className="size-full opacity-60" />
        </div>

        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
          <div
            data-reveal="photo"
            style={revealStyle(0)}
            className="bg-surface mx-auto mb-8 size-44 overflow-hidden rounded-full border border-[var(--border)] shadow-xl"
          >
            <Image
              src="/rodrigo.jpg"
              alt="Rodrigo Dutra"
              width={176}
              height={176}
              priority
              className="size-full object-cover"
            />
          </div>

          <p data-reveal style={revealStyle(90)} className="text-muted font-mono text-sm">
            <span className="text-accent">~/rodrigo</span> $ whoami
          </p>
          <h1
            data-reveal
            style={revealStyle(170)}
            className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Rodrigo Dutra
            <span className="cursor-blink text-accent ml-1 inline-block">▋</span>
          </h1>
          <p data-reveal style={revealStyle(250)} className="mt-3 text-lg">
            {t("role")}
          </p>
          <p data-reveal style={revealStyle(330)} className="text-muted mt-3 max-w-xl text-base">
            {t("tagline")}
          </p>

          <div
            data-reveal
            style={revealStyle(410)}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="bg-accent text-accent-foreground rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            >
              {t("viewProjects")}
            </a>
            <a
              href="#contact"
              className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--accent)]"
            >
              {t("getInTouch")}
            </a>
          </div>

          <div
            data-reveal
            style={revealStyle(490)}
            className="text-muted mt-8 flex flex-wrap gap-4 font-mono text-xs"
          >
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] py-8">
        <div className="mx-auto mb-4 max-w-3xl px-4 sm:px-6">
          <p className="text-muted font-mono text-xs tracking-widest uppercase">
            <span className="text-accent">{"// "}</span>stack
          </p>
        </div>
        <LogoMarquee />
      </section>
    </>
  );
}
