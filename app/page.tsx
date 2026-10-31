"use client";

import React, { useState } from "react";
import { FilmGrain } from "@/components/FilmGrain";
import { Navbar } from "@/components/Navbar";
import { HeroViewfinder } from "@/components/HeroViewfinder";
import { CuratedGallery } from "@/components/CuratedGallery";
import { ArtistStatement } from "@/components/ArtistStatement";
import { Footer } from "@/components/Footer";
import { ExifInspectorModal } from "@/components/ExifInspectorModal";
import { InquiryDrawer } from "@/components/InquiryDrawer";
import { PHOTO_WORKS, PhotoWork } from "@/data/photography";

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWork | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryPhotoTitle, setInquiryPhotoTitle] = useState<string | undefined>(undefined);

  const handleOpenFlagshipExif = () => {
    setSelectedPhoto(PHOTO_WORKS[0]);
  };

  const handleOpenInquiry = (photoTitle?: string) => {
    setInquiryPhotoTitle(photoTitle || "Study No. 01: Solitude at Noon");
    setIsInquiryOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-text-primary selection:bg-accent selection:text-white relative">
      {/* 35mm Analog Film Grain & Optical Vignette Overlay */}
      <FilmGrain />

      {/* Cinematic HUD Navbar */}
      <Navbar
        onOpenInquiry={() => handleOpenInquiry()}
        onOpenFlagshipExif={handleOpenFlagshipExif}
      />

      {/* Hero Viewfinder: Pinned Scroll-Scrub Optical Zoom (24mm ➔ 85mm) */}
      <HeroViewfinder
        onOpenExif={handleOpenFlagshipExif}
        onOpenInquiry={() => handleOpenInquiry("Study No. 01: Solitude at Noon")}
      />

      {/* Curated Monochrome Studies & Editorial Gallery */}
      <CuratedGallery
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />

      {/* Curatorial Philosophy & Technical Apparatus */}
      <ArtistStatement
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Studio Colophon & Optical Coordinates */}
      <Footer
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Technical EXIF Telemetry Inspection Modal */}
      <ExifInspectorModal
        photo={selectedPhoto}
        allPhotos={PHOTO_WORKS}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        onOpenInquiry={(title) => handleOpenInquiry(title)}
      />

      {/* Studio Booking & Print Acquisition Slide-over Drawer */}
      <InquiryDrawer
        isOpen={isInquiryOpen}
        initialPhotoTitle={inquiryPhotoTitle}
        onClose={() => setIsInquiryOpen(false)}
      />
    </main>
  );
}
