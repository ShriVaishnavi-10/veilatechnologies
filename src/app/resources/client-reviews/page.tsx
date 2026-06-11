"use client";

import React from "react";
import { MessageSquare, Star } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const clientReviewsList = [
  {
    client: "Ramya",
    company: "Veloce Timepieces",
    rating: 5,
    review: "Veila Technologies completely restructured our e-commerce flow. The new Next.js storefront loads instantly, and we saw a 32% increase in sales conversion within weeks. Their attention to animation detail is incredible.",
    service: "Website Development"
  },
  {
    client: "Priya",
    company: "EcoSphere Retail",
    rating: 5,
    review: "The SEO campaign exceeded all expectations. We grew organic search traffic by 250% in just 6 months. We now rank page #1 for dozens of high-value search keywords. Strongly recommend Veila for SEO audits and backlink strategy.",
    service: "Search Engine Optimization"
  },
  {
    client: "Gokulakrishnan",
    company: "Prime Capital",
    rating: 5,
    review: "Our B2B LinkedIn campaign yielded over 450 qualified investor leads. Veila created extremely precise landing pages that achieved a 4.2x Return on Ad Spend. Responsive, technical, and data-driven.",
    service: "Digital Marketing & Ads"
  },
  {
    client: "Sunmathi",
    company: "Cafe Bloom Group",
    rating: 5,
    review: "Managing social handles is a full-time job. Veila took over our visual planning, graphics templates, and reels strategy. Our Instagram grew from 2k to 18k followers organically, driving massive foot traffic to our locations.",
    service: "Social Media Management"
  },
  {
    client: "Barath",
    company: "Aura Living",
    rating: 5,
    review: "Veila built a robust search portal with booking systems and Stripe payments. The platform has 99.9% uptime and easily supports 5,000+ active listings. The code is exceptionally clean.",
    service: "Website Development"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 16,
    },
  },
};

export default function ClientReviewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0C] text-slate-100 overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6a00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#ff2b00]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20">
                  <span className="text-[10px] font-mono tracking-widest text-[#ff6a00] uppercase font-bold">
                    Testimonials
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight">
                  Client Reviews
                </h1>
                <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
                  Hear directly from the business owners, marketing managers, and technology leaders who partner with Veila Technologies to scale their online presence.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 flex items-center justify-center relative w-full overflow-visible"
            >
              <div className="absolute w-[80%] h-[80%] bg-gradient-to-br from-[#ff8a00]/20 to-[#ff2b00]/20 rounded-full blur-[80px] opacity-40 z-0 pointer-events-none" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-[4/3] rounded-2xl border border-white/[0.08] bg-[#16161a]/60 p-2 shadow-2xl overflow-hidden z-10"
              >
                <img
                  src="/resource_client_reviews.png"
                  alt="Client Reviews"
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="border-t border-white/[0.04] pt-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
            >
              {clientReviewsList.map((review, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ y: -5, borderColor: "rgba(255, 106, 0, 0.35)", backgroundColor: "rgba(22, 22, 26, 0.98)" }}
                  className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-0.5 text-[#ff6a00]">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-slate-300 text-xs italic font-light leading-relaxed">
                      &ldquo;{review.review}&rdquo;
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
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
