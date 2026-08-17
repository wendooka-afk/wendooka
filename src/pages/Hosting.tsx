import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import {
  Server,
  ShieldCheck,
  DatabaseBackup,
  Mail,
  Gauge,
  MoveRight,
  Headphones,
  Code2,
  Smartphone,
  Check,
  X,
  ArrowRight,
  CreditCard,
  Settings2,
  PhoneOff,
  FileWarning,
} from 'lucide-react';
import { applySeo, breadcrumbLd, faqLd, SITE } from '@/lib/seo';

const PLANS = [
  {
    name: 'Starter',
    price: '6 500',
    tagline: 'Le site vitrine qui doit tourner sans faille',
    highlighted: false,
    features: [
      '1 site web',
      '10 Go de stockage NVMe',
      '1 vCPU + 2 Go de RAM garantis',
      '1 adresse email professionnelle',
      'Certificat SSL inclus et renouvelé',
      'Sauvegarde quotidienne',
      'Migration gratuite depuis votre hébergeur',
    ],
  },
  {
    name: 'Business',
    price: '15 000',
    tagline: 'Pour les e-commerces et les sites à trafic réel',
    highlighted: true,
    features: [
      "Jusqu'à 5 sites web",
      '40 Go de stockage NVMe',
      '2 vCPU + 4 Go de RAM garantis',
      '10 adresses email professionnelles',
      'Environnement de préproduction',
      'Sauvegarde quotidienne + restauration à la demande',
      'Support prioritaire WhatsApp',
    ],
  },
  {
    name: 'Pro',
    price: '35 000',
    tagline: 'Agences, développeurs et projets multi-marques',
    highlighted: false,
    features: [
      "Jusqu'à 15 sites web",
      '100 Go de stockage NVMe',
      '4 vCPU + 8 Go de RAM garantis',
      'Adresses email illimitées',
      'Environnements de préproduction illimités',
      'Sauvegarde quotidienne + rétention 30 jours',
      'Interlocuteur technique dédié',
    ],
  },
];

const COMPARISON = [
  { criterion: 'Ressources serveur', shared: 'Partagées avec des centaines de sites', vps: 'vCPU et RAM garantis, réservés à vous' },
  { criterion: 'Effet « voisin bruyant »', shared: 'Un site voisin piraté ou saturé ralentit le vôtre', vps: 'Environnement isolé : ce qui arrive aux autres ne vous touche pas' },
  { criterion: 'Pics de trafic', shared: 'Site bloqué ou coupé au moment où ça compte', vps: 'Ressources montées à la demande, sans interruption' },
  { criterion: 'Stockage', shared: 'Disques mécaniques ou SSD partagés', vps: 'NVMe, jusqu’à 6 fois plus rapide qu’un SSD classique' },
  { criterion: 'Email professionnel', shared: 'Souvent en option payante', vps: 'Inclus dès le premier plan' },
  { criterion: 'Sauvegardes', shared: 'Hebdomadaires, parfois payantes à restaurer', vps: 'Quotidiennes et incluses' },
  { criterion: 'Support', shared: 'Ticket en anglais, réponse sous plusieurs jours', vps: 'Équipe camerounaise, WhatsApp, réponse sous 24h' },
  { criterion: 'Migration', shared: 'À votre charge', vps: 'Prise en charge gratuitement par nos équipes' },
];

