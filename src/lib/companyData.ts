export interface CompanyDetail {
  slug: string;
  title: string;
  category: string;
  description: string;
  imagePath: string;
  details: string[];
}

export interface JobOpening {
  title: string;
  department: string;
  location: string;
  experience: string;
  description: string;
  requirements: string[];
}

export const companyData: Record<string, CompanyDetail> = {
  "about": {
    slug: "about",
    title: "About Veila",
    category: "Corporate",
    description: "We combine technical capabilities with strategic insights to build modern, responsive websites and deliver results-oriented digital solutions.",
    imagePath: "/company_about.png",
    details: [
      "Established in 2026",
      "Headquartered in Virudhunagar, Tamilnadu",
      "100% Remote Operations Worldwide",
      "Agile Development Methodologies",
      "Value-Driven Collaboration Model"
    ]
  },
  "careers": {
    slug: "careers",
    title: "Careers (Hiring)",
    category: "Join Our Team",
    description: "Join a collaborative, remote-first environment. We work on high-end digital projects, encourage growth, and provide flexible work-life arrangements.",
    imagePath: "/company_careers.png",
    details: [
      "100% Remote Work Model",
      "Flexible Project Hours",
      "Continuous Skill Growth Support",
      "High-Impact Client Projects",
      "Collaborative Team Culture"
    ]
  }
};

export const jobOpeningsList: JobOpening[] = [
  {
    title: "Frontend Web Developer (React/Next.js)",
    department: "Engineering",
    location: "Remote",
    experience: "1-3 Years",
    description: "Build modern, fluid, and responsive storefronts and user interfaces using React, Next.js, Framer Motion, and Tailwind CSS.",
    requirements: [
      "Proficiency in React, Next.js, and TypeScript",
      "Strong understanding of Framer Motion and web animation principles",
      "Experience with standard REST/GraphQL API integrations"
    ]
  },
  {
    title: "SEO Strategist & Auditor",
    department: "Marketing",
    location: "Remote",
    experience: "2+ Years",
    description: "Perform deep technical SEO audits, manage content roadmaps, and execute local search optimization strategies.",
    requirements: [
      "Proven track record in organic growth and search ranking scaling",
      "Hands-on experience with technical auditing tools (Ahrefs, SEMrush)",
      "Strong knowledge of Schema markup and Core Web Vitals"
    ]
  },
  {
    title: "Technical Content & UX Copywriter",
    department: "Content",
    location: "Remote",
    experience: "1+ Years",
    description: "Write high-converting website copies, professional blog posts, and technical whitepapers focused on business growth.",
    requirements: [
      "Superb English writing and grammar editing skills",
      "Basic understanding of SEO content keywords planning",
      "Ability to write in a consistent brand voice that converts visitors"
    ]
  }
];
