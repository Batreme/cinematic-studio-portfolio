"use client";

import React from "react";

export function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* 35mm Analog Film Grain Overlay */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.065] mix-blend-overlay">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>

      {/* Optical Camera Lens Radial Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 45%, rgba(7, 7, 9, 0.45) 80%, rgba(7, 7, 9, 0.85) 100%)",
        }}
      />
    </div>
  );
}
