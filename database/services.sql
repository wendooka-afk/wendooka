-- Enable Row Level Security
alter table public.services enable row level security;

-- Create Services Table
create table public.services (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    slug text not null unique,
    description text,
    content text,
    category text not null,
    price text,
    status text not null default 'draft'::text,
    featured boolean default false,
    icon text,
    cover_image text,
    seo_title text,
    meta_description text,
    user_id uuid references auth.users not null
);

-- Create RLS Policies
create policy "Services are viewable by everyone"
    on services for select
    using ( true );

create policy "Services are editable by authenticated users"
    on services for insert
    with check ( auth.role() = 'authenticated' );

create policy "Services are editable by owner"
    on services for update
    using ( auth.uid() = user_id );

create policy "Services are deletable by owner"
    on services for delete
    using ( auth.uid() = user_id );