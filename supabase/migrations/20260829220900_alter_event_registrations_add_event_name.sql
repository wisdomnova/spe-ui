-- Alter table to add event_name column if missing
alter table event_registrations add column if not exists event_name text not null default 'Industry Week ''26';

-- Force reload PostgREST schema cache to make the column immediately available to the API
notify pgrst, 'reload schema';
