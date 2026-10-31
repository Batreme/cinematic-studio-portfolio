"use client";

import React from "react";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-end px-6 md:px-12 pb-16 pt-32 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono tracking-widest uppercase text-accent">
            Cinematic Motion Studio
          </span>
          <span className="text-xs font-mono tracking-widest text-text-muted uppercase">
            Edition 2026
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tighter leading-[0.95] text-text-primary">
          Aperture Studio: Cinematic 35mm Photography Portfolio & Interactive Optical Lens Viewfinder
        </h1>

        <p className="text-lg md:text-xl text-text-muted max-w-2xl font-light leading-relaxed mt-2">
          Engineered from reverse-engineered production architectures. Zero template fluff, precise typographic cadence, and deliberate negative space.
        </p>

        <div className="flex items-center gap-6 pt-4">
          <a
            href="#work"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-background font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            <span>Explore Archive</span>
            <ArrowDownRight className="w-4 h-4" />
          </a>
          <span className="text-xs font-mono tracking-widest text-text-muted uppercase">
            Scroll to inspect
          </span>
        </div>
      </div>
    </section>
  );
}