const BLOCKERS = [
  {
    icon: CreditCard,
    pain: "Votre carte bancaire est refusée au moment de payer",
    painDetail:
      "La plupart des hébergeurs internationaux n'acceptent que la carte de crédit. Vous n'en avez pas, ou elle est plafonnée, ou le paiement en devise est bloqué par votre banque. Résultat : vous renoncez, ou vous demandez à un proche de payer pour vous chaque mois.",
    solution:
      "Vous payez en FCFA par Orange Money ou MTN Mobile Money, depuis votre téléphone, en trente secondes. Facture locale à votre nom, utilisable en comptabilité. Aucune carte, aucun compte à l'étranger.",
  },
  {
    icon: Settings2,
    pain: "L'infrastructure vous demande des compétences que vous n'avez pas",
    painDetail:
      "Zone DNS, enregistrements MX, versions de PHP, certificats à renouveler, permissions de fichiers, redirections 301, cron. Vous vouliez un site pour votre activité, pas un second métier d'administrateur système. Un paramètre mal réglé et le site tombe, ou les emails n'arrivent plus.",
    solution:
      "Nous configurons tout, et nous continuons de l'exploiter. Vous n'ouvrez jamais un panneau technique si vous ne le souhaitez pas. Vous nous dites ce que vous voulez, nous le faisons.",
  },
  {
    icon: PhoneOff,
    pain: "Quand ça casse, il n'y a personne au bout du fil",
    painDetail:
      "Le site tombe un vendredi soir. Vous ouvrez un ticket en anglais chez un hébergeur à 5 000 km, sur un autre fuseau horaire. La réponse arrive deux jours plus tard et vous demande de faire vous-même la manipulation. Pendant ce temps, vos clients voient une page blanche.",
    solution:
      "Vous nous écrivez sur WhatsApp, en français. Une équipe basée à Ngaoundéré, qui connaît votre site parce qu'elle l'exploite. Réponse sous 24h, et bien plus vite sur incident bloquant.",
  },
  {
    icon: FileWarning,
    pain: "Vous découvrez la suspension après coup",
    painDetail:
      "Un renouvellement automatique échoue, un nom de domaine expire, et le site disparaît sans prévenir. Vous l'apprenez par un client qui n'arrive plus à vous joindre. Remettre tout en ligne coûte alors du temps et parfois des frais de réactivation.",
    solution:
      "Nous surveillons les échéances de votre hébergement et de votre nom de domaine, et nous vous prévenons avant. Rien ne s'arrête à votre insu.",
  },
];

const FULL_SERVICE = [
  "Nous concevons et développons votre site ou votre application",
  "Nous achetons et configurons votre nom de domaine",
  "Nous l'hébergeons sur notre infrastructure cloud et le mettons en ligne",
  "Nous créons vos adresses email professionnelles et les branchons sur votre téléphone",
  "Nous assurons les mises à jour, les sauvegardes et la sécurité dans la durée",
  "Nous formons votre équipe à mettre à jour ses contenus elle-même",
];

const INCLUDED = [
  { icon: Server, title: 'Ressources garanties', text: 'vCPU et RAM réservés à votre environnement. Aucun partage silencieux, aucune surprise en période de pointe.' },
  { icon: Mail, title: 'Email professionnel inclus', text: 'contact@votredomaine.com dès le plan Starter, sans surcoût. Crédibilité immédiate auprès de vos clients et partenaires.' },
  { icon: ShieldCheck, title: 'SSL automatique', text: 'Certificat installé, renouvelé et surveillé pour vous. Votre site affiche le cadenas en permanence.' },
  { icon: DatabaseBackup, title: 'Sauvegardes quotidiennes', text: 'Une copie complète chaque jour. En cas de fausse manipulation ou de piratage, on remonte votre site.' },
  { icon: Gauge, title: 'Infrastructure haute disponibilité', text: 'Datacenters européens de niveau Tier III, conçus pour un taux de disponibilité de 99,9%, avec supervision continue.' },
  { icon: MoveRight, title: 'Migration gratuite', text: 'Vous êtes déjà hébergé ailleurs ? On transfère fichiers, base de données et emails. Sans coupure visible.' },
  { icon: Code2, title: 'Toutes les stacks modernes', text: 'PHP, WordPress, Node.js, Python, Laravel, applications React ou Next.js. Votre projet tourne, quel que soit son socle.' },
  { icon: Smartphone, title: 'Paiement Mobile Money', text: 'Orange Money et MTN MoMo acceptés. Pas de carte bancaire internationale à sortir chaque mois.' },
  { icon: Headphones, title: 'Support en français', text: 'Une équipe basée au Cameroun, joignable par WhatsApp et téléphone. Qui comprend votre contexte et vos contraintes.' },
];

