"use client";

import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import type { Post } from "@/lib/posts";

export function BlogList({ posts }: { posts: Post[] }) {
  const { lang, t } = useLang();

  if (posts.length === 0) {
    return <p className="mt-10 text-slate-400">{t.blog.empty}</p>;
  }

  return (
    <div className="mt-10 space-y-5">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="card-surface group flex flex-col gap-1 p-6 transition-all hover:-translate-y-0.5 hover:border-venom/40 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="font-mono text-xs text-slate-500">{post.date}</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-ink-900 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-lg font-semibold text-white transition-colors group-hover:text-venom-soft">
              {pick(lang, post.title)}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{pick(lang, post.excerpt)}</p>
          </div>
          <span className="mt-3 shrink-0 font-mono text-sm text-venom md:mt-0">→</span>
        </Link>
      ))}
      <div className="pt-2">
        <Link href="/" className="text-sm text-slate-400 hover:text-white">
          ← {t.nav.home}
        </Link>
      </div>
    </div>
  );
}