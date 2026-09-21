"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useLang } from "@/components/LangProvider";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/cn";

const sectionIds = ["about", "skills", "projects", "ctf", "certifications", "contact"] as const;

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink-950/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-3 text-white">
          <Logo size={30} idSuffix="nav" />
          <span className="font-display text-sm font-bold tracking-[0.3em] text-white">
            K0BR4<span className="text-venom">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {t.nav[id]}
            </a>
          ))}
          <Link href="/blog" className="text-sm text-slate-400 transition-colors hover:text-white">
            {t.nav.blog}
          </Link>
        </div>

<div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center rounded-full border border-white/10 bg-ink-800/80 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLang("fr")}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors",
                  lang === "fr" ? "bg-venom/15 text-venom" : "text-slate-500 hover:text-white"
                )}
                aria-label="Français"
              >
                FR
              </button>
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors",
                  lang === "en" ? "bg-venom/15 text-venom" : "text-slate-500 hover:text-white"
                )}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
              aria-pressed={theme === "light"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-venom/50 hover:text-venom"
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              )}
            </button>

            <a
              href="/cv/K0BR4-CV-fr.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-venom/50 bg-venom/10 px-4 py-2 text-sm font-semibold text-venom transition-all hover:bg-venom hover:text-ink-950"
            >
              {t.nav.cv} ↓
            </a>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-ink-900/95 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {sectionIds.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {t.nav[id]}
              </a>
            ))}
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {t.nav.blog}
            </Link>
            <a
              href="/cv/K0BR4-CV-fr.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-lg border border-venom/50 bg-venom/10 px-3 py-2 text-sm font-semibold text-venom"
            >
              {t.nav.cv} ↓
            </a>
          </div>
        </div>
      )}
    </header>
  );
}