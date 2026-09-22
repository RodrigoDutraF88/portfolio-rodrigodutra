"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  projects,
  projectCategories,
  repoUrl,
  type ProjectCategory,
} from "@/lib/projects";
import { cn } from "@/lib/cn";

type Filter = "all" | ProjectCategory;

const filters: Filter[] = ["all", ...projectCategories];

export function ProjectsGrid() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<Filter>("all");

  const shown =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Keep the two desktop columns independent.
  // This means expanding a card only moves the cards
  // below it in the same column.
  const leftColumn = shown.filter((_, index) => index % 2 === 0);
  const rightColumn = shown.filter((_, index) => index % 2 === 1);

  const renderProject = (project: (typeof projects)[number]) => {
    const url = repoUrl(project);

    return (
      <li key={project.slug} className="project-card group">
        <article className="project-card__inner brutal bg-surface overflow-hidden">
          {/* Main card */}
          <div className="flex h-[260px] flex-col p-5">
            <div className="flex items-center justify-between gap-2 font-mono text-xs">
              <span className="text-muted tracking-widest uppercase">
                {t(`filters.${project.category}`)}
              </span>

              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent transition-colors hover:text-foreground"
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
                className="transition-colors hover:text-accent"
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
          </div>

          {/* Floating image preview */}
          <div
            aria-hidden="true"
            className={cn(
              "grid grid-rows-[0fr] opacity-0",
              "transition-[grid-template-rows,opacity,margin-top]",
              "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover:mt-5 group-hover:grid-rows-[1fr] group-hover:opacity-100",
              "group-focus-within:mt-5 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="px-2 pb-2">
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className={cn(
                    "block aspect-video w-full rounded-lg",
                    "border border-[var(--border)]",
                    "object-cover shadow-lg",
                    "scale-[0.97] opacity-0",
                    "transition-[transform,opacity]",
                    "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "group-hover:scale-100 group-hover:opacity-100",
                    "group-focus-within:scale-100 group-focus-within:opacity-100",
                  )}
                />
              </div>
            </div>
          </div>
        </article>
      </li>
    );
  };

  return (
    <div>
      {/* Filters */}
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

      {/* Mobile */}
      <ul className="mt-5 flex flex-col gap-4 sm:hidden">
        {shown.map(renderProject)}
      </ul>

      {/* Desktop */}
      <div className="mt-5 hidden gap-4 sm:grid sm:grid-cols-2 sm:items-start">
        {/* Left column */}
        <ul className="flex min-w-0 flex-col gap-4">
          {leftColumn.map(renderProject)}
        </ul>

        {/* Right column */}
        <ul className="flex min-w-0 flex-col gap-4">
          {rightColumn.map(renderProject)}
        </ul>
      </div>
    </div>
  );
}