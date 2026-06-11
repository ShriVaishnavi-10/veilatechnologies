"use client";

import React from "react";
import { Check } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, type Variants } from "framer-motion";
import Magnetic from "@/components/Magnetic";

interface PillarItem {
  title: string;
  description: string;
}

function PillarCard({ pillar, cardVariants, badgeVariants, idx }: {
  pillar: PillarItem;
  cardVariants: Variants;
  badgeVariants: Variants;
  idx: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Flat 2D depth parallax translations
  const contentX = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const contentY = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

  // Deeper 2D parallax for badge
  const deepX = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 });
  const deepY = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 });

  // Shine cursor tracking - reactive coordinates
  const shineX = useMotionValue(-1000);
  const shineY = useMotionValue(-1000);
  const shineBg = useTransform(
    [shineX, shineY],
    ([sx, sy]) => `radial-gradient(circle 100px at ${sx}px ${sy}px, rgba(255, 106, 0, 0.12), transparent 75%)`
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
    <Magnetic range={120} strength={0.12}>
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
          className="flex items-start gap-3 sm:gap-4 p-5 sm:p-6 rounded-xl border border-white/[0.04] bg-[#16161a]/60 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(255,106,0,0.05)] cursor-pointer relative overflow-hidden w-full"
        >
          {/* Shine Overlay */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: shineBg }}
          />

          {/* Check Circle Badge */}
          <motion.div
            variants={badgeVariants}
            style={{ x: deepX, y: deepY }}
            className="p-2.5 rounded-lg bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] text-white flex items-center justify-center shrink-0 shadow-sm"
          >
            <Check className="w-4 h-4" />
          </motion.div>
          
          <motion.div style={{ x: contentX, y: contentY }} className="space-y-1 text-left flex-grow">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-sans">
              {pillar.title}
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              {pillar.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Magnetic>
  );
}

export default function Metrics() {
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
  const pillars: PillarItem[] = [
    {
      title: "Customized Solutions",
      description: "Tailored strategies and web designs that match your unique brand identity and target audience."
    },
    {
      title: "Affordable Pricing",
      description: "Enterprise-grade digital solutions structured to fit the budget of small and growing businesses."
    },
    {
      title: "Dedicated Support",
      description: "Direct, personal, and responsive help from our tech and marketing teams whenever you need assistance."
    },
    {
      title: "Focus on Business Growth",
      description: "Every website, campaign, and written copy is strategically optimized to drive conversions and sales."
    },
    {
      title: "Quality-Driven Approach",
      description: "Clean code, reliable server hosting, compliant designs, and proofread content for a professional look."
    }
  ];

  // Mouse cursor spotlight tracking for the entire section
  const sectionSpotlightX = useMotionValue(0);
  const sectionSpotlightY = useMotionValue(0);
  const springSectionSpotlightX = useSpring(sectionSpotlightX, { stiffness: 85, damping: 24 });
  const springSectionSpotlightY = useSpring(sectionSpotlightY, { stiffness: 85, damping: 24 });

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    sectionSpotlightX.set(e.clientX - rect.left);
    sectionSpotlightY.set(e.clientY - rect.top);
  };

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

  const badgeVariants = {
    hover: { scale: 1.12, y: -2, transition: { type: "spring", stiffness: 300, damping: 15 } }
  };

  return (
    <section 
      id="why-choose" 
      onMouseMove={handleSectionMouseMove}
      className="relative py-16 sm:py-28 bg-[#0B0B0C] border-t border-white/[0.03] overflow-hidden"
    >
      {/* Moving background spotlight cursor halo */}
      <motion.div
        style={{
          x: useTransform(springSectionSpotlightX, (val) => val - 350),
          y: useTransform(springSectionSpotlightY, (val) => val - 350),
        }}
        className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#ff6a00]/[0.04] rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* High-end stationary pulsing digital dot-grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.15]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#ff6a00" className="opacity-40" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
        {/* Soft glowing pulsing tech points */}
        <motion.div
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-20 w-4 h-4 rounded-full bg-[#ff6a00]/50 blur-sm"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-10 w-6 h-6 rounded-full bg-[#ff6a00]/40 blur-md"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20 text-left"
        >
          <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
            Our Pillars
          </h2>
          <p className="mt-4 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Why choose Veila Technologies?
          </p>
          <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed max-w-2xl">
            We combine technical capability with business strategy. Here is why businesses choose us as their digital partner.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {pillars.map((pillar, idx) => (
            <PillarCard
              key={idx}
              pillar={pillar}
              cardVariants={cardVariants}
              badgeVariants={badgeVariants}
              idx={idx}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
