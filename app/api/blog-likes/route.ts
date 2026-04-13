import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/blog-likes?blog_id=xxx
 * Returns the total like count for a blog.
 */
export async function GET(req: NextRequest) {
  try {
    const blogId = req.nextUrl.searchParams.get("blog_id");
    if (!blogId) return NextResponse.json({ error: "blog_id required" }, { status: 400 });

    const { count } = await supabase
      .from("blog_likes")
      .select("id", { count: "exact", head: true })
      .eq("blog_id", blogId);

    return NextResponse.json({ likes: count || 0 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/blog-likes
 * Toggle a like for a blog. Uses a fingerprint to deduplicate.
 * Body: { blog_id, slug, fingerprint }
 * Returns: { liked: boolean, likes: number }
 */
export async function POST(req: NextRequest) {
  try {
    const { blog_id, slug, fingerprint } = await req.json();

    if (!blog_id || !slug || !fingerprint) {
      return NextResponse.json({ error: "blog_id, slug, and fingerprint are required" }, { status: 400 });
    }

    // Check if already liked
    const { data: existing } = await supabase
      .from("blog_likes")
      .select("id")
      .eq("blog_id", blog_id)
      .eq("fingerprint", fingerprint)
      .maybeSingle();

    let liked: boolean;

    if (existing) {
      // Unlike - remove the row
      await supabase.from("blog_likes").delete().eq("id", existing.id);
      liked = false;
    } else {
      // Like - insert
      const { error } = await supabase.from("blog_likes").insert({
        blog_id,
        slug,
        fingerprint,
      });
      if (error) {
        console.error("Failed to like:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      liked = true;
    }

    // Return updated count
    const { count } = await supabase
      .from("blog_likes")
      .select("id", { count: "exact", head: true })
      .eq("blog_id", blog_id);

    return NextResponse.json({ liked, likes: count || 0 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
