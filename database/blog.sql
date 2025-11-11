-- Enable Row Level Security
alter table public.blog_posts enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.post_tags enable row level security;

-- Create Categories Table
create table public.categories (
    id uuid default gen_random_uuid() primary key,
    name text not null unique,
    slug text not null unique,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Tags Table
create table public.tags (
    id uuid default gen_random_uuid() primary key,
    name text not null unique,
    slug text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Blog Posts Table
create table public.blog_posts (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    slug text not null unique,
    content text not null,
    excerpt text,
    featured_image text,
    status text not null default 'draft'::text,
    published_at timestamp with time zone,
    category_id uuid references public.categories(id),
    user_id uuid references auth.users not null,
    seo_title text,
    meta_description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Post Tags Junction Table
create table public.post_tags (
    post_id uuid references public.blog_posts(id) on delete cascade,
    tag_id uuid references public.tags(id) on delete cascade,
    primary key (post_id, tag_id)
);

-- Create RLS Policies

-- Categories Policies
create policy "Categories are viewable by everyone"
    on categories for select
    using ( true );

create policy "Categories are insertable by authenticated users"
    on categories for insert
    with check ( auth.role() = 'authenticated' );

create policy "Categories are updatable by authenticated users"
    on categories for update
    using ( auth.role() = 'authenticated' );

create policy "Categories are deletable by authenticated users"
    on categories for delete
    using ( auth.role() = 'authenticated' );

-- Tags Policies
create policy "Tags are viewable by everyone"
    on tags for select
    using ( true );

create policy "Tags are insertable by authenticated users"
    on tags for insert
    with check ( auth.role() = 'authenticated' );

create policy "Tags are updatable by authenticated users"
    on tags for update
    using ( auth.role() = 'authenticated' );

create policy "Tags are deletable by authenticated users"
    on tags for delete
    using ( auth.role() = 'authenticated' );

-- Blog Posts Policies
create policy "Blog posts are viewable by everyone"
    on blog_posts for select
    using ( true );

create policy "Blog posts are insertable by authenticated users"
    on blog_posts for insert
    with check ( auth.role() = 'authenticated' );

create policy "Blog posts are updatable by owner"
    on blog_posts for update
    using ( auth.uid() = user_id );

create policy "Blog posts are deletable by owner"
    on blog_posts for delete
    using ( auth.uid() = user_id );

-- Post Tags Policies
create policy "Post tags are viewable by everyone"
    on post_tags for select
    using ( true );

create policy "Post tags are insertable by post owner"
    on post_tags for insert
    with check ( 
        exists (
            select 1 from blog_posts
            where id = post_id
            and user_id = auth.uid()
        )
    );

create policy "Post tags are deletable by post owner"
    on post_tags for delete
    using (
        exists (
            select 1 from blog_posts
            where id = post_id
            and user_id = auth.uid()
        )
    );