"use client";

import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { socials } from "@/lib/data";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/5 bg-ink-950 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo size={30} idSuffix="footer" />
          <div>
            <p className="font-display text-sm font-bold tracking-[0.3em] text-white">K0BR4</p>
            <p className="text-xs text-slate-500">{t.footer.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-venom/60 hover:text-venom"
            >
              <Icon name={s.icon as "github" | "linkedin" | "whatsapp" | "mail"} size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-6xl flex-col items-center justify-between gap-2 border-t border-white/5 px-6 pt-6 text-xs text-slate-600 md:flex-row">
        <p>
          © {new Date().getFullYear()} K0BR4 — {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}