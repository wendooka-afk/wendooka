export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    short_description?: string;
    category: string;
    tags: string[];
    image: string;
    gallery?: string[];
    client?: string;
    role?: string;
    year?: string;
    challenge?: string; // HTML or text
    solution?: string; // HTML or text
    results?: string; // HTML or text
    link?: string; // Live site URL
    status: 'draft' | 'published';
    created_at?: string;
    seo_title?: string;
    meta_description?: string;
    context?: string;
    related_services?: { title: string; slug: string }[];
    problems_identified?: string[];
    duration?: string;
    representative_reason?: string;
}
