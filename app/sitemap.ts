import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { projects } from "@/data/projects/projects";
import { client } from "@/sanity/client";
import { MetadataRoute } from "next";
import { SanityDocument } from "next-sanity";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){_id, "slug": slug.current, publishedAt, _updatedAt}`;

const options = { next: { revalidate: 30 } };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const mdxPosts = getAllPosts();
  const latestBlogDate = posts.length
    ? new Date(
        Math.max(
          ...posts.map((p) => new Date(p._updatedAt ?? p.publishedAt).getTime()),
        ),
      ).toISOString()
    : undefined;

  // Static pages have no reliable "last modified" date, so it is left out
  // rather than claiming they change on every build.
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learning`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt ?? post.publishedAt).toISOString(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const mdxEntries: MetadataRoute.Sitemap = mdxPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt).toISOString(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...blogEntries, ...mdxEntries, ...projectEntries];
}
