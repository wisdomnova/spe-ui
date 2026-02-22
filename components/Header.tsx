"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" },
    { name: "Membership", href: "/membership" },
    { name: "LMS", href: "/lms" },
  ];

  return (
    <>
      <header className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-12 md:py-10 lg:px-24">
        <div className="flex-shrink-0">
          <Image
            src="/speui.png"
            alt="SPE International Logo"
            width={70}
            height={53}
            className="h-auto w-[50px] md:w-[70px]"
            priority
          />
        </div>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex items-center gap-10 rounded-2xl border border-white/20 bg-gray-50/50 px-12 py-4 shadow-[0_8px_32_rgba(0,0,0,0.06)] backdrop-blur-xl">
            {navLinks.map((link) => {
              const isActive = link.href === "/" 
                ? pathname === "/" 
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-semibold transition-colors hover:text-blue-600 cursor-pointer ${
                    isActive ? "text-black border-b-2 border-black pb-0.5" : "text-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl bg-gray-50 p-2 shadow-sm cursor-pointer"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="w-[70px] hidden md:block"></div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-32 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-gray-900 cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 flex flex-col gap-4">
                <button className="h-[60px] w-full cursor-pointer rounded-2xl bg-[#2563eb] text-lg font-bold text-white shadow-lg">
                  Join SPEUI
                </button>
                <button className="h-[60px] w-full cursor-pointer rounded-2xl border border-[#2563eb] text-lg font-bold text-[#2563eb]">
                  LMS Login
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
