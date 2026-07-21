import { Hero } from "@/components/hero";
import { BlogPreview } from "@/components/home/blog-preview";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { Container } from "@/components/container";

export default function Home() {
  return (
    <div className="min-h-screen font-mono relative">
      <Hero />
      <Container className="relative z-10 pb-20 space-y-20 pt-8">
        <ProjectsPreview />
        <BlogPreview />
      </Container>
    </div>
  );
}
