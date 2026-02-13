export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const teamData: TeamMember[] = [
  {
    name: "Oumarou Sanda",
    role: "Fondateur & CEO",
    image: "/Oumarou Sanda CEO Wzndooka.webp",
    bio: "Fondateur de Wendooka en 2017, Oumarou pilote la vision stratégique de l’agence et accompagne les clients dans la structuration et la réussite de leurs projets digitaux."
  },
  {
    name: "Khadidja Saïdou",
    role: "Directrice Artistique",
    image: "/Team member Khadidjatou Saidou.jpeg",
    bio: "Experte en design et identité visuelle, Khadidja conçoit des interfaces cohérentes, élégantes et alignées avec les objectifs des marques."
  },
  {
    name: "Mohamadou Abdoulhakim",
    role: "Directeur Technique",
    image: "/Team member Mohamadou Abdoulhakim.jpeg",
    bio: "Spécialiste des architectures web complexes, Abdoulhakim garantit la robustesse, la sécurité et la performance technique des solutions développées."
  },
  {
    name: "Sakinatou Yaya",
    role: "Product Manager",
    image: "/Team member Sakinatou Yaya.jpeg",
    bio: "Sakinatou assure la coordination entre les besoins clients, les équipes et la livraison des projets, avec rigueur et méthode."
  },
  {
    name: "Belhadj Mohamed",
    role: "Digital Strategist",
    image: "/Team member Belhadj Mohamed.jpeg",
    bio: "Mohamed accompagne les clients sur leurs enjeux de croissance digitale, d’acquisition et de performance marketing."
  }
];