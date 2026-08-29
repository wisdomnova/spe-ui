-- Make team_member_id nullable in spotlights table to support custom spotlights
alter table spotlights alter column team_member_id drop not null;

-- Add custom profile details columns directly to spotlights table
alter table spotlights
  add column if not exists name text,
  add column if not exists role text,
  add column if not exists department text,
  add column if not exists image_url text;

-- Force reload PostgREST schema cache
notify pgrst, 'reload schema';
