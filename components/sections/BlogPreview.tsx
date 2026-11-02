"use client";

import Link from "next/link";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { PostCard } from "@/components/PostCard";
import { useLang } from "@/components/LangProvider";
import { posts } from "@/lib/posts";

export function BlogPreview() {
  const { t } = useLang();

  return (
    <Section
      id="blog"
      index="03"
      kicker={t.blog.kicker}
      title={t.blog.title}
      lead={t.blog.lead}
      action={
        <Link href="/blog" className="btn-ghost w-fit shrink-0">
          {t.blog.allPosts}
          <Icon name="arrow-right" size={16} />
        </Link>
      }
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
