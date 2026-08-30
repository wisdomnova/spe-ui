-- Add Day 4 and Day 5 claimed columns to event_registrations
alter table event_registrations
  add column if not exists day4_claimed boolean not null default false,
  add column if not exists day5_claimed boolean not null default false;

-- Force reload PostgREST schema cache
notify pgrst, 'reload schema';
