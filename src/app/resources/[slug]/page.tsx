import React from "react";
import { notFound } from "next/navigation";
import { resourcesData } from "@/lib/resourcesData";
import ResourceDetailClient from "@/components/ResourceDetailClient";
import type { Metadata } from "next";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = resourcesData[slug];

  if (!resource) {
    return {
      title: "Resource Not Found | Veila Technologies",
      description: "The requested resource page could not be found.",
    };
  }

  return {
    title: `${resource.title} | Veila Technologies`,
    description: resource.description,
    keywords: [
      resource.title,
      resource.category,
      "Veila Technologies",
      "Digital Agency Resources",
      "Client Portfolios"
    ],
    openGraph: {
      title: `${resource.title} | Veila Technologies`,
      description: resource.description,
      type: "website",
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(resourcesData).map((slug) => ({
    slug,
  }));
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = resourcesData[slug];

  if (!resource) {
    notFound();
  }

  return <ResourceDetailClient resource={resource} />;
}