const AUDIENCES = [
  { title: 'PME et sites vitrines', text: 'Votre site est votre premier commercial. Il doit charger vite depuis un téléphone en 3G et rester en ligne quand un prospect vous cherche à 22h.' },
  { title: 'E-commerces', text: 'Un panier abandonné parce que le site rame, c’est une vente perdue. Les ressources garanties absorbent vos pics de commandes.' },
  { title: 'ONG et institutions', text: 'Rapports en ligne, portails citoyens, plateformes de projet : des contenus lourds, un public dispersé, une exigence de continuité.' },
  { title: 'Agences et développeurs', text: 'Hébergez les sites de vos clients sous un seul plan Pro, avec préproduction et facturation unique. Vous revendez, nous opérons.' },
];

const MIGRATION_STEPS = [
  { step: '01', title: 'Vous nous donnez les accès', text: 'Accès à votre hébergement actuel et à votre nom de domaine. Cinq minutes de votre temps, pas plus.' },
  { step: '02', title: 'Nous copions tout', text: 'Fichiers, base de données, boîtes email, certificats. Votre site est reconstruit à l’identique sur nos serveurs et testé avant bascule.' },
  { step: '03', title: 'On bascule hors des heures de pointe', text: 'Le changement DNS se fait la nuit. Vos visiteurs ne voient rien, votre ancien hébergement reste actif en secours 7 jours.' },
];

const FAQS = [
  {
    question: "Quelle est la différence entre un hébergement mutualisé et un cloud VPS ?",
    answer: "En mutualisé, des centaines de sites se partagent le même serveur : si l'un d'eux sature ou se fait pirater, tous les autres ralentissent. Un cloud VPS vous attribue des ressources garanties (vCPU, RAM, stockage NVMe) dans un environnement isolé. Votre site ne dépend plus du comportement des autres.",
  },
  {
    question: "Combien coûte un hébergement web au Cameroun chez Wendooka ?",
    answer: "Nos plans cloud VPS démarrent à 6 500 FCFA par mois et par site, avec 10 Go de stockage NVMe, une adresse email professionnelle, le certificat SSL et les sauvegardes quotidiennes inclus. Le plan Business est à 15 000 FCFA par mois pour 5 sites, et le plan Pro à 35 000 FCFA par mois pour 15 sites.",
  },
  {
    question: "La migration depuis mon hébergeur actuel est-elle vraiment gratuite ?",
    answer: "Oui, sur tous les plans. Nous transférons vos fichiers, votre base de données et vos boîtes email, nous testons le site sur nos serveurs, puis nous basculons le DNS en dehors des heures de pointe. Votre ancien hébergement reste actif 7 jours en secours.",
  },
  {
    question: "Puis-je payer par Orange Money ou MTN Mobile Money ?",
    answer: "Oui. Orange Money et MTN Mobile Money sont acceptés pour tous les plans d'hébergement, en paiement mensuel ou annuel. Aucune carte bancaire internationale n'est nécessaire.",
  },
  {
    question: "Je n'ai pas de carte bancaire internationale, puis-je quand même être hébergé ?",
    answer:
      "Oui. C'est justement le blocage principal que nous levons. Vous réglez votre hébergement en FCFA par Orange Money ou MTN Mobile Money depuis votre téléphone, et vous recevez une facture locale à votre nom, utilisable en comptabilité. Aucune carte de crédit ni compte bancaire à l'étranger n'est nécessaire.",
  },
  {
    question: "Je n'y connais rien en technique, qui va configurer mon hébergement ?",
    answer:
      "Nous nous en chargeons entièrement : nom de domaine, zone DNS, mise en ligne du site, certificat SSL, adresses email professionnelles, sauvegardes et mises à jour. Wendooka développe des sites web et les héberge, donc vous n'avez qu'un seul interlocuteur pour l'ensemble du projet. Vous n'ouvrez jamais un panneau technique si vous ne le souhaitez pas.",
  },
  {
    question: "Où sont situés vos serveurs et quel est l'impact sur la vitesse ?",
    answer: "Nos serveurs sont hébergés dans des datacenters européens de niveau Tier III. Combinés au stockage NVMe et à la mise en cache, ils délivrent des temps de chargement inférieurs à ceux de la plupart des hébergements mutualisés proposés localement.",
  },
  {
    question: "Que se passe-t-il si mon site est piraté ou si je fais une erreur ?",
    answer: "Une sauvegarde complète de votre site est réalisée chaque jour. Vous nous signalez le problème, nous restaurons la version saine la plus récente. Sur les plans Business et Pro, la restauration est disponible à la demande sans frais.",
  },
];

