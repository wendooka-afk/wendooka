-- Patch : diversifie réalisations + témoignages par ville (généré)

-- Garoua
UPDATE public.pages SET content = replace(replace(content,
  $oldr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/commune-ngaoundere-2" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/commune%20ngaoundere%202%20Home.webp" alt="Site web Commune de Ngaoundéré 2e réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Commune de Ngaoundéré 2e</div>
      <div class="text-xs text-gray-400 mt-2">Site institutionnel · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/mballen-ong" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Mballen%20Homepage%20.webp" alt="Site web ONG MBALLEN réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">MBALLEN ONG</div>
      <div class="text-xs text-gray-400 mt-2">Site associatif · Cameroun</div>
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
</div>$oldr$, $newr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/kubaru-sahel" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/KubaruSahel%20homepage.webp" alt="Portail média Kubaru Sahel réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Kubaru Sahel</div>
      <div class="text-xs text-gray-400 mt-2">Média · Nord-Cameroun</div>
    </div>
  </a>
  <a href="/realisations/bandiko-production" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Bandiko%20Productions%20Home%201.webp" alt="Site web Bandiko Production réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Bandiko Production</div>
      <div class="text-xs text-gray-400 mt-2">Production audiovisuelle · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/commune-ngaoundere-2" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/commune%20ngaoundere%202%20Home.webp" alt="Site web Commune de Ngaoundéré 2e réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Commune de Ngaoundéré 2e</div>
      <div class="text-xs text-gray-400 mt-2">Site institutionnel · Ngaoundéré</div>
    </div>
  </a>
</div>$newr$),
  $oldt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp" alt="Idrissou Abana, Commune de Ngaoundéré 2e" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Idrissou Abana</div>
        <div class="text-xs text-lime-accent mt-1">Commune de Ngaoundéré 2e</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg" alt="Oumarou Sanda Aboubakar, directeur MBALLEN ONG" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Oumarou Sanda Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Directeur, MBALLEN ONG</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement."</p>
  </div>
</div>$oldt$, $newt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Eric%20Nguele%20Kubaru%20Sahel%2024.jpg" alt="Eric Nguele, Kubaru Sahel" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Eric Nguele</div>
        <div class="text-xs text-lime-accent mt-1">Promoteur, Kubaru Sahel</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Un travail technique remarquable. Le site est ultra-rapide même en zone rurale, ce qui était notre exigence n°1. Wendooka a parfaitement compris nos contraintes."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp" alt="Idrissou Abana, Commune de Ngaoundéré 2e" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Idrissou Abana</div>
        <div class="text-xs text-lime-accent mt-1">Maire, Commune de Ngaoundéré 2e</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire."</p>
  </div>
</div>$newt$),
  updated_at = now()
WHERE slug = 'agence-web-garoua';

