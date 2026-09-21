export type Lang = "fr" | "en";

export interface Dict {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    ctf: string;
    blog: string;
    certifications: string;
    contact: string;
    cv: string;
  };
  hero: {
    badge: string;
    name: string;
    role: string;
    tagline: string;
    ctaProjects: string;
    ctaCv: string;
    statTools: string;
    statToolsLabel: string;
    statProjects: string;
    statProjectsLabel: string;
    statCtf: string;
    statCtfLabel: string;
  };
  about: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    quote: string;
    values: { k: string; v: string }[];
  };
  skills: {
    kicker: string;
    title: string;
    lead: string;
  };
  projects: {
    kicker: string;
    title: string;
    lead: string;
    github: string;
    all: string;
  };
  ctf: {
    kicker: string;
    title: string;
    lead: string;
    certLabel: string;
    nextLabel: string;
    next: string;
  };
  blog: {
    kicker: string;
    title: string;
    lead: string;
    readMore: string;
    allPosts: string;
    empty: string;
    back: string;
    dateFormat: string;
  };
  certifications: {
    kicker: string;
    title: string;
    lead: string;
    preparingTitle: string;
    preparing: string[];
    obtained: string;
    inProgress: string;
  };
  contact: {
    kicker: string;
    title: string;
    lead: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSend: string;
    formPlaceholder: string;
    directLabel: string;
    emailLabel: string;
    whatsappLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    whatsappCta: string;
    success: string;
  };
  footer: {
    tagline: string;
    rights: string;
    builtWith: string;
  };
}

const fr: Dict = {
  nav: {
    home: "Accueil",
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    ctf: "CTF",
    blog: "Blog",
    certifications: "Certifications",
    contact: "Contact",
    cv: "CV",
  },
  hero: {
    badge: "Réseaux · Mobilité · Sécurité",
    name: "K0BR4",
    role: "Dimitri BABALOLA",
    tagline: "Esprit analytique, méthode rigoureuse. Je pense comme un attaquant pour mieux défendre.",
    ctaProjects: "Voir mes projets",
    ctaCv: "Télécharger mon CV",
    statTools: "10+",
    statToolsLabel: "Labs réseau (Packet Tracer)",
    statProjects: "3",
    statProjectsLabel: "Projets sur GitHub",
    statCtf: "1ère",
    statCtfLabel: "Compétition CTF internationale",
  },
  about: {
    kicker: "Qui suis-je ?",
    title: "Étudier le système avant de le défendre",
    p1: "Étudiant en Réseau Informatique, Mobilité et Sécurité à Pigier Bénin (Calavi), je suis fasciné par la façon dont les systèmes communiquent — et par la façon dont on peut les protéger. Mon terrain de jeu préféré : les CTF, où chaque challenge est une énigme qui exige méthode et sang-froid.",
    p2: "Formé au programme Cisco CCNA, je manipule l'adressage, le routage dynamique (OSPF), les VLAN, les ACL et la sécurité réseau au quotidien. En parallèle, je développe des projets web et des bots (Node.js, Docker) pour transposer mes réflexions côté code.",
    quote: "Je ne force jamais les portes : j'étudie le système, je trouve la faille, j'agis proprement.",
    values: [
      { k: "Méthode", v: "Un déroulé précis : énumérer, comprendre, agir, documenter." },
      { k: "Sang-froid", v: "Rester lucide sous pression — les meilleures décisions naissent dans le calme." },
      { k: "Curiosité", v: "Toujours creuser plus loin : chaque réponse soulève de nouvelles questions." },
      { k: "Éthique", v: "La technique sans cadre ne vaut rien — la sécurité est d'abord une éthique." },
    ],
  },
  skills: {
    kicker: "Mon arsenal",
    title: "Compétences techniques",
    lead: "Un socle réseau solide (CCNA), une curiosité pour le code et une pratique régulière de la sécurité offensive.",
  },
  projects: {
    kicker: "Travaux",
    title: "Projets & Labs",
    lead: "Des bots, des applications web et des topologies réseau que j'ai conçues, configurées et documentées.",
    github: "Voir sur GitHub",
    all: "Tous",
  },
  ctf: {
    kicker: "Compétitions",
    title: "CTF & Compétitions",
    lead: "La pratique, toujours. Les CTF transforment la théorie en réflexes.",
    certLabel: "Certificat · 1ère étape",
    nextLabel: "Prochain objectif",
    next: "Enchaîner les CTF solos (picoCTF, TryHackMe, Root-Me) et publier mes writeups ici.",
  },
  blog: {
    kicker: "Écrits",
    title: "Blog & Writeups",
    lead: "Mes notes techniques et résolutions de challenges, pour partager ce que j'apprends.",
    readMore: "Lire l'article",
    allPosts: "Tous les articles",
    empty: "Bientôt disponible.",
    back: "← Retour au blog",
    dateFormat: "Le {date}",
  },
  certifications: {
    kicker: "Preuves",
    title: "Certifications",
    lead: "Des apprentissages validés, en cours… et en préparation.",
    preparingTitle: "En préparation",
    preparing: ["OSCP", "eJPT", "CompTIA Security+"],
    obtained: "Obtenu",
    inProgress: "En cursus",
  },
  contact: {
    kicker: "Parler de projets",
    title: "Travaillons ensemble",
    lead: "Une idée, un lab à monter, un challenge à résoudre ? Écrivez-moi.",
    formName: "Votre nom",
    formEmail: "Votre email",
    formMessage: "Votre message",
    formSend: "Envoyer le message",
    formPlaceholder: "Décrivez votre projet…",
    directLabel: "Coordonnées",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    whatsappCta: "Discuter sur WhatsApp",
    success: "Merci ! Votre email client va s'ouvrir pour l'envoi.",
  },
  footer: {
    tagline: "Réseau · Sécurité · Stratégie. Construit avec méthode.",
    rights: "Tous droits réservés.",
    builtWith: "Construit avec Next.js & Tailwind",
  },
};

