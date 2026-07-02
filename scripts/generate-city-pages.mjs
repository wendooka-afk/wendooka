/**
 * generate-city-pages.mjs
 * Génère les landing pages SEO locales /agence-web-{ville} pour la table `pages`.
 * Chaque ville a un contexte économique UNIQUE (évite le duplicate content / doorway pages).
 *
 * Sortie :
 *   - database/landing_page_{slug}.sql        (un fichier par ville, pattern documenté)
 *   - database/landing_pages_villes.sql       (combiné, 7 INSERT ... ON CONFLICT)
 *
 * Exécution : node scripts/generate-city-pages.mjs
 * Déploiement : exécuter le SQL dans Supabase (ou via MCP).
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Pool de réalisations réelles Wendooka (liées, résolvent vers /realisations/:slug)
const REAL_POOL = {
  'commune-ngaoundere-2': { slug: 'commune-ngaoundere-2', img: '/commune%20ngaoundere%202%20Home.webp', alt: 'Site web Commune de Ngaoundéré 2e réalisé par Wendooka', name: 'Commune de Ngaoundéré 2e', tag: 'Site institutionnel · Ngaoundéré' },
  'mballen-ong':          { slug: 'mballen-ong',          img: '/Mballen%20Homepage%20.webp',           alt: 'Site web ONG MBALLEN réalisé par Wendooka',           name: 'MBALLEN ONG',            tag: 'ONG · Cameroun' },
  'sahel-consulting':     { slug: 'sahel-consulting',     img: '/Sahel%20consulting%20home.webp',       alt: 'Site web Sahel Consulting réalisé par Wendooka',       name: 'Sahel Consulting',       tag: 'Cabinet conseil · Cameroun' },
  'kubaru-sahel':         { slug: 'kubaru-sahel',         img: '/KubaruSahel%20homepage.webp',          alt: 'Portail média Kubaru Sahel réalisé par Wendooka',      name: 'Kubaru Sahel',           tag: 'Média · Nord-Cameroun' },
  'bandiko-production':   { slug: 'bandiko-production',   img: '/Bandiko%20Productions%20Home%201.webp', alt: 'Site web Bandiko Production réalisé par Wendooka',      name: 'Bandiko Production',     tag: 'Production audiovisuelle · Cameroun' },
  'abouscom':             { slug: 'abouscom',             img: '/Abouscom%20homepage.webp',            alt: 'Site web Abouscom réalisé par Wendooka',               name: 'Abouscom',               tag: 'Agence communication · Cameroun' },
  'barkantedjo':          { slug: 'barkantedjo',          img: '/barkantedjo%20homepage.jpeg',         alt: 'Site web Barkantedjo réalisé par Wendooka',            name: 'Barkantedjo',            tag: 'Artiste · Cameroun' },
  'baladjikwata':         { slug: 'baladjikwata',         img: '/baladjikwata%20homepage.jpeg',        alt: 'Site web Baladji Kwata réalisé par Wendooka',          name: 'Baladji Kwata',          tag: 'Musique · Ngaoundéré' },
  'oumarousanda':         { slug: 'oumarousanda',         img: '/oumarousanda%20hompage.jpeg',         alt: 'Site personnel Oumarou Sanda réalisé par Wendooka',    name: 'Oumarou Sanda',          tag: 'Personal branding · Cameroun' },
};

// Pool de témoignages réels (photos clients dans /public)
const TEST_POOL = {
  idrissou:        { img: '/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp', alt: 'Idrissou Abana, Commune de Ngaoundéré 2e', name: 'Idrissou Abana', role: 'Maire, Commune de Ngaoundéré 2e', quote: 'Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire.' },
  'oumarou-mballen': { img: '/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg', alt: 'Oumarou Sanda Aboubakar, Association Mballen', name: 'Oumarou Sanda Aboubakar', role: 'Président, Association Mballen', quote: 'Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement.' },
  eric:            { img: '/Client%20Eric%20Nguele%20Kubaru%20Sahel%2024.jpg', alt: 'Eric Nguele, Kubaru Sahel', name: 'Eric Nguele', role: 'Promoteur, Kubaru Sahel', quote: 'Un travail technique remarquable. Le site est ultra-rapide même en zone rurale, ce qui était notre exigence n°1. Wendooka a parfaitement compris nos contraintes.' },
  dewa:            { img: '/Client%20dewa%20aboubakar%20Bandiko%20productions.webp', alt: 'Dewa Aboubakar, Bandiko Production', name: 'Dewa Aboubakar', role: 'Fondateur, Bandiko Production', quote: 'Wendooka a parfaitement capté l\'essence de notre travail. Le site reflète notre identité et nous positionne à la hauteur de nos ambitions internationales.' },
  hamidou:         { img: '/Client%20Hamidou%20Ahmadou%20Sahel%20Consulting.jpeg', alt: 'Hamidou Ahmadou, Sahel Consulting', name: 'Hamidou Ahmadou', role: 'CEO, Sahel Consulting', quote: 'Wendooka a su traduire la complexité de nos offres en un site clair et percutant. Depuis la mise en ligne, nous constatons un impact réel sur notre image de marque.' },
};

// Set utilisé par les pages déjà en base (Ngaoundéré + version initiale des villes) — sert de référence OLD pour le patch DB
const OLD_REAL = ['commune-ngaoundere-2', 'mballen-ong', 'sahel-consulting'];
const OLD_TEST_IDROISSOU_QUOTE = 'Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire.';

// ─── Données uniques par ville ──────────────────────────────────────────────
const CITIES = [
  {
    slug: 'garoua', name: 'Garoua', region: 'Nord', country: 'CM', countryName: 'Cameroun',
    geo: { lat: 9.3017, lng: 13.3921 },
    heroImg: '/60349.webp',
    hero: "Capitale de la région du Nord et cité du coton, Garoua est un pôle économique majeur du Grand Nord camerounais, porté par l'agro-industrie, l'élevage et le commerce transfrontalier. Wendooka, agence web enracinée dans le Grand Nord, accompagne les entreprises, coopératives et institutions de Garoua avec des sites internet performants, un référencement local et des stratégies digitales pensées pour ce marché.",
    market: [
      "Garoua doit son statut de capitale économique du Nord à trois moteurs : le coton, l'élevage et sa position de carrefour commercial. La SODECOTON, pilier industriel de la ville, structure toute une filière — producteurs, égreneurs, transporteurs, exportateurs — qui gagnerait à valoriser ses activités en ligne pour toucher des acheteurs au-delà des frontières nationales.",
      "Le fleuve Bénoué et l'aéroport international de Garoua font de la ville une plateforme logistique naturelle vers le Tchad et le Nigeria. Les commerçants, transitaires et importateurs qui animent ce corridor manquent souvent d'une vitrine digitale capable de crédibiliser leurs échanges auprès de partenaires régionaux et internationaux.",
      "L'élevage bovin, activité ancestrale de la région, représente un potentiel économique considérable encore largement déconnecté du numérique. Marchands de bétail, entreprises de transformation carnée et coopératives agropastorales pourraient développer des relations commerciales directes avec les grands centres de consommation grâce à une présence en ligne bien référencée.",
    ],
    sectors: [
      ['Coton et agro-industrie', 'producteurs, égreneurs, coopératives et acteurs de la filière SODECOTON.'],
      ['Élevage et agropastoralisme', 'marchands de bétail, transformation carnée et coopératives agropastorales.'],
      ['Commerce transfrontalier', 'importateurs, transitaires et grossistes du corridor Nigeria-Tchad.'],
      ['Transport et logistique', 'transporteurs routiers, fret fluvial sur la Bénoué et logistique aéroportuaire.'],
      ['Administration régionale', 'services déconcentrés de l\'État, communes et institutions du Nord.'],
      ['Hôtellerie et restauration', 'hôtels, auberges et restaurants accueillant voyageurs d\'affaires et de transit.'],
      ['Santé', 'cliniques privées, cabinets médicaux, pharmacies et laboratoires.'],
      ['Éducation', 'établissements scolaires, centres de formation et instituts privés.'],
    ],
    localFaq: {
      q: "Créez-vous des sites pour les acteurs de la filière coton et de l'élevage à Garoua ?",
      a: "Oui. Nous concevons des sites vitrines et des catalogues en ligne pour les coopératives agricoles, les marchands de bétail et les entreprises agro-industrielles de Garoua, avec des fonctionnalités adaptées : présentation des produits, formulaires de commande, contenus multilingues et optimisation pour les connexions mobiles du Grand Nord.",
    },
    langNote: true,
  },
  {
    slug: 'maroua', name: 'Maroua', region: 'Extrême-Nord', country: 'CM', countryName: 'Cameroun',
    geo: { lat: 10.5910, lng: 14.3159 },
    heroImg: '/8970.webp',
    hero: "Capitale de l'Extrême-Nord, Maroua est réputée pour son artisanat du cuir, sa culture cotonnière et son rôle de carrefour commercial vers le Nigeria et le Tchad. Wendooka accompagne les artisans, commerçants, institutions et ONG de Maroua avec des sites internet professionnels et des stratégies digitales adaptées aux réalités de la région.",
    market: [
      "Maroua est le cœur de l'artisanat camerounais. Sa maroquinerie, son travail du cuir et ses objets d'art attirent une clientèle nationale et internationale. Pourtant, la majorité de ces artisans vendent uniquement sur les marchés physiques, faute d'une vitrine en ligne. Un site e-commerce bien conçu ouvrirait à ces créateurs des débouchés vers Douala, Yaoundé et la diaspora.",
      "La proximité immédiate du Nigeria fait de Maroua une place commerciale intense. Grossistes, importateurs et distributeurs y brassent des flux considérables de marchandises. Une présence digitale crédible permettrait à ces acteurs de structurer leurs relations d'affaires et de rassurer des partenaires au-delà du marché informel.",
      "Maroua concentre aussi une forte présence d'ONG et d'agences internationales intervenant dans un contexte régional exigeant. Ces organisations, tout comme l'Université de Maroua et les structures éducatives, ont besoin de plateformes web solides pour communiquer, mobiliser des partenaires et documenter leur action auprès des bailleurs.",
    ],
    sectors: [
      ['Artisanat et maroquinerie', 'artisans du cuir, créateurs d\'objets d\'art et coopératives artisanales.'],
      ['Coton et agriculture', 'producteurs, coopératives et acteurs de la transformation agricole.'],
      ['Commerce transfrontalier', 'grossistes, importateurs et distributeurs du corridor nigérian.'],
      ['ONG et humanitaire', 'organisations internationales et agences intervenant dans l\'Extrême-Nord.'],
      ['Éducation et recherche', 'Université de Maroua, écoles et centres de formation.'],
      ['Tourisme', 'prestataires liés aux monts Mandara, au parc de Waza et au patrimoine local.'],
      ['Santé', 'cliniques, cabinets médicaux, pharmacies et laboratoires d\'analyses.'],
      ['Commerce et distribution', 'détaillants, quincailleries et magasins de matériaux.'],
    ],
    localFaq: {
      q: "Pouvez-vous créer une boutique en ligne pour vendre l'artisanat de Maroua ?",
      a: "Absolument. Nous concevons des boutiques e-commerce pour les artisans et coopératives de Maroua, avec paiement Mobile Money, galerie produits, gestion des commandes et contenus optimisés pour toucher les acheteurs de Douala, Yaoundé et la diaspora. C'est l'un des meilleurs leviers pour sortir l'artisanat local des seuls marchés physiques.",
    },
    langNote: true,
  },
  {
    slug: 'douala', name: 'Douala', region: 'Littoral', country: 'CM', countryName: 'Cameroun',
    geo: { lat: 4.0511, lng: 9.7679 },
    heroImg: '/118355.webp',
    hero: "Capitale économique du Cameroun et premier port d'Afrique centrale, Douala concentre l'essentiel de l'activité industrielle, commerciale et financière du pays. Wendooka accompagne les PME, industries, importateurs et startups de Douala avec des sites internet performants et des stratégies digitales orientées croissance et conversion.",
    market: [
      "Douala est le poumon économique du Cameroun. Son port autonome, le plus important d'Afrique centrale, alimente une économie dense faite d'import-export, d'industrie manufacturière et de services logistiques. Dans un marché aussi concurrentiel, une entreprise sans site web professionnel perd chaque jour des appels d'offres et des clients au profit de concurrents mieux positionnés en ligne.",
      "La ville abrite la plus forte concentration de PME et de sièges d'entreprises du pays. Ces structures cherchent à se différencier, à générer des leads qualifiés et à professionnaliser leur image. Un site orienté conversion, couplé à une stratégie SEO et publicitaire, devient un avantage compétitif décisif sur un marché où la crédibilité digitale fait la différence.",
      "Douala voit aussi émerger un écosystème tech et entrepreneurial dynamique : startups, e-commerce, fintech et prestataires de services numériques. Ces acteurs ont besoin de plateformes robustes, rapides et évolutives, capables de soutenir leur croissance et de rassurer investisseurs et partenaires internationaux.",
    ],
    sectors: [
      ['Import-export et logistique', 'importateurs, transitaires, sociétés de fret et acteurs de la chaîne portuaire.'],
      ['Industrie et manufacture', 'unités de production, agro-industrie et distribution industrielle.'],
      ['PME et commerce', 'entreprises de services, distributeurs et commerces cherchant à générer des leads.'],
      ['Startups et tech', 'jeunes pousses, e-commerce, fintech et prestataires numériques.'],
      ['Services financiers', 'assurances, cabinets, microfinance et conseil.'],
      ['Hôtellerie et restauration', 'hôtels d\'affaires, restaurants et établissements de loisirs.'],
      ['BTP et immobilier', 'promoteurs, entreprises de construction et agences immobilières.'],
      ['Santé privée', 'cliniques, polycliniques, laboratoires et cabinets spécialisés.'],
    ],
    localFaq: {
      q: "Accompagnez-vous les PME et importateurs de Douala sur la génération de leads ?",
      a: "Oui, c'est notre spécialité. Pour les PME et importateurs de Douala, nous concevons des sites orientés conversion — pages de services claires, formulaires de devis, preuves sociales — couplés à une stratégie SEO et publicitaire pour générer un flux régulier de contacts qualifiés sur un marché très concurrentiel.",
    },
    langNote: false,
  },
  {
    slug: 'yaounde', name: 'Yaoundé', region: 'Centre', country: 'CM', countryName: 'Cameroun',
    geo: { lat: 3.8480, lng: 11.5021 },
    heroImg: '/7409.webp',
    hero: "Capitale politique du Cameroun, Yaoundé concentre les institutions, les administrations, les universités et les sièges d'organisations internationales. Wendooka accompagne les institutions, cabinets, ONG et entreprises de services de Yaoundé avec des plateformes web crédibles et des stratégies de référencement solides.",
    market: [
      "Yaoundé est le centre du pouvoir administratif et institutionnel camerounais. Ministères, administrations, ambassades et organisations internationales y côtoient une économie de services dense. Dans cet environnement où la crédibilité prime, une présence web professionnelle est un prérequis pour toute structure qui veut être prise au sérieux par ses partenaires institutionnels.",
      "La ville abrite les principales universités et centres de recherche du pays, ainsi qu'un tissu important de cabinets de conseil, d'avocats, d'experts-comptables et de bureaux d'études. Ces professions vivent de leur réputation : un site web soigné, un blog d'expertise et un bon référencement transforment leur savoir-faire en autorité digitale et en nouveaux mandats.",
      "Yaoundé concentre également de nombreuses ONG et agences de développement qui gèrent des programmes financés par des bailleurs internationaux. Pour ces organisations, une plateforme web claire, multilingue et bien documentée est essentielle pour communiquer sur leur impact, mobiliser des partenaires et répondre aux exigences de transparence des financeurs.",
    ],
    sectors: [
      ['Administration et institutions', 'services publics, collectivités et structures para-publiques.'],
      ['Organisations internationales et ONG', 'agences de développement, ONG et programmes financés par des bailleurs.'],
      ['Cabinets et services professionnels', 'avocats, experts-comptables, consultants et bureaux d\'études.'],
      ['Éducation et recherche', 'universités, grandes écoles et centres de recherche.'],
      ['Santé', 'cliniques, centres spécialisés et cabinets médicaux.'],
      ['Immobilier', 'promoteurs, agences et gestionnaires de biens.'],
      ['Hôtellerie', 'hôtels institutionnels, résidences et centres de conférence.'],
      ['Technologie et services', 'prestataires numériques, agences et sociétés de services.'],
    ],
    localFaq: {
      q: "Travaillez-vous avec les institutions, ONG et cabinets de Yaoundé ?",
      a: "Oui. Nous concevons des plateformes web pour les institutions, ONG et cabinets professionnels de Yaoundé, avec un fort accent sur la crédibilité, la structuration de l'information, le multilinguisme et la conformité aux attentes des partenaires institutionnels et des bailleurs internationaux.",
    },
    langNote: false,
  },
  {
    slug: 'bafoussam', name: 'Bafoussam', region: 'Ouest', country: 'CM', countryName: 'Cameroun',
    geo: { lat: 5.4737, lng: 10.4179 },
    heroImg: '/5572.webp',
    hero: "Capitale de la région de l'Ouest et cœur du dynamisme entrepreneurial bamiléké, Bafoussam est une place commerciale et agricole majeure du Cameroun. Wendooka accompagne les commerçants, PME familiales, coopératives agricoles et entrepreneurs de Bafoussam avec des sites internet performants et des stratégies digitales orientées croissance.",
    market: [
      "Bafoussam incarne l'esprit d'entreprise bamiléké, réputé dans tout le Cameroun. La ville fourmille de PME familiales, de commerces dynamiques et de réseaux d'affaires qui s'étendent jusqu'à Douala, Yaoundé et la diaspora. Ces entrepreneurs, habitués à réinvestir et à se développer, trouvent dans le digital un levier naturel pour élargir leur clientèle et structurer leur croissance.",
      "La région de l'Ouest est aussi un grenier agricole : café, pomme de terre, maraîchage et produits vivriers y sont produits en abondance. Les coopératives et les acteurs de l'agro-transformation gagneraient à valoriser leurs produits en ligne pour accéder directement aux marchés urbains et à l'export, en supprimant les intermédiaires qui rognent leurs marges.",
      "Le commerce et la distribution constituent le poumon de Bafoussam. Grossistes, détaillants et importateurs animent un marché intense où la réputation et le bouche-à-oreille sont rois. Une présence en ligne crédible prolonge cette réputation dans le monde numérique et permet de capter une clientèle plus jeune, connectée et exigeante.",
    ],
    sectors: [
      ['Commerce et distribution', 'grossistes, détaillants et importateurs du marché de Bafoussam.'],
      ['Agriculture', 'coopératives café, maraîchage, pomme de terre et produits vivriers.'],
      ['Agro-transformation', 'unités de transformation et valorisation des produits agricoles.'],
      ['PME familiales', 'entreprises familiales cherchant à structurer et développer leur activité.'],
      ['Artisanat', 'ateliers, menuiseries et créateurs locaux.'],
      ['Transport interurbain', 'agences de voyage et transporteurs reliant l\'Ouest aux grandes villes.'],
      ['Hôtellerie', 'hôtels, auberges et restaurants.'],
      ['Éducation', 'établissements scolaires, instituts et centres de formation.'],
    ],
    localFaq: {
      q: "Aidez-vous les commerçants et PME familiales de Bafoussam à vendre en ligne ?",
      a: "Oui. Nous accompagnons les commerçants et PME familiales de Bafoussam dans leur passage au digital : sites vitrines, catalogues en ligne, boutiques e-commerce avec Mobile Money et stratégies pour capter une clientèle plus jeune et connectée, au Cameroun comme dans la diaspora.",
    },
    langNote: false,
  },
  {
    slug: 'ndjamena', name: "N'Djamena", region: 'Tchad', country: 'TD', countryName: 'Tchad',
    geo: { lat: 12.1348, lng: 15.0557 },
    heroImg: '/271248.webp',
    hero: "Capitale du Tchad et extrémité du corridor commercial Douala-N'Djamena, N'Djamena est une place d'affaires stratégique d'Afrique centrale. Wendooka accompagne les entreprises, commerçants transfrontaliers, institutions et ONG de N'Djamena avec des sites internet professionnels et des stratégies digitales adaptées au marché tchadien.",
    market: [
      "N'Djamena est le terminus du principal corridor logistique qui relie le Tchad à la mer via le port de Douala. Cette dépendance commerciale avec le Cameroun crée un écosystème dense d'importateurs, de transitaires et de commerçants dont l'activité gagnerait à être crédibilisée par une présence digitale professionnelle, lisible par des partenaires des deux pays.",
      "L'économie de la capitale tchadienne, portée par le pétrole, les services et le commerce, voit émerger une classe d'entrepreneurs et de PME en quête de visibilité. Banques, télécoms, sociétés de services et distributeurs cherchent à moderniser leur image et à atteindre une clientèle urbaine de plus en plus connectée via le mobile.",
      "N'Djamena accueille aussi de nombreuses institutions, agences internationales et ONG intervenant dans la région du lac Tchad et le Sahel. Ces organisations ont besoin de plateformes web solides, souvent multilingues (français et arabe), pour communiquer sur leurs programmes et répondre aux exigences de leurs bailleurs internationaux.",
    ],
    sectors: [
      ['Commerce transfrontalier', 'importateurs, transitaires et grossistes du corridor Douala-N\'Djamena.'],
      ['Pétrole et services', 'sociétés de services pétroliers et prestataires associés.'],
      ['Banques et finance', 'banques, microfinances, assurances et institutions financières.'],
      ['Télécoms et technologie', 'opérateurs, distributeurs et prestataires numériques.'],
      ['Institutions et administration', 'services publics et structures para-publiques.'],
      ['ONG et humanitaire', 'agences internationales et ONG du bassin du lac Tchad.'],
      ['Transport et logistique', 'transporteurs et acteurs de la chaîne logistique régionale.'],
      ['Santé et éducation', 'cliniques, écoles et centres de formation.'],
    ],
    localFaq: {
      q: "Wendooka peut-il créer un site bilingue français-arabe pour une entreprise à N'Djamena ?",
      a: "Oui. Nous concevons des sites bilingues français-arabe pour les entreprises, institutions et ONG de N'Djamena, avec une structure adaptée à la lecture dans les deux langues et une optimisation pour les connexions mobiles. Notre expérience du corridor Cameroun-Tchad nous permet de comprendre les enjeux commerciaux transfrontaliers de nos clients tchadiens.",
    },
    langNote: false,
  },
  {
    slug: 'bangui', name: 'Bangui', region: 'Centrafrique', country: 'CF', countryName: 'République centrafricaine',
    geo: { lat: 4.3947, lng: 18.5582 },
    heroImg: '/112245.webp',
    hero: "Capitale de la République centrafricaine, Bangui est une ville en reconstruction où ONG internationales, commerçants et entrepreneurs bâtissent l'économie de demain. Wendooka accompagne les organisations, entreprises et institutions de Bangui avec des sites internet professionnels et des stratégies digitales adaptées au contexte centrafricain.",
    market: [
      "Bangui concentre l'une des plus fortes densités d'ONG et d'agences internationales d'Afrique centrale. Ces organisations, engagées dans la reconstruction et l'aide au développement, ont un besoin critique de plateformes web crédibles et multilingues pour documenter leur action, mobiliser des financements et rendre compte à leurs bailleurs internationaux.",
      "Malgré un contexte exigeant, l'économie de Bangui se relève, portée par le commerce, l'exploitation forestière et les services. Commerçants et entrepreneurs cherchent à professionnaliser leur activité et à renouer des liens d'affaires avec des partenaires régionaux et internationaux — un objectif que sert directement une présence en ligne soignée.",
      "Située sur les rives de l'Oubangui, Bangui est une porte d'entrée fluviale vers la sous-région. Les acteurs du transport, du bois et du négoce qui animent ce commerce fluvial disposent d'un potentiel encore largement inexploité sur le plan numérique, faute d'outils web adaptés à leur activité.",
    ],
    sectors: [
      ['ONG et agences internationales', 'organisations humanitaires et agences de développement.'],
      ['Commerce et négoce', 'commerçants, distributeurs et importateurs.'],
      ['Bois et forêt', 'exploitants forestiers et acteurs de la filière bois.'],
      ['Transport fluvial', 'acteurs du commerce et de la logistique sur l\'Oubangui.'],
      ['Administration et institutions', 'services publics et structures para-publiques.'],
      ['Télécoms et services', 'opérateurs, prestataires numériques et sociétés de services.'],
      ['Santé', 'cliniques, centres de soins et structures médicales.'],
      ['Éducation', 'écoles, instituts et centres de formation.'],
    ],
    localFaq: {
      q: "Travaillez-vous avec les ONG et agences internationales basées à Bangui ?",
      a: "Oui. Nous concevons des plateformes web pour les ONG et agences internationales de Bangui : sites multilingues, présentation de programmes, espaces de documentation et reporting orientés bailleurs. Nous maîtrisons les attentes des organisations de développement en matière de crédibilité et de transparence digitale.",
    },
    langNote: false,
  },
];

// ─── Template HTML ───────────────────────────────────────────────────────────
const esc = (s) => s; // contenu de confiance (généré ici), dollar-quoté en SQL

function statCards() {
  return `<div class="not-prose grid grid-cols-2 gap-4 my-10">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6 text-center">
    <div class="text-4xl font-bold text-lime-accent font-poppins">150+</div>
    <div class="text-sm text-gray-400 mt-2">Projets livrés</div>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6 text-center">
    <div class="text-4xl font-bold text-lime-accent font-poppins">24h</div>
    <div class="text-sm text-gray-400 mt-2">Délai de réponse</div>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6 text-center">
    <div class="text-4xl font-bold text-lime-accent font-poppins">3–5</div>
    <div class="text-sm text-gray-400 mt-2">Jours de livraison</div>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6 text-center">
    <div class="text-4xl font-bold text-lime-accent font-poppins">5★</div>
    <div class="text-sm text-gray-400 mt-2">Note clients</div>
  </div>
</div>`;
}

// Sélection thématique par ville (3 réalisations + 2 témoignages), toutes distinctes
const SELECTION = {
  garoua:    { real: ['kubaru-sahel', 'bandiko-production', 'commune-ngaoundere-2'], test: ['eric', 'idrissou'] },
  maroua:    { real: ['mballen-ong', 'baladjikwata', 'kubaru-sahel'],                test: ['oumarou-mballen', 'eric'] },
  douala:    { real: ['abouscom', 'oumarousanda', 'sahel-consulting'],              test: ['hamidou', 'dewa'] },
  yaounde:   { real: ['sahel-consulting', 'commune-ngaoundere-2', 'oumarousanda'],  test: ['hamidou', 'idrissou'] },
  bafoussam: { real: ['abouscom', 'bandiko-production', 'barkantedjo'],             test: ['dewa', 'hamidou'] },
  ndjamena:  { real: ['kubaru-sahel', 'sahel-consulting', 'abouscom'],              test: ['eric', 'hamidou'] },
  bangui:    { real: ['mballen-ong', 'sahel-consulting', 'bandiko-production'],     test: ['oumarou-mballen', 'dewa'] },
};

function realisationsBlock(slugs) {
  const cards = slugs.map((s) => REAL_POOL[s]).map((r) => `  <a href="/realisations/${r.slug}" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="${r.img}" alt="${r.alt}" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">${r.name}</div>
      <div class="text-xs text-gray-400 mt-2">${r.tag}</div>
    </div>
  </a>`).join('\n');
  return `<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">\n${cards}\n</div>`;
}

function testimonialsBlock(ids) {
  const cards = ids.map((i) => TEST_POOL[i]).map((t) => `  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="${t.img}" alt="${t.alt}" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">${t.name}</div>
        <div class="text-xs text-lime-accent mt-1">${t.role}</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"${t.quote}"</p>
  </div>`).join('\n');
  return `<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">\n${cards}\n</div>`;
}

function otherCitiesBlock(currentSlug) {
  const all = [{ slug: 'ngaoundere', name: 'Ngaoundéré' }, ...CITIES.map((c) => ({ slug: c.slug, name: c.name }))];
  const items = all.filter((c) => c.slug !== currentSlug)
    .map((c) => `  <li><a href="/agence-web-${c.slug}" class="text-lime-accent hover:underline">Agence web à ${c.name}</a></li>`)
    .join('\n');
  return `<ul class="grid grid-cols-2 gap-3 mt-4">\n${items}\n</ul>`;
}

function servicesBlock(city) {
  return `<h3>Création de site web professionnel</h3>
<p>Un site web est votre commercial le plus disponible : actif 24h/24, il présente votre activité, crédibilise votre entreprise et capte des contacts pendant que vous travaillez. Chez Wendooka, nous concevons des sites sur mesure pour les entreprises de ${city.name}, optimisés pour le mobile — car la majorité de vos clients vous découvriront sur smartphone. Design, structure et appels à l'action sont pensés pour transformer vos visiteurs en clients réels.</p>

<h3>Référencement naturel SEO local</h3>
<p>Apparaître sur Google quand un client cherche votre activité à ${city.name}, c'est l'objectif du SEO local. Wendooka intègre dès la conception les bonnes pratiques : structure sémantique, métadonnées optimisées, vitesse de chargement, contenu riche et maillage interne. Nous travaillons aussi votre présence sur Google Maps et Google Business Profile pour capter les recherches géolocalisées, avec des rapports réguliers sur vos positions.</p>

<h3>Marketing digital et réseaux sociaux</h3>
<p>Facebook, WhatsApp Business, Instagram et TikTok sont les premiers canaux de communication des entreprises d'Afrique centrale. Nous construisons votre présence sur ces plateformes, créons des contenus adaptés à votre audience de ${city.name} et pilotons des campagnes publicitaires ciblées. Notre objectif : générer notoriété, contacts qualifiés et ventes — pas seulement des mentions "j'aime".</p>

<h3>Applications et outils digitaux sur-mesure</h3>
<p>La transformation digitale, c'est aussi automatiser les tâches chronophages. Wendooka déploie des solutions de prise de rendez-vous en ligne, de gestion des devis et factures, d'envoi automatique de notifications par SMS ou email, et d'intégration avec vos outils métier. Nous sélectionnons des solutions robustes, accessibles même sur des connexions internet variables.</p>

<h3>Maintenance et support technique</h3>
<p>Un site web nécessite un suivi régulier : mises à jour de sécurité, corrections, ajout de contenus, optimisation continue. Wendooka propose des contrats de maintenance mensuels adaptés à tous les budgets, avec un contact direct et une réponse rapide. La continuité de votre présence en ligne fait partie intégrante de notre service.</p>`;
}

function content(city) {
  const heroCtaImg = city.heroImg;
  const sectorsList = city.sectors.map(([t, d]) => `<li><strong>${t}</strong> : ${d}</li>`).join('\n');
  const marketParas = city.market.map((p) => `<p>${p}</p>`).join('\n\n');

  const langFaq = city.langNote
    ? `<h3>Peut-on créer un site en fulfulde ou dans une langue locale ?</h3>
<p>Oui. Wendooka propose des sites bilingues ou trilingues incluant le fulfulde, langue largement parlée dans le Grand Nord, pour permettre aux entreprises de ${city.name} de communiquer directement avec leur clientèle locale dans sa langue. C'est un atout différenciant fort pour le commerce, la santé et les structures communautaires.</p>`
    : `<h3>${city.localFaq.q}</h3>\n<p>${city.localFaq.a}</p>`;

  const extraFaq = city.langNote
    ? `<h3>${city.localFaq.q}</h3>\n<p>${city.localFaq.a}</p>`
    : '';

  return `
<div class="not-prose flex flex-col md:flex-row gap-8 items-center mb-12 mt-4">
  <div class="flex-1 min-w-0">
    <p class="text-lg text-gray-300 leading-relaxed">${city.hero}</p>
    <a href="/contact" class="inline-block mt-6 bg-lime-accent text-dark-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">Démarrer mon projet →</a>
  </div>
  <div class="w-full md:w-2/5 flex-shrink-0 overflow-hidden rounded-xl">
    <img src="${heroCtaImg}" alt="Wendooka, agence web à ${city.name} — création de sites internet professionnels" class="w-full h-64 object-cover object-center" width="480" height="256" />
  </div>
</div>

${statCards()}

<h2>Le digital à ${city.name} : opportunités et réalités</h2>

${marketParas}

<div class="not-prose flex flex-col md:flex-row gap-8 items-center bg-dark-gray border border-gray-700 rounded-2xl p-8 my-10">
  <div class="flex-shrink-0">
    <img src="/Oumarou%20Sanda%20CEO%20Wzndooka.webp" alt="Oumarou Sanda, fondateur de Wendooka" class="w-24 h-24 rounded-full object-cover object-top border-2 border-lime-accent" width="96" height="96" />
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-lg italic text-gray-300 leading-relaxed mb-3">"Nous concevons pour les entreprises d'Afrique centrale les mêmes outils digitaux de qualité que ceux des grandes métropoles — à des prix adaptés à notre réalité."</p>
    <div class="font-semibold text-white">Oumarou Sanda</div>
    <div class="text-sm text-lime-accent">Fondateur &amp; CEO, Wendooka</div>
  </div>
</div>

<h2>Nos services web à ${city.name}</h2>

${servicesBlock(city)}

<h2>Quelques réalisations Wendooka</h2>

${realisationsBlock(SELECTION[city.slug].real)}

<h2>Ce que disent nos clients</h2>

${testimonialsBlock(SELECTION[city.slug].test)}

<h2>Pourquoi choisir Wendooka à ${city.name} ?</h2>

<p><strong>Une expertise d'Afrique centrale, pas des recettes importées.</strong> Wendooka connaît les réalités du marché centre-africain : connexions mobiles variables, usage massif du smartphone, paiements Mobile Money, exigences des bailleurs internationaux. Nous concevons pour ${city.name} des solutions qui fonctionnent vraiment sur le terrain, pas des maquettes calibrées pour d'autres marchés.</p>

<p><strong>Un rapport qualité/prix pensé pour les entrepreneurs africains.</strong> Nos tarifs reflètent la valeur concrète que nous apportons à votre activité, pas des honoraires calibrés pour l'Europe. Un site Wendooka n'est pas une dépense : c'est un investissement rentable qui génère contacts et contrats bien au-delà de son coût. Nous proposons des paiements échelonnés pour les projets d'envergure.</p>

<p><strong>Un accompagnement dans la durée.</strong> Nous ne livrons pas un site avant de disparaître. Après le lancement, nous analysons vos statistiques, identifions des axes d'amélioration et faisons évoluer vos outils avec votre croissance. Vous avez un partenaire numérique de confiance, pas un simple prestataire technique.</p>

<div class="not-prose my-10 overflow-hidden rounded-xl">
  <img src="/125484.webp" alt="Équipe Wendooka au travail pour les entreprises de ${city.name}" class="w-full h-48 object-cover object-center" width="800" height="192" />
</div>

<h2>Les secteurs que nous accompagnons à ${city.name}</h2>

<p>Wendooka intervient auprès d'une grande variété d'acteurs économiques à ${city.name} :</p>

<ul>
${sectorsList}
</ul>

<h2>Comment nous travaillons avec vous</h2>

<p>Notre processus est transparent, structuré et orienté résultats :</p>

<p><strong>Étape 1 — Consultation gratuite.</strong> Une conversation sans engagement pour comprendre votre activité, vos objectifs et votre budget. En présentiel, par téléphone ou via WhatsApp.</p>

<p><strong>Étape 2 — Stratégie et proposition.</strong> Une proposition détaillée : stratégie, livrables, calendrier et grille tarifaire. Vous savez exactement ce que vous payez, sans surprise.</p>

<p><strong>Étape 3 — Développement et création.</strong> Nous développons selon le cahier des charges validé, avec des points d'étape réguliers et votre validation à chaque étape clé.</p>

<p><strong>Étape 4 — Lancement et suivi.</strong> Mise en ligne, formation à la gestion autonome et rapport complet à 30 jours avec les premiers résultats et les pistes d'optimisation.</p>

<h2>Questions fréquentes — Agence web à ${city.name}</h2>

<h3>Combien coûte la création d'un site web à ${city.name} ?</h3>
<p>Le coût dépend de la complexité, du nombre de pages et des fonctionnalités (boutique, réservation, espace membre) et du niveau d'optimisation SEO. Wendooka propose des solutions pour tous les budgets, du site vitrine essentiel à la plateforme e-commerce complète. Contactez-nous pour un devis gratuit et personnalisé, sans engagement.</p>

<h3>Wendooka peut-il travailler à distance avec un client à ${city.name} ?</h3>
<p>Absolument. Notre équipe collabore quotidiennement à distance avec des clients dans toute l'Afrique centrale — Ngaoundéré, Garoua, Douala, Yaoundé, N'Djamena, Bangui — via WhatsApp, appels vidéo et outils de gestion de projet en ligne. La distance n'a jamais empêché un projet de réussir chez Wendooka.</p>

<h3>Quel délai faut-il compter pour créer un site web professionnel ?</h3>
<p>Pour un site vitrine standard de 5 à 8 pages, comptez généralement entre 3 et 5 jours depuis la validation de la proposition jusqu'à la mise en ligne, à condition de nous fournir rapidement vos contenus. Pour des projets plus complexes comme une boutique en ligne, un portail institutionnel ou une application web, le délai s'étend généralement de 2 à 6 semaines.</p>

<h3>Proposez-vous des services après la livraison ?</h3>
<p>Oui. Wendooka propose des contrats de maintenance mensuels incluant mises à jour de sécurité, sauvegardes, modifications de contenu et support prioritaire, ainsi que des services d'optimisation continue (SEO, nouvelles pages, nouveaux outils).</p>

${langFaq}

${extraFaq}

<h2>Lancez votre projet web à ${city.name} avec Wendooka</h2>

<p>Chaque jour sans présence web, c'est un client qui vous cherche sur Google et trouve votre concurrent. Wendooka est prête à devenir votre partenaire numérique de confiance à ${city.name} : nous connaissons votre marché et nous livrons des résultats mesurables. Contactez-nous dès aujourd'hui pour une consultation gratuite.</p>

<div class="text-center my-10">
  <a href="/contact" class="bg-lime-accent text-dark-black font-bold py-4 px-8 rounded-lg inline-block hover:opacity-90 transition-opacity">Demander un devis gratuit</a>
</div>

<h2>Wendooka dans d'autres villes</h2>

<p>Wendooka accompagne les entreprises dans toute l'Afrique centrale. Découvrez nos offres dans les autres villes :</p>

${otherCitiesBlock(city.slug)}
`;
}

function schema(city) {
  const svc = (name, desc) => ({
    '@context': 'https://schema.org', '@type': 'Service', name,
    provider: { '@type': 'LocalBusiness', name: 'Wendooka' },
    areaServed: city.name, description: desc,
  });
  const arr = [
    {
      '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Wendooka',
      url: 'https://wendooka.com', telephone: '+237672051289', email: 'contact@wendooka.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Ngaoundéré', addressRegion: 'Adamaoua', addressCountry: 'CM' },
      areaServed: city.name, priceRange: 'FCFA',
      description: `Agence web intervenant à ${city.name} (${city.countryName}) : création de sites internet professionnels, référencement SEO local et marketing digital pour les entreprises d'Afrique centrale.`,
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: `Combien coûte la création d'un site web à ${city.name} ?`, acceptedAnswer: { '@type': 'Answer', text: `Le coût dépend de la complexité du projet. Wendooka propose des solutions pour tous les budgets, du site vitrine à la plateforme e-commerce. Contactez-nous pour un devis gratuit et personnalisé, sans engagement.` } },
        { '@type': 'Question', name: `Wendooka peut-il travailler à distance avec un client à ${city.name} ?`, acceptedAnswer: { '@type': 'Answer', text: `Oui, Wendooka collabore à distance avec des clients dans toute l'Afrique centrale via WhatsApp, appels vidéo et outils de gestion de projet en ligne.` } },
        { '@type': 'Question', name: `Quel délai faut-il pour créer un site web professionnel ?`, acceptedAnswer: { '@type': 'Answer', text: `Pour un site vitrine de 5 à 8 pages, comptez 3 à 5 jours. Pour des projets complexes comme une boutique en ligne ou un portail institutionnel, le délai s'étend généralement de 2 à 6 semaines.` } },
        { '@type': 'Question', name: city.localFaq.q, acceptedAnswer: { '@type': 'Answer', text: city.localFaq.a } },
      ],
    },
    svc('Création de site web professionnel', `Conception de sites internet sur mesure pour les entreprises de ${city.name}, optimisés mobile, rapides et axés sur la conversion.`),
    svc('Référencement naturel SEO local', `Optimisation SEO locale pour positionner votre site sur Google à ${city.name}, incluant Google Business Profile et maillage interne.`),
    svc('Marketing digital et réseaux sociaux', `Gestion des réseaux sociaux, création de contenus et campagnes publicitaires ciblées pour les entreprises de ${city.name}.`),
    svc('Applications et outils digitaux', `Déploiement de solutions d'automatisation : prise de rendez-vous, gestion des devis, notifications et intégrations métier pour ${city.name}.`),
    svc('Maintenance et support technique', `Contrats de maintenance mensuels pour la sécurité, les performances et l'évolution de votre site web à ${city.name}.`),
  ];
  return JSON.stringify(arr, null, 2);
}

function insertSql(city) {
  const title = `Agence Web à ${city.name} — Wendooka crée votre présence digitale`;
  const seoTitle = `Agence Web ${city.name} — Création de Site & Marketing Digital | Wendooka`;
  const metaDesc = `Wendooka à ${city.name} : création de sites web, SEO local et marketing digital adaptés au marché d'Afrique centrale. Devis gratuit, réponse sous 24h.`;
  const canonical = `https://wendooka.com/agence-web-${city.slug}`;
  return `-- ${city.name}
INSERT INTO public.pages (title, slug, content, status, seo_title, meta_description, canonical_url, schema_markup, user_id)
VALUES (
  $title$${title}$title$,
  $slug$agence-web-${city.slug}$slug$,
  $content$${content(city)}$content$,
  'published',
  $seo$${seoTitle}$seo$,
  $meta$${metaDesc}$meta$,
  $canon$${canonical}$canon$,
  $schema$${schema(city)}$schema$,
  (SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1)
)
ON CONFLICT (slug) DO UPDATE SET
  title            = EXCLUDED.title,
  content          = EXCLUDED.content,
  status           = EXCLUDED.status,
  seo_title        = EXCLUDED.seo_title,
  meta_description = EXCLUDED.meta_description,
  canonical_url    = EXCLUDED.canonical_url,
  schema_markup    = EXCLUDED.schema_markup,
  updated_at       = now();`;
}

// ─── Écriture ────────────────────────────────────────────────────────────────
const header = `-- ============================================================
-- LANDING PAGES SEO — Villes Afrique centrale (généré par scripts/generate-city-pages.mjs)
-- Prérequis : exécuter database/migration_seo_pages.sql d'abord
-- Chaque page a un contenu économique unique (évite le duplicate content).
-- ============================================================\n\n`;

const combined = header + CITIES.map(insertSql).join('\n\n');
writeFileSync(resolve(__dirname, '../database/landing_pages_villes.sql'), combined, 'utf-8');

for (const city of CITIES) {
  const single = `-- ============================================================
-- LANDING PAGE SEO — Agence Web ${city.name}
-- Prérequis : database/migration_seo_pages.sql
-- ============================================================\n\n${insertSql(city)}\n`;
  writeFileSync(resolve(__dirname, `../database/landing_page_${city.slug}.sql`), single, 'utf-8');
}

// ─── Patch DB : remplace les anciens blocs (identiques sur les 7 villes) ──────
// Blocs OLD = exactement ce qui est en base (générés par la 1re version).
const OLD_REAL_OBJS = [
  { slug: 'commune-ngaoundere-2', img: '/commune%20ngaoundere%202%20Home.webp', alt: 'Site web Commune de Ngaoundéré 2e réalisé par Wendooka', name: 'Commune de Ngaoundéré 2e', tag: 'Site institutionnel · Cameroun' },
  { slug: 'mballen-ong',          img: '/Mballen%20Homepage%20.webp',           alt: 'Site web ONG MBALLEN réalisé par Wendooka',           name: 'MBALLEN ONG',            tag: 'Site associatif · Cameroun' },
  { slug: 'sahel-consulting',     img: '/Sahel%20consulting%20home.webp',       alt: 'Site web Sahel Consulting réalisé par Wendooka',       name: 'Sahel Consulting',       tag: 'Site corporate · Cameroun' },
];
const OLD_TEST_OBJS = [
  { img: '/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp', alt: 'Idrissou Abana, Commune de Ngaoundéré 2e', name: 'Idrissou Abana', role: 'Commune de Ngaoundéré 2e', quote: 'Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire.' },
  { img: '/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg', alt: 'Oumarou Sanda Aboubakar, directeur MBALLEN ONG', name: 'Oumarou Sanda Aboubakar', role: 'Directeur, MBALLEN ONG', quote: 'Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement.' },
];

const realBlockFromObjs = (objs) => `<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">\n` + objs.map((r) => `  <a href="/realisations/${r.slug}" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="${r.img}" alt="${r.alt}" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">${r.name}</div>
      <div class="text-xs text-gray-400 mt-2">${r.tag}</div>
    </div>
  </a>`).join('\n') + `\n</div>`;

const testBlockFromObjs = (objs) => `<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">\n` + objs.map((t) => `  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="${t.img}" alt="${t.alt}" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">${t.name}</div>
        <div class="text-xs text-lime-accent mt-1">${t.role}</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"${t.quote}"</p>
  </div>`).join('\n') + `\n</div>`;

const OLD_REAL_BLOCK = realBlockFromObjs(OLD_REAL_OBJS);
const OLD_TEST_BLOCK = testBlockFromObjs(OLD_TEST_OBJS);

const patches = CITIES.map((city) => {
  const sel = SELECTION[city.slug];
  const newReal = realisationsBlock(sel.real);
  const newTest = testimonialsBlock(sel.test);
  return `-- ${city.name}
UPDATE public.pages SET content = replace(replace(content,
  $oldr$${OLD_REAL_BLOCK}$oldr$, $newr$${newReal}$newr$),
  $oldt$${OLD_TEST_BLOCK}$oldt$, $newt$${newTest}$newt$),
  updated_at = now()
WHERE slug = 'agence-web-${city.slug}';`;
}).join('\n\n');

writeFileSync(resolve(__dirname, '../database/update_city_examples.sql'),
  `-- Patch : diversifie réalisations + témoignages par ville (généré)\n\n${patches}\n`, 'utf-8');

console.log(`✅ ${CITIES.length} pages villes générées + database/update_city_examples.sql (patch DB)`);
for (const c of CITIES) console.log(`   ├─ ${c.slug} : real=[${SELECTION[c.slug].real.join(', ')}] test=[${SELECTION[c.slug].test.join(', ')}]`);
