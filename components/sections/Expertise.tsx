"use client";

import { Section } from "@/components/Section";
import { Icon, type IconName } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import { skillGroups, method } from "@/lib/data";

const icons: IconName[] = ["network", "code", "shield"];

export function Expertise() {
  const { lang, t } = useLang();

  return (
    <Section
      id="expertise"
      index="02"
      kicker={t.expertise.kicker}
      title={t.expertise.title}
      lead={t.expertise.lead}
      className="bg-surface/50"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {skillGroups.map((g, i) => (
          <div key={g.title.en} className="card p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon name={icons[i]} size={18} />
              </span>
              <h3 className="font-display text-lg font-semibold text-fg">{pick(lang, g.title)}</h3>
            </div>
            <ul className="mt-6 space-y-3">
              {g.items.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="mb-6 mt-16 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-faint">
        {t.expertise.methodTitle}
      </h3>
      <ol className="grid gap-px overflow-hidden rounded-2xl border hairline bg-[rgb(var(--line)/var(--line-a))] sm:grid-cols-2 lg:grid-cols-4">
        {method.map((m, i) => (
          <li key={m.title.en} className="bg-surface p-6">
            <span className="font-mono text-xs text-accent">0{i + 1}</span>
            <p className="mt-3 font-display text-lg font-semibold text-fg">{pick(lang, m.title)}</p>
            <p className="mt-1 text-sm">{pick(lang, m.desc)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