const en: Dict = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    ctf: "CTF",
    blog: "Blog",
    certifications: "Certifications",
    contact: "Contact",
    cv: "CV",
  },
  hero: {
    badge: "Networking · Mobility · Security",
    name: "K0BR4",
    role: "Dimitri BABALOLA",
    tagline: "Analytical mind, rigorous method. I think like an attacker to defend better.",
    ctaProjects: "See my projects",
    ctaCv: "Download my CV",
    statTools: "10+",
    statToolsLabel: "Network labs (Packet Tracer)",
    statProjects: "3",
    statProjectsLabel: "Projects on GitHub",
    statCtf: "1st",
    statCtfLabel: "International CTF competition",
  },
  about: {
    kicker: "Who am I?",
    title: "Study the system before defending it",
    p1: "A Networking, Mobility and Security student at Pigier Bénin (Calavi), I'm fascinated by how systems communicate — and how they can be protected. My favourite playground: CTFs, where every challenge is a puzzle demanding method and composure.",
    p2: "Trained on the Cisco CCNA program, I work every day with addressing, dynamic routing (OSPF), VLANs, ACLs and network security. In parallel, I build web projects and bots (Node.js, Docker) to translate my thinking into code.",
    quote: "I never force doors: I study the system, find the flaw, act cleanly.",
    values: [
      { k: "Method", v: "A precise workflow: enumerate, understand, act, document." },
      { k: "Composure", v: "Staying lucid under pressure — the best decisions come from calm." },
      { k: "Curiosity", v: "Always dig deeper: every answer raises new questions." },
      { k: "Ethics", v: "Skill without boundaries is worthless — security starts with ethics." },
    ],
  },
  skills: {
    kicker: "My arsenal",
    title: "Technical skills",
    lead: "A solid networking foundation (CCNA), a curiosity for code and regular hands-on security practice.",
  },
  projects: {
    kicker: "Work",
    title: "Projects & Labs",
    lead: "Bots, web apps and network topologies I designed, configured and documented.",
    github: "View on GitHub",
    all: "All",
  },
  ctf: {
    kicker: "Competitions",
    title: "CTF & Competitions",
    lead: "Always practicing. CTFs turn theory into reflexes.",
    certLabel: "Certificate · Round 1",
    nextLabel: "Next goal",
    next: "Chain more solo CTFs (picoCTF, TryHackMe, Root-Me) and publish my writeups here.",
  },
  blog: {
    kicker: "Writing",
    title: "Blog & Writeups",
    lead: "My technical notes and challenge writeups, sharing what I learn.",
    readMore: "Read article",
    allPosts: "All articles",
    empty: "Coming soon.",
    back: "← Back to blog",
    dateFormat: "On {date}",
  },
  certifications: {
    kicker: "Proof",
    title: "Certifications",
    lead: "Validated learning, in progress… and in preparation.",
    preparingTitle: "In preparation",
    preparing: ["OSCP", "eJPT", "CompTIA Security+"],
    obtained: "Earned",
    inProgress: "In progress",
  },
  contact: {
    kicker: "Talk about projects",
    title: "Let's work together",
    lead: "An idea, a lab to build, a challenge to solve? Write to me.",
    formName: "Your name",
    formEmail: "Your email",
    formMessage: "Your message",
    formSend: "Send message",
    formPlaceholder: "Describe your project…",
    directLabel: "Contact details",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    whatsappCta: "Chat on WhatsApp",
    success: "Thanks! Your email client will open to send it.",
  },
  footer: {
    tagline: "Networking · Security · Strategy. Built with method.",
    rights: "All rights reserved.",
    builtWith: "Built with Next.js & Tailwind",
  },
};

export const translations: Record<Lang, Dict> = { fr, en };

export function pick<T>(lang: Lang, b: { fr: T; en: T }): T {
  return b[lang];
}