import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/timetable/courses - add a course to a timetable
 */
export async function POST(req: NextRequest) {
  try {
    const { timetable_id, name, day, start_time, end_time } = await req.json();

    if (!timetable_id || !name?.trim() || !day || !start_time || !end_time) {
      return NextResponse.json(
        { error: "timetable_id, name, day, start_time, and end_time are required" },
        { status: 400 }
      );
    }

    if (!["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].includes(day)) {
      return NextResponse.json({ error: "Invalid day" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("timetable_courses")
      .insert({
        timetable_id,
        name: name.trim(),
        day,
        start_time,
        end_time,
      })
      .select("*, course_notes(*)")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ course: data });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
