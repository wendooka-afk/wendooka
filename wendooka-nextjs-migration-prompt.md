# Prompt de Migration — Wendooka.com : React/Vite → Next.js 15 (App Router)

> **Outil cible :** Claude (claude.ai) ou Cursor/Windsurf en mode Agent
> **Objectif :** Migrer le site wendooka.com de React+Vite (CSR) vers Next.js 15 avec App Router et SSG/SSR pour corriger le problème SEO fondamental (Google voit du HTML vide).

---

## CONTEXTE DU PROJET

Tu vas migrer **wendooka.com**, le site d'une agence web & marketing digital basée à Ngaoundéré, Cameroun. Le site actuel est en **React 18 + Vite 6 + TypeScript** avec du Client-Side Rendering (CSR) — ce qui empêche Google d'indexer le contenu. La migration vers **Next.js 15 App Router** avec SSG (Static Site Generation) et SSR (Server-Side Rendering) résoudra ce problème SEO critique.

### Stack actuelle (source)
- React 18 + Vite 6 + TypeScript
- React Router DOM v6 (routing côté client)
- Tailwind CSS + shadcn/ui (Radix UI)
- Supabase JS v2 (base de données PostgreSQL)
- TanStack Query v5
- Framer Motion v12
- React Quill (éditeur rich text dans le dashboard)
- date-fns, dompurify, embla-carousel, lucide-react, next-themes
- `src/data/servicesData.ts` — fichier TypeScript contenant les données statiques (articles, services, projets)

### Stack cible (destination)
- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** (conserver exactement les mêmes classes)
- **shadcn/ui** (conserver tous les composants Radix)
- **Supabase JS v2** (côté serveur via Server Components + Server Actions)
- **Framer Motion** (uniquement dans les Client Components marqués `'use client'`)
- **next-themes** pour le mode sombre
- **TanStack Query** uniquement dans les Client Components qui en ont besoin
- **Hébergeur :** Hostinger (supporte Next.js nativement)

---

## STRUCTURE DES ROUTES (22 URLs à conserver exactement)

### Pages publiques statiques
| Route actuelle | Route Next.js App Router | Stratégie de rendu |
|---|---|---|
| `/` | `app/page.tsx` | SSG |
| `/services` | `app/services/page.tsx` | SSG |
| `/portfolio` | `app/portfolio/page.tsx` | SSG |
| `/contact` | `app/contact/page.tsx` | SSG |
| `/about` | `app/about/page.tsx` | SSG |
| `/blog` | `app/blog/page.tsx` | SSG (revalidate: 3600) |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | SSG |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | SSG |

### Pages dynamiques (generateStaticParams)
| Route actuelle | Route Next.js | Slugs statiques |
|---|---|---|
| `/services/creation-sites-web` | `app/services/[slug]/page.tsx` | creation-sites-web, developpement-web, ui-ux-design, design-graphique, marketing-digital |
| `/portfolio/bandiko-production` | `app/portfolio/[slug]/page.tsx` | bandiko-production, mballen-ong, abouscom, kubaru-sahel, commune-ngaoundere-2, sahel-consulting |
| `/blog/cout-dun-site-web-sur-mesure-en-2024` | `app/blog/[slug]/page.tsx` | cout-dun-site-web-sur-mesure-en-2024, choisir-entre-site-vitrine-et-e-commerce, erreurs-frequentes-projets-web, cout-application-web-sur-mesure, seo-ou-publicite-en-ligne-quel-levier-choisir |

### Page dynamique CMS
| Route actuelle | Route Next.js | Stratégie |
|---|---|---|
| `/:slug` | `app/[slug]/page.tsx` | ISR (revalidate: 3600, fallback: 'blocking') |

### Auth & Dashboard (Client-Side uniquement)
| Route actuelle | Route Next.js | Stratégie |
|---|---|---|
| `/login` | `app/login/page.tsx` | Client Component |
| `/dashboard` | `app/dashboard/layout.tsx` + pages | Client Components + middleware auth |
| `/dashboard/blog` | `app/dashboard/blog/page.tsx` | Client Component |
| `/dashboard/blog/new` | `app/dashboard/blog/new/page.tsx` | Client Component |
| `/dashboard/blog/[id]/edit` | `app/dashboard/blog/[id]/edit/page.tsx` | Client Component |
| `/dashboard/projects` | `app/dashboard/projects/page.tsx` | Client Component |
| `/dashboard/projects/new` | `app/dashboard/projects/new/page.tsx` | Client Component |
| `/dashboard/projects/[id]/edit` | `app/dashboard/projects/[id]/edit/page.tsx` | Client Component |
| `/dashboard/services` | `app/dashboard/services/page.tsx` | Client Component |
| `/dashboard/services/new` | `app/dashboard/services/new/page.tsx` | Client Component |
| `/dashboard/services/[id]/edit` | `app/dashboard/services/[id]/edit/page.tsx` | Client Component |
| `/dashboard/pages` | `app/dashboard/pages/page.tsx` | Client Component |
| `/dashboard/pages/new` | `app/dashboard/pages/new/page.tsx` | Client Component |
| `/dashboard/pages/[id]/edit` | `app/dashboard/pages/[id]/edit/page.tsx` | Client Component |
| `/dashboard/media` | `app/dashboard/media/page.tsx` | Client Component |
| `/dashboard/settings` | `app/dashboard/settings/page.tsx` | Client Component |

