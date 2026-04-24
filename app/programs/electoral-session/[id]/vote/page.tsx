"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import VotingCrowd from "@/components/elections/VotingCrowd";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Vote,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  User,
  AlertCircle,
  Loader2,
  PartyPopper,
  Lock,
} from "lucide-react";

/* ── Types ── */
interface Candidate {
  id: string;
  position_id: string;
  name: string;
  matric_number: string | null;
  image_url: string | null;
  bio: string | null;
}

interface Position {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
  candidates: Candidate[];
}

interface ElectionData {
  id: string;
  title: string;
  description: string | null;
  status: string;
  election_date: string;
  start_time: string;
  end_time: string;
  positions: Position[];
  voters_count: number;
  voted_count: number;
}

function formatTime12(time24: string) {
  const [h, m] = time24.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h12}:${m} ${ampm}`;
}

export default function VotePage() {
  const NONE_OF_ABOVE_TOKEN = "__NONE_OF_ABOVE__";
  const params = useParams();
  const router = useRouter();
  const electionId = params?.id as string;

  // Data from API
  const [election, setElection] = useState<ElectionData | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  // Voter info from sessionStorage (set by auth page)
  const [voterId, setVoterId] = useState<string | null>(null);

  // Voting state
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showReview, setShowReview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [expandedManifesto, setExpandedManifesto] = useState<string | null>(null);
  const [showNoneConfirm, setShowNoneConfirm] = useState(false);

  // Load election data + voter info
  useEffect(() => {
    // Check voter auth
    const stored = sessionStorage.getItem(`voter_${electionId}`);
    if (!stored) {
      router.push(`/programs/electoral-session/${electionId}/auth`);
      return;
    }
    const { voter_id } = JSON.parse(stored);
    setVoterId(voter_id);

    // Fetch election
    fetch(`/api/elections/${electionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setPageError(data.error);
        } else if (data.status !== "Ongoing") {
          setPageError(`This election is ${data.status?.toLowerCase() || "not available"}. Voting is closed.`);
        } else if (!data.positions?.length) {
          setPageError("No positions found for this election.");
        } else {
          setElection(data);
        }
      })
      .catch(() => setPageError("Failed to load election data."))
      .finally(() => setPageLoading(false));
  }, [electionId, router]);

  const positions = election?.positions || [];
  const position = positions[currentPosition];
  const totalPositions = positions.length;
  const selectedCandidate = position ? (selections[position.id] || null) : null;

  const allSelected = useMemo(
    () => positions.length > 0 && positions.every((p) => selections[p.id]),
    [positions, selections]
  );

  const proceedToNextStep = () => {
    if (currentPosition < totalPositions - 1) {
      setCurrentPosition((p) => p + 1);
      setExpandedManifesto(null);
      return;
    }
    if (allSelected) setShowReview(true);
  };

  const handleSelect = (candidateId: string) => {
    if (!position) return;
    setSelections((prev) => ({
      ...prev,
      [position.id]: prev[position.id] === candidateId ? "" : candidateId,
    }));
  };

  const goNext = () => {
    if (!position || !selectedCandidate) return;
    if (selectedCandidate === NONE_OF_ABOVE_TOKEN) {
      setShowNoneConfirm(true);
      return;
    }
    proceedToNextStep();
  };

  const goPrev = () => {
    if (showReview) {
      setShowReview(false);
    } else if (currentPosition > 0) {
      setCurrentPosition((p) => p - 1);
      setExpandedManifesto(null);
    }
  };

  const handleSubmit = async () => {
    if (!voterId || !election) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch(`/api/elections/${electionId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voter_id: voterId, votes: selections }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Failed to submit vote.");
        setSubmitting(false);
        return;
      }

      // Clear session auth after voting
      sessionStorage.removeItem(`voter_${electionId}`);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── LOADING / ERROR STATE ──
  if (pageLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F8FAFF] font-sans text-black">
        <Header />
        <main className="flex flex-grow items-center justify-center">
          <Loader2 size={32} className="animate-spin text-blue-600" />
        </main>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F8FAFF] font-sans text-black">
        <Header />
        <main className="flex flex-grow items-center justify-center px-6">
          <div className="text-center max-w-md">
            <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Cannot Access Voting Booth</h1>
            <p className="text-sm font-medium text-gray-500 mb-6">{pageError}</p>
            <Link
              href="/programs/electoral-session"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
            >
              Back to Elections
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!election || !position) return null;

  // ── SUCCESS SCREEN ──
  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F8FAFF] font-sans text-black">
        <Header />
        <main className="flex flex-grow items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100"
            >
              <CheckCircle size={48} className="text-emerald-600" />
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Vote Submitted!</h1>
            <p className="mt-4 text-lg font-medium leading-relaxed text-gray-500">
              Your ballot has been cast anonymously. Thank you for participating in the {election.title}.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Your vote is anonymous &amp; sealed</span>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                href="/programs/electoral-session"
                className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
              >
                Back to Elections
              </Link>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                <PartyPopper size={13} className="text-amber-500" />
                Results will be available after voting closes at {election.end_time ? formatTime12(election.end_time) : "the end"}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // ── REVIEW SCREEN ──
  if (showReview) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F8FAFF] font-sans text-black">
        <Header />
        <main className="flex-grow pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="container mx-auto max-w-2xl px-6">
            {/* Back */}
            <button
              onClick={goPrev}
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Positions
            </button>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-100/50"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Vote size={20} />
                  <span className="text-xs font-bold tracking-[0.15em] uppercase text-blue-200">Review Your Ballot</span>
                </div>
                <h2 className="text-xl font-bold">Confirm Your Selections</h2>
                <p className="mt-1 text-sm font-medium text-blue-200">Review your choices below. Once submitted, your vote cannot be changed.</p>
              </div>

              {/* Selections */}
              <div className="divide-y divide-gray-50">
                {positions.map((pos) => {
                  const candidateId = selections[pos.id];
                  const candidate = pos.candidates.find((c) => c.id === candidateId);
                  return (
                    <div key={pos.id} className="flex items-center justify-between px-8 py-5">
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{pos.title}</p>
                        <p className="mt-0.5 text-base font-bold text-gray-900">
                          {candidateId === NONE_OF_ABOVE_TOKEN ? "None of the above" : candidate?.name || "-"}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const idx = positions.findIndex((p) => p.id === pos.id);
                          setCurrentPosition(idx);
                          setShowReview(false);
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Change
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Submit */}
              <div className="px-8 py-6 bg-gray-50/50">
                {submitError && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-3 text-sm font-medium text-red-600">
                    <AlertCircle size={15} /> {submitError}
                  </div>
                )}

                <div className="mb-4 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 p-3 text-sm font-medium text-amber-700">
                  <AlertCircle size={15} />
                  This action is final. You cannot change your vote after submission.
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-base font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <Lock size={16} /> Submit Ballot
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] font-medium text-gray-400">
                  <ShieldCheck size={11} className="inline mr-1 text-emerald-500" />
                  Your ballot is anonymous. No one, not even administrators, can see who you voted for.
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  // ── VOTING BOOTH (POSITION BY POSITION) ──
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFF] font-sans text-black overflow-x-hidden">
      <Header />

      <main className="flex-grow pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex gap-8">
          {/* Left column - Ballot */}
          <div className="flex-1 min-w-0 max-w-3xl">
          {/* Top bar */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/programs/electoral-session"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={16} /> Exit
            </Link>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <ShieldCheck size={13} className="text-emerald-500" /> Anonymous Voting
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Position {currentPosition + 1} of {totalPositions}
              </span>
              <span className="text-xs font-bold text-gray-400">
                {Object.values(selections).filter(Boolean).length}/{totalPositions} selected
              </span>
            </div>
            <div className="flex gap-1.5">
              {positions.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => { setCurrentPosition(i); setExpandedManifesto(null); }}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    i === currentPosition
                      ? "bg-blue-600"
                      : selections[p.id]
                        ? "bg-emerald-400"
                        : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Position card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={position.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              {/* Position header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{position.title}</h1>
                {position.description && (
                  <p className="mt-2 text-sm font-medium text-gray-500">{position.description}</p>
                )}
                <p className="mt-3 text-xs font-semibold text-gray-400">Select one candidate:</p>
              </div>

              {/* Candidates */}
              <div className="space-y-3">
                {position.candidates.map((cand, ci) => {
                  const isSelected = selectedCandidate === cand.id;
                  const isExpanded = expandedManifesto === cand.id;

                  return (
                    <motion.div
                      key={cand.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: ci * 0.06 }}
                      className={`overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-100/50"
                          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md"
                      }`}
                    >
                      {/* Main row */}
                      <button
                        onClick={() => handleSelect(cand.id)}
                        className="flex w-full items-center gap-4 p-5 text-left"
                      >
                        {/* Avatar */}
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black transition-colors ${
                          isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
                        }`}>
                          {cand.image_url ? (
                            <Image src={cand.image_url} alt="" width={56} height={56} className="h-14 w-14 rounded-2xl object-cover" />
                          ) : (
                            cand.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-base font-bold ${isSelected ? "text-blue-700" : "text-gray-900"}`}>
                            {cand.name}
                          </p>
                          {cand.matric_number && <p className="text-xs font-medium text-gray-400 mt-0.5">Matric: {cand.matric_number}</p>}
                        </div>

                        {/* Check circle */}
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                          isSelected
                            ? "border-blue-500 bg-blue-600"
                            : "border-gray-200 bg-white"
                        }`}>
                          {isSelected && <CheckCircle size={16} className="text-white" />}
                        </div>
                      </button>

                      {/* Candidate bio toggle */}
                      {cand.bio && (
                        <div className="px-5 pb-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedManifesto(isExpanded ? null : cand.id);
                            }}
                            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 mb-2"
                          >
                            {isExpanded ? "Hide bio ↑" : "View bio →"}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <p className="text-sm font-medium leading-relaxed text-gray-600 pb-4 border-t border-gray-100 pt-3">
                                  &ldquo;{cand.bio}&rdquo;
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* None of the above option */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                    selectedCandidate === NONE_OF_ABOVE_TOKEN
                      ? "border-amber-500 bg-amber-50/60 shadow-lg shadow-amber-100/60"
                      : "border-gray-100 bg-white hover:border-amber-200 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => handleSelect(NONE_OF_ABOVE_TOKEN)}
                    className="flex w-full items-center gap-4 p-5 text-left"
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black transition-colors ${
                      selectedCandidate === NONE_OF_ABOVE_TOKEN ? "bg-amber-500 text-white" : "bg-amber-100 text-amber-700"
                    }`}>
                      Ø
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-base font-bold ${selectedCandidate === NONE_OF_ABOVE_TOKEN ? "text-amber-700" : "text-gray-900"}`}>
                        None of the above
                      </p>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">
                        Submit a blank preference for this position.
                      </p>
                    </div>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      selectedCandidate === NONE_OF_ABOVE_TOKEN
                        ? "border-amber-500 bg-amber-500"
                        : "border-gray-200 bg-white"
                    }`}>
                      {selectedCandidate === NONE_OF_ABOVE_TOKEN && <CheckCircle size={16} className="text-white" />}
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={currentPosition === 0}
              className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-gray-500 transition-colors hover:bg-white hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={18} /> Previous
            </button>

            <button
              onClick={goNext}
              disabled={!selectedCandidate}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all shadow-lg disabled:opacity-40 disabled:shadow-none ${
                currentPosition === totalPositions - 1 && allSelected
                  ? "bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700"
                  : "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700"
              }`}
            >
              {currentPosition === totalPositions - 1 ? (
                <>Review Ballot <Vote size={16} /></>
              ) : (
                <>Next <ChevronRight size={18} /></>
              )}
            </button>
          </div>

          {/* Bottom trust badge */}
          <div className="mt-8 flex justify-center">
            <p className="text-[11px] font-medium text-gray-300 flex items-center gap-1.5">
              <Lock size={10} className="text-gray-300" />
              Your vote is encrypted and anonymous
            </p>
          </div>
          </div>

          {/* Right column - Live Activity Sidebar (desktop only) */}
          <div className="hidden lg:block w-[280px] shrink-0 sticky top-36 self-start h-[calc(100vh-10rem)]">
            <VotingCrowd electionId={electionId} />
          </div>
          </div>
        </div>
      </main>

      {/* NONE OF THE ABOVE CONFIRM MODAL */}
      <AnimatePresence>
        {showNoneConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-3xl bg-white border border-gray-100 shadow-2xl p-6"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertCircle size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Confirm None of the Above</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    You selected <span className="font-semibold text-gray-700">None of the above</span> for this position.
                    This means no candidate receives your vote here.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowNoneConfirm(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50"
                >
                  Go Back
                </button>
                <button
                  onClick={() => {
                    setShowNoneConfirm(false);
                    proceedToNextStep();
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-600"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
