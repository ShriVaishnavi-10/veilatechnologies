"use client";

import React, { useState, useEffect } from "react";
import { Clock, User, Search, Calendar, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { companyUpdatesList, CompanyUpdate, mapDBUpdateToCompanyUpdate } from "@/lib/updatesData";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Magnetic from "@/components/Magnetic";

function highlightText(text: string, highlight: string) {
  if (!highlight || !highlight.trim()) {
    return text;
  }
  const escapedHighlight = highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${escapedHighlight})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-[#ff6a00]/25 text-[#ff8a00] px-0.5 rounded font-medium">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function CompanyUpdatesPage() {
  const [updates, setUpdates] = useState<CompanyUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | "Product" | "Milestone" | "Company">("All");

  const categories: ("All" | "Product" | "Milestone" | "Company")[] = ["All", "Product", "Milestone", "Company"];

  useEffect(() => {
    async function loadUpdates() {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase
            .from("company_updates")
            .select("*")
            .order("publish_date", { ascending: false })
            .order("created_at", { ascending: false });

          if (error) throw error;

          if (data && data.length > 0) {
            setUpdates(data.map(mapDBUpdateToCompanyUpdate));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load updates from Supabase:", err);
      }

      let list = [...companyUpdatesList];
      
      if (typeof window !== "undefined") {
        const localUpdates = localStorage.getItem("veila_company_updates");
        if (localUpdates) {
          try {
            const parsed = JSON.parse(localUpdates);
            if (parsed && parsed.length > 0) {
              const mappedLocal = parsed.map(mapDBUpdateToCompanyUpdate);
              list = [...mappedLocal, ...list];
            }
          } catch (e) {
          }
        }
      }

      setUpdates(list);
      setLoading(false);
    }

    loadUpdates();
  }, []);

  const filteredUpdates = updates.filter((update) => {
    const matchesCategory = activeCategory === "All" || update.category === activeCategory;
    const matchesSearch =
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0C] text-slate-100 overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6a00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#ff2b00]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20">
                <span className="text-[10px] font-mono tracking-widest text-[#ff6a00] uppercase font-bold">
                  Veila Pulse
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight">
                Company Updates
              </h1>
              <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
                Stay updated with the latest releases, milestones, announcements, and developer stories direct from the team at Veila Technologies.
              </p>
            </motion.div>
          </div>

          <div className="border-t border-white/[0.04] pt-8 pb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer relative ${
                    activeCategory === cat
                      ? "border-transparent text-white z-10 font-bold"
                      : "bg-[#16161a]/60 border-white/[0.04] text-slate-400 hover:text-white hover:border-white/10"
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] rounded-full -z-10 shadow-lg shadow-[#ff6a00]/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#16161a]/60 border border-white/[0.04] rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6a00]/50 focus:bg-[#16161a]/90 transition-all font-light"
              />
            </div>
          </div>

          <div className="relative">
            {loading ? (
              <div className="py-24 text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#ff6a00] mx-auto" />
                <p className="text-xs text-slate-500 font-light font-mono">Loading announcements...</p>
              </div>
            ) : filteredUpdates.length > 0 ? (
              <div className="relative pl-6 sm:pl-12 border-l border-white/[0.06] space-y-16 py-4">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  style={{ originY: 0 }}
                  className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#ff8a00] to-[#ff2b00] origin-top z-10"
                />

                <AnimatePresence mode="popLayout">
                  {filteredUpdates.map((update) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 15 }}
                      className="relative"
                    >
                      <motion.span
                        initial={{ scale: 0, boxShadow: "0 0 0px rgba(255, 106, 0, 0)" }}
                        whileInView={{ scale: 1, boxShadow: "0 0 16px rgba(255, 106, 0, 0.8)" }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                        className="absolute -left-[31.5px] sm:-left-[55.5px] top-1.5 w-3 h-3 rounded-full bg-[#ff6a00] border-4 border-[#0B0B0C] z-10"
                      />

                      <Magnetic range={150} strength={0.06}>
                        <motion.div
                          whileHover={{ scale: 1.015, borderColor: "rgba(255, 106, 0, 0.25)", boxShadow: "0 15px 30px -10px rgba(255, 106, 0, 0.1)" }}
                          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#16161a]/30 rounded-2xl border border-white/[0.04] p-6 sm:p-8 hover:bg-[#16161a]/70 transition-all duration-300 cursor-pointer"
                        >
                          
                          <div className="lg:col-span-4 relative rounded-xl overflow-hidden aspect-[16/10] lg:aspect-auto min-h-[160px] border border-white/[0.04]">
                            <img
                              src={update.imageUrl}
                              alt={update.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-[#ff6a00]" />
                                  <span>{update.date}</span>
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                                  <span>{update.readTime}</span>
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                <span className="px-2 py-0.5 rounded bg-[#ff6a00]/10 border border-[#ff6a00]/20 text-[#ff6a00] font-bold uppercase tracking-wider">
                                  {update.category}
                                </span>
                              </div>

                              <h3 className="font-serif text-xl sm:text-2xl font-medium text-white hover:text-[#ff6a00] transition-colors leading-tight">
                                {highlightText(update.title, searchQuery)}
                              </h3>

                              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                                {highlightText(update.content, searchQuery)}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-white/[0.04] text-[10px] font-mono text-slate-500">
                              <User className="w-3.5 h-3.5 text-[#ff6a00]" />
                              <span>Published by <strong className="text-slate-300 font-medium">{update.author}</strong></span>
                            </div>

                          </div>
                        </motion.div>
                      </Magnetic>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-dashed border-white/[0.06] rounded-2xl bg-[#16161a]/10"
              >
                <AlertCircle className="w-8 h-8 text-slate-600" />
                <p className="text-xs text-slate-500 font-light">
                  No announcements found matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{activeCategory}&rdquo;.
                </p>
              </motion.div>
            )}
          </div>



        </div>
      </main>

      <Footer />
    </div>
  );
}
