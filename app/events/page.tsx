"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EventsPage() {
  // Dummy data for the gallery frames
  const galleryItemsRow1 = Array(8).fill(0);
  const galleryItemsRow2 = Array(8).fill(0);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-blue-500 selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/event_hero_bg.png"
            alt="Events Hero Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <div className="rounded-full border border-white/30 bg-white/10 px-6 py-2 backdrop-blur-md">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90 sm:text-sm">
                EVENTS AT SPE-UI
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-[40px] font-bold leading-[1.1] tracking-tight sm:text-[60px] md:text-[80px] lg:text-[100px]"
          >
            <span className="flex flex-wrap items-center justify-center gap-x-4">
              More than
              <span className="inline-block rounded-2xl bg-[#2563eb] px-6 py-2 text-white sm:rounded-3xl">
                events.
              </span>
            </span>
            <span className="mt-2">Real industry exposure.</span>
          </motion.h1>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative overflow-hidden bg-black pb-32 pt-10">
        {/* Side Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />

        <div className="flex flex-col gap-12 sm:gap-16">
          {/* Row 1 - Moving Right to Left */}
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 90, // Drastically slowed down
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-6 px-3 sm:gap-10 sm:px-5"
            >
              {[...galleryItemsRow1, ...galleryItemsRow1].map((_, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="relative aspect-[4/3] w-[280px] flex-shrink-0 overflow-hidden rounded-[2rem] border-[6px] border-white/90 bg-gray-900 shadow-2xl sm:w-[450px] sm:border-[10px]"
                >
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#2563eb_0%,_transparent_70%)] opacity-20" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Moving Left to Right */}
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: 95, // Drastically slowed down
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-6 px-3 sm:gap-10 sm:px-5"
            >
              {[...galleryItemsRow2, ...galleryItemsRow2].map((_, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="relative aspect-[4/3] w-[280px] flex-shrink-0 overflow-hidden rounded-[2rem] border-[6px] border-white/90 bg-gray-900 shadow-2xl sm:w-[450px] sm:border-[10px]"
                >
                   <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#2563eb_0%,_transparent_70%)] opacity-20" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Events Grid Section */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-20 flex justify-center">
            <button className="rounded-full border border-blue-600 px-8 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">
              What are the events?
            </button>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
            {[
              { title: "AmbiZero", img: "/ambizero.png" },
              { title: "Industry Week", img: "/industry_week.png" },
              { title: "Egbogah Lecture", img: "/egbogah.png" },
              { title: "Freshers' Welcome", img: "/freshers_welcome.png" },
            ].map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-[#F9FAFB] p-6 transition-all hover:shadow-xl sm:p-8"
              >
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[2rem]">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="mt-8 flex flex-col items-center gap-6">
                  <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {event.title}
                  </h3>
                  
                  <button className="flex items-center gap-3 rounded-full bg-[#171717] px-8 py-4 font-bold text-white transition-transform hover:scale-105 active:scale-95">
                    <span>Learn More</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-3.5 w-3.5 stroke-[#171717] stroke-[3px]"
                      >
                        <path d="M5 12h14m-7-7 7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor Section */}
      <section className="relative overflow-hidden bg-[#1A1A1A] py-24 text-white md:py-32">
        {/* Background World Map */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/worldmap_bg.png"
            alt="World Map Background"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-end lg:gap-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-10">
              <h2 className="text-5xl font-bold leading-none tracking-tight sm:text-7xl lg:text-8xl">
                Become a<br />
                Sponsor
              </h2>
              <div className="overflow-hidden rounded-[2rem]">
                <Image
                  src="/sponsor_01.png"
                  alt="Sponsor Activity"
                  width={500}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="mb-8 overflow-hidden rounded-[2rem] lg:mb-20">
              <Image
                src="/sponsor_02.png"
                alt="Community Interaction"
                width={500}
                height={800}
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-8">
              <div className="overflow-hidden rounded-[2rem]">
                <Image
                  src="/sponsor_03.png"
                  alt="Networking"
                  width={500}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-8">
                <p className="max-w-xs text-base leading-relaxed text-gray-300 md:text-lg">
                  Invest in future energy leaders while gaining visibility within a growing professional community.
                </p>
                <button className="flex items-center gap-4 rounded-full bg-[#2563eb] px-8 py-4 font-bold text-white transition-all hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <span>Get Involved</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-white stroke-[3px]">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Updated Section */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-32 xl:px-48">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="flex flex-col items-start gap-8 lg:w-1/2">
              <h2 className="text-7xl font-bold leading-[0.9] text-[#2563eb] sm:text-[100px] lg:text-[120px]">
                STAY<br />
                UPDATED
              </h2>
              <p className="max-w-md text-lg font-medium text-gray-900 md:text-xl">
                Stay informed about upcoming events, schedules, and registration details through:
              </p>
              <button className="flex items-center gap-6 rounded-full bg-[#2563eb] px-10 py-5 text-xl font-bold text-white transition-all hover:bg-black group">
                <span>Join SPE</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-colors group-hover:bg-blue-600">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-white stroke-[3px]">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="relative w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative mx-auto lg:scale-125 lg:translate-x-12"
              >
                <Image
                  src="/megaphone.png"
                  alt="Megaphone Illustration"
                  width={800}
                  height={800}
                  className="h-auto w-full object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
