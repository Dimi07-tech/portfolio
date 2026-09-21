"use client";

import { Section } from "@/components/Section";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import { skillGroups } from "@/lib/data";

const groupIcons = ["🌐", "💻", "🛡️"];

export function Skills() {
  const { lang, t } = useLang();

  return (
    <Section id="skills" kicker={t.skills.kicker} title={t.skills.title} lead={t.skills.lead}>
      <div className="grid gap-5 md:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <div key={gi} className="card-surface group p-6 transition-colors hover:border-venom/40">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-900 text-xl">
                {groupIcons[gi]}
              </span>
              <h3 className="text-lg font-semibold text-white">{pick(lang, g.title)}</h3>
            </div>
            <ul className="space-y-2.5">
              {g.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-venom to-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}