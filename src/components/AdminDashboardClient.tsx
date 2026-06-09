"use client";

import React, { useState, useEffect } from "react";
import { Lock, Mail, User, ShieldAlert, ArrowLeft, Trash2, CheckCircle, Eye, LogOut, Loader2, Sparkles, Filter, FileText, Plus, Edit2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";


interface Inquiry {
  id?: string;
  name: string;
  email: string;
  service: string;
  message: string;
  created_at?: string;
  status?: string;
}

interface JobApplication {
  id: string;
  job_title: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  resume_url: string;
  portfolio_url?: string;
  cover_letter: string;
  status: "New" | "Reviewed" | "Archived";
  created_at: string;
}

export default function AdminDashboardClient() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  
  // Tabs & Views
  const [activeTab, setActiveTab] = useState<"inquiries" | "blogs" | "applications">("inquiries");

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  // Blogs State
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  // Job Applications State
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [appLoading, setAppLoading] = useState(false);
  const [appFilter, setAppFilter] = useState("All");
  const [expandedApps, setExpandedApps] = useState<Record<string, boolean>>({});

  const toggleExpandApp = (id: string) => {
    setExpandedApps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Check login state on mount
  useEffect(() => {
    let authListener: any = null;

    if (isSupabaseConfigured && supabase) {
      // Get current session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsLoggedIn(true);
          sessionStorage.setItem("veila_admin_logged", "true");
        } else {
          setIsLoggedIn(false);
          sessionStorage.removeItem("veila_admin_logged");
        }
        setAuthChecking(false);
      });

      // Listen to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" && session) {
          setIsLoggedIn(true);
          sessionStorage.setItem("veila_admin_logged", "true");
        } else if (event === "SIGNED_OUT") {
          setIsLoggedIn(false);
          sessionStorage.removeItem("veila_admin_logged");
        }
      });
      authListener = subscription;
    } else {
      // Fallback local session checking
      if (typeof window !== "undefined") {
        const logged = sessionStorage.getItem("veila_admin_logged");
        if (logged === "true") {
          setIsLoggedIn(true);
        }
      }
      setAuthChecking(false);
    }

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);

  // Fetch data depending on active tab
  useEffect(() => {
    if (isLoggedIn) {
      if (activeTab === "inquiries") {
        fetchInquiries();
      } else if (activeTab === "blogs") {
        fetchBlogPosts();
      } else if (activeTab === "applications") {
        fetchApplications();
      }
    }
  }, [isLoggedIn, activeTab]);

  const fetchApplications = async () => {
    setAppLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("job_applications")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setApplications(data || []);
      } else {
        if (typeof window !== "undefined") {
          const localData = localStorage.getItem("veila_job_applications");
          setApplications(localData ? JSON.parse(localData) : []);
        }
      }
    } catch (err) {
      // Error fetching applications
    } finally {
      setAppLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from("job_applications")
          .update({ status: newStatus })
          .eq("id", applicationId);
        if (error) throw error;
      } else {
        if (typeof window !== "undefined") {
          const localData = localStorage.getItem("veila_job_applications");
          if (localData) {
            const list: JobApplication[] = JSON.parse(localData);
            const updated = list.map(item => 
              (String(item.id) === String(applicationId) || String(item.created_at) === String(applicationId))
                ? { ...item, status: newStatus as any }
                : item
            );
            localStorage.setItem("veila_job_applications", JSON.stringify(updated));
          }
        }
      }
      setApplications(prev => prev.map(item => 
        (String(item.id) === String(applicationId) || String(item.created_at) === String(applicationId))
          ? { ...item, status: newStatus as any }
          : item
      ));
    } catch (err) {
      // Error updating status
    }
  };

  const deleteApplication = async (applicationId: string) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from("job_applications")
          .delete()
          .eq("id", applicationId);
        if (error) throw error;
      } else {
        if (typeof window !== "undefined") {
          const localData = localStorage.getItem("veila_job_applications");
          if (localData) {
            const list: JobApplication[] = JSON.parse(localData);
            const updated = list.filter(item => 
              String(item.id) !== String(applicationId) && String(item.created_at) !== String(applicationId)
            );
            localStorage.setItem("veila_job_applications", JSON.stringify(updated));
          }
        }
      }
      setApplications(prev => prev.filter(item => 
        String(item.id) !== String(applicationId) && String(item.created_at) !== String(applicationId)
      ));
    } catch (err) {
      // Error deleting application
    }
  };

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
      // Error fetching inquiries details
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        // Authenticate via Supabase Auth
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setLoginError(error.message);
          return;
        }

        // Session listener will handle updating isLoggedIn state
      } else {
        // Offline / fallback verification
        const targetEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@veila.com";
        const targetPassword = process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY || "admin123";

        if (email.trim().toLowerCase() === targetEmail.toLowerCase() && password === targetPassword) {
          sessionStorage.setItem("veila_admin_logged", "true");
          setIsLoggedIn(true);
        } else {
          setLoginError("Invalid administrator credentials. Access Denied.");
        }
      }
    } catch (err: any) {
      setLoginError(err.message || "An authentication error occurred.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      // Ignore signOut errors
    } finally {
      sessionStorage.removeItem("veila_admin_logged");
      setIsLoggedIn(false);
      setEmail("");
      setPassword("");
    }
  };

  // Update Status in database or localStorage
  const handleUpdateStatus = async (inquiryId: string | number, newStatus: string) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("contact_inquiries")
          .update({ status: newStatus })
          .eq("id", inquiryId)
          .select();
        
        if (error) {
          alert(`Failed to update status in database: ${error.message || "Please check RLS policies."}`);
          return;
        }

        if (!data || data.length === 0) {
          alert("Failed to update status. This usually happens because Row Level Security (RLS) is blocking updates. Please run the SQL policy setup in your Supabase dashboard.");
          return;
        }
      } 
      
      // Update local storage
      if (typeof window !== "undefined") {
        const localData = localStorage.getItem("veila_contact_inquiries");
        if (localData) {
          const parsed: Inquiry[] = JSON.parse(localData);
          const updated = parsed.map(item => 
            String(item.id) === String(inquiryId) ? { ...item, status: newStatus } : item
          );
          localStorage.setItem("veila_contact_inquiries", JSON.stringify(updated));
        }
      }

      // Update state
      setInquiries(prev => prev.map(item => {
        const isMatch = String(item.id) === String(inquiryId) || String(item.created_at) === String(inquiryId);
        return isMatch ? { ...item, status: newStatus } : item;
      }));
    } catch (err) {
      // Error updating status
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (inquiryId: string | number) => {
    if (!confirm("Are you sure you want to archive and delete this inquiry?")) return;

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("contact_inquiries")
          .delete()
          .eq("id", inquiryId)
          .select();
          
        if (error) {
          alert(`Failed to delete from database: ${error.message || "Please check RLS policies."}`);
          return;
        }

        if (!data || data.length === 0) {
          alert("Failed to delete inquiry. This usually happens because Row Level Security (RLS) is blocking deletes. Please run the SQL policy setup in your Supabase dashboard.");
          return;
        }
      }

      // Delete from local storage
      if (typeof window !== "undefined") {
        const localData = localStorage.getItem("veila_contact_inquiries");
        if (localData) {
          const parsed: Inquiry[] = JSON.parse(localData);
          const updated = parsed.filter(item => String(item.id) !== String(inquiryId));
          localStorage.setItem("veila_contact_inquiries", JSON.stringify(updated));
        }
      }

      setInquiries(prev => prev.filter(item => String(item.id) !== String(inquiryId) && String(item.created_at) !== String(inquiryId)));
    } catch (err) {
      // Error deleting inquiry
    }
  };

  // Blog Handlers
  const fetchBlogPosts = async () => {
    setBlogLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("company_updates")
          .select("*")
          .order("publish_date", { ascending: false })
          .order("created_at", { ascending: false });
        if (error) throw error;
        setBlogPosts(data || []);
      } else {
        if (typeof window !== "undefined") {
          const localData = localStorage.getItem("veila_company_updates");
          setBlogPosts(localData ? JSON.parse(localData) : []);
        }
      }
    } catch (err) {
      // Error fetching blog posts
    } finally {
      setBlogLoading(false);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (!editingPost.title || !editingPost.slug || !editingPost.content || !editingPost.category || !editingPost.author || !editingPost.read_time || !editingPost.image_url || !editingPost.publish_date) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const isNew = !editingPost.id;
      const payload = {
        title: editingPost.title,
        slug: editingPost.slug,
        content: editingPost.content,
        category: editingPost.category,
        author: editingPost.author,
        read_time: editingPost.read_time,
        image_url: editingPost.image_url,
        publish_date: editingPost.publish_date
      };

      if (isSupabaseConfigured && supabase) {
        if (isNew) {
          const { data, error } = await supabase
            .from("company_updates")
            .insert([payload])
            .select();
          
          if (error) {
            alert(`Failed to save: ${error.message}`);
            return;
          }
          if (data && data.length > 0) {
            setBlogPosts(prev => [data[0], ...prev]);
          }
        } else {
          const { data, error } = await supabase
            .from("company_updates")
            .update(payload)
            .eq("id", editingPost.id)
            .select();
          
          if (error) {
            alert(`Failed to update: ${error.message}`);
            return;
          }
          if (data && data.length > 0) {
            setBlogPosts(prev => prev.map(item => item.id === editingPost.id ? data[0] : item));
          }
        }
      } else {
        // Local storage fallback for offline demo
        if (typeof window !== "undefined") {
          const localData = localStorage.getItem("veila_company_updates");
          const parsed = localData ? JSON.parse(localData) : [];
          let updatedList = [];
          if (isNew) {
            const newRecord = {
              ...payload,
              id: `local-${Date.now()}`,
              created_at: new Date().toISOString()
            };
            updatedList = [newRecord, ...parsed];
            setBlogPosts(prev => [newRecord, ...prev]);
          } else {
            updatedList = parsed.map((item: any) => 
              item.id === editingPost.id ? { ...item, ...payload } : item
            );
            setBlogPosts(prev => prev.map(item => item.id === editingPost.id ? { ...item, ...payload } : item));
          }
          localStorage.setItem("veila_company_updates", JSON.stringify(updatedList));
        }
      }

      setEditingPost(null);
    } catch (err) {
      alert("Error saving blog post");
    }
  };

  const handleDeletePost = async (postId: string | number) => {
    if (!confirm("Are you sure you want to delete this update post?")) return;

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("company_updates")
          .delete()
          .eq("id", postId)
          .select();
        
        if (error) {
          alert(`Failed to delete: ${error.message}`);
          return;
        }
      }

      if (typeof window !== "undefined") {
        const localData = localStorage.getItem("veila_company_updates");
        if (localData) {
          const parsed = JSON.parse(localData);
          const updated = parsed.filter((item: any) => String(item.id) !== String(postId));
          localStorage.setItem("veila_company_updates", JSON.stringify(updated));
        }
      }

      setBlogPosts(prev => prev.filter(item => String(item.id) !== String(postId)));
    } catch (err) {
      alert("Error deleting blog post");
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm("This will copy the default posts to your database/local storage. Proceed?")) return;
    
    setBlogLoading(true);
    try {
      const defaultPosts = [
        {
          slug: "veila-pulse-launch",
          title: "Veila Pulse Officially Launched",
          content: "Today we are launching Veila Pulse, our new centralized company updates feed and product changelog dashboard. Stay tuned for periodic releases, engineering developments, and milestone stories as we scale digital businesses.",
          category: "Company",
          publish_date: "2026-06-09",
          author: "Gokulakrishnan, CEO",
          read_time: "1 min read",
          image_url: "/resource_growth_blog.png"
        },
        {
          slug: "client-estimator-deployment",
          title: "Sleek Static Estimator Tool Deployed",
          content: "We've fully integrated our custom Client Estimator calculator. Business owners can now easily configure their custom website specs, page counts, SEO terms, and social media posting metrics to receive a transparent budget estimate instantly.",
          category: "Product",
          publish_date: "2026-05-15",
          author: "Ramya, Tech Lead",
          read_time: "2 min read",
          image_url: "/operation_client_estimator.png"
        },
        {
          slug: "virudhunagar-office-expansion",
          title: "Virudhunagar Office Suite Expansion",
          content: "To support our expanding operations team and accommodate close collaborative consulting with our local client base, Veila Technologies has opened its brand-new headquarters in Virudhunagar, Tamilnadu.",
          category: "Milestone",
          publish_date: "2026-04-20",
          author: "Priya, Operations Director",
          read_time: "2 min read",
          image_url: "/company_about.png"
        },
        {
          slug: "supabase-database-integrations",
          title: "Supabase Database & Offline Sync Fallbacks",
          content: "We have finalized our database adapter suite. All contact portals and user dashboards now stream leads dynamically into Supabase. If the network goes offline, our clients benefit from a robust localStorage backup flow.",
          category: "Product",
          publish_date: "2026-03-10",
          author: "Barath, Senior Developer",
          read_time: "3 min read",
          image_url: "/operation_quality_standards.png"
        }
      ];

      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("company_updates")
          .insert(defaultPosts)
          .select();
        
        if (error) {
          alert(`Failed to seed: ${error.message}`);
          return;
        }
        alert("Successfully seeded default posts to Supabase database!");
        fetchBlogPosts();
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem("veila_company_updates", JSON.stringify(defaultPosts));
          alert("Successfully seeded default posts to local storage fallback!");
          fetchBlogPosts();
        }
      }
    } catch (e) {
      alert("Error seeding posts");
    } finally {
      setBlogLoading(false);
    }
  };

  // Filtering
  const filteredInquiries = filter === "All"
    ? inquiries
    : filter === "Completed"
    ? inquiries.filter(item => item.status === "Contacted")
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
  const completedCount = inquiries.filter(item => item.status === "Contacted").length;
  const webCount = inquiries.filter(item => item.service === "Website Development").length;
  const mktCount = inquiries.filter(item => item.service.toLowerCase().includes("marketing") || item.service.toLowerCase().includes("social")).length;
  const newAppsCount = applications.filter(item => !item.status || item.status === "New").length;
  const reviewedAppsCount = applications.filter(item => item.status === "Reviewed").length;
  const archivedAppsCount = applications.filter(item => item.status === "Archived").length;
  const filteredApplications = applications.filter(item => {
    const status = item.status || "New";
    if (appFilter === "All") return true;
    return status === appFilter;
  });

  if (authChecking) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0B0B0C] text-slate-100 items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#ff6a00] mx-auto" />
          <p className="text-xs text-slate-500 font-light font-mono">Checking authorization session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0C] text-slate-100 overflow-hidden">
      <main className="flex-grow pt-16 pb-20 relative">
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
                  <Link
                    href="/"
                    className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-white/20 text-white transition-all inline-flex items-center justify-center gap-2 bg-[#16161a] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Homepage
                  </Link>
                </div>

                {/* Login Form Panel */}
                <div className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a] shadow-2xl space-y-6">
                  <div className="text-center space-y-2">
                    <div className="p-3 bg-[#ff6a00]/10 border border-[#ff6a00]/20 rounded-full w-fit mx-auto text-[#ff6a00]">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight font-serif">Admin Login</h3>
                    <p className="text-[11px] text-slate-500 font-light">Sign in to access control panel</p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-semibold block text-left">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          required
                          placeholder="admin@veila.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#ff6a00]/40 transition-all text-left"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-semibold block text-left">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#ff6a00]/40 transition-all text-left"
                        />
                      </div>
                    </div>

                    {loginError && (
                      <div className="text-[10px] text-rose-500 font-mono text-center pt-1">
                        {loginError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full py-3 rounded bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff6a00] hover:to-[#ff1200] text-xs font-semibold text-white tracking-wider uppercase transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loginLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Authenticating...
                        </>
                      ) : (
                        "Sign In"
                      )}
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
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20 mb-2">
                      <Sparkles className="w-3 h-3 text-[#ff6a00]" />
                      <span className="text-[9px] font-mono tracking-widest text-[#ff6a00] uppercase font-bold">
                        Database Console
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
                      Veila Admin Portal
                    </h2>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Tab Toggles */}
                    <div className="flex bg-[#16161a] border border-white/5 p-1 rounded-lg">
                      <button
                        onClick={() => { setActiveTab("inquiries"); setEditingPost(null); }}
                        className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          activeTab === "inquiries"
                            ? "bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Leads Inbox
                      </button>
                      <button
                        onClick={() => { setActiveTab("blogs"); setEditingPost(null); }}
                        className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          activeTab === "blogs"
                            ? "bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Company Updates
                      </button>
                      <button
                        onClick={() => { setActiveTab("applications"); setEditingPost(null); }}
                        className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                          activeTab === "applications"
                            ? "bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <span>Job Applications</span>
                        {newAppsCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[8px] font-bold shrink-0">
                            {newAppsCount}
                          </span>
                        )}
                      </button>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center gap-2 px-3 py-2 border border-white/10 hover:border-rose-500/30 hover:bg-rose-500/[0.05] text-[10px] uppercase tracking-wider text-slate-400 hover:text-rose-500 rounded-lg transition-all font-semibold font-mono bg-[#16161a]/60 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </div>
                </div>

                {/* INQUIRIES PANEL */}
                {activeTab === "inquiries" && (
                  <>
                    {/* Stats Summary Panel */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                      <div className="p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm">
                        <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold block">Total Submissions</span>
                        <span className="text-2xl font-bold text-white mt-1 block">{totalCount}</span>
                      </div>
                      <div className="p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm">
                        <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold block">Pending Action</span>
                        <span className="text-2xl font-bold text-[#ff6a00] mt-1 block">{newCount}</span>
                      </div>
                      <div className="p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm">
                        <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold block">Completed</span>
                        <span className="text-2xl font-bold text-green-500 mt-1 block">{completedCount}</span>
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
                        {["All", "Completed", "Web", "SEO", "Marketing", "Social", "Content"].map(cat => (
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

                              <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleUpdateStatus(item.id || (item as any).created_at || "", "Contacted")}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-green-500/20 hover:bg-green-500/[0.05] text-[9px] uppercase tracking-wider text-green-500 rounded transition-all font-semibold font-mono bg-[#16161a] cursor-pointer"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5" />
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
                  </>
                )}

                {/* BLOGS PANEL */}
                {activeTab === "blogs" && (
                  <div className="space-y-6">
                    {editingPost ? (
                      /* BLOG EDIT/CREATE FORM */
                      <form onSubmit={handleSavePost} className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a] space-y-6 max-w-3xl mx-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-white/[0.04]">
                          <h3 className="font-serif text-xl font-medium text-white">
                            {editingPost.id ? "Edit Update Announcement" : "Create New Announcement"}
                          </h3>
                          <button
                            type="button"
                            onClick={() => setEditingPost(null)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-white/20 text-[10px] uppercase tracking-wider text-slate-400 hover:text-white rounded transition-all font-semibold font-mono bg-black/40 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Title */}
                          <div className="space-y-2 text-left">
                            <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">Title</label>
                            <input
                              type="text"
                              required
                              value={editingPost.title || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                const slug = val
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/(^-|-$)/g, "");
                                setEditingPost((prev: any) => ({ ...prev, title: val, slug: prev?.slug ? prev.slug : slug }));
                              }}
                              placeholder="E.g., Brand New App Deployed"
                              className="w-full px-4 py-2.5 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#ff6a00]/40 transition-all"
                            />
                          </div>

                          {/* Slug */}
                          <div className="space-y-2 text-left">
                            <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">Slug (URL identifier)</label>
                            <input
                              type="text"
                              required
                              value={editingPost.slug || ""}
                              onChange={(e) => setEditingPost((prev: any) => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "") }))}
                              placeholder="e.g., brand-new-app-deployed"
                              className="w-full px-4 py-2.5 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#ff6a00]/40 transition-all font-mono"
                            />
                          </div>

                          {/* Category */}
                          <div className="space-y-2 text-left">
                            <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">Category</label>
                            <select
                              value={editingPost.category || "Company"}
                              onChange={(e) => setEditingPost((prev: any) => ({ ...prev, category: e.target.value }))}
                              className="w-full px-4 py-2.5 rounded border border-white/[0.08] bg-[#16161a] text-xs text-white focus:outline-none focus:border-[#ff6a00]/40 transition-all"
                            >
                              <option value="Product">Product</option>
                              <option value="Milestone">Milestone</option>
                              <option value="Company">Company</option>
                            </select>
                          </div>

                          {/* Publish Date */}
                          <div className="space-y-2 text-left">
                            <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">Publish Date</label>
                            <input
                              type="date"
                              required
                              value={editingPost.publish_date || ""}
                              onChange={(e) => setEditingPost((prev: any) => ({ ...prev, publish_date: e.target.value }))}
                              className="w-full px-4 py-2.5 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white focus:outline-none focus:border-[#ff6a00]/40 transition-all font-mono"
                            />
                          </div>

                          {/* Author */}
                          <div className="space-y-2 text-left">
                            <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">Author</label>
                            <input
                              type="text"
                              required
                              value={editingPost.author || ""}
                              onChange={(e) => setEditingPost((prev: any) => ({ ...prev, author: e.target.value }))}
                              placeholder="E.g., Ramya, Tech Lead"
                              className="w-full px-4 py-2.5 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#ff6a00]/40 transition-all"
                            />
                          </div>

                          {/* Read Time */}
                          <div className="space-y-2 text-left">
                            <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">Read Time</label>
                            <input
                              type="text"
                              required
                              value={editingPost.read_time || ""}
                              onChange={(e) => setEditingPost((prev: any) => ({ ...prev, read_time: e.target.value }))}
                              placeholder="E.g., 3 min read"
                              className="w-full px-4 py-2.5 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#ff6a00]/40 transition-all"
                            />
                          </div>

                          {/* Image URL with presets */}
                          <div className="space-y-2 md:col-span-2 text-left">
                            <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">Image URL</label>
                            <input
                              type="text"
                              required
                              value={editingPost.image_url || ""}
                              onChange={(e) => setEditingPost((prev: any) => ({ ...prev, image_url: e.target.value }))}
                              placeholder="E.g., /resource_growth_blog.png or external https:// link"
                              className="w-full px-4 py-2.5 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#ff6a00]/40 transition-all font-mono"
                            />
                            
                            <div className="flex flex-wrap gap-2 pt-1.5">
                              <span className="text-[9px] text-slate-500 font-mono flex items-center">Presets:</span>
                              {[
                                "/resource_growth_blog.png",
                                "/operation_client_estimator.png",
                                "/company_about.png",
                                "/operation_quality_standards.png"
                              ].map((preset) => (
                                <button
                                  key={preset}
                                  type="button"
                                  onClick={() => setEditingPost((prev: any) => ({ ...prev, image_url: preset }))}
                                  className={`px-2 py-0.5 rounded text-[8px] font-mono transition-all border cursor-pointer ${
                                    editingPost.image_url === preset
                                      ? "bg-[#ff6a00]/20 border-[#ff6a00]/50 text-white"
                                      : "bg-black/30 border-white/5 text-slate-400 hover:text-white"
                                  }`}
                                >
                                  {preset.replace("/", "")}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="space-y-2 md:col-span-2 text-left">
                            <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">Post Content</label>
                            <textarea
                              required
                              rows={8}
                              value={editingPost.content || ""}
                              onChange={(e) => setEditingPost((prev: any) => ({ ...prev, content: e.target.value }))}
                              placeholder="Write your blog content here..."
                              className="w-full px-4 py-3 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#ff6a00]/40 transition-all leading-relaxed"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.04]">
                          <button
                            type="button"
                            onClick={() => setEditingPost(null)}
                            className="px-5 py-2.5 rounded border border-white/10 hover:border-white/20 text-xs font-semibold text-slate-400 hover:text-white transition-all bg-black/40 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff6a00] hover:to-[#ff1200] text-xs font-semibold text-white tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                          >
                            Save Announcement
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* BLOG LIST VIEW */
                      <div className="space-y-6">
                        {/* Blog Actions Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40">
                          <div className="text-left">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Blog Controls</h4>
                            <p className="text-[10px] text-slate-500 font-light mt-0.5">Manage live announcements and feed items.</p>
                          </div>
                          
                          <div className="flex gap-2.5">
                            <button
                              onClick={handleSeedDefaults}
                              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-700 hover:border-slate-500 text-[9px] uppercase tracking-wider text-slate-400 hover:text-white rounded transition-all font-semibold font-mono bg-black/30 cursor-pointer"
                            >
                              Seed Default Posts
                            </button>
                            <button
                              onClick={() => setEditingPost({
                                author: "Gokulakrishnan, CEO",
                                read_time: "2 min read",
                                category: "Company",
                                publish_date: new Date().toISOString().split("T")[0],
                                image_url: "/resource_growth_blog.png"
                              })}
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff6a00] hover:to-[#ff1200] text-[9px] uppercase tracking-wider text-white rounded transition-all font-bold font-mono cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              New Post
                            </button>
                          </div>
                        </div>

                        {/* Blog Loader or Grid */}
                        {blogLoading ? (
                          <div className="py-24 text-center space-y-3">
                            <Loader2 className="w-6 h-6 animate-spin text-[#ff6a00] mx-auto" />
                            <p className="text-xs text-slate-500 font-light font-mono">Loading articles...</p>
                          </div>
                        ) : blogPosts.length === 0 ? (
                          <div className="py-20 rounded-xl border border-dashed border-white/10 text-center space-y-2 bg-[#16161a]/20">
                            <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                            <h4 className="text-sm font-semibold text-white">No database articles found</h4>
                            <p className="text-xs text-slate-500 font-light">Seed the defaults or click "New Post" to start adding blog items.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {blogPosts.map((post) => (
                              <div
                                key={post.id}
                                className="p-5 rounded-xl border border-white/[0.04] bg-[#16161a]/50 backdrop-blur-sm space-y-4 hover:border-white/[0.08] transition-all flex flex-col justify-between"
                              >
                                <div className="space-y-3">
                                  {/* Thumbnail & Category */}
                                  <div className="relative aspect-[16/8] rounded-lg overflow-hidden border border-white/[0.04] bg-black/20">
                                    <img
                                      src={post.image_url}
                                      alt={post.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-[#ff6a00]/95 border border-[#ff6a00]/20 text-white">
                                      {post.category}
                                    </span>
                                  </div>

                                  {/* Info */}
                                  <div className="space-y-1 text-left">
                                    <h5 className="font-serif text-base font-semibold text-white leading-tight hover:text-[#ff6a00] transition-colors">
                                      {post.title}
                                    </h5>
                                    
                                    <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono text-slate-500">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3 text-[#ff6a00]" />
                                        <span>{post.publish_date}</span>
                                      </span>
                                      <span>•</span>
                                      <span>{post.read_time}</span>
                                      <span>•</span>
                                      <span>By {post.author}</span>
                                    </div>
                                  </div>

                                  {/* Snippet */}
                                  <p className="text-slate-400 text-xs font-light line-clamp-3 leading-relaxed text-left">
                                    {post.content}
                                  </p>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] mt-2">
                                  <span className="text-[8px] font-mono text-slate-500 select-all">
                                    /{post.slug}
                                  </span>

                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setEditingPost(post)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-white/10 hover:border-white/20 text-[9px] uppercase tracking-wider text-slate-300 hover:text-white rounded transition-all font-semibold font-mono bg-black/40 cursor-pointer"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeletePost(post.id)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-rose-500/20 hover:bg-rose-500/[0.05] text-[9px] uppercase tracking-wider text-rose-500 rounded transition-all font-semibold font-mono bg-black/40 cursor-pointer"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* JOB APPLICATIONS PANEL */}
                {activeTab === "applications" && (
                  <div className="space-y-6">
                    {/* Stats Summary Panel */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <div className="p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm">
                        <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold block">Total Applications</span>
                        <span className="text-2xl font-bold text-white mt-1 block">{applications.length}</span>
                      </div>
                      <div className="p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm">
                        <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold block">New Candidates</span>
                        <span className="text-2xl font-bold text-[#ff6a00] mt-1 block">{newAppsCount}</span>
                      </div>
                      <div className="p-4 rounded-xl border border-white/[0.04] bg-[#16161a]/40 backdrop-blur-sm">
                        <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold block">Reviewed</span>
                        <span className="text-2xl font-bold text-green-500 mt-1 block">{reviewedAppsCount}</span>
                      </div>
                    </div>

                    {/* Filters & Actions */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
                      <div className="flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs text-slate-500 font-light">Filter status:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["All", "New", "Reviewed", "Archived"].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setAppFilter(cat)}
                            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              appFilter === cat
                                ? "bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] text-white shadow-sm"
                                : "bg-[#16161a] text-slate-400 hover:text-white border border-white/5"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Main Applications List */}
                    {appLoading ? (
                      <div className="py-24 text-center space-y-3">
                        <Loader2 className="w-6 h-6 animate-spin text-[#ff6a00] mx-auto" />
                        <p className="text-xs text-slate-500 font-light font-mono">Loading application columns...</p>
                      </div>
                    ) : filteredApplications.length === 0 ? (
                      <div className="py-20 rounded-xl border border-dashed border-white/10 text-center space-y-2 bg-[#16161a]/20">
                        <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                        <h4 className="text-sm font-semibold text-white">No applications found</h4>
                        <p className="text-xs text-slate-500 font-light">Applications will appear here once candidates submit the careers form.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredApplications.map((item, idx) => {
                          const itemDate = item.created_at ? new Date(item.created_at).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                          }) : "Unknown Date";

                          const status = item.status || "New";
                          const isExpanded = !!expandedApps[item.id || String(idx)];

                          return (
                            <motion.div
                              key={item.id || idx}
                              layout
                              className="p-5 sm:p-6 rounded-xl border border-white/[0.04] bg-[#16161a]/50 backdrop-blur-sm space-y-4 hover:border-white/[0.08] transition-all"
                            >
                              {/* Header Row */}
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="space-y-1.5 text-left">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-base font-bold text-white tracking-tight">
                                      {item.applicant_name}
                                    </h3>
                                    <span className="text-[10px] font-mono text-[#ff6a00] bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-2 py-0.5 rounded font-bold uppercase shrink-0">
                                      {item.job_title}
                                    </span>
                                    <span className={`text-[8px] font-mono tracking-wider px-2 py-0.5 rounded font-bold uppercase shrink-0 ${
                                      status === "New"
                                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse"
                                        : status === "Reviewed"
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                                    }`}>
                                      {status}
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 font-light">
                                    <a href={`mailto:${item.applicant_email}`} className="hover:text-[#ff6a00] transition-colors flex items-center gap-1 font-semibold">
                                      <Mail className="w-3.5 h-3.5" />
                                      {item.applicant_email}
                                    </a>
                                    <a href={`tel:${item.applicant_phone}`} className="hover:text-[#ff6a00] transition-colors flex items-center gap-1 font-semibold">
                                      <User className="w-3.5 h-3.5" />
                                      {item.applicant_phone}
                                    </a>
                                  </div>
                                </div>

                                <div className="text-[10px] font-mono text-slate-500 text-left sm:text-right shrink-0">
                                  {itemDate}
                                </div>
                              </div>

                              {/* Details Toggle Button */}
                              <div className="text-left pt-2 border-t border-white/[0.04]">
                                <button
                                  onClick={() => toggleExpandApp(item.id || String(idx))}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff6a00] hover:text-[#ff2b00] transition-colors cursor-pointer bg-transparent border-none outline-none focus:outline-none"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span>{isExpanded ? "Hide Cover Letter" : "Read Cover Letter"}</span>
                                </button>

                                {/* Collapsible Cover Letter Box */}
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                      animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="p-4 rounded-lg bg-black/40 border border-white/[0.04] text-slate-300 text-xs font-light leading-relaxed whitespace-pre-wrap">
                                        {item.cover_letter}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Footer Action Controls */}
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.04] mt-2">
                                <div className="flex flex-wrap items-center gap-3">
                                  <a
                                    href={item.resume_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded bg-[#16161a] border border-white/10 hover:border-[#ff6a00]/30 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all inline-flex items-center gap-1"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-[#ff6a00]" />
                                    <span>Open Resume</span>
                                  </a>
                                  {item.portfolio_url && (
                                    <a
                                      href={item.portfolio_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1.5 rounded bg-[#16161a] border border-white/10 hover:border-[#ff6a00]/30 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all inline-flex items-center gap-1"
                                    >
                                      <Sparkles className="w-3.5 h-3.5 text-[#ff6a00]" />
                                      <span>Open Portfolio</span>
                                    </a>
                                  )}
                                </div>

                                <div className="flex items-center justify-end gap-2 shrink-0">
                                  {status !== "Reviewed" && (
                                    <button
                                      onClick={() => updateApplicationStatus(item.id || String(idx), "Reviewed")}
                                      className="px-3 py-1.5 border border-emerald-500/20 hover:bg-emerald-500/[0.05] text-[10px] uppercase tracking-wider text-emerald-400 hover:text-emerald-300 rounded transition-all font-semibold font-mono bg-black/40 cursor-pointer flex items-center gap-1"
                                    >
                                      <CheckCircle className="w-3.5 h-3.5" />
                                      <span>Mark Reviewed</span>
                                    </button>
                                  )}
                                  {status !== "Archived" && (
                                    <button
                                      onClick={() => updateApplicationStatus(item.id || String(idx), "Archived")}
                                      className="px-3 py-1.5 border border-white/10 hover:bg-white/5 text-[10px] uppercase tracking-wider text-slate-300 hover:text-white rounded transition-all font-semibold font-mono bg-black/40 cursor-pointer"
                                    >
                                      Archive
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteApplication(item.id || String(idx))}
                                    className="p-1.5 border border-rose-500/20 hover:bg-rose-500/[0.05] text-rose-500 hover:text-rose-400 rounded transition-all cursor-pointer bg-transparent"
                                    aria-label="Delete application"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
