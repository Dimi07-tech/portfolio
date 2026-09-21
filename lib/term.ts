import { profile, projects, skillGroups } from "@/lib/data";
import { pick, type Lang } from "@/lib/i18n";

export interface TermLine {
  text: string;
  href?: string;
  cls?: "dim" | "ok" | "cyan" | "err" | "gold";
}

export type BootStep =
  | { kind: "cmd"; text: string }
  | { kind: "out"; line: TermLine };

const W = 50;

function banner(lang: Lang): string[] {
  const sub =
    lang === "fr" ? "réseaux · sécurité · CTF" : "networking · security · CTF";
  const top = "┌─[K0BR4 · access terminal]".padEnd(W - 1, "─") + "┐";
  const mid = "│  " + sub.padEnd(W - 6, " ") + "  │";
  const bot = "└".padEnd(W - 1, "─") + "┘";
  return [top, mid, bot];
}

const randHex = (n: number) =>
  Array.from({ length: n }, () => "0123456789ABCDEF"[Math.random() * 16 | 0]).join("");

const GLYPHS = "アイウエオカキクケコサシスセソタチツテト0123456789#$%@&";

export const TERM_BOOT: { fr: string[]; en: string[] } = {
  fr: [
    "[*] Initialisation du noyau…",
    "[*] Vérification des modules : réseaux · sécurité · web",
    "[*] Authentification : K0BR4 — guest",
    "[+] Accès accordé. Démo automatique en cours…",
  ],
  en: [
    "[*] Initializing kernel…",
    "[*] Loading modules: networking · security · web",
    "[*] Authentication: K0BR4 — guest",
    "[+] Access granted. Auto-demo running…",
  ],
};

export const TERM_UI = {
  title: { fr: "access_terminal", en: "access_terminal" } as const,
  mode: { fr: "GUEST", en: "GUEST" } as const,
  prompt: { fr: "k0br4@lab", en: "k0br4@lab" } as const,
  placeholder: { fr: "tapez une commande (help)…", en: "type a command (help)…" } as const,
};

export function buildBoot(lang: Lang): BootStep[] {
  const steps: BootStep[] = banner(lang).map((b) => ({
    kind: "out",
    line: { text: b, cls: "cyan" },
  }));
  for (const raw of TERM_BOOT[lang]) {
    steps.push({
      kind: "out",
      line: {
        text: raw,
        cls: raw.startsWith("[+]") ? "ok" : "dim",
      },
    });
  }
  steps.push({ kind: "cmd", text: "whoami" });
  steps.push({ kind: "out", line: { text: profile.fullName, cls: "ok" } });
  steps.push({
    kind: "out",
    line: { text: pick(lang, { fr: `alias  : ${profile.alias}`, en: `alias: ${profile.alias}` }), cls: "gold" },
  });
  steps.push({
    kind: "out",
    line: { text: pick(lang, { fr: "rôle   : Étudiant Réseau & Sécurité", en: "role: Networking & Security student" }), cls: "dim" },
  });

  steps.push({ kind: "cmd", text: `cat ~/mission.txt` });
  steps.push({
    kind: "out",
    line: {
      text: pick(lang, {
        fr: "RÉSEAUX · cybersécurité · CTF — signal : vert",
        en: "NETWORKING · cybersecurity · CTF — signal: green",
      }),
      cls: "ok",
    },
  });

  steps.push({ kind: "cmd", text: "version" });
  steps.push({
    kind: "out",
    line: {
      text: pick(lang, { fr: "k0br4.sh v2.1 — build cyber 2026", en: "k0br4.sh v2.1 — cyber build 2026" }),
      cls: "cyan",
    },
  });

  steps.push({
    kind: "out",
    line: {
      text: pick(lang, { fr: "[ok] Prêt. Tentez 'help' ou cliquez les raccourcis.", en: "[ok] Ready. Try 'help' or hit the shortcuts." }),
      cls: "dim",
    },
  });
  return steps;
}

