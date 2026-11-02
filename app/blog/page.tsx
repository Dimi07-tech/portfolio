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
      <main id="main" className="shell pb-24 pt-28 md:pt-36">
        <BlogList posts={posts} />
      </main>
      <Footer />
    </LangProvider>
  );
}