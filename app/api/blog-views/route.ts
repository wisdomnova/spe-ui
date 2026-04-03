import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/blog-views
 * Record a blog page view. Called from the client-side blog slug page.
 */
export async function POST(req: NextRequest) {
  try {
    const { blog_id, slug, fingerprint } = await req.json();

    if (!blog_id || !slug) {
      return NextResponse.json({ error: "blog_id and slug are required" }, { status: 400 });
    }

    const ua = req.headers.get("user-agent") || "";
    const referrer = req.headers.get("referer") || "";

    // Simple device detection
    const isMobile = /mobile|android|iphone|ipad/i.test(ua);
    const isTablet = /tablet|ipad/i.test(ua);
    const device = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

    const { error } = await supabase.from("blog_views").insert({
      blog_id,
      slug,
      referrer: referrer || null,
      device,
      user_agent: ua.substring(0, 500),
      fingerprint: fingerprint || null,
    });

    if (error) {
      console.error("Failed to record view:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
