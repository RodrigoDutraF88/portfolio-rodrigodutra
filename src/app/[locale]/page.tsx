import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-24 sm:px-6">
      {/* Reserved space for a profile photo. Day 4 swaps this for next/image with the real photo. */}
      <div
        aria-label="Foto de Rodrigo Dutra"
        className="bg-surface text-muted mb-8 flex size-24 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] font-mono text-xs"
      >
        foto
      </div>
      <p className="text-muted font-mono text-sm">
        <span className="text-accent">~</span> $ whoami
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Rodrigo Dutra
        <span className="cursor-blink text-accent ml-1 inline-block">▋</span>
      </h1>
      <p className="text-muted mt-4 max-w-xl text-lg">{t("intro")}</p>
      <p className="text-muted mt-10 font-mono text-xs">
        {t.rich("construction", {
          link: (chunks) => (
            <Link
              href="/styleguide"
              className="text-accent underline underline-offset-4 hover:opacity-80"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </main>
  );
}
