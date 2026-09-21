import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { projects, repoUrl } from "@/lib/projects";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.name } : {};
}

export default async function ProjectDetail({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const url = repoUrl(project);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <Link
        href="/#projects"
        className="text-muted hover:text-foreground font-mono text-xs transition-colors"
      >
        ← {t("back")}
      </Link>

      <header className="mt-6">
        <p className="text-muted font-mono text-xs tracking-widest uppercase">
          <span className="text-accent">{"// "}</span>
          {t(`filters.${project.category}`)}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
        <p className="text-muted mt-3 text-lg">{t(`items.${project.slug}.description`)}</p>
      </header>

      <article className="brutal bg-surface mt-8 p-6 sm:p-7">
        <h2 className="text-muted font-mono text-xs tracking-widest uppercase">
          <span className="text-accent">{"// "}</span>
          {t("overviewLabel")}
        </h2>
        <p className="mt-3 leading-relaxed">{t(`items.${project.slug}.overview`)}</p>
      </article>

      <section className="mt-8">
        <h2 className="text-muted font-mono text-xs tracking-widest uppercase">
          <span className="text-accent">{"// "}</span>
          {t("stackLabel")}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="text-muted rounded border border-[var(--border)] px-2 py-0.5 font-mono text-xs"
            >
              {tag}
            </li>
          ))}
        </ul>
      </section>

      {url && (
        <div className="mt-8">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-accent-foreground brutal brutal-press inline-block rounded-lg px-4 py-2 text-sm font-medium"
          >
            {t("viewCode")} ↗
          </a>
        </div>
      )}
    </main>
  );
}
