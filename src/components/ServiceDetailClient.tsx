"use client";

import React from "react";
import { Globe, TrendingUp, Target, Smartphone, PenTool, ArrowRight, CheckCircle2, Award, Zap, Code } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, type Variants } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ServiceDetail } from "@/lib/servicesData";
import Magnetic from "@/components/Magnetic";

const iconMap = {
  Globe: Globe,
  TrendingUp: TrendingUp,
  Target: Target,
  Smartphone: Smartphone,
  PenTool: PenTool,
};

interface ServiceDetailClientProps {
  service: ServiceDetail;
}

interface ProjectItem {
  client: string;
  title: string;
  description: string;
  tags: string[];
  results: string;
}

function ProjectCard({ project, itemVariants, idx }: {
  project: ProjectItem;
  itemVariants: Variants;
  idx: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const contentX = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const contentY = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

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
    <Magnetic range={150} strength={0.12}>
      <div className="flex h-full">
        <motion.div
          variants={itemVariants}
          custom={idx}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ originX: 0, zIndex: 10 - idx }}
          whileHover={{ 
            y: -8, 
            borderColor: "rgba(255, 106, 0, 0.3)", 
            backgroundColor: "rgba(22, 22, 26, 0.98)" 
          }}
          className="flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a]/50 hover:shadow-[0_10px_35px_rgba(255,106,0,0.05)] cursor-pointer relative overflow-hidden w-full"
        >
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ background: shineBg }}
          />

          <motion.div style={{ x: contentX, y: contentY }} className="w-full flex-grow flex flex-col justify-between">
            <div className="w-full text-left">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
                  Client: {project.client}
                </span>
                <Award className="w-4 h-4 text-[#ff6a00]/60" />
              </div>

              <h3 className="text-lg font-semibold text-white tracking-tight mt-5">
                {project.title}
              </h3>

              <p className="text-slate-400 text-xs font-light leading-relaxed mt-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2 mt-4">
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

            <div className="mt-8 pt-5 border-t border-white/[0.04] flex items-start gap-2.5 bg-gradient-to-r from-[#ff6a00]/[0.02] to-transparent p-2.5 rounded-lg border border-[#ff6a00]/[0.05] w-full">
              <Zap className="w-4 h-4 text-[#ff6a00] shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-left">
                <span className="text-[9px] font-mono tracking-wider text-[#ff6a00] uppercase font-bold block">
                  Result Impact
                </span>
                <span className="text-xs text-white font-medium">
                  {project.results}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Magnetic>
  );
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [cols, setCols] = React.useState(1);

  const heroX = useMotionValue(0);
  const heroY = useMotionValue(0);
  const springHeroX = useSpring(heroX, { stiffness: 150, damping: 20 });
  const springHeroY = useSpring(heroY, { stiffness: 150, damping: 20 });

  const backingCircleX = useTransform(springHeroX, [-1, 1], [-15, 15]);
  const backingCircleY = useTransform(springHeroY, [-1, 1], [-15, 15]);
  const imageX = useTransform(springHeroX, [-1, 1], [-8, 8]);
  const imageY = useTransform(springHeroY, [-1, 1], [-8, 8]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    heroX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    heroY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleHeroMouseLeave = () => {
    heroX.set(0);
    heroY.set(0);
  };

  const ctaX = useMotionValue(0);
  const ctaY = useMotionValue(0);
  const springCtaX = useSpring(ctaX, { stiffness: 100, damping: 20 });
  const springCtaY = useSpring(ctaY, { stiffness: 100, damping: 20 });

  const ctaGlowBg = useTransform(
    [springCtaX, springCtaY],
    ([x, y]) => `radial-gradient(circle 180px at ${x}px ${y}px, rgba(255, 106, 0, 0.12), transparent 70%)`
  );

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    ctaX.set(e.clientX - rect.left);
    ctaY.set(e.clientY - rect.top);
  };

  const handleCtaMouseLeave = () => {
    ctaX.set(-1000);
    ctaY.set(-1000);
  };

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
  const IconComponent = iconMap[service.iconName] || Globe;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: (idx: number) => {
      const col = idx % cols;
      return {
        x: `${-col * 110}%`,
        y: 0,
        opacity: 0,
        scaleX: 0.05,
        filter: "none"
      };
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scaleX: 1,
      filter: "none",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 16,
        mass: 1.0
      }
    }
  };

  const listContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div key={service.slug} className="flex flex-col min-h-screen bg-[#0B0B0C] text-slate-100 overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6a00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#ff2b00]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          <div 
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20"
                >
                  <span className="text-[10px] font-mono tracking-widest text-[#ff6a00] uppercase font-bold">
                    {service.category}
                  </span>
                </motion.div>
                <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight flex flex-wrap gap-x-[0.2em] overflow-hidden">
                  {service.title.split(" ").map((word, idx) => (
                    <span key={idx} className="inline-block overflow-hidden py-1">
                      <motion.span
                        inherit={false}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
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
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl"
                >
                  {service.description}
                </motion.p>
              </div>

              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-[#ff6a00]" />
                  <span>Core Capabilities</span>
                </h3>
                
                <motion.div 
                  variants={listContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                >
                  {service.details.map((detail, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={listItemVariants}
                      whileHover={{ x: 6, color: "#ff6a00" }}
                      className="flex items-start gap-2.5 text-xs text-slate-300 font-light cursor-pointer transition-colors duration-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ff6a00] mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 flex items-center justify-center relative w-full overflow-visible"
            >
              <motion.div 
                style={{ x: backingCircleX, y: backingCircleY }}
                className="absolute w-[80%] h-[80%] bg-gradient-to-br from-[#ff8a00]/20 to-[#ff2b00]/20 rounded-full blur-[80px] opacity-40 z-0 pointer-events-none" 
              />
              
              <motion.div 
                style={{ x: imageX, y: imageY }}
                className="w-full relative z-10"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full aspect-[4/3] rounded-2xl border border-white/[0.08] bg-[#16161a]/60 p-2 shadow-2xl overflow-hidden"
                >
                  <img
                    src={service.imagePath}
                    alt={service.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <div className="border-t border-white/[0.04] pt-16 sm:pt-24 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-12 sm:mb-16"
            >
              <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
                Case Studies
              </h2>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white flex flex-wrap gap-x-[0.2em]">
                {"Projects built using this service.".split(" ").map((word, idx) => (
                  <span key={idx} className="inline-block py-1">
                    <motion.span
                      inherit={false}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                We believe in outcomes. Explore some of our successful customer engagements and the real, measurable business impact we achieved.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            >
              {service.projects.map((project, idx) => (
                <ProjectCard
                  key={idx}
                  project={project}
                  itemVariants={itemVariants}
                  idx={idx}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            whileHover={{ scale: 1.01, borderColor: "rgba(255, 106, 0, 0.25)", boxShadow: "0 20px 40px -15px rgba(255, 106, 0, 0.15)" }}
            className="p-8 sm:p-12 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#16161a] to-[#1e1e24]/20 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto transition-all duration-300"
          >
            <motion.div 
              style={{ background: ctaGlowBg }}
              className="absolute inset-0 pointer-events-none z-0" 
            />

            <div className="relative z-10 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
                Ready to start your project?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto leading-relaxed mb-4">
                Let&apos;s craft the perfect solution for your business. Use our dynamic budget estimator planner to plan your investment, or speak directly with our team today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Magnetic range={60} strength={0.35}>
                  <Link
                    href="/#calculator"
                    className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-white text-[#0B0B0C] hover:bg-slate-100 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Price Planner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Magnetic>
                
                <Magnetic range={60} strength={0.35}>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider border border-white/20 hover:border-[#ff6a00]/30 hover:bg-white/[0.02] text-white transition-all inline-flex items-center justify-center cursor-pointer"
                  >
                    Get In Touch
                  </Link>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
