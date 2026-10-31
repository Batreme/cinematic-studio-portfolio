"use client";

import React from "react";
import { ArrowUpRight, Aperture, ChevronUp } from "lucide-react";
import { cameraSound } from "@/lib/sound";

interface FooterProps {
  onOpenInquiry: () => void;
}

export function Footer({ onOpenInquiry }: FooterProps) {
  const scrollToTop = () => {
    cameraSound.playApertureClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-surface border-t border-white/10 pt-24 pb-12 px-6 md:px-12 overflow-hidden">
      
      {/* Huge Background Typography watermark */}
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-16">
        
        {/* Massive Headline Callout */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-xs font-mono tracking-widest text-accent uppercase">
              Operational Studio Colophon
            </span>
          </div>

          <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter uppercase text-white/95 leading-[0.9]">
            The camera sees what escapes the eye.
          </h2>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenInquiry}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-mono text-xs font-semibold tracking-wider uppercase hover:bg-accent/90 transition-all hover:scale-105 shadow-[0_0_25px_rgba(99,102,241,0.3)]"
            >
              <span>Initiate Commission</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider uppercase border border-white/10 transition-colors"
            >
              <span>Reset Lens to 24mm</span>
              <ChevronUp className="w-4 h-4 text-accent" />
            </button>
          </div>
        </div>

        {/* Bottom Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-white/10 text-xs font-mono">
          
          <div>
            <span className="text-white/40 block mb-2 uppercase text-[10px]">Studio Coordinates</span>
            <p className="text-white/80 leading-relaxed">
              Aperture Studio<br />
              Meguro-ku, Tokyo<br />
              Kopernika, Warsaw
            </p>
          </div>

          <div>
            <span className="text-white/40 block mb-2 uppercase text-[10px]">Primary Optics</span>
            <p className="text-white/80 leading-relaxed">
              Leica M6 Classic • 35mm f/2 ASPH<br />
              Hasselblad 500 C/M • 80mm f/2.8<br />
              Linhof Technika 4x5
            </p>
          </div>

          <div>
            <span className="text-white/40 block mb-2 uppercase text-[10px]">Direct Dispatch</span>
            <p className="text-white/80 leading-relaxed">
              inquiries@aperturestudio.art<br />
              PGP Key: 0x8F3A29B1<br />
              Signal: +81 (0)3 5400-0199
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="text-white/40 block mb-2 uppercase text-[10px]">Edition Architecture</span>
              <p className="text-white/60 text-[11px] leading-relaxed">
                Engineered with Next.js 15, Framer Motion, and Web Audio API synthesis.
              </p>
            </div>
            <div className="text-[10px] text-white/30 pt-4">
              © {new Date().getFullYear()} APERTURE STUDIO. ALL RIGHTS RESERVED.
            </div>
          </div>

        </div>

      </div>

    </footer>
  );
}
