"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Aperture, MapPin, Film, Sliders, Calendar, Sparkles } from "lucide-react";
import { PhotoWork } from "@/data/photography";
import { cameraSound } from "@/lib/sound";

interface ExifInspectorModalProps {
  photo: PhotoWork | null;
  allPhotos: PhotoWork[];
  onClose: () => void;
  onSelectPhoto: (p: PhotoWork) => void;
  onOpenInquiry: (photoTitle?: string) => void;
}

export function ExifInspectorModal({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
  onOpenInquiry,
}: ExifInspectorModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, allPhotos]);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);

  const handleNext = () => {
    cameraSound.playApertureClick();
    const nextIdx = (currentIndex + 1) % allPhotos.length;
    onSelectPhoto(allPhotos[nextIdx]);
  };

  const handlePrev = () => {
    cameraSound.playApertureClick();
    const prevIdx = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    onSelectPhoto(allPhotos[prevIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Container Frame */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/10 transition-colors"
          title="Close Inspector (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo Visual with Optical Frame */}
        <div className="relative flex-1 bg-black/50 min-h-[350px] lg:min-h-full flex items-center justify-center p-6 overflow-hidden">
          
          {/* Framelines inside modal */}
          <div className="absolute inset-4 pointer-events-none border border-white/10 rounded-lg">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40" />
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.image}
            alt={photo.title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-md grayscale contrast-110 drop-shadow-2xl"
          />

          {/* Prev/Next Overlay Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/10 transition-all hover:scale-105"
            title="Previous Photo (←)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/10 transition-all hover:scale-105"
            title="Next Photo (→)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Photo Index indicator */}
          <div className="absolute bottom-6 left-6 text-[10px] font-mono tracking-widest text-white/60 bg-black/70 px-3 py-1 rounded-full border border-white/10">
            FRAME {currentIndex + 1} OF {allPhotos.length}
          </div>
        </div>

        {/* Right Side: EXIF Telemetry Drawer */}
        <div className="w-full lg:w-[440px] flex flex-col justify-between p-6 md:p-8 bg-surface-elevated/95 overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10">
          
          <div className="space-y-6">
            
            {/* Header / Series */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-accent/15 border border-accent/30 text-[10px] font-mono tracking-widest text-accent uppercase font-medium">
                  {photo.category}
                </span>
                <span className="text-[11px] font-mono text-white/50 tracking-wider">
                  {photo.series}
                </span>
              </div>
              <h2 className="text-2xl font-light tracking-tight text-white uppercase">
                {photo.title}
              </h2>
              <div className="text-xs font-mono text-white/50 mt-1 flex items-center gap-3">
                <span>{photo.edition}</span>
                <span>•</span>
                <span>{photo.exif.year}</span>
              </div>
            </div>

            {/* Curator Note */}
            <div className="bg-background/60 p-4 rounded-xl border border-white/5">
              <div className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-accent" />
                <span>Curatorial Analysis</span>
              </div>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                {photo.curatorNote}
              </p>
            </div>

            {/* Technical EXIF Grid */}
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-accent font-semibold mb-3 flex items-center gap-1.5">
                <Aperture className="w-3.5 h-3.5" />
                <span>Technical EXIF Telemetry</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                
                {/* Camera Body */}
                <div className="p-2.5 rounded-lg bg-background/50 border border-white/5">
                  <span className="text-[9px] text-white/40 block uppercase">Camera Body</span>
                  <span className="text-white font-medium text-[11px] truncate block" title={photo.exif.camera}>
                    {photo.exif.camera}
                  </span>
                </div>

                {/* Lens */}
                <div className="p-2.5 rounded-lg bg-background/50 border border-white/5">
                  <span className="text-[9px] text-white/40 block uppercase">Optical Lens</span>
                  <span className="text-white font-medium text-[11px] truncate block" title={photo.exif.lens}>
                    {photo.exif.lens}
                  </span>
                </div>

                {/* Aperture */}
                <div className="p-2.5 rounded-lg bg-background/50 border border-white/5">
                  <span className="text-[9px] text-white/40 block uppercase">Aperture</span>
                  <span className="text-accent font-semibold text-xs">
                    {photo.exif.aperture}
                  </span>
                </div>

                {/* Shutter */}
                <div className="p-2.5 rounded-lg bg-background/50 border border-white/5">
                  <span className="text-[9px] text-white/40 block uppercase">Shutter Speed</span>
                  <span className="text-white font-semibold text-xs">
                    {photo.exif.shutter}
                  </span>
                </div>

                {/* ISO */}
                <div className="p-2.5 rounded-lg bg-background/50 border border-white/5">
                  <span className="text-[9px] text-white/40 block uppercase">Sensitivity</span>
                  <span className="text-white font-semibold text-xs">
                    ISO {photo.exif.iso}
                  </span>
                </div>

                {/* Focal Length */}
                <div className="p-2.5 rounded-lg bg-background/50 border border-white/5">
                  <span className="text-[9px] text-white/40 block uppercase">Focal Length</span>
                  <span className="text-accent font-semibold text-xs">
                    {photo.exif.focalLength}
                  </span>
                </div>

                {/* Film Stock */}
                <div className="col-span-2 p-2.5 rounded-lg bg-background/50 border border-white/5 flex items-center gap-2">
                  <Film className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[9px] text-white/40 block uppercase">Film Emulsion & Dev</span>
                    <span className="text-white font-medium text-[11px] truncate block">
                      {photo.exif.filmStock} ({photo.exif.format})
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="col-span-2 p-2.5 rounded-lg bg-background/50 border border-white/5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[9px] text-white/40 block uppercase">Location & GPS</span>
                    <span className="text-white font-medium text-[11px] truncate block">
                      {photo.exif.location} • {photo.exif.coordinates}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Action / Print Acquisition Button */}
          <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenInquiry(photo.title);
              }}
              className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
            >
              <span>Acquire Archival Print</span>
              <span>→</span>
            </button>
            <div className="text-center text-[10px] font-mono text-white/40">
              Hahnemühle Photo Rag Baryta 315gsm • Hand-Signed
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
