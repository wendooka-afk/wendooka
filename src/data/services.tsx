import React from 'react';
import { 
  LayoutTemplate, Palette, Code, Rocket, Search, ShieldCheck, Monitor, ShoppingCart, 
  Target, Paintbrush, Wrench, TrendingUp, Users, Network, MousePointerClick, 
  ClipboardCheck, Lightbulb, PlayCircle, RefreshCw, Sparkles, FileText, Share2, 
  Package, ImageIcon, MessageSquare, Download, Mail, BookOpen, PenTool, Calendar, 
  CreditCard, Truck, Megaphone 
} from 'lucide-react';

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
  features: [],
  process: []
};

const uiUxService: Service = {
  slug: 'ui-ux-design',
  title: '🎨 Design d\'Interfaces (UI/UX) Qui Captivent et Convertissent',
  subtitle: 'Nous créons des expériences utilisateur intuitives et mémorables qui transforment les clics en clients fidèles.',
  shortDescription: "Expériences fluides et intuitives qui fidélisent vos utilisateurs.",
  longDescription: "Nous concevons des interfaces centrées sur l'utilisateur pour une navigation agréable et efficace.",
  heroImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop',
  intro: {
    title: 'Votre application ou site web ne convertit pas assez ?',
    text: [
      'Une mauvaise expérience utilisateur (UX) ou une interface (UI) peu attrayante peut frustrer vos visiteurs et les faire fuir vers la concurrence.',
      'Chez Wendooka, nous plaçons l\'utilisateur au cœur de la conception pour créer des parcours fluides et engageants qui :'
    ],
    list: [
        'Augmentent le taux de rétention des utilisateurs',
        'Simplifient les parcours les plus complexes',
        'Renforcent la crédibilité et l\'image de votre marque',
        'Boostent significativement vos taux de conversion'
    ],
    image: 'https://images.unsplash.com/photo-1553877522-c36980345885?q=80&w=2070&auto=format&fit=crop'
  },
  prestations: {
    title: 'Nos Services en Design UI/UX',
    items: [
      { icon: <Users className="h-8 w-8" />, title: 'Recherche Utilisateur & Personas', description: 'Nous identifions les besoins et motivations de votre public cible.' },
      { icon: <Network className="h-8 w-8" />, title: 'Architecture de l\'Information', description: 'Nous structurons votre contenu de manière logique et intuitive.' },
      { icon: <Palette className="h-8 w-8" />, title: 'Design d\'Interface (UI)', description: 'Nous créons des interfaces esthétiques et fonctionnelles sur Figma.' },
      { icon: <MousePointerClick className="h-8 w-8" />, title: 'Prototypage Interactif', description: 'Donnez vie à vos maquettes avant même le développement.' },
      { icon: <ClipboardCheck className="h-8 w-8" />, title: 'Tests d\'Utilisabilité', description: 'Nous validons nos concepts avec de vrais utilisateurs.' }
    ]
  },
  processV2: {
    title: 'Notre Approche du Design Centré sur l\'Utilisateur',
    steps: [
      { icon: <Search />, name: 'Immersion & Analyse', description: 'Compréhension de vos enjeux et de vos utilisateurs.' },
      { icon: <Lightbulb />, name: 'Idéation & Conception', description: 'Wireframing et définition des parcours clés.' },
      { icon: <PlayCircle />, name: 'Prototypage & Test', description: 'Création de prototypes interactifs et tests.' },
      { icon: <Palette />, name: 'Design Final & Handoff', description: 'Création du design system et livraison aux développeurs.' },
      { icon: <RefreshCw />, name: 'Itération & Suivi', description: 'Analyse des retours et amélioration continue.' }
    ]
  },
  results: {
    title: 'Des Interfaces Qui Font la Différence',
    stats: [
        { value: '+35%', label: 'de conversion' },
        { value: '+50%', label: 'de rétention' }
    ],
    text: 'Nos clients constatent une amélioration significative de l\'engagement et de la satisfaction de leurs utilisateurs.',
    cta: '👉 Découvrez nos études de cas UI/UX'
  },
  testimonials: {
    title: 'Ce que nos clients disent',
    items: [
      { quote: 'L\'équipe de Wendooka a complètement repensé notre application. Le résultat est non seulement magnifique, mais nos utilisateurs adorent la nouvelle navigation !', author: 'Directeur Produit', company: 'App Innovante' }
    ]
  },
  features: [],
  process: []
};

