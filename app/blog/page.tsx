import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { Container } from "@/components/container";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { DashedSeparator } from "@/components/dashed-separator";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, description, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  console.log(posts);
  return (
    <div className="min-h-screen relative font-mono">
      <Container className="relative z-10 pt-16 max-w-3xl mx-auto pb-16">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Blogs</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Notes on things I build and learn along the way.
          </p>
        </header>

        <section className="space-y-4">
          {posts.map((post) => (
            <div className="py-4 relative">
              <Link  href={`/blog/${post.slug.current}`}  key={post._id} className="space-y-1">
                <h2 className="text-lg font-medium hover:underline underline-offset-4">
                    {post.title}
                </h2>
                <p className="text-sm text-neutral-400">{post.description}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  
                </p>
              </Link>
              <DashedSeparator dashWidth={16} gap={12} className="text-neutral-300 dark:text-neutral-600 absolute bottom-0 "  />
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              No posts yet. Stay tuned.
            </p>
          )}
        </section>
      </Container>
    </div>
  );
}
