import {projects} from "@/data/projects/projects";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
export default async function ProjectPage({params} : {params : Promise<{slug : string}>}){
    const {slug} = await params ;
    const project = projects.find( (p) => p.slug === slug)
    if (!project) {
      notFound();
    }

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">{project.title}</h1>
      <div className="mt-4 text-neutral-500">{project.content}</div>
      {/* Your detailed project layout goes here */}
    </main>
  );
}