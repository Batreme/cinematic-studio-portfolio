"use client";

import React from "react";
import { Aperture, Compass, Film, Layers, Sparkles } from "lucide-react";

interface ArtistStatementProps {
  onOpenInquiry: () => void;
}

export function ArtistStatement({ onOpenInquiry }: ArtistStatementProps) {
  return (
    <section id="statement" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      
      {/* 2-Column Philosophy & Technical Manifesto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Philosophical Headline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-accent font-medium">
              Curatorial Philosophy
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase leading-[1.05]">
            The Silver Negative as an Act of Resolute Stillness
          </h2>

          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            In an era of relentless algorithmic velocity and disposable imagery, our studio commits to the deliberate cadence of analog mechanical tools. Each frame is an unrepeatable physical artifact exposed upon silver halide crystals.
          </p>

          <div className="pt-4">
            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#f4f0e5] transition-all hover:scale-105"
            >
              <span>Initiate Studio Commission</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Right Column: Technical Apparatus & Studio Specifications */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Optical Precision */}
          <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-3">
            <Aperture className="w-5 h-5 text-accent" />
            <h3 className="text-base font-normal uppercase text-white tracking-tight">
              Rangefinder Mechanics
            </h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Exclusively utilizing optical rangefinders (Leica M-series) and medium format leaf-shutter systems. No digital lag, no electronic viewfinder latency—pure direct optical alignment with reality.
            </p>
          </div>

          {/* Card 2: Gelatin Chemistry */}
          <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-3">
            <Film className="w-5 h-5 text-accent" />
            <h3 className="text-base font-normal uppercase text-white tracking-tight">
              Darkroom Gelatin
            </h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Traditional wet darkroom chemistry. Pushed development in Kodak D-76 and Microphen formulations to achieve tactile micro-contrast, deep blacks, and nuanced mid-tone separation.
            </p>
          </div>

          {/* Card 3: Archival Substrate */}
          <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-3">
            <Layers className="w-5 h-5 text-accent" />
            <h3 className="text-base font-normal uppercase text-white tracking-tight">
              Museum-Grade Baryta
            </h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Printed on heavy Hahnemühle Photo Rag Baryta 315gsm 100% cotton rag. True barium sulfate coating ensures archival stability exceeding 120 years under museum conservation conditions.
            </p>
          </div>

          {/* Card 4: Curated Provenance */}
          <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-3">
            <Compass className="w-5 h-5 text-accent" />
            <h3 className="text-base font-normal uppercase text-white tracking-tight">
              Numbered Editions
            </h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              All acquisitions are strictly limited to single-digit or low-teen editions. Accompanied by embossed studio certification, serialized holographic seal, and permanent ledger entry.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
