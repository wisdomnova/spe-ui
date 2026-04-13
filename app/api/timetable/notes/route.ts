import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/timetable/notes - add a note to a course
 */
export async function POST(req: NextRequest) {
  try {
    const { course_id, content } = await req.json();

    if (!course_id || !content?.trim()) {
      return NextResponse.json(
        { error: "course_id and content are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("course_notes")
      .insert({ course_id, content: content.trim() })
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
