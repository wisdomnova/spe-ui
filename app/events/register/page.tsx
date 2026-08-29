"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlitterConfetti from "@/components/GlitterConfetti";
import ConfettiSpaceBackground from "@/components/ConfettiSpaceBackground";
import Link from "next/link";

export default function EventRegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    is_spe_member: null as boolean | null,
    is_membership_active: null as boolean | null,
    whatsapp_number: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Trigger smooth animated transition into dark mode on page load
    const timer = setTimeout(() => {
      setIsDarkMode(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!formData.department.trim()) {
      setErrorMsg("Please enter your department.");
      return;
    }
    if (formData.is_spe_member === null) {
      setErrorMsg("Please select whether you are an SPE member.");
      return;
    }

    if (formData.is_spe_member) {
      if (formData.is_membership_active === null) {
        setErrorMsg("Please indicate if your SPE membership is currently active.");
        return;
      }
    } else {
      if (!formData.whatsapp_number.trim()) {
        setErrorMsg("Please enter your WhatsApp number to join the waitlist.");
        return;
      }
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Submission failed. Please try again.");
      } else {
        setIsSuccess(true);
      }
    } catch {
      setErrorMsg("Network connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`flex min-h-screen flex-col font-sans transition-colors duration-1000 ${
        isDarkMode
          ? "bg-[#0A0A0A] text-white selection:bg-blue-600 selection:text-white"
          : "bg-white text-black selection:bg-blue-100 selection:text-blue-900"
      }`}
    >
      <Header isDark={isDarkMode} />
      <ConfettiSpaceBackground />
      {isSuccess && <GlitterConfetti />}

      <main className="relative z-10 flex-grow pt-32 pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-center text-4xl font-bold tracking-tight sm:text-5xl mb-4 transition-colors duration-1000 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Reserve Your Spot
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-center text-base mb-12 max-w-lg mx-auto font-medium transition-colors duration-1000 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Complete the form below to register for Industry Week 2026 sessions or to join the priority guest waitlist.
          </motion.p>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="register-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className={`space-y-8 rounded-[2.5rem] border p-8 sm:p-12 transition-all duration-1000 ${
                  isDarkMode
                    ? "border-neutral-800 bg-[#121212]"
                    : "border-gray-100 bg-[#F9FAFB]"
                }`}
              >
                {/* Full Name */}
                <div className="space-y-2">
                  <label
                    className={`block text-xs font-bold uppercase tracking-widest transition-colors duration-1000 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full rounded-2xl border px-6 py-4 text-sm font-semibold outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "border-neutral-800 bg-[#1A1A1A] text-white focus:border-blue-600 placeholder-neutral-600"
                        : "border-gray-200 bg-white text-gray-900 focus:border-blue-600 placeholder-gray-300"
                    }`}
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label
                    className={`block text-xs font-bold uppercase tracking-widest transition-colors duration-1000 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full rounded-2xl border px-6 py-4 text-sm font-semibold outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "border-neutral-800 bg-[#1A1A1A] text-white focus:border-blue-600 placeholder-neutral-600"
                        : "border-gray-200 bg-white text-gray-900 focus:border-blue-600 placeholder-gray-300"
                    }`}
                  />
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <label
                    className={`block text-xs font-bold uppercase tracking-widest transition-colors duration-1000 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Petroleum Engineering"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className={`w-full rounded-2xl border px-6 py-4 text-sm font-semibold outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "border-neutral-800 bg-[#1A1A1A] text-white focus:border-blue-600 placeholder-neutral-600"
                        : "border-gray-200 bg-white text-gray-900 focus:border-blue-600 placeholder-gray-300"
                    }`}
                  />
                </div>

                {/* SPE Membership Selector */}
                <div className="space-y-3 pt-2">
                  <label
                    className={`block text-xs font-bold uppercase tracking-widest transition-colors duration-1000 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Are you an SPE member?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, is_spe_member: true, whatsapp_number: "" })}
                      className={`rounded-2xl py-4 text-xs font-bold uppercase tracking-wider transition-all border ${
                        formData.is_spe_member === true
                          ? "bg-blue-600 text-white border-blue-600"
                          : isDarkMode
                          ? "bg-[#1A1A1A] text-gray-300 border-neutral-800 hover:bg-neutral-800"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, is_spe_member: false, is_membership_active: null })}
                      className={`rounded-2xl py-4 text-xs font-bold uppercase tracking-wider transition-all border ${
                        formData.is_spe_member === false
                          ? "bg-blue-600 text-white border-blue-600"
                          : isDarkMode
                          ? "bg-[#1A1A1A] text-gray-300 border-neutral-800 hover:bg-neutral-800"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Conditional Fields */}
                <AnimatePresence mode="wait">
                  {formData.is_spe_member === true && (
                    <motion.div
                      key="spe-member-active"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      <label
                        className={`block text-xs font-bold uppercase tracking-widest transition-colors duration-1000 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Is your membership active?
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, is_membership_active: true })}
                          className={`rounded-2xl py-4 text-xs font-bold uppercase tracking-wider transition-all border ${
                            formData.is_membership_active === true
                              ? "bg-white text-black border-white"
                              : isDarkMode
                              ? "bg-[#1A1A1A] text-gray-300 border-neutral-800 hover:bg-neutral-800"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, is_membership_active: false })}
                          className={`rounded-2xl py-4 text-xs font-bold uppercase tracking-wider transition-all border ${
                            formData.is_membership_active === false
                              ? "bg-white text-black border-white"
                              : isDarkMode
                              ? "bg-[#1A1A1A] text-gray-300 border-neutral-800 hover:bg-neutral-800"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {formData.is_spe_member === false && (
                    <motion.div
                      key="non-member-whatsapp"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <label
                        className={`block text-xs font-bold uppercase tracking-widest transition-colors duration-1000 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        WhatsApp Number (to join waitlist)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234..."
                        value={formData.whatsapp_number}
                        onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                        className={`w-full rounded-2xl border px-6 py-4 text-sm font-semibold outline-none transition-all duration-500 ${
                          isDarkMode
                            ? "border-neutral-800 bg-[#1A1A1A] text-white focus:border-blue-600 placeholder-neutral-600"
                            : "border-gray-200 bg-white text-gray-900 focus:border-blue-600 placeholder-gray-300"
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message Display */}
                {errorMsg && (
                  <div className="rounded-2xl bg-red-950/40 p-4 border border-red-900/50 text-center">
                    <span className="text-xs font-bold text-red-400">{errorMsg}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-blue-600 py-5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Complete Registration"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-[2.5rem] border p-10 sm:p-16 text-center transition-all duration-1000 ${
                  isDarkMode
                    ? "border-neutral-800 bg-[#121212]"
                    : "border-gray-100 bg-[#F9FAFB]"
                }`}
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-3">
                  You Are Registered
                </h2>
                <p className="text-base text-gray-400 mb-8 max-w-md mx-auto font-medium">
                  {formData.is_spe_member
                    ? "Thank you for registering for Industry Week 2026. See you at the department!"
                    : "You have been added to the Industry Week priority waitlist. We will notify you on WhatsApp."}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/events"
                    className="w-full sm:w-auto rounded-2xl bg-blue-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-700"
                  >
                    View All Events
                  </Link>
                  <Link
                    href="/"
                    className="w-full sm:w-auto rounded-2xl bg-neutral-800 px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-200 transition-all hover:bg-neutral-700"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
