import { Container } from "@/components/container";
import { projects } from "@/data/projects/projects";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: project.src?.[0] ? [{ url: project.src[0] }] : undefined,
    },
  };
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
        <h1 className="text-4xl font-medium text-neutral-800 tracking-wider dark:text-neutral-200 my-8">
          {project.title}
        </h1>
        <div className="flex gap-4">
          {project.src?.map((img) => (
            <img
              key={img}
              src={img}
              alt=""
              className="block max-h-64 w-auto object-contain"
            />
          ))}
        </div>
        <div className="mt-8 text-neutral-700 font-mono dark:text-neutral-100">{project.content}</div>
      </Container>
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 rounded-full w-80 h-12 flex justify-between px-8 items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_8px_32px_rgba(255,255,255,0.2)] ">
        <a
          className="text-sm text-neutral-800 dark:text-neutral-100  underline underline-offset-5 hover:scale-105 active:scale-100"
          href={project.github}
        >
          View Repo
        </a>
        <a
          className="text-sm text-neutral-800 dark:text-neutral-100 hover:text-blue-70 underline underline-offset-5 hover:scale-105 active:scale-100"
          href={project.url}
        >
          View Live
        </a>
      </div>
    </div>
  );
}
