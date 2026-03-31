"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "President",
    image: "/team/dummy-1.png",
    bio: "Leading SPEUI towards a sustainable future in energy education and student empowerment.",
    socials: { linkedin: "#", twitter: "#", email: "alex@speui.org" }
  },
  {
    name: "Sarah Chen",
    role: "Vice President",
    image: "/team/dummy-2.png",
    bio: "Driving excellence in program development and student engagement across the chapter.",
    socials: { linkedin: "#", twitter: "#", email: "sarah@speui.org" }
  },
  {
    name: "Dr. Michael Smith",
    role: "Faculty Advisor",
    image: "/team/dummy-3.png",
    bio: "Providing academic guidance and bridging the gap between industry and student research.",
    socials: { linkedin: "#", email: "michael@speui.org" }
  },
  {
    name: "Elena Rodriguez",
    role: "Secretary",
    image: "/team/dummy-4.png",
    bio: "Ensuring seamless operations and clear communication within the executive committee.",
    socials: { linkedin: "#", twitter: "#", email: "elena@speui.org" }
  },
  {
    name: "David Kwok",
    role: "Treasurer",
    image: "/team/dummy-5.png",
    bio: "Managing chapter finances and securing resources for our annual flagship events.",
    socials: { linkedin: "#", twitter: "#", email: "david@speui.org" }
  },
  {
    name: "Amina Al-Farsi",
    role: "Programs Director",
    image: "/team/dummy-6.png",
    bio: "Curating a diverse range of technical workshops and networking sessions for members.",
    socials: { linkedin: "#", twitter: "#", email: "amina@speui.org" }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFF]">
      <Header />

      <main className="flex-grow pt-32 pb-24 md:pt-44 md:pb-32">
        <div className="container mx-auto px-6">
          {/* Page Heading */}
          <div className="mb-20 md:mb-32 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-block rounded-full bg-blue-50 px-6 py-2 text-sm font-bold text-blue-600 border border-blue-100"
            >
              Our Leadership
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl text-[38px] font-bold leading-[1.1] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[84px]"
            >
              Meet the faces behind <span className="text-blue-600">SPEUI</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 max-w-2xl text-lg text-gray-500 font-medium"
            >
              Our multidisciplinary team combines passion for energy transition with a commitment to empowering the next generation of engineers.
            </motion.p>
          </div>

          {/* Team Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl">
                  {/* Placeholder Background (in case image doesn't exist) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white" />
                  
                  {/* Since we don't have images yet, we'll use a descriptive placeholder style */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-opacity group-hover:opacity-10">
                    <Image
                      src="/speui.png"
                      alt="SPE Logo placeholder"
                      width={150}
                      height={110}
                      className="grayscale"
                    />
                  </div>

                  {/* Social Overlay on Hover */}
                  <div className="absolute inset-0 flex items-end justify-center pb-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex gap-4 rounded-3xl bg-white/90 px-6 py-4 shadow-xl backdrop-blur-md">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} className="text-gray-900 transition-colors hover:text-blue-600">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a href={member.socials.twitter} className="text-gray-900 transition-colors hover:text-blue-400">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {member.socials.email && (
                        <a href={`mailto:${member.socials.email}`} className="text-gray-900 transition-colors hover:text-red-500">
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="mt-8 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold text-gray-900 md:text-[28px]">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-blue-600">
                    {member.role}
                  </p>
                  <p className="mt-4 text-gray-500 font-medium leading-relaxed px-4">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Join Us Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 rounded-[3.5rem] bg-blue-600 p-12 text-center text-white md:p-24"
          >
            <h2 className="text-[32px] font-bold leading-tight sm:text-5xl md:text-6xl">
              Want to join our team?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg opacity-80 font-medium">
              We're always looking for passionate students to volunteer and lead new initiatives.
            </p>
            <button className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-10 py-5 text-lg font-bold text-blue-600 transition-all hover:scale-105 active:scale-95">
              Available Positions
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
