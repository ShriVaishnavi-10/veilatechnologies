"use client";

import React from "react";
import { MessageSquare, ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      title: "Services",
      links: [
        { name: "Website Development", href: "/services/website-development" },
        { name: "SEO Optimization", href: "/services/search-engine-optimization" },
        { name: "Digital Marketing & Ads", href: "/services/digital-marketing-ads" },
        { name: "Social Media Handling", href: "/services/social-media-management" },
        { name: "Content Writing & Editing", href: "/services/content-writing-editing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Veila", href: "/company/about" },
        { name: "Careers (Hiring)", href: "/company/careers" },
        { name: "Client Estimator", href: "/operations/client-estimator" },
        { name: "Client Reviews", href: "/resources/client-reviews" },
        { name: "Contact Team", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative bg-bg-obsidian border-t border-white/[0.03] pt-16 sm:pt-20 pb-10 overflow-hidden">
      {/* Decorative subtle ambient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#ff6a00]/[0.1] to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pb-16 border-b border-white/[0.04]">
          
          {/* Logo / Brand Info */}
          <div className="col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Veila Technologies Logo"
                style={{ display: "none" }}
                onLoad={(e) => {
                  e.currentTarget.style.display = "block";
                }}
                className="w-8 h-8 object-contain"
              />
              <div className="flex items-baseline gap-2">
                <span className="font-serif italic text-2xl tracking-wide text-white">
                  Veila
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ff6a00] font-semibold">
                  Technologies
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xs">
              Established in 2026 and based in Virudhunagar, Tamilnadu. Dedicated to helping businesses build, grow, and strengthen their online presence through innovative and result-oriented digital solutions.
            </p>
            <div className="space-y-2 text-xs text-slate-500 font-light pt-1">
              <p>Email: <a href="mailto:veilatechnologies@gmail.com" className="hover:text-[#ff6a00] transition-colors font-semibold">veilatechnologies@gmail.com</a></p>
              <p>Phone: <a href="tel:+918072196400" className="hover:text-[#ff6a00] transition-colors font-semibold">+91 8072196400</a></p>
              <p>Location: Virudhunagar, Tamilnadu</p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-lg bg-[#16161a]/60 border border-white/10 text-slate-400 hover:text-[#ff6a00] hover:border-[#ff6a00]/30 shadow-sm transition-all" aria-label="Github link">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#16161a]/60 border border-white/10 text-slate-400 hover:text-[#ff6a00] hover:border-[#ff6a00]/30 shadow-sm transition-all" aria-label="Twitter link">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#16161a]/60 border border-white/10 text-slate-400 hover:text-[#ff6a00] hover:border-[#ff6a00]/30 shadow-sm transition-all" aria-label="Discord link">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[#16161a]/60 border border-white/10 text-slate-400 hover:text-[#ff6a00] hover:border-[#ff6a00]/30 shadow-sm transition-all" aria-label="Linkedin link">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {sections.map((section, idx) => (
            <div key={idx} className="col-span-1 space-y-4">
              <h5 className="font-sans font-bold text-xs text-white tracking-wide uppercase">
                {section.title}
              </h5>
              <ul className="space-y-2.5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-500 hover:text-[#ff6a00] transition-colors duration-200 font-semibold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-6">
          <div className="text-xs text-slate-500 font-light">
            © {currentYear === 2026 ? "2026" : "2026-" + currentYear} Veila Technologies. All rights reserved. Creative digital solutions that grow your online presence.
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500 font-light">
            <a href="#" className="hover:text-[#ff6a00] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#ff6a00] transition-colors">Terms of Operations</a>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-[#16161a]/60 border border-white/10 hover:border-[#ff6a00]/30 text-slate-400 hover:text-[#ff6a00] shadow-sm transition-all font-semibold uppercase tracking-wider text-[10px]"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
