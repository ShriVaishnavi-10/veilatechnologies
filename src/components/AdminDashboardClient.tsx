"use client";

import React, { useState, useEffect } from "react";
import { Lock, Mail, User, ShieldAlert, ArrowLeft, Trash2, CheckCircle, Eye, LogOut, Loader2, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Inquiry {
  id?: string;
  name: string;
  email: string;
  service: string;
  message: string;
  created_at?: string;
  status?: string;
}

export default function AdminDashboardClient() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  // Check login state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = sessionStorage.getItem("veila_admin_logged");
      if (logged === "true") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Fetch inquiries when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchInquiries();
    }
  }, [isLoggedIn]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("contact_inquiries")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setInquiries(data || []);
      } else {
        // Load from local storage fallback
        if (typeof window !== "undefined") {
          const localData = localStorage.getItem("veila_contact_inquiries");
          setInquiries(localData ? JSON.parse(localData) : []);
        }
      }
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const targetKey = process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY || "admin123";

    if (passcode === targetKey) {
      sessionStorage.setItem("veila_admin_logged", "true");
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid administrator passcode. Access Denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("veila_admin_logged");
    setIsLoggedIn(false);
    setPasscode("");
  };

  // Update Status in database or localStorage
  const handleUpdateStatus = async (inquiryId: string, newStatus: string) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from("contact_inquiries")
          .update({ status: newStatus })
          .eq("id", inquiryId);
        if (error) {
          console.warn("Status update failed in database, falling back to local state.");
        }
      } 
      
      // Update local storage
      if (typeof window !== "undefined") {
        const localData = localStorage.getItem("veila_contact_inquiries");
        if (localData) {
          const parsed: Inquiry[] = JSON.parse(localData);
          const updated = parsed.map(item => 
            item.id === inquiryId ? { ...item, status: newStatus } : item
          );
          localStorage.setItem("veila_contact_inquiries", JSON.stringify(updated));
        }
      }

      // Update state
      setInquiries(prev => prev.map(item => 
        (item.id === inquiryId || (item as any).created_at === inquiryId) ? { ...item, status: newStatus } : item
      ));

      fetchInquiries();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (inquiryId: string) => {
    if (!confirm("Are you sure you want to archive and delete this inquiry?")) return;

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from("contact_inquiries")
          .delete()
          .eq("id", inquiryId);
        if (error) console.error("Error deleting from database:", error);
      }

      // Delete from local storage
      if (typeof window !== "undefined") {
        const localData = localStorage.getItem("veila_contact_inquiries");
        if (localData) {
          const parsed: Inquiry[] = JSON.parse(localData);
          const updated = parsed.filter(item => item.id !== inquiryId);
          localStorage.setItem("veila_contact_inquiries", JSON.stringify(updated));
        }
      }

      setInquiries(prev => prev.filter(item => item.id !== inquiryId && (item as any).created_at !== inquiryId));
      fetchInquiries();
    } catch (err) {
      console.error("Error deleting inquiry:", err);
    }
  };

  // Filtering
  const filteredInquiries = filter === "All"
    ? inquiries
    : inquiries.filter(item => {
        if (filter === "Web") return item.service === "Website Development";
        if (filter === "SEO") return item.service === "SEO Optimization";
        if (filter === "Marketing") return item.service === "Digital Marketing" || item.service === "Digital Marketing & Ads";
        if (filter === "Social") return item.service === "Social Media" || item.service === "Social Media Management";
        if (filter === "Content") return item.service === "Content Writing" || item.service === "Content Writing & Editing";
        return true;
      });

  // Stats
  const totalCount = inquiries.length;
  const newCount = inquiries.filter(item => !item.status || item.status === "New").length;
  const webCount = inquiries.filter(item => item.service === "Website Development").length;
  const mktCount = inquiries.filter(item => item.service.toLowerCase().includes("marketing") || item.service.toLowerCase().includes("social")).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0C] text-slate-100 overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6a00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#ff2b00]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <AnimatePresence mode="wait">
            {!isLoggedIn ? (
              /* LOGIN GATE */
              <motion.div
                key="login-gate"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-md mx-auto space-y-8 pt-8"
              >
                {/* Warning Card for Users */}
                <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-rose-500 flex items-center gap-2 font-mono">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Authorized Personnel Only</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    This is a private administrative dashboard for Veila Technologies staff to read customer inquiries. If you are a client looking to build, grow, or plan your project, please return to the homepage.
                  </p>
                  <a
                    href="/"
                    className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-white/20 text-white transition-all inline-flex items-center justify-center gap-2 bg-[#16161a] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Homepage
                  </a>
                </div>

                {/* Login Form Panel */}
                <div className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a] shadow-2xl space-y-6">
                  <div className="text-center space-y-2">
                    <div className="p-3 bg-[#ff6a00]/10 border border-[#ff6a00]/20 rounded-full w-fit mx-auto text-[#ff6a00]">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight font-serif">Admin Passcode</h3>
                    <p className="text-[11px] text-slate-500 font-light">Enter key to inspect consultation inbox</p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                        Access Credentials
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full px-4 py-3 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-655 focus:outline-none focus:border-[#ff6a00]/40 transition-all text-center font-mono"
                      />
                    </div>

                    {loginError && (
                      <div className="text-[10px] text-rose-500 font-mono text-center pt-1">
                        {loginError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 rounded bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff6a00] hover:to-[#ff1200] text-xs font-semibold text-white tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                    >
                      Authenticate Access
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              /* ADMIN DASHBOARD CONSOLE */
              <motion.div
                key="admin-console"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20 mb-2">
                      <Sparkles className="w-3 h-3 text-[#ff6a00]" />
                      <span className="text-[9px] font-mono tracking-widest text-[#ff6a00] uppercase font-bold">
                        Database Console
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
                      Consultation Inquiries
                    </h2>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-3 py-2 border border-white/10 hover:border-rose-500/30 hover:bg-rose-500/[0.05] text-[10px] uppercase tracking-wider text-slate-400 hover:text-rose-500 rounded-lg transition-all font-semibold font-mono bg-[#16161a]/60 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>

                {/* Stats Summary Panel */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm">
                    <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold block">Total Submissions</span>
                    <span className="text-2xl font-bold text-white mt-1 block">{totalCount}</span>
                  </div>
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm">
                    <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold block">Pending Action</span>
                    <span className="text-2xl font-bold text-[#ff6a00] mt-1 block">{newCount}</span>
                  </div>
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm">
                    <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold block">Web Inquiries</span>
                    <span className="text-2xl font-bold text-white mt-1 block">{webCount}</span>
                  </div>
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm">
                    <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold block">Marketing Leads</span>
                    <span className="text-2xl font-bold text-white mt-1 block">{mktCount}</span>
                  </div>
                </div>

                {/* Actions & Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs text-slate-500 font-light">Filter leads:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Web", "SEO", "Marketing", "Social", "Content"].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          filter === cat
                            ? "bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] text-white shadow-sm"
                            : "bg-[#16161a] text-slate-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {cat === "Web" ? "Web Dev" : cat === "Social" ? "Social Handles" : cat === "Content" ? "Content & Copy" : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main List */}
                {loading ? (
                  <div className="py-24 text-center space-y-3">
                    <Loader2 className="w-6 h-6 animate-spin text-[#ff6a00] mx-auto" />
                    <p className="text-xs text-slate-500 font-light font-mono">Loading data columns...</p>
                  </div>
                ) : filteredInquiries.length === 0 ? (
                  <div className="py-20 rounded-xl border border-dashed border-white/10 text-center space-y-2 bg-[#16161a]/20">
                    <Mail className="w-8 h-8 text-slate-600 mx-auto" />
                    <h4 className="text-sm font-semibold text-white">No inquiries found</h4>
                    <p className="text-xs text-slate-500 font-light">Submissions will show up here once form is filled.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredInquiries.map((item, idx) => {
                      const itemDate = item.created_at ? new Date(item.created_at).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                      }) : "Unknown Date";

                      const status = item.status || "New";

                      return (
                        <motion.div
                          key={idx}
                          layout
                          className="p-5 sm:p-6 rounded-xl border border-white/[0.04] bg-[#16161a]/50 backdrop-blur-sm space-y-4 hover:border-white/[0.08] transition-all"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/[0.04]">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                                  <User className="w-3.5 h-3.5 text-[#ff6a00]" />
                                  {item.name}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                                  {item.email}
                                </span>
                                <span className="text-[9px] font-mono text-[#ff6a00] bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-2 py-0.5 rounded font-bold uppercase">
                                  {item.service}
                                </span>
                              </div>
                              <span className="block text-[10px] text-slate-500 font-mono font-light">Received: {itemDate}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Status Tag */}
                              <span className={`text-[9px] font-mono tracking-wider font-bold uppercase px-2 py-0.5 rounded ${
                                status === "New" ? "text-yellow-500 bg-yellow-500/10 border border-yellow-500/20" :
                                status === "Contacted" ? "text-green-500 bg-green-500/10 border border-green-500/20" :
                                "text-slate-400 bg-slate-400/10 border border-slate-400/20"
                              }`}>
                                {status}
                              </span>
                            </div>
                          </div>

                          <div className="text-slate-300 text-xs font-light leading-relaxed whitespace-pre-line p-3.5 rounded bg-black/40 border border-white/[0.02] text-left">
                            {item.message}
                          </div>

                          {/* Action toolbar */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleUpdateStatus(item.id || (item as any).created_at || "", "Contacted")}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-green-500/20 hover:bg-green-500/[0.05] text-[9px] uppercase tracking-wider text-green-500 rounded transition-all font-semibold font-mono bg-[#16161a] cursor-pointer"
                              >
                                <CheckCircle className="w-3 h-3" />
                                Mark Contacted
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(item.id || (item as any).created_at || "", "Reviewed")}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/5 hover:bg-white/[0.03] text-[9px] uppercase tracking-wider text-slate-400 hover:text-white rounded transition-all font-semibold font-mono bg-[#16161a] cursor-pointer"
                              >
                                <Eye className="w-3 h-3" />
                                Mark Reviewed
                              </button>
                            </div>
                            
                            <button
                              onClick={() => handleDeleteInquiry(item.id || (item as any).created_at || "")}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-rose-500/20 hover:bg-rose-500/[0.05] text-[9px] uppercase tracking-wider text-rose-500 rounded transition-all font-semibold font-mono bg-[#16161a] cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
}