const HostingPage: React.FC = () => {
  React.useEffect(() => {
    applySeo({
      title: "Hébergement web VPS Cloud au Cameroun dès 6 500 FCFA/mois | Wendooka",
      description:
        "Hébergement cloud VPS pour sites web au Cameroun : ressources garanties, email professionnel inclus, SSL, sauvegardes quotidiennes et migration gratuite. À partir de 6 500 FCFA/mois.",
      canonical: "/hebergement-web-cameroun",
      jsonLd: [
        breadcrumbLd([
          { name: 'Accueil', path: '/' },
          { name: 'Hébergement web', path: '/hebergement-web-cameroun' },
        ]),
        faqLd(FAQS.map((f) => ({ question: f.question, answer: f.answer }))),
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Hébergement web Cloud VPS Wendooka',
          description:
            "Hébergement cloud VPS pour sites web professionnels au Cameroun : ressources serveur garanties, stockage NVMe, email professionnel, SSL et sauvegardes quotidiennes inclus.",
          brand: { '@type': 'Brand', name: SITE.name },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'XAF',
            lowPrice: '6500',
            highPrice: '35000',
            offerCount: '3',
            availability: 'https://schema.org/InStock',
            url: `${SITE.url}/hebergement-web-cameroun`,
          },
        },
      ],
    });
  }, []);

  return (
    <div className="bg-dark-black text-white">
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative py-24 md:py-36 bg-cover bg-center"
          style={{ backgroundImage: `url('/271248.webp')` }}
        >
          <div className="absolute inset-0 bg-dark-black/90 z-0"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block bg-lime-accent/10 border border-lime-accent/40 text-lime-accent text-sm font-bold px-4 py-2 rounded-full mb-6">
              Cloud VPS - pas de mutualisé, jamais
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 max-w-4xl mx-auto leading-tight">
              Hébergement cloud VPS sur serveurs européens, dès 6 500 FCFA par mois
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light mb-10">
              Des ressources serveur réservées à votre site, une adresse email professionnelle incluse,
              des sauvegardes quotidiennes, le paiement par Mobile Money et une équipe qui répond en
              français. Nous ne vendons pas d'hébergement mutualisé : votre site ne partagera jamais son
              sort avec 300 autres.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 bg-lime-accent text-dark-black font-bold py-4 px-8 rounded-full hover:opacity-90 transition-opacity"
              >
                Voir les plans <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-gray-600 text-white font-bold py-4 px-8 rounded-full hover:border-lime-accent hover:text-lime-accent transition-colors"
              >
                Migrer mon site gratuitement
              </Link>
            </div>
          </div>
        </section>

        {/* Barre de réassurance */}
        <section className="border-y border-gray-800 bg-dark-gray/30">
          <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-800">
            {[
              { value: '99,9%', label: 'Disponibilité visée' },
              { value: 'NVMe', label: 'Stockage haute vitesse' },
              { value: 'Chaque jour', label: 'Sauvegarde automatique' },
              { value: '24h', label: 'Délai de réponse support' },
            ].map((item) => (
              <div key={item.label} className="py-8 px-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-lime-accent font-poppins">{item.value}</div>
                <div className="text-sm text-gray-400 mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Le problème */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-8">
              Votre site ne rame pas par hasard
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                La quasi-totalité des sites camerounais tournent sur de l'hébergement mutualisé. Le principe :
                entasser plusieurs centaines de sites sur une seule machine et espérer qu'aucun ne consomme
                trop. Tant que tout va bien, personne ne le remarque.
              </p>
              <p>
                Le problème apparaît exactement au mauvais moment. Un site voisin lance une campagne, se fait
                pirater ou exécute une requête lourde, et c'est votre page produit qui met huit secondes à
                s'afficher. Le jour de votre promotion, quand vos publicités tournent, quand un bailleur
                consulte votre plateforme. Vous payez pour un service dont la performance dépend d'inconnus.
              </p>
              <p className="text-white font-medium">
                Un cloud VPS supprime la cause, pas le symptôme : vos ressources sont réservées, votre
                environnement est isolé. Ce qui arrive aux autres ne vous concerne plus.
              </p>
            </div>
          </div>
        </section>

        {/* Blocages concrets - douleur → solution */}
        <section className="py-20 md:py-28 bg-dark-gray/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
                Les quatre blocages qui vous ont fait repousser ce projet
              </h2>
              <p className="text-lg text-gray-400">
                Ce ne sont presque jamais des questions de prix. Ce sont des murs pratiques que les
                hébergeurs internationaux n'ont jamais cherché à lever. Nous les avons levés un par un.
              </p>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              {BLOCKERS.map((item) => (
                <div
                  key={item.pain}
                  className="bg-dark-black border border-gray-800 rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-8 md:gap-12"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-full p-3 shrink-0">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                        Le blocage
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-poppins mb-4 leading-snug">
                      {item.pain}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{item.painDetail}</p>
                  </div>

                  <div className="md:border-l md:border-gray-800 md:pl-12">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="bg-lime-accent text-dark-black rounded-full p-3 shrink-0">
                        <Check className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-lime-accent">
                        Chez Wendooka
                      </span>
                    </div>
                    <p className="text-lg text-gray-200 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tableau comparatif */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
                Mutualisé classique contre cloud VPS Wendooka
              </h2>
              <p className="text-lg text-gray-400">
                Le même site, deux infrastructures. La différence se voit sur la facture des ventes perdues,
                pas sur celle de l'hébergement.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-800">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="bg-dark-black">
                    <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wide">Critère</th>
                    <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wide">
                      Hébergement mutualisé
                    </th>
                    <th className="p-5 text-sm font-bold text-lime-accent uppercase tracking-wide">
                      Cloud VPS Wendooka
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {COMPARISON.map((row) => (
                    <tr key={row.criterion} className="bg-dark-black/40">
                      <td className="p-5 font-bold text-white align-top">{row.criterion}</td>
                      <td className="p-5 text-gray-400 align-top">
                        <span className="flex gap-3">
                          <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                          {row.shared}
                        </span>
                      </td>
                      <td className="p-5 text-gray-200 align-top">
                        <span className="flex gap-3">
                          <Check className="h-5 w-5 text-lime-accent shrink-0 mt-0.5" />
                          {row.vps}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="py-20 md:py-28 scroll-mt-24 bg-dark-gray/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
                Nos plans d'hébergement cloud
              </h2>
              <p className="text-lg text-gray-400">
                Tarifs mensuels, sans engagement de durée. Email professionnel, SSL, sauvegardes et migration
                inclus dans chaque plan. Paiement Orange Money et MTN MoMo.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-3xl p-8 border flex flex-col h-full ${
                    plan.highlighted
                      ? 'bg-dark-gray border-lime-accent relative md:-mt-4 md:pb-12 shadow-2xl'
                      : 'bg-dark-gray/40 border-gray-800'
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-lime-accent text-dark-black text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap">
                      Le plus choisi
                    </span>
                  )}
                  <h3 className="text-2xl font-bold font-poppins mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 min-h-[40px]">{plan.tagline}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold font-poppins text-lime-accent">{plan.price}</span>
                    <span className="text-gray-400 text-sm"> FCFA / mois</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-gray-300">
                        <Check className="h-5 w-5 text-lime-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`block text-center font-bold py-4 px-6 rounded-full transition-opacity hover:opacity-90 ${
                      plan.highlighted
                        ? 'bg-lime-accent text-dark-black'
                        : 'border border-gray-600 text-white hover:border-lime-accent hover:text-lime-accent'
                    }`}
                  >
                    Choisir {plan.name}
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 mt-10 max-w-2xl mx-auto">
              Besoin de plus de ressources, d'un serveur dédié ou d'une architecture sur-mesure ?{' '}
              <Link to="/contact" className="text-lime-accent hover:underline">
                Demandez un devis personnalisé
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Service complet : site + hébergement */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center max-w-6xl mx-auto">
              <div>
                <span className="inline-block bg-lime-accent/10 border border-lime-accent/40 text-lime-accent text-sm font-bold px-4 py-2 rounded-full mb-6">
                  Le site et l'hébergement, chez le même prestataire
                </span>
                <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6 leading-tight">
                  Vous n'avez pas à devenir administrateur système
                </h2>
                <div className="space-y-5 text-lg text-gray-300 leading-relaxed">
                  <p>
                    La plupart des porteurs de projet se retrouvent à jongler entre trois interlocuteurs :
                    un développeur qui livre des fichiers, un vendeur de nom de domaine, un hébergeur
                    étranger. Chacun renvoie la faute aux deux autres dès que quelque chose ne marche pas,
                    et c'est vous qui faites le lien, sans en avoir les compétences.
                  </p>
                  <p className="text-white font-medium">
                    Wendooka fait les deux métiers. Nous construisons le site et nous l'exploitons. Un seul
                    contrat, un seul numéro à appeler, une seule équipe responsable du résultat.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-8 bg-lime-accent text-dark-black font-bold py-4 px-8 rounded-full hover:opacity-90 transition-opacity"
                >
                  Confier mon projet de A à Z <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="bg-dark-gray border border-gray-800 rounded-3xl p-8 md:p-10">
                <h3 className="text-xl font-bold font-poppins mb-8">Ce que nous prenons en charge</h3>
                <ul className="space-y-5">
                  {FULL_SERVICE.map((item) => (
                    <li key={item} className="flex gap-4 text-gray-300 leading-relaxed">
                      <Check className="h-6 w-6 text-lime-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 text-sm mt-8 pt-8 border-t border-gray-800">
                  Vous avez déjà un site développé ailleurs ? Nous l'hébergeons aussi, et nous prenons la
                  migration en charge gratuitement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inclus */}
        <section className="py-20 md:py-28 bg-dark-gray/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
                Inclus dans tous les plans, sans option cachée
              </h2>
              <p className="text-lg text-gray-400">
                Ce que la plupart des hébergeurs facturent en supplément fait partie du prix affiché.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INCLUDED.map((item) => (
                <div
                  key={item.title}
                  className="bg-dark-black border border-gray-800 rounded-2xl p-8 hover:border-lime-accent transition-colors"
                >
                  <div className="bg-lime-accent text-dark-black rounded-full p-3 w-fit mb-5">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-poppins mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pour qui */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-14 text-center">
              Conçu pour les projets qui n'ont pas droit à la panne
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {AUDIENCES.map((audience) => (
                <div key={audience.title} className="border-l-2 border-lime-accent pl-6 py-2">
                  <h3 className="text-2xl font-bold font-poppins mb-3">{audience.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{audience.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Migration */}
        <section className="py-20 md:py-28 bg-dark-gray/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
                Déjà hébergé ailleurs ? On s'occupe du transfert
              </h2>
              <p className="text-lg text-gray-400">
                Changer d'hébergeur fait peur parce qu'on craint de casser son site. Nous le faisons à votre
                place, gratuitement, sans coupure visible pour vos visiteurs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {MIGRATION_STEPS.map((item) => (
                <div key={item.step} className="bg-dark-black border border-gray-800 rounded-2xl p-8">
                  <div className="text-5xl font-bold font-poppins text-lime-accent/30 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold font-poppins mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-14 text-center">
              Questions fréquentes sur l'hébergement web
            </h2>
            <div className="space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.question} className="bg-dark-gray/40 border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold font-poppins mb-4">{faq.question}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="bg-lime-accent text-dark-black rounded-3xl p-10 md:p-16 text-center max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
                Mettez votre site sur une infrastructure qui tient
              </h2>
              <p className="text-lg md:text-xl mb-10 font-medium max-w-2xl mx-auto">
                Dites-nous quel site vous voulez héberger. Nous vous répondons sous 24h avec le plan adapté et
                nous prenons la migration en charge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-dark-black text-white font-bold py-4 px-8 rounded-full hover:opacity-90 transition-opacity"
                >
                  Démarrer mon hébergement <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="https://wa.me/237672051289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-dark-black font-bold py-4 px-8 rounded-full hover:bg-dark-black hover:text-white transition-colors"
                >
                  Poser une question sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HostingPage;
