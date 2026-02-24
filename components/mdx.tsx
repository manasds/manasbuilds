import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";

type HeadingProps = {
  children: ReactNode;
};

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: HeadingProps) => {
    const plainText =
      typeof children === "string" ? children : String(children ?? "");
    const id = slugify(plainText);

    const Tag = `h${level}` as const;

    return (
      <Tag id={id}>
        <a href={`#${id}`} className="anchor" aria-label={plainText} />
        {children}
      </Tag>
    );
  };

  return Heading;
}

function CustomLink(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={props.className}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
    />
  );
}

function RoundedImage(props: ComponentPropsWithoutRef<typeof Image>) {
  return (
    <Image
      {...props}
      className={`rounded-xl ${props.className ?? ""}`}
      alt={props.alt ?? ""}
    />
  );
}

const mdxComponents = {
  a: CustomLink,
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // Fallback to plain img if dimensions are unknown.
    // You can switch to next/image in your MDX by importing Image explicitly.
    <img {...props} className={`rounded-xl ${props.className ?? ""}`} />
  ),
  Image: RoundedImage,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
};

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: false,
};

export function CustomMDX({ source }: { source: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none ">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
               
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                },
              ],
              [
        
                rehypePrettyCode,
                rehypePrettyCodeOptions,
              ],
            ],
          },
        }}
      />
    </div>
  );
}

