import { getTranslations } from "next-intl/server";
import {
  siTypescript,
  siJavascript,
  siPython,
  siC,
  siGnubash,
  siNextdotjs,
  siReact,
  siNestjs,
  siExpress,
  siNodedotjs,
  siTailwindcss,
  siTrpc,
  siPrisma,
  siPostgresql,
  siMysql,
  siGit,
  siGithubactions,
  siDocker,
  siLinux,
  siTraefikproxy,
  siPrometheus,
  siGrafana,
  type SimpleIcon,
} from "simple-icons";
import { Reveal } from "@/components/reveal";

type Skill = { label: string; icon?: SimpleIcon };

// icon-backed skill (optional label override); text-only skill (no brand icon).
const ic = (icon: SimpleIcon, label?: string): Skill => ({ label: label ?? icon.title, icon });
const txt = (label: string): Skill => ({ label });

// Mirrors the "Competências técnicas" section of the résumé.
const groups: { id: string; items: Skill[] }[] = [
  {
    id: "languages",
    items: [
      ic(siTypescript),
      ic(siJavascript),
      ic(siPython),
      ic(siC),
      txt("C#"),
      txt("SQL"),
      ic(siGnubash, "Bash"),
    ],
  },
  {
    id: "frameworks",
    items: [
      ic(siNextdotjs),
      ic(siReact),
      ic(siNestjs),
      ic(siExpress),
      ic(siNodedotjs),
      ic(siTailwindcss, "Tailwind CSS"),
      ic(siTrpc),
      ic(siPrisma),
      txt("Auth.js"),
    ],
  },
  {
    id: "databases",
    items: [ic(siPostgresql), ic(siMysql)],
  },
  {
    id: "tools",
    items: [
      ic(siGit),
      ic(siGithubactions),
      ic(siDocker),
      ic(siLinux),
      ic(siTraefikproxy, "Traefik"),
      ic(siPrometheus),
      ic(siGrafana),
    ],
  },
];

export async function Skills() {
  const t = await getTranslations("skills");

  return (
    <section className="border-t border-[var(--border)] py-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <p className="text-muted font-mono text-xs tracking-widest uppercase">
            <span className="text-accent">{"// "}</span>
            {t("label")}
          </p>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {groups.map((group, index) => (
            <Reveal key={group.id} delay={index * 90}>
              <article className="brutal bg-surface h-full p-5">
                <h3 className="text-base font-semibold tracking-tight">
                  {t(`groups.${group.id}`)}
                </h3>
                <p className="text-muted mt-1 text-sm leading-relaxed">
                  {t(`context.${group.id}`)}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill.label}
                      className="pill font-mono text-xs"
                      style={
                        {
                          "--brand": skill.icon ? `#${skill.icon.hex}` : "var(--accent)",
                        } as React.CSSProperties
                      }
                    >
                      {skill.icon ? (
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="var(--brand)"
                          aria-hidden="true"
                        >
                          <path d={skill.icon.path} />
                        </svg>
                      ) : null}
                      <span>{skill.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
