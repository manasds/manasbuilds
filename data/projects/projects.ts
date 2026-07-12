export type projecttype = {
  id: number;
  title: string;
  slug: string;
  date?: string;
  status: "building" | "live";
  content: string;
  url: string;
  github?: string;
  src: string;
};
// available images in the public/images folder
const images = [
  "bg1.avif",
  "bg2.jpg",
  "bg3.avif",
  "bg4.png",
  "bg6.png",
  "bg9.png",
  "bg8.png",
  "bg10.png",
];

export const projects: projecttype[] = [
  {
    id: 1,
    title: "quicknote",
    slug: "quicknote",
    date: "2026-03-15",
    status: "building",
    content: "take notes directly from browser to your obsidian vault",
    url: "https://github.com/manasds",
    src: "/images/bg8.png",
  },
  {
    id: 2,
    title: "flint",
    slug: "flint",
    date: "2026-07-09",
    status: "live",
    content:
      "share files between two browsers without any server",
    url: "https://flint.manasbuilds.me",
    github: "https://github.com/manasds/flint",
    src: "/images/bg2.jpg",
  },
  {
    id: 3,
    title: "image-resizer",
    slug: "image-resizer",
    date: "2026-07-12",
    status: "live",
    content: "resize yoour images easily now",
    url: "https://image-resize-md.vercel.app",
    github: "https://github.com/manasds/backend-stuff/src/job",
    src: "/images/bg3.avif",
  },
];
