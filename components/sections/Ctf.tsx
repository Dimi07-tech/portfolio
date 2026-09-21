"use client";

import { Section } from "@/components/Section";
import { useLang } from "@/components/LangProvider";
import { ctfEvent } from "@/lib/data";

export function Ctf() {
  const { t } = useLang();

  return (
    <Section id="ctf" kicker={t.ctf.kicker} title={t.ctf.title} lead={t.ctf.lead}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card-surface overflow-hidden">
          {/* bannière "achievement" — pas de photo d'attestation */}
          <div className="border-b border-white/5 bg-gradient-to-r from-venom/20 via-cyan-400/10 to-transparent px-6 py-8 font-mono">
            <p className="text-xs uppercase tracking-[0.25em] text-venom-soft">[+] achievement_unlocked</p>
            <h3 className="mt-3 text-2xl font-bold text-white">{ctfEvent.name}</h3>
            <p className="mt-1 text-sm text-slate-400">{ctfEvent.sub} — OCOI</p>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-mono text-xs text-slate-400">
                  {ctfEvent.round} · {ctfEvent.date}
                </p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl border border-white/5 bg-ink-900 p-3">
                <dt className="text-xs text-slate-500">Team</dt>
                <dd className="mt-1 font-mono text-sm font-bold text-venom">{ctfEvent.team}</dd>
              </div>
              <div className="rounded-xl border border-white/5 bg-ink-900 p-3">
                <dt className="text-xs text-slate-500">Round</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{ctfEvent.round}</dd>
              </div>
              <div className="rounded-xl border border-white/5 bg-ink-900 p-3">
                <dt className="text-xs text-slate-500">Year</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{ctfEvent.date}</dd>
              </div>
            </dl>
            <p className="mt-3 font-mono text-xs text-venom/90">{t.ctf.certLabel}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div className="card-surface p-6">
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-white">
              <span className="text-venom">◆</span> {t.ctf.nextLabel}
            </h3>
            <p className="text-slate-400">{t.ctf.next}</p>
          </div>

          <div className="card-surface p-6">
            <h3 className="mb-4 font-semibold text-white">TryHackMe · picoCTF · Root-Me</h3>
            <div className="space-y-3">
              {[78, 92, 65].map((w, i) => (
                <div key={i}>
                  <div className="mb-1 flex justify-between text-xs text-slate-400">
                    <span>{["Web Exploitation", "Recon", "Cryptography"][i]}</span>
                    <span>{w}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ink-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-venom to-cyan-400"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="/blog"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-venom hover:text-venom-soft"
          >
            {t.nav.blog} →
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </Section>
  );
}