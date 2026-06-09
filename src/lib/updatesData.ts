export interface CompanyUpdate {
  id: string;
  slug?: string;
  title: string;
  content: string;
  category: "Product" | "Milestone" | "Company";
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
}

export const companyUpdatesList: CompanyUpdate[] = [
  {
    id: "veila-pulse-launch",
    title: "Veila Pulse Officially Launched",
    content: "Today we are launching Veila Pulse, our new centralized company updates feed and product changelog dashboard. Stay tuned for periodic releases, engineering developments, and milestone stories as we scale digital businesses.",
    category: "Company",
    date: "June 2026",
    author: "Gokulakrishnan, CEO",
    readTime: "1 min read",
    imageUrl: "/resource_growth_blog.png"
  },
  {
    id: "client-estimator-deployment",
    title: "Sleek Static Estimator Tool Deployed",
    content: "We've fully integrated our custom Client Estimator calculator. Business owners can now easily configure their custom website specs, page counts, SEO terms, and social media posting metrics to receive a transparent budget estimate instantly.",
    category: "Product",
    date: "May 2026",
    author: "Ramya, Tech Lead",
    readTime: "2 min read",
    imageUrl: "/operation_client_estimator.png"
  },
  {
    id: "virudhunagar-office-expansion",
    title: "Virudhunagar Office Suite Expansion",
    content: "To support our expanding operations team and accommodate close collaborative consulting with our local client base, Veila Technologies has opened its brand-new headquarters in Virudhunagar, Tamilnadu.",
    category: "Milestone",
    date: "April 2026",
    author: "Priya, Operations Director",
    readTime: "2 min read",
    imageUrl: "/company_about.png"
  },
  {
    id: "supabase-database-integrations",
    title: "Supabase Database & Offline Sync Fallbacks",
    content: "We have finalized our database adapter suite. All contact portals and user dashboards now stream leads dynamically into Supabase. If the network goes offline, our clients benefit from a robust localStorage backup flow.",
    category: "Product",
    date: "March 2026",
    author: "Barath, Senior Developer",
    readTime: "3 min read",
    imageUrl: "/operation_quality_standards.png"
  }
];

export interface DBCompanyUpdate {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: "Product" | "Milestone" | "Company";
  publish_date: string; // YYYY-MM-DD
  author: string;
  read_time: string;
  image_url: string;
  created_at?: string;
}

export function formatDBDate(dateStr: string): string {
  if (!dateStr) return "Recent";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed month
    const day = parseInt(parts[2], 10);
    const dateObj = new Date(Date.UTC(year, month, day));
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    });
  }
  return dateStr;
}

export function mapDBUpdateToCompanyUpdate(dbRow: any): CompanyUpdate {
  return {
    id: dbRow.id,
    slug: dbRow.slug || dbRow.id,
    title: dbRow.title,
    content: dbRow.content,
    category: dbRow.category as "Product" | "Milestone" | "Company",
    date: dbRow.publish_date ? formatDBDate(dbRow.publish_date) : (dbRow.date || "Recent"),
    author: dbRow.author,
    readTime: dbRow.read_time || dbRow.readTime || "2 min read",
    imageUrl: dbRow.image_url || dbRow.imageUrl || "/resource_growth_blog.png"
  };
}

