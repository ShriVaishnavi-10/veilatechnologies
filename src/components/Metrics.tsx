"use client";

import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface PillarItem {
  title: string;
  description: string;
}

export default function Metrics() {
  const pillars: PillarItem[] = [
    {
      title: "Customized Solutions",
      description: "Tailored strategies and web designs that match your unique brand identity and target audience."
    },
    {
      title: "Affordable Pricing",
      description: "Enterprise-grade digital solutions structured to fit the budget of small and growing businesses."
    },
    {
      title: "Dedicated Support",
      description: "Direct, personal, and responsive help from our tech and marketing teams whenever you need assistance."
    },
    {
      title: "Focus on Business Growth",
      description: "Every website, campaign, and written copy is strategically optimized to drive conversions and sales."
    },
    {
      title: "Quality-Driven Approach",
      description: "Clean code, reliable server hosting, compliant designs, and proofread content for a professional look."
    }
  ];

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
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

  const badgeVariants = {
    hover: { scale: 1.15, rotate: 5, transition: { type: "spring" as const, stiffness: 300, damping: 15 } }
  };

  return (
    <section id="why-choose" className="relative py-16 sm:py-28 bg-[#0B0B0C] border-t border-white/[0.03] overflow-hidden">
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
            Our Pillars
          </h2>
          <p className="mt-4 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Why choose Veila Technologies?
          </p>
          <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed max-w-2xl">
            We combine technical capability with business strategy. Here is why businesses choose us as their digital partner.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className="flex items-start gap-3 sm:gap-4 p-5 sm:p-6 rounded-xl border border-white/[0.04] bg-[#16161a]/60 transition-all duration-300 hover:border-[#ff6a00]/30 hover:bg-[#16161a]/95 hover:shadow-md cursor-pointer"
            >
              {/* Check Circle Badge */}
              <motion.div
                variants={badgeVariants}
                className="p-2.5 rounded-lg bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] text-white flex items-center justify-center shrink-0 shadow-sm"
              >
                <Check className="w-4 h-4" />
              </motion.div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white font-sans">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