-- Maroua
UPDATE public.pages SET content = replace(replace(content,
  $oldr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/commune-ngaoundere-2" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/commune%20ngaoundere%202%20Home.webp" alt="Site web Commune de Ngaoundéré 2e réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Commune de Ngaoundéré 2e</div>
      <div class="text-xs text-gray-400 mt-2">Site institutionnel · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/mballen-ong" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Mballen%20Homepage%20.webp" alt="Site web ONG MBALLEN réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">MBALLEN ONG</div>
      <div class="text-xs text-gray-400 mt-2">Site associatif · Cameroun</div>
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
</div>$oldr$, $newr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/mballen-ong" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Mballen%20Homepage%20.webp" alt="Site web ONG MBALLEN réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">MBALLEN ONG</div>
      <div class="text-xs text-gray-400 mt-2">ONG · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/baladjikwata" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/baladjikwata%20homepage.jpeg" alt="Site web Baladji Kwata réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Baladji Kwata</div>
      <div class="text-xs text-gray-400 mt-2">Musique · Ngaoundéré</div>
    </div>
  </a>
  <a href="/realisations/kubaru-sahel" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/KubaruSahel%20homepage.webp" alt="Portail média Kubaru Sahel réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Kubaru Sahel</div>
      <div class="text-xs text-gray-400 mt-2">Média · Nord-Cameroun</div>
    </div>
  </a>
</div>$newr$),
  $oldt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp" alt="Idrissou Abana, Commune de Ngaoundéré 2e" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Idrissou Abana</div>
        <div class="text-xs text-lime-accent mt-1">Commune de Ngaoundéré 2e</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg" alt="Oumarou Sanda Aboubakar, directeur MBALLEN ONG" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Oumarou Sanda Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Directeur, MBALLEN ONG</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement."</p>
  </div>
</div>$oldt$, $newt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg" alt="Oumarou Sanda Aboubakar, Association Mballen" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Oumarou Sanda Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Président, Association Mballen</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Eric%20Nguele%20Kubaru%20Sahel%2024.jpg" alt="Eric Nguele, Kubaru Sahel" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Eric Nguele</div>
        <div class="text-xs text-lime-accent mt-1">Promoteur, Kubaru Sahel</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Un travail technique remarquable. Le site est ultra-rapide même en zone rurale, ce qui était notre exigence n°1. Wendooka a parfaitement compris nos contraintes."</p>
  </div>
</div>$newt$),
  updated_at = now()
WHERE slug = 'agence-web-maroua';

-- Douala
UPDATE public.pages SET content = replace(replace(content,
  $oldr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/commune-ngaoundere-2" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/commune%20ngaoundere%202%20Home.webp" alt="Site web Commune de Ngaoundéré 2e réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Commune de Ngaoundéré 2e</div>
      <div class="text-xs text-gray-400 mt-2">Site institutionnel · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/mballen-ong" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Mballen%20Homepage%20.webp" alt="Site web ONG MBALLEN réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">MBALLEN ONG</div>
      <div class="text-xs text-gray-400 mt-2">Site associatif · Cameroun</div>
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
</div>$oldr$, $newr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/abouscom" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Abouscom%20homepage.webp" alt="Site web Abouscom réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Abouscom</div>
      <div class="text-xs text-gray-400 mt-2">Agence communication · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/oumarousanda" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/oumarousanda%20hompage.jpeg" alt="Site personnel Oumarou Sanda réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Oumarou Sanda</div>
      <div class="text-xs text-gray-400 mt-2">Personal branding · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/sahel-consulting" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Sahel%20consulting%20home.webp" alt="Site web Sahel Consulting réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Sahel Consulting</div>
      <div class="text-xs text-gray-400 mt-2">Cabinet conseil · Cameroun</div>
    </div>
  </a>
</div>$newr$),
  $oldt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp" alt="Idrissou Abana, Commune de Ngaoundéré 2e" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Idrissou Abana</div>
        <div class="text-xs text-lime-accent mt-1">Commune de Ngaoundéré 2e</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg" alt="Oumarou Sanda Aboubakar, directeur MBALLEN ONG" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Oumarou Sanda Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Directeur, MBALLEN ONG</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement."</p>
  </div>
</div>$oldt$, $newt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Hamidou%20Ahmadou%20Sahel%20Consulting.jpeg" alt="Hamidou Ahmadou, Sahel Consulting" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Hamidou Ahmadou</div>
        <div class="text-xs text-lime-accent mt-1">CEO, Sahel Consulting</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su traduire la complexité de nos offres en un site clair et percutant. Depuis la mise en ligne, nous constatons un impact réel sur notre image de marque."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20dewa%20aboubakar%20Bandiko%20productions.webp" alt="Dewa Aboubakar, Bandiko Production" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Dewa Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Fondateur, Bandiko Production</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a parfaitement capté l'essence de notre travail. Le site reflète notre identité et nous positionne à la hauteur de nos ambitions internationales."</p>
  </div>
</div>$newt$),
  updated_at = now()
