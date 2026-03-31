"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFF] font-sans text-black overflow-x-hidden">
      <Header />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Minimalist 404 Indicator */}
            <div className="text-blue-600 font-black text-[120px] md:text-[180px] leading-none tracking-tighter opacity-10 select-none absolute pointer-events-none">
              404
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-[100px] relative z-10 transition-all">
              Lost in <span className="text-blue-600">Transit</span>
            </h1>
            
            <p className="max-w-md text-lg font-medium leading-relaxed text-gray-500 md:text-xl relative z-10">
              The page you are looking for has been moved or no longer exists within our system.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-4 relative z-10">
              <Link 
                href="/" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
              >
                Back to Safety
              </Link>
              <Link 
                href="/about" 
                className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-10 py-5 rounded-2xl transition-all border border-gray-100 shadow-sm active:scale-95"
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
