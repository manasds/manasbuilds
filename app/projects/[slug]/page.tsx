import { Container } from "@/components/container";
import { projects } from "@/data/projects/projects";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="h-screen relative">
      <Container>
        <h1 className="text-4xl font-medium text-neutral-800 tracking-wider dark:text-neutral-200">
          {project.title}
        </h1>
        <div className="mt-4 text-neutral-500">{project.content}</div>
      </Container>
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 rounded-full w-80 h-12 border-neutral-200 border-2 flex justify-between px-8 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <a
          className="text-sm text-neutral-800 hover:text-blue-700"
          href={project.github}
        >
          View Repo
        </a>
        <a
          className="text-sm text-neutral-800 hover:text-blue-700"
          href={project.url}
        >
          View Live
        </a>
      </div>
    </div>
  );
}
