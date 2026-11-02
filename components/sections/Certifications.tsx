"use client";

import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import { certifications } from "@/lib/data";
import { cn } from "@/lib/cn";
import type { IconName } from "@/components/Icon";

function iconFor(title: string, earned: boolean): IconName {
  if (title.startsWith("CCNA")) return "network";
  if (title.startsWith("Ethical")) return "shield";
  if (title.startsWith("CyberOps")) return "lock";
  return earned ? "award" : "network";
}

export function Certifications() {
  const { lang, t } = useLang();

  return (
    <Section
      id="certifications"
      index="04"
      kicker={t.certifications.kicker}
      title={t.certifications.title}
      lead={t.certifications.lead}
      className="bg-surface/50"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => {
          const earned = c.status.en === "Earned";
          return (
            <article key={c.title} className="card card-hover flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    c.title.startsWith("CyberCup") ? "bg-cyber/10 text-cyber" : "bg-accent/10 text-accent"
                  )}
                >
                  <Icon name={iconFor(c.title, earned)} size={22} />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.6875rem]",
                    earned ? "bg-ok/10 text-ok" : "bg-accent/10 text-accent"
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", earned ? "bg-ok" : "animate-pulse bg-accent")} />
                  {pick(lang, c.status)}
                </span>
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-fg">{c.title}</h3>
              <p className="mt-1 flex-1 text-sm">{c.org}</p>
              <p className="mt-5 font-mono text-xs text-faint">{c.date}</p>
            </article>
          );
        })}

        <article className="flex flex-col rounded-2xl border border-dashed hairline p-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 text-muted">
            <Icon name="shield" size={22} />
          </span>
          <h3 className="mt-6 font-display text-lg font-semibold text-fg">{t.certifications.preparingTitle}</h3>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["eJPT", "CompTIA Security+", "OSCP"].map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </article>
      </div>
    </Section>
  );
}
