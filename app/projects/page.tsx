import { Container } from "@/components/container";
import React from "react";
import { ProjectBox } from "@/components/projects/projectbox";
import { projects } from "@/data/projects/projects";

export default function Projects() {
  return (
    <div className="h-screen">
      <Container
        className="flex justify-center px-1"
        //       style={{
        //         backgroundImage: `
        //   repeating-linear-gradient(to bottom, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px),
        //   repeating-linear-gradient(to bottom, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px) ,
        //   repeating-linear-gradient(to bottom, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px) ,
        //   repeating-linear-gradient(to right, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)
        // `,
        //         backgroundSize: "1px 100%, 1px 100% , 1px 100% , 100% 1px",
        //         backgroundPosition: "left top, right top , center top, left center",
        //         backgroundRepeat: "no-repeat",
        //       }}
      >
        <div className="px-2 md:grid md:grid-cols-2 md:gap-6 flex flex-col ">
          {projects.map((p) => (
            <ProjectBox
              title={p.title}
              status={p.status}
              content={p.content}
              id={p.id}
              url={p.url}
              src={p.src}
              slug={p.slug}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
