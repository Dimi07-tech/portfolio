"use client";

import { Section } from "@/components/Section";
import { Icon, type IconName } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import { pillars } from "@/lib/data";

const icons: IconName[] = ["network", "shield", "code"];

export function Pillars() {
  const { lang, t } = useLang();

  return (
    <Section kicker={t.pillars.kicker} title={t.pillars.title} lead={t.pillars.lead} className="!pt-8 md:!pt-12">
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((p, i) => (
          <article key={p.code} className="card card-hover group flex flex-col p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon name={icons[i]} size={20} />
              </span>
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
            </div>
            <p className="mt-8 font-mono text-xs font-semibold tracking-[0.25em] text-accent">{p.code}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg">
              {pick(lang, p.title)}
            </h3>
            <p className="mt-3 flex-1 leading-relaxed">{pick(lang, p.desc)}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.keywords.map((k) => (
                <span key={k} className="chip">
                  {k}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