export const commands: Record<string, { hint: { fr: string; en: string }; run: (args: string[], lang: Lang) => TermLine[] }> = {
  help: {
    hint: { fr: "liste des commandes", en: "list of commands" },
    run: (_args, lang) => {
      const lines: TermLine[] = [
        { text: pick(lang, { fr: "Commandes disponibles :", en: "Available commands:" }), cls: "ok" },
      ];
      for (const [name, cmd] of Object.entries(commands)) {
        lines.push({ text: `  ${name.padEnd(9)} ${pick(lang, cmd.hint)}`, cls: "dim" });
      }
      lines.push({
        text: pick(lang, {
          fr: "Astuce : activez le son 🔊 et essayez 'hack' ou 'matrix'.",
          en: "Tip: unmute 🔊 and try 'hack' or 'matrix'.",
        }),
        cls: "gold",
      });
      return lines;
    },
  },
  whoami: {
    hint: { fr: "mon identité", en: "my identity" },
    run: (_args, lang) => [
      { text: profile.fullName, cls: "ok" },
      { text: pick(lang, { fr: `alias : ${profile.alias}`, en: `alias: ${profile.alias}` }), cls: "gold" },
      { text: pick(lang, { fr: "rôle : Étudiant en Réseau & Sécurité", en: "role: Networking & Security student" }), cls: "dim" },
      { text: `${profile.school}`, cls: "dim" },
    ],
  },
  about: {
    hint: { fr: "résumé de profil", en: "profile summary" },
    run: (_args, lang) => [
      {
        text: pick(lang, {
          fr: "Étudiant en Réseau Informatique, Mobilité & Sécurité. Passionné de CTF, des réseaux Cisco (CCNA) et du développement web. Je pense comme un attaquant pour mieux défendre.",
          en: "Networking, Mobility & Security student. Passionate about CTF, Cisco networking (CCNA) and web development. I think like an attacker to defend better.",
        }),
        cls: "ok",
      },
      { text: pick(lang, { fr: "Lancez 'skills' pour voir mon arsenal.", en: "Run 'skills' to see my arsenal." }), cls: "dim" },
    ],
  },
  skills: {
    hint: { fr: "mes compétences", en: "my skills" },
    run: (_args, lang) => {
      const lines: TermLine[] = [];
      for (const g of skillGroups) {
        lines.push({ text: `▸ ${pick(lang, g.title)}`, cls: "gold" });
        lines.push({ text: `  ${g.items.join(" · ")}`, cls: "dim" });
      }
      return lines;
    },
  },
  projects: {
    hint: { fr: "mes projets & labs", en: "my projects & labs" },
    run: (_args, lang) => [
      { text: pick(lang, { fr: "Projets et labs :", en: "Projects and labs:" }), cls: "ok" },
      ...projects.map((p): TermLine => ({
        text: `  ${p.name}  [${p.tag}]`,
        href: p.links?.github,
        cls: "dim",
      })),
      {
        text: pick(lang, { fr: "Détails sur GitHub.", en: "Details on GitHub." }),
        cls: "dim",
      },
    ],
  },
  social: {
    hint: { fr: "mes réseaux", en: "my socials" },
    run: (_args, lang) => [
      { text: pick(lang, { fr: "Réseaux et contact :", en: "Socials & contact:" }), cls: "ok" },
      { text: `  github      ${profile.github}`, href: profile.github, cls: "dim" },
      { text: `  linkedin    ${profile.linkedin}`, href: profile.linkedin, cls: "dim" },
      { text: `  whatsapp    ${profile.whatsapp}`, href: profile.whatsapp, cls: "dim" },
      { text: `  email       ${profile.email}`, href: `mailto:${profile.email}`, cls: "dim" },
    ],
  },
  contact: {
    hint: { fr: "alias de 'social'", en: "alias for 'social'" },
    run: (args, lang) => commands.social.run(args, lang),
  },
  cv: {
    hint: { fr: "télécharger mon CV", en: "download my CV" },
    run: (_args, lang) => [
      {
        text: pick(lang, { fr: "Télécharger le CV (PDF)", en: "Download CV (PDF)" }),
        href: `/cv/K0BR4-CV-${lang}.pdf`,
        cls: "ok",
      },
    ],
  },
  blog: {
    hint: { fr: "ouvrir le blog", en: "open the blog" },
    run: (_args, lang) => [
      {
        text: lang === "fr" ? "Ouvrir /blog" : "Open /blog",
        href: "/blog",
        cls: "ok",
      },
    ],
  },
  cert: {
    hint: { fr: "certifications", en: "certifications" },
    run: (_args, lang) => [
      { text: pick(lang, { fr: "CCNA — en cursus · CyberCup Indian Ocean — obtenu", en: "CCNA — in progress · CyberCup Indian Ocean — earned" }), cls: "ok" },
      { text: pick(lang, { fr: "Objectifs : OSCP · eJPT · Security+", en: "Targets: OSCP · eJPT · Security+" }), cls: "dim" },
    ],
  },
  date: {
    hint: { fr: "date du jour", en: "current date" },
    run: () => [{ text: new Date().toLocaleString(), cls: "dim" }],
  },
  echo: {
    hint: { fr: "afficher du texte", en: "print text" },
    run: (args) => [{ text: args.join(" ") || "…", cls: "ok" }],
  },
  version: {
    hint: { fr: "version du shell", en: "shell version" },
    run: (_args, lang) => [
      { text: pick(lang, { fr: "K0BR4.SHELL v2.1 — build cybersécu 2026", en: "K0BR4.SHELL v2.1 — cybersecurity build 2026" }), cls: "cyan" },
      { text: pick(lang, { fr: "kernel : lab-2026 · uptime : 24/7", en: "kernel: lab-2026 · uptime: 24/7" }), cls: "dim" },
    ],
  },
  ping: {
    hint: { fr: "tester le réseau", en: "test the network" },
    run: (args, lang) => {
      const target = args[0] || "localhost";
      const ip = target === "localhost" ? "127.0.0.1" : `203.0.113.${Math.floor(Math.random() * 250) + 1}`;
      const t = (n: number) => (10 + Math.random() * n).toFixed(1);
      return [
        { text: `PING ${target} (${ip}) : 56 data bytes`, cls: "dim" },
        { text: `64 bytes from ${ip}: icmp_seq=1 ttl=54 time=${t(25)} ms`, cls: "dim" },
        { text: `64 bytes from ${ip}: icmp_seq=2 ttl=54 time=${t(25)} ms`, cls: "dim" },
        { text: `64 bytes from ${ip}: icmp_seq=3 ttl=54 time=${t(25)} ms`, cls: "dim" },
        { text: pick(lang, { fr: "0% packet loss — ligne stable.", en: "0% packet loss — line stable." }), cls: "ok" },
      ];
    },
  },
  matrix: {
    hint: { fr: "pluie de données", en: "data rain" },
    run: (_args, lang) => [
      { text: randHex(34) + " " + GLYPHS[Math.random() * GLYPHS.length | 0], cls: "cyan" },
      { text: randHex(48), cls: "cyan" },
      { text: "ШЙ彁 0x3F 0xE9 " + randHex(40), cls: "cyan" },
      { text: randHex(30) + " ᚠᛁᚱᛒᛁᚠ" + randHex(10), cls: "cyan" },
      {
        text: pick(lang, {
          fr: "Msg du Quartier Général : le terminal ne dort jamais.",
          en: "HQ message: the terminal never sleeps.",
        }),
        cls: "gold",
      },
    ],
  },
  hack: {
    hint: { fr: "séquence de piratage (démo)", en: "hacking sequence (demo)" },
    run: (_args, lang) => [
      { text: pick(lang, { fr: "Ciblage du serveur…", en: "Targeting the server…" }), cls: "dim" },
      { text: "Bypass WAF … OK", cls: "dim" },
      { text: "Extraction de l'énumération : ports 22 80 443", cls: "dim" },
      { text: "Injection payload :: OR 1=1 --", cls: "cyan" },
      { text: "[####################] 100%", cls: "ok" },
      {
        text: pick(lang, {
          fr: "ACCESS GRANTED — (démo 100% décorative, vive le légal 😉)",
          en: "ACCESS GRANTED — (100% decorative demo, stay legal 😉)",
        }),
        cls: "gold",
      },
    ],
  },
  sudo: {
    hint: { fr: "privilèges élevés ?", en: "elevated privileges?" },
    run: (_args, lang) => [
      {
        text: pick(lang, {
          fr: "[sudo] mot de passe pour k0br4 : ********",
          en: "[sudo] password for k0br4: ********",
        }),
        cls: "dim",
      },
      {
        text: "k0br4 n'est pas dans le fichier sudoers. Cet incident sera signalé. 🤖",
        cls: "err",
      },
      {
        text: pick(lang, {
          fr: "Astuce : ici, 'sudo' ne donnera jamais root… promis.",
          en: "Note: here, 'sudo' will never give you root… promise.",
        }),
        cls: "dim",
      },
    ],
  },
  neofetch: {
    hint: { fr: "infos système (fun)", en: "system info (fun)" },
    run: (_args, lang) => [
      { text: `${profile.alias}@lab`, cls: "cyan" },
      { text: "─────────────────────────────", cls: "dim" },
      { text: `OS       ${pick(lang, { fr: "Kali-Web 2026 (simulation)", en: "Kali-Web 2026 (simulated)" })}`, cls: "dim" },
      { text: `Host     ${profile.fullName}`, cls: "dim" },
      { text: `Shell    k0br4.sh v2.1`, cls: "dim" },
      { text: `Uptime   ${Math.floor(Math.random() * 24) + 1}h de pratique`, cls: "dim" },
      { text: pick(lang, { fr: "Café : 2 tasses/jour", en: "Coffee: 2 cups/day" }), cls: "gold" },
    ],
  },
  ls: {
    hint: { fr: "liste des dossiers", en: "list files" },
    run: (_args, lang) => [
      { text: pick(lang, { fr: "~/k0br4 :", en: "~/k0br4:" }), cls: "ok" },
      { text: "  projects/   blog/   cv.pdf   assets/   secrets.zip", cls: "dim" },
      { text: pick(lang, { fr: "Astuce : secrets.zip est protégé. 😏", en: "Tip: secrets.zip is protected. 😏" }), cls: "gold" },
    ],
  },
};

export function runCommand(name: string, args: string[], lang: Lang): TermLine[] | "clear" {
  if (name === "clear" || name === "cls") return "clear";
  const cmd = commands[name];
  if (!cmd) {
    return [
      {
        text: pick(lang, {
          fr: `commande introuvable : '${name}' — tapez 'help'`,
          en: `command not found: '${name}' — type 'help'`,
        }),
        cls: "err",
      },
    ];
  }
  try {
    return cmd.run(args, lang);
  } catch {
    return [{ text: pick(lang, { fr: "erreur d'exécution", en: "runtime error" }), cls: "err" }];
  }
}