---

## DONNÉES STATIQUES (src/data/servicesData.ts)

Ce fichier contient 3 exports TypeScript à conserver tel quel :
- `servicesData` — 5 services avec slug, titre, description, contenu, icône
- `projectsData` — 6 projets avec slug, titre, description, image, technologies
- `blogPostsData` — 5 articles avec slug, titre, contenu HTML, date, auteur, tags

**Règle importante :** Dans les pages SSG, ces données sont la **source principale**. Supabase est la source secondaire (fusion des deux, déduplication par slug).

---

## SCHÉMA SUPABASE (tables existantes)

```sql
-- Tables avec RLS activé
blog_posts (id, slug, title, excerpt, content, status, published_at, updated_at, author, cover_image, tags)
services   (id, slug, title, description, content, status, icon, updated_at)
projects   (id, slug, title, description, content, status, cover_image, technologies, created_at)
pages      (id, slug, title, content, status, meta_title, meta_description, updated_at)
categories (id, name, slug)
tags       (id, name, slug)
post_tags  (post_id, tag_id)

-- Storage bucket
media (public bucket pour images)

-- Auth
Supabase Auth (email/password) pour accès dashboard admin
```

---

## STRUCTURE DE FICHIERS CIBLE

```
wendooka-nextjs/
├── app/
│   ├── layout.tsx                    # RootLayout avec Header, Footer, Providers
│   ├── page.tsx                      # Accueil (SSG)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── services/
│   │   ├── page.tsx                  # Liste services
│   │   └── [slug]/page.tsx           # Détail service (generateStaticParams)
│   ├── portfolio/
│   │   ├── page.tsx                  # Liste projets
│   │   └── [slug]/page.tsx           # Détail projet (generateStaticParams)
│   ├── blog/
│   │   ├── page.tsx                  # Liste articles
│   │   └── [slug]/page.tsx           # Article (generateStaticParams)
│   ├── terms-of-service/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── login/page.tsx                # 'use client'
│   ├── [slug]/page.tsx               # Pages CMS dynamiques (ISR)
│   ├── dashboard/
│   │   ├── layout.tsx                # DashboardLayout + AuthGuard ('use client')
│   │   ├── page.tsx                  # Dashboard index
│   │   ├── blog/...
│   │   ├── projects/...
│   │   ├── services/...
│   │   ├── pages/...
│   │   ├── media/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   └── revalidate/route.ts       # Webhook revalidation depuis Supabase
│   └── not-found.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # 'use client' (menu mobile)
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx           # 'use client' (animations Framer Motion)
│   │   ├── ServicesSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── GlobalCta.tsx
│   │   ├── AboutIntroSection.tsx
│   │   ├── HomeServicesBenefits.tsx
│   │   ├── MarqueeSection.tsx
│   │   ├── RotatingText.tsx
│   │   └── TransformationSection.tsx
│   ├── ui/                           # shadcn/ui components (inchangés)
│   ├── ContactForm.tsx               # 'use client' (react-hook-form)
│   ├── AuthGuard.tsx                 # 'use client'
│   └── ErrorBoundary.tsx             # 'use client'
├── lib/
│   ├── supabase/
│   │   ├── server.ts                 # createServerClient (Server Components)
│   │   └── client.ts                 # createBrowserClient (Client Components)
│   └── utils.ts                      # cn(), helpers
├── data/
│   └── servicesData.ts               # Copie identique depuis src/data/
├── middleware.ts                     # Redirection /dashboard → /login si non auth
├── next.config.ts
├── tailwind.config.ts                # Copie identique
├── public/
│   ├── sitemap.xml                   # Généré au build
│   └── robots.txt
└── package.json
```

---

## RÈGLES DE MIGRATION CRITIQUES

### 1. Métadonnées SEO (generateMetadata)
Chaque page publique DOIT exporter une fonction `generateMetadata` :

```typescript
// Exemple pour app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPostsData.find(p => p.slug === params.slug)
    ?? await getPostFromSupabase(params.slug);

  return {
    title: `${post.title} | Wendooka`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://wendooka.com/blog/${post.slug}`,
      siteName: 'Wendooka',
      images: post.cover_image ? [{ url: post.cover_image }] : [],
      type: 'article',
    },
    alternates: {
      canonical: `https://wendooka.com/blog/${post.slug}`,
    },
  };
}
```

### 2. generateStaticParams pour les 22 URLs

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const staticSlugs = blogPostsData.map(p => ({ slug: p.slug }));
  // Fusionner avec Supabase si dispo
  const { data } = await supabaseServer.from('blog_posts').select('slug').eq('status', 'published');
  const dbSlugs = (data ?? []).map(p => ({ slug: p.slug }));
  const allSlugs = [...staticSlugs];
  for (const s of dbSlugs) {
    if (!allSlugs.find(x => x.slug === s.slug)) allSlugs.push(s);
  }
  return allSlugs;
}

// app/services/[slug]/page.tsx — même pattern avec servicesData
// app/portfolio/[slug]/page.tsx — même pattern avec projectsData
```

