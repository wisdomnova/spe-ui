"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SponsorPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFF] font-sans text-black overflow-x-hidden">
      <Header />
      <main className="flex-grow pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex flex-col items-start justify-between gap-16 lg:flex-row">
            {/* Left Column: Expanded Content */}
            <div className="flex flex-col items-start gap-12 lg:w-3/5">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-7xl lg:text-[84px]">
                  Partner with <span className="text-blue-600">SPEUI</span>
                </h1>
                <p className="max-w-xl text-lg font-medium leading-relaxed text-gray-600 md:text-xl">
                  Invest in the future of energy. Join a global network of industry leaders supporting technical excellence and professional growth at the University of Ibadan.
                </p>
              </div>

              <div className="grid gap-10 md:grid-cols-1 w-full">
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 text-blue-600 font-bold text-lg">
                    01
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">Strategic Visibility</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">Gain brand exposure to 500+ engineering students, researchers, and energy professionals through our flagship events and digital channels.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 text-blue-600 font-bold text-lg">
                    02
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">Direct Talent Access</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">Connect with the top 5% of engineering talent at the University of Ibadan for internships, graduate roles, and research collaborations.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 text-blue-600 font-bold text-lg">
                    03
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">Industry Impact</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">Drive technical excellence by supporting high-impact workshops, field trips, and international competitions.</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-gray-200 w-full opacity-50">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Current Partnership Reach</p>
                <div className="flex flex-wrap gap-8 text-xl font-black italic tracking-tighter text-gray-400 select-none">
                  <span>ENERGY CORP</span>
                  <span>GLOBAL DRILL</span>
                  <span>TECH FLOW</span>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Form */}
            <div className="w-full lg:w-[450px]">
              <div className="rounded-[2.5rem] bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-50">
                {!isSubmitted ? (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Brochure</h2>
                    <p className="text-gray-500 font-medium mb-8">Enter your details to receive our 2024/25 sponsorship package.</p>
                    
                    <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-2">Full Name</label>
                        <input required type="text" placeholder="John Doe" className="h-14 w-full rounded-2xl bg-[#F8FAFF] px-6 font-medium outline-none border border-transparent focus:border-blue-100 focus:bg-white transition-all placeholder:text-gray-300" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-2">Email Address</label>
                        <input required type="email" placeholder="hr@company.com" className="h-14 w-full rounded-2xl bg-[#F8FAFF] px-6 font-medium outline-none border border-transparent focus:border-blue-100 focus:bg-white transition-all placeholder:text-gray-300" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-2">Organization</label>
                        <input required type="text" placeholder="Company Ltd" className="h-14 w-full rounded-2xl bg-[#F8FAFF] px-6 font-medium outline-none border border-transparent focus:border-blue-100 focus:bg-white transition-all placeholder:text-gray-300" />
                      </div>
                      <button className="mt-4 flex h-16 w-full items-center justify-center rounded-2xl bg-[#2563eb] text-lg font-bold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all hover:bg-blue-600">
                        Request Brochure
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-8">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-3xl font-bold">✓</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Success!</h2>
                    <p className="text-gray-500 font-medium mb-10 leading-relaxed text-sm">
                      Your interest means a lot to us. Click the button below to download the brochure.
                    </p>
                    <a 
                      href="/pdf/SPEUI BROCHURE .pdf" 
                      download 
                      className="flex h-16 w-full items-center justify-center rounded-2xl bg-[#2563eb] text-lg font-bold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all hover:bg-blue-600"
                    >
                      Download Brochure
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
