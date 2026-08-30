-- Add access_code and selected_days columns to event_registrations table
alter table event_registrations
  add column if not exists access_code text,
  add column if not exists selected_days text;

-- Force reload PostgREST schema cache
notify pgrst, 'reload schema';
