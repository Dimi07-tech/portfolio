export type Bilingual = { fr: string; en: string };

export const profile = {
  firstName: "Dimitri",
  lastName: "BABALOLA",
  fullName: "BABALOLA Dimitri Oluyomi Perfilsaint",
  alias: "K0BR4",
  school: "Pigier Bénin · Calavi",
  field: "Réseau Informatique, Mobilité & Sécurité",
  email: "dimitribabalola@gmail.com",
  phone: "+229 01 42 13 10 09",
  phoneDigits: "2290142131009",
  whatsapp: "https://wa.me/2290142131009",
  linkedin: "https://www.linkedin.com/in/dimitri-babalola-64ab04414/",
  github: "https://github.com/Dimi07-tech",
};

export type ProjectCategory = "dev" | "network";

export interface Project {
  name: string;
  tag: string;
  category: ProjectCategory;
  stack: string[];
  desc: Bilingual;
  links?: { github?: string };
}

export const projects: Project[] = [
  {
    name: "SkyBook",
    category: "dev",
    tag: "Full-Stack",
    stack: ["React 19", "TypeScript", "Fastify", "PostgreSQL", "WebSocket", "Docker"],
    desc: {
      fr: "Plateforme de recherche et réservation de vols (parcours invité) : tarifs Basic/Flex, choix des sièges et options, création d'un hold de 15 minutes sans paiement et référence unique SKY-XXXXXX. Expiration gérée côté serveur avec compte à rebours temps réel via WebSocket, dashboard analytique et back-office Odoo 18.",
      en: "Flight search and booking platform (guest flow): Basic/Flex fares, seat and option selection, 15-minute no-payment hold with a unique SKY-XXXXXX reference. Server-side expiry with a real-time WebSocket countdown, analytics dashboard and Odoo 18 back-office.",
    },
    links: { github: "https://github.com/PIGIER-Calavi-Agencies/Scalsafe" },
  },
  {
    name: "OVL-MD-V2",
    category: "dev",
    tag: "Bots & Automation",
    stack: ["JavaScript", "Node.js", "Docker"],
    desc: {
      fr: "Bot WhatsApp multi-device performant : automatisation de messages, commandes personnalisées et gestion d'événements. Développé en JavaScript, conteneurisé avec Docker pour des déploiements reproductibles.",
      en: "High-performance multi-device WhatsApp bot: message automation, custom commands and event handling. Built in JavaScript, containerized with Docker for reproducible deployments.",
    },
    links: { github: "https://github.com/Dimi07-tech/OVL-MD-V2" },
  },
  {
    name: "Urban_Taste",
    category: "dev",
    tag: "Web",
    stack: ["HTML/CSS", "JavaScript"],
    desc: {
      fr: "Application web explorant la culture culinaire urbaine : vitrine de menus, gestion de commandes et interface responsive. Un bac à sable pour mes compétences en développement web.",
      en: "Web app exploring urban food culture: menu showcase, order management and a responsive interface. A sandbox for my web development skills.",
    },
    links: { github: "https://github.com/Dimi07-tech/Urban_Taste" },
  },
  {
    name: "Docker — Deploy",
    category: "dev",
    tag: "DevOps",
    stack: ["Docker", "Dockerfile", "CI"],
    desc: {
      fr: "Conteneurisation du bot OVL-MD-V2 : Dockerfile optimisé, gestion des volumes et du cycle de vie des images. Mon approche pour des environnements de déploiement propres et reproductibles.",
      en: "Containerizing the OVL-MD-V2 bot: optimized Dockerfile, volume and image lifecycle management. My approach for clean, reproducible deployment environments.",
    },
    links: { github: "https://github.com/Dimi07-tech/Docker" },
  },
  {
    name: "Lab OSPF — Triangle R1-R2-R3",
    category: "network",
    tag: "Réseau",
    stack: ["OSPF", "GigabitEthernet", "DR/BDR"],
    desc: {
      fr: "Topologie triangle sous OSPF : comparaison des types de réseau broadcast vs point-to-point, élection DR/BDR et convergence. Vérification complète (show ip ospf neighbor, show ip route ospf).",
      en: "Triangle topology under OSPF: comparing broadcast vs point-to-point network types, DR/BDR election and convergence. Full verification (show ip ospf neighbor, show ip route ospf).",
    },
  },
  {
    name: "ACL standards & étendues",
    category: "network",
    tag: "Réseau",
    stack: ["Cisco IOS", "ACL", "Filtering"],
    desc: {
      fr: "Conception et application d'ACL standards et étendues pour restreindre le trafic entre réseaux : filtrage par source, destination, protocole et port, avec logique et bonnes pratiques.",
      en: "Design and deployment of standard & extended ACLs to restrict traffic between networks: filtering by source, destination, protocol and port, with logic and best practices.",
    },
  },
];