const graphicDesignService: Service = {
  slug: 'design-graphique',
  title: '🚀 Design Graphique Qui Raconte Votre Histoire et Captive Votre Audience',
  subtitle: 'De la création de logo à l\'identité de marque complète, nous donnons vie à votre vision avec des visuels percutants.',
  shortDescription: "Identités visuelles fortes, logos percutants et visuels qui marquent les esprits.",
  longDescription: "Notre équipe de designers mettra en valeur votre identité de marque en créant des designs percutants et mémorables.",
  heroImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
  intro: {
    title: 'Votre image de marque ne vous représente plus ?',
    text: [
      'Un logo amateur ou des visuels incohérents peuvent nuire à votre crédibilité et ne pas attirer les bons clients.',
      'Notre pôle design crée des identités visuelles qui :'
    ],
    list: [
        'Reflètent parfaitement vos valeurs et votre mission',
        'Vous différencient instantanément de la concurrence',
        'Créent une connexion émotionnelle avec votre audience',
        'Assurent une cohérence sur tous vos supports de communication'
    ],
    image: 'https://images.unsplash.com/photo-1609923223054-9475c078f175?q=80&w=1974&auto=format&fit=crop'
  },
  prestations: {
    title: 'Nos Prestations en Design Graphique',
    items: [
      { icon: <Sparkles className="h-8 w-8" />, title: 'Création de Logo & Identité Visuelle', description: 'Un logo unique et une charte graphique complète pour une marque forte.' },
      { icon: <FileText className="h-8 w-8" />, title: 'Supports de Communication Print & Web', description: 'Cartes de visite, flyers, bannières, brochures, et plus encore.' },
      { icon: <Share2 className="h-8 w-8" />, title: 'Visuels pour les Réseaux Sociaux', description: 'Des templates et publications engageantes pour booster votre présence.' },
      { icon: <Package className="h-8 w-8" />, title: 'Packaging & Design Produit', description: 'Un emballage attractif qui met en valeur vos produits.' },
      { icon: <ImageIcon className="h-8 w-8" />, title: 'Illustrations & Iconographie sur Mesure', description: 'Des visuels uniques pour enrichir votre communication.' }
    ]
  },
  processV2: {
    title: 'Notre Processus Créatif, de l\'Idée à la Réalité',
    steps: [
      { icon: <MessageSquare />, name: 'Briefing Créatif', description: 'Nous échangeons pour comprendre votre vision et vos objectifs.' },
      { icon: <Search />, name: 'Recherche & Inspiration', description: 'Analyse de votre marché et exploration des tendances.' },
      { icon: <Lightbulb />, name: 'Concepts & Propositions', description: 'Présentation de plusieurs pistes créatives pour votre logo/design.' },
      { icon: <RefreshCw />, name: 'Révisions & Finalisation', description: 'Nous affinons la proposition choisie selon vos retours.' },
      { icon: <Download />, name: 'Livraison & Guide', description: 'Vous recevez tous les fichiers et une guide d\'utilisation.' }
    ]
  },
  results: {
    title: 'Un Design Qui a de l\'Impact',
    stats: [
        { value: '+40%', label: 'd\'engagement' },
        { value: '100%', label: 'de cohérence' }
    ],
    text: 'Nos clients bénéficient d\'une image de marque professionnelle qui renforce leur notoriété et leur croissance.',
    cta: '👉 Prêt à créer une marque inoubliable ?'
  },
  testimonials: {
    title: 'Ils sont fiers de leur nouvelle image',
    items: [
      { quote: 'Wendooka a su capturer l\'essence de notre entreprise dans un logo simple et puissant. Nous recevons des compliments tous les jours !', author: 'Fondatrice', company: 'Startup Éco' }
    ]
  },
  features: [],
  process: []
};

