import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "../../../components/container";
import { CustomMDX } from "@/components/mdx";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";
import { siteConfig, absoluteUrl } from "@/lib/site";

type BlogPageParams = {
  slug: string;
};

export function generateStaticParams() {
  const slugs = getAllSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const { title, summary, publishedAt, ogImage } = post.metadata;

  const url = absoluteUrl(`/blogs/${post.slug}`);
  const image = ogImage ?? absoluteUrl(siteConfig.ogImage);

  return {
    title,
    description: summary,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title,
      description: summary,
      type: "article",
      publishedTime: publishedAt,
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<BlogPageParams>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(
    post.metadata.publishedAt,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const url = absoluteUrl(`/blogs/${post.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.summary,
    datePublished: post.metadata.publishedAt,
    url,
    mainEntityOfPage: url,
    image: post.metadata.ogImage ?? absoluteUrl(siteConfig.ogImage),
    keywords: post.metadata.tags,
    author: { "@type": "Person", name: siteConfig.author, url: siteConfig.url },
  };

  return (
    <div className="min-h-screen relative font-mono">
      <JsonLd data={jsonLd} />
      <Container className="relative z-10 pt-16 max-w-3xl mx-auto pb-16">
        <article>
          <header className="mb-8">
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-1">
              {formattedDate} · {post.readingTime}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              {post.metadata.title}
            </h1>
            {post.metadata.summary && (
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                {post.metadata.summary}
              </p>
            )}
          </header>

          <CustomMDX source={post.content} />
        </article>
      </Container>
    </div>
  );
}

