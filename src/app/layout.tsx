import type { Metadata, Viewport } from "next";
import { Outfit, Cinzel } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--next-font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--next-font-serif",
  subsets: ["latin"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0b0c] font-sans text-slate-100">
        {children}
      </body>
    </html>
  );
}
