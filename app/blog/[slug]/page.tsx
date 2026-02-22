"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogSlugPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-black">
      <Header />

      <main className="flex-grow pt-32 pb-24 md:pt-44 md:px-0">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header Section */}
          <div className="flex flex-col gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[34px] font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-[74px] text-gray-900"
            >
              Advancing Energy Education Through Student Leadership
            </motion.h1>
            
            <p className="text-base sm:text-lg font-medium text-gray-500 leading-relaxed max-w-4xl">
              Student leadership plays a vital role in shaping the future of energy education. Through active participation in professional societies, students gain exposure to industry practices, develop leadership skills, and apply classroom knowledge to real-world challenges.
            </p>

            <div className="w-full h-px bg-gray-200 mt-4"></div>

            {/* Author and Badges Section */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-black"></div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900">John Doe</span>
                  <span className="text-base font-medium text-gray-500">Asst. Chief Editor</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-400">
                  4 mins read
                </div>
                <div className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-400">
                  March 26, 2026
                </div>
              </div>
            </div>
          </div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-16 relative aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] shadow-2xl"
          >
            <Image
              src="/blog-dummy.png"
              alt="Advancing Energy Education"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Body Content */}
          <article className="mt-16 flex flex-col gap-8 text-lg font-medium leading-relaxed text-gray-700">
            <p>
              Energy education extends far beyond lecture halls and textbooks. In an industry that evolves rapidly, students must learn not only technical concepts but also leadership, collaboration, and real-world problem solving. This is where student leadership becomes a powerful driver of growth.
            </p>

            <p>
              At the Society of Petroleum Engineers, University of Ibadan (SPEUI), student leaders play an active role in shaping how energy education is experienced on campus. Through carefully planned programs, technical sessions, and industry-focused events, they create opportunities for students to engage with practical knowledge early in their academic journey. These initiatives help bridge the gap between theory and practice, allowing students to better understand the realities of the energy industry.
            </p>

            <p>
              Student leadership also fosters a culture of responsibility and innovation. By leading workshops, conferences, and outreach programs, students learn to manage teams, communicate ideas clearly, and think critically about current energy challenges. These experiences not only strengthen technical understanding but also build confidence and professional competence.
            </p>

            <p>
              Beyond technical growth, student-led platforms encourage collaboration across disciplines and promote discussions around sustainability, ethics, and the future of energy. They inspire students to see themselves not just as learners, but as contributors to the industry's progress.
            </p>

            <p>
              Through strong student leadership, energy education becomes more dynamic, inclusive, and impactful—preparing the next generation of professionals to lead with knowledge, integrity, and purpose.
            </p>
          </article>
        </div>
      </main>

      {/* CTA Section (The Purple One) */}
      <section className="bg-[#6366F1] py-24 text-white md:py-32 mt-24">
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
            <motion.button
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
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
