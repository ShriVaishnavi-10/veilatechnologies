"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Laptop, Globe, Calculator as CalcIcon } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Calculator from "@/components/Calculator";
import Metrics from "@/components/Metrics";
import { OperationDetail } from "@/lib/operationsData";

const iconMap = {
  "remote-solutions": Laptop,
  "worldwide-delivery": Globe,
  "client-estimator": CalcIcon,
  "quality-standards": ShieldCheck,
};

interface OperationDetailClientProps {
  operation: OperationDetail;
}

export default function OperationDetailClient({ operation }: OperationDetailClientProps) {
  const IconComponent = iconMap[operation.slug as keyof typeof iconMap] || Globe;

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0C] text-slate-100 overflow-hidden">
      {/* Floating Header */}
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6a00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#ff2b00]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">


          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20">
                  <span className="text-[10px] font-mono tracking-widest text-[#ff6a00] uppercase font-bold">
                    {operation.category}
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight">
                  {operation.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
                  {operation.description}
                </p>
              </div>

              {/* Core Details */}
              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-[#ff6a00]" />
                  <span>Key Pillars</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {operation.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#ff6a00] mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Operation Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 flex items-center justify-center relative w-full overflow-visible"
            >
              {/* Glowing backing circles */}
              <div className="absolute w-[80%] h-[80%] bg-gradient-to-br from-[#ff8a00]/20 to-[#ff2b00]/20 rounded-full blur-[80px] opacity-40 z-0 pointer-events-none" />
              
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-[4/3] rounded-2xl border border-white/[0.08] bg-[#16161a]/60 p-2 shadow-2xl overflow-hidden z-10"
              >
                <img
                  src={operation.imagePath}
                  alt={operation.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Conditional Layout Injection */}
          {operation.slug === "client-estimator" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-white/[0.04] pt-16 sm:pt-24"
            >
              <div className="max-w-3xl mb-12 sm:mb-16">
                <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
                  Interactive Estimator
                </h2>
                <p className="mt-3 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
                  Plan your investment.
                </p>
                <p className="mt-4 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  Toggle different services and choose quantities to calculate a preliminary budget. Submit your configuration to consult with our technology engineers.
                </p>
              </div>
              <div className="bg-[#16161a]/40 rounded-3xl border border-white/[0.04] p-2 sm:p-6 shadow-xl backdrop-blur-sm">
                <Calculator />
              </div>
            </motion.div>
          )}

          {operation.slug === "quality-standards" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-white/[0.04]"
            >
              <Metrics />
            </motion.div>
          )}

        </div>
      </main>

      {/* Footer System */}
      <Footer />
    </div>
  );
}
