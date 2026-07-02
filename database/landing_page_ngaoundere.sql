-- ============================================================
-- LANDING PAGE SEO — Agence Web Ngaoundéré (version enrichie avec images)
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
  'Agence Web à Ngaoundéré — Wendooka crée votre présence digitale',
  'agence-web-ngaoundere',

  $content$
<div class="not-prose flex flex-col md:flex-row gap-8 items-center mb-12 mt-4">
  <div class="flex-1 min-w-0">
    <p class="text-lg text-gray-300 leading-relaxed">Ngaoundéré, carrefour stratégique de l'Adamaoua situé à mi-chemin entre Yaoundé et les marchés tchadiens, vit une transformation économique sans précédent. Ses PME, institutions publiques, hôtels de passage et acteurs de l'agro-pastoralisme cherchent à s'imposer sur le marché régional et international. Wendooka, agence web fondée et enracinée à Ngaoundéré, accompagne cette ambition avec des sites internet professionnels, un référencement local performant et des stratégies digitales conçues pour les réalités du marché centre-africain.</p>
    <a href="/contact" class="inline-block mt-6 bg-lime-accent text-dark-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">Démarrer mon projet →</a>
  </div>
  <div class="w-full md:w-2/5 flex-shrink-0 overflow-hidden rounded-xl">
    <img src="/8970.webp" alt="Équipe Wendooka - agence web à Ngaoundéré, Cameroun" class="w-full h-64 object-cover object-center" width="480" height="256" />
  </div>
</div>

<div class="not-prose grid grid-cols-2 gap-4 my-10">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6 text-center">
    <div class="text-4xl font-bold text-lime-accent font-poppins">100%</div>
    <div class="text-sm text-gray-400 mt-2">Satisfaction client</div>
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
</div>

<h2>Le digital à Ngaoundéré : opportunités et réalités</h2>

<p>Ngaoundéré occupe une position géostratégique unique en Afrique centrale. Terminus du Transcamerounais, la ville constitue le principal point de jonction terrestre entre le Cameroun et le Tchad, mais aussi vers la République Centrafricaine. Ce flux permanent de commerçants, transporteurs et voyageurs génère une économie locale vivante, dominée par le commerce de gros, l'import-export et les services associés au transit régional.</p>

<p>Sur le plan agro-industriel, la région de l'Adamaoua concentre l'essentiel du cheptel bovin du Cameroun. Les éleveurs, marchands de bétail, abattoirs et entreprises de transformation laitière forment un écosystème qui manque cruellement de visibilité en ligne. Une présence web bien référencée permettrait à ces acteurs de toucher des acheteurs à Douala, Yaoundé ou au Tchad sans intermédiaire, en supprimant les marges des grossistes et en développant des relations commerciales directes sur l'ensemble du bassin.</p>

<p>L'Université de Ngaoundéré, acteur phare de la ville, attire chaque année des milliers d'étudiants venus de tout le Cameroun et des pays voisins. Autour d'elle gravitent des résidences, restaurants, librairies, agences d'orientation et entreprises de services qui pourraient doubler leur clientèle grâce à une stratégie numérique ciblée. Les structures hôtelières qui accueillent les voyageurs en transit vers le Nord-Cameroun, le Tchad et la RCA ont elles aussi besoin d'une vitrine digitale à la hauteur de leur ambition commerciale.</p>

<p>Le défi est réel : la pénétration d'internet progresse rapidement grâce à la téléphonie mobile, mais l'offre de services web de qualité adaptés au contexte local demeure insuffisante. Wendooka comble précisément ce fossé. Notre équipe connaît Ngaoundéré de l'intérieur — ses marchés, ses dynamiques culturelles, ses contraintes techniques de connectivité — pour vous proposer des solutions digitales qui fonctionnent vraiment sur le terrain.</p>

