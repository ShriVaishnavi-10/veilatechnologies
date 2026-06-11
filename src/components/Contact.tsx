"use client";

import React, { useState } from "react";
import { Mail, Phone, Globe, MapPin, Loader2, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { supabase, isSupabaseConfigured, submitContactFormMock } from "@/lib/supabase";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 800], [0, 60]);

  // Mouse spotlight tracking
  const sectionX = useMotionValue(0);
  const sectionY = useMotionValue(0);
  const springSectionX = useSpring(sectionX, { stiffness: 85, damping: 24 });
  const springSectionY = useSpring(sectionY, { stiffness: 85, damping: 24 });

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    sectionX.set(e.clientX - rect.left);
    sectionY.set(e.clientY - rect.top);
  };

  const detailsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const detailItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const formContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -20, scaleX: 0.1 },
    visible: {
      opacity: 1,
      x: 0,
      scaleX: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  // Contact Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("Website Development");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const payload = { name, email, message, service };

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from("contact_inquiries").insert([payload]);
        if (error) throw error;
      } else {
        const res = await submitContactFormMock({ name, email, message });
        if (res.error) throw new Error("Sandbox submission failed");
        
        // Save to localStorage for local testing
        if (typeof window !== "undefined") {
          const existing = localStorage.getItem("veila_contact_inquiries");
          const inquiries = existing ? JSON.parse(existing) : [];
          const newInquiry = {
            id: Math.random().toString(36).substring(2, 9),
            created_at: new Date().toISOString(),
            status: "New",
            ...payload
          };
          localStorage.setItem("veila_contact_inquiries", JSON.stringify([newInquiry, ...inquiries]));
        }
      }
      setSubmitSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      onMouseMove={handleSectionMouseMove}
      id="contact" 
      className="relative py-16 sm:py-28 bg-[#0B0B0C] border-t border-white/[0.03] overflow-hidden"
    >
      {/* Background scrolling glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute -top-12 -right-12 w-[350px] h-[350px] bg-[#ff6a00] opacity-[0.03] rounded-full blur-[100px] pointer-events-none"
      />

      {/* Moving cursor spotlight halo background light */}
      <motion.div
        style={{
          x: useTransform(springSectionX, (val) => val - 350),
          y: useTransform(springSectionY, (val) => val - 350),
        }}
        className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#ff6a00]/[0.03] rounded-full blur-[120px] pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
                Contact & Ingress
              </h2>
              <p className="mt-4 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
                Initiate a discovery consult.
              </p>
              <p className="mt-4 text-xs text-slate-400 font-light leading-relaxed max-w-sm">
                Discuss custom website development, SEO optimization, social campaigns, or content planning with our team.
              </p>
            </div>

            <motion.div
              variants={detailsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="space-y-6 pt-4 border-t border-white/[0.04] max-w-sm"
            >
              <Magnetic range={60} strength={0.35}>
                <motion.div
                  variants={detailItemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 cursor-pointer group"
                >
                  <Mail className="w-4 h-4 text-[#ff6a00]" />
                  <a href="mailto:veilatechnologies@gmail.com" className="text-xs text-slate-300 group-hover:text-[#ff6a00] transition-colors font-semibold">
                    veilatechnologies@gmail.com
                  </a>
                </motion.div>
              </Magnetic>
              
              <Magnetic range={60} strength={0.35}>
                <motion.div
                  variants={detailItemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 cursor-pointer group"
                >
                  <Phone className="w-4 h-4 text-[#ff6a00]" />
                  <a href="tel:+918072196400" className="text-xs text-slate-300 group-hover:text-[#ff6a00] transition-colors font-semibold">
                    +91 8072196400
                  </a>
                </motion.div>
              </Magnetic>

              <Magnetic range={60} strength={0.35}>
                <motion.div
                  variants={detailItemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#ff6a00]" />
                  <span className="text-xs text-slate-300 group-hover:text-[#ff6a00] transition-colors font-semibold">
                    Virudhunagar, Tamilnadu
                  </span>
                </motion.div>
              </Magnetic>

              <motion.div
                variants={detailItemVariants}
                className="flex items-center gap-4"
              >
                <Globe className="w-4 h-4 text-[#ff6a00]" />
                <span className="text-xs text-slate-300 font-medium">
                  Remote Services Available Worldwide
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Clean Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-5 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a] shadow-md relative overflow-hidden">
              {submitSuccess ? (
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-12 text-center space-y-4"
                >
                  <h4 className="font-serif text-2xl text-white">Inquiry Received</h4>
                  <p className="text-xs text-slate-400 font-light max-w-md mx-auto leading-relaxed">
                    A solutions expert will review your requirements and get in touch with you shortly.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSubmitSuccess(false)}
                    className="px-4 py-2 border border-white/10 hover:border-[#ff6a00]/30 text-[10px] uppercase tracking-wider text-slate-300 hover:text-[#ff6a00] rounded transition-colors font-semibold bg-[#0B0B0C]/40 cursor-pointer"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form 
                  variants={formContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  onSubmit={handleContactSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <motion.div variants={formItemVariants} style={{ originX: 0 }} className="space-y-2">
                      <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                        Full Name
                      </label>
                      <motion.input
                        whileHover={{ borderColor: "rgba(255,106,0,0.25)" }}
                        type="text"
                        required
                        placeholder="Jean Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20 focus:bg-[#1e1e24]/60 transition-all duration-300"
                      />
                    </motion.div>
                    {/* Email */}
                    <motion.div variants={formItemVariants} style={{ originX: 0 }} className="space-y-2">
                      <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                        Work Email
                      </label>
                      <motion.input
                        whileHover={{ borderColor: "rgba(255,106,0,0.25)" }}
                        type="email"
                        required
                        placeholder="doe@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20 focus:bg-[#1e1e24]/60 transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  {/* Category Selection */}
                  <motion.div variants={formItemVariants} style={{ originX: 0 }} className="space-y-2">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                      Inquiry Subject Area
                    </label>
                    <motion.select
                      whileHover={{ borderColor: "rgba(255,106,0,0.25)" }}
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-slate-300 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20 focus:bg-[#1e1e24]/60 transition-all duration-300 cursor-pointer"
                    >
                      <option value="Website Development" className="bg-[#16161a] text-white">Website Development</option>
                      <option value="SEO Optimization" className="bg-[#16161a] text-white">Search Engine Optimization (SEO)</option>
                      <option value="Digital Marketing" className="bg-[#16161a] text-white">Digital Marketing & Ads</option>
                      <option value="Social Media" className="bg-[#16161a] text-white">Social Media Management</option>
                      <option value="Content Writing" className="bg-[#16161a] text-white">Content Writing & Editing</option>
                    </motion.select>
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={formItemVariants} style={{ originX: 0 }} className="space-y-2">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                      Practice Requirements
                    </label>
                    <motion.textarea
                      whileHover={{ borderColor: "rgba(255,106,0,0.25)" }}
                      required
                      rows={4}
                      placeholder="Outline your website development, SEO, digital marketing, or branding requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20 focus:bg-[#1e1e24]/60 transition-all duration-300 resize-none"
                    />
                  </motion.div>

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] text-rose-500 font-mono p-3 rounded border border-rose-500/20 bg-rose-500/[0.02]"
                    >
                      {submitError}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div variants={formItemVariants} style={{ originX: 0 }}>
                    <Magnetic range={80} strength={0.25}>
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff6a00] hover:to-[#ff1200] disabled:opacity-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm text-white cursor-pointer border-none"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                            Transmitting consult parameters...
                          </>
                        ) : (
                          <>
                            Transmit Consultation Data
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                          </>
                        )}
                      </motion.button>
                    </Magnetic>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
