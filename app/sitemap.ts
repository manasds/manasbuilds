import { getAllPosts } from "@/lib/blog";
import { client } from "@/sanity/client";
import { MetadataRoute } from "next";
import { SanityDocument } from "next-sanity";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, description, title, "slug": slug.current, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://manasbuilds.me";

  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const latestBlogDate = posts.length
    ? new Date(
        Math.max(
          ...posts.map((p) => new Date(p.publishedAt).getTime()),
        ),
      ).toISOString()
    : new Date().toISOString();

  const routes = [
    {
      url: baseUrl,
      lastModified: latestBlogDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learning`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ];

  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt).toISOString(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogEntries];
}
