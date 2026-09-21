import type { Bilingual } from "./data";

export interface Post {
  slug: string;
  date: string;
  tags: string[];
  title: Bilingual;
  excerpt: Bilingual;
  content: Bilingual;
}

export const posts: Post[] = [
  {
    slug: "cybercup-indian-ocean-2026",
    date: "2026-03-15",
    tags: ["CTF", "Équipe"],
    title: {
      fr: "CyberCup Indian Ocean 2026 — mon premier CTF en équipe",
      en: "CyberCup Indian Ocean 2026 — my first team CTF",
    },
    excerpt: {
      fr: "Retour d'expérience sur ma première compétition internationale de cybersécurité avec l'équipe Hope229 : organisation, épreuves et leçons apprises.",
      en: "Feedback on my first international cybersecurity competition with team Hope229: organization, challenges and lessons learned.",
    },
    content: {
      fr: `## Objectif : apprendre en conditions réelles

Ma première expérience de compétition internationale s'est jouée avec l'équipe **Hope229** à la **CyberCup Indian Ocean — Team Edition**, organisée par l'OCOI (Observatoire de la Cybersécurité de l'Océan Indien).

### Ce qu'on y trouve

- Des épreuves variées : exploitation web, énumération réseau, analyse de fichiers
- Une forte composante **travail d'équipe** : répartir les rôles, communiquer
- Un rythme soutenu qui oblige à **prioriser**

### Ce que j'en retire

1. **La méthode avant la vitesse** : lister les ports, cibler, documenter chaque étape.
2. **La communication** : un canal unique pour éviter de refaire le travail d'un coéquipier.
3. **L'humilité** : chaque épreuve non résolue devient une note de révision.

### Verdict

Une compétition formatrice, à la hauteur de mes attentes. Prochaine étape : les épreuves individuelles, puis publier mes propres writeups ici même.`,
      en: `## Goal: learn in real conditions

My first experience of international competition happened with team **Hope229** at the **CyberCup Indian Ocean — Team Edition**, organized by OCOI (Indian Ocean Cybersecurity Observatory).

### What you'll find there

- Varied challenges: web exploitation, network enumeration, file analysis
- A strong **teamwork** component: splitting roles, communicating
- A steady pace that forces you to **prioritize**

### What I took away

1. **Method over speed**: list ports, target, document every step.
2. **Communication**: a single channel to avoid redoing a teammate's work.
3. **Humility**: every unsolved challenge becomes revision notes.

### Verdict

A formative competition, beyond my expectations. Next step: individual rounds, then publishing my own writeups right here.`,
    },
  },
  {
    slug: "ospf-broadcast-vs-point-to-point",
    date: "2026-02-02",
    tags: ["Réseau", "OSPF", "Packet Tracer"],
    title: {
      fr: "OSPF : broadcast vs point-to-point — pourquoi les DR/BDR comptent",
      en: "OSPF: broadcast vs point-to-point — why DR/BDR matter",
    },
    excerpt: {
      fr: "Comparaison des types de réseau OSPF sur Ethernet dans un lab triangle : élection de DR/BDR, adjacences FULL et impact sur les timers.",
      en: "Comparing OSPF network types on Ethernet in a triangle lab: DR/BDR election, FULL adjacencies and impact on timers.",
    },
    content: {
      fr: `## Le problème

Sur un segment Ethernet, OSPF élit un **DR** et un **BDR**. Tout le monde ne forme une adjacence complète qu'avec eux ; les DROTHER échangent uniquement avec le DR/BDR.

### Lab triangle

\`\`\`text
        R1 ---- R2
         \\      /
          \\    /
           R3
\`\`\`

Trois liens en **GigabitEthernet** (type réseau *broadcast* par défaut).

### Verdict du lab

\`\`\`text
show ip ospf neighbor
  1.1.1.1  FULL/DR       0:00:36  GigabitEthernet0/0/0
  2.2.2.2  FULL/BDR      0:00:34  GigabitEthernet0/0/1
\`\`\`

On passe en **point-to-point** :

\`\`\`text
interface GigabitEthernet0/0/0
 ip ospf network point-to-point
\`\`\`

Plus de DR/BDR, adjacence directe FULL, convergence plus rapide. Sur des liaisons entre deux routeurs, \`point-to-point\` est généralement le meilleur choix.

### À retenir

- \`broadcast\` (Ethernet) → DR/BDR obligatoires
- \`point-to-point\` (serial, ou forcé) → adjacence directe
- Toujours vérifier avec \`show ip ospf interface\` et \`show ip route ospf\``,
      en: `## The problem

On an Ethernet segment, OSPF elects a **DR** and a **BDR**. Not everyone forms a full adjacency — DROTHERs only exchange with the DR/BDR.

### Triangle lab

\`\`\`text
        R1 ---- R2
         \\      /
          \\    /
           R3
\`\`\`

Three links on **GigabitEthernet** (broadcast network type by default).

### Lab verdict

\`\`\`text
show ip ospf neighbor
  1.1.1.1  FULL/DR       0:00:36  GigabitEthernet0/0/0
  2.2.2.2  FULL/BDR      0:00:34  GigabitEthernet0/0/1
\`\`\`

Switch to **point-to-point**:

\`\`\`text
interface GigabitEthernet0/0/0
 ip ospf network point-to-point
\`\`\`

No more DR/BDR, direct FULL adjacency, faster convergence. On point-to-point links between two routers, \`point-to-point\` is usually the best choice.

### Key takeaways

- \`broadcast\` (Ethernet) → DR/BDR mandatory
- \`point-to-point\` (serial, or forced) → direct adjacency
- Always verify with \`show ip ospf interface\` and \`show ip route ospf\``,
    },
  },
  {
    slug: "acl-etendues-au-dela-de-la-source",
    date: "2026-01-20",
    tags: ["Réseau", "Sécurité", "Cisco IOS"],
    title: {
      fr: "ACL étendues : filtrer au-delà de l'adresse source",
      en: "Extended ACLs: filtering beyond the source address",
    },
    excerpt: {
      fr: "Quand les standards ne suffisent plus : destination, protocole et ports dans une seule règle, avec gestion du implicite deny.",
      en: "When standard ACLs aren't enough: destination, protocol and ports in a single rule, handling the implicit deny.",
    },
    content: {
      fr: `## Pourquoi passer à l'étendue

Les ACL **standards** filtrent uniquement sur l'adresse source — trop brut pour un vrai besoin métier. Les ACL **étendues** ajoutent la destination, le protocole et les ports.

### Exemple : bloquer le ping d'un réseau vers un autre

\`\`\`text
access-list 101 deny icmp 192.168.1.0 0.0.0.255 192.168.0.0 0.0.0.255 echo
access-list 101 permit ip any any
\`\`\`

Puis application à l'entrée de l'interface :

\`\`\`text
interface GigabitEthernet0/0
 ip access-group 101 in
\`\`\`

### Les pièges classiques

1. **Implicit deny** : sans \`permit ip any any\`, tout le reste est bloqué.
2. **Sens de filtrage** : le traffic est évalué à l'entrée (\`in\`) ou la sortie (\`out\`) selon le placement.
3. **Ports directionnels** : pour du \`eq 80\`, penser à la réponse du serveur.

### Réflexe

Toujours chiffrer sa règle (déni le plus spécifique en premier), tester avec \`show access-lists\` et compter les hits pour confirmer le nombre de paquets matchés.`,
      en: `## Why go extended

**Standard** ACLs filter only on the source address — too blunt for a real business need. **Extended** ACLs add destination, protocol and ports.

### Example: block ping from one network to another

\`\`\`text
access-list 101 deny icmp 192.168.1.0 0.0.0.255 192.168.0.0 0.0.0.255 echo
access-list 101 permit ip any any
\`\`\`

Then apply at interface ingress:

\`\`\`text
interface GigabitEthernet0/0
 ip access-group 101 in
\`\`\`

### Classic pitfalls

1. **Implicit deny**: without \`permit ip any any\`, everything else is blocked.
2. **Filtering direction**: traffic is evaluated at ingress (\`in\`) or egress (\`out\`) depending on placement.
3. **Directional ports**: for \`eq 80\`, think about the server's reply traffic.

### Reflex

Always order rules most-specific-first, test with \`show access-lists\` and read the hit counts to confirm how many packets matched.`,
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}