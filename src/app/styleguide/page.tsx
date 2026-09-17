import type { Metadata } from "next";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Style Guide",
  description: "Design tokens and primitives for the portfolio.",
};

const colors = [
  { name: "background", varName: "--background" },
  { name: "surface", varName: "--surface" },
  { name: "foreground", varName: "--foreground" },
  { name: "muted", varName: "--muted" },
  { name: "border", varName: "--border" },
  { name: "accent", varName: "--accent" },
];

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[var(--border)] py-10">
      <h2 className="text-muted mb-6 font-mono text-xs tracking-widest uppercase">
        <span className="text-accent">{"// "}</span>
        {label}
      </h2>
      {children}
    </section>
  );
}

export default function StyleGuide() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-muted font-mono text-sm">
            <span className="text-accent">~/portfolio</span> $ cat style-guide
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Style Guide</h1>
          <p className="text-muted mt-2 max-w-md text-sm">
            The tokens and primitives the site is built from. Toggle the theme to check both.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Section label="color">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {colors.map((c) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]"
            >
              <div className="h-16 w-full" style={{ background: `var(${c.varName})` }} />
              <div className="bg-surface px-3 py-2">
                <p className="font-mono text-xs">{c.name}</p>
                <p className="text-muted font-mono text-[11px]">{c.varName}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="type scale">
        <div className="space-y-3">
          <p className="text-4xl font-semibold tracking-tight">Display heading</p>
          <p className="text-2xl font-semibold tracking-tight">Section heading</p>
          <p className="text-lg">Lead paragraph for short intros and standfirsts.</p>
          <p className="text-base">
            Body copy. Plain and readable, set in the sans typeface for long form text.
          </p>
          <p className="text-muted text-sm">Small print and secondary details.</p>
          <p className="font-mono text-sm">
            <span className="text-accent">const</span> mono = &quot;labels, prompts, and code&quot;;
          </p>
        </div>
      </Section>

      <Section label="prompt motif">
        <div className="bg-surface rounded-[var(--radius-card)] border border-[var(--border)] p-5 font-mono text-sm">
          <p>
            <span className="text-accent">rodrigo@portfolio</span>
            <span className="text-muted">:</span>
            <span className="text-muted">~</span> $ whoami
          </p>
          <p className="mt-1">
            engenheiro de software
            <span className="cursor-blink text-accent ml-0.5 inline-block">▋</span>
          </p>
        </div>
      </Section>

      <Section label="buttons">
        <div className="flex flex-wrap gap-3">
          <button className="bg-accent text-accent-foreground rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90">
            Primary action
          </button>
          <button className="text-foreground rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--accent)]">
            Secondary
          </button>
          <button className="text-muted hover:text-foreground rounded-md px-4 py-2 font-mono text-sm transition-colors">
            ghost
          </button>
        </div>
      </Section>

      <Section label="links">
        <p className="text-base">
          A paragraph with an{" "}
          <a
            href="#"
            className="text-accent underline decoration-from-font underline-offset-4 hover:opacity-80"
          >
            inline link
          </a>{" "}
          and a keyboard focusable control. Tab through this page to see focus rings.
        </p>
      </Section>

      <Section label="surface card">
        <article className="bg-surface rounded-[var(--radius-card)] border border-[var(--border)] p-5">
          <p className="text-muted font-mono text-xs">project</p>
          <h3 className="mt-1 text-lg font-semibold">bookshelf-app</h3>
          <p className="text-muted mt-2 text-sm">
            Full stack reading tracker built with Next.js, tRPC, Prisma, and PostgreSQL.
          </p>
        </article>
      </Section>
    </main>
  );
}
