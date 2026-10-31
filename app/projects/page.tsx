import { Container } from "@/components/container";
import React from "react";
import { ProjectBox } from "@/components/projects/projectbox";
import { projects } from "@/data/projects/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects Manas is building and has shipped, including Flint (peer-to-peer file sharing), an image resizer and Quicknote.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return (
    <div className="h-screen">
      <h1 className="sr-only">Projects</h1>
      <Container
        className="flex justify-center px-1"
      >
        <div className="px-2 md:grid md:grid-cols-2 md:gap-6 flex flex-col ">
          {projects.map((p) => (
            <ProjectBox
              key={p.id}
              title={p.title}
              status={p.status}
              content={p.content}
              id={p.id}
              url={p.url}
              src={p.src}
              slug={p.slug}
              bg={p.bg}
              description={p.description}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
