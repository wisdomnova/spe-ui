"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Spotlight {
  id: string;
  tags: string[];
  created_at: string;
  team_member: {
    name: string;
    role: string;
    department: string;
    image_url: string | null;
  } | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function MembershipSpotlightPage() {
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpotlights();
  }, []);

  const fetchSpotlights = async () => {
    const { data } = await supabase
      .from("spotlights")
      .select("id, tags, created_at, team_member:team_members(name, role, department, image_url)")
      .order("created_at", { ascending: false });

    setSpotlights((data as unknown as Spotlight[]) || []);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFF]">
      <Header />

      <main className="flex-grow pt-32 pb-24 md:pt-44 md:pb-32">
        <div className="container mx-auto px-6">
          {/* Page Heading */}
          <div className="mb-20 md:mb-28 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-block rounded-full bg-yellow-50 px-6 py-2 text-sm font-bold text-yellow-600 border border-yellow-100"
            >
              Member Spotlight
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl text-[38px] font-bold leading-[1.1] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[84px]"
            >
              Celebrating <span className="text-blue-600">Outstanding</span> Members
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 max-w-2xl text-lg text-gray-500 font-medium"
            >
              Recognising the achievements, dedication, and contributions of our community&apos;s finest members.
            </motion.p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          ) : spotlights.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 px-6">
              <svg width="240" height="190" viewBox="0 0 240 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-8">
                {/* Trophy */}
                <g transform="translate(75, 20)">
                  <path d="M20 10h50v45c0 18-11 30-25 30s-25-12-25-30V10z" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="2" />
                  <rect x="15" y="5" width="60" height="12" rx="6" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1.5" />
                  <path d="M20 20c-12 0-18 8-18 18s6 18 18 18" stroke="#FCD34D" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M70 20c12 0 18 8 18 18s-6 18-18 18" stroke="#FCD34D" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M45 35l4 8 9 1.5-6.5 6.5 1.5 9L45 55l-8 4.5 1.5-9L32 44l9-1.5z" fill="#F59E0B" opacity="0.5" />
                  <rect x="30" y="85" width="30" height="6" rx="3" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1.5" />
                  <rect x="38" y="78" width="14" height="10" rx="2" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1.5" />
                </g>
                {/* Person left */}
                <circle cx="45" cy="95" r="14" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
                <circle cx="45" cy="90" r="6" fill="#93C5FD" />
                <path d="M35 103c0-5.5 4.5-7.5 10-7.5s10 2 10 7.5" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Person right */}
                <circle cx="195" cy="95" r="14" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
                <circle cx="195" cy="90" r="6" fill="#93C5FD" />
                <path d="M185 103c0-5.5 4.5-7.5 10-7.5s10 2 10 7.5" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Sparkles */}
                <circle cx="30" cy="40" r="3" fill="#93C5FD" opacity="0.5" />
                <circle cx="210" cy="40" r="2.5" fill="#FCD34D" opacity="0.6" />
                <circle cx="120" cy="155" r="2" fill="#BFDBFE" opacity="0.5" />
                <path d="M55 30l2.5-7 2.5 7-7-2.5 7-2.5z" fill="#60A5FA" opacity="0.35" />
                <path d="M185 30l2-5 2 5-5-2 5-2z" fill="#F59E0B" opacity="0.4" />
                <path d="M25 130l2-5 2 5-5-2 5-2z" fill="#93C5FD" opacity="0.4" />
                <path d="M215 130l2-5 2 5-5-2 5-2z" fill="#FCD34D" opacity="0.45" />
                <path d="M70 15l1.5 3 3.5.5-2.5 2.5.5 3.5L70 23l-3 1.5.5-3.5L65 18.5l3.5-.5z" fill="#FCD34D" opacity="0.4" />
                <path d="M170 15l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="#FCD34D" opacity="0.4" />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No spotlights yet</h3>
              <p className="text-gray-400 text-sm max-w-xs text-center">
                Our best members will be featured here soon. Watch this space for inspiring stories!
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {spotlights.map((spotlight) => (
                <motion.div
                  key={spotlight.id}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-sm transition-all hover:shadow-xl text-center"
                >
                  {/* Star badge */}
                  <div className="absolute top-6 right-6 text-yellow-200 group-hover:text-yellow-400 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>

                  {/* Avatar */}
                  <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-[2rem] bg-blue-50 border-4 border-white shadow-xl shadow-blue-100/40">
                    {spotlight.team_member?.image_url ? (
                      <Image
                        src={spotlight.team_member.image_url}
                        alt={spotlight.team_member.name}
                        width={112}
                        height={112}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
                        <span className="text-3xl font-black text-blue-300">
                          {spotlight.team_member?.name?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-1">
                    {spotlight.team_member?.name || "Unknown"}
                  </h3>
                  <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-0.5">
                    {spotlight.team_member?.role || ""}
                  </p>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-5">
                    {spotlight.team_member?.department || ""}
                  </p>

                  {/* Tags */}
                  {spotlight.tags && spotlight.tags.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {spotlight.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-bold text-blue-500 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-[#6366F1] py-24 text-white md:py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-[80px] leading-[1.1]">
              Grow Skills. Build Networks.<br />
              Shape Futures.
            </h2>
            <p className="max-w-2xl text-lg font-medium text-white/90 md:text-xl">
              Connect with peers, professionals, and opportunities through SPE University of Ibadan.
            </p>
            <motion.a
              href="#newsletter"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 flex items-center gap-4 rounded-full border border-white/40 bg-white/10 px-10 py-4 text-xl font-bold backdrop-blur-sm transition-all hover:bg-white hover:text-[#6366F1]"
            >
              <span>Join SPE</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-current stroke-[3px]">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
