export interface PhotoExif {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutter: string;
  iso: string;
  filmStock: string;
  format: string;
  location: string;
  coordinates: string;
  year: string;
  aspectRatio: string;
}

export interface PhotoWork {
  id: string;
  slug: string;
  title: string;
  series: string;
  category: "35mm Monochrome" | "Editorial" | "Architecture & Stills";
  image: string;
  thumbImage?: string;
  isFlagship?: boolean;
  exif: PhotoExif;
  curatorNote: string;
  edition: string;
}

export const PHOTO_WORKS: PhotoWork[] = [
  {
    id: "photo-01",
    slug: "solitude-at-noon",
    title: "Study No. 01: Solitude at Noon",
    series: "Imperial Lawns",
    category: "35mm Monochrome",
    image: "/images/hero-solitude.jpg",
    isFlagship: true,
    edition: "Edition of 12 + 2 AP",
    curatorNote:
      "A study in radical stillness. The figure reclines in absolute repose upon the sunlit turf of Kitanomaru, anchored between the vast open sky and the distant silhouettes of ancient stone walls and cedar trees. Exposed on silver gelatin grain with pushed contrast.",
    exif: {
      camera: "Leica M6 Classic 0.72",
      lens: "Leica Summicron-M 35mm f/2 ASPH",
      focalLength: "35mm (Scanned & Cropped)",
      aperture: "f/8.0",
      shutter: "1/500s",
      iso: "400 (EI 800)",
      filmStock: "Ilford HP5 Plus (D-76 1:1)",
      format: "35mm Silver Gelatin",
      location: "Tokyo, Japan",
      coordinates: "35.6908° N, 139.7505° E",
      year: "2024",
      aspectRatio: "3:2"
    }
  },
  {
    id: "photo-02",
    slug: "brutalist-shadows",
    title: "Study No. 02: Monolith & Horizon",
    series: "Architectural Silence",
    category: "Architecture & Stills",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    edition: "Edition of 10",
    curatorNote:
      "Geometry of raw concrete cast under late afternoon rake light. The deep shadows carve dramatic structural chasms, testing the latitude of high-acutance monochrome emulsion.",
    exif: {
      camera: "Hasselblad 500 C/M",
      lens: "Carl Zeiss Planar 80mm f/2.8 T*",
      focalLength: "80mm",
      aperture: "f/11.0",
      shutter: "1/125s",
      iso: "100",
      filmStock: "Kodak T-Max 100 (Rodinal 1:50)",
      format: "6x6 Medium Format",
      location: "Berlin, Germany",
      coordinates: "52.5200° N, 13.4050° E",
      year: "2025",
      aspectRatio: "1:1"
    }
  },
  {
    id: "photo-03",
    slug: "nocturne-transit",
    title: "Study No. 03: Shinjuku Subterranean",
    series: "Nocturne Transit",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85",
    edition: "Edition of 15",
    curatorNote:
      "A fleeting gesture across the platform as the midnight express departs. Motion blur captures kinetic speed while the subject remains suspended in sharp temporal focus.",
    exif: {
      camera: "Leica MP 0.72",
      lens: "Voigtländer Nokton 50mm f/1.2 Aspherical",
      focalLength: "50mm",
      aperture: "f/1.4",
      shutter: "1/60s",
      iso: "1600",
      filmStock: "Kodak Tri-X 400 (Pushed to 1600 in Microphen)",
      format: "35mm Monochrome",
      location: "Tokyo, Japan",
      coordinates: "35.6895° N, 139.7005° E",
      year: "2025",
      aspectRatio: "3:2"
    }
  },
  {
    id: "photo-04",
    slug: "whispering-pine",
    title: "Study No. 04: The Solitary Cedar",
    series: "Elemental Landscape",
    category: "35mm Monochrome",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1600&q=85",
    edition: "Edition of 8",
    curatorNote:
      "High mountain winds bending ancient needles against an overcast vapor sky. The tonal range transitions from dense charcoal bark to translucent gray fog.",
    exif: {
      camera: "Nikon F3HP",
      lens: "Nikkor 50mm f/1.4 AI-s",
      focalLength: "50mm",
      aperture: "f/5.6",
      shutter: "1/250s",
      iso: "400",
      filmStock: "Ilford Delta 400",
      format: "35mm Film",
      location: "Nagano, Japan",
      coordinates: "36.6513° N, 138.1810° E",
      year: "2024",
      aspectRatio: "3:2"
    }
  },
  {
    id: "photo-05",
    slug: "tactile-gesture",
    title: "Study No. 05: Sculptor's Hands",
    series: "Atelier Chronology",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1600&q=85",
    edition: "Edition of 12",
    curatorNote:
      "Macro framing of clay-caked fingers shaping raw porcelain. Macro depth-of-field isolates fine skin whorls and drying slips of ceramic mud.",
    exif: {
      camera: "Leica M-A (Typ 127)",
      lens: "Leica APO-Summicron-M 50mm f/2 ASPH",
      focalLength: "50mm",
      aperture: "f/2.4",
      shutter: "1/180s",
      iso: "320",
      filmStock: "Kodak Tri-X 400",
      format: "35mm Film",
      location: "Kyoto, Japan",
      coordinates: "35.0116° N, 135.7681° E",
      year: "2024",
      aspectRatio: "3:2"
    }
  },
  {
    id: "photo-06",
    slug: "coastal-tide-mist",
    title: "Study No. 06: Pacific Low Tide",
    series: "Elemental Landscape",
    category: "35mm Monochrome",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
    edition: "Edition of 10",
    curatorNote:
      "A quiet 3-second bulb exposure smoothing out ocean surges across basalt reefs. Mist rises into dense morning air, creating an infinite gradient of silver.",
    exif: {
      camera: "Mamiya 7 II",
      lens: "Mamiya 43mm f/4.5 L with Finder",
      focalLength: "43mm (Ultra-wide)",
      aperture: "f/16.0",
      shutter: "3.2s (ND1000 Filter)",
      iso: "50",
      filmStock: "Ilford Pan F Plus",
      format: "6x7 Medium Format",
      location: "Kamakura, Japan",
      coordinates: "35.3190° N, 139.5467° E",
      year: "2025",
      aspectRatio: "4:3"
    }
  },
  {
    id: "photo-07",
    slug: "glass-facade-refraction",
    title: "Study No. 07: Ginza Prism Grid",
    series: "Architectural Silence",
    category: "Architecture & Stills",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    edition: "Edition of 18",
    curatorNote:
      "Interlocking curtain wall facets creating a rhythmic moiré pattern. Razor-sharp optical rendering with zero chromatic aberration.",
    exif: {
      camera: "Leica S3 Medium Format",
      lens: "Leica Summarit-S 70mm f/2.5 ASPH CS",
      focalLength: "70mm",
      aperture: "f/8.0",
      shutter: "1/350s",
      iso: "200",
      filmStock: "Digital Medium Format Monochrome",
      format: "Pro Leica DNG",
      location: "Tokyo, Japan",
      coordinates: "35.6712° N, 139.7665° E",
      year: "2026",
      aspectRatio: "3:2"
    }
  },
  {
    id: "photo-08",
    slug: "studio-portrait-shadow",
    title: "Study No. 08: Profile in Oblique Light",
    series: "Editorial",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85",
    edition: "Edition of 8",
    curatorNote:
      "A classic Rembrandt key light carving high cheekbones in pitch darkness. Pure sculptural chiaroscuro captured on large format sheet film.",
    exif: {
      camera: "Linhof Master Technika 4x5",
      lens: "Schneider Kreuznach Symmar-S 210mm f/5.6",
      focalLength: "210mm",
      aperture: "f/11.0",
      shutter: "1/60s (Strobe Sync)",
      iso: "100",
      filmStock: "Kodak Tri-X 320 Sheet Film",
      format: "4x5 Large Format Sheet",
      location: "Studio Meguro, Tokyo",
      coordinates: "35.6415° N, 139.6981° E",
      year: "2026",
      aspectRatio: "5:4"
    }
  }
];