<div class="not-prose flex flex-col md:flex-row gap-8 items-center bg-dark-gray border border-gray-700 rounded-2xl p-8 my-10">
  <div class="flex-shrink-0">
    <img src="/Oumarou%20Sanda%20CEO%20Wzndooka.webp" alt="Oumarou Sanda, fondateur de Wendooka Ngaoundéré" class="w-24 h-24 rounded-full object-cover object-top border-2 border-lime-accent" width="96" height="96" />
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-lg italic text-gray-300 leading-relaxed mb-3">"Wendooka est né à Ngaoundéré parce que les entreprises africaines méritent les mêmes outils digitaux de qualité que celles des grandes métropoles — à des prix adaptés à notre réalité."</p>
    <div class="font-semibold text-white">Oumarou Sanda</div>
    <div class="text-sm text-lime-accent">Fondateur &amp; CEO, Wendooka</div>
  </div>
</div>

<h2>Nos services web à Ngaoundéré</h2>

<h3>Création de site web professionnel</h3>
<p>Un site web n'est pas un simple dépliant numérique : c'est votre commercial le plus disponible, actif 24h/24 et 7j/7. Chez Wendooka, nous concevons des sites internet sur mesure adaptés à votre secteur d'activité et à votre clientèle cible à Ngaoundéré et au-delà. Que vous dirigiez un hôtel accueillant des voyageurs en transit, une PME dans l'import-export, une clinique ou une école privée, nous créons une interface claire, rapide et convaincante. Chaque site est optimisé pour les appareils mobiles — parce qu'au Cameroun, la majorité de vos clients vous découvriront sur smartphone. Nous soignons l'identité visuelle, la structure des pages et les appels à l'action pour transformer vos visiteurs en clients réels.</p>

<h3>Référencement naturel SEO local</h3>
<p>Être présent sur Google lorsqu'un client potentiel cherche "hôtel à Ngaoundéré", "comptable Adamaoua" ou "fournisseur de bétail Cameroun", c'est l'objectif concret du référencement SEO local. Wendooka intègre dès la conception de votre site toutes les bonnes pratiques : structure sémantique des titres, métadonnées optimisées, vitesse de chargement, contenu riche et maillage interne cohérent. Nous travaillons également votre présence dans Google Maps et Google Business Profile, essentiels pour capter les recherches géolocalisées. Notre approche est entièrement transparente : nous vous expliquons chaque action entreprise et nous vous livrons des rapports réguliers sur l'évolution de vos positions dans les résultats de recherche.</p>

<h3>Marketing digital et réseaux sociaux</h3>
<p>Facebook, WhatsApp Business, Instagram et TikTok sont devenus les premiers canaux de communication pour les entreprises camerounaises. Wendooka vous aide à construire une présence cohérente et engageante sur ces plateformes. Nous gérons vos pages, créons des contenus adaptés à votre audience locale — en français ou en fulfulde si besoin —, et planifions des campagnes publicitaires ciblées sur la région de l'Adamaoua ou sur des segments de marché spécifiques. Notre objectif est de générer de la notoriété, des contacts qualifiés et des ventes, pas simplement des mentions "j'aime". Chaque action est mesurée pour vous garantir un retour sur investissement concret et vérifiable.</p>

<h3>Automatisation et outils digitaux</h3>
<p>La transformation digitale dépasse la simple création d'un beau site. C'est aussi automatiser les tâches chronophages pour gagner du temps et réduire les erreurs humaines. Wendooka déploie pour vous des solutions de prise de rendez-vous en ligne, de gestion des devis et factures, d'envoi automatique de confirmations par SMS ou email, et d'intégration avec des outils de comptabilité ou de gestion des stocks. Pour les commerçants de Ngaoundéré qui échangent avec des partenaires à Douala, Yaoundé ou N'Djamena, ces outils représentent un avantage concurrentiel considérable. Nous sélectionnons des solutions robustes, accessibles même avec des connexions internet variables.</p>

<h3>Maintenance et support technique</h3>
<p>Un site web n'est pas un investissement à sens unique. Il nécessite une attention régulière : mises à jour de sécurité, correction de bugs, ajout de nouveaux contenus, optimisation continue des performances. Wendooka propose des contrats de maintenance mensuels adaptés à tous les budgets. Notre équipe basée à Ngaoundéré intervient rapidement, sans barrière de fuseau horaire ni délai de réponse. Vous disposez d'un contact direct, et nous vous répondons dans les heures qui suivent votre demande. La tranquillité d'esprit et la continuité de votre activité en ligne font intégralement partie du service que nous vous rendons.</p>

<h2>Quelques réalisations à Ngaoundéré et au Cameroun</h2>

