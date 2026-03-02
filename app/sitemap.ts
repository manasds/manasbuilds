import { getAllPosts } from "@/lib/blog";
import { MetadataRoute } from "next";

export default async function sitemap() : Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://manasbuilds.me";

	const posts = getAllPosts();
	const latestBlogDate = posts.length
		? new Date(
				Math.max(
					...posts.map(p => new Date(p.metadata.publishedAt).getTime())
				)
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
			url: `${baseUrl}/pricing`,
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date().toISOString(),
			changeFrequency: "yearly" as const,
			priority: 0.5,
		},
		
	];

	const blogEntries = posts.map(post => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: new Date(post.metadata.publishedAt).toISOString(),
		changeFrequency: "yearly" as const,
		priority: 0.7,
	}));

	return [...routes, ...blogEntries];
}