WHERE slug = 'agence-web-douala';

-- Yaoundé
UPDATE public.pages SET content = replace(replace(content,
  $oldr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/commune-ngaoundere-2" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/commune%20ngaoundere%202%20Home.webp" alt="Site web Commune de Ngaoundéré 2e réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Commune de Ngaoundéré 2e</div>
      <div class="text-xs text-gray-400 mt-2">Site institutionnel · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/mballen-ong" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Mballen%20Homepage%20.webp" alt="Site web ONG MBALLEN réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">MBALLEN ONG</div>
      <div class="text-xs text-gray-400 mt-2">Site associatif · Cameroun</div>
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
</div>$oldr$, $newr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/sahel-consulting" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Sahel%20consulting%20home.webp" alt="Site web Sahel Consulting réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Sahel Consulting</div>
      <div class="text-xs text-gray-400 mt-2">Cabinet conseil · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/commune-ngaoundere-2" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/commune%20ngaoundere%202%20Home.webp" alt="Site web Commune de Ngaoundéré 2e réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Commune de Ngaoundéré 2e</div>
      <div class="text-xs text-gray-400 mt-2">Site institutionnel · Ngaoundéré</div>
    </div>
  </a>
  <a href="/realisations/oumarousanda" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/oumarousanda%20hompage.jpeg" alt="Site personnel Oumarou Sanda réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Oumarou Sanda</div>
      <div class="text-xs text-gray-400 mt-2">Personal branding · Cameroun</div>
    </div>
  </a>
</div>$newr$),
  $oldt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp" alt="Idrissou Abana, Commune de Ngaoundéré 2e" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Idrissou Abana</div>
        <div class="text-xs text-lime-accent mt-1">Commune de Ngaoundéré 2e</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg" alt="Oumarou Sanda Aboubakar, directeur MBALLEN ONG" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Oumarou Sanda Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Directeur, MBALLEN ONG</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement."</p>
  </div>
</div>$oldt$, $newt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Hamidou%20Ahmadou%20Sahel%20Consulting.jpeg" alt="Hamidou Ahmadou, Sahel Consulting" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Hamidou Ahmadou</div>
        <div class="text-xs text-lime-accent mt-1">CEO, Sahel Consulting</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su traduire la complexité de nos offres en un site clair et percutant. Depuis la mise en ligne, nous constatons un impact réel sur notre image de marque."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp" alt="Idrissou Abana, Commune de Ngaoundéré 2e" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Idrissou Abana</div>
        <div class="text-xs text-lime-accent mt-1">Maire, Commune de Ngaoundéré 2e</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire."</p>
  </div>
</div>$newt$),
  updated_at = now()
WHERE slug = 'agence-web-yaounde';

