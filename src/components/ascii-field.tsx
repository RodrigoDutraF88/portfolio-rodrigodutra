"use client";

// A procedural ASCII field that reacts to the cursor. Inspired by the AsciiHero
// in performative-ui by vorpus (MIT), rebuilt compactly for this codebase.
import { useEffect, useRef } from "react";

const RAMP = " .:-=+*#%@";

export function AsciiField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const cell = 14;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let t = 0;
    let raf = 0;
    let last = 0;
    const mouse = { x: -9999, y: -9999 };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        muted: cs.getPropertyValue("--muted").trim() || "#98a2b3",
        accent: cs.getPropertyValue("--accent").trim() || "#58a6ff",
      };
    };
    let colors = readColors();

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '12px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textBaseline = "top";
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const rect = canvas.getBoundingClientRect();
      const mx = (mouse.x - rect.left) / cell;
      const my = (mouse.y - rect.top) / cell;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let v =
            Math.sin(x * 0.25 + t * 0.9) +
            Math.cos(y * 0.32 - t * 0.7) +
            Math.sin((x + y) * 0.18 + t * 0.5);
          v = (v + 3) / 6;
          const dx = x - mx;
          const dy = y - my;
          const spot = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 10);
          v = Math.min(1, v + spot * 0.85);
          const ch = RAMP[Math.floor(v * (RAMP.length - 1))] ?? " ";
          if (ch === " ") continue;
          ctx.fillStyle = spot > 0.15 ? colors.accent : colors.muted;
          ctx.globalAlpha = Math.min(0.8, 0.12 + v * 0.22 + spot * 0.55);
          ctx.fillText(ch, x * cell, y * cell);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (ts: number) => {
      raf = requestAnimationFrame(loop);
      if (ts - last < 55) return;
      last = ts;
      t += 0.06;
      draw();
    };

    const onMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    const onTheme = () => {
      colors = readColors();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("themechange", onTheme);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
