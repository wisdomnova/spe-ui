import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

/**
 * POST /api/unsubscribe - unsubscribe a newsletter subscriber
 * Body: { id: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const supabase = getSupabaseServer();

    const { data, error } = await supabase
      .from("submissions")
      .update({ subscribed: false })
      .eq("id", id)
      .select("email")
      .maybeSingle();

    if (error) throw new Error(error.message);

    if (!data) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Successfully unsubscribed" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to unsubscribe";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/unsubscribe?id=<submission_id> - one-click unsubscribe (RFC 8058)
 * Used by email clients that support List-Unsubscribe header.
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = getSupabaseServer();

  await supabase
    .from("submissions")
    .update({ subscribed: false })
    .eq("id", id);

  // Redirect to the unsubscribe confirmation page
  return NextResponse.redirect(new URL(`/unsubscribe?id=${id}&done=1`, req.url));
}
