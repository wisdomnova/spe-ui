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
  if (election.status === "Completed") return "Completed";
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

export async function GET() {
  try {
    const supabase = getSupabaseServer();

    // Fetch elections (exclude Draft)
    const { data: elections, error: electionsErr } = await supabase
      .from("elections")
      .select("id, title, description, status, is_open, election_date, start_time, end_time, created_at")
      .neq("status", "Draft")
      .order("election_date", { ascending: false });

    if (electionsErr) throw electionsErr;
    if (!elections?.length) {
      return NextResponse.json([]);
    }

    const electionIds = elections.map((e) => e.id);

    // Fetch counts in parallel
    const [positionsRes, candidatesRes, votersRes, votedRes] = await Promise.all([
      supabase
        .from("election_positions")
        .select("election_id")
        .in("election_id", electionIds),
      supabase
        .from("election_candidates")
        .select("election_id")
        .in("election_id", electionIds),
      supabase
        .from("election_voter_assignments")
        .select("election_id")
        .in("election_id", electionIds),
      supabase
        .from("election_voter_assignments")
        .select("election_id")
        .in("election_id", electionIds)
        .eq("has_voted", true),
    ]);

    // Count per election
    const countBy = (data: { election_id: string }[] | null) => {
      const map: Record<string, number> = {};
      (data || []).forEach((d) => {
        map[d.election_id] = (map[d.election_id] || 0) + 1;
      });
      return map;
    };

    const posCounts = countBy(positionsRes.data);
    const candCounts = countBy(candidatesRes.data);
    const voterCounts = countBy(votersRes.data);
    const votedCounts = countBy(votedRes.data);

    const result = elections.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      status: computeStatus(e),
      is_open: e.is_open ?? false,
      election_date: e.election_date,
      start_time: e.start_time,
      end_time: e.end_time,
      positions_count: posCounts[e.id] || 0,
      candidates_count: candCounts[e.id] || 0,
      voters_count: voterCounts[e.id] || 0,
      voted_count: votedCounts[e.id] || 0,
    }));

    // Sort: Ongoing first, then Scheduled, then Completed
    const statusOrder: Record<string, number> = { Ongoing: 0, Scheduled: 1, Completed: 2 };
    result.sort((a, b) => (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3));

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch elections";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
