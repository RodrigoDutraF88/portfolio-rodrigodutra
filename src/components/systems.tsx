import { getTranslations } from "next-intl/server";
import { getGithubStats } from "@/lib/github";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

const cards = ["homelab", "lowlevel"] as const;

export async function Systems() {
  const t = await getTranslations("systems");
  const stats = await getGithubStats();

  return (
    <section id="systems" className="border-t border-[var(--border)] py-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <p className="text-muted font-mono text-xs tracking-widest uppercase">
            <span className="text-accent">{"// "}</span>
            {t("label")}
          </p>
          <p className="text-muted mt-2 max-w-md text-sm">{t("intro")}</p>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {cards.map((id, index) => (
            <Reveal key={id} delay={index * 90}>
              <article className="brutal bg-surface h-full p-5">
                <h3 className="text-base font-semibold tracking-tight">{t(`cards.${id}.title`)}</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">{t(`cards.${id}.body`)}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="brutal bg-surface mt-4 p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-muted font-mono text-xs tracking-widest uppercase">
                <span className="text-accent">{"// "}</span>
                {t("github.label")}
              </p>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-foreground font-mono text-xs transition-colors"
              >
                {t("github.profile")} ↗
              </a>
            </div>

            {stats ? (
              <>
                <div className="mt-4 flex gap-8">
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">{stats.publicRepos}</p>
                    <p className="text-muted font-mono text-xs">{t("github.repos")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">{stats.totalStars}</p>
                    <p className="text-muted font-mono text-xs">{t("github.stars")}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {stats.topRepos.map((repo) => (
                    <li key={repo.name}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 rounded-md border border-[var(--border)] px-3 py-2 transition-colors hover:border-[var(--accent)]"
                      >
                        <span className="min-w-0">
                          <span className="font-mono text-sm">{repo.name}</span>
                          {repo.description ? (
                            <span className="text-muted mt-0.5 block truncate text-xs">
                              {repo.description}
                            </span>
                          ) : null}
                        </span>
                        <span className="text-muted flex shrink-0 items-center gap-3 font-mono text-xs">
                          {repo.language ? <span>{repo.language}</span> : null}
                          <span>★ {repo.stars}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-muted mt-4 text-sm">{t("github.unavailable")}</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
