"use client";

import React from "react";
import { ArrowRight, Phone, Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 bg-grid overflow-hidden bg-[#0B0B0C]">
      {/* Subtle background spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] glow-spotlight pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left space-y-8"
          >
            {/* Tag */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff6a00]/[0.15] bg-[#16161a] text-[10px] tracking-widest text-[#ff6a00] uppercase font-mono shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] animate-pulse"></span>
              Digital Solutions Agency
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.15]"
            >
              Welcome to <br />
              Veila Technologies
            </motion.h1>

            {/* Subheading */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl font-semibold text-[#ff6a00] tracking-tight"
            >
              Build, Grow, and Strengthen Your Online Presence
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm text-slate-400 leading-relaxed font-light max-w-xl"
            >
              Veila Technologies is a technology-driven company focused on helping businesses grow through innovative digital solutions. We specialize in web development, software development, digital marketing, SEO, and social media management to provide reliable, creative, and result-oriented services that create real value.
            </motion.p>

            {/* Contact details layout */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4 border-t border-white/[0.06]"
            >
              <motion.div
                whileHover={{ y: -3, borderColor: "rgba(255,106,0,0.25)", backgroundColor: "rgba(255,106,0,0.02)" }}
                className="flex items-center gap-3 text-slate-300 text-xs p-3 rounded-xl border border-white/[0.04] bg-[#16161a]/40 transition-colors duration-200 cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-[#ff6a00]/[0.04] border border-[#ff6a00]/[0.15]">
                  <Phone className="w-4 h-4 text-[#ff6a00]" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-500">Call Us</span>
                  <a href="tel:+918072196400" className="font-bold text-white hover:text-[#ff6a00] transition-colors">+91 8072196400</a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, borderColor: "rgba(255,106,0,0.25)", backgroundColor: "rgba(255,106,0,0.02)" }}
                className="flex items-center gap-3 text-slate-300 text-xs p-3 rounded-xl border border-white/[0.04] bg-[#16161a]/40 transition-colors duration-200 cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-[#ff6a00]/[0.04] border border-[#ff6a00]/[0.15]">
                  <Mail className="w-4 h-4 text-[#ff6a00]" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-500">Email Us</span>
                  <a href="mailto:veilatechnologies@gmail.com" className="font-bold text-white hover:text-[#ff6a00] transition-colors">veilatechnologies@gmail.com</a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, borderColor: "rgba(255,106,0,0.25)", backgroundColor: "rgba(255,106,0,0.02)" }}
                className="flex items-center gap-3 text-slate-300 text-xs p-3 rounded-xl border border-white/[0.04] bg-[#16161a]/40 transition-colors duration-200 cursor-pointer sm:col-span-2"
              >
                <div className="p-2 rounded-lg bg-[#ff6a00]/[0.04] border border-[#ff6a00]/[0.15]">
                  <Globe className="w-4 h-4 text-[#ff6a00]" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-500">Global Operations</span>
                  <span className="font-semibold text-slate-200">Remote Services Available Worldwide</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4"
            >
              <motion.a
                href="#services"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg font-semibold text-xs text-white bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff7300] hover:to-[#ff1a00] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Explore Services
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg font-semibold text-xs text-white border border-white/10 bg-[#16161a]/80 hover:bg-[#1e1e24] hover:border-white/20 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side: Circular Graphic stacking */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full overflow-hidden py-4">
            <div className="relative w-[280px] h-[280px] min-[375px]:w-[320px] min-[375px]:h-[320px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
              
              {/* Backing solid orange circle 1 (top-left offset) - Slowly floats */}
              <motion.div
                animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-2 w-[90px] h-[90px] min-[375px]:w-[110px] min-[375px]:h-[110px] min-[375px]:left-4 sm:w-[140px] sm:h-[140px] sm:left-6 rounded-full bg-gradient-to-br from-[#ff8a00] to-[#ff2b00] opacity-80 z-0 shadow-lg"
              ></motion.div>

              {/* Backing solid orange circle 2 (bottom-right offset) - Slowly floats opposite */}
              <motion.div
                animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-2 right-2 w-[60px] h-[60px] min-[375px]:w-[80px] min-[375px]:h-[80px] sm:w-[100px] sm:h-[100px] rounded-full bg-gradient-to-br from-[#ff8a00] to-[#ff2b00] opacity-80 z-0 shadow-lg"
              ></motion.div>

              {/* Main Graphic Circle containing the generated artwork - slow micro-drift */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[230px] h-[230px] min-[375px]:w-[270px] min-[375px]:h-[270px] sm:w-[340px] sm:h-[340px] rounded-full border-[6px] sm:border-[8px] border-[#16161a] shadow-2xl overflow-hidden bg-[#16161a] z-10"
              >
                <img
                  src="/hero_illustration.png"
                  alt="Veila Technologies Digital Solutions Illustration"
                  className="w-full h-full object-cover"
                />
                
                {/* Visual quote/message overlay at the bottom similar to the screenshot */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#16161a]/95 backdrop-blur-sm border border-white/[0.06] px-5 py-3 rounded-2xl w-[85%] text-center shadow-md cursor-pointer"
                >
                  <p className="text-[10px] sm:text-xs text-white font-semibold leading-relaxed">
                    "Helping businesses grow, connect, and thrive online."
                  </p>
                </motion.div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