-- Bafoussam
UPDATE public.pages SET content = replace(replace(content,
  $oldr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/commune-ngaoundere-2" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/commune%20ngaoundere%202%20Home.webp" alt="Site web Commune de Ngaoundéré 2e réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Commune de Ngaoundéré 2e</div>
      <div class="text-xs text-gray-400 mt-2">Site institutionnel · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/mballen-ong" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Mballen%20Homepage%20.webp" alt="Site web ONG MBALLEN réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">MBALLEN ONG</div>
      <div class="text-xs text-gray-400 mt-2">Site associatif · Cameroun</div>
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
</div>$oldr$, $newr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/abouscom" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Abouscom%20homepage.webp" alt="Site web Abouscom réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Abouscom</div>
      <div class="text-xs text-gray-400 mt-2">Agence communication · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/bandiko-production" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Bandiko%20Productions%20Home%201.webp" alt="Site web Bandiko Production réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Bandiko Production</div>
      <div class="text-xs text-gray-400 mt-2">Production audiovisuelle · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/barkantedjo" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/barkantedjo%20homepage.jpeg" alt="Site web Barkantedjo réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Barkantedjo</div>
      <div class="text-xs text-gray-400 mt-2">Artiste · Cameroun</div>
    </div>
  </a>
</div>$newr$),
  $oldt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp" alt="Idrissou Abana, Commune de Ngaoundéré 2e" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Idrissou Abana</div>
        <div class="text-xs text-lime-accent mt-1">Commune de Ngaoundéré 2e</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg" alt="Oumarou Sanda Aboubakar, directeur MBALLEN ONG" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Oumarou Sanda Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Directeur, MBALLEN ONG</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement."</p>
  </div>
</div>$oldt$, $newt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20dewa%20aboubakar%20Bandiko%20productions.webp" alt="Dewa Aboubakar, Bandiko Production" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Dewa Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Fondateur, Bandiko Production</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a parfaitement capté l'essence de notre travail. Le site reflète notre identité et nous positionne à la hauteur de nos ambitions internationales."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Hamidou%20Ahmadou%20Sahel%20Consulting.jpeg" alt="Hamidou Ahmadou, Sahel Consulting" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Hamidou Ahmadou</div>
        <div class="text-xs text-lime-accent mt-1">CEO, Sahel Consulting</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su traduire la complexité de nos offres en un site clair et percutant. Depuis la mise en ligne, nous constatons un impact réel sur notre image de marque."</p>
  </div>
</div>$newt$),
  updated_at = now()
WHERE slug = 'agence-web-bafoussam';

-- N'Djamena
UPDATE public.pages SET content = replace(replace(content,
  $oldr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/commune-ngaoundere-2" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/commune%20ngaoundere%202%20Home.webp" alt="Site web Commune de Ngaoundéré 2e réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Commune de Ngaoundéré 2e</div>
      <div class="text-xs text-gray-400 mt-2">Site institutionnel · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/mballen-ong" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Mballen%20Homepage%20.webp" alt="Site web ONG MBALLEN réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">MBALLEN ONG</div>
      <div class="text-xs text-gray-400 mt-2">Site associatif · Cameroun</div>
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
</div>$oldr$, $newr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/kubaru-sahel" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/KubaruSahel%20homepage.webp" alt="Portail média Kubaru Sahel réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Kubaru Sahel</div>
      <div class="text-xs text-gray-400 mt-2">Média · Nord-Cameroun</div>
    </div>
  </a>
  <a href="/realisations/sahel-consulting" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Sahel%20consulting%20home.webp" alt="Site web Sahel Consulting réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Sahel Consulting</div>
      <div class="text-xs text-gray-400 mt-2">Cabinet conseil · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/abouscom" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Abouscom%20homepage.webp" alt="Site web Abouscom réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Abouscom</div>
      <div class="text-xs text-gray-400 mt-2">Agence communication · Cameroun</div>
    </div>
  </a>
</div>$newr$),
  $oldt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp" alt="Idrissou Abana, Commune de Ngaoundéré 2e" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Idrissou Abana</div>
        <div class="text-xs text-lime-accent mt-1">Commune de Ngaoundéré 2e</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg" alt="Oumarou Sanda Aboubakar, directeur MBALLEN ONG" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Oumarou Sanda Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Directeur, MBALLEN ONG</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement."</p>
  </div>
</div>$oldt$, $newt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Eric%20Nguele%20Kubaru%20Sahel%2024.jpg" alt="Eric Nguele, Kubaru Sahel" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Eric Nguele</div>
        <div class="text-xs text-lime-accent mt-1">Promoteur, Kubaru Sahel</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Un travail technique remarquable. Le site est ultra-rapide même en zone rurale, ce qui était notre exigence n°1. Wendooka a parfaitement compris nos contraintes."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Hamidou%20Ahmadou%20Sahel%20Consulting.jpeg" alt="Hamidou Ahmadou, Sahel Consulting" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Hamidou Ahmadou</div>
        <div class="text-xs text-lime-accent mt-1">CEO, Sahel Consulting</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su traduire la complexité de nos offres en un site clair et percutant. Depuis la mise en ligne, nous constatons un impact réel sur notre image de marque."</p>
  </div>
</div>$newt$),
  updated_at = now()
