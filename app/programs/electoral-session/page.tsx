"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Vote, Calendar, Clock, Users, ChevronRight, ShieldCheck, Loader2 } from "lucide-react";

/* ── Types ── */
interface Election {
  id: string;
  title: string;
  description: string | null; 
  status: string;
  is_open: boolean;
  election_date: string;
  start_time: string;
  end_time: string;
  positions_count: number;
  candidates_count: number;
  voters_count: number;
  voted_count: number;
}

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  Ongoing: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", label: "Live Now" },
  Scheduled: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", label: "Upcoming" },
  Completed: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400", label: "Completed" },
  Draft: { bg: "bg-gray-100", text: "text-gray-400", dot: "bg-gray-300", label: "Draft" },
};

function formatDateNice(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime12(time24: string) {
  const [h, m] = time24.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h12}:${m} ${ampm}`;
}

export default function ElectoralSessionPage() {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/elections")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setElections(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const ongoing = elections.filter((e) => e.status === "Ongoing");
  const scheduled = elections.filter((e) => e.status === "Scheduled");
  const completed = elections.filter((e) => e.status === "Completed");

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFF] font-sans text-black overflow-x-hidden">
      <Header />

      <main className="flex-grow pt-32 pb-24 md:pt-44 md:pb-32">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Page Header */}
          <div className="mb-16 md:mb-24 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Vote size={22} />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
                Electoral Session
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[38px] font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-6xl lg:text-[72px]"
            >
              Your Vote,
              <br />
              Your Voice.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-gray-500"
            >
              Participate in SPE-UI elections securely and anonymously.
              Your vote is confidential. No one can see who you voted for.
            </motion.p>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5"
            >
              <ShieldCheck size={16} className="text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Anonymous &amp; Secure Voting</span>
            </motion.div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={28} className="animate-spin text-blue-600" />
            </div>
          ) : elections.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-lg font-semibold text-gray-400">No elections available at the moment.</p>
            </div>
          ) : (
          <>
          {/* Active / Ongoing Elections */}
          {ongoing.length > 0 && (
            <section className="mb-16">
              <div className="mb-6 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <h2 className="text-lg font-bold text-gray-900">Live Elections</h2>
              </div>

              <div className="space-y-4">
                {ongoing.map((election, i) => (
                  <ElectionCard key={election.id} election={election} index={i} featured />
                ))}
              </div>
            </section>
          )}

          {/* Upcoming Elections */}
          {scheduled.length > 0 && (
            <section className="mb-16">
              <h2 className="mb-6 text-lg font-bold text-gray-900">Upcoming Elections</h2>
              <div className="space-y-4">
                {scheduled.map((election, i) => (
                  <ElectionCard key={election.id} election={election} index={i + ongoing.length} />
                ))}
              </div>
            </section>
          )}

          {/* Past Elections */}
          {completed.length > 0 && (
            <section>
              <h2 className="mb-6 text-lg font-bold text-gray-500">Past Elections</h2>
              <div className="space-y-4">
                {completed.map((election, i) => (
                  <ElectionCard key={election.id} election={election} index={i + ongoing.length + scheduled.length} />
                ))}
              </div>
            </section>
          )}
          </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ── Election Card ── */
function ElectionCard({
  election,
  index,
  featured = false,
}: {
  election: Election;
  index: number;
  featured?: boolean;
}) {
  const config = STATUS_CONFIG[election.status] || STATUS_CONFIG.Draft;
  const turnout = election.voters_count > 0 ? Math.round((election.voted_count / election.voters_count) * 100) : 0;
  const isClickable = election.is_open && election.status === "Ongoing";

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-3xl border bg-white p-6 sm:p-8 transition-all duration-300 ${
        featured
          ? "border-emerald-200 shadow-lg shadow-emerald-100/50 hover:shadow-xl hover:shadow-emerald-100/60"
          : election.status === "Completed"
            ? "border-gray-100 opacity-75 hover:opacity-100"
            : "border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-100"
      } ${isClickable ? "cursor-pointer" : ""}`}
    >
      {/* Status + Live dot */}
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold ${config.bg} ${config.text}`}>
          {election.status === "Ongoing" && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`} />
            </span>
          )}
          {election.status !== "Ongoing" && <span className={`h-2 w-2 rounded-full ${config.dot}`} />}
          {config.label}
        </div>
        {isClickable && (
          <ChevronRight size={20} className="text-gray-300 transition-all group-hover:text-blue-600 group-hover:translate-x-1" />
        )}
      </div>

      {/* Title + Description */}
      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{election.title}</h3>
      {election.description && (
        <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500 line-clamp-2">{election.description}</p>
      )}

      {/* Meta row */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
          <Calendar size={15} />
          <span>{formatDateNice(election.election_date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
          <Clock size={15} />
          <span>{formatTime12(election.start_time)} – {formatTime12(election.end_time)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
          <Users size={15} />
          <span>{election.positions_count} positions · {election.candidates_count} candidates</span>
        </div>
      </div>

      {/* Turnout bar (only for ongoing/completed) */}
      {(election.status === "Ongoing" || election.status === "Completed") && (
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {election.status === "Ongoing" ? "Live Turnout" : "Final Turnout"}
            </span>
            <span className="text-xs font-bold text-gray-500">
              {election.voted_count}/{election.voters_count} ({turnout}%)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <motion.div
              className={`h-full rounded-full ${
                election.status === "Ongoing"
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                  : "bg-gray-300"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${turnout}%` }}
              transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* CTA for ongoing */}
      {election.status === "Ongoing" && election.is_open && (
        <div className="mt-6 flex items-center gap-3">
          <span className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all group-hover:bg-blue-700 group-hover:shadow-xl group-hover:shadow-blue-300">
            Cast Your Vote
          </span>
        </div>
      )}

      {/* Closed state message */}
      {!election.is_open && election.status !== "Completed" && (
        <div className="mt-6 flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-5 py-2.5">
            <Clock size={14} className="text-amber-500" />
            <span className="text-sm font-semibold text-amber-700">Awaiting to open</span>
          </div>
        </div>
      )}
    </motion.div>
  );

  if (isClickable) {
    return (
      <Link href={`/programs/electoral-session/${election.id}/auth`}>
        {inner}
      </Link>
    );
  }
  return inner;
}
