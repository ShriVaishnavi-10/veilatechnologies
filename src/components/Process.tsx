"use client";

import React from "react";
import { Compass, PenTool, Code, ShieldCheck, Rocket } from "lucide-react";
import { motion } from "framer-motion";

interface ProcessStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Process() {
  const steps: ProcessStep[] = [
    {
      number: "01",
      icon: <Compass className="w-5 h-5 text-[#ff6a00]" />,
      title: "Discovery & Strategy",
      description: "We align on your business goals, identify target audiences, audit competitors, and architect the optimal project roadmap."
    },
    {
      number: "02",
      icon: <PenTool className="w-5 h-5 text-[#ff6a00]" />,
      title: "Prototyping & UX Design",
      description: "We design clean wireframes and high-fidelity mockups, prioritizing user experience, visual credibility, and intuitive page flows."
    },
    {
      number: "03",
      icon: <Code className="w-5 h-5 text-[#ff6a00]" />,
      title: "Agile Engineering",
      description: "We build high-performance products using modern frameworks like React and Next.js, writing clean, standard-compliant code."
    },
    {
      number: "04",
      icon: <ShieldCheck className="w-5 h-5 text-[#ff6a00]" />,
      title: "Technical Auditing & QA",
      description: "We conduct rigorous cross-browser testing, technical speed audits, core web vitals optimization, and final QA reviews."
    },
    {
      number: "05",
      icon: <Rocket className="w-5 h-5 text-[#ff6a00]" />,
      title: "Handoff & Growth Support",
      description: "We deploy securely to global servers, coordinate clean handoffs, and launch structured SEO/ad-marketing campaigns for growth."
    }
  ];

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <section id="process" className="relative py-16 sm:py-28 bg-[#0B0B0C] border-t border-white/[0.03] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20 text-left"
        >
          <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
            Execution Roadmap
          </h2>
          <p className="mt-4 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
            How we bring ideas to life.
          </p>
          <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed max-w-2xl">
            We follow a structured, collaborative engineering process to build reliable, high-performance systems. From initial discovery to deployment, your project is guided by technical experts.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 items-stretch"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between p-6 rounded-xl border border-white/[0.04] bg-[#16161a]/60 backdrop-blur-sm transition-all duration-300 hover:border-[#ff6a00]/30 hover:bg-[#16161a]/95 cursor-pointer relative group"
            >
              <div className="space-y-4">
                {/* Number and Icon Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                  <span className="text-xl font-serif font-semibold italic text-[#ff6a00]/60 group-hover:text-[#ff6a00] transition-colors">
                    {step.number}
                  </span>
                  <div className="p-2 rounded-lg bg-[#ff6a00]/[0.04] border border-[#ff6a00]/[0.15]">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-sans">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