### 3. Données structurées Schema.org
Ajouter dans `app/layout.tsx` :

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Wendooka',
  description: 'Agence web & marketing digital — Ngaoundéré, Cameroun',
  url: 'https://wendooka.com',
  telephone: '+237XXXXXXXXX',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ngaoundéré',
    addressCountry: 'CM',
  },
  sameAs: ['https://wendooka.com'],
};
```

### 4. Framer Motion — Client Components uniquement
Tous les composants avec animations Framer Motion doivent avoir `'use client'` en première ligne. Les Server Components ne peuvent PAS utiliser Framer Motion.

### 5. Supabase — deux clients distincts

```typescript
// lib/supabase/server.ts (Server Components, generateStaticParams)
import { createClient } from '@supabase/supabase-js';
export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// lib/supabase/client.ts (Client Components, dashboard)
import { createBrowserClient } from '@supabase/ssr';
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### 6. Variables d'environnement

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
SUPABASE_URL=https://xxxx.supabase.co        # Côté serveur uniquement
SUPABASE_ANON_KEY=xxxx                        # Côté serveur uniquement
NEXT_PUBLIC_SITE_URL=https://wendooka.com
REVALIDATE_SECRET=ton-secret-webhook          # Pour ISR via webhook Supabase
```

### 7. Middleware Auth (protection du dashboard)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('sb-access-token');
  if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

### 8. Sitemap automatique (app/sitemap.ts)
Remplace le script generate-sitemap.mjs :

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { servicesData, projectsData, blogPostsData } from '@/data/servicesData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://wendooka.com';

  const staticPages = ['', '/services', '/portfolio', '/contact', '/about', '/blog'].map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' || path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : path === '/services' ? 0.9 : 0.8,
  }));

  const serviceUrls = servicesData.map(s => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date('2025-01-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const projectUrls = projectsData.map(p => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: new Date('2025-01-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogUrls = blogPostsData.map(b => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...serviceUrls, ...projectUrls, ...blogUrls];
}
```

---

## PACKAGE.JSON CIBLE

```json
{
  "name": "wendooka-nextjs",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "typescript": "^5.0.0",
    "@supabase/supabase-js": "^2.77.0",
    "@supabase/ssr": "^0.5.0",
    "@tanstack/react-query": "^5.56.2",
    "framer-motion": "^12.0.0",
    "tailwindcss": "^3.4.0",
    "date-fns": "^3.6.0",
    "dompurify": "^3.3.1",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.0",
    "react-quill": "^2.0.0",
    "embla-carousel-react": "^8.3.0",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.1",
    "tailwind-merge": "^2.5.0"
  }
}
```

---

## NEXT.CONFIG.TS

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'wendooka.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## ORDRE D'EXÉCUTION RECOMMANDÉ

1. **Initialiser le projet** : `npx create-next-app@latest wendooka-nextjs --typescript --tailwind --eslint --app --src-dir=no`
2. **Copier les fichiers** : `components/ui/`, `data/servicesData.ts`, `tailwind.config.ts`, `.env.local`
3. **Créer le RootLayout** (`app/layout.tsx`) avec Header, Footer, Providers (ThemeProvider, QueryClientProvider)
4. **Migrer les pages publiques SSG** dans l'ordre : `/`, `/about`, `/contact`, `/services`, `/portfolio`, `/blog`
5. **Migrer les pages dynamiques** avec `generateStaticParams` + `generateMetadata`
6. **Migrer le dashboard** (Client Components, AuthGuard, DashboardLayout)
7. **Ajouter le middleware** auth pour `/dashboard`
8. **Ajouter `app/sitemap.ts`** et `app/robots.ts`
9. **Ajouter les données structurées** Schema.org dans le layout
10. **Tester en local** : `npm run build && npm run start`
11. **Déployer sur Hostinger** via le projet Next.js natif

---

## VÉRIFICATIONS FINALES AVANT DÉPLOIEMENT

- [ ] `npm run build` sans erreurs TypeScript
- [ ] Toutes les 22 URLs retournent du HTML complet (pas de page blanche) en `view-source:`
- [ ] `app/sitemap.ts` génère bien 22+ URLs sur `/sitemap.xml`
- [ ] `app/robots.ts` pointe vers `/sitemap.xml`
- [ ] Chaque page a un `<title>` et `<meta name="description">` uniques
- [ ] Les données structurées JSON-LD sont présentes dans le `<head>`
- [ ] Le dashboard `/dashboard` redirige vers `/login` si non connecté
- [ ] Les images Supabase Storage se chargent correctement via `next/image`
- [ ] Framer Motion fonctionne dans les Client Components uniquement

---

*Généré par Claude pour Oumarou Sanda — Wendooka / Sanda Vibe Code*
*Date : 2026-02-25*
