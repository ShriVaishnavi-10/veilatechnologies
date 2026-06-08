"use client";

import React from "react";
import { ArrowLeft, CheckCircle2, Building2, Briefcase, Mail, MapPin, Calendar, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CompanyDetail, jobOpeningsList } from "@/lib/companyData";

const iconMap = {
  about: Building2,
  careers: Briefcase,
};

interface CompanyDetailClientProps {
  company: CompanyDetail;
}

export default function CompanyDetailClient({ company }: CompanyDetailClientProps) {
  const IconComponent = iconMap[company.slug as keyof typeof iconMap] || Building2;

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0C] text-slate-100 overflow-hidden">
      {/* Floating Header */}
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6a00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#ff2b00]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#ff6a00] hover:text-[#ff2b00] uppercase transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </a>
          </motion.div>

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
                    {company.category}
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight">
                  {company.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
                  {company.description}
                </p>
              </div>

              {/* Core Details */}
              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-[#ff6a00]" />
                  <span>At a glance</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {company.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#ff6a00] mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Company Illustration */}
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
                  src={company.imagePath}
                  alt={company.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Conditional Layout Injection: About Company details */}
          {company.slug === "about" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-white/[0.04] pt-16 sm:pt-24 space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Story and Mission */}
                <div className="space-y-6 text-left">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#ff6a00] font-mono">Our Narrative</h3>
                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    Veila Technologies was established in 2026 with a vision to make premium digital solutions accessible to businesses globally. We specialize in building fast Next.js websites, optimizing organic search ranking routes, scaling marketing reach, and structuring engaging content.
                  </p>
                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    Based in Virudhunagar, Tamilnadu, we have designed a 100% remote working model that gathers top technology talent to deliver standard-compliant web architectures worldwide.
                  </p>
                </div>

                {/* Values Box Grid */}
                <div className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a]/40 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#ff6a00]" />
                    <span>Our Core Values</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] mt-2 shrink-0"></span>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quality Engineering</h4>
                        <p className="text-[11px] text-slate-400 font-light mt-0.5">We write clean, standard-compliant code, ensuring maximum performance and SEO capabilities.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] mt-2 shrink-0"></span>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Trust</h4>
                        <p className="text-[11px] text-slate-400 font-light mt-0.5">Direct communication with lead engineers and strategists, avoiding middle-management delays.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] mt-2 shrink-0"></span>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Business Impact</h4>
                        <p className="text-[11px] text-slate-400 font-light mt-0.5">Every layout choice, design grid, and copywriting piece is engineered to capture leads and drive sales.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Conditional Layout Injection: Careers Listing details */}
          {company.slug === "careers" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-white/[0.04] pt-16 sm:pt-24 space-y-12"
            >
              <div className="max-w-xl">
                <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
                  Open Positions
                </h2>
                <p className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
                  Work with us from anywhere
                </p>
              </div>

              {/* Job Listings stack */}
              <div className="space-y-6">
                {jobOpeningsList.map((job, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.005 }}
                    className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a]/40 hover:border-[#ff6a00]/30 hover:bg-[#16161a]/95 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="space-y-4 text-left">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[10px] font-mono text-[#ff6a00] bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-2 py-0.5 rounded font-bold uppercase">
                            {job.department}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                            <Clock className="w-3 h-3" />
                            {job.experience}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">{job.title}</h3>
                        <p className="text-slate-300 text-xs font-light leading-relaxed max-w-3xl">
                          {job.description}
                        </p>
                        
                        {/* Requirements list */}
                        <div className="space-y-2 pt-2">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Requirements:</h4>
                          <ul className="space-y-1">
                            {job.requirements.map((req, rIdx) => (
                              <li key={rIdx} className="flex items-center gap-2 text-xs text-slate-300 font-light">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]/50 shrink-0"></span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Apply CTA Button */}
                      <div className="shrink-0 pt-2 lg:pt-0">
                        <a
                          href="mailto:veilatechnologies@gmail.com?subject=Job%20Application%20-%20Frontend%20Developer"
                          className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff7300] hover:to-[#ff1a00] shadow-sm transition-all inline-flex items-center justify-center cursor-pointer"
                        >
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* General Job Submission Footer CTA */}
              <div className="p-8 sm:p-10 rounded-2xl border border-white/[0.06] bg-[#16161a]/30 shadow-xl text-center max-w-3xl mx-auto">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-2">Don't see a suitable role?</h3>
                <p className="text-xs text-slate-400 font-light mb-6 max-w-lg mx-auto">
                  We are always looking for passionate React/Next.js developers, creative designers, and growth hackers. Send your resume for future considerations.
                </p>
                <a
                  href="mailto:veilatechnologies@gmail.com"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff6a00] hover:text-[#ff2b00] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>veilatechnologies@gmail.com</span>
                </a>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      {/* Footer System */}
      <Footer />
    </div>
  );
}
