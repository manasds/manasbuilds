import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { codeToHtml } from "shiki";
import { client } from "@/sanity/client";
import Link from "next/link";
import { Container } from "@/components/container";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id, title, slug, publishedAt, body, image, description
}`;

type SanityPost = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  publishedAt?: string;
  body?: unknown[] | null;
  image?: SanityImageSource | null;
  description?: string;
};

type PortableTextObject =
  | PortableTextBlock
  | ({ _type: string } & Record<string, unknown>);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 60 } };

function isPortableTextObject(value: unknown): value is PortableTextObject {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { _type?: unknown })._type === "string"
  );
}

async function highlightCodeBlocks(body: PortableTextObject[]) {
  return Promise.all(
    body.map(async (block) => {
      if (block._type === "code") {
        const { code, language } = block as {
          code?: string;
          language?: string;
        };
        if (!code) return block;

        const html = await codeToHtml(code, {
          lang: language || "ts",
          theme: "github-dark",
          transformers: [
            {
              pre(node) {
                // Let our wrapper control the background, similar to /blog (rehype-pretty-code keepBackground: false)
                const props =
                  (node.properties as Record<string, unknown> | undefined) ??
                  {};
                delete props.style;
                node.properties = props as typeof node.properties;
              },
            },
          ],
        });

        return {
          ...block,
          highlightedCode: html,
        };
      }

      return block;
    }),
  );
}

const portableTextComponents = {
  types: {
    code: ({
      value,
    }: {
      value: { language?: string; code?: string; highlightedCode?: string };
    }) =>
      value.highlightedCode ? (
        <div
          className="my-6 overflow-x-auto rounded-xl border border-neutral-200/60 bg-neutral-900 p-4 text-sm dark:border-white/10 "
          dangerouslySetInnerHTML={{ __html: value.highlightedCode }}
        />
      ) : (
        <pre className="my-6 overflow-x-auto rounded-xl border border-neutral-200/60 bg-neutral-900 p-4 text-sm text-neutral-900 dark:border-white/10 dark:text-neutral-100">
          <code
            className={
              value.language ? `language-${value.language}` : undefined
            }
          >
            {value.code}
          </code>
        </pre>
      ),
    image: ({ value }: { value: SanityImageSource & { alt?: string } }) => {
      const imageUrl = urlFor(value)?.width(1200).url();
      if (!imageUrl) return null;
      return (
        <div className="my-6 flex justify-center">
          <img
            src={imageUrl}
            alt={value.alt ?? ""}
            className="max-h-120 w-full max-w-3xl rounded-xl object-contain"
          />
        </div>
      );
    },
  },
};

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`,
    {},
    options,
  );
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityPost | null>(
    POST_QUERY,
    { slug },
    options,
  );

  if (!post) return {};

  const baseUrl = "https://manasbuilds.me";
  const url = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.image
    ? (urlFor(post.image)?.width(1200).height(630).url() ??
      `${baseUrl}/og-blog-default.png`)
    : `${baseUrl}/og-blog-default.png`;

  const title = post.title ?? "Blog post";

  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
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
  const post = await client.fetch<SanityPost | null>(
    POST_QUERY,
    await params,
    options,
  );

  if (!post) {
    notFound();
  }

  const body = Array.isArray(post.body)
    ? post.body.filter(isPortableTextObject)
    : [];
  const bodyWithHighlight = await highlightCodeBlocks(body);
  const postImageUrl = post.image ? urlFor(post.image)?.url() : null;
  const title = post.title ?? "Untitled";
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString()
    : "Unpublished";

  return (
    <Container className="max-w-3xl ">
      <Link href="/blog" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <div className="flex items-center justify-center">
          <img
            src={postImageUrl}
            alt={title}
            className="rounded-xl w-80 h-auto"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
      <h1 className="text-4xl font-semibold">{title}</h1>
      {post.description && (
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          {post.description}
        </p>
      )}
      <div className="text-lg font-mono">
        <p className="text-xs mt-4 mb-16">Published: {publishedDate}</p>
        {bodyWithHighlight.length > 0 ? (
          <PortableText
            value={bodyWithHighlight}
            components={portableTextComponents}
          />
        ) : (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            This post does not have any content yet.
          </p>
        )}
      </div>
    </Container>
  );
}
