import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Veila Technologies | Digital Solutions Agency",
  description: "Veila Technologies is a technology-driven company focused on helping businesses grow through innovative digital solutions. We specialize in web development, software development, digital marketing, SEO, and social media management.",
  keywords: ["Veila Technologies", "Website Development", "Search Engine Optimization", "SEO", "Digital Marketing", "Social Media Management", "Content Writing"],
  authors: [{ name: "Veila Technologies" }],
  openGraph: {
    title: "Veila Technologies | Digital Solutions Agency",
    description: "Veila Technologies is a technology-driven company focused on helping businesses grow through innovative digital solutions. We specialize in web development, software development, digital marketing, SEO, and social media management.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0b0c] font-sans text-slate-100">
        {children}
      </body>
    </html>
  );
}
