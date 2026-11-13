import type { NextConfig } from "next";
// import createMDX from "@next/mdx";
// import rehypePrettyCode from "rehype-pretty-code";

// const withMDX = createMDX({
//   extension: /\.mdx?$/,
//   options: {
//     rehypePlugins: [
//       [
//         "rehype-pretty-code",
//         {
//           theme: {
//             dark: "github-dark",
//             light: "github-light",
//           },
//           keepBackground: false,
//         },
//       ],
//       "rehype-slug",
//       "rehype-autolink-headings",
//     ],
//     remarkPlugins: ["remark-gfm"],
//   },
// });

const nextConfig: NextConfig = {
  images: {
    // WebP only: AVIF is smaller but slower to encode on a cold cache and to
    // decode on low-end phones, which hurt mobile LCP.
    formats: ["image/webp"],
    qualities: [75],
    remotePatterns: [
      new URL("https://cdn.sanity.io/images/**"),
    ],
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  allowedDevOrigins: ["**.*"],
  // PostHog reverse proxy: events go to /ingest on our own domain so ad
  // blockers don't drop them. Set NEXT_PUBLIC_POSTHOG_REGION=eu for EU cloud.
  async rewrites() {
    const region = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";
    return [
      {
        source: "/ingest/static/:path*",
        destination: `https://${region}-assets.i.posthog.com/static/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `https://${region}.i.posthog.com/:path*`,
      },
    ];
  },
  // Required by PostHog's API (trailing-slash endpoints).
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
