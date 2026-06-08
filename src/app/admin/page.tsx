import React from "react";
import AdminDashboardClient from "@/components/AdminDashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Veila Technologies",
  description: "Authorized access only.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
