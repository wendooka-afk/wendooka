-- ============================================================
-- WENDOOKA.COM — SETUP SUPABASE COMPLET
-- À exécuter dans Supabase > SQL Editor > New Query
-- Ordre d'exécution : ce fichier unique suffit
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. TABLE : categories (blog)
-- ────────────────────────────────────────────────────────────
create table if not exists public.categories (
    id          uuid default gen_random_uuid() primary key,
    name        text not null unique,
    slug        text not null unique,
    description text,
    created_at  timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

create policy "Categories lisibles par tous"
    on categories for select using ( true );

create policy "Categories créables par utilisateurs authentifiés"
    on categories for insert
    with check ( auth.role() = 'authenticated' );

create policy "Categories modifiables par utilisateurs authentifiés"
    on categories for update
    using ( auth.role() = 'authenticated' );

create policy "Categories supprimables par utilisateurs authentifiés"
    on categories for delete
    using ( auth.role() = 'authenticated' );


-- ────────────────────────────────────────────────────────────
-- 2. TABLE : tags (blog)
-- ────────────────────────────────────────────────────────────
create table if not exists public.tags (
    id         uuid default gen_random_uuid() primary key,
    name       text not null unique,
    slug       text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tags enable row level security;

create policy "Tags lisibles par tous"
    on tags for select using ( true );

create policy "Tags créables par utilisateurs authentifiés"
    on tags for insert
    with check ( auth.role() = 'authenticated' );

create policy "Tags modifiables par utilisateurs authentifiés"
    on tags for update
    using ( auth.role() = 'authenticated' );

create policy "Tags supprimables par utilisateurs authentifiés"
    on tags for delete
    using ( auth.role() = 'authenticated' );


-- ────────────────────────────────────────────────────────────
-- 3. TABLE : blog_posts
-- ────────────────────────────────────────────────────────────
create table if not exists public.blog_posts (
    id              uuid default gen_random_uuid() primary key,
    title           text not null,
    slug            text not null unique,
    content         text not null default '',
    excerpt         text,
    featured_image  text,
    status          text not null default 'draft'
                        check (status in ('draft', 'published', 'scheduled')),
    published_at    timestamp with time zone,
    category_id     uuid references public.categories(id) on delete set null,
    user_id         uuid references auth.users not null,
    seo_title       text,
    meta_description text,
    created_at      timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at      timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.blog_posts enable row level security;

create policy "Articles lisibles par tous"
    on blog_posts for select using ( true );

create policy "Articles créables par utilisateurs authentifiés"
    on blog_posts for insert
    with check ( auth.role() = 'authenticated' );

create policy "Articles modifiables par leur auteur"
    on blog_posts for update
    using ( auth.uid() = user_id );

create policy "Articles supprimables par leur auteur"
    on blog_posts for delete
    using ( auth.uid() = user_id );

-- Trigger : mise à jour automatique de updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger blog_posts_updated_at
    before update on public.blog_posts
    for each row execute function public.set_updated_at();


-- ────────────────────────────────────────────────────────────
-- 4. TABLE : post_tags (table de jonction blog ↔ tags)
-- ────────────────────────────────────────────────────────────
create table if not exists public.post_tags (
    post_id uuid references public.blog_posts(id) on delete cascade,
    tag_id  uuid references public.tags(id) on delete cascade,
    primary key (post_id, tag_id)
);

alter table public.post_tags enable row level security;

create policy "Post-tags lisibles par tous"
    on post_tags for select using ( true );

create policy "Post-tags créables par auteur du post"
    on post_tags for insert
    with check (
        exists (
            select 1 from blog_posts
            where id = post_id and user_id = auth.uid()
        )
    );

create policy "Post-tags supprimables par auteur du post"
    on post_tags for delete
    using (
        exists (
            select 1 from blog_posts
            where id = post_id and user_id = auth.uid()
        )
    );


-- ────────────────────────────────────────────────────────────
-- 5. TABLE : services
-- ────────────────────────────────────────────────────────────
create table if not exists public.services (
    id                  uuid default gen_random_uuid() primary key,
    created_at          timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at          timestamp with time zone default timezone('utc'::text, now()) not null,
    -- Infos de base
    title               text not null,
    subtitle            text,
    slug                text not null unique,
    short_description   text,
    long_description    text,
    category            text not null default 'general',
    price               text,
    status              text not null default 'draft'
                            check (status in ('draft', 'published')),
    featured            boolean default false,
    icon                text,
    cover_image         text,
    hero_image          text,
    -- Section intro
    intro_title         text,
    intro_text          jsonb,   -- tableau de strings
    intro_list          jsonb,   -- tableau de strings
    intro_image         text,
    -- Section prestations
    prestations_title   text,
    prestations_items   jsonb,   -- tableau d'objets {icon, title, description}
    -- Section processus
    process_title       text,
    process_steps       jsonb,   -- tableau d'objets {icon, name, description}
    -- Section résultats
    results_title       text,
    results_stats       jsonb,   -- tableau d'objets {value, label}
    results_text        text,
    results_cta         text,
    -- Section témoignages
    testimonials_title  text,
    testimonials_items  jsonb,   -- tableau d'objets {quote, author, company}
    -- SEO
    seo_title           text,
    meta_description    text,
    canonical_url       text,
    -- Auth
    user_id             uuid references auth.users
);

alter table public.services enable row level security;

create policy "Services lisibles par tous"
    on services for select using ( true );

create policy "Services créables par utilisateurs authentifiés"
    on services for insert
    with check ( auth.role() = 'authenticated' );

create policy "Services modifiables par leur créateur"
    on services for update
    using ( auth.uid() = user_id );

create policy "Services supprimables par leur créateur"
    on services for delete
    using ( auth.uid() = user_id );

create trigger services_updated_at
    before update on public.services
    for each row execute function public.set_updated_at();


-- ────────────────────────────────────────────────────────────
-- 6. TABLE : projects (portfolio)
-- ────────────────────────────────────────────────────────────
create table if not exists public.projects (
    id                   uuid default gen_random_uuid() primary key,
    created_at           timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at           timestamp with time zone default timezone('utc'::text, now()) not null,
    -- Infos de base
    title                text not null,
    slug                 text not null unique,
    description          text,
    short_description    text,
    category             text not null default 'web',
    tags                 jsonb default '[]'::jsonb,
    image                text,
    gallery              jsonb default '[]'::jsonb,
    -- Détails du projet
    client               text,
    role                 text,
    year                 text,
    duration             text,
    link                 text,
    context              text,
    -- Sections narrative
    challenge            text,
    solution             text,
    results              text,
    problems_identified  jsonb default '[]'::jsonb,
    representative_reason text,
    related_services     jsonb default '[]'::jsonb, -- [{title, slug}]
    -- Témoignage client
    testimonial          jsonb, -- {name, role, content, image}
    -- Statut & SEO
    status               text not null default 'draft'
                             check (status in ('draft', 'published')),
    seo_title            text,
    meta_description     text,
    -- Auth
    user_id              uuid references auth.users
);

alter table public.projects enable row level security;

create policy "Projets lisibles par tous"
    on projects for select using ( true );

create policy "Projets créables par utilisateurs authentifiés"
    on projects for insert
    with check ( auth.role() = 'authenticated' );

create policy "Projets modifiables par leur créateur"
    on projects for update
    using ( auth.uid() = user_id );

create policy "Projets supprimables par leur créateur"
    on projects for delete
    using ( auth.uid() = user_id );

create trigger projects_updated_at
    before update on public.projects
    for each row execute function public.set_updated_at();


-- ────────────────────────────────────────────────────────────
-- 7. TABLE : pages (pages dynamiques / DynamicPage.tsx)
-- ────────────────────────────────────────────────────────────
create table if not exists public.pages (
    id               uuid default gen_random_uuid() primary key,
    created_at       timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at       timestamp with time zone default timezone('utc'::text, now()) not null,
    title            text not null,
    slug             text not null unique,
    content          text,
    status           text not null default 'draft'
                         check (status in ('draft', 'published')),
    seo_title        text,
    meta_description text,
    user_id          uuid references auth.users
);

alter table public.pages enable row level security;

create policy "Pages lisibles par tous"
    on pages for select using ( true );

create policy "Pages créables par utilisateurs authentifiés"
    on pages for insert
    with check ( auth.role() = 'authenticated' );

create policy "Pages modifiables par leur créateur"
    on pages for update
    using ( auth.uid() = user_id );

create policy "Pages supprimables par leur créateur"
    on pages for delete
    using ( auth.uid() = user_id );

create trigger pages_updated_at
    before update on public.pages
    for each row execute function public.set_updated_at();


-- ────────────────────────────────────────────────────────────
-- 8. STORAGE : bucket "media" pour la médiathèque
-- ────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Médias lisibles par tous"
    on storage.objects for select
    using ( bucket_id = 'media' );

create policy "Médias uploadables par utilisateurs authentifiés"
    on storage.objects for insert
    with check ( bucket_id = 'media' and auth.role() = 'authenticated' );

create policy "Médias modifiables par utilisateurs authentifiés"
    on storage.objects for update
    using ( bucket_id = 'media' and auth.role() = 'authenticated' );

create policy "Médias supprimables par utilisateurs authentifiés"
    on storage.objects for delete
    using ( bucket_id = 'media' and auth.role() = 'authenticated' );


-- ────────────────────────────────────────────────────────────
-- ✅ FIN DU SETUP — toutes les tables sont prêtes
-- Prochaine étape : créer ton compte admin dans
-- Supabase > Authentication > Users > Add User
-- ────────────────────────────────────────────────────────────
