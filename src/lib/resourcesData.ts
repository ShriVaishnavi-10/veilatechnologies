import { servicesData } from "./servicesData";

export interface ResourceDetail {
  slug: string;
  title: string;
  category: string;
  description: string;
  imagePath: string;
  details: string[];
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export interface ReviewItem {
  client: string;
  company: string;
  rating: number;
  review: string;
  service: string;
}

export const resourcesData: Record<string, ResourceDetail> = {
  "case-portfolio": {
    slug: "case-portfolio",
    title: "Case Portfolio",
    category: "Showcase",
    description: "Explore the real, measurable business outcomes we have achieved for our clients. We combine user-centric design with modern engineering to build custom solutions that convert.",
    imagePath: "/resource_case_portfolio.png",
    details: [
      "Filterable Project Showcase",
      "Quantifiable Client Results",
      "Interactive Interface Previews",
      "Modern Web Development Stacks",
      "Real Client Case Studies"
    ]
  },
  "growth-blog": {
    slug: "growth-blog",
    title: "Growth Blog",
    category: "Insights",
    description: "Read actionable insights, technical guides, and business growth ideas authored by our digital strategy and development teams.",
    imagePath: "/resource_growth_blog.png",
    details: [
      "Modern Web Development Guides",
      "Search Engine Optimization Audits",
      "High-Conversion Copywriting Ideas",
      "Social Media Growth Blueprints",
      "Digital Advertising Strategy"
    ]
  },
  "system-pricing": {
    slug: "system-pricing",
    title: "System Pricing",
    category: "Planning",
    description: "Transparent, flexible, and value-oriented pricing packages. Estimate your investment instantly using our dynamic interactive estimator.",
    imagePath: "/resource_system_pricing.png",
    details: [
      "Interactive Budget Calculator",
      "Modular Services Pricing Breakdown",
      "No Hidden Fees or Obligations",
      "Tailored Business Scalability Plans",
      "Direct Consultations & Reviews"
    ]
  },
  "client-reviews": {
    slug: "client-reviews",
    title: "Client Reviews",
    category: "Testimonials",
    description: "Hear directly from the business owners, marketing managers, and technology leaders who partner with Veila Technologies to scale their online presence.",
    imagePath: "/resource_client_reviews.png",
    details: [
      "Verified Customer Feedback",
      "5-Star Project Ratings",
      "Industry-Specific Client Reviews",
      "Long-term Partner Testimonials",
      "Transparent Growth Reports"
    ]
  }
};

export const blogPosts: BlogPost[] = [
  {
    title: "Why Next.js is the Ultimate Framework for Modern E-Commerce Sites",
    excerpt: "Discover how static site generation (SSG) and incremental static regeneration (ISR) can double your conversion rates by delivering sub-second load times.",
    date: "June 2, 2026",
    readTime: "5 min read",
    category: "Development"
  },
  {
    title: "5 Local SEO Strategies that Drive Foot Traffic to Small Businesses",
    excerpt: "Optimizing your Google Business Profile (GBP) and schema metadata is the highest-ROI action local storefronts can take. Here is our step-by-step roadmap.",
    date: "May 28, 2026",
    readTime: "4 min read",
    category: "SEO & Growth"
  },
  {
    title: "Crafting High-ROI Ad Copy: How to Structure Campaigns that Convert",
    excerpt: "Stop wasting money on vague branding. Learn how to write specific, hook-driven, high-intent landing page copy and creatives that maximize ROAS.",
    date: "May 15, 2026",
    readTime: "6 min read",
    category: "Advertising"
  },
  {
    title: "Building a Brand Community: Moving Past Likes and Vanity Metrics",
    excerpt: "Likes don't buy products. Learn how to shift your social media planning to focus on inbound funnels, visual pins, and direct client engagement.",
    date: "April 30, 2026",
    readTime: "5 min read",
    category: "Management"
  },
  {
    title: "How to Conduct a Comprehensive Technical SEO Audit in Under 1 Hour",
    excerpt: "A simple guide to analyzing crawl budget, duplicate pages, redirect loops, and core web vitals using simple, free developer tools.",
    date: "April 18, 2026",
    readTime: "7 min read",
    category: "SEO & Growth"
  }
];

export const clientReviewsList: ReviewItem[] = [
  {
    client: "Ramya",
    company: "Veloce Timepieces",
    rating: 5,
    review: "Veila Technologies completely restructured our e-commerce flow. The new Next.js storefront loads instantly, and we saw a 32% increase in sales conversion within weeks. Their attention to animation detail is incredible.",
    service: "Website Development"
  },
  {
    client: "Priya",
    company: "EcoSphere Retail",
    rating: 5,
    review: "The SEO campaign exceeded all expectations. We grew organic search traffic by 250% in just 6 months. We now rank page #1 for dozens of high-value search keywords. Strongly recommend Veila for SEO audits and backlink strategy.",
    service: "Search Engine Optimization"
  },
  {
    client: "Gokulakrishnan",
    company: "Prime Capital",
    rating: 5,
    review: "Our B2B LinkedIn campaign yielded over 450 qualified investor leads. Veila created extremely precise landing pages that achieved a 4.2x Return on Ad Spend. Responsive, technical, and data-driven.",
    service: "Digital Marketing & Ads"
  },
  {
    client: "Sunmathi",
    company: "Cafe Bloom Group",
    rating: 5,
    review: "Managing social handles is a full-time job. Veila took over our visual planning, graphics templates, and reels strategy. Our Instagram grew from 2k to 18k followers organically, driving massive foot traffic to our locations.",
    service: "Social Media Management"
  },
  {
    client: "Barath",
    company: "Aura Living",
    rating: 5,
    review: "Veila built a robust search portal with booking systems and Stripe payments. The platform has 99.9% uptime and easily supports 5,000+ active listings. The code is exceptionally clean.",
    service: "Website Development"
  }
];

export interface UnifiedProject {
  title: string;
  client: string;
  description: string;
  results: string;
  tags: string[];
  serviceTitle: string;
  category: string;
}

// Helper to extract all projects from services data to feed into the Case Portfolio
export function getAllProjects(): UnifiedProject[] {
  const allProjects: UnifiedProject[] = [];
  for (const serviceKey in servicesData) {
    const service = servicesData[serviceKey];
    for (const project of service.projects) {
      allProjects.push({
        ...project,
        serviceTitle: service.title,
        category: service.category
      });
    }
  }
  return allProjects;
}