const marketingDigitalService: Service = {
  slug: 'marketing-digital',
  title: '📈 Marketing Digital : Attirez, Engagez et Convertissez Votre Audience Cible',
  subtitle: 'Boostez votre visibilité en ligne et générez des leads qualifiés grâce à nos stratégies de marketing digital sur-mesure.',
  shortDescription: "Campagnes ciblées qui boostent votre visibilité et vos conversions.",
  longDescription: "Nous élaborons des stratégies personnalisées pour générer du trafic qualifié et convertir les visiteurs en clients fidèles.",
  heroImage: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
  intro: {
    title: 'Vous avez un super produit, mais personne ne le sait ?',
    text: [
      "Avoir un site web performant est la première étape. La seconde, et la plus cruciale, est d'y attirer les bonnes personnes. Sans une stratégie de marketing digital efficace, votre entreprise reste invisible aux yeux de vos clients potentiels.",
      'Notre agence vous aide à construire une présence en ligne forte qui :'
    ],
    list: [
      'Génère un trafic qualifié et constant vers votre site',
      'Augmente votre notoriété et votre crédibilité',
      'Transforme les visiteurs en clients et ambassadeurs',
      'Optimise votre retour sur investissement (ROI)'
    ],
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop'
  },
  prestations: {
    title: 'Nos Services de Marketing Digital',
    items: [
      { icon: <Search />, title: 'Référencement Naturel (SEO)', description: 'Positionnez votre site en haut des résultats de Google.' },
      { icon: <Megaphone />, title: 'Publicité en Ligne (SEA)', description: 'Campagnes Google Ads & Social Ads pour des résultats immédiats.' },
      { icon: <Users />, title: 'Gestion des Réseaux Sociaux (SMM)', description: 'Engagez votre communauté et développez votre marque.' },
      { icon: <FileText />, title: 'Marketing de Contenu', description: 'Créez du contenu de valeur qui attire et fidélise.' },
      { icon: <Mail />, title: 'Email Marketing & Automation', description: 'Nourrissez vos prospects et automatisez vos ventes.' }
    ]
  },
  processV2: {
    title: 'Notre Approche Stratégique du Marketing Digital',
    steps: [
      { icon: <Target />, name: 'Audit & Stratégie', description: 'Analyse de votre marché et définition des KPIs.' },
      { icon: <PlayCircle />, name: 'Mise en Place', description: 'Lancement des campagnes et optimisation des canaux.' },
      { icon: <TrendingUp />, name: 'Gestion & Optimisation', description: 'Suivi des performances et ajustements continus.' },
      { icon: <ClipboardCheck />, name: 'Analyse & Reporting', description: 'Rapports clairs pour mesurer le ROI.' },
      { icon: <RefreshCw />, name: 'Itération', description: 'Amélioration continue pour maximiser les résultats.' }
    ]
  },
  results: {
    title: 'Des Stratégies Qui Portent Leurs Fruits',
    stats: [ { value: '+200%', label: 'de trafic' }, { value: '+75%', label: 'de leads' } ],
    text: 'Nous aidons nos clients à atteindre leurs objectifs de croissance grâce à des campagnes marketing ciblées et rentables.',
    cta: '👉 Prêt à dominer votre marché en ligne ?'
  },
  testimonials: {
    title: "Leurs résultats parlent d'eux-mêmes",
    items: [
      { quote: "L'équipe marketing de Wendooka a triplé notre génération de leads en 6 mois. Leur expertise en SEO est incomparable.", author: 'CEO', company: 'Tech Innovante' }
    ]
  },
  features: [],
  process: []
};

