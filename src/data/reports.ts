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
    title: "Website Report",
    description: "Key stats and performance metrics of our Bannister websites.",
    imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/c_auto,w_400/website_analtyics_m3spog.jpg",
    author: {
      name: "Varun Teja",
      avatarUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567456/varun-profile-pic_sh12zt.jpg"
    },
    href: "https://lookerstudio.google.com/reporting/6cf1b00c-edad-487d-9fbf-14f37a248794",
    badge: "Looker Studio"
  },
  {
    id: "seo",
    tier: "primary", 
    title: "SEO Performance",
    description: "On-page SEO insights directly from Google Search Console.",
    imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/c_auto,w_400/seo_phjayz.jpg",
    author: {
      name: "Varun Teja",
      avatarUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567456/varun-profile-pic_sh12zt.jpg"
    },
    href: "https://lookerstudio.google.com/reporting/0bb0439f-0a21-4588-b28c-a6490e816aa9",
    badge: "Looker Studio"
  },
  {
    id: "gmb-reviews",
    tier: "primary",
    title: "Google Business Reviews",
    description: "AI-driven analysis of our GMB customer reviews.",
    imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/c_auto,w_400/gmb_qral50.jpg",
    author: {
      name: "Varun Teja",
      avatarUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567456/varun-profile-pic_sh12zt.jpg"
    },
    href: "https://lookerstudio.google.com/reporting/3315f269-c0ed-4ebd-b2c0-ff7ef5d0cc68",
    badge: "Looker Studio"
  },
  /*
  {
    id: "social-media",
    tier: "primary",
    title: "Social Media Analytics",
    description: "Engagement and reach stats from Facebook, Instagram, and YouTube.",
    imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/c_auto,w_400/social_media_l6u11d.jpg",
    author: {
      name: "Varun Teja",
      avatarUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567456/varun-profile-pic_sh12zt.jpg"
    },
    href: "https://lookerstudio.google.com/reports/social-media",
    badge: "Looker Studio"
  },
  */
  {
    id: "google-ads",
    tier: "primary",
    title: "Google Ads Report",
    description: "Performance and ROI insights from Google Ads campaigns.",
    imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/c_auto,w_400/google_ads_l0sfce.jpg",
    author: {
      name: "Varun Teja",
      avatarUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567456/varun-profile-pic_sh12zt.jpg"
    },
    href: "https://lookerstudio.google.com/reporting/4968c533-9a33-4b48-b007-4538e80d6760",
    badge: "Looker Studio"
  },
  {
    id: "facebook-ads",
    tier: "primary",
    title: "Facebook Ads Report",
    description: "Detailed results from Facebook advertising campaigns.",
    imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/c_auto,w_400/facebook-ads_br5nco.jpg",
    author: {
      name: "Varun Teja",
      avatarUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567456/varun-profile-pic_sh12zt.jpg"
    },
    href: "https://lookerstudio.google.com/reporting/e75f4579-e8eb-4a97-8ddf-04e7c761135e",
    badge: "Looker Studio"
  },
  // Secondary Reports
  {
    id: "industry-stats",
    tier: "secondary",
    title: "Industry Insights",
    description: "Latest trends and insights from the automotive industry.",
    imageUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/c_auto,w_400/automotive-industry_nsh5ky.jpg",
    author: {
      name: "Varun Teja",
      avatarUrl: "https://res.cloudinary.com/dhwhrk0oe/image/upload/v1758567456/varun-profile-pic_sh12zt.jpg"
    },
    href: "https://lookerstudio.google.com/reporting/d6725d64-b323-495c-8674-c06fa4a5213e",
    badge: "Looker Studio"
  }
];