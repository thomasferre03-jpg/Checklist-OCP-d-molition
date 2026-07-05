create table if not exists public.checklist_item_state (
  item_id integer primary key check (item_id between 1 and 266),
  statut text not null default 'Pas fait' check (statut in ('Fait', 'Pas fait')),
  porteur text not null default '',
  echeance date,
  photo_path text,
  updated_at timestamptz not null default now()
);

alter table public.checklist_item_state
add column if not exists echeance date;

create or replace function public.set_checklist_item_state_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists checklist_item_state_updated_at on public.checklist_item_state;

create trigger checklist_item_state_updated_at
before update on public.checklist_item_state
for each row
execute function public.set_checklist_item_state_updated_at();

alter table public.checklist_item_state enable row level security;

drop policy if exists "Checklist state can be read by the app" on public.checklist_item_state;
drop policy if exists "Checklist state can be inserted by the app" on public.checklist_item_state;
drop policy if exists "Checklist state can be updated by the app" on public.checklist_item_state;
drop policy if exists "Checklist state can be deleted by the app" on public.checklist_item_state;

create policy "Checklist state can be read by the app"
on public.checklist_item_state
for select
to anon, authenticated
using (true);

create policy "Checklist state can be inserted by the app"
on public.checklist_item_state
for insert
to anon, authenticated
with check (true);

create policy "Checklist state can be updated by the app"
on public.checklist_item_state
for update
to anon, authenticated
using (true)
with check (true);

create policy "Checklist state can be deleted by the app"
on public.checklist_item_state
for delete
to anon, authenticated
using (true);

grant select, insert, update, delete on public.checklist_item_state to anon, authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'checklist_item_state'
  ) then
    alter publication supabase_realtime add table public.checklist_item_state;
  end if;
end;
$$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'checklist-photos',
  'checklist-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Checklist photos can be read by the app" on storage.objects;
drop policy if exists "Checklist photos can be uploaded by the app" on storage.objects;
drop policy if exists "Checklist photos can be updated by the app" on storage.objects;
drop policy if exists "Checklist photos can be deleted by the app" on storage.objects;

create policy "Checklist photos can be read by the app"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'checklist-photos');

create policy "Checklist photos can be uploaded by the app"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'checklist-photos');

create policy "Checklist photos can be updated by the app"
on storage.objects
for update
to anon, authenticated
using (bucket_id = 'checklist-photos')
with check (bucket_id = 'checklist-photos');

create policy "Checklist photos can be deleted by the app"
on storage.objects
for delete
to anon, authenticated
using (bucket_id = 'checklist-photos');
