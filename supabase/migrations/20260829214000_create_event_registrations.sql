-- Create table for event registrations (e.g. Industry Week '26)
create table if not exists event_registrations (
  id uuid default gen_random_uuid() primary key,
  event_name text not null default 'Industry Week ''26',
  name text not null,
  email text not null,
  department text not null,
  is_spe_member boolean not null default false,
  is_membership_active boolean,
  whatsapp_number text,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_event_registrations_email on event_registrations (email);

-- Enable RLS
alter table event_registrations enable row level security;

-- Public site CAN insert registrations
drop policy if exists "anon_insert_event_registrations" on event_registrations;
create policy "anon_insert_event_registrations" on event_registrations
  for insert to anon with check (true);

-- Public site CANNOT read/update/delete registrations directly
drop policy if exists "anon_no_select_event_registrations" on event_registrations;
create policy "anon_no_select_event_registrations" on event_registrations
  for select to anon using (false);

drop policy if exists "anon_no_update_event_registrations" on event_registrations;
create policy "anon_no_update_event_registrations" on event_registrations
  for update to anon using (false);

drop policy if exists "anon_no_delete_event_registrations" on event_registrations;
create policy "anon_no_delete_event_registrations" on event_registrations
  for delete to anon using (false);
