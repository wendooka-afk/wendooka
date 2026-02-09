
export interface ServiceItem {
    icon: string;
    title: string;
    description: string;
}

export interface ProcessStep {
    icon: string;
    name: string;
    description: string;
}

export interface ResultStat {
    value: string;
    label: string;
}

export interface TestimonialItem {
    quote: string;
    author: string;
    company?: string;
}

export interface Service {
    id: string;
    title: string;
    subtitle?: string;
    slug: string;
    icon?: string;
    hero_image?: string;
    short_description?: string;
    long_description?: string;

    intro_title?: string;
    intro_text?: string[]; // JSONB stored as array of strings
    intro_list?: string[]; // JSONB stored as array of strings
    intro_image?: string;

    prestations_title?: string;
    prestations_items?: ServiceItem[]; // JSONB stored as array of objects

    process_title?: string;
    process_steps?: ProcessStep[]; // JSONB stored as array of objects

    results_title?: string;
    results_stats?: ResultStat[]; // JSONB stored as array of objects
    results_text?: string;
    results_cta?: string;

    testimonials_title?: string;
    testimonials_items?: TestimonialItem[]; // JSONB stored as array of objects

    hero_cta?: string;

    faqs_title?: string;
    faqs?: { question: string; answer: string }[];
    secondary_content?: string;

    seo_title?: string;
    meta_description?: string;
    canonical_url?: string;
    related_articles?: { title: string; slug: string }[];
}
