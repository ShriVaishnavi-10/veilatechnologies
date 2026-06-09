"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MotionLink = motion.create(Link);

export default function Calculator() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [pages, setPages] = useState<number>(5);
  const [seoMonths, setSeoMonths] = useState<number>(3);
  const [isEcommerce, setIsEcommerce] = useState<boolean>(false);
  const [socialPosts, setSocialPosts] = useState<number>(12);
  
  // Target values
  const [webTarget, setWebTarget] = useState<number>(0);
  const [marketingTarget, setMarketingTarget] = useState<number>(0);
  const [totalTarget, setTotalTarget] = useState<number>(0);

  // Animated display values
  const [displayWeb, setDisplayWeb] = useState<number>(0);
  const [displayMarketing, setDisplayMarketing] = useState<number>(0);
  const [displayTotal, setDisplayTotal] = useState<number>(0);

  useEffect(() => {
    const webCost = pages * 2000; // ₹2,000 per page
    const ecomCost = isEcommerce ? 10000 : 0; // ₹10,000 ecommerce setup
    const seoCost = seoMonths * 7000; // ₹7,000/month SEO
    const socialCost = socialPosts * 400; // ₹400/post content/graphics
    
    setWebTarget(webCost + ecomCost);
    setMarketingTarget(seoCost + socialCost);
    setTotalTarget(webCost + ecomCost + seoCost + socialCost);
  }, [pages, seoMonths, isEcommerce, socialPosts]);

  // Smooth counter animation hook simulation for Web Portion
  useEffect(() => {
    let start = displayWeb;
    const end = webTarget;
    if (start === end) return;

    const duration = 350; 
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad
      const current = Math.round(start + (end - start) * ease);
      setDisplayWeb(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [webTarget]);

  // Smooth counter animation hook simulation for Marketing Portion
  useEffect(() => {
    let start = displayMarketing;
    const end = marketingTarget;
    if (start === end) return;

    const duration = 350; 
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad
      const current = Math.round(start + (end - start) * ease);
      setDisplayMarketing(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [marketingTarget]);

  // Smooth counter animation hook simulation for Total Target
  useEffect(() => {
    let start = displayTotal;
    const end = totalTarget;
    if (start === end) return;

    const duration = 400; 
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad
      const current = Math.round(start + (end - start) * ease);
      setDisplayTotal(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [totalTarget]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="relative py-16 sm:py-28 bg-[#111113] border-t border-white/[0.03] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
            Interactive Planner
          </h2>
          <p className="mt-4 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Digital budget planner.
          </p>
          <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed max-w-2xl">
            Select your requirements to estimate your project budget. We offer customized, affordable pricing optimized to support business growth.
          </p>
        </motion.div>

        {/* Calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Sliders Pane */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-5 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a] flex flex-col justify-between shadow-sm space-y-8"
          >
            <div className="space-y-8">
              {/* Web pages Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-semibold uppercase tracking-wider">
                    Website Development Pages
                  </span>
                  <motion.span
                    key={pages}
                    initial={{ scale: 0.9, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[#ff6a00] font-mono font-bold text-sm"
                  >
                    {pages} pages
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="w-full h-1 bg-white/[0.08] rounded appearance-none cursor-pointer accent-[#ff6a00] transition-all"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 Page</span>
                  <span>10 Pages</span>
                  <span>20 Pages</span>
                </div>
              </div>

              {/* SEO Months Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-semibold uppercase tracking-wider">
                    Search Engine Optimization
                  </span>
                  <motion.span
                    key={seoMonths}
                    initial={{ scale: 0.9, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[#ff6a00] font-mono font-bold text-sm"
                  >
                    {seoMonths} months
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="1"
                  value={seoMonths}
                  onChange={(e) => setSeoMonths(Number(e.target.value))}
                  className="w-full h-1 bg-white/[0.08] rounded appearance-none cursor-pointer accent-[#ff6a00] transition-all"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>None</span>
                  <span>6 Months</span>
                  <span>12 Months</span>
                </div>
              </div>

              {/* Social posts Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-semibold uppercase tracking-wider">
                    Social Posts & Handling
                  </span>
                  <motion.span
                    key={socialPosts}
                    initial={{ scale: 0.9, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[#ff6a00] font-mono font-bold text-sm"
                  >
                    {socialPosts} posts / mo
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="2"
                  value={socialPosts}
                  onChange={(e) => setSocialPosts(Number(e.target.value))}
                  className="w-full h-1 bg-white/[0.08] rounded appearance-none cursor-pointer accent-[#ff6a00] transition-all"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>None</span>
                  <span>15 posts</span>
                  <span>30 posts</span>
                </div>
              </div>

              {/* E-Commerce checkbox toggle */}
              <motion.div
                whileHover={{ scale: 1.01, borderColor: "rgba(255,106,0,0.2)" }}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#0B0B0C]/40 border border-white/[0.04] transition-all duration-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="ecommerce"
                  checked={isEcommerce}
                  onChange={(e) => setIsEcommerce(e.target.checked)}
                  className="w-4 h-4 text-[#ff6a00] border-slate-700 rounded bg-[#16161a] focus:ring-[#ff6a00] accent-[#ff6a00] cursor-pointer"
                />
                <label htmlFor="ecommerce" className="text-xs text-slate-300 font-semibold cursor-pointer select-none">
                  Enable E-Commerce Functionality (+ online store payments, shopping cart)
                </label>
              </motion.div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-start gap-2.5 text-[10px] text-slate-500 font-light leading-relaxed">
              <Sparkles className="w-4 h-4 text-[#ff6a00] shrink-0" />
              <span>
                Calculations are base estimates. Final pricing is customized according to your exact requirements and integrations.
              </span>
            </div>
          </motion.div>

          {/* Results Pane */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-5 sm:p-8 rounded-xl border border-[#ff6a00]/[0.1] bg-gradient-to-br from-[#ff8a00] to-[#ff2b00] flex flex-col justify-between shadow-md text-white"
          >
            <div className="space-y-6">
              <div>
                <span className="text-[9px] font-mono tracking-wider text-orange-100 uppercase block mb-1">
                  ESTIMATED INVESTMENT
                </span>
                {/* Smooth rolling numbers */}
                <motion.div
                  key={displayTotal}
                  initial={{ scale: 0.98, opacity: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl sm:text-5xl font-bold text-white tracking-tight font-sans"
                >
                  {formatCurrency(displayTotal)}
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/[0.15]">
                <div>
                  <span className="text-[8px] font-mono tracking-wider text-orange-150 uppercase block">
                    Website Portion
                  </span>
                  <span className="text-sm font-bold text-white font-sans mt-0.5 block">
                    {formatCurrency(displayWeb)}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-mono tracking-wider text-orange-150 uppercase block">
                    SEO & Social Portion
                  </span>
                  <span className="text-sm font-bold text-white font-sans mt-0.5 block">
                    {formatCurrency(displayMarketing)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <MotionLink
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded bg-white text-[#ff2b00] hover:bg-orange-50 text-xs font-semibold text-center transition-all block"
              >
                Discuss Project Budget
              </MotionLink>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
