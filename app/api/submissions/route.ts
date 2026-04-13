import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

/**
 * POST /api/submissions - submit a newsletter email
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const supabase = getSupabaseServer();

    // Check for duplicate
    const { data: existing } = await supabase
      .from("submissions")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ message: "You're already subscribed!" });
    }

    const { error } = await supabase
      .from("submissions")
      .insert({ email: email.toLowerCase().trim(), status: "New" });

    if (error) throw new Error(error.message);

    return NextResponse.json({ message: "Subscribed successfully!" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
