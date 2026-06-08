export interface Project {
  title: string;
  client: string;
  description: string;
  results: string;
  tags: string[];
}

export interface ServiceDetail {
  slug: string;
  title: string;
  category: string;
  iconName: "Globe" | "TrendingUp" | "Target" | "Smartphone" | "PenTool";
  description: string;
  imagePath: string;
  details: string[];
  projects: Project[];
}

export const servicesData: Record<string, ServiceDetail> = {
  "website-development": {
    slug: "website-development",
    title: "Website Development",
    category: "Development",
    iconName: "Globe",
    description: "We build modern, responsive, and high-performance websites tailored to your business needs, ensuring a stellar first impression.",
    imagePath: "/service_web_dev.png",
    details: [
      "Business & Brand Websites",
      "Portfolio & Creative Websites",
      "E-Commerce Online Stores",
      "Custom Web Solutions",
      "Both Static & Dynamic Websites"
    ],
    projects: [
      {
        title: "Veloce Luxury E-Commerce",
        client: "Veloce Timepieces",
        description: "A premium custom storefront designed for an ultra-luxury watch brand. Focused on high-speed performance, interactive elements, and clean animations to replicate a boutique shopping experience.",
        results: "32% increase in sales conversion, sub-second load times",
        tags: ["Next.js", "Framer Motion", "Shopify API"]
      },
      {
        title: "Nova Architectural Portfolio",
        client: "Nova Architects",
        description: "An immersive, interactive gallery showcasing award-winning spatial designs. Implemented a custom smooth-scrolling canvas with high-resolution image transitions.",
        results: "Avg. session duration increased by 140%",
        tags: ["React", "Three.js", "Tailwind CSS"]
      },
      {
        title: "Aura Real Estate Portal",
        client: "Aura Living",
        description: "A robust real estate search and booking platform. Built with real-time listing updates, customer dashboard portal, and secure Stripe billing integration.",
        results: "Over 5,000 active monthly listings, 99.9% uptime",
        tags: ["Next.js", "PostgreSQL", "Stripe API"]
      }
    ]
  },
  "search-engine-optimization": {
    slug: "search-engine-optimization",
    title: "Search Engine Optimization",
    category: "SEO & Growth",
    iconName: "TrendingUp",
    description: "We optimize your website to rank higher on search engines, driving organic traffic and making it easy for customers to find you.",
    imagePath: "/service_seo.png",
    details: [
      "On-Page SEO Copywriting",
      "Off-Page Link Building",
      "Technical SEO Site Audits",
      "Local SEO & GMB Optimization"
    ],
    projects: [
      {
        title: "EcoSphere Traffic Scale-Up",
        client: "EcoSphere Retail",
        description: "A comprehensive SEO overhaul for a national distributor of eco-cleaning supplies. Cleaned up site architecture, optimized core web vitals, and implemented a content hub.",
        results: "250% organic search traffic growth in 6 months",
        tags: ["Technical SEO", "Content Strategy", "Link Building"]
      },
      {
        title: "HealthPath Portal Visibility",
        client: "HealthPath Directory",
        description: "Designed and structured indexable SEO paths for a massive directory of healthcare clinics, optimizing metadata and schema markup at scale.",
        results: "Reached 150k+ monthly organic page impressions",
        tags: ["Schema Markup", "Technical Audit", "Next.js"]
      },
      {
        title: "Apex Legal Local SEO",
        client: "Apex Law Partners",
        description: "Targeted local SEO campaign focusing on regional search intent and Google Business Profile optimization for a multi-city law firm.",
        results: "180% increase in local phone call inquiries",
        tags: ["Local SEO", "GMB Optimization", "Review Strategy"]
      }
    ]
  },
  "digital-marketing-ads": {
    slug: "digital-marketing-ads",
    title: "Digital Marketing & Ads",
    category: "Advertising",
    iconName: "Target",
    description: "We design and manage high-ROI advertising campaigns that generate leads, boost sales, and maximize marketing budgets.",
    imagePath: "/service_marketing.png",
    details: [
      "Google Ads Search & Display",
      "Meta Ads (Facebook & Instagram)",
      "Focused Lead Generation Campaigns",
      "Ad Copy & Performance Optimization"
    ],
    projects: [
      {
        title: "Zenith Mobile App Campaign",
        client: "Zenith FinTech",
        description: "A dual-network PPC and social ad campaign to launch a new mobile budget management application, optimizing ad creatives dynamically.",
        results: "15,000+ app installs in 30 days at $1.20 CPA",
        tags: ["Google App Campaigns", "Meta Ads Manager", "A/B Testing"]
      },
      {
        title: "Prime Brokerage Lead Gen",
        client: "Prime Capital",
        description: "High-intent lead capture campaign using advanced LinkedIn targeting and custom landing page flows for high-net-worth investment options.",
        results: "450+ qualified investor leads with a 5x ROAS",
        tags: ["LinkedIn Ads", "Landing Page UX", "HubSpot CRM"]
      },
      {
        title: "FlexFit Apparel ROAS Scale",
        client: "FlexFit Wear",
        description: "E-commerce scaling campaign on Facebook and Instagram leveraging video creatives and Lookalike Audiences during peak shopping season.",
        results: "$120k sales generated with a 4.2x ROAS in 90 days",
        tags: ["Meta Ads", "Retargeting Funnels", "Video Ads"]
      }
    ]
  },
  "social-media-management": {
    slug: "social-media-management",
    title: "Social Media Management",
    category: "Management",
    iconName: "Smartphone",
    description: "We build and nurture your brand online, creating consistent content and strategies that engage and grow your audience.",
    imagePath: "/service_social_media.png",
    details: [
      "Complete Social Media Handling",
      "Content Planning & Scheduling",
      "Audience Engagement & Growth",
      "Custom Graphic Post Templates"
    ],
    projects: [
      {
        title: "Cafe Bloom Brand Refresh",
        client: "Cafe Bloom Group",
        description: "Established a cohesive aesthetic and short-form video strategy on Instagram and TikTok, highlighting daily operations and client testimonials.",
        results: "Grew Instagram from 2k to 18k followers in 4 months",
        tags: ["Instagram Reels", "Content Planning", "Community Mgmt"]
      },
      {
        title: "Lumina Tech B2B Thought Leadership",
        client: "Lumina SaaS",
        description: "Positioned the client's C-suite as industry experts on LinkedIn and X through custom infographics, data-backed carousel decks, and industry hot-takes.",
        results: "400% increase in executive profile impressions",
        tags: ["LinkedIn Strategy", "Graphic Design", "Ghostwriting"]
      },
      {
        title: "StyleCraft Inbound Client Funnel",
        client: "StyleCraft Interiors",
        description: "Showcased custom design transformations on Pinterest and Instagram. Created high-performing pins linking to client inquiry forms.",
        results: "Secured 14 high-value B2B projects from organic pins",
        tags: ["Pinterest SEO", "Visual Board Design", "Lead Gen"]
      }
    ]
  },
  "content-writing-editing": {
    slug: "content-writing-editing",
    title: "Content Writing & Editing",
    category: "Content",
    iconName: "PenTool",
    description: "We craft persuasive and engaging copy that tells your story, builds trust, and converts visitors into loyal clients.",
    imagePath: "/service_content.png",
    details: [
      "Professional Website Copywriting",
      "Informative Blog Articles",
      "High-Converting Marketing Copy",
      "Content Editing & Proofreading"
    ],
    projects: [
      {
        title: "Veritas Cybersecurity Authority Hub",
        client: "Veritas Cyber Sec",
        description: "Researched and authored technical whitepapers and in-depth guides detailing enterprise threat detection models and compliance mandates.",
        results: "3,000+ downloads, ranked #1 for 'enterprise compliance audit'",
        tags: ["Whitepaper Writing", "Technical Copy", "Authority Building"]
      },
      {
        title: "Urban Stay Booking Lift",
        client: "Urban Stay Hotels",
        description: "Rewrote all key landing pages, room descriptions, and local guide resources to tell a compelling narrative, focusing on clarity and emotion.",
        results: "14% uplift in direct site bookings vs OTA channels",
        tags: ["Website Copywriting", "Brand Voice", "UX Writing"]
      },
      {
        title: "GreenLife Wellness Blog Hub",
        client: "GreenLife Co",
        description: "Produced a series of weekly articles and recipes optimized for search traffic and social sharing. Focused on readability and scientific backing.",
        results: "35,000 monthly unique visitors within 5 months",
        tags: ["Blog Content", "SEO Writing", "Editing"]
      }
    ]
  }
};
