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
    image: "/112245.webp",
    bio: "Fondateur de Wendooka en 2017, Oumarou pilote la vision stratégique de l’agence et accompagne les clients dans la structuration et la réussite de leurs projets digitaux."
  },
  {
    name: "Khadidja Saïdou",
    role: "Directrice Artistique",
    image: "/118355.webp",
    bio: "Experte en design et identité visuelle, Khadidja conçoit des interfaces cohérentes, élégantes et alignées avec les objectifs des marques."
  },
  {
    name: "Mohamadou Abdoulhakim",
    role: "Directeur Technique",
    image: "/46018.webp",
    bio: "Spécialiste des architectures web complexes, Abdoulhakim garantit la robustesse, la sécurité et la performance technique des solutions développées."
  },
  {
    name: "Sakinatou Yaya",
    role: "Product Manager",
    image: "/15428.webp",
    bio: "Sakinatou assure la coordination entre les besoins clients, les équipes et la livraison des projets, avec rigueur et méthode."
  },
  {
    name: "Belhadj Mohamed",
    role: "Digital Strategist",
    image: "/271248.webp",
    bio: "Mohamed accompagne les clients sur leurs enjeux de croissance digitale, d’acquisition et de performance marketing."
  }
];