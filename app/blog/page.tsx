import type { Metadata } from "next";
import { LangProvider } from "@/components/LangProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogList } from "@/components/BlogList";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog & Writeups — K0BR4",
  description: "Notes techniques et writeups CTF de Dimitri BABALOLA (K0BR4).",
};

export default function BlogPage() {
  return (
    <LangProvider>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-32">
        <p className="mb-3 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-venom">
          <span className="h-px w-8 bg-venom/60" />
          Blog
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Articles & Writeups</h1>
        <BlogList posts={posts} />
      </main>
      <Footer />
    </LangProvider>
  );
}