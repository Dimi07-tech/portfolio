"use client";

import { useState, type FormEvent } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { profile } from "@/lib/data";

export function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") || "");
    const email = String(d.get("email") || "");
    const subject = String(d.get("subject") || "") || `Portfolio — ${name}`;
    const body = `${String(d.get("message") || "")}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const channels: { icon: IconName; label: string; value: string; href: string; external?: boolean }[] = [
    { icon: "mail", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: "whatsapp", label: "WhatsApp", value: profile.phone, href: profile.whatsapp, external: true },
    { icon: "linkedin", label: "LinkedIn", value: "in/dimitri-babalola", href: profile.linkedin, external: true },
    { icon: "github", label: "GitHub", value: "Dimi07-tech", href: profile.github, external: true },
  ];

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-28">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[28px] border hairline bg-surface p-6 sm:p-10 lg:p-14">
          <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-[100px]" />

          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-4">
                <span className="text-faint">06</span>
                <span className="h-px w-6 bg-accent/50" />
                {t.contact.kicker}
              </p>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">{t.contact.title}</h2>
              <p className="mt-4 text-lg leading-relaxed">{t.contact.lead}</p>

              <ul className="mt-10 space-y-2">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-xl p-2 -mx-2 transition-colors hover:bg-surface-2"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border hairline bg-bg text-fg">
                        <Icon name={c.icon} size={17} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-faint">{c.label}</span>
                        <span className="block truncate text-sm font-medium text-fg">{c.value}</span>
                      </span>
                      <Icon name="arrow-up-right" size={16} className="text-faint transition-colors group-hover:text-accent" />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                <a href="/cv/K0BR4-CV-fr.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
                  <Icon name="download" size={16} /> {t.contact.cvFr}
                </a>
                <a href="/cv/K0BR4-CV-en.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
                  <Icon name="download" size={16} /> {t.contact.cvEn}
                </a>
              </div>
            </div>

            <form onSubmit={onSubmit} className="rounded-2xl border hairline bg-bg/60 p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-fg">{t.contact.name}</span>
                  <input name="name" required autoComplete="name" className="field" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-fg">{t.contact.email}</span>
                  <input name="email" type="email" required autoComplete="email" className="field" />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm font-medium text-fg">{t.contact.subject}</span>
                <input name="subject" className="field" />
              </label>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm font-medium text-fg">{t.contact.message}</span>
                <textarea name="message" required rows={6} placeholder={t.contact.placeholder} className="field resize-none" />
              </label>
              <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
                {t.contact.send}
                <Icon name="arrow-right" size={16} />
              </button>
              {sent && (
                <p className="mt-4 text-sm text-ok" role="status">
                  {t.contact.success}
                </p>
              )}
              <p className="mt-5 text-xs text-faint">{t.contact.privacy}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
