import { socialLinks } from "@/lib/social";

// Single source of truth for site identity. Every canonical URL, the sitemap,
// robots.txt, llms.txt and JSON-LD read from here. Keep `url` equal to the
// domain Vercel serves as primary (the one the other domain redirects to).
export const siteConfig = {
  name: "Manas Builds",
  author: "Manas Dubey",
  url: "https://www.manasbuilds.me",
  title: "Manas - Full Stack Developer",
  description: "I love building stuff and curious to dive into it" ,
  twitter: "@manastwts",
  ogImage: "/manasbuildshome.png",
  sameAs: socialLinks.map((link) => link.href),
};

export const absoluteUrl = (path = "/") =>
  new URL(path, siteConfig.url).toString();
