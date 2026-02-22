"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MembershipPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFF] font-sans text-black overflow-x-hidden">
      <Header />

      <main className="flex-grow pt-32 pb-24 md:pt-48 md:pb-32">
        {/* Hero Section */}
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start gap-8 lg:w-1/2"
            >
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-7xl lg:text-[84px]">
                Join a Global Community of Future Energy Leaders
              </h1>
              <p className="max-w-xl text-lg font-medium leading-relaxed text-gray-600 md:text-xl">
                SPE University of Ibadan (SPEUI) connects students to industry knowledge, leadership opportunities, and global exposure within the energy sector.
              </p>
              <button className="flex items-center gap-4 rounded-full bg-[#2563eb] px-10 py-4.5 text-lg font-bold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all hover:bg-blue-600 hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)]">
                <span>Join SPEUI</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-white stroke-[3px]">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </button>
            </motion.div>

            {/* Phone Image 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1.35, rotate: 0 }} // Further increased scale
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full lg:w-1/2 flex justify-center lg:justify-start lg:-ml-28" // Pulled in even closer
            >
              <div className="relative w-[360px] sm:w-[600px] lg:w-[850px] aspect-[4/5]">
                <Image
                  src="/phone_01.png"
                  alt="SPEUI Mobile App Mockup"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* How to Join Section */}
        <div className="mt-32 bg-white py-24 md:mt-48 md:py-32">
          <div className="container mx-auto px-6">
            <div className="flex flex-col-reverse items-center justify-between gap-16 lg:flex-row">
              {/* Phone Image 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative w-full lg:w-1/2 flex justify-center lg:justify-start"
              >
                <div className="relative w-[300px] sm:w-[400px] lg:w-[500px] aspect-square">
                  <Image
                    src="/phone_02.png"
                    alt="How to Join SPEUI Mockup"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col items-start gap-10 lg:w-1/2"
              >
                <h2 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-7xl lg:text-[84px]">
                  How to<br />Join SPEUI
                </h2>
                <div className="flex flex-col gap-6 text-lg font-medium text-gray-600 md:text-xl">
                  <div className="flex gap-4">
                    <span className="shrink-0 text-blue-600 font-bold">1.</span>
                    <p>Register as a student member on the SPE Global website</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="shrink-0 text-blue-600 font-bold">2.</span>
                    <p>Select University of Ibadan (SPEUI) as your chapter</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="shrink-0 text-blue-600 font-bold">3.</span>
                    <p>Complete local onboarding if required</p>
                  </div>
                </div>
                <button className="flex items-center gap-4 rounded-full bg-[#2563eb] px-10 py-4.5 text-lg font-bold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all hover:bg-blue-600 hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)]">
                  <span>Register</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 stroke-white stroke-[3px]">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
