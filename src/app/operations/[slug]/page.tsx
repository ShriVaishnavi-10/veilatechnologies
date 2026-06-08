import React from "react";
import { notFound } from "next/navigation";
import { operationsData } from "@/lib/operationsData";
import OperationDetailClient from "@/components/OperationDetailClient";
import type { Metadata } from "next";

interface OperationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: OperationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const operation = operationsData[slug];

  if (!operation) {
    return {
      title: "Operation Not Found | Veila Technologies",
      description: "The requested operations detail page could not be found.",
    };
  }

  return {
    title: `${operation.title} | Veila Technologies`,
    description: operation.description,
    keywords: [
      operation.title,
      operation.category,
      "Veila Technologies",
      "Digital Solutions Operations",
      "Remote Work Agency"
    ],
    openGraph: {
      title: `${operation.title} | Veila Technologies`,
      description: operation.description,
      type: "website",
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(operationsData).map((slug) => ({
    slug,
  }));
}

export default async function OperationPage({ params }: OperationPageProps) {
  const { slug } = await params;
  const operation = operationsData[slug];

  if (!operation) {
    notFound();
  }

  return <OperationDetailClient operation={operation} />;
}
