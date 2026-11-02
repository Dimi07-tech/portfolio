"use client";

import { Section } from "@/components/Section";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import { journey } from "@/lib/data";
import { cn } from "@/lib/cn";

export function Journey() {
  const { lang, t } = useLang();

  return (
    <Section id="journey" index="05" kicker={t.journey.kicker} title={t.journey.title}>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="text-lg leading-relaxed">{t.journey.p1}</p>
          <p className="mt-5 leading-relaxed">{t.journey.p2}</p>
          <blockquote className="mt-10 border-l-2 border-accent pl-5 font-display text-xl font-medium leading-snug text-fg md:text-2xl">
            “{t.journey.quote}”
          </blockquote>
        </div>

        <ol className="relative">
          {journey.map((j, i) => {
            const last = i === journey.length - 1;
            return (
              <li key={j.title.en} className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-10 last:pb-0">
                {!last && <span aria-hidden className="absolute left-[1.2rem] top-10 h-[calc(100%-2.5rem)] w-px bg-[rgb(var(--line)/0.15)]" />}
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs font-semibold",
                    last ? "border-dashed hairline text-faint" : "border-accent/30 bg-accent/10 text-accent"
                  )}
                >
                  0{i + 1}
                </span>
                <div className="pt-1.5">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-faint">{pick(lang, j.period)}</p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-fg">{pick(lang, j.title)}</h3>
                  <p className="mt-0.5 text-sm font-medium text-accent">{pick(lang, j.place)}</p>
                  <p className="mt-3 text-sm leading-relaxed">{pick(lang, j.desc)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
