"use client";

import React from "react";
import { PROJECTS } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  return (
    <section id="work" className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-2">
            Selected Works
          </span>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-text-primary">
            Curated Showcase
          </h2>
        </div>
        <p className="text-sm text-text-muted max-w-md mt-4 md:mt-0 font-light">
          Reverse-engineered design tokens applied across multi-format digital experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