<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/commune-ngaoundere-2" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/commune%20ngaoundere%202%20Home.webp" alt="Site web Commune de Ngaoundéré 2e réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Commune de Ngaoundéré 2e</div>
      <div class="text-xs text-gray-400 mt-2">Site institutionnel · Ngaoundéré</div>
    </div>
  </a>
  <a href="/realisations/mballen-ong" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Mballen%20Homepage%20.webp" alt="Site web ONG MBALLEN réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">MBALLEN ONG</div>
      <div class="text-xs text-gray-400 mt-2">Site associatif · Ngaoundéré</div>
    </div>
  </a>
  <a href="/realisations/sahel-consulting" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Sahel%20consulting%20home.webp" alt="Site web Sahel Consulting réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Sahel Consulting</div>
      <div class="text-xs text-gray-400 mt-2">Site corporate · Cameroun</div>
    </div>
  </a>
</div>

<h2>Ce que disent nos clients</h2>

<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp" alt="Idrissou Abana, Commune de Ngaoundéré 2e" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Idrissou Abana</div>
        <div class="text-xs text-lime-accent mt-1">Commune de Ngaoundéré 2e</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su comprendre les besoins institutionnels de notre commune et livrer un site à la fois professionnel et accessible à nos administrés. Le suivi après livraison est exemplaire."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg" alt="Oumarou Sanda Aboubakar, directeur MBALLEN ONG" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Oumarou Sanda Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Directeur, MBALLEN ONG</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement pour notre organisation."</p>
  </div>
</div>

<h2>Pourquoi choisir Wendooka à Ngaoundéré ?</h2>

<p><strong>Une agence locale, une connaissance du terrain inégalable.</strong> Wendooka n'est pas une agence parachutée depuis Douala ou Yaoundé qui applique des recettes génériques. Nous sommes nés et avons grandi dans l'écosystème économique de Ngaoundéré. Nous connaissons les noms des marchés, les habitudes d'achat locales, les événements qui rythment la vie économique de l'Adamaoua — des foires agro-pastorales aux sessions universitaires. Cette connaissance intime nous permet de créer des contenus qui résonnent authentiquement avec votre clientèle, que vos clients soient des éleveurs de Meiganga, des commerçants du marché central ou des voyageurs en transit depuis N'Djamena.</p>

<p><strong>Un rapport qualité/prix pensé pour les entrepreneurs africains.</strong> Nos tarifs sont établis en tenant compte des réalités économiques locales. Nous ne facturons pas des honoraires calibrés pour les marchés européens : nos prix reflètent la valeur que nous apportons concrètement à votre activité à Ngaoundéré. Un site web bien fait par Wendooka n'est pas une dépense, c'est un investissement rentable qui génère des contacts et des contrats bien au-delà de son coût initial. Nous proposons également des paiements échelonnés pour les projets d'envergure, afin que le digital reste accessible à toutes les structures.</p>

<p><strong>Un accompagnement stratégique ancré dans le long terme.</strong> Nous ne livrons pas un site et disparaissons. Wendooka s'inscrit dans une relation durable avec ses clients. Après le lancement, nous restons disponibles pour analyser vos statistiques de visites, identifier des opportunités d'amélioration et adapter votre stratégie aux évolutions du marché. Que votre activité se développe vers Garoua, N'Djamena ou au-delà, nous ferons évoluer vos outils digitaux avec vous. Vous n'avez pas qu'un prestataire technique : vous avez un partenaire numérique de confiance qui partage vos ambitions de croissance.</p>

<div class="not-prose my-10 overflow-hidden rounded-xl">
  <img src="/60349.webp" alt="Développeurs web Wendooka au travail à Ngaoundéré" class="w-full h-48 object-cover object-center" width="800" height="192" />
</div>

<h2>Les secteurs que nous accompagnons à Ngaoundéré</h2>

<p>Wendooka intervient auprès d'une grande variété d'acteurs économiques à Ngaoundéré et dans la région de l'Adamaoua :</p>

