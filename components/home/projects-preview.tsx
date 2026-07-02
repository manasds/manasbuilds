import { ProjectBox } from "@/components/projects/projectbox";
import { SectionHeader } from "@/components/home/section-header";
import { projects } from "@/data/projects/projects";

const PREVIEW_COUNT = 3;

export function ProjectsPreview() {
  const previewProjects = projects.slice(0, PREVIEW_COUNT);

  return (
    <section>
      <SectionHeader
        title="Projects"
        description="Things I'm building and shipping."
        href="/projects"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewProjects.map((project) => (
          <ProjectBox key={project.id} {...project} />
        ))}
      </div>
      {previewProjects.length === 0 && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          No projects yet. Stay tuned.
        </p>
      )}
    </section>
  );
}
