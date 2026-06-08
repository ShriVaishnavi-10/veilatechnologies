"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown, Globe, TrendingUp, Target, Smartphone, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MotionLink = motion.create(Link);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "About", href: "/company/about" },
    { name: "Careers", href: "/company/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const servicesList = [
    {
      name: "Website Development",
      slug: "website-development",
      description: "Modern, high-performance websites",
      icon: Globe,
    },
    {
      name: "Search Engine Optimization",
      slug: "search-engine-optimization",
      description: "Rank higher on search engines",
      icon: TrendingUp,
    },
    {
      name: "Digital Marketing & Ads",
      slug: "digital-marketing-ads",
      description: "High-ROI advertising campaigns",
      icon: Target,
    },
    {
      name: "Social Media Management",
      slug: "social-media-management",
      description: "Nurture your brand online",
      icon: Smartphone,
    },
    {
      name: "Content Writing & Editing",
      slug: "content-writing-editing",
      description: "Persuasive and converting copy",
      icon: PenTool,
    },
  ];

  const getHref = (href: string) => {
    if (isHome) return href;
    if (href.startsWith("#") && href !== "#") {
      return `/${href}`;
    }
    if (href === "#") {
      return "/";
    }
    return href;
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] py-2.5 border-b border-white/[0.08] shadow-md"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Desktop Nav Links (Left) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.name === "Services") {
                return (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase text-white/90 hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none focus:outline-none"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-72 rounded-xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-md z-50"
                        >
                          <div className="flex flex-col gap-2">
                            {servicesList.map((service) => {
                              const Icon = service.icon;
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                                >
                                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#ff6a00]/30 group-hover:bg-[#ff6a00]/10 transition-colors">
                                    <Icon className="w-4 h-4 text-[#ff6a00]" />
                                  </div>
                                  <div className="flex flex-col text-left">
                                    <span className="text-[11px] font-bold tracking-wide text-white group-hover:text-[#ff6a00] transition-colors uppercase">
                                      {service.name}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-light mt-0.5 line-clamp-1">
                                      {service.description}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <MotionLink
                  key={link.name}
                  href={getHref(link.href)}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs font-semibold tracking-wider uppercase text-white/90 hover:text-white transition-colors duration-200 hover:underline decoration-white decoration-2 underline-offset-4"
                >
                  {link.name}
                </MotionLink>
              );
            })}
          </nav>

          {/* Logo Badge (Right) */}
          <MotionLink
            href="/"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-white border border-white/10 rounded-lg px-3.5 py-1.5 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
          >
            <motion.div
              variants={{
                hover: { scale: 1.1 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <img
                src="/logo.png"
                alt="Veila Technologies Logo"
                style={{ display: "none" }}
                onLoad={(e) => {
                  e.currentTarget.style.display = "block";
                  const svgEl = e.currentTarget.nextElementSibling as HTMLElement;
                  if (svgEl) svgEl.style.display = "none";
                }}
                className="w-7 h-7 object-contain"
              />
              <svg viewBox="0 0 100 100" fill="none" className="w-7 h-7 overflow-visible">
                <defs>
                  <linearGradient id="navOrangeRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF8A00" />
                    <stop offset="100%" stopColor="#FF1F00" />
                  </linearGradient>
                </defs>
                {/* Outer Play Button Shape (Path 1) */}
                <path
                  d="M38 52 L38 32 C38 24, 43 20, 50 24 L78 43 C85 47, 85 53, 78 57 L54 71"
                  stroke="url(#navOrangeRed)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Outer Play Button Shape Overlap (Path 2) */}
                <path
                  d="M46 71 C41 71, 38 68, 38 61 L38 46"
                  stroke="url(#navOrangeRed)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Centered V Alphabet */}
                <path
                  d="M45 42 L53 62 L61 42"
                  stroke="url(#navOrangeRed)"
                  strokeWidth="9.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <span className="font-sans font-bold text-xs tracking-wide text-[#0B0B0C]">
              Veila <span className="text-[#ff6a00] font-light">Technologies</span>
            </span>
          </MotionLink>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white hover:bg-white/10 md:hidden border border-white/20 rounded-lg bg-black/20"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-[60px] z-40 md:hidden p-6 mx-4 rounded-xl border border-white/10 bg-gradient-to-br from-[#ff8a00] to-[#ff2b00] shadow-xl"
          >
            <div className="flex flex-col gap-6 text-left">
              {navLinks.map((link, idx) => {
                if (link.name === "Services") {
                  return (
                    <div key={link.name} className="flex flex-col gap-2">
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-white transition-colors w-full text-left bg-transparent border-none outline-none focus:outline-none"
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isMobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 flex flex-col gap-3.5 border-l border-white/10 mt-1"
                          >
                            {servicesList.map((service) => {
                              const Icon = service.icon;
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-2.5 text-[11px] font-medium text-white/80 hover:text-white uppercase tracking-wider"
                                >
                                  <Icon className="w-3.5 h-3.5 text-[#ff6a00]" />
                                  <span>{service.name}</span>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <MotionLink
                    key={link.name}
                    href={getHref(link.href)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-white transition-colors"
                  >
                    {link.name}
                  </MotionLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

