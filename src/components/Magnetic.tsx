"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;      // Distance in pixels inside which the pull takes effect
  strength?: number;   // Strength multiplier of the magnetic pull
}

export default function Magnetic({ children, range = 80, strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values to track target coordinates relative to button center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Damped spring physics configuration for high-end feel
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    
    // Find center coordinate of the element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Delta distance between mouse cursor and center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    // Pythagorean distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < range) {
      // Pull element proportional to proximity to center
      const pullFactor = (range - distance) / range; // 1 at center, 0 at boundary
      x.set(deltaX * strength * pullFactor);
      y.set(deltaY * strength * pullFactor);
    } else {
      // Return to base position
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div style={{ x: springX, y: springY }}>
        {children}
      </motion.div>
    </div>
  );
}
