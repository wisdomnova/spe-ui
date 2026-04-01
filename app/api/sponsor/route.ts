import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/sponsor - public endpoint for sponsor brochure requests
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, organization } = body;

    if (!name || !email || !organization) {
      return NextResponse.json(
        { error: "Name, email, and organization are required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("sponsor_submissions")
      .insert({ name, email, organization });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
