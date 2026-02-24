import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type BlogMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  tags?: string[];
  draft?: boolean;
  coverImage?: string;
  ogImage?: string;
};

export type BlogPost = {
  slug: string;
  metadata: BlogMetadata;
  content: string;
  readingTime: string;
};

const BLOG_DIR = path.join(process.cwd(), "data", "blog");

function getPostFileNames(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
}

function parsePostFromFile(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(raw);

  const metadata: BlogMetadata = {
    title: String(data.title ?? slug),
    publishedAt: String(
      data.publishedAt ?? new Date().toISOString().slice(0, 10),
    ),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    draft:
      typeof data.draft === "boolean"
        ? data.draft
        : String(data.draft ?? "false") === "true",
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    ogImage: data.ogImage ? String(data.ogImage) : undefined,
  };

  const stats = readingTime(content);

  return {
    slug,
    metadata,
    content,
    readingTime: stats.text,
  };
}

export function getAllPosts(): BlogPost[] {
  const files = getPostFileNames();
  const posts = files.map(parsePostFromFile);

  const publishedPosts = posts.filter((post) => !post.metadata.draft);

  publishedPosts.sort((a, b) => {
    const aTime = new Date(a.metadata.publishedAt).getTime();
    const bTime = new Date(b.metadata.publishedAt).getTime();
    return bTime - aTime;
  });

  return publishedPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fileName = `${slug}.mdx`;
  const fullPath = path.join(BLOG_DIR, fileName);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const post = parsePostFromFile(fileName);

  if (post.metadata.draft) {
    return null;
  }

  return post;
}

export function getAllSlugs(): string[] {
  return getPostFileNames().map((file) => file.replace(/\.mdx$/, ""));
}

