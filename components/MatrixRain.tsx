"use client";

import { useEffect, useRef } from "react";

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF#$%&*+=";

export function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    const fontSize = 14;
    let drops: number[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const cols = Math.max(32, Math.floor(w / fontSize));
      drops = Array.from({ length: cols }, () => -Math.random() * (h / fontSize));
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 55) return;
      last = t;
      ctx.fillStyle = "rgba(5, 10, 8, 0.12)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.97 ? "rgba(46,222,120,0.85)" : "rgba(46,222,120,0.32)";
        ctx.fillText(char, x, y);
        if (y > h && Math.random() > 0.96) drops[i] = 0;
        drops[i]++;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-25"
    />
  );
}