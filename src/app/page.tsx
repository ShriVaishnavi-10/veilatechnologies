import React from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import Process from "@/components/Process";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-space overflow-hidden">
      {/* Themed Preloader */}
      <Preloader />

      {/* Floating Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Section 1: Hero Landing */}
        <Hero />

        {/* Section 2: Core Solutions/Services */}
        <Services />

        {/* Section 3: Performance Pillars / Why Choose Us */}
        <Metrics />

        {/* Section 4: Dynamic Quote Planner */}
        <Calculator />

        {/* Section 5: Our Execution Process */}
        <Process />
      </main>

      {/* Footer System */}
      <Footer />
    </div>
  );
}
