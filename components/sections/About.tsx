"use client";

import { Section } from "@/components/Section";
import { useLang } from "@/components/LangProvider";

export function About() {
  const { t } = useLang();

  return (
    <Section id="about" kicker={t.about.kicker} title={t.about.title}>
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* photo de profil */}
        <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
          <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-venom/10 blur-3xl" />

          <div className="animate-drift rounded-3xl bg-gradient-to-tr from-venom via-cyan-400/40 to-transparent p-[2px]">
            <div className="relative overflow-hidden rounded-3xl bg-ink-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.jpg"
                alt="Portrait de Dimitri BABALOLA"
                className="aspect-square w-full object-cover"
              />

              {/* voile + grille cyber */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-cyan-400/10" />
              <div className="absolute inset-0 opacity-60 mix-blend-overlay [background-image:linear-gradient(rgb(46_222_120/0.14)_1px,transparent_1px),linear-gradient(90deg,rgb(46_222_120/0.14)_1px,transparent_1px)] [background-size:34px_34px]" />

              {/* faisceau de balayage */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-[scan-sweep_6s_linear_infinite] bg-gradient-to-b from-transparent via-venom/20 to-transparent" />

              {/* coins de visée */}
              <span className="absolute -left-1.5 -top-1.5 h-4 w-4 border-l-2 border-t-2 border-venom" />
              <span className="absolute -right-1.5 -top-1.5 h-4 w-4 border-r-2 border-t-2 border-venom" />
              <span className="absolute -bottom-1.5 -left-1.5 h-4 w-4 border-b-2 border-l-2 border-venom" />
              <span className="absolute -bottom-1.5 -right-1.5 h-4 w-4 border-b-2 border-r-2 border-venom" />

              {/* badge vérifié (neutre, sans texte) */}
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-venom/50 bg-ink-950/80 text-venom backdrop-blur">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* texte */}
        <div className="space-y-5 text-slate-300 md:text-lg leading-relaxed">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p className="rounded-2xl border-l-4 border-venom bg-ink-800/60 p-5 font-mono text-[13px] text-slate-200">
            <span className="text-venom">&gt;</span> {t.about.quote}
          </p>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {t.about.values.map((v) => (
              <div key={v.k} className="card-surface p-4">
                <p className="flex items-center gap-2 font-semibold text-venom">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2 4 13h5v9h6v-9h5z" strokeLinejoin="round" />
                  </svg>
                  {v.k}
                </p>
                <p className="mt-1.5 text-sm text-slate-400">{v.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}