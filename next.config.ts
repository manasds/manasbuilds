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
};

export default nextConfig;
