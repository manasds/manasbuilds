import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { socialLinks } from "@/lib/social";
import { projects } from "@/data/projects/projects";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI agents.
// Built from the same data as the pages, so it stays in sync automatically.

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...50]{title, description, "slug": slug.current}`;

export const revalidate = 86400;

export async function GET() {
  const { url } = siteConfig;
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);
  const mdxPosts = getAllPosts();

  const line = (title: string, href: string, note?: string) =>
    `- [${title}](${href})${note ? `: ${note}` : ""}`;

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Personal site of ${siteConfig.author} (Manas), a full-stack developer. It lists projects, blog posts and a learning log.`,
    "",
    "## Pages",
    line("Home", url, "intro, featured projects and latest posts"),
    line("Projects", `${url}/projects`, "everything being built or shipped"),
    line("Blog", `${url}/blog`, "all blog posts"),
    line("Learning", `${url}/learning`, "knowledge base and UI experiments"),
    line("Contact", `${url}/contact`, "ways to get in touch"),
    "",
    "## Projects",
    ...projects.map((p) =>
      line(p.title, `${url}/projects/${p.slug}`, `${p.description} (${p.status})`),
    ),
    "",
    "## Blog posts",
    ...posts.map((p) => line(p.title, `${url}/blog/${p.slug}`, p.description)),
    ...mdxPosts.map((p) =>
      line(p.metadata.title, `${url}/blogs/${p.slug}`, p.metadata.summary),
    ),
    "",
    "## Elsewhere",
    ...socialLinks.map((l) => line(l.name, l.href)),
    "",
    "## Optional",
    line("Sitemap", `${url}/sitemap.xml`),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