export interface SkillGroup {
  title: Bilingual;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: { fr: "Réseau (CCNA)", en: "Networking (CCNA)" },
    items: ["Routage & switching", "OSPF", "VLAN & trunking", "ACL & NAT/PAT", "Packet Tracer", "Wireshark"],
  },
  {
    title: { fr: "Développement", en: "Development" },
    items: ["JavaScript", "Node.js", "HTML/CSS", "Python", "Git & GitHub", "Docker"],
  },
  {
    title: { fr: "Sécurité & CTF", en: "Security & CTF" },
    items: ["Énumération (Nmap)", "Analyse de trafic", "Web (Burp, SQLMap)", "OSINT", "Shell / Bash"],
  },
];

export interface Cert {
  title: string;
  org: string;
  date: string;
  status: Bilingual;
  icon: string;
}

export const certifications: Cert[] = [
  {
    title: "CCNA — Routing & Switching Essentials",
    org: "Cisco Networking Academy · Pigier Bénin",
    date: "2025 — 2026",
    status: { fr: "En cursus", en: "In progress" },
    icon: "🎓",
  },
  {
    title: "Ethical Hacker",
    org: "Cisco Networking Academy",
    date: "2026",
    status: { fr: "Obtenu", en: "Earned" },
    icon: "🛡️",
  },
  {
    title: "CyberOps Associate",
    org: "Cisco Networking Academy",
    date: "2026",
    status: { fr: "Obtenu", en: "Earned" },
    icon: "🛰️",
  },
  {
    title: "CyberCup Indian Ocean — Team Edition",
    org: "OCOI · Équipe Hope229",
    date: "2026",
    status: { fr: "Obtenu", en: "Earned" },
    icon: "🏆",
  },
];

export const ctfEvent = {
  name: "CyberCup Indian Ocean",
  sub: "Team Edition — OCOI",
  team: "Hope229",
  round: "1ère étape",
  date: "2026",
};

export const socials = [
  { label: "GitHub", url: profile.github, icon: "github" },
  { label: "LinkedIn", url: profile.linkedin, icon: "linkedin" },
  { label: "WhatsApp", url: profile.whatsapp, icon: "whatsapp" },
  { label: "Email", url: `mailto:${profile.email}`, icon: "mail" },
];

export const contact = {
  school: profile.school,
  location: "Cotonou, Bénin",
};
/* ─── Piliers ─── */
export interface Pillar {
  code: string;
  title: Bilingual;
  desc: Bilingual;
  keywords: string[];
}

export const pillars: Pillar[] = [
  {
    code: "NETWORK",
    title: { fr: "Concevoir & configurer", en: "Design & configure" },
    desc: {
      fr: "Adressage, routage dynamique, VLAN et segmentation : je monte des topologies propres, vérifiées commande par commande.",
      en: "Addressing, dynamic routing, VLANs and segmentation: I build clean topologies, verified command by command.",
    },
    keywords: ["CCNA", "OSPF", "VLAN", "ACL", "NAT"],
  },
  {
    code: "SECURE",
    title: { fr: "Attaquer pour défendre", en: "Attack to defend" },
    desc: {
      fr: "Énumération, analyse de trafic, exploitation web : je pratique la sécurité offensive en CTF pour mieux durcir les systèmes.",
      en: "Enumeration, traffic analysis, web exploitation: I practice offensive security in CTFs to harden systems better.",
    },
    keywords: ["CTF", "Nmap", "Wireshark", "Burp", "OSINT"],
  },
  {
    code: "BUILD",
    title: { fr: "Développer & automatiser", en: "Build & automate" },
    desc: {
      fr: "Applications web, bots et conteneurs : je transpose mes idées en code déployable et reproductible.",
      en: "Web apps, bots and containers: I turn ideas into deployable, reproducible code.",
    },
    keywords: ["Node.js", "TypeScript", "Docker", "PostgreSQL"],
  },
];

