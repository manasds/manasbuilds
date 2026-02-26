import type { Metadata } from "next";
import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import { Container } from "@/components/container";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id, title, slug, publishedAt, body, image, description
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 60 } };

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`,
    {},
    options
  );
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug }, options);

  if (!post) return {};

  const baseUrl = "https://manasbuilds.me";
  const url = `${baseUrl}/blog1/${slug}`;
  const imageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(630).url() ?? `${baseUrl}/og-blog-default.png`
    : `${baseUrl}/og-blog-default.png`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const postImageUrl = post.image
    ? urlFor(post.image)?.url()
    : null;

  return (
    <Container className="max-w-3xl ">
      <Link href="/blog1" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <div className="flex items-center justify-center">
        <img
          src={postImageUrl}
          alt={post.title}
          className="rounded-xl w-80 h-auto"
          style={{ maxWidth: "100%" }}
        />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      {/* manas */}
      <div className="text-lg font-mono">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </Container>
  );
}