create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  item_id integer not null check (item_id between 1 and 266),
  title text not null,
  type text not null check (type in ('link', 'image', 'pdf')),
  url text not null,
  storage_bucket text,
  created_at timestamptz not null default now()
);

create index if not exists resources_item_id_created_at_idx
on public.resources (item_id, created_at desc);

alter table public.resources enable row level security;

drop policy if exists "Resources can be read by the app" on public.resources;
drop policy if exists "Resources can be inserted by the app" on public.resources;
drop policy if exists "Resources can be updated by the app" on public.resources;
drop policy if exists "Resources can be deleted by the app" on public.resources;

create policy "Resources can be read by the app"
on public.resources
for select
to anon, authenticated
using (true);

revoke all privileges on table public.resources from anon, authenticated;
grant select on table public.resources to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resources',
  'resources',
  true,
  20971520,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Resources files can be read by the app" on storage.objects;
drop policy if exists "Resources files can be uploaded by the app" on storage.objects;
drop policy if exists "Resources files can be updated by the app" on storage.objects;
drop policy if exists "Resources files can be deleted by the app" on storage.objects;
