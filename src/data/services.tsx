import React from 'react';
import { LayoutTemplate, Palette, Code, Rocket, Search, ShieldCheck, Monitor, ShoppingCart, Target, Paintbrush, Wrench, TrendingUp } from 'lucide-react';

export interface ServiceFeature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  name: string;
  description: string;
}

export interface ServiceTestimonial {
  quote: string;
  author: string;
  company: string;
}

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  // Main content
  intro: {
    title: string;
    text: string[];
    image: string;
    list?: string[];
  };
  features: ServiceFeature[];
  process: ServiceProcessStep[];
  // Optional new sections for updated pages
  subtitle?: string;
  prestations?: {
    title: string;
    items: ServiceFeature[];
  };
  processV2?: {
    title: string;
    steps: { name: string; description: string; icon: React.ReactElement }[];
  };
  results?: {
    title: string;
    stats: { value: string; label: string }[];
    text: string;
    cta: string;
  };
  testimonials?: {
    title: string;
    items: ServiceTestimonial[];
  };
}

const webDevService: Service = {
  slug: 'creation-de-sites-web',
  title: '👉 Création de Sites Web Modernes et Performants pour Booster Votre Business',
  subtitle: 'Nous concevons des sites web professionnels, rapides et optimisés pour transformer vos visiteurs en clients fidèles.',
  shortDescription: 'Des sites vitrines et e-commerce modernes, optimisés pour générer des ventes et inspirer confiance.',
  longDescription: 'Nous créons des sites web sur mesure qui captent l’essence de votre marque et répondent à vos objectifs commerciaux.',
  heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  intro: {
    title: 'Votre site web actuel vous coûte des clients ?',
    text: [
      'Un site lent, mal conçu ou non optimisé fait fuir vos visiteurs.',
      'Chez Wendooka, nous développons des sites web qui :'
    ],
    list: [
        'Captivent l’attention dès la première seconde',
        'Offrent une navigation fluide et responsive',
        'Sont optimisés pour le référencement naturel (SEO)',
        'Convertissent vos visiteurs en prospects qualifiés'
    ],
    image: 'https://images.unsplash.com/photo-1559028006-44a36b17a66b?q=80&w=1974&auto=format&fit=crop'
  },
  prestations: {
    title: 'Nos Solutions de Conception et Développement Web',
    items: [
      { icon: <Monitor className="h-8 w-8" />, title: 'Site Vitrine Professionnel', description: 'Présentez votre entreprise avec style et efficacité.' },
      { icon: <ShoppingCart className="h-8 w-8" />, title: 'Site E-commerce', description: 'Vendez vos produits en ligne 24/7.' },
      { icon: <Target className="h-8 w-8" />, title: 'Landing Pages Optimisées', description: 'Maximisez vos conversions avec des pages dédiées.' },
      { icon: <Paintbrush className="h-8 w-8" />, title: 'Refonte de Site Web', description: 'Modernisez et améliorez vos performances.' },
      { icon: <Wrench className="h-8 w-8" />, title: 'Maintenance & Support', description: 'Gardez votre site sécurisé et à jour.' }
    ]
  },
  processV2: {
    title: 'Comment Nous Créons Votre Site Web',
    steps: [
      { icon: <Search />, name: 'Découverte & Stratégie', description: 'Analyse de vos besoins et objectifs.' },
      { icon: <Palette />, name: 'Design UX/UI', description: 'Conception d’un design moderne et intuitif.' },
      { icon: <Code />, name: 'Développement & Intégration', description: 'Site rapide, responsive et sécurisé.' },
      { icon: <TrendingUp />, name: 'Optimisation SEO', description: 'Visibilité maximale sur Google.' },
      { icon: <Rocket />, name: 'Tests & Lancement', description: 'Mise en ligne sans stress, avec suivi.' }
    ]
  },
  results: {
    title: 'Des Sites Web Qui Génèrent des Résultats',
    stats: [
        { value: '650+', label: 'projets réalisés' },
        { value: '18', label: 'ans d’expérience' }
    ],
    text: 'Des dizaines de clients satisfaits qui voient leurs ventes et leur visibilité exploser après la mise en ligne.',
    cta: '👉 Étude de cas disponible sur demande'
  },
  testimonials: {
    title: 'Ils Nous Font Confiance',
    items: [
      { quote: 'Grâce à Wendooka, notre site e-commerce a doublé son chiffre d’affaires en seulement 3 mois !', author: 'Client Satisfait', company: 'Entreprise X' }
    ]
  },
  // Keep old properties for compatibility
  features: [],
  process: []
};

