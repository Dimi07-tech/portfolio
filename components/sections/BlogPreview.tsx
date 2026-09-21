"use client";

import Link from "next/link";
import { Section } from "@/components/Section";
import { useLang } from "@/components/LangProvider";
import { pick } from "@/lib/i18n";
import { posts } from "@/lib/posts";

export function BlogPreview() {
  const { lang, t } = useLang();

  return (
    <Section id="blog" kicker={t.blog.kicker} title={t.blog.title} lead={t.blog.lead}>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-surface group flex flex-col p-6 transition-all hover:-translate-y-1 hover:border-venom/40"
          >
            <div className="mb-3 flex items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-ink-900 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-semibold text-white transition-colors group-hover:text-venom-soft">
              {pick(lang, post.title)}
            </h3>
            <p className="mt-2 flex-1 text-sm text-slate-400">{pick(lang, post.excerpt)}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-venom">
              {t.blog.readMore} <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-venom/60 hover:text-venom"
        >
          {t.blog.allPosts} →
        </Link>
      </div>
    </Section>
  );
}