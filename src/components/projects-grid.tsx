"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects, projectCategories, repoUrl, type ProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/cn";

type Filter = "all" | ProjectCategory;

const filters: Filter[] = ["all", ...projectCategories];

export function ProjectsGrid() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<Filter>("all");

  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div
        role="group"
        aria-label={t("filterLabel")}
        className="flex flex-wrap gap-2 font-mono text-xs"
      >
        {filters.map((value) => {
          const active = value === filter;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(value)}
              className={cn(
                "brutal brutal-press rounded-lg px-3 py-1.5",
                active
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface text-muted hover:text-foreground",
              )}
            >
              {t(`filters.${value}`)}
            </button>
          );
        })}
      </div>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {shown.map((project) => {
          const url = repoUrl(project);
          return (
            <li key={project.slug} className="project-card group">
              <article className="project-card__inner flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-2 font-mono text-xs">
                  <span className="text-muted tracking-widest uppercase">
                    {t(`filters.${project.category}`)}
                  </span>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-foreground transition-colors"
                    >
                      {t("viewCode")} ↗
                    </a>
                  ) : (
                    <span className="text-muted">{t("private")}</span>
                  )}
                </div>

                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">
                  {t(`items.${project.slug}.description`)}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-muted rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[11px]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>

              {/* Grown from the card's bottom edge on hover or focus. Decorative. */}
              <div className="project-card__preview" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt="" loading="lazy" className="project-card__img" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
