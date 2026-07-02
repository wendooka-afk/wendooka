-- ============================================================
-- PAGE PILIER SEO — Agence Web Cameroun (hub national)
-- Relie les pages villes (/agence-web-{ville}) et les services.
-- Prérequis : exécuter database/migration_seo_pages.sql d'abord
-- ============================================================

INSERT INTO public.pages (
  title,
  slug,
  content,
  status,
  seo_title,
  meta_description,
  canonical_url,
  schema_markup,
  user_id
) VALUES (
  'Agence Web au Cameroun — Sites internet, SEO et solutions digitales',
  'agence-web-cameroun',

  $content$
<div class="not-prose flex flex-col md:flex-row gap-8 items-center mb-12 mt-4">
  <div class="flex-1 min-w-0">
    <p class="text-lg text-gray-300 leading-relaxed">Le Cameroun compte plus de 12 millions d'internautes et une économie numérique en pleine accélération — mais la majorité des entreprises camerounaises restent invisibles sur Google. Wendooka, agence web camerounaise fondée à Ngaoundéré, conçoit des sites internet professionnels, des applications sur-mesure et des stratégies de référencement pour les entreprises, institutions et entrepreneurs de Douala à Maroua. Plus de 150 projets livrés, une exigence : que votre site génère des résultats mesurables, pas juste une présence.</p>
    <a href="/contact" class="inline-block mt-6 bg-lime-accent text-dark-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">Obtenir un devis gratuit →</a>
  </div>
  <div class="w-full md:w-2/5 flex-shrink-0 overflow-hidden rounded-xl">
    <img src="/125484.webp" alt="Wendooka, agence web au Cameroun — création de sites internet professionnels" class="w-full h-64 object-cover object-center" width="480" height="256" />
  </div>
</div>

<div class="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6 text-center">
    <div class="text-4xl font-bold text-lime-accent font-poppins">150+</div>
    <div class="text-sm text-gray-400 mt-2">Projets livrés</div>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6 text-center">
    <div class="text-4xl font-bold text-lime-accent font-poppins">10+</div>
    <div class="text-sm text-gray-400 mt-2">Ans d'expertise</div>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6 text-center">
    <div class="text-4xl font-bold text-lime-accent font-poppins">95%</div>
    <div class="text-sm text-gray-400 mt-2">Satisfaction client</div>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6 text-center">
    <div class="text-4xl font-bold text-lime-accent font-poppins">24h</div>
    <div class="text-sm text-gray-400 mt-2">Délai de réponse</div>
  </div>
</div>

<h2>Pourquoi les entreprises camerounaises ont besoin d'un site web professionnel</h2>

<p>Le marché camerounais a changé. Vos clients cherchent désormais sur Google avant d'acheter : « restaurant Douala », « avocat Yaoundé », « fournisseur matériaux Garoua ». Plus de 75% de ce trafic vient du mobile. Si votre entreprise n'apparaît pas dans ces recherches, elle cède mécaniquement ses prospects à la concurrence qui, elle, a investi dans sa présence en ligne.</p>

<p>Un site web professionnel n'est pas une dépense de prestige : c'est un commercial qui travaille 24h/24. Il crédibilise votre entreprise auprès des partenaires internationaux, capte les demandes de devis pendant que vous dormez, et vous positionne sur les recherches à forte intention d'achat. Nos clients le mesurent : l'<a href="/realisations/mballen-ong">ONG Mballen a enregistré +120% de contacts entrants</a> dès le premier mois de mise en ligne de son site.</p>

<h2>Nos services d'agence web au Cameroun</h2>

<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
  <a href="/services/creation-sites-web" class="block bg-dark-gray border border-gray-700 rounded-xl p-6 hover:border-lime-accent transition-opacity">
    <h3 class="text-xl font-bold text-white mb-2 font-poppins">Création de sites web</h3>
    <p class="text-gray-400 text-sm">Sites vitrines et e-commerce sur-mesure, optimisés pour la conversion et adaptés aux connexions mobiles camerounaises.</p>
  </a>
  <a href="/services/developpement-web" class="block bg-dark-gray border border-gray-700 rounded-xl p-6 hover:border-lime-accent transition-opacity">
    <h3 class="text-xl font-bold text-white mb-2 font-poppins">Développement web sur-mesure</h3>
    <p class="text-gray-400 text-sm">Applications métiers, plateformes SaaS et portails avec intégration Mobile Money (Orange Money, MTN MoMo).</p>
  </a>
  <a href="/services/ui-ux-design" class="block bg-dark-gray border border-gray-700 rounded-xl p-6 hover:border-lime-accent transition-opacity">
    <h3 class="text-xl font-bold text-white mb-2 font-poppins">UI/UX Design</h3>
    <p class="text-gray-400 text-sm">Interfaces intuitives pensées mobile-first pour des utilisateurs camerounais sur réseaux 3G/4G variables.</p>
  </a>
  <a href="/services/marketing-digital" class="block bg-dark-gray border border-gray-700 rounded-xl p-6 hover:border-lime-accent transition-opacity">
    <h3 class="text-xl font-bold text-white mb-2 font-poppins">SEO & Marketing digital</h3>
    <p class="text-gray-400 text-sm">Référencement local Google, campagnes publicitaires et stratégies d'acquisition orientées ROI.</p>
  </a>
</div>

<h2>Combien coûte un site web au Cameroun ?</h2>

<p>Un site vitrine professionnel coûte entre 400 000 et 1 500 000 FCFA selon le niveau de personnalisation. Un e-commerce fonctionnel démarre à 1 200 000 FCFA. Une application web sur-mesure se chiffre entre 2 000 000 et 10 000 000 FCFA selon la complexité. Ces fourchettes incluent la conception, le développement et la mise en ligne — l'hébergement et la maintenance sont généralement facturés séparément.</p>

<p>Le vrai critère n'est pas le prix, mais le retour sur investissement : un site à 800 000 FCFA qui génère 3 nouveaux clients par mois se rembourse en quelques semaines. Nous détaillons tous les tarifs, facteurs de coût et méthodes de calcul du ROI dans notre <a href="/blog/combien-coute-site-web-cameroun">guide complet des prix d'un site web au Cameroun en 2026</a>.</p>

<h2>Une agence enracinée au Cameroun, active dans toutes les régions</h2>

<p>Basée à Ngaoundéré, Wendooka travaille avec des clients dans tout le Cameroun et la sous-région : entreprises à Douala et Yaoundé, institutions publiques dans l'Adamaoua, médias dans le Septentrion, ONG et cabinets de conseil à dimension internationale. Cette implantation locale fait la différence : nous connaissons les réalités du marché camerounais — connexions variables, usage massif du mobile, paiements Mobile Money, exigences des bailleurs internationaux.</p>

<p>Nos réalisations en témoignent : le <a href="/realisations/commune-ngaoundere-2">portail officiel de la Commune de Ngaoundéré 2e</a> (120 000 habitants connectés aux services municipaux), le <a href="/realisations/kubaru-sahel">média Kubaru Sahel</a> (chargement sous 3 secondes en 2G), ou encore <a href="/realisations/sahel-consulting">Sahel Consulting</a> (cabinet de conseil à ambition internationale).</p>

<h2>Comment se déroule un projet web avec Wendooka</h2>

<ol class="list-decimal pl-6 mb-8 space-y-3 text-gray-300">
  <li><strong>Analyse gratuite :</strong> vous nous décrivez votre projet, nous analysons vos objectifs et votre marché. Réponse sous 24h.</li>
  <li><strong>Devis transparent :</strong> chiffrage détaillé poste par poste, sans coûts cachés. Vous savez exactement ce que vous payez.</li>
  <li><strong>Conception & développement :</strong> maquettes validées ensemble, développement itératif, points d'étape réguliers.</li>
  <li><strong>Mise en ligne & formation :</strong> déploiement, optimisation SEO technique et formation de votre équipe à la gestion du site.</li>
  <li><strong>Accompagnement :</strong> maintenance, évolutions et suivi des performances dans la durée.</li>
</ol>

<h2>Questions fréquentes</h2>

<h3>Quelle est la meilleure agence web au Cameroun ?</h3>
<p>La meilleure agence est celle qui prouve ses résultats : exigez des réalisations vérifiables en ligne, des clients joignables et une méthodologie claire. Wendooka publie l'intégralité de <a href="/realisations">ses réalisations</a> avec les sites en ligne et les résultats obtenus — jugez sur pièces.</p>

<h3>Combien de temps faut-il pour créer un site web au Cameroun ?</h3>
<p>Un site vitrine professionnel de 5 à 8 pages se livre en 3 à 5 jours. Un e-commerce, un portail institutionnel ou une application sur-mesure demandent généralement de 2 à 6 semaines selon la complexité. Nous établissons toujours un calendrier précis dès le début du projet.</p>

<h3>Travaillez-vous avec des clients hors de Ngaoundéré ?</h3>
<p>Oui. La majorité de nos projets se pilotent à distance (visioconférence, WhatsApp, points d'étape en ligne) pour des clients à Douala, Yaoundé, Garoua et à l'international. La distance n'a jamais été un obstacle : ce qui compte, c'est la méthode.</p>

<h3>Proposez-vous le paiement Mobile Money ?</h3>
<p>Oui, nous intégrons Orange Money et MTN Mobile Money sur les sites e-commerce, et nous acceptons ces moyens de paiement pour nos propres prestations.</p>

<div class="not-prose bg-lime-accent text-dark-black rounded-2xl p-8 md:p-12 text-center my-12">
  <h2 class="text-2xl md:text-4xl font-bold font-poppins mb-4">Votre projet web mérite une équipe qui vise les résultats</h2>
  <p class="text-lg mb-6 font-medium">Décrivez-nous votre projet : nous vous répondons sous 24h avec une analyse et un devis gratuit.</p>
  <a href="/contact" class="inline-block bg-dark-black text-white font-bold py-4 px-8 rounded-full hover:opacity-90 transition-opacity">Discuter de mon projet →</a>
</div>
$content$,

  'published',
  'Agence Web Cameroun — Création de sites internet & SEO | Wendooka',
  'Agence web camerounaise : création de sites internet, e-commerce, applications et SEO. 150+ projets livrés à Douala, Yaoundé, Ngaoundéré. Devis gratuit sous 24h.',
  'https://wendooka.com/agence-web-cameroun',

  $schema$
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://wendooka.com/agence-web-cameroun",
      "url": "https://wendooka.com/agence-web-cameroun",
      "name": "Agence Web au Cameroun — Sites internet, SEO et solutions digitales",
      "inLanguage": "fr",
      "isPartOf": { "@id": "https://wendooka.com/#website" },
      "about": { "@id": "https://wendooka.com/#organization" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://wendooka.com/" },
          { "@type": "ListItem", "position": 2, "name": "Agence Web Cameroun", "item": "https://wendooka.com/agence-web-cameroun" }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quelle est la meilleure agence web au Cameroun ?",
          "acceptedAnswer": { "@type": "Answer", "text": "La meilleure agence est celle qui prouve ses résultats : exigez des réalisations vérifiables en ligne, des clients joignables et une méthodologie claire. Wendooka publie l'intégralité de ses réalisations avec les sites en ligne et les résultats obtenus." }
        },
        {
          "@type": "Question",
          "name": "Combien de temps faut-il pour créer un site web au Cameroun ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Un site vitrine professionnel de 5 à 8 pages se livre en 3 à 5 jours. Un e-commerce, un portail institutionnel ou une application sur-mesure demandent généralement de 2 à 6 semaines selon la complexité." }
        },
        {
          "@type": "Question",
          "name": "Combien coûte un site web au Cameroun ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Un site vitrine professionnel coûte entre 400 000 et 1 500 000 FCFA. Un e-commerce fonctionnel démarre à 1 200 000 FCFA. Une application web sur-mesure se chiffre entre 2 000 000 et 10 000 000 FCFA selon la complexité." }
        },
        {
          "@type": "Question",
          "name": "Proposez-vous le paiement Mobile Money ?",
          "acceptedAnswer": { "@type": "Answer", "text": "Oui, Wendooka intègre Orange Money et MTN Mobile Money sur les sites e-commerce, et accepte ces moyens de paiement pour ses propres prestations." }
        }
      ]
    }
  ]
}
$schema$,

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
  updated_at       = now();