WHERE slug = 'agence-web-ndjamena';

-- Bangui
UPDATE public.pages SET content = replace(replace(content,
  $oldr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/commune-ngaoundere-2" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/commune%20ngaoundere%202%20Home.webp" alt="Site web Commune de Ngaoundéré 2e réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Commune de Ngaoundéré 2e</div>
      <div class="text-xs text-gray-400 mt-2">Site institutionnel · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/mballen-ong" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Mballen%20Homepage%20.webp" alt="Site web ONG MBALLEN réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">MBALLEN ONG</div>
      <div class="text-xs text-gray-400 mt-2">Site associatif · Cameroun</div>
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
</div>$oldr$, $newr$<div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-12">
  <a href="/realisations/mballen-ong" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Mballen%20Homepage%20.webp" alt="Site web ONG MBALLEN réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">MBALLEN ONG</div>
      <div class="text-xs text-gray-400 mt-2">ONG · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/sahel-consulting" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Sahel%20consulting%20home.webp" alt="Site web Sahel Consulting réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Sahel Consulting</div>
      <div class="text-xs text-gray-400 mt-2">Cabinet conseil · Cameroun</div>
    </div>
  </a>
  <a href="/realisations/bandiko-production" class="block overflow-hidden rounded-xl border border-gray-700 bg-dark-gray hover:border-lime-accent transition-opacity">
    <div class="overflow-hidden aspect-video">
      <img src="/Bandiko%20Productions%20Home%201.webp" alt="Site web Bandiko Production réalisé par Wendooka" class="w-full h-full object-cover object-top hover:opacity-90 transition-opacity" width="400" height="225" />
    </div>
    <div class="p-4">
      <div class="font-semibold text-white text-sm">Bandiko Production</div>
      <div class="text-xs text-gray-400 mt-2">Production audiovisuelle · Cameroun</div>
    </div>
  </a>
</div>$newr$),
  $oldt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20Idrissou%20abana%20commune%20ngaoundere%202.webp" alt="Idrissou Abana, Commune de Ngaoundéré 2e" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Idrissou Abana</div>
        <div class="text-xs text-lime-accent mt-1">Commune de Ngaoundéré 2e</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a su comprendre nos besoins institutionnels et livrer un site professionnel et accessible. Le suivi après livraison est exemplaire."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg" alt="Oumarou Sanda Aboubakar, directeur MBALLEN ONG" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Oumarou Sanda Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Directeur, MBALLEN ONG</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement."</p>
  </div>
</div>$oldt$, $newt$<div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/client%20Oumarou%20Sanda%20Aboubakar%20Mballen.jpeg" alt="Oumarou Sanda Aboubakar, Association Mballen" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Oumarou Sanda Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Président, Association Mballen</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Grâce au site créé par Wendooka, notre ONG gagne en crédibilité et nos partenaires internationaux nous trouvent désormais sur Google. Un vrai changement."</p>
  </div>
  <div class="bg-dark-gray border border-gray-700 rounded-xl p-6">
    <div class="flex items-center gap-4 mb-4">
      <img src="/Client%20dewa%20aboubakar%20Bandiko%20productions.webp" alt="Dewa Aboubakar, Bandiko Production" class="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-lime-accent" width="64" height="64" />
      <div>
        <div class="font-semibold text-white">Dewa Aboubakar</div>
        <div class="text-xs text-lime-accent mt-1">Fondateur, Bandiko Production</div>
      </div>
    </div>
    <p class="text-gray-300 italic text-sm leading-relaxed">"Wendooka a parfaitement capté l'essence de notre travail. Le site reflète notre identité et nous positionne à la hauteur de nos ambitions internationales."</p>
  </div>
</div>$newt$),
  updated_at = now()
WHERE slug = 'agence-web-bangui';
