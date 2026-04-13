import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

/* ── Compute live status from date/time ── */
function computeStatus(election: {
  status: string;
  election_date: string | null;
  start_time: string | null;
  end_time: string | null;
}): string {
  if (election.status === "Draft") return "Draft";
  if (!election.election_date || !election.start_time || !election.end_time) {
    return election.status;
  }
  const now = new Date();
  const startDT = new Date(`${election.election_date}T${election.start_time}`);
  const endDT = new Date(`${election.election_date}T${election.end_time}`);
  if (now > endDT) return "Completed";
  if (now >= startDT && now <= endDT) return "Ongoing";
  return "Scheduled";
}

/**
 * POST /api/elections/[id]/vote
 * Cast a ballot - one candidate per position.
 *
 * Body: { voter_id: string, votes: Record<position_id, candidate_id> }
 *
 * - Validates election is Ongoing
 * - Validates voter hasn't already voted
 * - Inserts anonymous votes (no voter_id in election_votes)
 * - Marks voter as has_voted
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: electionId } = await params;
    const body = await req.json();
    const { voter_id, votes } = body as {
      voter_id: string;
      votes: Record<string, string>;
    };

    if (!voter_id || !votes || typeof votes !== "object") {
      return NextResponse.json(
        { error: "voter_id and votes are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    // 1. Fetch election + validate it's Ongoing
    const { data: election, error: elErr } = await supabase
      .from("elections")
      .select("id, status, election_date, start_time, end_time, title, is_open")
      .eq("id", electionId)
      .single();

    if (elErr || !election) {
      return NextResponse.json({ error: "Election not found." }, { status: 404 });
    }

    if (!election.is_open) {
      return NextResponse.json(
        { error: "This election is not open for voting yet." },
        { status: 403 }
      );
    }

    const liveStatus = computeStatus(election);
    if (liveStatus !== "Ongoing") {
      return NextResponse.json(
        { error: `This election is ${liveStatus.toLowerCase()}. Voting is not available.` },
        { status: 403 }
      );
    }

    // 2. Check voter assignment + hasn't voted
    const { data: assignment, error: assignErr } = await supabase
      .from("election_voter_assignments")
      .select("id, has_voted")
      .eq("election_id", electionId)
      .eq("voter_id", voter_id)
      .single();

    if (assignErr || !assignment) {
      return NextResponse.json(
        { error: "You are not eligible to vote in this election." },
        { status: 403 }
      );
    }

    if (assignment.has_voted) {
      return NextResponse.json(
        { error: "You have already voted in this election." },
        { status: 409 }
      );
    }

    // 3. Validate all positions are covered
    const { data: positions } = await supabase
      .from("election_positions")
      .select("id")
      .eq("election_id", electionId);

    const positionIds = (positions || []).map((p) => p.id);
    const votedPositionIds = Object.keys(votes);

    for (const posId of positionIds) {
      if (!votedPositionIds.includes(posId) || !votes[posId]) {
        return NextResponse.json(
          { error: "You must vote for all positions." },
          { status: 400 }
        );
      }
    }

    // 4. Validate all candidates belong to their positions
    const { data: candidates } = await supabase
      .from("election_candidates")
      .select("id, position_id")
      .eq("election_id", electionId);

    const candidateMap = new Map((candidates || []).map((c) => [c.id, c.position_id]));

    for (const [posId, candId] of Object.entries(votes)) {
      if (candidateMap.get(candId) !== posId) {
        return NextResponse.json(
          { error: "Invalid candidate selection." },
          { status: 400 }
        );
      }
    }

    // 5. Insert anonymous votes (NO voter_id in election_votes)
    const voteRows = Object.entries(votes).map(([position_id, candidate_id]) => ({
      election_id: electionId,
      position_id,
      candidate_id,
    }));

    const { error: insertErr } = await supabase
      .from("election_votes")
      .insert(voteRows);

    if (insertErr) throw insertErr;

    // 6. Mark voter as has_voted
    const { error: updateErr } = await supabase
      .from("election_voter_assignments")
      .update({ has_voted: true, voted_at: new Date().toISOString() })
      .eq("id", assignment.id);

    if (updateErr) throw updateErr;

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit vote";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
