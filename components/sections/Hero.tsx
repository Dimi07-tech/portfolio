"use client";

import { useLang } from "@/components/LangProvider";
import { Terminal } from "@/components/Terminal";

const codeBackdrop = [
  "nmap -sV 192.168.1.0/24",
  "sudo nmap -sS -p- target",
  "hydra -l admin -P rockyou.txt ssh",
  "0x7f 0x45 0x4c 0x46  ELF x86-64",
  "[+] port 22/tcp open ssh",
  "GET /index.php?id=1 HTTP/1.1",
  "tcpdump -i eth0 'port 80'",
];

export function Hero() {
  const { t, lang } = useLang();

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* backdrop : grille + lueurs animées */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 animate-drift rounded-full bg-venom/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 animate-drift rounded-full bg-cyan-500/10 blur-3xl [animation-delay:3s]" />
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 animate-drift rounded-full bg-venom/5 blur-3xl [animation-delay:6s]" />

      {/* balayage lumineux sur tout le hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 animate-[scan-sweep_9s_linear_infinite] bg-gradient-to-b from-transparent via-venom/10 to-transparent"
      />

      {/* backdrop : code hacker (desktop uniquement) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-28 hidden select-none font-mono text-[11px] leading-relaxed text-venom/15 xl:block"
      >
        {codeBackdrop.slice(0, 4).map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-16 left-6 hidden select-none font-mono text-[11px] leading-relaxed text-cyan-400/10 xl:block"
      >
        {codeBackdrop.slice(4).map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr]">
        {/* left */}
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-venom/40 bg-venom/10 px-4 py-1.5 font-mono text-xs tracking-widest text-venom">
            <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-venom" />
            {t.hero.badge}
          </p>

          <h1 className="text-gradient font-display text-6xl font-bold leading-none tracking-tight md:text-8xl">
            {t.hero.name}
          </h1>

          <p className="mt-4 font-mono text-lg text-slate-300 md:text-xl">
            {t.hero.role}
            <span className="animate-blink text-venom">▊</span>
          </p>

          <p className="mt-2 max-w-xl text-slate-400">{t.hero.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-venom to-cyan-400 px-7 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-venom/20 transition-transform hover:scale-[1.03]"
            >
              {t.hero.ctaProjects} →
            </a>
            <a
              href="/cv/K0BR4-CV-fr.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-venom/60 hover:text-venom"
            >
              {t.hero.ctaCv} ↓
            </a>
          </div>

          {/* stats */}
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            {[
              { v: t.hero.statTools, l: t.hero.statToolsLabel },
              { v: t.hero.statProjects, l: t.hero.statProjectsLabel },
              { v: t.hero.statCtf, l: t.hero.statCtfLabel },
            ].map((s) => (
              <div key={s.l} className="card-surface p-4">
                <dt className="flex items-center gap-2 text-2xl font-bold text-white">
                  <span className="text-gradient">{s.v}</span>
                </dt>
                <dd className="mt-1 text-xs leading-snug text-slate-400">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* right : terminal de jeu */}
        <div className="relative animate-fade-up [animation-delay:150ms]">
          {/* halo derrière le terminal */}
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-venom/10 blur-3xl" />
          <Terminal key={lang} />
        </div>
      </div>
    </section>
  );
}