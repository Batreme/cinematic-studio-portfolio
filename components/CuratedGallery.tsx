"use client";

import React, { useState } from "react";
import { PhotoWork, PHOTO_WORKS } from "@/data/photography";
import { Aperture, Maximize2, Sparkles, Filter } from "lucide-react";
import { cameraSound } from "@/lib/sound";

interface CuratedGalleryProps {
  onSelectPhoto: (p: PhotoWork) => void;
}

export function CuratedGallery({ onSelectPhoto }: CuratedGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "35mm Monochrome", "Editorial", "Architecture & Stills"];

  const filteredPhotos =
    activeCategory === "All"
      ? PHOTO_WORKS
      : PHOTO_WORKS.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (cat: string) => {
    cameraSound.playApertureClick();
    setActiveCategory(cat);
  };

  const handleCardClick = (photo: PhotoWork) => {
    cameraSound.playApertureClick();
    onSelectPhoto(photo);
  };

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-accent font-medium">
              Curated Monochrome Archive
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase">
            Selected Studies
          </h2>
          <p className="text-sm md:text-base text-white/60 font-light mt-2 max-w-xl">
            Gelatin silver prints, medium format negatives, and archival studies. Click any frame to activate the technical EXIF inspection terminal.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-white text-black border-white font-semibold shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                  : "bg-surface text-white/60 border-white/10 hover:text-white hover:border-white/30"
              }`}
            >
              {cat.toUpperCase()} {cat === "All" ? `(${PHOTO_WORKS.length})` : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPhotos.map((photo, index) => {
          // Give the flagship photo or first items distinct visual hierarchy
          const isSpanLarge = photo.isFlagship || index === 0;

          return (
            <div
              key={photo.id}
              onClick={() => handleCardClick(photo)}
              className={`group relative bg-surface border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)] ${
                isSpanLarge ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Image Container with Hover Zoom & Aspect Ratio */}
              <div
                className={`relative w-full overflow-hidden bg-black/60 ${
                  isSpanLarge ? "aspect-[16/10]" : "aspect-[4/5]"
                }`}
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover grayscale contrast-110 brightness-95 transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Hover Camera Viewfinder Marks */}
                <div className="absolute inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white" />

                  <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-mono text-accent">
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>INSPECT EXIF</span>
                  </div>
                </div>

                {/* Flagship Badge */}
                {photo.isFlagship && (
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-accent/40 text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>FLAGSHIP STUDY NO. 01</span>
                  </div>
                )}

                {/* Quick Telemetry Pill */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-white/80">
                    <Aperture className="w-3 h-3 text-accent" />
                    <span>{photo.exif.focalLength}</span>
                    <span className="text-white/30">•</span>
                    <span>{photo.exif.aperture}</span>
                    <span className="text-white/30">•</span>
                    <span>{photo.exif.shutter}</span>
                  </div>

                  <span className="text-[10px] font-mono text-white/60 bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 hidden sm:inline">
                    {photo.exif.filmStock}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between gap-3 bg-surface">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-light tracking-tight text-white uppercase group-hover:text-accent transition-colors">
                    {photo.title}
                  </h3>
                  <span className="text-xs font-mono text-white/40 tracking-wider">
                    {photo.exif.year}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-white/50 pt-2 border-t border-white/5">
                  <span className="text-white/40">{photo.series}</span>
                  <span className="text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Inspect</span>
                    <span>→</span>
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
