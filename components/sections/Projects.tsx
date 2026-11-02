"use client";

import { useState } from "react";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import { projects, profile, type Project, type ProjectCategory } from "@/lib/data";
import { cn } from "@/lib/cn";

type Filter = "all" | ProjectCategory;
const filters: Filter[] = ["all", "dev", "network"];

function previewLines(p: Project): string[] {
  if (p.category === "network") {
    return p.name.startsWith("Lab OSPF")
      ? ["R1# show ip ospf neighbor", "2.2.2.2   1  FULL/DR    Gi0/1", "3.3.3.3   1  FULL/BDR   Gi0/2"]
      : ["R1(config)# access-list 110 deny tcp", "  10.0.10.0 0.0.0.255 any eq 23", "R1(config)# ip access-group 110 in"];
  }
  const repo = p.links?.github?.split("/").slice(-1)[0] ?? p.name;
  return [`$ git clone …/${repo}`, `$ cd ${repo}`, `✓ ${p.stack.slice(0, 3).join(" · ")}`];
}

export function Projects() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <Section id="projects" index="01" kicker={t.projects.kicker} title={t.projects.title} lead={t.projects.lead}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" className="inline-flex w-fit rounded-full border hairline bg-surface p-1">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === f ? "bg-fg text-bg" : "text-muted hover:text-fg"
              )}
            >
              {t.projects.filters[f]}
            </button>
          ))}
        </div>
        <p className="w-fit rounded-full border hairline bg-surface/85 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur" aria-live="polite">
          {t.projects.count(shown.length)}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <article key={p.name} className="card card-hover group flex flex-col overflow-hidden">
            <div className="relative border-b hairline bg-[#0b0e14] p-5 font-mono text-[0.71875rem] leading-relaxed">
              <div className="mb-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              {previewLines(p).map((l, i) => (
                <p
                  key={i}
                  className={cn("truncate", i === 0 ? "text-[#9fb4ff]" : l.startsWith("✓") ? "text-[#5ee0a8]" : "text-[#c7cfdb]")}
                >
                  {l}
                </p>
              ))}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">{p.tag}</span>
                {p.category === "network" ? (
                  <Icon name="network" size={16} className="text-faint" />
                ) : (
                  <Icon name="code" size={16} className="text-faint" />
                )}
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-fg">{p.name}</h3>
              <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed">{pick(lang, p.desc)}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t hairline pt-4">
                {p.links?.github ? (
                  <a
                    href={p.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition-colors hover:text-accent"
                  >
                    {t.projects.github}
                    <Icon name="arrow-up-right" size={15} />
                  </a>
                ) : (
                  <span className="text-sm text-faint">{t.projects.lab}</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* projets privés */}
      <div className="card mt-6 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-fg">
            <Icon name="lock" size={19} />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-fg">{t.projects.privateTitle}</h3>
            <p className="mt-1 text-sm">{t.projects.privateText}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
            <Icon name="whatsapp" size={16} /> WhatsApp
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
            <Icon name="github" size={16} /> GitHub
          </a>
        </div>
      </div>
    </Section>
  );
}
