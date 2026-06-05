import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/app/data/blogPosts";

const locations = {
  "New South Wales": [
    "Sydney",
    "Newcastle",
    "Wollongong",
    "Central Coast",
    "Byron Bay",
    "Coffs Harbour",
    "Parramatta",
    "Bondi Junction",
    "Port Macquarie",
    "Wagga Wagga",
    "Albury",
    "Tamworth",
  ],
  Queensland: [
    "Brisbane",
    "Gold Coast",
    "Sunshine Coast",
    "Cairns",
    "Surfers Paradise",
    "Townsville",
    "Toowoomba",
    "Mackay",
    "Rockhampton",
    "Airlie Beach",
    "Port Douglas",
  ],
  Victoria: [
    "Melbourne",
    "Geelong",
    "Ballarat",
    "Mornington Peninsula",
    "Shepparton",
    "Mildura",
    "Echuca",
    "Phillip Island",
  ],
  "Western Australia": [
    "Perth",
    "Bunbury",
    "Mandurah",
    "Geraldton",
    "Broome",
    "Albury",
    "Busselton",
    "Kalgoorlie",
    "Margaret River",
    "Port Hedland",
  ],
  "South Australia": ["Adelaide", "Riverland"],
  Tasmania: ["Hobart", "Launceston", "Devonport", "Strahan"],
  "Northern Territory": ["Darwin", "Katherine"],
  ACT: ["Canberra"],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://privateguys.com.au",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: "https://privateguys.com.au/blog",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: "https://privateguys.com.au/search",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: "https://privateguys.com.au/login",
      lastModified: new Date(),
      changeFrequency: "never" as const,
      priority: 0.5,
    },
    {
      url: "https://privateguys.com.au/register",
      lastModified: new Date(),
      changeFrequency: "never" as const,
      priority: 0.7,
    },
    {
      url: "https://privateguys.com.au/legal/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: "https://privateguys.com.au/legal/terms",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `https://privateguys.com.au/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // City pages
  const cityPages: MetadataRoute.Sitemap = [];
  Object.values(locations).forEach((cities) => {
    cities.forEach((city) => {
      const citySlug = city.toLowerCase().replace(/\s+/g, "-");
      cityPages.push({
        url: `https://privateguys.com.au/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
      // Male companions by city
      cityPages.push({
        url: `https://privateguys.com.au/male-companions/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
      // Escorts by city
      cityPages.push({
        url: `https://privateguys.com.au/escorts/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
    });
  });

  return [...staticPages, ...blogPages, ...cityPages];
}
