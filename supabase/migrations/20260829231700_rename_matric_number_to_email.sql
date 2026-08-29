-- Rename matric_number column back to email in event_registrations table
alter table event_registrations rename column matric_number to email;

-- Force reload PostgREST schema cache
notify pgrst, 'reload schema';
