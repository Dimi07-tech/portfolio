"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { profile } from "@/lib/data";

export function Contact() {
  const { lang, t } = useLang();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = lang === "fr" ? `Contact portfolio — ${name}` : `Portfolio contact — ${name}`;
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    setSent(true);
  };

  const contacts = [
    { icon: "mail" as const, label: t.contact.emailLabel, value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: "whatsapp" as const,
      label: t.contact.whatsappLabel,
      value: profile.phone,
      href: profile.whatsapp,
      external: true,
    },
    {
      icon: "linkedin" as const,
      label: t.contact.linkedinLabel,
      value: "in/dimitri-babalola",
      href: profile.linkedin,
      external: true,
    },
    {
      icon: "github" as const,
      label: t.contact.githubLabel,
      value: "Dimi07-tech",
      href: profile.github,
      external: true,
    },
  ];

  return (
    <Section id="contact" kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* form */}
        <form onSubmit={onSubmit} className="card-surface space-y-5 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">{t.contact.formName}</span>
              <input
                name="name"
                required
                placeholder="K0BR4"
                className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-400/60"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">{t.contact.formEmail}</span>
              <input
                name="email"
                type="email"
                required
                placeholder="vous@exemple.com"
                className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-400/60"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">{t.contact.formMessage}</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t.contact.formPlaceholder}
              className="w-full resize-none rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-400/60"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-venom to-cyan-400 px-7 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-venom/20 transition-transform hover:scale-[1.03]"
          >
            {t.contact.formSend} →
          </button>
          {sent && <p className="text-sm text-venom">{t.contact.success}</p>}
        </form>

        {/* direct */}
        <div>
          <h3 className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-slate-400">
            {t.contact.directLabel}
          </h3>
          <div className="space-y-3">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="card-surface flex items-center gap-4 p-4 transition-colors hover:border-venom/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-900 text-cyan-300">
                  <Icon name={c.icon} size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">{c.label}</p>
                  <p className="truncate text-sm font-medium text-white">{c.value}</p>
                </div>
              </a>
            ))}
          </div>

          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-full border border-venom/50 bg-venom/10 px-6 py-3 text-sm font-semibold text-venom transition-all hover:bg-venom hover:text-ink-950"
          >
            <Icon name="whatsapp" size={18} />
            {t.contact.whatsappCta}
          </a>
        </div>
      </div>
    </Section>
  );
}