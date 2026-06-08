import React from "react";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/servicesData";
import ServiceDetailClient from "@/components/ServiceDetailClient";
import type { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return {
      title: "Service Not Found | Veila Technologies",
      description: "The requested digital service could not be found.",
    };
  }

  return {
    title: `${service.title} | Veila Technologies`,
    description: service.description,
    keywords: [
      service.title,
      service.category,
      "Veila Technologies",
      "Digital Solutions Agency",
      "Business Growth"
    ],
    openGraph: {
      title: `${service.title} | Veila Technologies`,
      description: service.description,
      type: "website",
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
