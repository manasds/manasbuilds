import { Container } from "../../components/container";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Separator } from "@/components/ui/separator";
export const metadata = {
  title: "Blog | Manas Builds",
  description:
    "Writing about web development, side projects, and things I am learning.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen relative font-mono">
      <Container className="relative z-10 pt-16 max-w-3xl mx-auto pb-16">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Writings
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Notes on things I build and learn along the way.
          </p>
        </header>

        <section className="space-y-6">
          {posts.map((post) => (
            <>
            <article key={post.slug} className="space-y-1">
              <h2 className="text-lg font-medium">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline underline-offset-4"
                >
                  {post.metadata.title}
                </Link>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                {new Date(post.metadata.publishedAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  },
                )}
                · {post.readingTime}
              </p>
              {post.metadata.summary && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {post.metadata.summary}
                </p>
              )}
            </article>
            <Separator />
            </>
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
