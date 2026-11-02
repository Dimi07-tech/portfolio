"use client";

import { useRef, type PointerEvent } from "react";
import { Icon } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { profile } from "@/lib/data";

/** Portrait avec inclinaison 3D + reflet qui suit le pointeur (désactivé au tactile). */
function Portrait({ role }: { role: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    ref.current.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
    ref.current.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    ref.current.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="[perspective:1200px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={ref}
        className="card relative overflow-hidden p-2 shadow-[0_50px_100px_-40px_rgb(var(--accent)/0.5)] transition-transform duration-300 ease-out will-change-transform [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile-1200.webp"
            srcSet="/profile-720.webp 720w, /profile-1200.webp 1200w, /profile-1632.webp 1632w"
            sizes="(min-width: 2400px) 650px, (min-width: 1536px) 560px, (min-width: 1024px) 40vw, (min-width: 640px) 440px, 90vw"
            alt="Dimitri BABALOLA"
            width={1632}
            height={2176}
            decoding="async"
            fetchPriority="high"
            className="h-full w-full animate-portrait object-cover object-[50%_20%]"
          />
          {/* reflet */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--gx,50%)_var(--gy,0%),rgba(255,255,255,0.22),transparent_45%)] mix-blend-soft-light" />
          {/* ligne de scan */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-5 pt-20">
            <p className="font-display text-xl font-semibold text-white">Dimitri BABALOLA</p>
            <p className="font-mono text-xs text-white/75">
              {profile.alias} · {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center"
    >
      <div className="shell grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* texte */}
        <div className="min-w-0">
          <p className="eyebrow animate-fade-up">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {t.hero.badge}
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.4rem,8.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-fg">
            <span className="block animate-fade-up [animation-delay:.08s]">{t.hero.line1}</span>
            <span className="block animate-fade-up bg-gradient-to-r from-accent via-accent to-[#8b5cf6] bg-clip-text pb-1 text-transparent [animation-delay:.16s]">
              {t.hero.line2}
            </span>
          </h1>

          <p className="mt-8 max-w-xl animate-fade-up text-base leading-relaxed sm:text-lg [animation-delay:.24s]">
            {t.hero.intro}{" "}
            <span className="rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[0.95em] font-medium text-fg">
              {profile.alias}
            </span>
            . {t.hero.tagline}
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row [animation-delay:.32s]">
            <a href="#projects" className="btn-primary group">
              {t.hero.ctaProjects}
              <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="btn-ghost">
              {t.hero.ctaContact}
            </a>
          </div>

          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-2 text-sm [animation-delay:.4s]">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
              </span>
              {t.hero.available}
            </span>
            <span className="inline-flex items-center gap-1.5 text-faint">
              <Icon name="pin" size={15} />
              {t.hero.location}
            </span>
          </div>
        </div>

        {/* portrait */}
        <div className="relative mx-auto w-full max-w-[min(440px,100%)] animate-fade-up px-3 [animation-delay:.2s] sm:px-0 lg:max-w-[32.5rem]">
          <Portrait role={t.hero.cardRole} />

          <div className="card absolute left-0 top-8 flex animate-float items-center gap-2.5 px-3.5 py-2.5 shadow-lg backdrop-blur sm:-left-8">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon name="network" size={16} />
            </span>
            <span className="text-xs font-semibold text-fg">{t.hero.cardCcna}</span>
          </div>
          <div className="card absolute bottom-24 right-0 flex animate-float items-center gap-2.5 px-3.5 py-2.5 shadow-lg backdrop-blur [animation-delay:-3s] sm:-right-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber/10 text-cyber">
              <Icon name="award" size={16} />
            </span>
            <span className="text-xs font-semibold text-fg">{t.hero.cardCtf}</span>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="shell mt-16 animate-fade-up [animation-delay:.5s] md:mt-20">
        <dl className="grid grid-cols-1 divide-y hairline rounded-2xl border bg-surface/70 backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0 [&>*]:hairline">
          {t.hero.stats.map((s) => (
            <div key={s.l} className="flex items-baseline gap-4 px-6 py-5 sm:flex-col sm:gap-1">
              <dt className="order-2 text-sm sm:order-none">{s.l}</dt>
              <dd className="order-1 font-display text-3xl font-semibold tracking-tight text-fg sm:order-none">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
