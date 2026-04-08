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
  pageExtensions: ["ts", "tsx", "mdx"],
  allowedDevOrigins : ["10.230.8.125"]
};

export default nextConfig ; 
