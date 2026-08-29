"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function PeeledSticker() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[990] select-none"
    >
      <Link href="/events/register" className="group block relative">
        {/* Drop Shadow underneath the physical sticker */}
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 bg-black/80 rounded-2xl pointer-events-none transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />

        {/* Outer Sticker Container */}
        <div
          className="relative w-52 sm:w-64 bg-black text-white p-4 sm:p-5 rounded-2xl border-2 sm:border-4 border-white shadow-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1"
          style={{
            // Slices off the top-right corner where the peel occurs
            clipPath: isHovered
              ? "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)"
              : "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)",
            transition: "clip-path 0.3s ease",
          }}
        >
          {/* Top Yellow Tag */}
          <div className="inline-block bg-[#FACC15] text-black text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm mb-2 sm:mb-3">
            SPE UI CHAPTER
          </div>

          {/* Main Block Typography */}
          <div className="space-y-0.5 mb-2 sm:mb-3">
            <h3 className="text-xl sm:text-2xl font-black tracking-tighter text-white uppercase leading-none">
              IND WK <span className="text-[#2563EB]">26</span>
            </h3>
            <p className="text-[10px] sm:text-xs font-black text-[#FACC15] uppercase tracking-widest">
              ANTICIPATE
            </p>
          </div>

          {/* Bottom Accent Details */}
          <div className="flex items-center justify-between border-t-2 border-white/20 pt-2 sm:pt-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-gray-300">
            <span>SEPT 14 to 18</span>
            <span className="bg-[#2563EB] text-white px-2 py-0.5 rounded-sm whitespace-nowrap">
              REGISTER NOW
            </span>
          </div>
        </div>

        {/* 3D Peeled Corner Fold Flap (Top-Right Corner) */}
        <div
          className="absolute top-0 right-0 pointer-events-none transition-all duration-300"
          style={{
            width: isHovered ? "32px" : "22px",
            height: isHovered ? "32px" : "22px",
          }}
        >
          {/* Shadow behind the peeled flap */}
          <div className="absolute inset-0 bg-black/40 blur-[2px] translate-x-[-2px] translate-y-[2px]" />

          {/* Silver / Metallic Adhesive Backside Triangle */}
          <div
            className="w-full h-full bg-[#CBD5E1] border-b-2 border-l-2 border-white shadow-md"
            style={{
              clipPath: "polygon(0 0, 100% 100%, 0 100%)",
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
