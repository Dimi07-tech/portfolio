"use client";

import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { useLang } from "@/components/LangProvider";
import type { Post } from "@/lib/posts";

export function BlogList({ posts }: { posts: Post[] }) {
  const { t } = useLang();

  return (
    <>
      <Link href="/" className="text-sm text-muted transition-colors hover:text-fg">
        {t.blog.home}
      </Link>
      <p className="eyebrow mb-4 mt-10">
        <span className="h-px w-6 bg-accent/50" />
        {t.blog.kicker}
      </p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">{t.blog.pageTitle}</h1>
      <p className="mt-4 max-w-2xl text-lg">{t.blog.lead}</p>

      {posts.length === 0 ? (
        <p className="mt-12">{t.blog.empty}</p>
      ) : (
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
