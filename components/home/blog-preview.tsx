import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { DashedSeparator } from "@/components/dashed-separator";
import { SectionHeader } from "@/components/home/section-header";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...4]{_id, description, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export async function BlogPreview() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <section>
      <SectionHeader
        title="Blog"
        description="Notes on things I build and learn along the way."
        href="/blog"
      />
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="py-4 relative">
            <Link
              href={`/blog/${post.slug.current}`}
              className="space-y-1 block"
            >
              <h3 className="text-lg font-medium hover:underline underline-offset-4">
                {post.title}
              </h3>
              {post.description && (
                <p className="text-sm text-neutral-400">{post.description}</p>
              )}
              <p className="text-xs text-neutral-500">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </Link>
            <DashedSeparator
              dashWidth={16}
              gap={12}
              className="text-neutral-300 dark:text-neutral-600 absolute bottom-0"
            />
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            No posts yet. Stay tuned.
          </p>
        )}
      </div>
    </section>
  );
}
