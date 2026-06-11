import React from "react";
import PreloaderWrapper from "@/components/PreloaderWrapper";
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
      <PreloaderWrapper />

      <Navbar />

      <main className="flex-grow">
        <Hero />

        <Services />

        <Metrics />

        <Calculator />

        <Process />
      </main>

      <Footer />
    </div>
  );
}
