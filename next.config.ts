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
    // AVIF first (smallest), WebP fallback for browsers without AVIF.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    remotePatterns: [
      new URL("https://api.microlink.io/**"),
      new URL("https://cdn.sanity.io/images/**"),
    ],
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  allowedDevOrigins: ["**.*"],
};

export default nextConfig;
