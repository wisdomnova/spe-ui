"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export default function BlogPage() {
  const blogs = Array(6).fill({
    title: "Advancing Energy Education Through Student Leadership",
    description: "Explore how SPEUI empowers students with leadership opportunities, technical exposure, and professional growth beyond the classroom.",
    image: "/blog-dummy.png",
    slug: "advancing-energy-education"
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFF]">
      <Header />

      <main className="flex-grow pt-32 pb-24 md:pt-44 md:pb-32">
        <div className="container mx-auto px-6">
          {/* Page Heading */}
          <div className="mb-20 flex justify-center text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-black sm:text-7xl lg:text-[84px]"
            >
              Insights, Events, and Energy Conversations
            </motion.h1>
          </div>

          {/* Blog Grid */}
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <Link
                key={index}
                href={`/blog/${blog.slug}`}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-[2.5rem] bg-white p-2 shadow-sm transition-all hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.2rem]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Latest Article Badge */}
                  <div className="absolute left-5 top-5">
                    <div className="rounded-full bg-[#2563eb] px-5 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur-sm">
                      Latest Article
                    </div>
                  </div>
                </div>

                <div className="flex flex-col p-6 pt-8">
                  <h3 className="mb-4 text-2xl font-bold leading-tight text-gray-900 line-clamp-2 md:text-[26px]">
                    {blog.title}
                  </h3>
                  <p className="mb-6 text-sm font-medium leading-relaxed text-gray-500 line-clamp-3">
                    {blog.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-sm font-bold text-[#2563eb]">
                    <span>Read More</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Dummy Pagination */}
          <div className="mt-24 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-colors hover:border-blue-600 hover:text-blue-600">
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {[1, 2, 3, "...", 20].map((page, idx) => (
                <button
                  key={idx}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-bold transition-all ${
                    page === 1 
                      ? "bg-[#2563eb] text-white shadow-lg" 
                      : typeof page === 'number' 
                        ? "text-gray-500 hover:bg-gray-100" 
                        : "cursor-default text-gray-400"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:border-blue-600 hover:text-blue-600">
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-[#6366F1] py-24 text-white md:py-32">
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
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-[#6366F1]/20">
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
