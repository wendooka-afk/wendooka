/**
 * Helper SEO/GEO centralisé pour le SPA.
 * Gère : title, meta description, canonical, Open Graph, Twitter Cards
 * et JSON-LD par page (balises marquées data-seo pour remplacement à chaque navigation).
 */

export const SITE = {
    name: 'Wendooka',
    url: 'https://wendooka.com',
    logo: 'https://wendooka.com/Logo Wendooka.webp',
    defaultImage: 'https://wendooka.com/Logo Wendooka.webp',
    locale: 'fr_FR',
    phone: '+237672051289',
    email: 'contact@wendooka.com',
    city: 'Ngaoundéré',
    country: 'CM',
    // Coordonnées Ngaoundéré, Cameroun
    geo: { latitude: 7.3167, longitude: 13.5833 },
};

interface SeoInput {
    title: string;
    description: string;
    /** Chemin relatif ("/realisations/mballen-ong") ou URL absolue */
    canonical?: string;
    image?: string;
    /** "website" (défaut) ou "article" */
    ogType?: 'website' | 'article';
    /** Objets JSON-LD injectés dans <head>, remplacés à chaque appel */
    jsonLd?: object[];
}

const ensureMeta = (attr: 'name' | 'property', key: string, content: string) => {
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
};

export function applySeo({ title, description, canonical, image, ogType = 'website', jsonLd = [] }: SeoInput) {
    const url = canonical
        ? (canonical.startsWith('http') ? canonical : `${SITE.url}${canonical}`)
        : `${SITE.url}${window.location.pathname}`;
    const img = image
        ? (image.startsWith('http') ? image : `${SITE.url}${encodeURI(image)}`)
        : SITE.defaultImage;

    document.title = title;
    ensureMeta('name', 'description', description);

    // Canonical
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
    }
    link.href = url;

    // Open Graph
    ensureMeta('property', 'og:title', title);
    ensureMeta('property', 'og:description', description);
    ensureMeta('property', 'og:url', url);
    ensureMeta('property', 'og:image', img);
    ensureMeta('property', 'og:type', ogType);
    ensureMeta('property', 'og:site_name', SITE.name);
    ensureMeta('property', 'og:locale', SITE.locale);

    // Twitter
    ensureMeta('name', 'twitter:card', 'summary_large_image');
    ensureMeta('name', 'twitter:title', title);
    ensureMeta('name', 'twitter:description', description);
    ensureMeta('name', 'twitter:image', img);

    // JSON-LD par page — on remplace les scripts de la page précédente
    document.head.querySelectorAll('script[data-seo="page"]').forEach((s) => s.remove());
    for (const obj of jsonLd) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'page');
        script.textContent = JSON.stringify(obj);
        document.head.appendChild(script);
    }
}

/** Fil d'Ariane schema.org */
export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${SITE.url}${item.path}`,
    })),
});

/** FAQPage schema.org — fort levier rich snippets + citations IA */
export const faqLd = (faqs: { question: string; answer: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
});
