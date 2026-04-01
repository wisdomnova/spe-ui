"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "#",
      dropdown: [
        { name: "About Us", href: "/about" },
        { name: "Team", href: "/about/team" },
      ],
    },
    {
      name: "Programs",
      href: "#",
      dropdown: [
        { name: "Membership Spotlight", href: "/programs/membership-spotlight" },
        { name: "Become a Sponsor", href: "/programs/sponsor" },
        { name: "Electoral Session", href: "/programs/electoral-session" },
        { name: "Resources", href: "/programs/resources" },
      ],
    },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" },
    { name: "Membership", href: "/membership" },
    { name: "LMS", href: "/lms" },
  ];

  return (
    <>
      <header className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-12 md:py-10 lg:px-24">
        <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-85">
          <Image
            src="/speui.png"
            alt="SPE International Logo"
            width={70}
            height={53}
            className="h-auto w-[50px] md:w-[70px]"
            priority
          />
        </Link>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex items-center gap-10 rounded-2xl border border-white/20 bg-gray-50/50 px-12 py-4 shadow-[0_8px_32_rgba(0,0,0,0.06)] backdrop-blur-xl">
            {navLinks.map((link) => {
              const isActive = link.href === "/" 
                ? pathname === "/" 
                : link.href !== "#" 
                  ? pathname.startsWith(link.href)
                  : link.dropdown?.some((d) => pathname.startsWith(d.href)) ?? false;
              
              if (link.dropdown) {
                const activeChild = link.dropdown.find((d) => pathname.startsWith(d.href));
                return (
                  <div
                    key={link.name}
                    className="relative group h-full flex items-center"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 text-[15px] font-semibold transition-colors hover:text-blue-600 cursor-pointer ${
                        activeDropdown === link.name
                          ? "text-blue-600"
                          : isActive
                            ? "text-blue-600"
                            : "text-gray-800"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                    </button>
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600" />
                    )}
                    
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl border border-white/20 bg-white/90 p-2 shadow-xl backdrop-blur-xl"
                        >
                          {link.dropdown.map((item) => {
                            const isItemActive = pathname.startsWith(item.href);
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                  isItemActive
                                    ? "bg-blue-50 text-blue-600 font-bold"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                }`}
                              >
                                {item.name}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[15px] font-semibold transition-colors hover:text-blue-600 cursor-pointer ${
                    isActive ? "text-blue-600" : "text-gray-800"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl bg-gray-50 p-2 shadow-sm cursor-pointer text-black"
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
            className="fixed inset-0 z-40 bg-white pt-32 px-6 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isMobileActive = link.href === "/"
                  ? pathname === "/"
                  : link.href !== "#"
                    ? pathname.startsWith(link.href)
                    : link.dropdown?.some((d) => pathname.startsWith(d.href)) ?? false;

                return (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div className="flex flex-col gap-4">
                      <span className={`text-3xl font-bold ${isMobileActive ? "text-blue-600" : "text-gray-400"}`}>{link.name}</span>
                      <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-100">
                        {link.dropdown.map((item) => {
                          const isItemActive = pathname.startsWith(item.href);
                          return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`text-2xl font-bold cursor-pointer ${isItemActive ? "text-blue-600" : "text-gray-900"}`}
                          >
                            {item.name}
                          </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-3xl font-bold cursor-pointer ${isMobileActive ? "text-blue-600" : "text-gray-900"}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
                );
              })}
              <div className="mt-8 flex flex-col gap-4 pb-10">
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
