"use client";

import React, { useState, useEffect } from "react";
import { Aperture, Volume2, VolumeX, Menu, X } from "lucide-react";
import { cameraSound } from "@/lib/sound";

interface NavbarProps {
  onOpenInquiry: () => void;
  onOpenFlagshipExif: () => void;
}

export function Navbar({ onOpenInquiry, onOpenFlagshipExif }: NavbarProps) {
  const [timeString, setTimeString] = useState<string>("");
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const next = cameraSound.toggleMute();
    setIsMuted(next);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 pointer-events-none">
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-background/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-auto">
        
        {/* Brand & Studio ID */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 group text-white font-mono text-xs font-semibold tracking-widest uppercase hover:text-accent transition-colors"
          >
            <Aperture className="w-4 h-4 text-accent transition-transform duration-500 group-hover:rotate-90" />
            <span>APERTURE STUDIO</span>
          </a>
          
          <span className="text-white/20 hidden sm:inline">/</span>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYS OK</span>
            <span className="text-white/30">•</span>
            <span>{timeString || "12:00:00"}</span>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-white/60">
          <a href="#" className="hover:text-white transition-colors">
            [ 01 VIEWING ]
          </a>
          <a href="#gallery" className="hover:text-white transition-colors">
            [ 02 STUDIES ]
          </a>
          <button
            onClick={onOpenFlagshipExif}
            className="hover:text-accent transition-colors text-white/70"
          >
            [ 03 EXIF MANIFEST ]
          </button>
          <a href="#statement" className="hover:text-white transition-colors">
            [ 04 ABOUT ]
          </a>
        </div>

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-2.5">
          
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            title="Toggle Audio Effects"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </button>

          {/* Book / Acquire Trigger */}
          <button
            onClick={onOpenInquiry}
            className="px-4 py-1.5 rounded-full bg-accent hover:bg-accent/90 text-white text-[11px] font-mono font-medium tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:scale-105"
          >
            Inquire / Acquire
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md bg-white/5 md:hidden text-white/80"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mt-3 bg-surface border border-white/10 rounded-2xl p-6 pointer-events-auto md:hidden shadow-2xl flex flex-col gap-4 font-mono text-xs">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-white/80 border-b border-white/5"
          >
            [ 01 VIEWING LENS ]
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-white/80 border-b border-white/5"
          >
            [ 02 CURATED STUDIES ]
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenFlagshipExif();
            }}
            className="py-2 text-left text-accent border-b border-white/5"
          >
            [ 03 EXIF MANIFEST ]
          </button>
          <a
            href="#statement"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-white/80 border-b border-white/5"
          >
            [ 04 ARTIST STATEMENT ]
          </a>
        </div>
      )}
    </header>
  );
}
