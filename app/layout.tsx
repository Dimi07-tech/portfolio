import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MatrixRain } from "@/components/MatrixRain";
import "./globals.css";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "K0BR4 — Dimitri BABALOLA | Réseau · Sécurité · Stratégie",
  description:
    "Portfolio de Dimitri BABALOLA (K0BR4) — étudiant en Réseau Informatique, Mobilité et Sécurité à Pigier Bénin. Passionné de CTF, de développement web et de réseaux Cisco CCNA.",
  keywords: ["K0BR4", "Dimitri BABALOLA", "cybersécurité", "réseau", "CCNA", "CTF", "Pigier Bénin", "portfolio"],
  authors: [{ name: "Dimitri BABALOLA", url: "https://github.com/Dimi07-tech" }],
  openGraph: {
    title: "K0BR4 — Dimitri BABALOLA",
    description:
      "Étudiant en Réseau Informatique, Mobilité & Sécurité. CTF · Développement web · Réseaux Cisco (CCNA).",
    type: "website",
    locale: "fr_FR",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${space.variable} ${mono.variable}`}>
      <body>
        {/* Applique le thème avant la première peinture (anti-FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('k0br4-theme');if(t==='light'){document.documentElement.classList.add('light')}}catch(e){}`,
          }}
        />
        <ThemeProvider>
          <MatrixRain />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}