<ul>
<li><strong>Élevage et agro-industrie</strong> : éleveurs bovins, marchands de bétail, entreprises de transformation laitière et carnée, coopératives maraîchères et acteurs de la filière céréalière.</li>
<li><strong>Transport et logistique</strong> : transporteurs routiers, agences de fret, gestionnaires de dépôts et opérateurs desservant les couloirs Cameroun-Tchad et Cameroun-RCA.</li>
<li><strong>Éducation et formation</strong> : établissements scolaires, groupements universitaires, centres de formation professionnelle, instituts privés et agences d'orientation.</li>
<li><strong>Administration et institutions</strong> : communes, services déconcentrés de l'État, organisations internationales et ONG présentes dans la région de l'Adamaoua.</li>
<li><strong>Hôtellerie et tourisme</strong> : hôtels, auberges, restaurants, agences de voyages et prestataires de services aux voyageurs en transit dans la ville.</li>
<li><strong>Commerce et distribution</strong> : grossistes, détaillants, importateurs, pharmacies, quincailleries et magasins de matériaux de construction.</li>
<li><strong>Santé</strong> : cliniques privées, cabinets médicaux, pharmacies, laboratoires d'analyses et centres de bien-être.</li>
<li><strong>Services aux entreprises</strong> : cabinets comptables, avocats, notaires, bureaux d'études, consultants en gestion et prestataires RH.</li>
</ul>

<h2>Comment nous travaillons avec vous</h2>

<p>Notre processus est transparent, structuré et orienté vers vos résultats concrets. Voici comment se déroule chaque projet Wendooka :</p>

<p><strong>Étape 1 — Consultation gratuite.</strong> Tout commence par une conversation, sans engagement ni frais. Nous prenons le temps de comprendre votre activité, vos objectifs, votre cible et vos contraintes budgétaires. Cette première rencontre peut se faire en présentiel à Ngaoundéré, par téléphone ou via WhatsApp. Elle nous permet d'avoir une vision claire de vos besoins avant de vous proposer quoi que ce soit.</p>

<p><strong>Étape 2 — Stratégie et proposition.</strong> Sur la base de notre échange, nous rédigeons une proposition détaillée qui inclut la stratégie recommandée, les livrables attendus, le calendrier de réalisation et la grille tarifaire. Vous savez exactement ce que vous payez et ce que vous obtiendrez. Aucune surprise en cours de projet. Nous intégrons dès cette étape des recommandations SEO spécifiques à votre marché local à Ngaoundéré.</p>

<p><strong>Étape 3 — Développement et création.</strong> Notre équipe se met au travail selon le cahier des charges validé ensemble. Vous êtes informé régulièrement de l'avancement du projet et validez chaque étape clé — design, contenus, fonctionnalités. Nous vous impliquons dans la sélection des visuels et la rédaction des contenus pour que le résultat final vous ressemble et parle authentiquement à vos clients.</p>

<p><strong>Étape 4 — Lancement et suivi.</strong> La mise en ligne n'est pas la fin : c'est le début d'une nouvelle phase. Nous vous formons à la gestion autonome de votre site et mettons en place des outils d'analyse pour suivre les performances. Nous vous remettons un rapport complet dans les 30 jours suivant le lancement, avec les premiers résultats mesurables et les pistes d'optimisation prioritaires pour la suite.</p>

<h2>Questions fréquentes — Agence web à Ngaoundéré</h2>

<h3>Combien coûte la création d'un site web à Ngaoundéré ?</h3>
<p>Le coût d'un site web dépend de sa complexité, du nombre de pages, des fonctionnalités requises (boutique en ligne, formulaire de réservation, espace membre) et du niveau d'optimisation SEO souhaité. Chez Wendooka, nous proposons des solutions adaptées à tous les budgets, depuis les sites vitrines essentiels jusqu'aux plateformes e-commerce complètes. Nous travaillons avec des entrepreneurs locaux qui disposent de budgets modestes comme avec des PME cherchant des solutions robustes. Contactez-nous pour obtenir un devis gratuit et personnalisé, sans engagement de votre part.</p>

<h3>Wendooka peut-il travailler avec des clients à distance depuis Ngaoundéré ?</h3>
<p>Absolument. Si notre équipe est physiquement basée à Ngaoundéré, nous collaborons régulièrement avec des clients à Garoua, Douala, Yaoundé, N'Djamena et Bangui, entièrement à distance. Nous utilisons WhatsApp, les appels vidéo et des outils de gestion de projet en ligne pour maintenir une communication fluide et transparente. La distance n'a jamais empêché un projet de réussir chez Wendooka. Notre maîtrise du travail à distance est d'ailleurs l'une de nos forces distinctives sur le marché régional.</p>

