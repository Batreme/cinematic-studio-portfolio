export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  role: string;
  summary: string;
  heroImage: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "revelation-os",
    title: "Aura Spatial Interface",
    client: "Aura Dynamics",
    year: "2026",
    category: "Product & Spatial UX",
    role: "Lead Architecture & Design",
    summary: "A next-generation spatial computing environment engineered for zero-latency creative production.",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    metrics: [
      { label: "Performance", value: "60 FPS" },
      { label: "Latency", value: "<12ms" }
    ]
  },
  {
    id: "2",
    slug: "spyker-aerodynamics",
    title: "Kinetic Velocity Study",
    client: "Spyker Automobili",
    year: "2026",
    category: "Bespoke Automotive",
    role: "Creative Direction & Engineering",
    summary: "Sculptural aerodynamics and telemetry visualizations celebrating raw mechanical precision.",
    heroImage: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    metrics: [
      { label: "Downforce", value: "+38%" },
      { label: "Drag Coeff", value: "0.28 Cd" }
    ]
  },
  {
    id: "3",
    slug: "tokonoma-pavilion",
    title: "Monolithic Sound Architecture",
    client: "Tokonoma Kyoto",
    year: "2025",
    category: "Exhibition & Digital Space",
    role: "Sound & Interaction Design",
    summary: "An acoustic pavilion investigating the quiet tension between raw brutalist stone and generative audio.",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    featured: false
  },
  {
    id: "4",
    slug: "velour-editorial",
    title: "Cinematic Rhythm Series",
    client: "Velour Pictures",
    year: "2025",
    category: "Film Direction",
    role: "Visual Production",
    summary: "Experimental 35mm film captures tracing nocturnal industrial choreography in Berlin and Tokyo.",
    heroImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80",
    featured: false
  }
];
