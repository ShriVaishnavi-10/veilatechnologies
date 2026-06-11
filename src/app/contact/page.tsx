import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Veila Technologies",
  description: "Get in touch with our tech and marketing teams. Plan your project budget, request a tech audit, or discuss your digital product.",
  keywords: [
    "Contact Veila Technologies",
    "Request Consultation",
    "Digital Project Inquiry",
    "Tamilnadu Digital Agency"
  ],
  openGraph: {
    title: "Contact Us | Veila Technologies",
    description: "Get in touch with our tech and marketing teams. Plan your project budget, request a tech audit, or discuss your digital product.",
    type: "website"
  }
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0B0C] text-slate-100 overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-20">
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
