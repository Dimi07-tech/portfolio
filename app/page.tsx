"use client";

import { LangProvider } from "@/components/LangProvider";
import { Navbar } from "@/components/Navbar";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Projects } from "@/components/sections/Projects";
import { Expertise } from "@/components/sections/Expertise";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Certifications } from "@/components/sections/Certifications";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <LangProvider>
      <HeroBackdrop />
      <Navbar />
      <main id="main">
        <Hero />
        <Pillars />
        <Projects />
        <Expertise />
        <BlogPreview />
        <Certifications />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
