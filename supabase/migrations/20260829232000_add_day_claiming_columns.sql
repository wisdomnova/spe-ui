-- Add day claiming boolean columns to event_registrations
alter table event_registrations 
  add column if not exists day1_claimed boolean not null default false,
  add column if not exists day2_claimed boolean not null default false,
  add column if not exists day3_claimed boolean not null default false;

-- Force reload PostgREST schema cache to reflect the columns immediately
notify pgrst, 'reload schema';
