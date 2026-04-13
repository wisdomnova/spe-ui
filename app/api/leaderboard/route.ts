import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Never cache - always fetch fresh leaderboard data
export const dynamic = "force-dynamic";

/**
 * GET /api/leaderboard?game=reaction|emoji&limit=50
 */
export async function GET(req: NextRequest) {
  try {
    const game = req.nextUrl.searchParams.get("game");
    const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") || 50), 100);

    if (!game || !["reaction", "emoji", "stacker"].includes(game)) {
      return NextResponse.json({ error: "game must be 'reaction', 'emoji', or 'stacker'" }, { status: 400 });
    }

    // reaction = lower is better (ascending), emoji/stacker = higher is better (descending)
    const ascending = game === "reaction";

    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .eq("game", game)
      .order("score", { ascending })
      .limit(limit);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ entries: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/leaderboard - submit a score
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { game, player_name, score } = body;

    if (!game || !["reaction", "emoji", "stacker"].includes(game)) {
      return NextResponse.json({ error: "game must be 'reaction', 'emoji', or 'stacker'" }, { status: 400 });
    }

    if (!player_name || typeof player_name !== "string" || player_name.trim().length === 0) {
      return NextResponse.json({ error: "player_name is required" }, { status: 400 });
    }

    if (typeof score !== "number" || score < 0) {
      return NextResponse.json({ error: "score must be a positive number" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("leaderboard")
      .insert({
        game,
        player_name: player_name.trim().slice(0, 30),
        score,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ entry: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
