"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Camera, Volume2, VolumeX, Eye, Aperture, ChevronDown } from "lucide-react";
import { cameraSound } from "@/lib/sound";

interface HeroViewfinderProps {
  onOpenExif?: () => void;
  onOpenInquiry?: () => void;
}

export function HeroViewfinder({ onOpenExif, onOpenInquiry }: HeroViewfinderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [focalDisplay, setFocalDisplay] = useState(24);
  const [apertureDisplay, setApertureDisplay] = useState("f/2.8");

  // Track scroll progress along the pinned 240vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics for buttery-smooth lens zoom response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // Zoom scale from 1.0 (24mm wide) to 2.85 (85mm telephoto portrait crop)
  const lensScale = useTransform(smoothProgress, [0, 1], [1.0, 2.85]);

  // Optical barrel blur / depth of field shift as you zoom into the subject
  const bgBlur = useTransform(smoothProgress, [0, 0.4, 1], ["0px", "0px", "0.5px"]);

  // Opacity of the establishing headline (fades out as lens zooms into the intimate crop)
  const titleOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const cropBadgeOpacity = useTransform(smoothProgress, [0.45, 0.85], [0, 1]);

  // Listen to progress to update digital HUD readouts
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      // Calculate continuous focal length from 24mm to 85mm
      const currentMm = Math.round(24 + latest * (85 - 24));
      setFocalDisplay(currentMm);

      // Interpolate realistic cinema prime aperture stops
      if (latest < 0.25) {
        setApertureDisplay("f/2.8");
      } else if (latest < 0.6) {
        setApertureDisplay("f/2.0");
      } else if (latest < 0.85) {
        setApertureDisplay("f/1.8");
      } else {
        setApertureDisplay("f/1.4");
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Subtle 3D mouse parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientWidth, clientHeight } = e.currentTarget;
    const x = (e.clientX / clientWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / clientHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleResetMouse = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleShutterTrigger = () => {
    cameraSound.playShutter();
    setIsFlashActive(true);
    setTimeout(() => {
      setIsFlashActive(false);
    }, 140);
  };

  const handleToggleSound = () => {
    const nextMuted = cameraSound.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] bg-background"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleResetMouse}
    >
      {/* Sticky Viewport Viewfinder */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none">
        
        {/* Flash whiteout burst animation */}
        <div
          className={`absolute inset-0 bg-[#f4f0e5] z-40 pointer-events-none transition-opacity duration-150 ${
            isFlashActive ? "opacity-95" : "opacity-0"
          }`}
        />

        {/* 35mm Lens Optical Housing Container */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          
          {/* Zooming Photo Canvas anchored on resting subject (50% X, 72% Y) */}
          <motion.div
            style={{
              scale: lensScale,
              filter: `blur(${bgBlur})`,
              transformOrigin: "50% 72%", // Perfectly anchors the subject reposing on the lawn
              rotateX: mousePos.y * -3,
              rotateY: mousePos.x * 4,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            {/* The 35mm Film Photograph */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-solitude.jpg"
              alt="Subject resting on open lawn - Study No. 01: Solitude at Noon"
              className="w-full h-full object-cover object-center grayscale contrast-125 brightness-95"
            />
          </motion.div>

          {/* Optical Glass Lens Barrel Vignette & Reflections */}
          <div className="absolute inset-0 pointer-events-none border-[14px] md:border-[28px] border-background/90 z-10 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]" />
          
          {/* Concentric Lens Ring Tick Marks */}
          <div className="absolute inset-6 md:inset-12 pointer-events-none border border-white/10 rounded-sm z-10" />

          {/* Anamorphic Corner Framelines */}
          <div className="absolute inset-8 md:inset-16 pointer-events-none z-20">
            {/* Top-Left */}
            <div className="absolute top-0 left-0 w-8 md:w-16 h-8 md:h-16 border-t-2 border-l-2 border-white/60" />
            <div className="absolute top-2 left-2 text-[9px] font-mono tracking-widest text-white/50">
              2.39:1 CINEMA
            </div>

            {/* Top-Right */}
            <div className="absolute top-0 right-0 w-8 md:w-16 h-8 md:h-16 border-t-2 border-r-2 border-white/60" />
            <div className="absolute top-2 right-2 text-[9px] font-mono tracking-widest text-white/50 text-right">
              35MM SILVER
            </div>

            {/* Bottom-Left */}
            <div className="absolute bottom-0 left-0 w-8 md:w-16 h-8 md:h-16 border-b-2 border-l-2 border-white/60" />
            <div className="absolute bottom-2 left-2 text-[9px] font-mono tracking-widest text-white/50">
              EXP 14 / 36
            </div>

            {/* Bottom-Right */}
            <div className="absolute bottom-0 right-0 w-8 md:w-16 h-8 md:h-16 border-b-2 border-r-2 border-white/60" />
            <div className="absolute bottom-2 right-2 text-[9px] font-mono tracking-widest text-white/50 text-right">
              ILFORD HP5+ 400
            </div>

            {/* Rule of Thirds Optical Grid (Subtle) */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-15">
              <div className="border-r border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-white" />
              <div className="border-r border-white" />
              <div />
            </div>

            {/* Center Focus Reticle with Crosshairs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-accent/80 rounded-full shadow-[0_0_8px_#6366f1]" />
              </div>
              <div className="absolute w-16 h-[1px] bg-white/25" />
              <div className="absolute h-16 w-[1px] bg-white/25" />
            </div>

            {/* Subject Tracking Bracket (Positioned near resting subject at 50% X, 72% Y) */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 bottom-[16%] md:bottom-[20%] w-44 md:w-56 h-16 md:h-20 border border-dashed border-white/30 rounded-sm pointer-events-none transition-transform duration-200"
              style={{
                transform: `translate(-50%, ${mousePos.y * 6}px)`,
              }}
            >
              <div className="absolute -top-3 left-1 px-1.5 bg-background/80 border border-white/20 text-[8px] font-mono tracking-wider text-accent uppercase">
                [AF-C TRACK: SUBJECT 01]
              </div>
              <div className="absolute -bottom-3 right-1 px-1.5 bg-background/80 border border-white/20 text-[8px] font-mono tracking-wider text-white/50">
                DIST: 4.8M
              </div>
            </div>
          </div>

          {/* Optical Telemetry Status Bars (Top HUD) */}
          <div className="absolute top-10 md:top-14 left-10 md:left-20 right-10 md:right-20 flex items-center justify-between z-30 pointer-events-auto">
            
            {/* Left HUD: Recording & Resolution */}
            <div className="flex items-center gap-3 bg-background/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-mono">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white font-medium tracking-wider">REC 24 FPS</span>
              <span className="text-white/30">|</span>
              <span className="text-white/60 hidden sm:inline">RAW 16-BIT</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-white/70">ISO 400</span>
            </div>

            {/* Center HUD: Live Dynamic Optical Telemetry */}
            <div className="flex items-center gap-2 sm:gap-4 bg-background/80 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full border border-accent/30 shadow-[0_0_20px_rgba(99,102,241,0.15)] text-xs sm:text-sm font-mono">
              <div className="flex items-center gap-1.5 text-accent">
                <Aperture className="w-4 h-4 animate-[spin_12s_linear_infinite]" />
                <span className="font-bold tracking-widest">{focalDisplay}MM</span>
              </div>
              <span className="text-white/30">/</span>
              <span className="text-white font-semibold">{apertureDisplay}</span>
              <span className="text-white/30">/</span>
              <span className="text-white/70">1/500s</span>
              <span className="text-white/30 hidden md:inline">/</span>
              <span className="text-white/50 hidden md:inline">+0.3 EV</span>
            </div>

            {/* Right HUD: Tactile Controls & Shutter */}
            <div className="flex items-center gap-2">
              {/* Sound Effect Toggle */}
              <button
                onClick={handleToggleSound}
                className="flex items-center gap-1.5 bg-background/70 hover:bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-[11px] font-mono text-white transition-colors"
                title="Toggle Shutter & Aperture Sound Effects"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                    <span className="hidden md:inline">AUDIO OFF</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden md:inline">AUDIO ON</span>
                  </>
                )}
              </button>

              {/* Physical Shutter Trigger Button */}
              <button
                onClick={handleShutterTrigger}
                className="group relative flex items-center gap-2 bg-white text-black hover:bg-[#f4f0e5] px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-150 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                <Camera className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                <span>SNAP</span>
              </button>
            </div>
          </div>

          {/* Floating Editorial Title Card (Visible during wide 24mm establishing view) */}
          <motion.div
            style={{ opacity: titleOpacity }}
            className="absolute top-1/4 left-10 md:left-24 max-w-xl z-20 pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-sm bg-white/10 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-white/90 border border-white/15">
                Flagship Study No. 01
              </span>
              <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase">
                Tokyo 2024
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tighter text-white uppercase drop-shadow-md">
              Solitude at Noon
            </h1>
            <p className="text-sm md:text-base text-white/70 font-light mt-2 max-w-md leading-relaxed drop-shadow">
              Kitanomaru imperial lawn. 35mm silver gelatin negative pushed in D-76. Scroll to zoom through the focal lens into the subject.
            </p>
          </motion.div>

          {/* Telephoto Detail Badge (Appears when scrolled to 85mm intimate crop) */}
          <motion.div
            style={{ opacity: cropBadgeOpacity }}
            className="absolute bottom-28 md:bottom-24 left-10 md:left-24 z-30 pointer-events-auto"
          >
            <div className="bg-background/85 backdrop-blur-md p-4 rounded-lg border border-accent/40 max-w-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between gap-4 mb-1.5">
                <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                  85MM TELEPHOTO DETAIL
                </span>
                <span className="text-[9px] font-mono text-white/50">100% CROP</span>
              </div>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                Subject in restful contemplation. High-acutance silver grains preserve fabric fibers and sunlit highlights on the turf.
              </p>
              {onOpenExif && (
                <button
                  onClick={onOpenExif}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-accent hover:text-white transition-colors"
                >
                  <Eye className="w-3 h-3" />
                  <span>INSPECT FULL CAMERA EXIF</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Bottom HUD: Dynamic Scroll Guidance & Lens Focal Bar */}
          <div className="absolute bottom-8 md:bottom-10 left-10 md:left-20 right-10 md:right-20 flex flex-col md:flex-row items-center justify-between gap-4 z-30 pointer-events-auto">
            
            {/* Focal Length Scrub Bar Indicator */}
            <div className="flex items-center gap-3 bg-background/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 w-full md:w-auto">
              <span className="text-[10px] font-mono tracking-widest text-white/50">24MM</span>
              <div className="relative w-36 sm:w-48 h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-accent transition-all duration-75 rounded-full shadow-[0_0_8px_#6366f1]"
                  style={{
                    width: `${((focalDisplay - 24) / (85 - 24)) * 100}%`,
                  }}
                />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-accent font-bold">85MM</span>
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="flex items-center gap-2 text-white/70 text-xs font-mono tracking-widest uppercase">
              <span className="animate-pulse">Scroll to scrub optical zoom</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-accent" />
            </div>

            {/* Quick Link to Gallery */}
            <a
              href="#gallery"
              className="hidden lg:flex items-center gap-2 text-[11px] font-mono tracking-widest text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10"
            >
              <span>SKIP TO GALLERY</span>
              <span>↓</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