const otherServiceTemplate: Omit<Service, 'slug' | 'title' | 'shortDescription' | 'longDescription'> = {
  heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  intro: {
    title: 'Une présence en ligne qui vous ressemble',
    text: [
      'Votre site web est bien plus qu’une simple vitrine. C’est le cœur de votre stratégie digitale, un outil puissant pour attirer, engager et convertir vos clients. Chez Wendooka, nous concevons des sites web qui allient esthétique, fonctionnalité et performance.',
      'Nous travaillons en étroite collaboration avec vous pour comprendre vos besoins, votre cible et vos objectifs. Le résultat : un site unique, à l’image de votre entreprise, optimisé pour les moteurs de recherche (SEO) et offrant une expérience utilisateur exceptionnelle sur tous les appareils.'
    ],
    image: 'https://images.unsplash.com/photo-1559028006-44a36b17a66b?q=80&w=1974&auto=format&fit=crop'
  },
  features: [
    { icon: <LayoutTemplate />, title: 'Design sur mesure', description: 'Des maquettes uniques et créatives qui reflètent votre identité de marque.' },
    { icon: <Palette />, title: 'Responsive Design', description: 'Une expérience parfaite sur mobiles, tablettes et ordinateurs de bureau.' },
    { icon: <Code />, title: 'Développement robuste', description: 'Un code propre et performant pour un site rapide et fiable.' },
    { icon: <Search />, title: 'Optimisation SEO', description: 'Les bases techniques pour un bon référencement sur Google.' },
    { icon: <ShieldCheck />, title: 'Sécurité renforcée', description: 'Nous protégeons votre site contre les menaces et les vulnérabilités.' },
    { icon: <Rocket />, title: 'Performances optimisées', description: 'Un site rapide pour une meilleure expérience utilisateur et un meilleur SEO.' }
  ],
  process: [
      { name: 'Découverte', description: 'Nous analysons vos besoins et objectifs.' },
      { name: 'Conception', description: 'Création des maquettes et de l’UX/UI.' },
      { name: 'Développement', description: 'Transformation du design en site fonctionnel.' },
      { name: 'Lancement', description: 'Déploiement et mise en ligne de votre site.' }
  ]
};

export const servicesData: Service[] = [
  webDevService,
  { ...otherServiceTemplate, slug: 'design-graphique', title: 'Design graphique', shortDescription: "Identités visuelles fortes, logos percutants et visuels qui marquent les esprits.", longDescription: "Notre équipe de designers mettra en valeur votre identité de marque en créant des designs percutants et mémorables." },
  { ...otherServiceTemplate, slug: 'ui-ux-design', title: 'UI/UX Design', shortDescription: "Expériences fluides et intuitives qui fidélisent vos utilisateurs.", longDescription: "Nous concevons des interfaces centrées sur l'utilisateur pour une navigation agréable et efficace." },
  { ...otherServiceTemplate, slug: 'marketing-digital', title: 'Marketing digital', shortDescription: "Campagnes ciblées qui boostent votre visibilité et vos conversions.", longDescription: "Nous élaborons des stratégies personnalisées pour générer du trafic qualifié et convertir les visiteurs en clients fidèles." },
  { ...otherServiceTemplate, slug: 'maintenance-support', title: 'Maintenance & support', shortDescription: "Un suivi complet pour assurer la performance et la sécurité de votre site.", longDescription: "Nous assurons que votre site web reste à jour et fonctionne de manière optimale, des mises à jour à la résolution de problèmes." },
  { ...otherServiceTemplate, slug: 'creation-de-contenu', title: 'Création de contenu', shortDescription: "Nous produisons du contenu engageant qui génère des résultats, aligné sur vos objectifs.", longDescription: "Du blogging aux réseaux sociaux, nous créons du contenu qui parle à votre audience." },
  { ...otherServiceTemplate, slug: 'e-commerce', title: 'E-commerce', shortDescription: "Solutions personnalisées avec paniers d’achat, paiements en ligne et intégrations de systèmes de gestion des stocks.", longDescription: "Lancez votre boutique en ligne avec une plateforme robuste, sécurisée et facile à gérer." },
];