"use client";

import { Logo } from "@/components/Logo";
import { Icon, type IconName } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { socials } from "@/lib/data";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t hairline">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <p className="text-sm">
            © {new Date().getFullYear()} Dimitri BABALOLA — {t.footer.rights}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.icon === "mail" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border hairline text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Icon name={s.icon as IconName} size={16} />
            </a>
          ))}
          <a
            href="#top"
            className="ml-2 inline-flex h-10 items-center gap-2 rounded-full border hairline px-4 text-sm text-muted transition-colors hover:text-fg"
          >
            <Icon name="arrow-up" size={15} />
            {t.footer.top}
          </a>
        </div>
      </div>
      <div className="shell pb-8">
        <p className="font-mono text-[0.6875rem] text-faint">{t.footer.privacy}</p>
      </div>
    </footer>
  );
}
