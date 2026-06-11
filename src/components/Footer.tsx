"use client";

import { ArrowUp } from "lucide-react";
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
        { name: "Company Updates", href: "/company/updates" },
        { name: "Client Estimator", href: "/operations/client-estimator" },
        { name: "Client Reviews", href: "/resources/client-reviews" },
        { name: "Contact Team", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative bg-bg-obsidian border-t border-white/[0.03] pt-16 sm:pt-20 pb-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#ff6a00]/[0.1] to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 pb-16 border-b border-white/[0.04]">
          
          <div className="col-span-1 md:col-span-2 space-y-6">
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
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/veilatechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#16161a]/60 border border-white/10 text-slate-400 hover:text-[#ff6a00] hover:border-[#ff6a00]/30 shadow-sm transition-all"
                aria-label="Instagram link"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@veilatechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#16161a]/60 border border-white/10 text-slate-400 hover:text-[#ff6a00] hover:border-[#ff6a00]/30 shadow-sm transition-all"
                aria-label="YouTube link"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

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
