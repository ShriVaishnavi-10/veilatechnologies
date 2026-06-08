export interface OperationDetail {
  slug: string;
  title: string;
  category: string;
  description: string;
  imagePath: string;
  details: string[];
}

export const operationsData: Record<string, OperationDetail> = {
  "remote-solutions": {
    slug: "remote-solutions",
    title: "Remote Solutions",
    category: "Operations",
    description: "We operate 100% remotely to deliver high-quality digital solutions to clients globally. By leveraging modern communication tools and agile processes, we ensure seamless collaboration without geographical boundaries.",
    imagePath: "/operation_remote_solutions.png",
    details: [
      "Asynchronous Collaboration & Updates",
      "Slack & WhatsApp Direct Communication",
      "Secure Cloud Deployment & Hosting",
      "Virtual Video Meetings & Screen Sharing",
      "Agile Project Tracking & Delivery"
    ]
  },
  "worldwide-delivery": {
    slug: "worldwide-delivery",
    title: "Worldwide Delivery",
    category: "Operations",
    description: "No matter where your business is located, we deliver enterprise-grade digital services. We coordinate schedules and project handoffs across international time zones to support businesses globally.",
    imagePath: "/operation_worldwide_delivery.png",
    details: [
      "Global Timezone Coordination",
      "International Secure Payments",
      "Multi-Language Project Delivery",
      "Universal Standards & Compliance",
      "24/7 Digital Platform Availability"
    ]
  },
  "client-estimator": {
    slug: "client-estimator",
    title: "Client Estimator",
    category: "Planning",
    description: "Estimate your project cost instantly with our dynamic budget planner. Configure your development, design, and marketing needs to receive an immediate structured estimation.",
    imagePath: "/operation_client_estimator.png",
    details: [
      "Dynamic Price Estimation",
      "Custom Services Selection",
      "Transparent Budget Breakdown",
      "Instant Planning PDF Summary",
      "Zero Obligation Assessment"
    ]
  },
  "quality-standards": {
    slug: "quality-standards",
    title: "Quality Standards",
    category: "QA & Compliance",
    description: "Our commitment to excellence is reflected in our strict development and deployment practices. We verify everything, write clean documented code, and provide direct support to guarantee a premium experience.",
    imagePath: "/operation_quality_standards.png",
    details: [
      "Modern, Standard-Compliant Tech Stack",
      "Rigorous Quality Assurance & Audits",
      "Direct Technical Expert Support",
      "Responsive Mobile-First UI Designs",
      "Secure Database & Hosting Standards"
    ]
  }
};
