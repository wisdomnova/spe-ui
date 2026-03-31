"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function LMSPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFF]">
      <Header />

      <main className="relative flex-grow flex items-center justify-center pt-32 pb-24 lg:pt-44">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-100/50 blur-[120px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            {/* Minimal Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-full bg-blue-50 px-6 py-2 text-[13px] font-bold text-blue-600 border border-blue-100 uppercase tracking-widest"
            >
              Coming Soon
            </motion.div>

            {/* Clean Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-black sm:text-7xl md:text-8xl"
            >
              The Next Frontier of <span className="text-blue-600">Learning.</span>
            </motion.h1>

            {/* Minimal Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-8 max-w-xl text-lg font-medium text-gray-500 leading-relaxed"
            >
              Our Learning Management System is currently under development. 
              We&apos;re building a seamless experience for technical growth and professional certification.
            </motion.p>

            {/* Simple Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12"
            >
              <div className="h-1.5 w-12 rounded-full bg-blue-600/20">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full rounded-full bg-blue-600"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
