"use client";

import { useEffect, useRef, useState } from "react";
import { heroVideos } from "@/lib/data";

/**
 * Fond de page fixe (reste visible pendant tout le défilement).
 * - Si des vidéos sont déclarées dans `heroVideos` (lib/data.ts), elles tournent en boucle
 *   avec un fondu enchaîné (4K sur grand écran, 1080p sur mobile).
 * - Sinon : réseau animé dessiné en canvas, net à toute résolution (DPR jusqu'à 3 → écrans 4K/Retina).
 */
export function HeroBackdrop() {
  // passe à false si aucune vidéo n'a pu être lue → on revient au réseau animé
  const [videoOk, setVideoOk] = useState(heroVideos.length > 0);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {videoOk ? (
        <>
          <VideoLoop onAllFailed={() => setVideoOk(false)} />
          {/* voile : garde le texte lisible à gauche, laisse respirer la vidéo à droite */}
          <div className="absolute inset-0 bg-bg/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-bg/90 lg:via-bg/65 lg:to-bg/30" />
          <div className="absolute inset-0 opacity-70">
            <NetworkCanvas />
          </div>
        </>
      ) : (
        <>
          <NetworkCanvas />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_25%_45%,rgb(var(--bg)/0.85),rgb(var(--bg)/0.35)_70%)]" />
        </>
      )}
    </div>
  );
}

/* ─────────────── Vidéos ─────────────── */

function VideoLoop({ onAllFailed }: { onAllFailed: () => void }) {
  const [index, setIndex] = useState(0);
  const [hd, setHd] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    // 4K uniquement sur grand écran haute densité et sans mode "économie de données"
    const bigScreen = window.innerWidth * (window.devicePixelRatio || 1) >= 2200;
    setHd(bigScreen && !conn?.saveData);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // vidéo suivante qui n'a pas échoué
  const nextOf = (i: number) => {
    for (let k = 1; k <= heroVideos.length; k++) {
      const j = (i + k) % heroVideos.length;
      if (!failed.has(j)) return j;
    }
    return i;
  };
  const next = nextOf(index);

  useEffect(() => {
    if (failed.size >= heroVideos.length) onAllFailed();
    else if (failed.has(index)) setIndex(nextOf(index));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [failed]);

  useEffect(() => {
    const onVis = () => {
      const el = refs.current[index];
      if (!el) return;
      if (document.hidden) el.pause();
      else el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [index]);

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      if (i === index) {
        el.muted = true; // requis par les règles d'autoplay
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [index, hd]);

  if (hd === null) return null;

  if (reduced) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={heroVideos[0].poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
    );
  }

  return (
    <div className="absolute inset-0">
      {heroVideos.map((v, i) => (
        <video
          key={v.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
          // on ne charge que la vidéo courante et la suivante
          src={i === index || i === next ? (hd ? v.src : v.srcMobile ?? v.src) : undefined}
          poster={v.poster}
          muted
          autoPlay={i === index}
          playsInline
          disablePictureInPicture
          preload={i === index ? "auto" : "metadata"}
          loop={heroVideos.length === 1}
          onEnded={() => setIndex(next)}
          onError={() => setFailed((f) => new Set(f).add(i))}
        />
      ))}
    </div>
  );
}

/* ─────────────── Réseau animé (canvas) ─────────────── */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}
interface Packet {
  a: number;
  b: number;
  t: number;
  speed: number;
}

function readRGB(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).join(",");
}

function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let accent = readRGB("--accent");
    let fg = readRGB("--fg");
    let cyber = readRGB("--cyber");
    const pointer = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;
    let last = performance.now();

    const linkDist = () => Math.min(170, Math.max(110, w / 9));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(150, Math.max(28, (w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 1,
      }));
      packets = [];
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const D = linkDist();
      const D2 = D * D;

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // liens
      ctx.lineWidth = 1;
      const links: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < D2) {
            const o = (1 - Math.sqrt(d2) / D) * 0.35;
            ctx.strokeStyle = `rgba(${accent},${o})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            links.push([i, j]);
          }
        }
        // interaction souris
        const px = a.x - pointer.x;
        const py = a.y - pointer.y;
        const pd = px * px + py * py;
        if (pd < D2 * 1.4) {
          ctx.strokeStyle = `rgba(${accent},${(1 - Math.sqrt(pd) / (D * 1.18)) * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      // nœuds
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${fg},0.35)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // paquets qui circulent sur les liens
      if (packets.length < 14 && links.length && Math.random() < 0.06) {
        const [a, b] = links[(Math.random() * links.length) | 0];
        packets.push({ a, b, t: 0, speed: 0.008 + Math.random() * 0.01 });
      }
      packets = packets.filter((p) => p.t <= 1);
      for (const p of packets) {
        p.t += p.speed * dt;
        const A = nodes[p.a];
        const B = nodes[p.b];
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        const color = p.a % 5 === 0 ? cyber : accent;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
        g.addColorStop(0, `rgba(${color},0.9)`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      if (visible) draw(dt);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const mo = new MutationObserver(() => {
      accent = readRGB("--accent");
      fg = readRGB("--fg");
      cyber = readRGB("--cyber");
      if (reduced) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
