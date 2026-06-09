"use client";

import React from "react";
import { Globe, TrendingUp, Target, Smartphone, PenTool, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);

interface ServiceItem {
  icon: React.ReactNode;
  category: string;
  title: string;
  slug: string;
  description: string;
  details: string[];
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      icon: <Globe className="w-5 h-5 text-[#ff6a00]" />,
      category: "Development",
      title: "Website Development",
      slug: "website-development",
      description: "We build modern, responsive, and high-performance websites tailored to your business needs, ensuring a stellar first impression.",
      details: [
        "Business & Brand Websites",
        "Portfolio & Creative Websites",
        "E-Commerce Online Stores",
        "Custom Web Solutions",
        "Both Static & Dynamic Websites"
      ]
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#ff6a00]" />,
      category: "SEO & Growth",
      title: "Search Engine Optimization",
      slug: "search-engine-optimization",
      description: "We optimize your website to rank higher on search engines, driving organic traffic and making it easy for customers to find you.",
      details: [
        "On-Page SEO Copywriting",
        "Off-Page Link Building",
        "Technical SEO Site Audits",
        "Local SEO & GMB Optimization"
      ]
    },
    {
      icon: <Target className="w-5 h-5 text-[#ff6a00]" />,
      category: "Advertising",
      title: "Digital Marketing & Ads",
      slug: "digital-marketing-ads",
      description: "We design and manage high-ROI advertising campaigns that generate leads, boost sales, and maximize marketing budgets.",
      details: [
        "Google Ads Search & Display",
        "Meta Ads (Facebook & Instagram)",
        "Focused Lead Generation Campaigns",
        "Ad Copy & Performance Optimization"
      ]
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#ff6a00]" />,
      category: "Management",
      title: "Social Media Management",
      slug: "social-media-management",
      description: "We build and nurture your brand online, creating consistent content and strategies that engage and grow your audience.",
      details: [
        "Complete Social Media Handling",
        "Content Planning & Scheduling",
        "Audience Engagement & Growth",
        "Custom Graphic Post Templates"
      ]
    },
    {
      icon: <PenTool className="w-5 h-5 text-[#ff6a00]" />,
      category: "Content",
      title: "Content Writing & Editing",
      slug: "content-writing-editing",
      description: "We craft persuasive and engaging copy that tells your story, builds trust, and converts visitors into loyal clients.",
      details: [
        "Professional Website Copywriting",
        "Informative Blog Articles",
        "High-Converting Marketing Copy",
        "Content Editing & Proofreading"
      ]
    }
  ];

  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const iconVariants = {
    hover: { scale: 1.15, rotate: 15, transition: { duration: 0.3 } }
  };

  const arrowVariants = {
    linkHover: { x: 4, transition: { duration: 0.2 } }
  };

  return (
    <section id="services" className="relative py-16 sm:py-28 bg-[#111113] border-y border-white/[0.03] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
            Our Capabilities
          </h2>
          <p className="mt-4 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Result-oriented digital services.
          </p>
          <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed max-w-2xl">
            We deliver tailor-made strategies and professional implementation. Partner with us to build a strong, credible, and growing online presence.
          </p>
        </motion.div>

        {/* Dynamic Grid Layout with viewport scroll trigger */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className="flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_-10px_rgba(255,106,0,0.1)] hover:border-[#ff6a00]/30 hover:bg-gradient-to-b hover:from-[#16161a] hover:to-[#1e1e24]/30 cursor-pointer"
              style={{ originY: 0 }}
            >
              <div>
                {/* Meta Category and Icon */}
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.04] mb-6">
                  <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold">
                    {service.category}
                  </span>
                  <motion.div
                    variants={iconVariants}
                    className="p-2 rounded-lg bg-[#ff6a00]/[0.04] border border-[#ff6a00]/[0.15]"
                  >
                    {service.icon}
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white font-sans tracking-tight mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-3 mb-8">
                  {service.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]/50 mt-1.5 shrink-0"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action link */}
              <MotionLink
                href={`/services/${service.slug}`}
                whileHover="linkHover"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff6a00] hover:text-[#ff2b00] transition-colors pt-4 border-t border-white/[0.04] w-full"
              >
                <span>Explore More</span>
                <motion.div variants={arrowVariants} className="flex items-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>
              </MotionLink>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
