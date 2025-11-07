export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  category: 'Développement Web' | 'UI/UX Design' | 'E-commerce' | 'Design Graphique';
  link?: string;
}

export const projectsData: Project[] = [
  {
    title: "Commune de Belel",
    description: "Site institutionnel moderne et fonctionnel pour la commune de Belel, améliorant l'accès à l'information pour les citoyens.",
    tags: ["UI/UX Design", "Développement Web", "Wordpress"],
    image: "/public/placeholder-card-1.svg",
    category: 'Développement Web',
    link: "#"
  },
  {
    title: "Boutique en Ligne 'AfroChic'",
    description: "Plateforme e-commerce responsive qui a multiplié par 3 les ventes de produits artisanaux.",
    tags: ["E-commerce", "Shopify", "Marketing"],
    image: "/public/placeholder-card-2.svg",
    category: 'E-commerce',
    link: "#"
  },
  {
    title: "Identité Visuelle 'Ngaoundéré Digital'",
    description: "Création d'un logo et d'une charte graphique complète pour un événement tech local.",
    tags: ["Branding", "Logo", "Print"],
    image: "/public/placeholder-card-3.svg",
    category: 'Design Graphique',
    link: "#"
  },
  {
    title: "Application Mobile 'SamaFood'",
    description: "Interface utilisateur intuitive pour une application de livraison de repas, axée sur une expérience utilisateur fluide.",
    tags: ["Mobile App", "Figma", "Prototypage"],
    image: "/public/placeholder-card-1.svg",
    category: 'UI/UX Design',
    link: "#"
  },
  {
    title: "Site Vitrine 'Avocats & Associés'",
    description: "Conception d'un site web sobre et professionnel pour un cabinet d'avocats, renforçant leur crédibilité en ligne.",
    tags: ["Développement Web", "SEO", "Contenu"],
    image: "/public/placeholder-card-2.svg",
    category: 'Développement Web',
    link: "#"
  },
  {
    title: "Refonte UX 'HealthApp'",
    description: "Amélioration du parcours utilisateur d'une application de santé pour augmenter la rétention de 40%.",
    tags: ["Audit UX", "Tests Utilisateur", "UI Design"],
    image: "/public/placeholder-card-3.svg",
    category: 'UI/UX Design',
    link: "#"
  }
];