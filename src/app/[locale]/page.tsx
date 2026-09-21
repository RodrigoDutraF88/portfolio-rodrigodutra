import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { externalLinks, site } from "@/lib/site";
import { AsciiField } from "@/components/ascii-field";
import { LogoMarquee } from "@/components/logo-marquee";
import { Skills } from "@/components/skills";
import { ProjectsGrid } from "@/components/projects-grid";
import { Reveal } from "@/components/reveal";

const revealStyle = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const tAbout = await getTranslations("about");
  const tProjects = await getTranslations("projects");

  return (
    <>
      <section
        id="top"
        className="relative flex min-h-[80vh] w-full flex-col justify-center overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <AsciiField className="size-full opacity-60" />
        </div>

        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6">
          <div
            data-reveal="photo"
            style={revealStyle(0)}
            className="bg-surface mx-auto mb-8 size-64 overflow-hidden rounded-full border border-[var(--border)] shadow-xl"
          >
            <Image
              src="/rodrigo.jpg"
              alt="Rodrigo Dutra"
              width={276}
              height={276}
              priority
              className="size-full object-cover"
            />
          </div>

          <p data-reveal style={revealStyle(590)} className="text-muted font-mono text-sm">
            <span className="text-accent">~/rodrigo</span> $ whoami
          </p>
          <h1
            data-reveal
            style={revealStyle(670)}
            className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Rodrigo Dutra
            <span className="cursor-blink text-accent ml-1 inline-block">▋</span>
          </h1>
          <p data-reveal style={revealStyle(1150)} className="mt-3 text-lg">
            {t("role")}
          </p>
          <p
            data-reveal
            style={revealStyle(1230)}
            className="text-muted mx-auto mt-3 max-w-xl text-base"
          >
            {t("tagline")}
          </p>

          <div
            data-reveal
            style={revealStyle(1510)}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#projects"
              className="bg-accent text-accent-foreground brutal brutal-press rounded-lg px-4 py-2 text-sm font-medium"
            >
              {t("viewProjects")}
            </a>
            <a
              href="#contact"
              className="bg-surface brutal brutal-press rounded-lg px-4 py-2 text-sm font-medium"
            >
              {t("getInTouch")}
            </a>
          </div>

          <div
            data-reveal
            style={revealStyle(1890)}
            className="text-muted mt-8 flex flex-wrap justify-center gap-4 font-mono text-xs"
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
        <Reveal className="mx-auto mb-4 max-w-2xl px-4 sm:px-6">
          <p className="text-muted font-mono text-xs tracking-widest uppercase">
            <span className="text-accent">{"// "}</span>stack
          </p>
        </Reveal>
        <Reveal delay={120}>
          <LogoMarquee />
        </Reveal>
      </section>

      <section id="about" className="border-t border-[var(--border)] py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Reveal>
            <p className="text-muted font-mono text-xs tracking-widest uppercase">
              <span className="text-accent">{"// "}</span>
              {tAbout("label")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <article className="brutal bg-surface mt-5 p-6 sm:p-7">
              <p className="text-xl font-semibold tracking-tight">{tAbout("lead")}</p>
              <p className="text-muted mt-3 leading-relaxed">{tAbout("body")}</p>
              <p className="text-muted mt-3 leading-relaxed">{tAbout("body2")}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs">
                <span
                  className="pill"
                  style={{ "--brand": "var(--accent)" } as React.CSSProperties}
                >
                  @{site.handle}
                </span>
                <span className="pill" style={{ "--brand": "#f59e0b" } as React.CSSProperties}>
                  {tAbout("location")}
                </span>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="projects" className="border-t border-[var(--border)] py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Reveal>
            <p className="text-muted font-mono text-xs tracking-widest uppercase">
              <span className="text-accent">{"// "}</span>
              {tProjects("label")}
            </p>
            <p className="text-muted mt-2 max-w-md text-sm">{tProjects("intro")}</p>
          </Reveal>
          <Reveal delay={80}>
            <ProjectsGrid />
          </Reveal>
        </div>
      </section>

      <Skills />
    </>
  );
}
