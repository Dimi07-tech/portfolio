"use client";

import { LangProvider } from "@/components/LangProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Ctf } from "@/components/sections/Ctf";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Ctf />
        <BlogPreview />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}