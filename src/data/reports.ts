export type Report = {
  id: string;
  tier: "primary" | "secondary";
  title: string;
  description: string;
  imageUrl: string;
  author: { name: string; avatarUrl: string };
  href: string;
  badge?: string;
};

export const reports: Report[] = [
  // Primary Reports
  {
    id: "website-stats",
    tier: "primary",
    title: "Website Stats",
    description: "Comprehensive analytics dashboard tracking site performance, user engagement, and conversion metrics.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    author: {
      name: "Analytics Team",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
    },
    href: "https://lookerstudio.google.com/reports/website-stats",
    badge: "Looker Studio"
  },
  {
    id: "seo",
    tier: "primary", 
    title: "SEO Performance",
    description: "Track keyword rankings, organic traffic growth, and search engine optimization metrics across all pages.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    author: {
      name: "Marketing Team",
      avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=48&h=48&fit=crop&crop=face"
    },
    href: "https://lookerstudio.google.com/reports/seo",
    badge: "Looker Studio"
  },
  {
    id: "social-media",
    tier: "primary",
    title: "Social Media Analytics",
    description: "Monitor social media performance, engagement rates, and growth across all platforms and campaigns.",
    imageUrl: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=225&fit=crop",
    author: {
      name: "Social Team",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
    },
    href: "https://lookerstudio.google.com/reports/social-media",
    badge: "Looker Studio"
  },
  {
    id: "google-ads",
    tier: "primary",
    title: "Google Ads Performance",
    description: "Detailed analysis of Google Ads campaigns, including cost-per-click, conversion rates, and ROI metrics.",
    imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=225&fit=crop",
    author: {
      name: "PPC Team",
      avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=48&h=48&fit=crop&crop=face"
    },
    href: "https://lookerstudio.google.com/reports/google-ads",
    badge: "Looker Studio"
  },
  {
    id: "facebook-ads",
    tier: "primary",
    title: "Facebook Ads Dashboard",
    description: "Track Facebook and Instagram ad performance, audience insights, and campaign optimization opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=225&fit=crop",
    author: {
      name: "Social Ads Team",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face"
    },
    href: "https://lookerstudio.google.com/reports/facebook-ads",
    badge: "Looker Studio"
  },
  // Secondary Reports
  {
    id: "industry-stats",
    tier: "secondary",
    title: "Industry Benchmarks",
    description: "Compare performance against industry standards and competitor analysis across key business metrics.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop",
    author: {
      name: "Research Team",
      avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=48&h=48&fit=crop&crop=face"
    },
    href: "https://lookerstudio.google.com/reports/industry-stats",
    badge: "Looker Studio"
  },
  {
    id: "gmb-reviews",
    tier: "secondary",
    title: "Google My Business Reviews",
    description: "Monitor online reputation, review sentiment analysis, and customer feedback trends across locations.",
    imageUrl: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&h=225&fit=crop",
    author: {
      name: "Reputation Team",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=48&h=48&fit=crop&crop=face"
    },
    href: "https://lookerstudio.google.com/reports/gmb-reviews",
    badge: "Looker Studio"
  }
];