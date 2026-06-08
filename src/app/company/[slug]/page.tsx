import React from "react";
import { notFound } from "next/navigation";
import { companyData } from "@/lib/companyData";
import CompanyDetailClient from "@/components/CompanyDetailClient";
import type { Metadata } from "next";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = companyData[slug];

  if (!company) {
    return {
      title: "Page Not Found | Veila Technologies",
      description: "The requested company page could not be found.",
    };
  }

  return {
    title: `${company.title} | Veila Technologies`,
    description: company.description,
    keywords: [
      company.title,
      company.category,
      "Veila Technologies",
      "Digital Agency Virudhunagar",
      "Remote Careers"
    ],
    openGraph: {
      title: `${company.title} | Veila Technologies`,
      description: company.description,
      type: "website",
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(companyData).map((slug) => ({
    slug,
  }));
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const company = companyData[slug];

  if (!company) {
    notFound();
  }

  return <CompanyDetailClient company={company} />;
}
