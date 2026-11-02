import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "K0BR4 — Dimitri BABALOLA | Réseau · Cybersécurité",
  description:
    "Portfolio de Dimitri BABALOLA (K0BR4) — étudiant en Réseau Informatique, Mobilité et Sécurité à Pigier Bénin. Réseaux Cisco (CCNA), CTF et développement.",
  keywords: ["K0BR4", "Dimitri BABALOLA", "cybersécurité", "réseau", "CCNA", "CTF", "Pigier Bénin", "portfolio"],
  authors: [{ name: "Dimitri BABALOLA", url: "https://github.com/Dimi07-tech" }],
  openGraph: {
    title: "K0BR4 — Dimitri BABALOLA",
    description: "Réseau Informatique, Mobilité & Sécurité. CTF · Réseaux Cisco (CCNA) · Développement.",
    type: "website",
    locale: "fr_FR",
    images: ["/profile-1200.webp"],
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1117" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Applique le thème avant la première peinture (anti-FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');try{var t=localStorage.getItem('k0br4-theme');if(t!=='dark'){document.documentElement.classList.add('light')}}catch(e){document.documentElement.classList.add('light')}`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
