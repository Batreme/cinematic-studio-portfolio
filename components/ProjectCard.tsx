"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col bg-surface/50 border border-border rounded-xl overflow-hidden hover:border-accent/40 transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-[10px] font-mono tracking-wider text-text-muted uppercase">
            {project.year}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs font-mono tracking-widest uppercase text-accent">
              {project.category}
            </span>
            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </div>

          <h3 className="text-2xl font-normal tracking-tight text-text-primary group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-text-muted leading-relaxed mt-2 line-clamp-2">
            {project.summary}
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between text-xs font-mono text-text-muted">
          <span>{project.client}</span>
          <span>{project.role}</span>
        </div>
      </div>
    </article>
  );
}
