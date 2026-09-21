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

export interface Project {
  name: string;
  tag: string;
  stack: string[];
  desc: Bilingual;
  links?: { github?: string };
}

export const projects: Project[] = [
  {
    name: "SkyBook",
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
    tag: "Réseau",
    stack: ["OSPF", "GigabitEthernet", "DR/BDR"],
    desc: {
      fr: "Topologie triangle sous OSPF : comparaison des types de réseau broadcast vs point-to-point, élection DR/BDR et convergence. Vérification complète (show ip ospf neighbor, show ip route ospf).",
      en: "Triangle topology under OSPF: comparing broadcast vs point-to-point network types, DR/BDR election and convergence. Full verification (show ip ospf neighbor, show ip route ospf).",
    },
  },
  {
    name: "ACL standards & étendues",
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