import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

/**
 * GET /api/track/click?id=<queue_id>&url=<encoded_destination>
 *
 * Click-tracking redirect. Records the click, then 302-redirects
 * the user to their actual destination.
 */
export async function GET(req: NextRequest) {
  const queueId = req.nextUrl.searchParams.get("id");
  const url = req.nextUrl.searchParams.get("url");

  if (queueId && url) {
    try {
      const supabase = getSupabaseServer();
      await supabase.from("email_clicks").insert({
        queue_id: queueId,
        url,
      });
    } catch {
      // Never fail the redirect - analytics is best-effort
    }
  }

  // Always redirect, even if tracking fails
  const destination = url || process.env.NEXT_PUBLIC_SITE_URL || "https://speui.org";

  return NextResponse.redirect(destination, { status: 302 });
}
