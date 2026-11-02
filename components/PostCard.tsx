"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import type { Post } from "@/lib/posts";

export function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export function formatDate(iso: string, lang: "fr" | "en"): string {
  return new Date(iso + "T00:00:00").toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function PostCard({ post }: { post: Post }) {
  const { lang, t } = useLang();

  return (
    <Link href={`/blog/${post.slug}`} className="card card-hover group flex flex-col p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">
          {post.tags.join(" · ")}
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-fg">
        {pick(lang, post.title)}
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed">{pick(lang, post.excerpt)}</p>
      <div className="mt-6 flex items-center justify-between border-t hairline pt-4 text-xs text-faint">
        <span>
          {formatDate(post.date, lang)} · {t.blog.minutes(readingMinutes(pick(lang, post.content)))}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-fg transition-colors group-hover:text-accent">
          {t.blog.readMore}
          <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
