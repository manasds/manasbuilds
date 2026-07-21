export type projecttype = {
  id: number;
  title: string;
  slug: string;
  date?: string;
  status: "building" | "live";
  content: string;
  description : string ;
  url: string;
  github?: string;
  src?: string[];
  bg: string;
  images?: string[];
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
    title: "Flint",
    slug: "flint",
    date: "2026-07-09",
    status: "live",
    description :"Share file peer to peer without any login , signup or uploads" ,
    content: "Share file peer to peer without any login , signup or uploads , just drag and drop and share the link via Qr and you are done!!",
    url: "https://flint.manasbuilds.me",
    github: "https://github.com/manasds/flint",
    bg: "/images/bg2.jpg",
    src : ["/flint.png" , "/flint-2.png"]
  },
  {
    id: 2,
    title: "image-resizer",
    slug: "image-resizer",
    date: "2026-07-12",
    status: "live",
    content: "resize yoour images easily now",
    description : "resize yoour images easily now" ,
    url: "https://image-resize-md.vercel.app",
    github: "https://github.com/manasds/backend-stuff/src/job",
    bg: "/images/bg3.avif",
    src : ["/image-resize.png"]
  },
  {
    id: 3,
    title: "quicknote",
    slug: "quicknote",
    date: "2026-03-15",
    status: "building",
    content: "take notes directly from browser to your obsidian vault",
    description : "take notes directly from browser to your obsidian vault" ,
    url: "https://github.com/manasds",
    bg: "/images/bg8.png",
    
  },
];
