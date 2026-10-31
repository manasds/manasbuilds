import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// AI search / answer engines. Allowing these lets ChatGPT, Claude and
// Perplexity find and cite the site. Training crawlers (GPTBot, ClaudeBot,
// Google-Extended, CCBot...) fall under "*" and are allowed too; add a
// disallow rule for them here if you ever want to opt out of training.
const AI_SEARCH_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_SEARCH_BOTS,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
