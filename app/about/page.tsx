"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const values = [
    {
      title: "Technical Excellence",
      desc: "We prioritize the mastery of engineering fundamentals and the application of cutting-edge technology in the energy sector."
    },
    {
      title: "Integrity",
      desc: "Our members and leaders adhere to the highest ethical standards in research, competition, and professional practice."
    },
    {
      title: "Innovation",
      desc: "We foster a culture of creative problem-solving to address the complex energy challenges of the 21st century."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFF] font-sans text-black overflow-x-hidden">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="container mx-auto px-6 lg:px-24">
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24 flex flex-col items-start gap-8 lg:w-3/4"
          >
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-7xl lg:text-[84px]">
              Empowering the <span className="text-blue-600">Next Generation</span> of Energy Leaders
            </h1>
            <p className="max-w-2xl text-lg font-medium leading-relaxed text-gray-600 md:text-xl">
              The Society of Petroleum Engineers, University of Ibadan (SPEUI) is a student-led organization dedicated to the professional development and technical advancement of our members.
            </p>
          </motion.div>

          {/* Mission & Vision Grid */}
          <div className="mb-32 grid gap-16 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] bg-white p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col gap-6"
            >
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full w-fit">Our Mission</div>
              <h2 className="text-3xl font-bold text-gray-900">To bridge the gap between classroom theory and industry practice.</h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                We provide our members with the resources, mentorship, and opportunities needed to excel in the global energy landscape through technical competitions, workshops, and international networking.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] bg-blue-600 p-10 md:p-14 shadow-xl flex flex-col gap-6 text-white"
            >
              <div className="text-xs font-bold text-white uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full w-fit">Our Vision</div>
              <h2 className="text-3xl font-bold">To be the frontier of technical excellence in Africa's energy academia.</h2>
              <p className="font-medium leading-relaxed text-blue-50">
                We envision a community where every student engineer has the technical competence and professional confidence to drive sustainable energy solutions globally.
              </p>
            </motion.div>
          </div>

          {/* Core Values Section */}
          <div className="mb-32">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-12 text-center">Core Values</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((v, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4 group hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl font-black text-blue-100 group-hover:text-blue-600 transition-colors">0{i+1}</div>
                  <h3 className="text-xl font-bold text-gray-900">{v.title}</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
