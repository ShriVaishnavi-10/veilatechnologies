"use client";

import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Folder, BookOpen, Calculator as CalcIcon, MessageSquare, Star, Code, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Calculator from "@/components/Calculator";
import { ResourceDetail, blogPosts, clientReviewsList, getAllProjects, UnifiedProject } from "@/lib/resourcesData";

const iconMap = {
  "case-portfolio": Folder,
  "growth-blog": BookOpen,
  "system-pricing": CalcIcon,
  "client-reviews": MessageSquare,
};

interface ResourceDetailClientProps {
  resource: ResourceDetail;
}

export default function ResourceDetailClient({ resource }: ResourceDetailClientProps) {
  const IconComponent = iconMap[resource.slug as keyof typeof iconMap] || Folder;
  
  // States for Case Portfolio filtering
  const [activeCategory, setActiveCategory] = useState("All");
  const allProjects = getAllProjects();
  const categories = ["All", "Development", "SEO & Growth", "Advertising", "Management", "Content"];

  const filteredProjects = activeCategory === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

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
                    {resource.category}
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight">
                  {resource.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
                  {resource.description}
                </p>
              </div>

              {/* Core Details */}
              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-[#ff6a00]" />
                  <span>Key Points</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {resource.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#ff6a00] mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Resource Illustration */}
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
                  src={resource.imagePath}
                  alt={resource.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Conditional Layout Injection: Case Portfolio */}
          {resource.slug === "case-portfolio" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-white/[0.04] pt-16 sm:pt-24 space-y-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
                    Client Engagements
                  </h2>
                  <p className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
                    Our Complete Work Log
                  </p>
                </div>
                
                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2 items-center">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        activeCategory === cat
                          ? "bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] text-white shadow-sm border border-transparent"
                          : "bg-[#16161a] text-slate-400 hover:text-white border border-white/5 hover:border-white/10"
                      }`}
                    >
                      {cat === "Content" ? "Content & Copy" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm hover:border-[#ff6a00]/30 hover:bg-[#16161a]/95 hover:shadow-[0_10px_35px_rgba(255,106,0,0.05)] transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono tracking-widest text-[#ff6a00] uppercase font-bold bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-2 py-0.5 rounded">
                          {project.serviceTitle}
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                          Client: {project.client}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-white tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-slate-400 text-xs font-light leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
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

                    {/* Results summary box */}
                    <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-start gap-2.5 bg-gradient-to-r from-[#ff6a00]/[0.02] to-transparent p-2 rounded border border-[#ff6a00]/[0.03]">
                      <Zap className="w-4 h-4 text-[#ff6a00] shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono tracking-wider text-[#ff6a00] uppercase font-bold block">
                          Impact Result
                        </span>
                        <span className="text-xs text-white font-medium">
                          {project.results}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Conditional Layout Injection: Growth Blog */}
          {resource.slug === "growth-blog" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-white/[0.04] pt-16 sm:pt-24 space-y-12"
            >
              <div className="max-w-xl">
                <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
                  Latest Publications
                </h2>
                <p className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
                  Strategic Business Knowledge
                </p>
              </div>

              {/* Blog posts list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, idx) => (
                  <motion.article
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a]/40 hover:border-[#ff6a00]/30 hover:bg-[#16161a]/95 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 font-light">
                        <span className="text-[#ff6a00] font-semibold uppercase tracking-wider">{post.category}</span>
                        <span>{post.date} &bull; {post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-snug hover:text-[#ff6a00] transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-light leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff6a00] hover:text-[#ff2b00] transition-colors pt-6 border-t border-white/[0.04] mt-6"
                    >
                      Read Article &rarr;
                    </a>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {/* Conditional Layout Injection: System Pricing */}
          {resource.slug === "system-pricing" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-white/[0.04] pt-16 sm:pt-24"
            >
              <div className="max-w-3xl mb-12 sm:mb-16">
                <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
                  Cost Calculation
                </h2>
                <p className="mt-3 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
                  Interactive Budget Planner
                </p>
                <p className="mt-4 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  Calculate and customize your investments. Toggle different web assets, digital marketing targets, content scopes, and review immediate estimations.
                </p>
              </div>
              <div className="bg-[#16161a]/40 rounded-3xl border border-white/[0.04] p-2 sm:p-6 shadow-xl backdrop-blur-sm">
                <Calculator />
              </div>
            </motion.div>
          )}

          {/* Conditional Layout Injection: Client Reviews */}
          {resource.slug === "client-reviews" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-white/[0.04] pt-16 sm:pt-24 space-y-12"
            >
              <div className="max-w-xl">
                <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
                  Customer Satisfaction
                </h2>
                <p className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
                  What our clients say about us
                </p>
              </div>

              {/* Reviews grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {clientReviewsList.map((review, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a]/40 hover:border-[#ff6a00]/30 hover:bg-[#16161a]/95 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Ratings stars */}
                      <div className="flex items-center gap-0.5 text-[#ff6a00]">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      
                      {/* Review body */}
                      <p className="text-slate-300 text-xs italic font-light leading-relaxed">
                        "{review.review}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/[0.04] mt-6">
                      <div>
                        <span className="block text-xs font-bold text-white uppercase tracking-wider">{review.client}</span>
                        <span className="block text-[10px] text-slate-500 font-light">{review.company}</span>
                      </div>
                      <span className="text-[9px] font-mono text-[#ff6a00] bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-2 py-0.5 rounded font-bold uppercase">
                        {review.service}
                      </span>
                    </div>
                  </motion.div>
                ))}
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
