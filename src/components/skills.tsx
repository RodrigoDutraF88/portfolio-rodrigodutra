import { getTranslations } from "next-intl/server";
import {
  siTypescript,
  siJavascript,
  siPython,
  siC,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siNodedotjs,
  siNestjs,
  siTrpc,
  siPrisma,
  siPostgresql,
  siLinux,
  siDocker,
  siGit,
  type SimpleIcon,
} from "simple-icons";
import { Reveal } from "@/components/reveal";

// Grouped so the badges read as context, not a wall of logos. Icon names carry
// the labels; the group id keys the translated heading and its one line.
const groups: { id: string; items: SimpleIcon[] }[] = [
  { id: "languages", items: [siTypescript, siJavascript, siPython, siC] },
  { id: "frontend", items: [siReact, siNextdotjs, siTailwindcss] },
  { id: "backend", items: [siNodedotjs, siNestjs, siTrpc, siPrisma, siPostgresql] },
  { id: "systems", items: [siLinux, siDocker, siGit] },
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
                  {group.items.map((icon) => (
                    <li
                      key={icon.slug}
                      className="pill font-mono text-xs"
                      style={{ "--brand": `#${icon.hex}` } as React.CSSProperties}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="var(--brand)"
                        aria-hidden="true"
                      >
                        <path d={icon.path} />
                      </svg>
                      <span>{icon.title}</span>
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
