"use client";

import React from "react";
import { Globe, TrendingUp, Target, Smartphone, PenTool, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, type Variants } from "framer-motion";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

const MotionLink = motion.create(Link);

interface ServiceItem {
  icon: React.ReactNode;
  category: string;
  title: string;
  slug: string;
  description: string;
  details: string[];
}

function ServiceCard({ service, cardVariants, iconVariants, arrowVariants, idx }: {
  service: ServiceItem;
  cardVariants: Variants;
  iconVariants: Variants;
  arrowVariants: Variants;
  idx: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Flat 2D depth parallax translations
  const contentX = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const contentY = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

  // Deeper flat 2D parallax for icon
  const deepX = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 });
  const deepY = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 });

  // Shine cursor tracking - reactive coordinates
  const shineX = useMotionValue(-1000);
  const shineY = useMotionValue(-1000);
  const shineBg = useTransform(
    [shineX, shineY],
    ([sx, sy]) => `radial-gradient(circle 130px at ${sx}px ${sy}px, rgba(255, 106, 0, 0.12), transparent 75%)`
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    mx.set((mouseX - width / 2) / width);
    my.set((mouseY - height / 2) / height);

    shineX.set(mouseX);
    shineY.set(mouseY);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    shineX.set(-1000);
    shineY.set(-1000);
  };

  return (
    <Magnetic range={150} strength={0.12}>
      <div className="flex h-full">
        <motion.div
          variants={cardVariants}
          custom={idx}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ originX: 0, zIndex: 10 - idx }}
          whileHover={{ 
            y: -8, 
            borderColor: "rgba(255, 106, 0, 0.3)", 
            backgroundColor: "rgba(22, 22, 26, 0.98)"
          }}
          className="flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_35px_rgba(255,106,0,0.06)] cursor-pointer relative overflow-hidden w-full"
        >
          {/* Shine Overlay */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: shineBg }}
          />

          <motion.div style={{ x: contentX, y: contentY }} className="w-full flex-grow flex flex-col justify-between">
            <div className="w-full">
              {/* Meta Category and Icon */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.04] mb-6">
                <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase font-semibold">
                  {service.category}
                </span>
                <motion.div
                  variants={iconVariants}
                  style={{ x: deepX, y: deepY }}
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
            <div className="mt-auto w-full">
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Magnetic>
  );
}

export default function Services() {
  const [cols, setCols] = React.useState(1);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCols(3);
      } else if (window.innerWidth >= 768) {
        setCols(2);
      } else {
        setCols(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
    hidden: (idx: number) => {
      const col = idx % cols;
      return {
        x: `${-col * 110}%`,
        y: 0,
        opacity: 0,
        scaleX: 0.05,
        filter: "blur(8px)"
      };
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scaleX: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 16,
        mass: 1.0
      }
    }
  };

  const iconVariants = {
    hover: { scale: 1.15, y: -2, transition: { type: "spring", stiffness: 300, damping: 10 } }
  };

  const arrowVariants = {
    linkHover: { x: 4, transition: { duration: 0.2 } }
  };

  const titleWords = "Result-oriented digital services.".split(" ");

  return (
    <section id="services" className="relative py-16 sm:py-28 bg-[#111113] border-y border-white/[0.03] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header section */}
        <div className="max-w-3xl mb-20 text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold"
          >
            Our Capabilities
          </motion.h2>
          
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white flex flex-wrap gap-x-[0.2em]">
            {titleWords.map((word, idx) => (
              <span key={idx} className="inline-block py-1">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: idx * 0.05
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm text-slate-400 font-light leading-relaxed max-w-2xl"
          >
            We deliver tailor-made strategies and professional implementation. Partner with us to build a strong, credible, and growing online presence.
          </motion.p>
        </div>

        {/* Dynamic Grid Layout with viewport scroll trigger */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              service={service}
              cardVariants={cardVariants}
              iconVariants={iconVariants}
              arrowVariants={arrowVariants}
              idx={idx}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
