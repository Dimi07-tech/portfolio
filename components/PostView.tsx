"use client";

import { useMemo } from "react";
import Link from "next/link";
import { marked } from "marked";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import type { Post } from "@/lib/posts";

marked.setOptions({ gfm: true, breaks: true });

export function PostView({ post }: { post: Post }) {
  const { lang, t } = useLang();

  const html = useMemo(
    () => marked.parse(pick(lang, post.content)) as string,
    [lang, post.content]
  );

  return (
    <article>
      <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
        {t.blog.back}
      </Link>

      <header className="mt-8 mb-10 border-b border-white/10 pb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300"
            >
              {tag}
            </span>
          ))}
          <span className="font-mono text-xs text-slate-500">
            {t.blog.dateFormat.replace("{date}", post.date)}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {pick(lang, post.title)}
        </h1>
        <p className="mt-3 font-mono text-xs text-venom">k0br4@lab</p>
      </header>

      {/* eslint-disable-next-line react/no-danger */}
      <div className="md-body text-[1.05rem]" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}