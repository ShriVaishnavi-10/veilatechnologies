"use client";

import React from "react";
import { ArrowRight, Phone, Mail, Globe } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

const MotionLink = motion.create(Link);

export default function Hero() {
  const { scrollY } = useScroll();
  const baseSpotlightY = useTransform(scrollY, [0, 800], [0, 150]);
  const illustrationY = useTransform(scrollY, [0, 800], [0, -60]);
  const circleLeftY = useTransform(scrollY, [0, 800], [0, -100]);
  const circleRightY = useTransform(scrollY, [0, 800], [0, -40]);

  // Global mouse cursor halo tracking
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const springSpotlightX = useSpring(spotlightX, { stiffness: 80, damping: 22 });
  const springSpotlightY = useSpring(spotlightY, { stiffness: 80, damping: 22 });

  const handleGlobalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  // Flat 2D Illustration Parallax tracking
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const mouseCircleLeftX = useSpring(useTransform(tiltX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });
  const mouseCircleLeftY = useSpring(useTransform(tiltY, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

  const mouseCircleRightX = useSpring(useTransform(tiltX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
  const mouseCircleRightY = useSpring(useTransform(tiltY, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  const mouseIllustrationX = useSpring(useTransform(tiltX, [-0.5, 0.5], [-18, 18]), { stiffness: 150, damping: 20 });
  const mouseIllustrationY = useSpring(useTransform(tiltY, [-0.5, 0.5], [-18, 18]), { stiffness: 150, damping: 20 });

  const circleLeftCombinedY = useTransform([circleLeftY, mouseCircleLeftY], ([s, m]) => s + m);
  const circleRightCombinedY = useTransform([circleRightY, mouseCircleRightY], ([s, m]) => s + m);
  const illustrationCombinedY = useTransform([illustrationY, mouseIllustrationY], ([s, m]) => s + m);

  const handleIllustrationMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    tiltX.set((mouseX - width / 2) / width);
    tiltY.set((mouseY - height / 2) / height);
  };

  const handleIllustrationMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const titleContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 45,
        damping: 18,
        mass: 0.85
      }
    }
  };

  const sentence = "Welcome to";
  const brand = "Veila Technologies";

  return (
    <section 
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 bg-grid overflow-hidden bg-[#0B0B0C]"
    >
      {/* Subtle scrolling background spotlight */}
      <motion.div
        style={{ y: baseSpotlightY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] glow-spotlight pointer-events-none z-0"
      />

      {/* Cursor halo following light */}
      <motion.div
        style={{
          x: useTransform(springSpotlightX, (val) => val - 300),
          y: useTransform(springSpotlightY, (val) => val - 300),
        }}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#ff6a00]/[0.05] rounded-full blur-[100px] pointer-events-none z-0"
      />

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

            {/* Heading with spring letter bounce */}
            <motion.h1
              variants={titleContainer}
              className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.15]"
            >
              <span className="block mb-2">
                {sentence.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={charVariants}
                    className="inline-block origin-bottom"
                    style={{ display: char === " " ? "inline" : "inline-block", marginRight: char === " " ? "0.25em" : "0" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] block">
                {brand.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={charVariants}
                    className="inline-block origin-bottom"
                    style={{ display: char === " " ? "inline" : "inline-block", marginRight: char === " " ? "0.25em" : "0" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
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
              <Magnetic range={60} strength={0.35}>
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg font-semibold text-xs text-white bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff7300] hover:to-[#ff1a00] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  Explore Services
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </motion.a>
              </Magnetic>
              
              <Magnetic range={60} strength={0.35}>
                <MotionLink
                  href="/contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg font-semibold text-xs text-white border border-white/10 bg-[#16161a]/80 hover:bg-[#1e1e24] hover:border-white/20 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  Get in Touch
                </MotionLink>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Right Side: Circular Graphic stacking with 3D Mouse Parallax */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full overflow-hidden py-4 z-10">
            <motion.div 
              onMouseMove={handleIllustrationMouseMove}
              onMouseLeave={handleIllustrationMouseLeave}
              className="relative w-[280px] h-[280px] min-[375px]:w-[320px] min-[375px]:h-[320px] sm:w-[400px] sm:h-[400px] flex items-center justify-center"
            >
              
              {/* Backing solid orange circle 1 (top-left offset) - Slowly floats + flat parallax */}
              <motion.div
                style={{ x: mouseCircleLeftX, y: circleLeftCombinedY }}
                className="absolute top-0 left-2 w-[90px] h-[90px] min-[375px]:w-[110px] min-[375px]:h-[110px] min-[375px]:left-4 sm:w-[140px] sm:h-[140px] sm:left-6 z-0"
              >
                <motion.div
                  animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full rounded-full bg-gradient-to-br from-[#ff8a00] to-[#ff2b00] opacity-80 shadow-lg"
                />
              </motion.div>

              {/* Backing solid orange circle 2 (bottom-right offset) - Slowly floats opposite + flat parallax */}
              <motion.div
                style={{ x: mouseCircleRightX, y: circleRightCombinedY }}
                className="absolute bottom-2 right-2 w-[60px] h-[60px] min-[375px]:w-[80px] min-[375px]:h-[80px] sm:w-[100px] sm:h-[100px] z-0"
              >
                <motion.div
                  animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full rounded-full bg-gradient-to-br from-[#ff8a00] to-[#ff2b00] opacity-80 shadow-lg"
                />
              </motion.div>

              {/* Main Graphic Circle containing the generated artwork - slow micro-drift + flat parallax */}
              <motion.div
                style={{ x: mouseIllustrationX, y: illustrationCombinedY }}
                className="relative w-[230px] h-[230px] min-[375px]:w-[270px] min-[375px]:h-[270px] sm:w-[340px] sm:h-[340px] rounded-full border-[6px] sm:border-[8px] border-[#16161a] shadow-2xl overflow-hidden bg-[#16161a] z-10"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full relative"
                >
                  <img
                    src="/hero_illustration.png"
                    alt="Veila Technologies Digital Solutions Illustration"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Visual quote/message overlay at the bottom - floating in front of image */}
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#16161a]/95 backdrop-blur-sm border border-white/[0.06] px-5 py-3 rounded-2xl w-[85%] text-center shadow-md cursor-pointer"
                  >
                    <p className="text-[10px] sm:text-xs text-white font-semibold leading-relaxed">
                      &ldquo;Helping businesses grow, connect, and thrive online.&rdquo;
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
