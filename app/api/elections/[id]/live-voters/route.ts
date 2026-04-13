import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

/**
 * GET /api/elections/[id]/live-voters
 * Returns the most recent voters (name + time) for the VotingCrowd sidebar.
 * Voter identity is public here (non-anonymous) - only their name and when they voted.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: electionId } = await params;
    const supabase = getSupabaseServer();

    // Fetch recent voters who have voted, joined with voter names
    const { data, error } = await supabase
      .from("election_voter_assignments")
      .select("voter_id, voted_at, voters(id, name)")
      .eq("election_id", electionId)
      .eq("has_voted", true)
      .order("voted_at", { ascending: false, nullsFirst: false })
      .limit(20);

    if (error) throw error;

    // Also get total voted count
    const { count } = await supabase
      .from("election_voter_assignments")
      .select("id", { count: "exact", head: true })
      .eq("election_id", electionId)
      .eq("has_voted", true);

    const voters = (data || []).map((d) => {
      const voter = d.voters as unknown as { id: string; name: string } | null;
      return {
        voter_id: d.voter_id,
        name: voter?.name || "Anonymous",
        voted_at: d.voted_at,
      };
    });

    return NextResponse.json({
      total_voted: count || 0,
      recent_voters: voters,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch live voters";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
