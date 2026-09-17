export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-24 sm:px-6">
      <p className="text-muted font-mono text-sm">
        <span className="text-accent">~</span> $ whoami
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Rodrigo Dutra
        <span className="cursor-blink text-accent ml-1 inline-block">▋</span>
      </h1>
      <p className="text-muted mt-4 max-w-xl text-lg">
        Engenheiro de software e estudante na UnB. Construo aplicações full stack e gosto de
        sistemas, do navegador ao terminal.
      </p>
      <p className="text-muted mt-10 font-mono text-xs">
        site em construção. veja o{" "}
        <a href="/styleguide" className="text-accent underline underline-offset-4 hover:opacity-80">
          guia de estilo
        </a>
        .
      </p>
    </main>
  );
}
