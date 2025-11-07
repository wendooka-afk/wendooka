export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const teamData: TeamMember[] = [
  {
    name: "John Doe",
    role: "Fondateur & CEO",
    image: "/public/placeholder-avatar.svg",
    bio: "Passionné par la technologie et le design, John a fondé Wendooka avec la vision de créer des expériences digitales exceptionnelles."
  },
  {
    name: "Jane Smith",
    role: "Directrice Artistique",
    image: "/public/placeholder-avatar.svg",
    bio: "Avec un œil pour l'esthétique et une passion pour l'innovation, Jane dirige notre pôle créatif pour donner vie à des designs uniques."
  },
  {
    name: "Mike Johnson",
    role: "Développeur Principal",
    image: "/public/placeholder-avatar.svg",
    bio: "Expert en technologies web modernes, Mike transforme les designs complexes en sites web rapides, performants et sécurisés."
  }
];