import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * GET /api/timetable?level=100&type=class
 * Returns the timetable (auto-created if missing) with all courses + notes
 */
export async function GET(req: NextRequest) {
  try {
    const level = Number(req.nextUrl.searchParams.get("level"));
    const type = req.nextUrl.searchParams.get("type");

    if (![100, 200, 300, 400, 500].includes(level)) {
      return NextResponse.json(
        { error: "level must be 100, 200, 300, 400, or 500" },
        { status: 400 }
      );
    }
    if (!type || !["class", "exam"].includes(type)) {
      return NextResponse.json(
        { error: "type must be 'class' or 'exam'" },
        { status: 400 }
      );
    }

    /* Get or create the timetable row */
    let { data: timetable } = await supabase
      .from("timetables")
      .select("*")
      .eq("level", level)
      .eq("type", type)
      .single();

    if (!timetable) {
      const { data: created, error: createErr } = await supabase
        .from("timetables")
        .insert({ level, type })
        .select()
        .single();

      if (createErr) {
        /* Race condition - another request may have created it */
        const { data: retry } = await supabase
          .from("timetables")
          .select("*")
          .eq("level", level)
          .eq("type", type)
          .single();
        timetable = retry;
        if (!timetable) {
          return NextResponse.json(
            { error: createErr.message },
            { status: 500 }
          );
        }
      } else {
        timetable = created;
      }
    }

    /* Fetch courses with their notes */
    const { data: courses, error: coursesErr } = await supabase
      .from("timetable_courses")
      .select("*, course_notes(*)")
      .eq("timetable_id", timetable.id)
      .order("start_time", { ascending: true });

    if (coursesErr) {
      return NextResponse.json(
        { error: coursesErr.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      timetable: { ...timetable, courses: courses ?? [] },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
