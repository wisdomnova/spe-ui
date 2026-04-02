import { createClient } from "@supabase/supabase-js";

/**
 * Server-Only Supabase Client (service_role key).
 * Bypasses RLS — ONLY use in API routes, never expose to the browser.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SECRET_ROLE!;

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
