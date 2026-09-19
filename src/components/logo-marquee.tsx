import {
  siTypescript,
  siJavascript,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siNestjs,
  siTrpc,
  siPrisma,
  siPostgresql,
  siTailwindcss,
  siDocker,
  siLinux,
  siGit,
  siPython,
  siC,
  type SimpleIcon,
} from "simple-icons";

const stack: SimpleIcon[] = [
  siTypescript,
  siJavascript,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siNestjs,
  siTrpc,
  siPrisma,
  siPostgresql,
  siTailwindcss,
  siDocker,
  siLinux,
  siGit,
  siPython,
  siC,
];

function Logo({ icon }: { icon: SimpleIcon }) {
  return (
    <li
      className="marquee-item text-muted flex shrink-0 items-center gap-2 font-mono text-sm"
      style={{ "--brand": `#${icon.hex}` } as React.CSSProperties}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d={icon.path} />
      </svg>
      <span>{icon.title}</span>
    </li>
  );
}

/** Auto-scrolling strip of the tech stack. The track is duplicated for a seamless loop. */
export function LogoMarquee() {
  return (
    <div className="marquee" aria-label="Stack">
      <ul className="marquee-track">
        {stack.map((icon) => (
          <Logo key={icon.slug} icon={icon} />
        ))}
        {stack.map((icon) => (
          <Logo key={`${icon.slug}-dup`} icon={icon} />
        ))}
      </ul>
    </div>
  );
}
