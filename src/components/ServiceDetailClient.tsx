"use client";

import React from "react";
import { Globe, TrendingUp, Target, Smartphone, PenTool, ArrowRight, CheckCircle2, Award, Zap, Code } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ServiceDetail } from "@/lib/servicesData";

const iconMap = {
  Globe: Globe,
  TrendingUp: TrendingUp,
  Target: Target,
  Smartphone: Smartphone,
  PenTool: PenTool,
};

interface ServiceDetailClientProps {
  service: ServiceDetail;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const IconComponent = iconMap[service.iconName] || Globe;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

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
                    {service.category}
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight">
                  {service.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
                  {service.description}
                </p>
              </div>

              {/* Core Capabilities */}
              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-[#ff6a00]" />
                  <span>Core Capabilities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#ff6a00] mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Service Illustration */}
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
                  src={service.imagePath}
                  alt={service.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Case Studies / Projects Section */}
          <div className="border-t border-white/[0.04] pt-16 sm:pt-24 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mb-12 sm:mb-16"
            >
              <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
                Case Studies
              </h2>
              <p className="mt-3 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
                Projects built using this service.
              </p>
              <p className="mt-4 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                We believe in outcomes. Explore some of our successful customer engagements and the real, measurable business impact we achieved.
              </p>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            >
              {service.projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a]/50 backdrop-blur-sm transition-all duration-300 hover:border-[#ff6a00]/30 hover:bg-[#16161a]/95 hover:shadow-[0_10px_35px_rgba(255,106,0,0.05)]"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                        Client: {project.client}
                      </span>
                      <Award className="w-4 h-4 text-[#ff6a00]/60" />
                    </div>

                    <h3 className="text-lg font-semibold text-white tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-xs font-light leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9px] font-mono tracking-wide text-slate-300 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] flex items-center gap-1"
                        >
                          <Code className="w-2.5 h-2.5 text-[#ff6a00]/80" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quantifiable Results pill */}
                  <div className="mt-8 pt-5 border-t border-white/[0.04] flex items-start gap-2.5 bg-gradient-to-r from-[#ff6a00]/[0.02] to-transparent p-2.5 rounded-lg border border-[#ff6a00]/[0.05]">
                    <Zap className="w-4 h-4 text-[#ff6a00] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono tracking-wider text-[#ff6a00] uppercase font-bold block">
                        Result Impact
                      </span>
                      <span className="text-xs text-white font-medium">
                        {project.results}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-12 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#16161a] to-[#1e1e24]/20 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto"
          >
            {/* Background glowing circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ff6a00]/5 rounded-full blur-[80px] pointer-events-none" />

            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
              Ready to start your project?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto leading-relaxed mb-8">
              Let's craft the perfect solution for your business. Use our dynamic budget estimator planner to plan your investment, or speak directly with our team today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#calculator"
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-white text-[#0B0B0C] hover:bg-slate-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Price Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider border border-white/20 hover:border-[#ff6a00]/30 hover:bg-white/[0.02] text-white transition-all inline-flex items-center justify-center"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer System */}
      <Footer />
    </div>
  );
}