const maintenanceService: Service = {
  slug: 'maintenance-support',
  title: "🔧 Maintenance & Support : La Tranquillité d'Esprit Pour Votre Site Web",
  subtitle: 'Concentrez-vous sur votre business, nous nous occupons de la santé technique, de la sécurité et des performances de votre site.',
  shortDescription: "Un suivi complet pour assurer la performance et la sécurité de votre site.",
  longDescription: "Nous assurons que votre site web reste à jour et fonctionne de manière optimale, des mises à jour à la résolution de problèmes.",
  heroImage: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1974&auto=format&fit=crop',
  intro: {
    title: 'Votre site web est-il une bombe à retardement ?',
    text: [
      "Un site non entretenu est une porte ouverte aux pirates, aux bugs et aux baisses de performance qui peuvent coûter cher à votre entreprise.",
      'Notre service de maintenance proactive vous assure que votre site reste :'
    ],
    list: [
      'Sécurisé contre les dernières menaces',
      'Rapide et performant pour une expérience utilisateur optimale',
      'Toujours à jour avec les dernières technologies',
      'Sauvegardé régulièrement pour une récupération rapide en cas de problème'
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'
  },
  prestations: {
    title: 'Nos Forfaits de Maintenance Web',
    items: [
      { icon: <ShieldCheck />, title: 'Mises à Jour de Sécurité', description: 'Protection contre les vulnérabilités et les malwares.' },
      { icon: <Rocket />, title: 'Optimisation des Performances', description: 'Surveillance et amélioration de la vitesse de chargement.' },
      { icon: <RefreshCw />, title: 'Mises à Jour Techniques', description: 'Mise à jour du CMS, des thèmes et des plugins.' },
      { icon: <Download />, title: 'Sauvegardes Quotidiennes', description: 'Sauvegardes automatiques et sécurisées de votre site.' },
      { icon: <Wrench />, title: 'Support Technique Réactif', description: "Une équipe d'experts à votre écoute pour résoudre les problèmes." }
    ]
  },
  processV2: {
    title: 'Comment Nous Assurons la Stabilité de Votre Site',
    steps: [
      { icon: <ClipboardCheck />, name: 'Audit Initial', description: "Analyse complète de l'état de santé de votre site." },
      { icon: <PlayCircle />, name: 'Mise en Place', description: 'Configuration des outils de monitoring et de sauvegarde.' },
      { icon: <Monitor />, name: 'Surveillance 24/7', description: 'Monitoring continu de la disponibilité et de la sécurité.' },
      { icon: <TrendingUp />, name: 'Intervention Proactive', description: 'Application des correctifs et optimisations.' },
      { icon: <FileText />, name: 'Rapport Mensuel', description: 'Un résumé clair des actions menées et des performances.' }
    ]
  },
  results: {
    title: 'Un Site Sain, Une Entreprise Sereine',
    stats: [ { value: '99.9%', label: 'de disponibilité' }, { value: '0', label: 'faille de sécurité' } ],
    text: 'Nos clients dorment sur leurs deux oreilles, sachant que leur principal atout digital est entre de bonnes mains.',
    cta: '👉 Sécurisez votre investissement dès aujourd\'hui'
  },
  testimonials: {
    title: "Ils ne s'inquiètent plus pour leur site",
    items: [
      { quote: "Le service de maintenance de Wendooka est un must-have. Réactifs et professionnels, ils ont résolu un problème critique en moins d'une heure.", author: 'Gérant', company: 'PME Locale' }
    ]
  },
  features: [],
  process: []
};

const contenuService: Service = {
  slug: 'creation-de-contenu',
  title: "✍️ Création de Contenu : Racontez Votre Histoire, Engagez Votre Audience",
  subtitle: "Du blogging aux réseaux sociaux, nous créons du contenu pertinent et à forte valeur ajoutée qui positionne votre marque comme un expert.",
  shortDescription: "Nous produisons du contenu engageant qui génère des résultats, aligné sur vos objectifs.",
  longDescription: "Du blogging aux réseaux sociaux, nous créons du contenu qui parle à votre audience.",
  heroImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
  intro: {
    title: 'Vous manquez de temps pour créer du contenu de qualité ?',
    text: [
      "Le contenu est le carburant de votre marketing. Sans contenu frais et pertinent, il est difficile d'attirer l'attention sur Google ou d'engager une communauté sur les réseaux sociaux.",
      'Nous vous aidons à développer une stratégie de contenu qui :'
    ],
    list: [
      'Améliore votre référencement naturel (SEO)',
      'Éduque votre audience et répond à ses questions',
      'Génère des leads en proposant du contenu à forte valeur',
      "Renforce votre autorité et votre image d'expert"
    ],
    image: 'https://images.unsplash.com/photo-1521737852577-686049a15049?q=80&w=2070&auto=format&fit=crop'
  },
  prestations: {
    title: 'Nos Services de Création de Contenu',
    items: [
      { icon: <FileText />, title: "Rédaction d'Articles de Blog", description: 'Articles optimisés SEO pour attirer un trafic qualifié.' },
      { icon: <Share2 />, title: 'Gestion de Réseaux Sociaux', description: 'Création de posts, stories et visuels engageants.' },
      { icon: <Mail />, title: 'Rédaction de Newsletters', description: "Contenu exclusif pour fidéliser votre base d'abonnés." },
      { icon: <BookOpen />, title: 'Création de Livres Blancs & Ebooks', description: 'Générez des leads avec des contenus premium.' },
      { icon: <PenTool />, title: 'Copywriting & Pages de Vente', description: "Des textes persuasifs qui incitent à l'action." }
    ]
  },
  processV2: {
    title: 'De la Stratégie à la Publication',
    steps: [
      { icon: <Target />, name: 'Stratégie Éditoriale', description: "Définition de votre ligne éditoriale et de vos cibles." },
      { icon: <Calendar />, name: 'Calendrier de Publication', description: 'Planification des contenus sur le court et long terme.' },
      { icon: <PenTool />, name: 'Création & Rédaction', description: 'Production des contenus par nos experts.' },
      { icon: <ClipboardCheck />, name: 'Validation & Révision', description: 'Allers-retours pour un contenu parfait.' },
      { icon: <Rocket />, name: 'Diffusion & Promotion', description: 'Publication et promotion sur les canaux pertinents.' }
    ]
  },
  results: {
    title: 'Un Contenu Qui Travaille Pour Vous',
    stats: [ { value: 'x3', label: 'trafic organique' }, { value: '+50%', label: 'engagement' } ],
    text: 'Nos clients deviennent des références dans leur secteur grâce à un contenu de qualité qui attire et convertit.',
    cta: '👉 Démarrez votre stratégie de contenu maintenant'
  },
  testimonials: {
    title: 'Leurs audiences adorent',
    items: [
      { quote: "Wendooka a pris en charge notre blog et les résultats sont incroyables. Notre trafic a explosé et nous sommes enfin visibles sur Google.", author: 'Responsable Marketing', company: 'SaaS B2B' }
    ]
  },
  features: [],
  process: []
};

const ecommerceService: Service = {
  slug: 'e-commerce',
  title: "🛒 Solutions E-commerce : Vendez en Ligne, Développez Votre Chiffre d'Affaires",
  subtitle: "Nous créons des boutiques en ligne performantes, sécurisées et optimisées pour la conversion, de la fiche produit au paiement.",
  shortDescription: "Solutions personnalisées avec paniers d’achat, paiements en ligne et intégrations de systèmes de gestion des stocks.",
  longDescription: "Lancez votre boutique en ligne avec une plateforme robuste, sécurisée et facile à gérer.",
  heroImage: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop',
  intro: {
    title: 'Votre boutique en ligne ne décolle pas ?',
    text: [
      "Un parcours d'achat compliqué, des pages produits peu convaincantes ou un manque de confiance peuvent faire chuter vos ventes.",
      'Nous construisons des plateformes e-commerce qui :'
    ],
    list: [
      "Offrent une expérience d'achat fluide et agréable",
      'Mettent en valeur vos produits avec des fiches optimisées',
      'Simplifient le processus de paiement pour réduire les abandons de panier',
      'Sont rapides, sécurisées et fiables pour inspirer confiance'
    ],
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop'
  },
  prestations: {
    title: 'Nos Compétences en E-commerce',
    items: [
      { icon: <ShoppingCart />, title: 'Création de Boutique en Ligne', description: 'Développement sur Shopify, WooCommerce, ou sur-mesure.' },
      { icon: <CreditCard />, title: 'Intégration de Paiements Sécurisés', description: 'Stripe, PayPal, et solutions de paiement locales.' },
      { icon: <Package />, title: 'Gestion de Catalogue Produits', description: 'Import, optimisation des fiches produits et gestion des stocks.' },
      { icon: <Truck />, title: 'Configuration Logistique', description: 'Mise en place des options de livraison et de suivi.' },
      { icon: <TrendingUp />, title: 'Optimisation des Conversions (CRO)', description: "Analyse et amélioration du parcours d'achat pour vendre plus." }
    ]
  },
  processV2: {
    title: 'Le Chemin Vers Votre Succès en Ligne',
    steps: [
      { icon: <Search />, name: 'Analyse & Stratégie', description: 'Définition de vos objectifs et choix de la plateforme.' },
      { icon: <Palette />, name: 'Design & UX', description: 'Conception d\'une boutique attrayante et facile à naviguer.' },
      { icon: <Code />, name: 'Développement & Configuration', description: 'Mise en place technique de la boutique et de ses fonctionnalités.' },
      { icon: <ClipboardCheck />, name: 'Tests & Recette', description: 'Vérification complète du parcours d\'achat et des paiements.' },
      { icon: <Rocket />, name: 'Lancement & Suivi', description: 'Mise en ligne et analyse des premières ventes.' }
    ]
  },
  results: {
    title: 'Des Boutiques Qui Vendent Vraiment',
    stats: [ { value: '+150%', label: 'de ventes' }, { value: '-40%', label: 'abandon panier' } ],
    text: 'Nous aidons les commerçants à prospérer en ligne avec des boutiques qui transforment les visiteurs en clients fidèles.',
    cta: '👉 Lancez ou optimisez votre boutique en ligne'
  },
  testimonials: {
    title: 'Leurs ventes ont explosé',
    items: [
      { quote: "Notre nouvelle boutique conçue par Wendooka est un succès. Les ventes ont augmenté de 200% le premier mois. C'est simple, efficace et magnifique.", author: 'Fondatrice', company: 'Marque de Cosmétiques' }
    ]
  },
  features: [],
  process: []
};

export const servicesData: Service[] = [
  webDevService,
  graphicDesignService,
  uiUxService,
  marketingDigitalService,
  maintenanceService,
  contenuService,
  ecommerceService,
];