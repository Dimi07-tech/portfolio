"use client";

import { Section } from "@/components/Section";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import { certifications } from "@/lib/data";

export function Certifications() {
  const { lang, t } = useLang();

  return (
    <Section
      id="certifications"
      kicker={t.certifications.kicker}
      title={t.certifications.title}
      lead={t.certifications.lead}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {certifications.map((c) => {
          const status = pick(lang, c.status);
          const obtained = status === pick(lang, { fr: "Obtenu", en: "Earned" });
          return (
            <div key={c.title} className="card-surface flex items-start gap-4 p-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-ink-900 text-2xl">
                {c.icon}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{c.org}</p>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className={
                      obtained
                        ? "rounded-full border border-venom/50 bg-venom/10 px-3 py-1 font-mono text-xs text-venom"
                        : "rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 font-mono text-xs text-amber-300"
                    }
                  >
                    {status}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{c.date}</span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="card-surface flex items-start gap-4 border-dashed p-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-ink-900 text-2xl">
            🎯
          </span>
          <div>
            <h3 className="font-semibold text-white">{t.certifications.preparingTitle}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.certifications.preparing.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-ink-900 px-3 py-1 font-mono text-xs text-slate-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}