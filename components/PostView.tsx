"use client";

import { useMemo } from "react";
import Link from "next/link";
import { marked } from "marked";
import { useLang } from "@/components/LangProvider";
import { formatDate, readingMinutes } from "@/components/PostCard";
import { pick } from "@/lib/i18n";
import type { Post } from "@/lib/posts";

marked.setOptions({ gfm: true, breaks: true });

export function PostView({ post }: { post: Post }) {
  const { lang, t } = useLang();
  const content = pick(lang, post.content);
  const html = useMemo(() => marked.parse(content) as string, [content]);

  return (
    <article>
      <Link href="/blog" className="text-sm text-muted transition-colors hover:text-fg">
        {t.blog.back}
      </Link>

      <header className="mb-10 mt-10 border-b hairline pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">
            {post.tags.join(" · ")}
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-fg md:text-5xl">
          {pick(lang, post.title)}
        </h1>
        <p className="mt-5 text-sm text-faint">
          Dimitri BABALOLA · {formatDate(post.date, lang)} · {t.blog.minutes(readingMinutes(content))}
        </p>
      </header>

      {/* contenu statique rédigé par l'auteur (lib/posts.ts) */}
      <div className="md-body text-[1.05rem]" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
