"use client";

import { Section } from "@/components/Section";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import { projects } from "@/lib/data";

export function Projects() {
  const { lang, t } = useLang();

  return (
    <Section id="projects" kicker={t.projects.kicker} title={t.projects.title} lead={t.projects.lead}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.name}
            className="card-surface group relative flex flex-col overflow-hidden p-6 transition-all hover:-translate-y-1 hover:border-venom/40 hover:shadow-xl hover:shadow-venom/10"
          >
            {/* top gradient hairline */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-venom to-cyan-400 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="mb-4 flex items-start justify-between gap-3">
              <span className="rounded-full border border-white/10 bg-ink-900 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-cyan-300">
                {p.tag}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white group-hover:text-venom transition-colors">
              {p.name}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{pick(lang, p.desc)}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-white/5 bg-ink-900 px-2 py-1 font-mono text-[10px] text-slate-400"
                >
                  {s}
                </span>
              ))}
            </div>

            {p.links?.github && (
              <a
                href={p.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-venom hover:text-venom-soft"
              >
                {t.projects.github} ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}