<h3>Quel délai faut-il compter pour créer un site web professionnel ?</h3>
<p>Pour un site vitrine standard de 5 à 8 pages, comptez généralement entre 3 et 5 jours depuis la validation de la proposition jusqu'à la mise en ligne. Ce délai suppose que vous nous fournissiez rapidement les contenus nécessaires — textes, photos, informations sur votre activité. Pour des projets plus complexes comme une boutique en ligne, un portail institutionnel ou une application web, le délai s'étend généralement de 2 à 6 semaines. Nous établissons toujours un calendrier précis dès le début pour vous permettre de planifier votre communication.</p>

<h3>Proposez-vous des services après la livraison du site ?</h3>
<p>Oui, et c'est l'un de nos engagements fondamentaux. Wendooka propose des contrats de maintenance mensuels qui incluent les mises à jour de sécurité, les sauvegardes régulières, les petites modifications de contenu et un support technique prioritaire. Nous offrons également des services d'optimisation continue : amélioration du référencement, création de nouvelles pages, intégration de nouveaux outils digitaux. Beaucoup de nos clients de Ngaoundéré nous confient la gestion complète de leur présence en ligne sur le long terme, ce qui représente notre modèle de partenariat préféré.</p>

<h3>Peut-on créer un site internet en fulfulde ou dans une autre langue locale ?</h3>
<p>Oui, Wendooka est l'une des rares agences à proposer cette option spécifique. Nous pouvons intégrer du contenu en fulfulde — langue la plus parlée dans la région de l'Adamaoua — pour des entreprises qui souhaitent communiquer directement avec leur clientèle locale dans sa langue maternelle. Nous proposons des sites bilingues français/fulfulde ou trilingues selon vos besoins. Cette approche est particulièrement pertinente pour les acteurs du commerce local, les institutions de santé, les structures d'enseignement et les organisations communautaires qui travaillent au plus près des populations de la région.</p>

<h2>Lancez votre projet web à Ngaoundéré avec Wendooka</h2>

<p>Ngaoundéré bouge, et les opportunités digitales n'attendent pas. Chaque jour sans présence web, c'est un client qui vous cherche sur Google et qui trouve votre concurrent. Wendooka est prête à devenir votre partenaire numérique de confiance : nous connaissons votre marché, nous parlons votre langue et nous livrons des résultats mesurables. Prenez contact avec nous dès aujourd'hui pour une consultation gratuite. Ensemble, nous construirons une présence en ligne qui vous distingue et génère de vraies opportunités d'affaires à Ngaoundéré et bien au-delà des frontières de la région.</p>

<div class="text-center my-10">
  <a href="/contact" class="bg-lime-accent text-dark-black font-bold py-4 px-8 rounded-lg inline-block hover:opacity-90 transition-opacity">Demander un devis gratuit</a>
</div>

<h2>Wendooka dans d'autres villes</h2>

<p>Wendooka accompagne les entreprises dans toute l'Afrique centrale. Découvrez nos offres dans les autres villes :</p>

<ul class="grid grid-cols-2 gap-3 mt-4">
  <li><a href="/agence-web-garoua" class="text-lime-accent hover:underline">Agence web à Garoua</a></li>
  <li><a href="/agence-web-maroua" class="text-lime-accent hover:underline">Agence web à Maroua</a></li>
  <li><a href="/agence-web-douala" class="text-lime-accent hover:underline">Agence web à Douala</a></li>
  <li><a href="/agence-web-yaounde" class="text-lime-accent hover:underline">Agence web à Yaoundé</a></li>
  <li><a href="/agence-web-bafoussam" class="text-lime-accent hover:underline">Agence web à Bafoussam</a></li>
  <li><a href="/agence-web-ndjamena" class="text-lime-accent hover:underline">Agence web à N'Djamena</a></li>
  <li><a href="/agence-web-bangui" class="text-lime-accent hover:underline">Agence web à Bangui</a></li>
