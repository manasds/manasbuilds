import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { BlogPreview } from "@/components/home/blog-preview";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.author,
      alternateName: "Manas",
      url: siteConfig.url,
      image: `${siteConfig.url}/manu.webp`,
      jobTitle: "Full Stack Developer",
      description: siteConfig.description,
      sameAs: siteConfig.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen font-mono relative">
      <JsonLd data={jsonLd} />
      <Hero />
      <Container className="relative z-10 pb-20 space-y-20 pt-8">
        <ProjectsPreview />
        <BlogPreview />
      </Container>
    </div>
  );
}
