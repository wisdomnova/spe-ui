import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-Only Supabase Client (service_role key).
 * Bypasses RLS — ONLY use in API routes, never expose to the browser.
 * Lazily initialised so the build doesn't crash when the env var is missing.
 */

let _client: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient {
  if (_client) return _client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SECRET_ROLE;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_ROLE env var"
    );
  }

  _client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _client;
}
