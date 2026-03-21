import { Container } from "@/components/container";
import React from "react";
import { ProjectBox } from "@/components/projects/projectbox";
export default function Projects() {
  return (
    <div className="h-full flex justify-between">
      <Container
        className="flex justify-center px-1"
        style={{
          backgroundImage: `
    repeating-linear-gradient(to bottom, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px),
    repeating-linear-gradient(to bottom, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)
  `,
          backgroundSize: "1px 100%, 1px 100%",
          backgroundPosition: "left top, right top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="px-2 grid grid-cols-2 gap-6">
          <ProjectBox />
          <ProjectBox />
          <ProjectBox />
          <ProjectBox />
        </div>
      </Container>
    </div>
  );
}
