import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Never cache - always fetch fresh notes from Supabase
export const dynamic = "force-dynamic";

/**
 * GET /api/sticky-notes - fetch all sticky notes (public)
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("sticky_notes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ notes: data ?? [] });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sticky-notes - create a new sticky note (public)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, x, y, color, author } = body;

    if (!content || typeof x !== "number" || typeof y !== "number") {
      return NextResponse.json(
        { error: "Content, x, and y are required." },
        { status: 400 }
      );
    }

    if (content.length > 200) {
      return NextResponse.json(
        { error: "Content must be 200 characters or less." },
        { status: 400 }
      );
    }

    const COLORS = ["yellow", "blue", "green", "pink", "purple", "orange"];
    const safeColor = COLORS.includes(color) ? color : "yellow";
    const safeAuthor = typeof author === "string" ? author.slice(0, 30) : "";

    const { data, error } = await supabase
      .from("sticky_notes")
      .insert({
        content: content.slice(0, 200),
        x,
        y,
        color: safeColor,
        author: safeAuthor,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ note: data });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
