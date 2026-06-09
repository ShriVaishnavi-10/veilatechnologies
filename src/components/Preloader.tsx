"use client";

import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      const played = sessionStorage.getItem("veila_preloader_played") === "true";
      return !played;
    }
    return true;
  });

  useEffect(() => {
    if (!loading) return;

    setMounted(true);
    // Lock scrolling on mount
    document.body.style.overflow = "hidden";

    // Mark as loaded immediately to prevent repeat preloads if user navigates during curtain animation
    if (typeof window !== "undefined") {
      (window as any).veila_preloader_loaded = true;
      sessionStorage.setItem("veila_preloader_played", "true");
    }

    const duration = 1500; // Total loading duration in ms
    const startTime = performance.now();

    let frameId: number;
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;

    const tick = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / duration, 1);
      
      // Use cubic easeOut for smooth decelerating counter
      const ease = 1 - Math.pow(1 - pct, 3);
      const current = Math.floor(ease * 100);
      
      setProgress(current);

      if (pct < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        
        // Step 1: Wait 350ms, then fade out the center content
        t1 = setTimeout(() => {
          setShowContent(false);
          
          // Step 2: After content fades out (300ms), start curtain slide out
          t2 = setTimeout(() => {
            setIsFinished(true);
            document.body.style.overflow = ""; // Unlock scroll immediately when curtains start moving
            
            // Step 3: Wait 800ms (curtain animation length), then fully unmount component
            t3 = setTimeout(() => {
              setLoading(false);
            }, 800);
          }, 300);
        }, 350);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, [loading]);

  // Determine stage text based on progress
  const getStageText = (prog: number) => {
    if (prog < 25) return "Connecting to Nodes...";
    if (prog < 55) return "Compiling Digital Assets...";
    if (prog < 80) return "Optimizing Performance...";
    if (prog < 100) return "Finalizing Growth Strategies...";
    return "Welcome to Veila";
  };

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden">
      {/* Top Curtain Panel (Obsidian dark background) */}
      <div
        className="absolute top-0 left-0 right-0 h-[50.5vh] bg-[#0B0B0C] bg-grid-preloader border-b border-white/[0.03] pointer-events-auto"
        style={{
          transform: isFinished ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)"
        }}
      />

      {/* Bottom Curtain Panel (Obsidian dark background) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50.5vh] bg-[#0B0B0C] bg-grid-preloader border-t border-white/[0.03] pointer-events-auto"
        style={{
          transform: isFinished ? "translateY(100%)" : "translateY(0)",
          transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)"
        }}
      />

      {/* Center Graphic and Content Wrapper */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-auto z-10"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "scale(1)" : "scale(0.96)",
          transition: "opacity 0.3s ease-out, transform 0.3s ease-out"
        }}
      >
        {/* SVG Vector Logo Animation (Pure CSS self-contained animations) */}
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          <svg viewBox="0 0 100 100" fill="none" className="w-40 h-40 overflow-visible">
            <defs>
              <linearGradient id="loaderOrangeRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8A00" />
                <stop offset="100%" stopColor="#FF1F00" />
              </linearGradient>
            </defs>
            <style dangerouslySetInnerHTML={{ __html: `
              .loader-path-1 {
                stroke-dasharray: 220;
                stroke-dashoffset: 220;
                animation: drawPath1 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }
              .loader-v {
                stroke-dasharray: 40;
                stroke-dashoffset: 40;
                animation: drawV 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.9s forwards;
              }
              @keyframes drawPath1 {
                to { stroke-dashoffset: 0; }
              }
              @keyframes drawV {
                to { stroke-dashoffset: 0; }
              }
            `}} />
            {/* Glowing background blur */}
            <circle cx="50" cy="50" r="25" fill="#FF5E00" className="opacity-10" style={{ filter: "blur(16px)" }} />
            
            {/* Outer Play Button Loop and Right Leg of V (Path 1) */}
            <path
              d="M 42 76 C 34 76, 30 73, 30 66 L 30 34 C 30 27, 34 22, 42 22 L 74 39 C 80 42, 80 58, 74 61 L 57 70 C 51 73, 47 71, 48 63 L 56 44"
              stroke="url(#loaderOrangeRed)"
              strokeWidth="8.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="loader-path-1"
            />
            
            {/* Left Leg of V (Path 2) */}
            <path
              d="M 40 44 L 48 63"
              stroke="url(#loaderOrangeRed)"
              strokeWidth="8.5"
              strokeLinecap="round"
              className="loader-v"
            />
          </svg>
          {/* Decorative soft halo */}
          <div className="absolute inset-0 bg-[#FF5E00]/5 blur-xl rounded-full scale-75 animate-pulse"></div>
        </div>

        {/* Title Reveal (Clean, Stagger-delayed spans via inline style transitions) */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-[0.2em] font-sans font-bold text-2xl sm:text-3xl tracking-[0.2em] uppercase select-none">
            <span
              className="text-white font-extrabold"
              style={{
                opacity: mounted && showContent ? 1 : 0,
                transform: mounted && showContent ? "translateY(0)" : "translateY(15px)",
                transition: "opacity 0.5s ease-out 0.10s, transform 0.5s ease-out 0.10s"
              }}
            >
              VEILA
            </span>
            <span
              className="text-[#ff6a00] font-light"
              style={{
                opacity: mounted && showContent ? 1 : 0,
                transform: mounted && showContent ? "translateY(0)" : "translateY(15px)",
                transition: "opacity 0.5s ease-out 0.25s, transform 0.5s ease-out 0.25s"
              }}
            >
              TECHNOLOGIES
            </span>
          </div>

          <p
            className="text-[9px] uppercase font-mono tracking-[0.3em] text-slate-400"
            style={{
              opacity: mounted && showContent ? 0.6 : 0,
              transition: "opacity 0.5s ease-out 0.5s"
            }}
          >
            Digital Solutions Agency
          </p>
        </div>

        {/* Elegant Italic Serif Odometer */}
        <div className="font-serif italic text-6xl sm:text-7xl text-white/95 mt-8 mb-4 tracking-tighter select-none font-medium tabular-nums">
          {progress.toString().padStart(3, "0")}%
        </div>

        {/* Horizontal Progress Line */}
        <div className="w-[200px] h-[1px] bg-white/10 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff8a00] to-[#ff1f00] shadow-[0_0_8px_rgba(255,106,0,0.5)]"
            style={{
              width: `${progress}%`,
              transition: "width 0.1s ease-out"
            }}
          />
        </div>

        {/* Milestone status label */}
        <span
          className="text-[8px] font-mono tracking-[0.15em] text-slate-400 pt-4 uppercase block h-4 transition-all duration-200"
          style={{
            opacity: showContent ? 0.75 : 0,
            transform: showContent ? "translateY(0)" : "translateY(-5px)"
          }}
        >
          {getStageText(progress)}
        </span>
      </div>
    </div>
  );
}
