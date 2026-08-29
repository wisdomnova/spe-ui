-- Rename email column to matric_number in event_registrations table
alter table event_registrations rename column email to matric_number;

-- Force reload PostgREST schema cache to reflect column change immediately
notify pgrst, 'reload schema';
