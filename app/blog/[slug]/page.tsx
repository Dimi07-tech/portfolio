import type { Metadata } from "next";
import Link from "next/link";
import { LangProvider } from "@/components/LangProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PostView } from "@/components/PostView";
import { posts, getPost } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article introuvable — K0BR4" };
  return {
    title: `${post.title.fr} — K0BR4`,
    description: post.excerpt.fr,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return (
      <LangProvider>
        <Navbar />
        <main id="main" className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 md:pt-36">
          <p>Article introuvable.</p>
          <Link href="/blog" className="mt-4 inline-block text-accent hover:underline">
            ← Blog
          </Link>
        </main>
        <Footer />
      </LangProvider>
    );
  }

  return (
    <LangProvider>
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 md:pt-36">
        <PostView post={post} />
      </main>
      <Footer />
    </LangProvider>
  );
}