</ul>
  $content$,

  'published',
  'Agence Web Ngaoundéré — Création de Site & Marketing Digital | Wendooka',
  'Wendooka à Ngaoundéré : création de sites web, SEO local et marketing digital adaptés au marché africain. Devis gratuit, réponse rapide.',
  'https://wendooka.com/agence-web-ngaoundere',

  $schema$[
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Wendooka",
    "url": "https://wendooka.com",
    "telephone": "+237672051289",
    "email": "contact@wendooka.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ngaoundéré",
      "addressRegion": "Adamaoua",
      "addressCountry": "CM"
    },
    "areaServed": "Ngaoundéré",
    "priceRange": "FCFA",
    "description": "Agence web à Ngaoundéré spécialisée en création de sites internet professionnels, référencement SEO local et marketing digital pour les entreprises d'Afrique centrale."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Combien coûte la création d'un site web à Ngaoundéré ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le coût varie selon la complexité du projet. Wendooka propose des solutions adaptées à tous les budgets, depuis les sites vitrines jusqu'aux plateformes e-commerce. Contactez-nous pour un devis gratuit et personnalisé, sans engagement."
        }
      },
      {
        "@type": "Question",
        "name": "Wendooka peut-il travailler avec des clients à distance depuis Ngaoundéré ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, Wendooka collabore à distance avec des clients à Garoua, Douala, Yaoundé, N'Djamena et Bangui via WhatsApp, appels vidéo et outils de gestion de projet en ligne."
        }
      },
      {
        "@type": "Question",
        "name": "Quel délai faut-il compter pour créer un site web professionnel ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pour un site vitrine standard de 5 à 8 pages, comptez 3 à 5 jours. Pour des projets complexes comme une boutique en ligne ou un portail institutionnel, le délai s'étend généralement de 2 à 6 semaines."
        }
      },
      {
        "@type": "Question",
        "name": "Proposez-vous des services après la livraison du site ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, Wendooka propose des contrats de maintenance mensuels incluant mises à jour de sécurité, sauvegardes régulières, modifications de contenu et support technique prioritaire."
        }
      },
      {
        "@type": "Question",
        "name": "Peut-on créer un site internet en fulfulde ou dans une autre langue locale ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, Wendooka propose des sites bilingues ou trilingues incluant le fulfulde, langue la plus parlée dans la région de l'Adamaoua, pour mieux atteindre la clientèle locale."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Création de site web professionnel",
    "provider": {"@type": "LocalBusiness", "name": "Wendooka"},
    "areaServed": "Ngaoundéré",
    "description": "Conception et développement de sites internet sur mesure pour les entreprises de Ngaoundéré, optimisés mobile, rapides et axés sur la conversion."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Référencement naturel SEO local",
    "provider": {"@type": "LocalBusiness", "name": "Wendooka"},
    "areaServed": "Ngaoundéré",
    "description": "Optimisation SEO locale pour positionner votre site sur Google à Ngaoundéré, incluant Google Business Profile, contenu optimisé et maillage interne."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Marketing digital et réseaux sociaux",
    "provider": {"@type": "LocalBusiness", "name": "Wendooka"},
    "areaServed": "Ngaoundéré",
    "description": "Gestion des réseaux sociaux, création de contenus et campagnes publicitaires ciblées pour les entreprises de la région de l'Adamaoua."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Automatisation et outils digitaux",
    "provider": {"@type": "LocalBusiness", "name": "Wendooka"},
    "areaServed": "Ngaoundéré",
    "description": "Déploiement de solutions d'automatisation : prise de rendez-vous, gestion des devis, envoi automatique de notifications et intégrations métier."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Maintenance et support technique",
    "provider": {"@type": "LocalBusiness", "name": "Wendooka"},
    "areaServed": "Ngaoundéré",
    "description": "Contrats de maintenance mensuels pour assurer la sécurité, les performances et l'évolution continue de votre site web à Ngaoundéré."
  }
]$schema$,

  NULL
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  content      = EXCLUDED.content,
  status       = EXCLUDED.status,
  seo_title    = EXCLUDED.seo_title,
  meta_description = EXCLUDED.meta_description,
  canonical_url = EXCLUDED.canonical_url,
  schema_markup = EXCLUDED.schema_markup,
  updated_at   = NOW();
