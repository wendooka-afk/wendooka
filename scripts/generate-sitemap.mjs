/**
 * generate-sitemap.mjs
 * Génère public/sitemap.xml en interrogeant Supabase avant chaque build.
 * Lancé automatiquement via le script "prebuild" dans package.json.
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Chargement des variables d'environnement depuis .env ─────────────────────
const envPath = resolve(__dirname, '../.env');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !process.env[key]) process.env[key] = value;
  }
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const BASE_URL = 'https://wendooka.com';
const TODAY = new Date().toISOString().split('T')[0];

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Variables manquantes : VITE_SUPABASE_URL et/ou VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Pages statiques ──────────────────────────────────────────────────────────
const STATIC_PAGES = [
  { loc: '/',          priority: '1.0', changefreq: 'weekly'  },
  { loc: '/services',  priority: '0.9', changefreq: 'monthly' },
  { loc: '/portfolio', priority: '0.8', changefreq: 'monthly' },
  { loc: '/contact',   priority: '0.8', changefreq: 'monthly' },
  { loc: '/about',     priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog',      priority: '0.7', changefreq: 'weekly'  },
];

// ─── Contenu statique (src/data/servicesData.ts) ───────────────────────────
const STATIC_SERVICES = [
  { slug: 'creation-sites-web',  lastmod: '2025-01-01' },
  { slug: 'developpement-web',   lastmod: '2025-01-01' },
  { slug: 'ui-ux-design',        lastmod: '2025-01-01' },
  { slug: 'design-graphique',    lastmod: '2025-01-01' },
  { slug: 'marketing-digital',   lastmod: '2025-01-01' },
];

const STATIC_PROJECTS = [
  { slug: 'bandiko-production',   lastmod: '2025-01-01' },
  { slug: 'mballen-ong',          lastmod: '2025-01-01' },
  { slug: 'abouscom',             lastmod: '2025-01-01' },
  { slug: 'kubaru-sahel',         lastmod: '2025-01-01' },
  { slug: 'commune-ngaoundere-2', lastmod: '2025-01-01' },
  { slug: 'sahel-consulting',     lastmod: '2025-01-01' },
];

const STATIC_BLOG_POSTS = [
  { slug: 'cout-dun-site-web-sur-mesure-en-2024',          lastmod: '2024-01-15' },
  { slug: 'choisir-entre-site-vitrine-et-e-commerce',      lastmod: '2024-01-20' },
  { slug: 'erreurs-frequentes-projets-web',                lastmod: '2024-02-05' },
  { slug: 'cout-application-web-sur-mesure',               lastmod: '2024-02-10' },
  { slug: 'seo-ou-publicite-en-ligne-quel-levier-choisir', lastmod: '2024-02-15' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const toDate = (ts) => (ts ? ts.split('T')[0] : TODAY);

const urlEntry = ({ loc, lastmod = TODAY, changefreq = 'monthly', priority = '0.6' }) => `
  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

// ─── Génération ───────────────────────────────────────────────────────────────
async function generateSitemap() {
  console.log('🗺️  Génération du sitemap...');

  const [
    { data: services, error: errServices },
    { data: projects, error: errProjects },
    { data: posts,    error: errPosts    },
  ] = await Promise.all([
    supabase.from('services')  .select('slug, updated_at').eq('status', 'published'),
    supabase.from('projects')  .select('slug, created_at').eq('status', 'published'),
    supabase.from('blog_posts').select('slug, updated_at, published_at').eq('status', 'published'),
  ]);

  if (errServices) console.warn('⚠️  services :', errServices.message);
  if (errProjects) console.warn('⚠️  projects :', errProjects.message);
  if (errPosts)    console.warn('⚠️  blog_posts :', errPosts.message);

  const entries = [];

  // Sets des slugs Supabase pour déduplication
  const dbServiceSlugs = new Set((services ?? []).map(s => s.slug));
  const dbProjectSlugs = new Set((projects ?? []).map(p => p.slug));
  const dbPostSlugs    = new Set((posts    ?? []).map(b => b.slug));

  // Pages statiques
  for (const page of STATIC_PAGES) {
    entries.push(urlEntry({ ...page, lastmod: TODAY }));
  }

  // Services Supabase (priorité)
  for (const s of (services ?? [])) {
    entries.push(urlEntry({
      loc:        `/services/${s.slug}`,
      lastmod:    toDate(s.updated_at),
      changefreq: 'monthly',
      priority:   '0.8',
    }));
  }
  // Services statiques (si non déjà dans Supabase)
  for (const s of STATIC_SERVICES) {
    if (!dbServiceSlugs.has(s.slug)) {
      entries.push(urlEntry({
        loc:        `/services/${s.slug}`,
        lastmod:    s.lastmod,
        changefreq: 'monthly',
        priority:   '0.8',
      }));
    }
  }

  // Projets Supabase (priorité)
  for (const p of (projects ?? [])) {
    entries.push(urlEntry({
      loc:        `/portfolio/${p.slug}`,
      lastmod:    toDate(p.created_at),
      changefreq: 'monthly',
      priority:   '0.7',
    }));
  }
  // Projets statiques (si non déjà dans Supabase)
  for (const p of STATIC_PROJECTS) {
    if (!dbProjectSlugs.has(p.slug)) {
      entries.push(urlEntry({
        loc:        `/portfolio/${p.slug}`,
        lastmod:    p.lastmod,
        changefreq: 'monthly',
        priority:   '0.7',
      }));
    }
  }

  // Articles Supabase (priorité)
  for (const b of (posts ?? [])) {
    entries.push(urlEntry({
      loc:        `/blog/${b.slug}`,
      lastmod:    toDate(b.updated_at ?? b.published_at),
      changefreq: 'monthly',
      priority:   '0.6',
    }));
  }
  // Articles statiques (si non déjà dans Supabase)
  for (const b of STATIC_BLOG_POSTS) {
    if (!dbPostSlugs.has(b.slug)) {
      entries.push(urlEntry({
        loc:        `/blog/${b.slug}`,
        lastmod:    b.lastmod,
        changefreq: 'monthly',
        priority:   '0.6',
      }));
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.join('')}
</urlset>
`;

  const outputPath = resolve(__dirname, '../public/sitemap.xml');
  writeFileSync(outputPath, xml, 'utf-8');

  const staticServicesAdded  = STATIC_SERVICES.filter(s => !dbServiceSlugs.has(s.slug)).length;
  const staticProjectsAdded  = STATIC_PROJECTS.filter(p => !dbProjectSlugs.has(p.slug)).length;
  const staticPostsAdded     = STATIC_BLOG_POSTS.filter(b => !dbPostSlugs.has(b.slug)).length;
  const total = STATIC_PAGES.length
    + (services?.length ?? 0) + staticServicesAdded
    + (projects?.length ?? 0) + staticProjectsAdded
    + (posts?.length    ?? 0) + staticPostsAdded;

  console.log(`✅ Sitemap généré : ${total} URLs → public/sitemap.xml`);
  console.log(`   ├─ ${STATIC_PAGES.length} pages statiques`);
  console.log(`   ├─ ${(services?.length ?? 0) + staticServicesAdded} services  (${services?.length ?? 0} Supabase + ${staticServicesAdded} statiques)`);
  console.log(`   ├─ ${(projects?.length ?? 0) + staticProjectsAdded} projets   (${projects?.length ?? 0} Supabase + ${staticProjectsAdded} statiques)`);
  console.log(`   └─ ${(posts?.length    ?? 0) + staticPostsAdded} articles  (${posts?.length ?? 0} Supabase + ${staticPostsAdded} statiques)`);
}

generateSitemap().catch((err) => {
  console.error('❌ Échec de la génération du sitemap :', err.message);
  process.exit(1);
});