/* ─── Méthode ─── */
export const method: { title: Bilingual; desc: Bilingual }[] = [
  {
    title: { fr: "Énumérer", en: "Enumerate" },
    desc: { fr: "Cartographier le système avant d'agir.", en: "Map the system before acting." },
  },
  {
    title: { fr: "Comprendre", en: "Understand" },
    desc: { fr: "Identifier la logique, les flux et les points faibles.", en: "Identify logic, flows and weak points." },
  },
  {
    title: { fr: "Agir", en: "Act" },
    desc: { fr: "Configurer, exploiter ou corriger — proprement.", en: "Configure, exploit or fix — cleanly." },
  },
  {
    title: { fr: "Documenter", en: "Document" },
    desc: { fr: "Rédiger un writeup clair pour transmettre.", en: "Write a clear writeup to share." },
  },
];

/* ─── Parcours ─── */
export const journey: { period: Bilingual; title: Bilingual; place: Bilingual; desc: Bilingual }[] = [
  {
    period: { fr: "En cours", en: "Ongoing" },
    title: { fr: "Réseau Informatique, Mobilité & Sécurité", en: "Networking, Mobility & Security" },
    place: { fr: "Pigier Bénin · Calavi", en: "Pigier Bénin · Calavi" },
    desc: {
      fr: "Formation technique centrée sur l'infrastructure réseau, les télécoms et la sécurité des systèmes.",
      en: "Technical program focused on network infrastructure, telecoms and systems security.",
    },
  },
  {
    period: { fr: "2025 — 2026", en: "2025 — 2026" },
    title: { fr: "Programme Cisco CCNA", en: "Cisco CCNA program" },
    place: { fr: "Cisco Networking Academy", en: "Cisco Networking Academy" },
    desc: {
      fr: "Routage & switching, OSPF, VLAN, ACL, NAT/PAT — plus de 10 labs Packet Tracer documentés.",
      en: "Routing & switching, OSPF, VLAN, ACL, NAT/PAT — 10+ documented Packet Tracer labs.",
    },
  },
  {
    period: { fr: "2026", en: "2026" },
    title: { fr: "CyberCup Indian Ocean — Team Edition", en: "CyberCup Indian Ocean — Team Edition" },
    place: { fr: "OCOI · Équipe Hope229", en: "OCOI · Team Hope229" },
    desc: {
      fr: "Première compétition CTF internationale en équipe : web, forensics, crypto et OSINT.",
      en: "First international team CTF competition: web, forensics, crypto and OSINT.",
    },
  },
  {
    period: { fr: "Prochaine étape", en: "Next step" },
    title: { fr: "eJPT → OSCP", en: "eJPT → OSCP" },
    place: { fr: "Objectif", en: "Goal" },
    desc: {
      fr: "Enchaîner les CTF solos (picoCTF, TryHackMe, Root-Me), publier mes writeups et viser les certifications offensives.",
      en: "Chain solo CTFs (picoCTF, TryHackMe, Root-Me), publish writeups and aim for offensive certifications.",
    },
  },
];

/* ─── Vidéos de fond du hero ───
 * Déposez vos fichiers dans public/hero/ puis déclarez-les ici, par ex. :
 *   { src: "/hero/datacenter-4k.mp4", srcMobile: "/hero/datacenter-1080.mp4", poster: "/hero/datacenter.webp" }
 * Liste vide → réseau animé en canvas.
 */
export const heroVideos: { src: string; srcMobile?: string; poster: string }[] = [
  // Vidéos Pexels (licence libre) — câbles réseau, baie de serveurs
  { src: "/hero/cables-4k.mp4", srcMobile: "/hero/cables-1080.mp4", poster: "/hero/cables.webp" },
  { src: "/hero/servers-4k.mp4", srcMobile: "/hero/servers-1080.mp4", poster: "/hero/servers.webp" },
];
