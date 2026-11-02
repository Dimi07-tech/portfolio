"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/cn";

const links = ["projects", "expertise", "blog", "certifications", "journey"] as const;

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const langToggle = (
    <button
      onClick={() => setLang(lang === "fr" ? "en" : "fr")}
      className="inline-flex h-10 items-center rounded-full border hairline px-3 font-mono text-xs font-semibold text-muted transition-colors hover:text-fg"
      aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
    >
      {lang === "fr" ? "EN" : "FR"}
    </button>
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-fg"
      >
        {t.skip}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled || open ? "hairline bg-bg/80 backdrop-blur-xl" : "border-transparent"
        )}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4 md:h-20">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <Logo size={32} />
            <span className="font-display text-[0.9375rem] font-semibold tracking-tight text-fg">
              K0BR4<span className="text-accent">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((id) => (
              <a
                key={id}
                href={`/#${id}`}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {t.nav[id]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">{langToggle}</div>
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? t.nav.themeLight : t.nav.themeDark}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border hairline text-muted transition-colors hover:text-fg"
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
            </button>
            <a href="/#contact" className="btn-primary hidden !py-2.5 md:inline-flex">
              {t.nav.contact}
            </a>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border hairline text-fg lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={t.nav.menu}
              aria-expanded={open}
            >
              <Icon name={open ? "close" : "menu"} size={18} />
            </button>
          </div>
        </nav>

        {open && (
          <div className="h-[calc(100dvh-4rem)] overflow-y-auto border-t hairline bg-bg lg:hidden">
            <div className="shell flex flex-col gap-1 py-6">
              {links.map((id, i) => (
                <a
                  key={id}
                  href={`/#${id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b hairline py-4 font-display text-2xl font-semibold text-fg"
                >
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  {t.nav[id]}
                </a>
              ))}
              <div className="mt-6 flex items-center gap-3">
                <a href="/#contact" onClick={() => setOpen(false)} className="btn-primary flex-1">
                  {t.nav.contact}
                </a>
                {langToggle}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
